---
title: Text
description: type3d text, the state of the entity written on an object.
sidebar:
  order: 5
---

The state of the entity (or one of its attributes) is written on an object: a TV screen, a picture frame, a panel.

```yaml
- entity: sensor.outside_temperature
  type3d: text
  object_id: Living_frame
  text:
    span: 60
    font: verdana
    textfgcolor: white
    textbgcolor: '#000000'
```

| Option | Default | |
| --- | --- | --- |
| `attribute` | none | An attribute of the entity to write instead of its state. |
| `span` | `100` | How much of the object the text takes, in %. |
| `font` | `monospace` | The font, for example `verdana`. |
| `textfgcolor` | `white` | The colour of the text. |
| `textbgcolor` | transparent | The colour behind the text. |
| `mapping` | `flat` | `flat`: on the largest face of the object; `model`: on the mapping (UV) of the model. |

With `mapping: flat` the text lies flat on the largest face of the object and on the one opposite: readable from both sides and never mirrored, the right way up (on a floor or a table, the top away from the initial view), in the middle of the face with its proportions. The other faces take the background colour. With `mapping: model` the text follows the mapping of the model, as in the original card, which can write it mirrored, stretched or on no face at all.

Several text entities on one object write their texts one under the other, in the order of the configuration, laid out and coloured as the first of them says.
