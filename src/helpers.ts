import type { EntityObjects } from './types';

/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation and filtering.
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */
export function mergeDeep(...objects: any): any {
  const isObject = (obj: any): boolean => obj && typeof obj === 'object';

  return objects.reduce((prev: any, obj: any) => {
    Object.keys(obj).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];

      if (Array.isArray(pVal) && Array.isArray(oVal)) {
        /* eslint no-param-reassign: 0 */
        prev[key] = pVal.concat(...oVal);
      } else if (isObject(pVal) && isObject(oVal)) {
        prev[key] = mergeDeep(pVal, oVal);
      } else {
        prev[key] = oVal;
      }
    });

    return prev;
  }, {});
}

export const getLovelace = () => {
  let root: any = document.querySelector('home-assistant');
  root = root && root.shadowRoot;
  root = root && root.querySelector('home-assistant-main');
  root = root && root.shadowRoot;
  root = root && root.querySelector('app-drawer-layout partial-panel-resolver, ha-drawer partial-panel-resolver');
  root = (root && root.shadowRoot) || root;
  root = root && root.querySelector('ha-panel-lovelace');
  root = root && root.shadowRoot;
  root = root && root.querySelector('hui-root');
  if (root) {
    const ll = root.lovelace;
    ll.current_view = root.___curView;
    return ll;
  }
  return null;
};

// The objects of each entity, in the order of the entities: the card reads them by the position of
// the entity. An entity without object_id, or whose <group> doesn't exist, gets no objects and a
// warning. Until 2.12.1 it got no entry at all, and the entities after it took the objects of the
// next one; a <group> without object_groups stopped the card.
export function createObjectGroupConfigArray(config): EntityObjects[] {
  const groups = Array.isArray(config.object_groups) ? config.object_groups : [];
  return (Array.isArray(config.entities) ? config.entities : []).map((entityConfig) => {
    const id = entityConfig.object_id;
    let objects = [];
    const group = typeof id === 'string' ? /^<(.*)>$/.exec(id) : null;
    if (group) {
      const found = groups.find((g) => g && g.object_group == group[1]);
      if (found) objects = found.objects || [];
      else console.warn('floor3d-card: entity ' + entityConfig.entity + ': no object group ' + group[1]);
    } else if (id) {
      objects = [{ object_id: id }];
    } else if (entityConfig.entity && entityConfig.type3d != 'tracker') {
      // A tracker draws its own marker.
      console.warn('floor3d-card: entity ' + entityConfig.entity + ' has no object_id');
    }
    return mergeDeep({}, { entity: entityConfig.entity, objects });
  });
}
