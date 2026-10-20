/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Floor3dCardConfig } from './types';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
}

export function createObjectGroupConfigArray(config): Floor3dCardConfig[] {
  const configArray: Floor3dCardConfig[] = [];
  if (config.entities) {
    for (const entityConfig of config.entities) {
      if (entityConfig.object_id) {
        if (
          entityConfig.object_id.charAt(0) == '<' &&
          entityConfig.object_id.charAt(entityConfig.object_id.length - 1) == '>'
        ) {
          const group_name = entityConfig.object_id.substr(1, entityConfig.object_id.length - 2);
          for (const objectGroupConfig of config.object_groups) {
            if (objectGroupConfig.object_group == group_name) {
              const objectConfig = mergeDeep({}, { entity: entityConfig.entity, objects: objectGroupConfig.objects });
              configArray.push(objectConfig);
              break;
            }
          }
        } else if (entityConfig.object_id !== '') {
          const objectConfig = mergeDeep(
            {},
            { entity: entityConfig.entity, objects: [{ object_id: entityConfig.object_id }] },
          );
          configArray.push(objectConfig);
        } else {
          if (entityConfig.entity != '') {
            console.log('ERROR: Object is empty for entity' + entityConfig.entity);
          }
        }
      } else {
        if (entityConfig.entity != '') {
          console.log('ERROR: Object is empty for entity' + entityConfig.entity);
        }
      }
    }
  }
  //console.log(JSON.stringify(configArray));
  return configArray;
}
