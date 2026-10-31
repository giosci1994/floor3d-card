---
title: The preview
description: Pick objects with a tap, pause the preview, keep the camera where it is.
sidebar:
  order: 2
---

While the card is edited, Home Assistant shows it next to the editor: the preview. The editor and the preview work together.

## Pick in the preview

The button next to an object field turns the preview into a picker: a tap on an object fills the field.

- For an **object group**, every tap adds an object or takes it out, until the button is pressed again.
- For a **camera** of the house, the tap gives the point of the model where it is, and its level.

## Fewer reloads

Home Assistant builds the preview again, model included, at every configuration it gets. The editor sends the configuration one second after the last change, and at once when you leave a field or click anywhere (the Save button included). So typing an entity id loads the preview again once, not at every key, and Home Assistant always has the last configuration.

The **model** isn't downloaded and read again each time: a card being edited keeps it in memory, and the next preview takes a copy of it. The preview of a big model is ready about three times sooner (a model of 25 MB: under a second instead of two and a half). Before taking the copy the card asks Home Assistant whether the file changed, so a model exported again with the same name is read again; the reload button of the editor reads it again too. The copy is let go five minutes after the last preview.

While an **object group** is open in the editor, its changes wait: the objects picked in the preview, chosen in the menu or taken out, its name. They go when the group is closed (the arrow back), when the editor closes, or with a tap on a button outside the editor and the preview, such as Save. So the objects of a group can be picked one after the other, without the preview starting again from its first view.

## The camera stays

Each new preview goes back to where the camera was, unless the initial view or the model changed: zoom and camera don't have to be set again after each change.

## Pause

The pause button at the top of the editor (also at the top of each entity, group, view and room) keeps the last picture of the preview, with *Preview paused* on it, while you make several changes; the play or refresh button shows them all at once. The configuration still goes to Home Assistant at every change, so Save never loses one.

**Pick in the preview** loads the model in the paused preview and the pause stays, also after the object is picked. **Use the current view** takes the camera of the last live preview. The idea comes from [issue #13](https://github.com/giosci1994/floor3d-card/issues/13).

## Shadows on this device

With shadows on, the light section says how many lights cast a shadow and how many the GPU of the device running the editor can draw. Past that, a warning names the entities whose lights are drawn without a shadow, and the material of the model that lowers the limit with its textures; their lines in the list of entities say so too.
