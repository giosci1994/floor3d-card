---
title: Appliances that glow while they work
description: A washing machine, a dryer or a dishwasher coloured and glowing while it runs and when it has finished, from the power of its plug.
sidebar:
  order: 1
---

The washing machine glows green while it runs and orange when it has finished, until someone empties it; then it has its own colours again. The same for a dryer or a dishwasher. What the card needs is a sensor with three states: `running`, `finished` and `idle`. Home Assistant makes it from the power of the smart plug of the appliance.

## The sensor in Home Assistant

A [trigger-based template sensor](https://www.home-assistant.io/integrations/template/#trigger-based-template-entities) in `configuration.yaml` (or in a package). `sensor.washer_power` is the power of the plug; change the numbers to your appliance.

```yaml
template:
  - trigger:
      # Running: more than 5 W for two minutes.
      - trigger: numeric_state
        entity_id: sensor.washer_power
        above: 5
        for: { minutes: 2 }
        id: start
      # Stopped: under 3 W for three minutes (a washing machine pauses while it soaks).
      - trigger: numeric_state
        entity_id: sensor.washer_power
        below: 3
        for: { minutes: 3 }
        id: stop
      # Emptied: the action of the notification below, or a button of the dashboard.
      - trigger: event
        event_type: mobile_app_notification_action
        event_data: { action: WASHER_SEEN }
        id: seen
      - trigger: state
        entity_id: input_button.washer_seen
        id: seen
    sensor:
      - name: Washer state
        unique_id: washer_state
        icon: mdi:washing-machine
        # A cycle counts only if it ran for 10 minutes: a short spin of the drum is not a wash.
        state: >
          {% set s = this.state if this.state in ['running', 'finished', 'idle'] else 'idle' %}
          {% if trigger.id == 'start' %}running
          {% elif trigger.id == 'stop' and s == 'running' %}
            {% set started = this.attributes.started | default(none) %}
            {{ 'finished' if started and (now() - as_datetime(started)).total_seconds() > 600 else 'idle' }}
          {% elif trigger.id == 'seen' and s == 'finished' %}idle
          {% else %}{{ s }}{% endif %}
        attributes:
          started: >
            {{ now().isoformat() if trigger.id == 'start' else this.attributes.started | default(none) }}
```

It stays `finished` until the notice is touched: an automation sends it when the state becomes `finished`, with an action that sets the sensor back to `idle`.

```yaml
automation:
  - alias: Washer finished
    triggers:
      - trigger: state
        entity_id: sensor.washer_state
        to: finished
    actions:
      - action: notify.mobile_app_phone
        data:
          message: The washing is done
          data:
            actions:
              - action: WASHER_SEEN
                title: Emptied
```

## The card

The objects of the appliance in an [object group](/floor3d-card/model/objects/#object-groups), and a [`color`](/floor3d-card/entities/color/) entity with a colour for each state. `glow` makes it shine in that colour, so that it shows also when the appliance is dark or has a texture.

```yaml
object_groups:
  - object_group: Washer
    objects:
      - object_id: Washer_body
      - object_id: Washer_door
entities:
  - entity: sensor.washer_state
    type3d: color
    object_id: <Washer>
    colorcondition:
      - state: running
        color: '#66FF66'
        glow: 1.5
      - state: finished
        color: '#FFA726'
        glow: 2
```

While it is `idle` no condition matches, and the appliance has the colours of the model. A dryer and a dishwasher work the same way, with their own plug and their own sensor.
