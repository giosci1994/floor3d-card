/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// Components used by floor3d-select that Home Assistant used to provide globally.
// Recent Home Assistant versions no longer define mwc-menu: without it the editor's
// drop-down menus cannot open. Each one is defined here only if it is still missing.
import { MenuBase } from '@material/mwc-menu/mwc-menu-base.js';
import { styles as menuStyles } from '@material/mwc-menu/mwc-menu.css.js';
import { MenuSurfaceBase } from '@material/mwc-menu/mwc-menu-surface-base.js';
import { styles as menuSurfaceStyles } from '@material/mwc-menu/mwc-menu-surface.css.js';
import { ListBase } from '@material/mwc-list/mwc-list-base.js';
import { styles as listStyles } from '@material/mwc-list/mwc-list.css.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base.js';
import { styles as listItemStyles } from '@material/mwc-list/mwc-list-item.css.js';

function defineIfMissing(name: string, base: any, styles: any) {
  if (!customElements.get(name)) {
    customElements.define(
      name,
      class extends base {
        static get styles() {
          return styles;
        }
      },
    );
  }
}

defineIfMissing('mwc-menu-surface', MenuSurfaceBase, menuSurfaceStyles);
defineIfMissing('mwc-list-item', ListItemBase, listItemStyles);
defineIfMissing('mwc-list', ListBase, listStyles);
defineIfMissing('mwc-menu', MenuBase, menuStyles);
