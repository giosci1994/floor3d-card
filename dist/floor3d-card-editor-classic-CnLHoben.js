import{bB as e,bC as t,bD as i,_ as o,t as n,n as l,bg as d,i as r,b as a,bE as s,bF as c,bG as m,C as h,K as p,bH as u,bh as f,f as g,ba as b}from"./floor3d-card-core-U-rkWbGO.js";
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var x,_={MENU_SELECTED_LIST_ITEM:"mdc-menu-item--selected",MENU_SELECTION_GROUP:"mdc-menu__selection-group",ROOT:"mdc-menu"},v={ARIA_CHECKED_ATTR:"aria-checked",ARIA_DISABLED_ATTR:"aria-disabled",CHECKBOX_SELECTOR:'input[type="checkbox"]',LIST_SELECTOR:".mdc-list,.mdc-deprecated-list",SELECTED_EVENT:"MDCMenu:selected",SKIP_RESTORE_FOCUS:"data-menu-item-skip-restore-focus"},y={FOCUS_ROOT_INDEX:-1};!function(e){e[e.NONE=0]="NONE",e[e.LIST_ROOT=1]="LIST_ROOT",e[e.FIRST_ITEM=2]="FIRST_ITEM",e[e.LAST_ITEM=3]="LAST_ITEM"}(x||(x={}));
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var w,$,A=function(){function e(e){void 0===e&&(e={}),this.adapter=e}return Object.defineProperty(e,"cssClasses",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(e,"strings",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(e,"numbers",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(e,"defaultAdapter",{get:function(){return{}},enumerable:!1,configurable:!0}),e.prototype.init=function(){},e.prototype.destroy=function(){},e}(),E="mdc-list-item--activated",C="mdc-list-item",I="mdc-list-item--disabled",O="mdc-list-item--selected",T="mdc-list-item__text",S="mdc-list-item__primary-text",k="mdc-list";
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */(w={})[""+E]="mdc-list-item--activated",w[""+C]="mdc-list-item",w[""+I]="mdc-list-item--disabled",w[""+O]="mdc-list-item--selected",w[""+S]="mdc-list-item__primary-text",w[""+k]="mdc-list";var R,L,F=(($={})[""+E]="mdc-deprecated-list-item--activated",$[""+C]="mdc-deprecated-list-item",$[""+I]="mdc-deprecated-list-item--disabled",$[""+O]="mdc-deprecated-list-item--selected",$[""+T]="mdc-deprecated-list-item__text",$[""+S]="mdc-deprecated-list-item__primary-text",$[""+k]="mdc-deprecated-list",$),j={ACTION_EVENT:"MDCList:action",SELECTION_CHANGE_EVENT:"MDCList:selectionChange",ARIA_CHECKED:"aria-checked",ARIA_CHECKED_CHECKBOX_SELECTOR:'[role="checkbox"][aria-checked="true"]',ARIA_CHECKED_RADIO_SELECTOR:'[role="radio"][aria-checked="true"]',ARIA_CURRENT:"aria-current",ARIA_DISABLED:"aria-disabled",ARIA_ORIENTATION:"aria-orientation",ARIA_ORIENTATION_HORIZONTAL:"horizontal",ARIA_ROLE_CHECKBOX_SELECTOR:'[role="checkbox"]',ARIA_SELECTED:"aria-selected",ARIA_INTERACTIVE_ROLES_SELECTOR:'[role="listbox"], [role="menu"]',ARIA_MULTI_SELECTABLE_SELECTOR:'[aria-multiselectable="true"]',CHECKBOX_RADIO_SELECTOR:'input[type="checkbox"], input[type="radio"]',CHECKBOX_SELECTOR:'input[type="checkbox"]',CHILD_ELEMENTS_TO_TOGGLE_TABINDEX:"\n    ."+C+" button:not(:disabled),\n    ."+C+" a,\n    ."+F[C]+" button:not(:disabled),\n    ."+F[C]+" a\n  ",DEPRECATED_SELECTOR:".mdc-deprecated-list",FOCUSABLE_CHILD_ELEMENTS:"\n    ."+C+" button:not(:disabled),\n    ."+C+" a,\n    ."+C+' input[type="radio"]:not(:disabled),\n    .'+C+' input[type="checkbox"]:not(:disabled),\n    .'+F[C]+" button:not(:disabled),\n    ."+F[C]+" a,\n    ."+F[C]+' input[type="radio"]:not(:disabled),\n    .'+F[C]+' input[type="checkbox"]:not(:disabled)\n  ',RADIO_SELECTOR:'input[type="radio"]',SELECTED_ITEM_SELECTOR:'[aria-selected="true"], [aria-current="true"]'},N={UNSET_INDEX:-1,TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS:300},z={ANCHOR:"mdc-menu-surface--anchor",ANIMATING_CLOSED:"mdc-menu-surface--animating-closed",ANIMATING_OPEN:"mdc-menu-surface--animating-open",FIXED:"mdc-menu-surface--fixed",IS_OPEN_BELOW:"mdc-menu-surface--is-open-below",OPEN:"mdc-menu-surface--open",ROOT:"mdc-menu-surface"},M={CLOSED_EVENT:"MDCMenuSurface:closed",CLOSING_EVENT:"MDCMenuSurface:closing",OPENED_EVENT:"MDCMenuSurface:opened",OPENING_EVENT:"MDCMenuSurface:opening",FOCUSABLE_ELEMENTS:["button:not(:disabled)",'[href]:not([aria-disabled="true"])',"input:not(:disabled)","select:not(:disabled)","textarea:not(:disabled)",'[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])'].join(", ")},D={TRANSITION_OPEN_DURATION:120,TRANSITION_CLOSE_DURATION:75,MARGIN_TO_EDGE:32,ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO:.67,TOUCH_EVENT_WAIT_MS:30};!function(e){e[e.BOTTOM=1]="BOTTOM",e[e.CENTER=2]="CENTER",e[e.RIGHT=4]="RIGHT",e[e.FLIP_RTL=8]="FLIP_RTL"}(R||(R={})),function(e){e[e.TOP_LEFT=0]="TOP_LEFT",e[e.TOP_RIGHT=4]="TOP_RIGHT",e[e.BOTTOM_LEFT=1]="BOTTOM_LEFT",e[e.BOTTOM_RIGHT=5]="BOTTOM_RIGHT",e[e.TOP_START=8]="TOP_START",e[e.TOP_END=12]="TOP_END",e[e.BOTTOM_START=9]="BOTTOM_START",e[e.BOTTOM_END=13]="BOTTOM_END"}(L||(L={}));
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var B=function(o){function n(e){var i=o.call(this,t(t({},n.defaultAdapter),e))||this;return i.isSurfaceOpen=!1,i.isQuickOpen=!1,i.isHoistedElement=!1,i.isFixedPosition=!1,i.isHorizontallyCenteredOnViewport=!1,i.maxHeight=0,i.openBottomBias=0,i.openAnimationEndTimerId=0,i.closeAnimationEndTimerId=0,i.animationRequestId=0,i.anchorCorner=L.TOP_START,i.originCorner=L.TOP_START,i.anchorMargin={top:0,right:0,bottom:0,left:0},i.position={x:0,y:0},i}return e(n,o),Object.defineProperty(n,"cssClasses",{get:function(){return z},enumerable:!1,configurable:!0}),Object.defineProperty(n,"strings",{get:function(){return M},enumerable:!1,configurable:!0}),Object.defineProperty(n,"numbers",{get:function(){return D},enumerable:!1,configurable:!0}),Object.defineProperty(n,"Corner",{get:function(){return L},enumerable:!1,configurable:!0}),Object.defineProperty(n,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},hasAnchor:function(){return!1},isElementInContainer:function(){return!1},isFocused:function(){return!1},isRtl:function(){return!1},getInnerDimensions:function(){return{height:0,width:0}},getAnchorDimensions:function(){return null},getWindowDimensions:function(){return{height:0,width:0}},getBodyDimensions:function(){return{height:0,width:0}},getWindowScroll:function(){return{x:0,y:0}},setPosition:function(){},setMaxHeight:function(){},setTransformOrigin:function(){},saveFocus:function(){},restoreFocus:function(){},notifyClose:function(){},notifyClosing:function(){},notifyOpen:function(){},notifyOpening:function(){}}},enumerable:!1,configurable:!0}),n.prototype.init=function(){var e=n.cssClasses,t=e.ROOT,i=e.OPEN;if(!this.adapter.hasClass(t))throw new Error(t+" class required in root element.");this.adapter.hasClass(i)&&(this.isSurfaceOpen=!0)},n.prototype.destroy=function(){clearTimeout(this.openAnimationEndTimerId),clearTimeout(this.closeAnimationEndTimerId),cancelAnimationFrame(this.animationRequestId)},n.prototype.setAnchorCorner=function(e){this.anchorCorner=e},n.prototype.flipCornerHorizontally=function(){this.originCorner=this.originCorner^R.RIGHT},n.prototype.setAnchorMargin=function(e){this.anchorMargin.top=e.top||0,this.anchorMargin.right=e.right||0,this.anchorMargin.bottom=e.bottom||0,this.anchorMargin.left=e.left||0},n.prototype.setIsHoisted=function(e){this.isHoistedElement=e},n.prototype.setFixedPosition=function(e){this.isFixedPosition=e},n.prototype.isFixed=function(){return this.isFixedPosition},n.prototype.setAbsolutePosition=function(e,t){this.position.x=this.isFinite(e)?e:0,this.position.y=this.isFinite(t)?t:0},n.prototype.setIsHorizontallyCenteredOnViewport=function(e){this.isHorizontallyCenteredOnViewport=e},n.prototype.setQuickOpen=function(e){this.isQuickOpen=e},n.prototype.setMaxHeight=function(e){this.maxHeight=e},n.prototype.setOpenBottomBias=function(e){this.openBottomBias=e},n.prototype.isOpen=function(){return this.isSurfaceOpen},n.prototype.open=function(){var e=this;this.isSurfaceOpen||(this.adapter.notifyOpening(),this.adapter.saveFocus(),this.isQuickOpen?(this.isSurfaceOpen=!0,this.adapter.addClass(n.cssClasses.OPEN),this.dimensions=this.adapter.getInnerDimensions(),this.autoposition(),this.adapter.notifyOpen()):(this.adapter.addClass(n.cssClasses.ANIMATING_OPEN),this.animationRequestId=requestAnimationFrame(function(){e.dimensions=e.adapter.getInnerDimensions(),e.autoposition(),e.adapter.addClass(n.cssClasses.OPEN),e.openAnimationEndTimerId=setTimeout(function(){e.openAnimationEndTimerId=0,e.adapter.removeClass(n.cssClasses.ANIMATING_OPEN),e.adapter.notifyOpen()},D.TRANSITION_OPEN_DURATION)}),this.isSurfaceOpen=!0))},n.prototype.close=function(e){var t=this;if(void 0===e&&(e=!1),this.isSurfaceOpen){if(this.adapter.notifyClosing(),this.isQuickOpen)return this.isSurfaceOpen=!1,e||this.maybeRestoreFocus(),this.adapter.removeClass(n.cssClasses.OPEN),this.adapter.removeClass(n.cssClasses.IS_OPEN_BELOW),void this.adapter.notifyClose();this.adapter.addClass(n.cssClasses.ANIMATING_CLOSED),requestAnimationFrame(function(){t.adapter.removeClass(n.cssClasses.OPEN),t.adapter.removeClass(n.cssClasses.IS_OPEN_BELOW),t.closeAnimationEndTimerId=setTimeout(function(){t.closeAnimationEndTimerId=0,t.adapter.removeClass(n.cssClasses.ANIMATING_CLOSED),t.adapter.notifyClose()},D.TRANSITION_CLOSE_DURATION)}),this.isSurfaceOpen=!1,e||this.maybeRestoreFocus()}},n.prototype.handleBodyClick=function(e){var t=e.target;this.adapter.isElementInContainer(t)||this.close()},n.prototype.handleKeydown=function(e){var t=e.keyCode;("Escape"===e.key||27===t)&&this.close()},n.prototype.autoposition=function(){var e;this.measurements=this.getAutoLayoutmeasurements();var t=this.getoriginCorner(),i=this.getMenuSurfaceMaxHeight(t),o=this.hasBit(t,R.BOTTOM)?"bottom":"top",l=this.hasBit(t,R.RIGHT)?"right":"left",d=this.getHorizontalOriginOffset(t),r=this.getVerticalOriginOffset(t),a=this.measurements,s=a.anchorSize,c=a.surfaceSize,m=((e={})[l]=d,e[o]=r,e);s.width/c.width>D.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO&&(l="center"),(this.isHoistedElement||this.isFixedPosition)&&this.adjustPositionForHoistedElement(m),this.adapter.setTransformOrigin(l+" "+o),this.adapter.setPosition(m),this.adapter.setMaxHeight(i?i+"px":""),this.hasBit(t,R.BOTTOM)||this.adapter.addClass(n.cssClasses.IS_OPEN_BELOW)},n.prototype.getAutoLayoutmeasurements=function(){var e=this.adapter.getAnchorDimensions(),t=this.adapter.getBodyDimensions(),i=this.adapter.getWindowDimensions(),o=this.adapter.getWindowScroll();return e||(e={top:this.position.y,right:this.position.x,bottom:this.position.y,left:this.position.x,width:0,height:0}),{anchorSize:e,bodySize:t,surfaceSize:this.dimensions,viewportDistance:{top:e.top,right:i.width-e.right,bottom:i.height-e.bottom,left:e.left},viewportSize:i,windowScroll:o}},n.prototype.getoriginCorner=function(){var e,t,i=this.originCorner,o=this.measurements,l=o.viewportDistance,d=o.anchorSize,r=o.surfaceSize,a=n.numbers.MARGIN_TO_EDGE;this.hasBit(this.anchorCorner,R.BOTTOM)?(e=l.top-a+this.anchorMargin.bottom,t=l.bottom-a-this.anchorMargin.bottom):(e=l.top-a+this.anchorMargin.top,t=l.bottom-a+d.height-this.anchorMargin.top),!(t-r.height>0)&&e>t+this.openBottomBias&&(i=this.setBit(i,R.BOTTOM));var s,c,m=this.adapter.isRtl(),h=this.hasBit(this.anchorCorner,R.FLIP_RTL),p=this.hasBit(this.anchorCorner,R.RIGHT)||this.hasBit(i,R.RIGHT),u=!1;(u=m&&h?!p:p)?(s=l.left+d.width+this.anchorMargin.right,c=l.right-this.anchorMargin.right):(s=l.left+this.anchorMargin.left,c=l.right+d.width-this.anchorMargin.left);var f=s-r.width>0,g=c-r.width>0,b=this.hasBit(i,R.FLIP_RTL)&&this.hasBit(i,R.RIGHT);return g&&b&&m||!f&&b?i=this.unsetBit(i,R.RIGHT):(f&&u&&m||f&&!u&&p||!g&&s>=c)&&(i=this.setBit(i,R.RIGHT)),i},n.prototype.getMenuSurfaceMaxHeight=function(e){if(this.maxHeight>0)return this.maxHeight;var t=this.measurements.viewportDistance,i=0,o=this.hasBit(e,R.BOTTOM),l=this.hasBit(this.anchorCorner,R.BOTTOM),d=n.numbers.MARGIN_TO_EDGE;return o?(i=t.top+this.anchorMargin.top-d,l||(i+=this.measurements.anchorSize.height)):(i=t.bottom-this.anchorMargin.bottom+this.measurements.anchorSize.height-d,l&&(i-=this.measurements.anchorSize.height)),i},n.prototype.getHorizontalOriginOffset=function(e){var t=this.measurements.anchorSize,i=this.hasBit(e,R.RIGHT),o=this.hasBit(this.anchorCorner,R.RIGHT);if(i){var n=o?t.width-this.anchorMargin.left:this.anchorMargin.right;return this.isHoistedElement||this.isFixedPosition?n-(this.measurements.viewportSize.width-this.measurements.bodySize.width):n}return o?t.width-this.anchorMargin.right:this.anchorMargin.left},n.prototype.getVerticalOriginOffset=function(e){var t=this.measurements.anchorSize,i=this.hasBit(e,R.BOTTOM),o=this.hasBit(this.anchorCorner,R.BOTTOM);return i?o?t.height-this.anchorMargin.top:-this.anchorMargin.bottom:o?t.height+this.anchorMargin.bottom:this.anchorMargin.top},n.prototype.adjustPositionForHoistedElement=function(e){var t,o,n=this.measurements,l=n.windowScroll,d=n.viewportDistance,r=n.surfaceSize,a=n.viewportSize,s=Object.keys(e);try{for(var c=i(s),m=c.next();!m.done;m=c.next()){var h=m.value,p=e[h]||0;!this.isHorizontallyCenteredOnViewport||"left"!==h&&"right"!==h?(p+=d[h],this.isFixedPosition||("top"===h?p+=l.y:"bottom"===h?p-=l.y:"left"===h?p+=l.x:p-=l.x),e[h]=p):e[h]=(a.width-r.width)/2}}catch(e){t={error:e}}finally{try{m&&!m.done&&(o=c.return)&&o.call(c)}finally{if(t)throw t.error}}},n.prototype.maybeRestoreFocus=function(){var e=this,t=this.adapter.isFocused(),i=this.adapter.getOwnerDocument?this.adapter.getOwnerDocument():document,o=i.activeElement&&this.adapter.isElementInContainer(i.activeElement);(t||o)&&setTimeout(function(){e.adapter.restoreFocus()},D.TOUCH_EVENT_WAIT_MS)},n.prototype.hasBit=function(e,t){return Boolean(e&t)},n.prototype.setBit=function(e,t){return e|t},n.prototype.unsetBit=function(e,t){return e^t},n.prototype.isFinite=function(e){return"number"==typeof e&&isFinite(e)},n}(A),P=function(i){function o(e){var n=i.call(this,t(t({},o.defaultAdapter),e))||this;return n.closeAnimationEndTimerId=0,n.defaultFocusState=x.LIST_ROOT,n.selectedIndex=-1,n}return e(o,i),Object.defineProperty(o,"cssClasses",{get:function(){return _},enumerable:!1,configurable:!0}),Object.defineProperty(o,"strings",{get:function(){return v},enumerable:!1,configurable:!0}),Object.defineProperty(o,"numbers",{get:function(){return y},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClassToElementAtIndex:function(){},removeClassFromElementAtIndex:function(){},addAttributeToElementAtIndex:function(){},removeAttributeFromElementAtIndex:function(){},getAttributeFromElementAtIndex:function(){return null},elementContainsClass:function(){return!1},closeSurface:function(){},getElementIndex:function(){return-1},notifySelected:function(){},getMenuItemCount:function(){return 0},focusItemAtIndex:function(){},focusListRoot:function(){},getSelectedSiblingOfItemAtIndex:function(){return-1},isSelectableItemAtIndex:function(){return!1}}},enumerable:!1,configurable:!0}),o.prototype.destroy=function(){this.closeAnimationEndTimerId&&clearTimeout(this.closeAnimationEndTimerId),this.adapter.closeSurface()},o.prototype.handleKeydown=function(e){var t=e.key,i=e.keyCode;("Tab"===t||9===i)&&this.adapter.closeSurface(!0)},o.prototype.handleItemAction=function(e){var t=this,i=this.adapter.getElementIndex(e);if(!(i<0)){this.adapter.notifySelected({index:i});var o="true"===this.adapter.getAttributeFromElementAtIndex(i,v.SKIP_RESTORE_FOCUS);this.adapter.closeSurface(o),this.closeAnimationEndTimerId=setTimeout(function(){var i=t.adapter.getElementIndex(e);i>=0&&t.adapter.isSelectableItemAtIndex(i)&&t.setSelectedIndex(i)},B.numbers.TRANSITION_CLOSE_DURATION)}},o.prototype.handleMenuSurfaceOpened=function(){switch(this.defaultFocusState){case x.FIRST_ITEM:this.adapter.focusItemAtIndex(0);break;case x.LAST_ITEM:this.adapter.focusItemAtIndex(this.adapter.getMenuItemCount()-1);break;case x.NONE:break;default:this.adapter.focusListRoot()}},o.prototype.setDefaultFocusState=function(e){this.defaultFocusState=e},o.prototype.getSelectedIndex=function(){return this.selectedIndex},o.prototype.setSelectedIndex=function(e){if(this.validatedIndex(e),!this.adapter.isSelectableItemAtIndex(e))throw new Error("MDCMenuFoundation: No selection group at specified index.");var t=this.adapter.getSelectedSiblingOfItemAtIndex(e);t>=0&&(this.adapter.removeAttributeFromElementAtIndex(t,v.ARIA_CHECKED_ATTR),this.adapter.removeClassFromElementAtIndex(t,_.MENU_SELECTED_LIST_ITEM)),this.adapter.addClassToElementAtIndex(e,_.MENU_SELECTED_LIST_ITEM),this.adapter.addAttributeToElementAtIndex(e,v.ARIA_CHECKED_ATTR,"true"),this.selectedIndex=e},o.prototype.setEnabled=function(e,t){this.validatedIndex(e),t?(this.adapter.removeClassFromElementAtIndex(e,I),this.adapter.addAttributeToElementAtIndex(e,v.ARIA_DISABLED_ATTR,"false")):(this.adapter.addClassToElementAtIndex(e,I),this.adapter.addAttributeToElementAtIndex(e,v.ARIA_DISABLED_ATTR,"true"))},o.prototype.validatedIndex=function(e){var t=this.adapter.getMenuItemCount();if(!(e>=0&&e<t))throw new Error("MDCMenuFoundation: No list item at specified index.")},o}(A);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const H=window,V=H.ShadowRoot&&(void 0===H.ShadyCSS||H.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,U=Symbol(),G=new WeakMap;let X=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==U)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(V&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=G.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&G.set(t,e))}return e}toString(){return this.cssText}};const Y=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new X(i,e,U)},q=V?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new X("string"==typeof e?e:e+"",void 0,U))(t)})(e):e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var W;const Z=window,K=Z.trustedTypes,Q=K?K.emptyScript:"",J=Z.reactiveElementPolyfillSupport,ee={toAttribute(e,t){switch(t){case Boolean:e=e?Q:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},te=(e,t)=>t!==e&&(t==t||e==e),ie={attribute:!0,type:String,converter:ee,reflect:!1,hasChanged:te},oe="finalized";let ne=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const o=this._$Ep(i,t);void 0!==o&&(this._$Ev.set(o,i),e.push(o))}),e}static createProperty(e,t=ie){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const n=this[e];this[t]=o,this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||ie}static finalize(){if(this.hasOwnProperty(oe))return!1;this[oe]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(q(e))}else void 0!==e&&t.push(q(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{V?e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(t=>{const i=document.createElement("style"),o=H.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=t.cssText,e.appendChild(i)})})(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=ie){var o;const n=this.constructor._$Ep(e,i);if(void 0!==n&&!0===i.reflect){const l=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:ee).toAttribute(t,i.type);this._$El=e,null==l?this.removeAttribute(n):this.setAttribute(n,l),this._$El=null}}_$AK(e,t){var i;const o=this.constructor,n=o._$Ev.get(e);if(void 0!==n&&this._$El!==n){const e=o.getPropertyOptions(n),l="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:ee;this._$El=n,this[n]=l.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let o=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||te)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((e,t)=>this[t]=e),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach((e,t)=>this._$EO(t,this[t],e)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var le;ne[oe]=!0,ne.elementProperties=new Map,ne.elementStyles=[],ne.shadowRootOptions={mode:"open"},null==J||J({ReactiveElement:ne}),(null!==(W=Z.reactiveElementVersions)&&void 0!==W?W:Z.reactiveElementVersions=[]).push("1.6.3");const de=window,re=de.trustedTypes,ae=re?re.createPolicy("lit-html",{createHTML:e=>e}):void 0,se="$lit$",ce=`lit$${(Math.random()+"").slice(9)}$`,me="?"+ce,he=`<${me}>`,pe=document,ue=()=>pe.createComment(""),fe=e=>null===e||"object"!=typeof e&&"function"!=typeof e,ge=Array.isArray,be="[ \t\n\f\r]",xe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_e=/-->/g,ve=/>/g,ye=RegExp(`>|${be}(?:([^\\s"'>=/]+)(${be}*=${be}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),we=/'/g,$e=/"/g,Ae=/^(?:script|style|textarea|title)$/i,Ee=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),Ce=Symbol.for("lit-noChange"),Ie=Symbol.for("lit-nothing"),Oe=new WeakMap,Te=pe.createTreeWalker(pe,129,null,!1);function Se(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==ae?ae.createHTML(t):t}const ke=(e,t)=>{const i=e.length-1,o=[];let n,l=2===t?"<svg>":"",d=xe;for(let t=0;t<i;t++){const i=e[t];let r,a,s=-1,c=0;for(;c<i.length&&(d.lastIndex=c,a=d.exec(i),null!==a);)c=d.lastIndex,d===xe?"!--"===a[1]?d=_e:void 0!==a[1]?d=ve:void 0!==a[2]?(Ae.test(a[2])&&(n=RegExp("</"+a[2],"g")),d=ye):void 0!==a[3]&&(d=ye):d===ye?">"===a[0]?(d=null!=n?n:xe,s=-1):void 0===a[1]?s=-2:(s=d.lastIndex-a[2].length,r=a[1],d=void 0===a[3]?ye:'"'===a[3]?$e:we):d===$e||d===we?d=ye:d===_e||d===ve?d=xe:(d=ye,n=void 0);const m=d===ye&&e[t+1].startsWith("/>")?" ":"";l+=d===xe?i+he:s>=0?(o.push(r),i.slice(0,s)+se+i.slice(s)+ce+m):i+ce+(-2===s?(o.push(void 0),t):m)}return[Se(e,l+(e[i]||"<?>")+(2===t?"</svg>":"")),o]};class Re{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let n=0,l=0;const d=e.length-1,r=this.parts,[a,s]=ke(e,t);if(this.el=Re.createElement(a,i),Te.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(o=Te.nextNode())&&r.length<d;){if(1===o.nodeType){if(o.hasAttributes()){const e=[];for(const t of o.getAttributeNames())if(t.endsWith(se)||t.startsWith(ce)){const i=s[l++];if(e.push(t),void 0!==i){const e=o.getAttribute(i.toLowerCase()+se).split(ce),t=/([.?@])?(.*)/.exec(i);r.push({type:1,index:n,name:t[2],strings:e,ctor:"."===t[1]?ze:"?"===t[1]?De:"@"===t[1]?Be:Ne})}else r.push({type:6,index:n})}for(const t of e)o.removeAttribute(t)}if(Ae.test(o.tagName)){const e=o.textContent.split(ce),t=e.length-1;if(t>0){o.textContent=re?re.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],ue()),Te.nextNode(),r.push({type:2,index:++n});o.append(e[t],ue())}}}else if(8===o.nodeType)if(o.data===me)r.push({type:2,index:n});else{let e=-1;for(;-1!==(e=o.data.indexOf(ce,e+1));)r.push({type:7,index:n}),e+=ce.length-1}n++}}static createElement(e,t){const i=pe.createElement("template");return i.innerHTML=e,i}}function Le(e,t,i=e,o){var n,l,d,r;if(t===Ce)return t;let a=void 0!==o?null===(n=i._$Co)||void 0===n?void 0:n[o]:i._$Cl;const s=fe(t)?void 0:t._$litDirective$;return(null==a?void 0:a.constructor)!==s&&(null===(l=null==a?void 0:a._$AO)||void 0===l||l.call(a,!1),void 0===s?a=void 0:(a=new s(e),a._$AT(e,i,o)),void 0!==o?(null!==(d=(r=i)._$Co)&&void 0!==d?d:r._$Co=[])[o]=a:i._$Cl=a),void 0!==a&&(t=Le(e,a._$AS(e,t.values),a,o)),t}class Fe{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:o}=this._$AD,n=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:pe).importNode(i,!0);Te.currentNode=n;let l=Te.nextNode(),d=0,r=0,a=o[0];for(;void 0!==a;){if(d===a.index){let t;2===a.type?t=new je(l,l.nextSibling,this,e):1===a.type?t=new a.ctor(l,a.name,a.strings,this,e):6===a.type&&(t=new Pe(l,this,e)),this._$AV.push(t),a=o[++r]}d!==(null==a?void 0:a.index)&&(l=Te.nextNode(),d++)}return Te.currentNode=pe,n}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class je{constructor(e,t,i,o){var n;this.type=2,this._$AH=Ie,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cp=null===(n=null==o?void 0:o.isConnected)||void 0===n||n}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Le(this,e,t),fe(e)?e===Ie||null==e||""===e?(this._$AH!==Ie&&this._$AR(),this._$AH=Ie):e!==this._$AH&&e!==Ce&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>ge(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==Ie&&fe(this._$AH)?this._$AA.nextSibling.data=e:this.$(pe.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:o}=e,n="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=Re.createElement(Se(o.h,o.h[0]),this.options)),o);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===n)this._$AH.v(i);else{const e=new Fe(n,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=Oe.get(e.strings);return void 0===t&&Oe.set(e.strings,t=new Re(e)),t}T(e){ge(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const n of e)o===t.length?t.push(i=new je(this.k(ue()),this.k(ue()),this,this.options)):i=t[o],i._$AI(n),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Ne{constructor(e,t,i,o,n){this.type=1,this._$AH=Ie,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Ie}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const n=this.strings;let l=!1;if(void 0===n)e=Le(this,e,t,0),l=!fe(e)||e!==this._$AH&&e!==Ce,l&&(this._$AH=e);else{const o=e;let d,r;for(e=n[0],d=0;d<n.length-1;d++)r=Le(this,o[i+d],t,d),r===Ce&&(r=this._$AH[d]),l||(l=!fe(r)||r!==this._$AH[d]),r===Ie?e=Ie:e!==Ie&&(e+=(null!=r?r:"")+n[d+1]),this._$AH[d]=r}l&&!o&&this.j(e)}j(e){e===Ie?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class ze extends Ne{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Ie?void 0:e}}const Me=re?re.emptyScript:"";class De extends Ne{constructor(){super(...arguments),this.type=4}j(e){e&&e!==Ie?this.element.setAttribute(this.name,Me):this.element.removeAttribute(this.name)}}class Be extends Ne{constructor(e,t,i,o,n){super(e,t,i,o,n),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=Le(this,e,t,0))&&void 0!==i?i:Ie)===Ce)return;const o=this._$AH,n=e===Ie&&o!==Ie||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,l=e!==Ie&&(o===Ie||n);n&&this.element.removeEventListener(this.name,this,o),l&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class Pe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Le(this,e)}}const He=de.litHtmlPolyfillSupport;null==He||He(Re,je),(null!==(le=de.litHtmlVersions)&&void 0!==le?le:de.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Ve,Ue;let Ge=class extends ne{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var o,n;const l=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:t;let d=l._$litPart$;if(void 0===d){const e=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;l._$litPart$=d=new je(t.insertBefore(ue(),e),e,void 0,null!=i?i:{})}return d._$AI(e),d})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return Ce}};Ge.finalized=!0,Ge._$litElement$=!0,null===(Ve=globalThis.litElementHydrateSupport)||void 0===Ve||Ve.call(globalThis,{LitElement:Ge});const Xe=globalThis.litElementPolyfillSupport;null==Xe||Xe({LitElement:Ge}),(null!==(Ue=globalThis.litElementVersions)&&void 0!==Ue?Ue:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Ye=e=>e.nodeType===Node.ELEMENT_NODE;function qe(e){return{addClass:t=>{e.classList.add(t)},removeClass:t=>{e.classList.remove(t)},hasClass:t=>e.classList.contains(t)}}const We=()=>{},Ze={get passive(){return!1}};document.addEventListener("x",We,Ze),document.removeEventListener("x",We);const Ke=(e=window.document)=>{let t=e.activeElement;const i=[];if(!t)return i;for(;t&&(i.push(t),t.shadowRoot);)t=t.shadowRoot.activeElement;return i},Qe=e=>{const t=Ke();if(!t.length)return!1;const i=t[t.length-1],o=new Event("check-if-focused",{bubbles:!0,composed:!0});let n=[];const l=e=>{n=e.composedPath()};return document.body.addEventListener("check-if-focused",l),i.dispatchEvent(o),document.body.removeEventListener("check-if-focused",l),-1!==n.indexOf(e)};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class Je extends Ge{click(){if(this.mdcRoot)return this.mdcRoot.focus(),void this.mdcRoot.click();super.click()}createFoundation(){void 0!==this.mdcFoundation&&this.mdcFoundation.destroy(),this.mdcFoundationClass&&(this.mdcFoundation=new this.mdcFoundationClass(this.createAdapter()),this.mdcFoundation.init())}firstUpdated(){this.createFoundation()}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const et=e=>(t,i)=>{if(t.constructor._observers){if(!t.constructor.hasOwnProperty("_observers")){const e=t.constructor._observers;t.constructor._observers=new Map,e.forEach((e,i)=>t.constructor._observers.set(i,e))}}else{t.constructor._observers=new Map;const e=t.updated;t.updated=function(t){e.call(this,t),t.forEach((e,t)=>{const i=this.constructor._observers.get(t);void 0!==i&&i.call(this,this[t],e)})}}t.constructor._observers.set(i,e)},tt=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function it(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):tt(e,t)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ot(e){return it({...e,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nt=({finisher:e,descriptor:t})=>(i,o)=>{var n;if(void 0===o){const o=null!==(n=i.originalKey)&&void 0!==n?n:i.key,l=null!=t?{kind:"method",placement:"prototype",key:o,descriptor:t(i.key)}:{...i,key:o};return null!=e&&(l.finisher=function(t){e(t,o)}),l}{const n=i.constructor;void 0!==t&&Object.defineProperty(i,o,t(o)),null==e||e(n,o)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function lt(e){return nt({finisher:(t,i)=>{Object.assign(t.prototype[i],e)}})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function dt(e,t){return nt({descriptor:t=>{const i={get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==i?i:null},enumerable:!0,configurable:!0};return i}})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var rt;const at=null!=(null===(rt=window.HTMLSlotElement)||void 0===rt?void 0:rt.prototype.assignedElements)?(e,t)=>e.assignedElements(t):(e,t)=>e.assignedNodes(t).filter(e=>e.nodeType===Node.ELEMENT_NODE);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function st(e,t,i){let o;return o={flatten:t},i?function(e){const{slot:t,selector:i}=null!=e?e:{};return nt({descriptor:o=>({get(){var o;const n="slot"+(t?`[name=${t}]`:":not([name])"),l=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(n),d=null!=l?at(l,e):[];return i?d.filter(e=>e.matches(i)):d},enumerable:!0,configurable:!0})})}({slot:e,flatten:t,selector:i}):nt({descriptor:e=>({get(){var e,t;const i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector("slot:not([name])");return null!==(t=null==i?void 0:i.assignedNodes(o))&&void 0!==t?t:[]},enumerable:!0,configurable:!0})})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ct=1,mt=3,ht=4,pt=e=>(...t)=>({_$litDirective$:e,values:t});let ut=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ft=pt(class extends ut{constructor(e){var t;if(super(e),e.type!==ct||"class"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){var i,o;if(void 0===this.it){this.it=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e)));for(const e in t)t[e]&&!(null===(i=this.nt)||void 0===i?void 0:i.has(e))&&this.it.add(e);return this.render(t)}const n=e.element.classList;this.it.forEach(e=>{e in t||(n.remove(e),this.it.delete(e))});for(const e in t){const i=!!t[e];i===this.it.has(e)||(null===(o=this.nt)||void 0===o?void 0:o.has(e))||(i?(n.add(e),this.it.add(e)):(n.remove(e),this.it.delete(e)))}return Ce}});
/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var gt="Unknown",bt="Backspace",xt="Enter",_t="Spacebar",vt="PageUp",yt="PageDown",wt="End",$t="Home",At="ArrowLeft",Et="ArrowUp",Ct="ArrowRight",It="ArrowDown",Ot="Delete",Tt="Escape",St="Tab",kt=new Set;kt.add(bt),kt.add(xt),kt.add(_t),kt.add(vt),kt.add(yt),kt.add(wt),kt.add($t),kt.add(At),kt.add(Et),kt.add(Ct),kt.add(It),kt.add(Ot),kt.add(Tt),kt.add(St);var Rt=8,Lt=13,Ft=32,jt=33,Nt=34,zt=35,Mt=36,Dt=37,Bt=38,Pt=39,Ht=40,Vt=46,Ut=27,Gt=9,Xt=new Map;Xt.set(Rt,bt),Xt.set(Lt,xt),Xt.set(Ft,_t),Xt.set(jt,vt),Xt.set(Nt,yt),Xt.set(zt,wt),Xt.set(Mt,$t),Xt.set(Dt,At),Xt.set(Bt,Et),Xt.set(Pt,Ct),Xt.set(Ht,It),Xt.set(Vt,Ot),Xt.set(Ut,Tt),Xt.set(Gt,St);var Yt=new Set;function qt(e){var t=e.key;if(kt.has(t))return t;var i=Xt.get(e.keyCode);return i||gt}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */Yt.add(vt),Yt.add(yt),Yt.add(wt),Yt.add($t),Yt.add(At),Yt.add(Et),Yt.add(Ct),Yt.add(It);const Wt=(e,t)=>e-t,Zt=["input","button","textarea","select"];function Kt(e){return e instanceof Set}const Qt=e=>{const t=e===N.UNSET_INDEX?new Set:e;return Kt(t)?new Set(t):new Set([t])};class Jt extends A{constructor(e){super(Object.assign(Object.assign({},Jt.defaultAdapter),e)),this.isMulti_=!1,this.wrapFocus_=!1,this.isVertical_=!0,this.selectedIndex_=N.UNSET_INDEX,this.focusedItemIndex_=N.UNSET_INDEX,this.useActivatedClass_=!1,this.ariaCurrentAttrValue_=null}static get strings(){return j}static get numbers(){return N}static get defaultAdapter(){return{focusItemAtIndex:()=>{},getFocusedElementIndex:()=>0,getListItemCount:()=>0,isFocusInsideList:()=>!1,isRootFocused:()=>!1,notifyAction:()=>{},notifySelected:()=>{},getSelectedStateForElementIndex:()=>!1,setDisabledStateForElementIndex:()=>{},getDisabledStateForElementIndex:()=>!1,setSelectedStateForElementIndex:()=>{},setActivatedStateForElementIndex:()=>{},setTabIndexForElementIndex:()=>{},setAttributeForElementIndex:()=>{},getAttributeForElementIndex:()=>null}}setWrapFocus(e){this.wrapFocus_=e}setMulti(e){this.isMulti_=e;const t=this.selectedIndex_;if(e){if(!Kt(t)){const e=t===N.UNSET_INDEX;this.selectedIndex_=e?new Set:new Set([t])}}else if(Kt(t))if(t.size){const e=Array.from(t).sort(Wt);this.selectedIndex_=e[0]}else this.selectedIndex_=N.UNSET_INDEX}setVerticalOrientation(e){this.isVertical_=e}setUseActivatedClass(e){this.useActivatedClass_=e}getSelectedIndex(){return this.selectedIndex_}setSelectedIndex(e){this.isIndexValid_(e)&&(this.isMulti_?this.setMultiSelectionAtIndex_(Qt(e)):this.setSingleSelectionAtIndex_(e))}handleFocusIn(e,t){t>=0&&this.adapter.setTabIndexForElementIndex(t,0)}handleFocusOut(e,t){t>=0&&this.adapter.setTabIndexForElementIndex(t,-1),setTimeout(()=>{this.adapter.isFocusInsideList()||this.setTabindexToFirstSelectedItem_()},0)}handleKeydown(e,t,i){const o="ArrowLeft"===qt(e),n="ArrowUp"===qt(e),l="ArrowRight"===qt(e),d="ArrowDown"===qt(e),r="Home"===qt(e),a="End"===qt(e),s="Enter"===qt(e),c="Spacebar"===qt(e);if(this.adapter.isRootFocused())return void(n||a?(e.preventDefault(),this.focusLastElement()):(d||r)&&(e.preventDefault(),this.focusFirstElement()));let m,h=this.adapter.getFocusedElementIndex();if(!(-1===h&&(h=i,h<0))){if(this.isVertical_&&d||!this.isVertical_&&l)this.preventDefaultEvent(e),m=this.focusNextElement(h);else if(this.isVertical_&&n||!this.isVertical_&&o)this.preventDefaultEvent(e),m=this.focusPrevElement(h);else if(r)this.preventDefaultEvent(e),m=this.focusFirstElement();else if(a)this.preventDefaultEvent(e),m=this.focusLastElement();else if((s||c)&&t){const t=e.target;if(t&&"A"===t.tagName&&s)return;this.preventDefaultEvent(e),this.setSelectedIndexOnAction_(h,!0)}this.focusedItemIndex_=h,void 0!==m&&(this.setTabindexAtIndex_(m),this.focusedItemIndex_=m)}}handleSingleSelection(e,t,i){e!==N.UNSET_INDEX&&(this.setSelectedIndexOnAction_(e,t,i),this.setTabindexAtIndex_(e),this.focusedItemIndex_=e)}focusNextElement(e){let t=e+1;if(t>=this.adapter.getListItemCount()){if(!this.wrapFocus_)return e;t=0}return this.adapter.focusItemAtIndex(t),t}focusPrevElement(e){let t=e-1;if(t<0){if(!this.wrapFocus_)return e;t=this.adapter.getListItemCount()-1}return this.adapter.focusItemAtIndex(t),t}focusFirstElement(){return this.adapter.focusItemAtIndex(0),0}focusLastElement(){const e=this.adapter.getListItemCount()-1;return this.adapter.focusItemAtIndex(e),e}setEnabled(e,t){this.isIndexValid_(e)&&this.adapter.setDisabledStateForElementIndex(e,!t)}preventDefaultEvent(e){const t=`${e.target.tagName}`.toLowerCase();-1===Zt.indexOf(t)&&e.preventDefault()}setSingleSelectionAtIndex_(e,t=!0){this.selectedIndex_!==e&&(this.selectedIndex_!==N.UNSET_INDEX&&(this.adapter.setSelectedStateForElementIndex(this.selectedIndex_,!1),this.useActivatedClass_&&this.adapter.setActivatedStateForElementIndex(this.selectedIndex_,!1)),t&&this.adapter.setSelectedStateForElementIndex(e,!0),this.useActivatedClass_&&this.adapter.setActivatedStateForElementIndex(e,!0),this.setAriaForSingleSelectionAtIndex_(e),this.selectedIndex_=e,this.adapter.notifySelected(e))}setMultiSelectionAtIndex_(e,t=!0){const i=((e,t)=>{const i=Array.from(e),o=Array.from(t),n={added:[],removed:[]},l=i.sort(Wt),d=o.sort(Wt);let r=0,a=0;for(;r<l.length||a<d.length;){const e=l[r],t=d[a];e!==t?void 0!==e&&(void 0===t||e<t)?(n.removed.push(e),r++):void 0!==t&&(void 0===e||t<e)&&(n.added.push(t),a++):(r++,a++)}return n})(Qt(this.selectedIndex_),e);if(i.removed.length||i.added.length){for(const e of i.removed)t&&this.adapter.setSelectedStateForElementIndex(e,!1),this.useActivatedClass_&&this.adapter.setActivatedStateForElementIndex(e,!1);for(const e of i.added)t&&this.adapter.setSelectedStateForElementIndex(e,!0),this.useActivatedClass_&&this.adapter.setActivatedStateForElementIndex(e,!0);this.selectedIndex_=e,this.adapter.notifySelected(e,i)}}setAriaForSingleSelectionAtIndex_(e){this.selectedIndex_===N.UNSET_INDEX&&(this.ariaCurrentAttrValue_=this.adapter.getAttributeForElementIndex(e,j.ARIA_CURRENT));const t=null!==this.ariaCurrentAttrValue_,i=t?j.ARIA_CURRENT:j.ARIA_SELECTED;this.selectedIndex_!==N.UNSET_INDEX&&this.adapter.setAttributeForElementIndex(this.selectedIndex_,i,"false");const o=t?this.ariaCurrentAttrValue_:"true";this.adapter.setAttributeForElementIndex(e,i,o)}setTabindexAtIndex_(e){this.focusedItemIndex_===N.UNSET_INDEX&&0!==e?this.adapter.setTabIndexForElementIndex(0,-1):this.focusedItemIndex_>=0&&this.focusedItemIndex_!==e&&this.adapter.setTabIndexForElementIndex(this.focusedItemIndex_,-1),this.adapter.setTabIndexForElementIndex(e,0)}setTabindexToFirstSelectedItem_(){let e=0;"number"==typeof this.selectedIndex_&&this.selectedIndex_!==N.UNSET_INDEX?e=this.selectedIndex_:Kt(this.selectedIndex_)&&this.selectedIndex_.size>0&&(e=Math.min(...this.selectedIndex_)),this.setTabindexAtIndex_(e)}isIndexValid_(e){if(e instanceof Set){if(!this.isMulti_)throw new Error("MDCListFoundation: Array of index is only supported for checkbox based list");if(0===e.size)return!0;{let t=!1;for(const i of e)if(t=this.isIndexInRange_(i),t)break;return t}}if("number"==typeof e){if(this.isMulti_)throw new Error("MDCListFoundation: Expected array of index for checkbox based list but got number: "+e);return e===N.UNSET_INDEX||this.isIndexInRange_(e)}return!1}isIndexInRange_(e){const t=this.adapter.getListItemCount();return e>=0&&e<t}setSelectedIndexOnAction_(e,t,i){if(this.adapter.getDisabledStateForElementIndex(e))return;let o=e;if(this.isMulti_&&(o=new Set([e])),this.isIndexValid_(o)){if(this.isMulti_)this.toggleMultiAtIndex(e,i,t);else if(t||i)this.setSingleSelectionAtIndex_(e,t);else{this.selectedIndex_===e&&this.setSingleSelectionAtIndex_(N.UNSET_INDEX)}t&&this.adapter.notifyAction(e)}}toggleMultiAtIndex(e,t,i=!0){let o=!1;o=void 0===t?!this.adapter.getSelectedStateForElementIndex(e):t;const n=Qt(this.selectedIndex_);o?n.add(e):n.delete(e),this.setMultiSelectionAtIndex_(n,i)}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class ei extends Je{constructor(){super(...arguments),this.mdcFoundationClass=P,this.listElement_=null,this.anchor=null,this.open=!1,this.quick=!1,this.wrapFocus=!1,this.innerRole="menu",this.innerAriaLabel=null,this.corner="TOP_START",this.x=null,this.y=null,this.absolute=!1,this.multi=!1,this.activatable=!1,this.fixed=!1,this.forceGroupSelection=!1,this.fullwidth=!1,this.menuCorner="START",this.stayOpenOnBodyClick=!1,this.defaultFocus="LIST_ROOT",this._listUpdateComplete=null}get listElement(){return this.listElement_||(this.listElement_=this.renderRoot.querySelector("mwc-list")),this.listElement_}get items(){const e=this.listElement;return e?e.items:[]}get index(){const e=this.listElement;return e?e.index:-1}get selected(){const e=this.listElement;return e?e.selected:null}render(){return this.renderSurface()}renderSurface(){const e=this.getSurfaceClasses();return Ee`
      <mwc-menu-surface
        ?hidden=${!this.open}
        .anchor=${this.anchor}
        .open=${this.open}
        .quick=${this.quick}
        .corner=${this.corner}
        .x=${this.x}
        .y=${this.y}
        .absolute=${this.absolute}
        .fixed=${this.fixed}
        .fullwidth=${this.fullwidth}
        .menuCorner=${this.menuCorner}
        ?stayOpenOnBodyClick=${this.stayOpenOnBodyClick}
        class=${ft(e)}
        @closed=${this.onClosed}
        @opened=${this.onOpened}
        @keydown=${this.onKeydown}>
      ${this.renderList()}
    </mwc-menu-surface>`}getSurfaceClasses(){return{"mdc-menu":!0,"mdc-menu-surface":!0}}renderList(){const e="menu"===this.innerRole?"menuitem":"option",t=this.renderListClasses();return Ee`
      <mwc-list
          rootTabbable
          .innerAriaLabel=${this.innerAriaLabel}
          .innerRole=${this.innerRole}
          .multi=${this.multi}
          class=${ft(t)}
          .itemRoles=${e}
          .wrapFocus=${this.wrapFocus}
          .activatable=${this.activatable}
          @action=${this.onAction}>
        <slot></slot>
      </mwc-list>`}renderListClasses(){return{"mdc-deprecated-list":!0}}createAdapter(){return{addClassToElementAtIndex:(e,t)=>{const i=this.listElement;if(!i)return;const o=i.items[e];o&&("mdc-menu-item--selected"===t?this.forceGroupSelection&&!o.selected&&i.toggle(e,!0):o.classList.add(t))},removeClassFromElementAtIndex:(e,t)=>{const i=this.listElement;if(!i)return;const o=i.items[e];o&&("mdc-menu-item--selected"===t?o.selected&&i.toggle(e,!1):o.classList.remove(t))},addAttributeToElementAtIndex:(e,t,i)=>{const o=this.listElement;if(!o)return;const n=o.items[e];n&&n.setAttribute(t,i)},removeAttributeFromElementAtIndex:(e,t)=>{const i=this.listElement;if(!i)return;const o=i.items[e];o&&o.removeAttribute(t)},getAttributeFromElementAtIndex:(e,t)=>{const i=this.listElement;if(!i)return null;const o=i.items[e];return o?o.getAttribute(t):null},elementContainsClass:(e,t)=>e.classList.contains(t),closeSurface:()=>{this.open=!1},getElementIndex:e=>{const t=this.listElement;return t?t.items.indexOf(e):-1},notifySelected:()=>{},getMenuItemCount:()=>{const e=this.listElement;return e?e.items.length:0},focusItemAtIndex:e=>{const t=this.listElement;if(!t)return;const i=t.items[e];i&&i.focus()},focusListRoot:()=>{this.listElement&&this.listElement.focus()},getSelectedSiblingOfItemAtIndex:e=>{const t=this.listElement;if(!t)return-1;const i=t.items[e];if(!i||!i.group)return-1;for(let o=0;o<t.items.length;o++){if(o===e)continue;const n=t.items[o];if(n.selected&&n.group===i.group)return o}return-1},isSelectableItemAtIndex:e=>{const t=this.listElement;if(!t)return!1;const i=t.items[e];return!!i&&i.hasAttribute("group")}}}onKeydown(e){this.mdcFoundation&&this.mdcFoundation.handleKeydown(e)}onAction(e){const t=this.listElement;if(this.mdcFoundation&&t){const i=e.detail.index,o=t.items[i];o&&this.mdcFoundation.handleItemAction(o)}}onOpened(){this.open=!0,this.mdcFoundation&&this.mdcFoundation.handleMenuSurfaceOpened()}onClosed(){this.open=!1}async getUpdateComplete(){await this._listUpdateComplete;return await super.getUpdateComplete()}async firstUpdated(){super.firstUpdated();const e=this.listElement;e&&(this._listUpdateComplete=e.updateComplete,await this._listUpdateComplete)}select(e){const t=this.listElement;t&&t.select(e)}close(){this.open=!1}show(){this.open=!0}getFocusedItemIndex(){const e=this.listElement;return e?e.getFocusedItemIndex():-1}focusItemAtIndex(e){const t=this.listElement;t&&t.focusItemAtIndex(e)}layout(e=!0){const t=this.listElement;t&&t.layout(e)}}o([dt(".mdc-menu")],ei.prototype,"mdcRoot",void 0),o([dt("slot")],ei.prototype,"slotElement",void 0),o([it({type:Object})],ei.prototype,"anchor",void 0),o([it({type:Boolean,reflect:!0})],ei.prototype,"open",void 0),o([it({type:Boolean})],ei.prototype,"quick",void 0),o([it({type:Boolean})],ei.prototype,"wrapFocus",void 0),o([it({type:String})],ei.prototype,"innerRole",void 0),o([it({type:String})],ei.prototype,"innerAriaLabel",void 0),o([it({type:String})],ei.prototype,"corner",void 0),o([it({type:Number})],ei.prototype,"x",void 0),o([it({type:Number})],ei.prototype,"y",void 0),o([it({type:Boolean})],ei.prototype,"absolute",void 0),o([it({type:Boolean})],ei.prototype,"multi",void 0),o([it({type:Boolean})],ei.prototype,"activatable",void 0),o([it({type:Boolean})],ei.prototype,"fixed",void 0),o([it({type:Boolean})],ei.prototype,"forceGroupSelection",void 0),o([it({type:Boolean})],ei.prototype,"fullwidth",void 0),o([it({type:String})],ei.prototype,"menuCorner",void 0),o([it({type:Boolean})],ei.prototype,"stayOpenOnBodyClick",void 0),o([it({type:String}),et(function(e){this.mdcFoundation&&this.mdcFoundation.setDefaultFocusState(x[e])})],ei.prototype,"defaultFocus",void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const ti=Y`mwc-list ::slotted([mwc-list-item]:not([twoline])),mwc-list ::slotted([noninteractive]:not([twoline])){height:var(--mdc-menu-item-height, 48px)}`
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,ii="important",oi=" !"+ii,ni=pt(class extends ut{constructor(e){var t;if(super(e),e.type!==ct||"style"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,i)=>{const o=e[i];return null==o?t:t+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(e,[t]){const{style:i}=e.element;if(void 0===this.ht){this.ht=new Set;for(const e in t)this.ht.add(e);return this.render(t)}this.ht.forEach(e=>{null==t[e]&&(this.ht.delete(e),e.includes("-")?i.removeProperty(e):i[e]="")});for(const e in t){const o=t[e];if(null!=o){this.ht.add(e);const t="string"==typeof o&&o.endsWith(oi);e.includes("-")||t?i.setProperty(e,t?o.slice(0,-11):o,t?ii:""):i[e]=o}}return Ce}}),li={TOP_LEFT:L.TOP_LEFT,TOP_RIGHT:L.TOP_RIGHT,BOTTOM_LEFT:L.BOTTOM_LEFT,BOTTOM_RIGHT:L.BOTTOM_RIGHT,TOP_START:L.TOP_START,TOP_END:L.TOP_END,BOTTOM_START:L.BOTTOM_START,BOTTOM_END:L.BOTTOM_END};class di extends Je{constructor(){super(...arguments),this.mdcFoundationClass=B,this.absolute=!1,this.fullwidth=!1,this.fixed=!1,this.x=null,this.y=null,this.quick=!1,this.open=!1,this.stayOpenOnBodyClick=!1,this.bitwiseCorner=L.TOP_START,this.previousMenuCorner=null,this.menuCorner="START",this.corner="TOP_START",this.styleTop="",this.styleLeft="",this.styleRight="",this.styleBottom="",this.styleMaxHeight="",this.styleTransformOrigin="",this.anchor=null,this.previouslyFocused=null,this.previousAnchor=null,this.onBodyClickBound=()=>{}}render(){return this.renderSurface()}renderSurface(){const e=this.getRootClasses(),t=this.getRootStyles();return Ee`
      <div
          class=${ft(e)}
          style="${ni(t)}"
          @keydown=${this.onKeydown}
          @opened=${this.registerBodyClick}
          @closed=${this.deregisterBodyClick}>
        ${this.renderContent()}
      </div>`}getRootClasses(){return{"mdc-menu-surface":!0,"mdc-menu-surface--fixed":this.fixed,"mdc-menu-surface--fullwidth":this.fullwidth}}getRootStyles(){return{top:this.styleTop,left:this.styleLeft,right:this.styleRight,bottom:this.styleBottom,"max-height":this.styleMaxHeight,"transform-origin":this.styleTransformOrigin}}renderContent(){return Ee`<slot></slot>`}createAdapter(){return Object.assign(Object.assign({},qe(this.mdcRoot)),{hasAnchor:()=>!!this.anchor,notifyClose:()=>{const e=new CustomEvent("closed",{bubbles:!0,composed:!0});this.open=!1,this.mdcRoot.dispatchEvent(e)},notifyClosing:()=>{const e=new CustomEvent("closing",{bubbles:!0,composed:!0});this.mdcRoot.dispatchEvent(e)},notifyOpen:()=>{const e=new CustomEvent("opened",{bubbles:!0,composed:!0});this.open=!0,this.mdcRoot.dispatchEvent(e)},notifyOpening:()=>{const e=new CustomEvent("opening",{bubbles:!0,composed:!0});this.mdcRoot.dispatchEvent(e)},isElementInContainer:()=>!1,isRtl:()=>!!this.mdcRoot&&"rtl"===getComputedStyle(this.mdcRoot).direction,setTransformOrigin:e=>{this.mdcRoot&&(this.styleTransformOrigin=e)},isFocused:()=>Qe(this),saveFocus:()=>{const e=Ke(),t=e.length;t||(this.previouslyFocused=null),this.previouslyFocused=e[t-1]},restoreFocus:()=>{this.previouslyFocused&&"focus"in this.previouslyFocused&&this.previouslyFocused.focus()},getInnerDimensions:()=>{const e=this.mdcRoot;return e?{width:e.offsetWidth,height:e.offsetHeight}:{width:0,height:0}},getAnchorDimensions:()=>{const e=this.anchor;return e?e.getBoundingClientRect():null},getBodyDimensions:()=>({width:document.body.clientWidth,height:document.body.clientHeight}),getWindowDimensions:()=>({width:window.innerWidth,height:window.innerHeight}),getWindowScroll:()=>({x:window.pageXOffset,y:window.pageYOffset}),setPosition:e=>{this.mdcRoot&&(this.styleLeft="left"in e?`${e.left}px`:"",this.styleRight="right"in e?`${e.right}px`:"",this.styleTop="top"in e?`${e.top}px`:"",this.styleBottom="bottom"in e?`${e.bottom}px`:"")},setMaxHeight:async e=>{this.mdcRoot&&(this.styleMaxHeight=e,await this.updateComplete,this.styleMaxHeight=`var(--mdc-menu-max-height, ${e})`)}})}onKeydown(e){this.mdcFoundation&&this.mdcFoundation.handleKeydown(e)}onBodyClick(e){if(this.stayOpenOnBodyClick)return;-1===e.composedPath().indexOf(this)&&this.close()}registerBodyClick(){this.onBodyClickBound=this.onBodyClick.bind(this),document.body.addEventListener("click",this.onBodyClickBound,{passive:!0,capture:!0})}deregisterBodyClick(){document.body.removeEventListener("click",this.onBodyClickBound,{capture:!0})}onOpenChanged(e,t){this.mdcFoundation&&(e?this.mdcFoundation.open():void 0!==t&&this.mdcFoundation.close())}close(){this.open=!1}show(){this.open=!0}}o([dt(".mdc-menu-surface")],di.prototype,"mdcRoot",void 0),o([dt("slot")],di.prototype,"slotElement",void 0),o([it({type:Boolean}),et(function(e){this.mdcFoundation&&!this.fixed&&this.mdcFoundation.setIsHoisted(e)})],di.prototype,"absolute",void 0),o([it({type:Boolean})],di.prototype,"fullwidth",void 0),o([it({type:Boolean}),et(function(e){this.mdcFoundation&&!this.absolute&&this.mdcFoundation.setFixedPosition(e)})],di.prototype,"fixed",void 0),o([it({type:Number}),et(function(e){this.mdcFoundation&&null!==this.y&&null!==e&&(this.mdcFoundation.setAbsolutePosition(e,this.y),this.mdcFoundation.setAnchorMargin({left:e,top:this.y,right:-e,bottom:this.y}))})],di.prototype,"x",void 0),o([it({type:Number}),et(function(e){this.mdcFoundation&&null!==this.x&&null!==e&&(this.mdcFoundation.setAbsolutePosition(this.x,e),this.mdcFoundation.setAnchorMargin({left:this.x,top:e,right:-this.x,bottom:e}))})],di.prototype,"y",void 0),o([it({type:Boolean}),et(function(e){this.mdcFoundation&&this.mdcFoundation.setQuickOpen(e)})],di.prototype,"quick",void 0),o([it({type:Boolean,reflect:!0}),et(function(e,t){this.onOpenChanged(e,t)})],di.prototype,"open",void 0),o([it({type:Boolean})],di.prototype,"stayOpenOnBodyClick",void 0),o([ot(),et(function(e){this.mdcFoundation&&this.mdcFoundation.setAnchorCorner(e)})],di.prototype,"bitwiseCorner",void 0),o([it({type:String}),et(function(e){if(this.mdcFoundation){const t="START"===e||"END"===e,i=null===this.previousMenuCorner,o=!i&&e!==this.previousMenuCorner;t&&(o||i&&"END"===e)&&(this.bitwiseCorner=this.bitwiseCorner^R.RIGHT,this.mdcFoundation.flipCornerHorizontally(),this.previousMenuCorner=e)}})],di.prototype,"menuCorner",void 0),o([it({type:String}),et(function(e){if(this.mdcFoundation&&e){let t=li[e];"END"===this.menuCorner&&(t^=R.RIGHT),this.bitwiseCorner=t}})],di.prototype,"corner",void 0),o([ot()],di.prototype,"styleTop",void 0),o([ot()],di.prototype,"styleLeft",void 0),o([ot()],di.prototype,"styleRight",void 0),o([ot()],di.prototype,"styleBottom",void 0),o([ot()],di.prototype,"styleMaxHeight",void 0),o([ot()],di.prototype,"styleTransformOrigin",void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const ri=Y`.mdc-menu-surface{display:none;position:absolute;box-sizing:border-box;max-width:calc(100vw - 32px);max-width:var(--mdc-menu-max-width, calc(100vw - 32px));max-height:calc(100vh - 32px);max-height:var(--mdc-menu-max-height, calc(100vh - 32px));margin:0;padding:0;transform:scale(1);transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;z-index:8;transition:opacity .03s linear,transform .12s cubic-bezier(0, 0, 0.2, 1),height 250ms cubic-bezier(0, 0, 0.2, 1);box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12);background-color:#fff;background-color:var(--mdc-theme-surface, #fff);color:#000;color:var(--mdc-theme-on-surface, #000);border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);transform-origin-left:top left;transform-origin-right:top right}.mdc-menu-surface:focus{outline:none}.mdc-menu-surface--animating-open{display:inline-block;transform:scale(0.8);opacity:0}.mdc-menu-surface--open{display:inline-block;transform:scale(1);opacity:1}.mdc-menu-surface--animating-closed{display:inline-block;opacity:0;transition:opacity .075s linear}[dir=rtl] .mdc-menu-surface,.mdc-menu-surface[dir=rtl]{transform-origin-left:top right;transform-origin-right:top left}.mdc-menu-surface--anchor{position:relative;overflow:visible}.mdc-menu-surface--fixed{position:fixed}.mdc-menu-surface--fullwidth{width:100%}:host(:not([open])){display:none}.mdc-menu-surface{z-index:8;z-index:var(--mdc-menu-z-index, 8);min-width:112px;min-width:var(--mdc-menu-min-width, 112px)}`
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,ai=e=>null!=e?e:Ie;const si=e=>e.hasAttribute("mwc-list-item");function ci(){const e=this.itemsReadyResolver;this.itemsReady=new Promise(e=>this.itemsReadyResolver=e),e()}class mi extends Je{constructor(){super(),this.mdcAdapter=null,this.mdcFoundationClass=Jt,this.activatable=!1,this.multi=!1,this.wrapFocus=!1,this.itemRoles=null,this.innerRole=null,this.innerAriaLabel=null,this.rootTabbable=!1,this.previousTabindex=null,this.noninteractive=!1,this.itemsReadyResolver=()=>{},this.itemsReady=Promise.resolve([]),this.items_=[];const e=
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function(e,t=50){let i;return function(o=!0){clearTimeout(i),i=setTimeout(()=>{e(o)},t)}}(this.layout.bind(this));this.debouncedLayout=(t=!0)=>{ci.call(this),e(t)}}async getUpdateComplete(){const e=await super.getUpdateComplete();return await this.itemsReady,e}get items(){return this.items_}updateItems(){var e;const t=null!==(e=this.assignedElements)&&void 0!==e?e:[],i=[];for(const e of t)si(e)&&(i.push(e),e._managingList=this),e.hasAttribute("divider")&&!e.hasAttribute("role")&&e.setAttribute("role","separator");this.items_=i;const o=new Set;if(this.items_.forEach((e,t)=>{this.itemRoles?e.setAttribute("role",this.itemRoles):e.removeAttribute("role"),e.selected&&o.add(t)}),this.multi)this.select(o);else{const e=o.size?o.entries().next().value[1]:-1;this.select(e)}const n=new Event("items-updated",{bubbles:!0,composed:!0});this.dispatchEvent(n)}get selected(){const e=this.index;if(!Kt(e))return-1===e?null:this.items[e];const t=[];for(const i of e)t.push(this.items[i]);return t}get index(){return this.mdcFoundation?this.mdcFoundation.getSelectedIndex():-1}render(){const e=null===this.innerRole?void 0:this.innerRole,t=null===this.innerAriaLabel?void 0:this.innerAriaLabel,i=this.rootTabbable?"0":"-1";return Ee`
      <!-- @ts-ignore -->
      <ul
          tabindex=${i}
          role="${ai(e)}"
          aria-label="${ai(t)}"
          class="mdc-deprecated-list"
          @keydown=${this.onKeydown}
          @focusin=${this.onFocusIn}
          @focusout=${this.onFocusOut}
          @request-selected=${this.onRequestSelected}
          @list-item-rendered=${this.onListItemConnected}>
        <slot></slot>
        ${this.renderPlaceholder()}
      </ul>
    `}renderPlaceholder(){var e;const t=null!==(e=this.assignedElements)&&void 0!==e?e:[];return void 0!==this.emptyMessage&&0===t.length?Ee`
        <mwc-list-item noninteractive>${this.emptyMessage}</mwc-list-item>
      `:null}firstUpdated(){super.firstUpdated(),this.items.length||(this.mdcFoundation.setMulti(this.multi),this.layout())}onFocusIn(e){if(this.mdcFoundation&&this.mdcRoot){const t=this.getIndexOfTarget(e);this.mdcFoundation.handleFocusIn(e,t)}}onFocusOut(e){if(this.mdcFoundation&&this.mdcRoot){const t=this.getIndexOfTarget(e);this.mdcFoundation.handleFocusOut(e,t)}}onKeydown(e){if(this.mdcFoundation&&this.mdcRoot){const t=this.getIndexOfTarget(e),i=e.target,o=si(i);this.mdcFoundation.handleKeydown(e,o,t)}}onRequestSelected(e){if(this.mdcFoundation){let t=this.getIndexOfTarget(e);if(-1===t&&(this.layout(),t=this.getIndexOfTarget(e),-1===t))return;if(this.items[t].disabled)return;const i=e.detail.selected,o=e.detail.source;this.mdcFoundation.handleSingleSelection(t,"interaction"===o,i),e.stopPropagation()}}getIndexOfTarget(e){const t=this.items,i=e.composedPath();for(const e of i){let i=-1;if(Ye(e)&&si(e)&&(i=t.indexOf(e)),-1!==i)return i}return-1}createAdapter(){return this.mdcAdapter={getListItemCount:()=>this.mdcRoot?this.items.length:0,getFocusedElementIndex:this.getFocusedItemIndex,getAttributeForElementIndex:(e,t)=>{if(!this.mdcRoot)return"";const i=this.items[e];return i?i.getAttribute(t):""},setAttributeForElementIndex:(e,t,i)=>{if(!this.mdcRoot)return;const o=this.items[e];o&&o.setAttribute(t,i)},focusItemAtIndex:e=>{const t=this.items[e];t&&t.focus()},setTabIndexForElementIndex:(e,t)=>{const i=this.items[e];i&&(i.tabindex=t)},notifyAction:e=>{const t={bubbles:!0,composed:!0};t.detail={index:e};const i=new CustomEvent("action",t);this.dispatchEvent(i)},notifySelected:(e,t)=>{const i={bubbles:!0,composed:!0};i.detail={index:e,diff:t};const o=new CustomEvent("selected",i);this.dispatchEvent(o)},isFocusInsideList:()=>Qe(this),isRootFocused:()=>{const e=this.mdcRoot;return e.getRootNode().activeElement===e},setDisabledStateForElementIndex:(e,t)=>{const i=this.items[e];i&&(i.disabled=t)},getDisabledStateForElementIndex:e=>{const t=this.items[e];return!!t&&t.disabled},setSelectedStateForElementIndex:(e,t)=>{const i=this.items[e];i&&(i.selected=t)},getSelectedStateForElementIndex:e=>{const t=this.items[e];return!!t&&t.selected},setActivatedStateForElementIndex:(e,t)=>{const i=this.items[e];i&&(i.activated=t)}},this.mdcAdapter}selectUi(e,t=!1){const i=this.items[e];i&&(i.selected=!0,i.activated=t)}deselectUi(e){const t=this.items[e];t&&(t.selected=!1,t.activated=!1)}select(e){this.mdcFoundation&&this.mdcFoundation.setSelectedIndex(e)}toggle(e,t){this.multi&&this.mdcFoundation.toggleMultiAtIndex(e,t)}onListItemConnected(e){const t=e.target;this.layout(-1===this.items.indexOf(t))}layout(e=!0){e&&this.updateItems();const t=this.items[0];for(const e of this.items)e.tabindex=-1;t&&(this.noninteractive?this.previousTabindex||(this.previousTabindex=t):t.tabindex=0),this.itemsReadyResolver()}getFocusedItemIndex(){if(!this.mdcRoot)return-1;if(!this.items.length)return-1;const e=Ke();if(!e.length)return-1;for(let t=e.length-1;t>=0;t--){const i=e[t];if(si(i))return this.items.indexOf(i)}return-1}focusItemAtIndex(e){for(const e of this.items)if(0===e.tabindex){e.tabindex=-1;break}this.items[e].tabindex=0,this.items[e].focus()}focus(){const e=this.mdcRoot;e&&e.focus()}blur(){const e=this.mdcRoot;e&&e.blur()}}o([it({type:String})],mi.prototype,"emptyMessage",void 0),o([dt(".mdc-deprecated-list")],mi.prototype,"mdcRoot",void 0),o([st("",!0,"*")],mi.prototype,"assignedElements",void 0),o([st("",!0,'[tabindex="0"]')],mi.prototype,"tabbableElements",void 0),o([it({type:Boolean}),et(function(e){this.mdcFoundation&&this.mdcFoundation.setUseActivatedClass(e)})],mi.prototype,"activatable",void 0),o([it({type:Boolean}),et(function(e,t){this.mdcFoundation&&this.mdcFoundation.setMulti(e),void 0!==t&&this.layout()})],mi.prototype,"multi",void 0),o([it({type:Boolean}),et(function(e){this.mdcFoundation&&this.mdcFoundation.setWrapFocus(e)})],mi.prototype,"wrapFocus",void 0),o([it({type:String}),et(function(e,t){void 0!==t&&this.updateItems()})],mi.prototype,"itemRoles",void 0),o([it({type:String})],mi.prototype,"innerRole",void 0),o([it({type:String})],mi.prototype,"innerAriaLabel",void 0),o([it({type:Boolean})],mi.prototype,"rootTabbable",void 0),o([it({type:Boolean,reflect:!0}),et(function(e){var t,i;if(e){const e=null!==(i=null===(t=this.tabbableElements)||void 0===t?void 0:t[0])&&void 0!==i?i:null;this.previousTabindex=e,e&&e.setAttribute("tabindex","-1")}else!e&&this.previousTabindex&&(this.previousTabindex.setAttribute("tabindex","0"),this.previousTabindex=null)})],mi.prototype,"noninteractive",void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const hi=Y`@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{display:block}.mdc-deprecated-list{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);line-height:1.5rem;margin:0;padding:8px 0;list-style-type:none;color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));padding:var(--mdc-list-vertical-padding, 8px) 0}.mdc-deprecated-list:focus{outline:none}.mdc-deprecated-list-item{height:48px}.mdc-deprecated-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-deprecated-list ::slotted([divider]){height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgba(0, 0, 0, 0.12)}.mdc-deprecated-list ::slotted([divider][padded]){margin:0 var(--mdc-list-side-padding, 16px)}.mdc-deprecated-list ::slotted([divider][inset]){margin-left:var(--mdc-list-inset-margin, 72px);margin-right:0;width:calc( 100% - var(--mdc-list-inset-margin, 72px) )}[dir=rtl] .mdc-deprecated-list ::slotted([divider][inset]),.mdc-deprecated-list ::slotted([divider][inset][dir=rtl]){margin-left:0;margin-right:var(--mdc-list-inset-margin, 72px)}.mdc-deprecated-list ::slotted([divider][inset][padded]){width:calc( 100% - var(--mdc-list-inset-margin, 72px) - var(--mdc-list-side-padding, 16px) )}.mdc-deprecated-list--dense ::slotted([mwc-list-item]){height:40px}.mdc-deprecated-list--dense ::slotted([mwc-list]){--mdc-list-item-graphic-size: 20px}.mdc-deprecated-list--two-line.mdc-deprecated-list--dense ::slotted([mwc-list-item]),.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense ::slotted([mwc-list-item]){height:60px}.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense ::slotted([mwc-list]){--mdc-list-item-graphic-size: 36px}:host([noninteractive]){pointer-events:none;cursor:default}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text){display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text)::before{display:inline-block;width:0;height:24px;content:"";vertical-align:0}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text)::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}`
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;class pi{constructor(e){this.startPress=t=>{e().then(e=>{e&&e.startPress(t)})},this.endPress=()=>{e().then(e=>{e&&e.endPress()})},this.startFocus=()=>{e().then(e=>{e&&e.startFocus()})},this.endFocus=()=>{e().then(e=>{e&&e.endFocus()})},this.startHover=()=>{e().then(e=>{e&&e.startHover()})},this.endHover=()=>{e().then(e=>{e&&e.endHover()})}}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class ui extends Ge{constructor(){super(...arguments),this.value="",this.group=null,this.tabindex=-1,this.disabled=!1,this.twoline=!1,this.activated=!1,this.graphic=null,this.multipleGraphics=!1,this.hasMeta=!1,this.noninteractive=!1,this.selected=!1,this.shouldRenderRipple=!1,this._managingList=null,this.boundOnClick=this.onClick.bind(this),this._firstChanged=!0,this._skipPropRequest=!1,this.rippleHandlers=new pi(()=>(this.shouldRenderRipple=!0,this.ripple)),this.listeners=[{target:this,eventNames:["click"],cb:()=>{this.onClick()}},{target:this,eventNames:["mouseenter"],cb:this.rippleHandlers.startHover},{target:this,eventNames:["mouseleave"],cb:this.rippleHandlers.endHover},{target:this,eventNames:["focus"],cb:this.rippleHandlers.startFocus},{target:this,eventNames:["blur"],cb:this.rippleHandlers.endFocus},{target:this,eventNames:["mousedown","touchstart"],cb:e=>{const t=e.type;this.onDown("mousedown"===t?"mouseup":"touchend",e)}}]}get text(){const e=this.textContent;return e?e.trim():""}render(){const e=this.renderText(),t=this.graphic?this.renderGraphic():Ee``,i=this.hasMeta?this.renderMeta():Ee``;return Ee`
      ${this.renderRipple()}
      ${t}
      ${e}
      ${i}`}renderRipple(){return this.shouldRenderRipple?Ee`
      <mwc-ripple
        .activated=${this.activated}>
      </mwc-ripple>`:this.activated?Ee`<div class="fake-activated-ripple"></div>`:""}renderGraphic(){const e={multi:this.multipleGraphics};return Ee`
      <span class="mdc-deprecated-list-item__graphic material-icons ${ft(e)}">
        <slot name="graphic"></slot>
      </span>`}renderMeta(){return Ee`
      <span class="mdc-deprecated-list-item__meta material-icons">
        <slot name="meta"></slot>
      </span>`}renderText(){const e=this.twoline?this.renderTwoline():this.renderSingleLine();return Ee`
      <span class="mdc-deprecated-list-item__text">
        ${e}
      </span>`}renderSingleLine(){return Ee`<slot></slot>`}renderTwoline(){return Ee`
      <span class="mdc-deprecated-list-item__primary-text">
        <slot></slot>
      </span>
      <span class="mdc-deprecated-list-item__secondary-text">
        <slot name="secondary"></slot>
      </span>
    `}onClick(){this.fireRequestSelected(!this.selected,"interaction")}onDown(e,t){const i=()=>{window.removeEventListener(e,i),this.rippleHandlers.endPress()};window.addEventListener(e,i),this.rippleHandlers.startPress(t)}fireRequestSelected(e,t){if(this.noninteractive)return;const i=new CustomEvent("request-selected",{bubbles:!0,composed:!0,detail:{source:t,selected:e}});this.dispatchEvent(i)}connectedCallback(){super.connectedCallback(),this.noninteractive||this.setAttribute("mwc-list-item","");for(const e of this.listeners)for(const t of e.eventNames)e.target.addEventListener(t,e.cb,{passive:!0})}disconnectedCallback(){super.disconnectedCallback();for(const e of this.listeners)for(const t of e.eventNames)e.target.removeEventListener(t,e.cb);this._managingList&&(this._managingList.debouncedLayout?this._managingList.debouncedLayout(!0):this._managingList.layout(!0))}firstUpdated(){const e=new Event("list-item-rendered",{bubbles:!0,composed:!0});this.dispatchEvent(e)}}o([dt("slot")],ui.prototype,"slotElement",void 0),o([function(e){return nt({descriptor:t=>({async get(){var t;return await this.updateComplete,null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e)},enumerable:!0,configurable:!0})})}("mwc-ripple")],ui.prototype,"ripple",void 0),o([it({type:String})],ui.prototype,"value",void 0),o([it({type:String,reflect:!0})],ui.prototype,"group",void 0),o([it({type:Number,reflect:!0})],ui.prototype,"tabindex",void 0),o([it({type:Boolean,reflect:!0}),et(function(e){e?this.setAttribute("aria-disabled","true"):this.setAttribute("aria-disabled","false")})],ui.prototype,"disabled",void 0),o([it({type:Boolean,reflect:!0})],ui.prototype,"twoline",void 0),o([it({type:Boolean,reflect:!0})],ui.prototype,"activated",void 0),o([it({type:String,reflect:!0})],ui.prototype,"graphic",void 0),o([it({type:Boolean})],ui.prototype,"multipleGraphics",void 0),o([it({type:Boolean})],ui.prototype,"hasMeta",void 0),o([it({type:Boolean,reflect:!0}),et(function(e){e?(this.removeAttribute("aria-checked"),this.removeAttribute("mwc-list-item"),this.selected=!1,this.activated=!1,this.tabIndex=-1):this.setAttribute("mwc-list-item","")})],ui.prototype,"noninteractive",void 0),o([it({type:Boolean,reflect:!0}),et(function(e){const t=this.getAttribute("role"),i="gridcell"===t||"option"===t||"row"===t||"tab"===t;i&&e?this.setAttribute("aria-selected","true"):i&&this.setAttribute("aria-selected","false"),this._firstChanged?this._firstChanged=!1:this._skipPropRequest||this.fireRequestSelected(e,"property")})],ui.prototype,"selected",void 0),o([ot()],ui.prototype,"shouldRenderRipple",void 0),o([ot()],ui.prototype,"_managingList",void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const fi=Y`:host{cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;height:48px;display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:var(--mdc-list-side-padding, 16px);padding-right:var(--mdc-list-side-padding, 16px);outline:none;height:48px;color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}:host:focus{outline:none}:host([activated]){color:#6200ee;color:var(--mdc-theme-primary, #6200ee);--mdc-ripple-color: var( --mdc-theme-primary, #6200ee )}:host([activated]) .mdc-deprecated-list-item__graphic{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host([activated]) .fake-activated-ripple::before{position:absolute;display:block;top:0;bottom:0;left:0;right:0;width:100%;height:100%;pointer-events:none;z-index:1;content:"";opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12);background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-deprecated-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;display:inline-flex}.mdc-deprecated-list-item__graphic ::slotted(*){flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;width:100%;height:100%;text-align:center}.mdc-deprecated-list-item__meta{width:var(--mdc-list-item-meta-size, 24px);height:var(--mdc-list-item-meta-size, 24px);margin-left:auto;margin-right:0;color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-item__meta.multi{width:auto}.mdc-deprecated-list-item__meta ::slotted(*){width:var(--mdc-list-item-meta-size, 24px);line-height:var(--mdc-list-item-meta-size, 24px)}.mdc-deprecated-list-item__meta ::slotted(.material-icons),.mdc-deprecated-list-item__meta ::slotted(mwc-icon){line-height:var(--mdc-list-item-meta-size, 24px) !important}.mdc-deprecated-list-item__meta ::slotted(:not(.material-icons):not(mwc-icon)){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit)}[dir=rtl] .mdc-deprecated-list-item__meta,.mdc-deprecated-list-item__meta[dir=rtl]{margin-left:0;margin-right:auto}.mdc-deprecated-list-item__meta ::slotted(*){width:100%;height:100%}.mdc-deprecated-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-deprecated-list-item__text ::slotted([for]),.mdc-deprecated-list-item__text[for]{pointer-events:none}.mdc-deprecated-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px;display:block}.mdc-deprecated-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-deprecated-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-deprecated-list-item__secondary-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;display:block}.mdc-deprecated-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-deprecated-list--dense .mdc-deprecated-list-item__secondary-text{font-size:inherit}* ::slotted(a),a{color:inherit;text-decoration:none}:host([twoline]){height:72px}:host([twoline]) .mdc-deprecated-list-item__text{align-self:flex-start}:host([disabled]),:host([noninteractive]){cursor:default;pointer-events:none}:host([disabled]) .mdc-deprecated-list-item__text ::slotted(*){opacity:.38}:host([disabled]) .mdc-deprecated-list-item__text ::slotted(*),:host([disabled]) .mdc-deprecated-list-item__primary-text ::slotted(*),:host([disabled]) .mdc-deprecated-list-item__secondary-text ::slotted(*){color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-deprecated-list-item__secondary-text ::slotted(*){color:rgba(0, 0, 0, 0.54);color:var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54))}.mdc-deprecated-list-item__graphic ::slotted(*){background-color:transparent;color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-group__subheader ::slotted(*){color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 40px);height:var(--mdc-list-item-graphic-size, 40px)}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 40px);line-height:var(--mdc-list-item-graphic-size, 40px)}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 40px) !important}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(*){border-radius:50%}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic,:host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic,:host([graphic=control]) .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:var(--mdc-list-item-graphic-margin, 16px)}[dir=rtl] :host([graphic=avatar]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=medium]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=large]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=control]) .mdc-deprecated-list-item__graphic,:host([graphic=avatar]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=medium]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=large]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=control]) .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:var(--mdc-list-item-graphic-margin, 16px);margin-right:0}:host([graphic=icon]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 24px);height:var(--mdc-list-item-graphic-size, 24px);margin-left:0;margin-right:var(--mdc-list-item-graphic-margin, 32px)}:host([graphic=icon]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 24px);line-height:var(--mdc-list-item-graphic-size, 24px)}:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 24px) !important}[dir=rtl] :host([graphic=icon]) .mdc-deprecated-list-item__graphic,:host([graphic=icon]) .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:var(--mdc-list-item-graphic-margin, 32px);margin-right:0}:host([graphic=avatar]:not([twoLine])),:host([graphic=icon]:not([twoLine])){height:56px}:host([graphic=medium]:not([twoLine])),:host([graphic=large]:not([twoLine])){height:72px}:host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 56px);height:var(--mdc-list-item-graphic-size, 56px)}:host([graphic=medium]) .mdc-deprecated-list-item__graphic.multi,:host([graphic=large]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(*),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 56px);line-height:var(--mdc-list-item-graphic-size, 56px)}:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 56px) !important}:host([graphic=large]){padding-left:0px}`;function gi(e,t,i){customElements.get(e)||customElements.define(e,class extends t{static get styles(){return i}})}gi("mwc-menu-surface",di,ri),gi("mwc-list-item",ui,fi),gi("mwc-list",mi,hi),gi("mwc-menu",ei,ti);
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var bi,xi,_i={ROOT:"mdc-form-field"},vi={LABEL_SELECTOR:".mdc-form-field > label"},yi=function(i){function o(e){var n=i.call(this,t(t({},o.defaultAdapter),e))||this;return n.click=function(){n.handleClick()},n}return e(o,i),Object.defineProperty(o,"cssClasses",{get:function(){return _i},enumerable:!1,configurable:!0}),Object.defineProperty(o,"strings",{get:function(){return vi},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{activateInputRipple:function(){},deactivateInputRipple:function(){},deregisterInteractionHandler:function(){},registerInteractionHandler:function(){}}},enumerable:!1,configurable:!0}),o.prototype.init=function(){this.adapter.registerInteractionHandler("click",this.click)},o.prototype.destroy=function(){this.adapter.deregisterInteractionHandler("click",this.click)},o.prototype.handleClick=function(){var e=this;this.adapter.activateInputRipple(),requestAnimationFrame(function(){e.adapter.deactivateInputRipple()})},o}(A);const wi=null!==(xi=null===(bi=window.ShadyDOM)||void 0===bi?void 0:bi.inUse)&&void 0!==xi&&xi;class $i extends Je{constructor(){super(...arguments),this.disabled=!1,this.containingForm=null,this.formDataListener=e=>{this.disabled||this.setFormData(e.formData)}}findFormElement(){if(!this.shadowRoot||wi)return null;const e=this.getRootNode().querySelectorAll("form");for(const t of Array.from(e))if(t.contains(this))return t;return null}connectedCallback(){var e;super.connectedCallback(),this.containingForm=this.findFormElement(),null===(e=this.containingForm)||void 0===e||e.addEventListener("formdata",this.formDataListener)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this.containingForm)||void 0===e||e.removeEventListener("formdata",this.formDataListener),this.containingForm=null}click(){this.formElement&&!this.disabled&&(this.formElement.focus(),this.formElement.click())}firstUpdated(){super.firstUpdated(),this.shadowRoot&&this.mdcRoot.addEventListener("change",e=>{this.dispatchEvent(new Event("change",e))})}}$i.shadowRootOptions={mode:"open",delegatesFocus:!0},o([it({type:Boolean})],$i.prototype,"disabled",void 0);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class Ai extends Je{constructor(){super(...arguments),this.alignEnd=!1,this.spaceBetween=!1,this.nowrap=!1,this.label="",this.mdcFoundationClass=yi}createAdapter(){return{registerInteractionHandler:(e,t)=>{this.labelEl.addEventListener(e,t)},deregisterInteractionHandler:(e,t)=>{this.labelEl.removeEventListener(e,t)},activateInputRipple:async()=>{const e=this.input;if(e instanceof $i){const t=await e.ripple;t&&t.startPress()}},deactivateInputRipple:async()=>{const e=this.input;if(e instanceof $i){const t=await e.ripple;t&&t.endPress()}}}}get input(){var e,t;return null!==(t=null===(e=this.slottedInputs)||void 0===e?void 0:e[0])&&void 0!==t?t:null}render(){const e={"mdc-form-field--align-end":this.alignEnd,"mdc-form-field--space-between":this.spaceBetween,"mdc-form-field--nowrap":this.nowrap};return Ee`
      <div class="mdc-form-field ${ft(e)}">
        <slot></slot>
        <label class="mdc-label"
               @click="${this._labelClick}">${this.label}</label>
      </div>`}click(){this._labelClick()}_labelClick(){const e=this.input;e&&(e.focus(),e.click())}}o([it({type:Boolean})],Ai.prototype,"alignEnd",void 0),o([it({type:Boolean})],Ai.prototype,"spaceBetween",void 0),o([it({type:Boolean})],Ai.prototype,"nowrap",void 0),o([it({type:String}),et(async function(e){var t;null===(t=this.input)||void 0===t||t.setAttribute("aria-label",e)})],Ai.prototype,"label",void 0),o([dt(".mdc-form-field")],Ai.prototype,"mdcRoot",void 0),o([st("",!0,"*")],Ai.prototype,"slottedInputs",void 0),o([dt("label")],Ai.prototype,"labelEl",void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const Ei=Y`.mdc-form-field{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}:host{display:inline-flex}.mdc-form-field{width:100%}::slotted(*){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}::slotted(mwc-switch){margin-right:10px}[dir=rtl] ::slotted(mwc-switch),::slotted(mwc-switch[dir=rtl]){margin-left:10px}`;let Ci=class extends Ai{static get styles(){return Ei}};Ci=o([n("floor3d-formfield")],Ci);
/**
 * @license
 * Copyright 2020 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var Ii=["input","button","textarea","select"],Oi=function(e){var t=e.target;if(t){var i=(""+t.tagName).toLowerCase();-1===Ii.indexOf(i)&&e.preventDefault()}};function Ti(e,t){for(var i=new Map,o=0;o<e;o++){var n=t(o).trim();if(n){var l=n[0].toLowerCase();i.has(l)||i.set(l,[]),i.get(l).push({text:n.toLowerCase(),index:o})}}return i.forEach(function(e){e.sort(function(e,t){return e.index-t.index})}),i}function Si(e,t){var i,o=e.nextChar,n=e.focusItemAtIndex,l=e.sortedIndexByFirstChar,d=e.focusedItemIndex,r=e.skipFocus,a=e.isItemAtIndexDisabled;return clearTimeout(t.bufferClearTimeout),t.bufferClearTimeout=setTimeout(function(){!function(e){e.typeaheadBuffer=""}(t)},N.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS),t.typeaheadBuffer=t.typeaheadBuffer+o,i=1===t.typeaheadBuffer.length?function(e,t,i,o){var n=o.typeaheadBuffer[0],l=e.get(n);if(!l)return-1;if(n===o.currentFirstChar&&l[o.sortedIndexCursor].index===t){o.sortedIndexCursor=(o.sortedIndexCursor+1)%l.length;var d=l[o.sortedIndexCursor].index;if(!i(d))return d}o.currentFirstChar=n;var r,a=-1;for(r=0;r<l.length;r++)if(!i(l[r].index)){a=r;break}for(;r<l.length;r++)if(l[r].index>t&&!i(l[r].index)){a=r;break}if(-1!==a)return o.sortedIndexCursor=a,l[o.sortedIndexCursor].index;return-1}(l,d,a,t):function(e,t,i){var o=i.typeaheadBuffer[0],n=e.get(o);if(!n)return-1;var l=n[i.sortedIndexCursor];if(0===l.text.lastIndexOf(i.typeaheadBuffer,0)&&!t(l.index))return l.index;var d=(i.sortedIndexCursor+1)%n.length,r=-1;for(;d!==i.sortedIndexCursor;){var a=n[d],s=0===a.text.lastIndexOf(i.typeaheadBuffer,0),c=!t(a.index);if(s&&c){r=d;break}d=(d+1)%n.length}if(-1!==r)return i.sortedIndexCursor=r,n[i.sortedIndexCursor].index;return-1}(l,a,t),-1===i||r||n(i),i}function ki(e){return e.typeaheadBuffer.length>0}
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var Ri={LABEL_FLOAT_ABOVE:"mdc-floating-label--float-above",LABEL_REQUIRED:"mdc-floating-label--required",LABEL_SHAKE:"mdc-floating-label--shake",ROOT:"mdc-floating-label"},Li=function(i){function o(e){var n=i.call(this,t(t({},o.defaultAdapter),e))||this;return n.shakeAnimationEndHandler=function(){n.handleShakeAnimationEnd()},n}return e(o,i),Object.defineProperty(o,"cssClasses",{get:function(){return Ri},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},getWidth:function(){return 0},registerInteractionHandler:function(){},deregisterInteractionHandler:function(){}}},enumerable:!1,configurable:!0}),o.prototype.init=function(){this.adapter.registerInteractionHandler("animationend",this.shakeAnimationEndHandler)},o.prototype.destroy=function(){this.adapter.deregisterInteractionHandler("animationend",this.shakeAnimationEndHandler)},o.prototype.getWidth=function(){return this.adapter.getWidth()},o.prototype.shake=function(e){var t=o.cssClasses.LABEL_SHAKE;e?this.adapter.addClass(t):this.adapter.removeClass(t)},o.prototype.float=function(e){var t=o.cssClasses,i=t.LABEL_FLOAT_ABOVE,n=t.LABEL_SHAKE;e?this.adapter.addClass(i):(this.adapter.removeClass(i),this.adapter.removeClass(n))},o.prototype.setRequired=function(e){var t=o.cssClasses.LABEL_REQUIRED;e?this.adapter.addClass(t):this.adapter.removeClass(t)},o.prototype.handleShakeAnimationEnd=function(){var e=o.cssClasses.LABEL_SHAKE;this.adapter.removeClass(e)},o}(A);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */const Fi=pt(class extends ut{constructor(e){switch(super(e),this.foundation=null,this.previousPart=null,e.type){case ct:case mt:break;default:throw new Error("FloatingLabel directive only support attribute and property parts")}}update(e,[t]){if(e!==this.previousPart){this.foundation&&this.foundation.destroy(),this.previousPart=e;const t=e.element;t.classList.add("mdc-floating-label");const i=(e=>({addClass:t=>e.classList.add(t),removeClass:t=>e.classList.remove(t),getWidth:()=>e.scrollWidth,registerInteractionHandler:(t,i)=>{e.addEventListener(t,i)},deregisterInteractionHandler:(t,i)=>{e.removeEventListener(t,i)}}))(t);this.foundation=new Li(i),this.foundation.init()}return this.render(t)}render(e){return this.foundation}});
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var ji={LINE_RIPPLE_ACTIVE:"mdc-line-ripple--active",LINE_RIPPLE_DEACTIVATING:"mdc-line-ripple--deactivating"},Ni=function(i){function o(e){var n=i.call(this,t(t({},o.defaultAdapter),e))||this;return n.transitionEndHandler=function(e){n.handleTransitionEnd(e)},n}return e(o,i),Object.defineProperty(o,"cssClasses",{get:function(){return ji},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},setStyle:function(){},registerEventHandler:function(){},deregisterEventHandler:function(){}}},enumerable:!1,configurable:!0}),o.prototype.init=function(){this.adapter.registerEventHandler("transitionend",this.transitionEndHandler)},o.prototype.destroy=function(){this.adapter.deregisterEventHandler("transitionend",this.transitionEndHandler)},o.prototype.activate=function(){this.adapter.removeClass(ji.LINE_RIPPLE_DEACTIVATING),this.adapter.addClass(ji.LINE_RIPPLE_ACTIVE)},o.prototype.setRippleCenter=function(e){this.adapter.setStyle("transform-origin",e+"px center")},o.prototype.deactivate=function(){this.adapter.addClass(ji.LINE_RIPPLE_DEACTIVATING)},o.prototype.handleTransitionEnd=function(e){var t=this.adapter.hasClass(ji.LINE_RIPPLE_DEACTIVATING);"opacity"===e.propertyName&&t&&(this.adapter.removeClass(ji.LINE_RIPPLE_ACTIVE),this.adapter.removeClass(ji.LINE_RIPPLE_DEACTIVATING))},o}(A);
/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */const zi=pt(class extends ut{constructor(e){switch(super(e),this.previousPart=null,this.foundation=null,e.type){case ct:case mt:return;default:throw new Error("LineRipple only support attribute and property parts.")}}update(e,t){if(this.previousPart!==e){this.foundation&&this.foundation.destroy(),this.previousPart=e;const t=e.element;t.classList.add("mdc-line-ripple");const i=(e=>({addClass:t=>e.classList.add(t),removeClass:t=>e.classList.remove(t),hasClass:t=>e.classList.contains(t),setStyle:(t,i)=>e.style.setProperty(t,i),registerEventHandler:(t,i)=>{e.addEventListener(t,i)},deregisterEventHandler:(t,i)=>{e.removeEventListener(t,i)}}))(t);this.foundation=new Ni(i),this.foundation.init()}return this.render()}render(){return this.foundation}});
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var Mi={ACTIVATED:"mdc-select--activated",DISABLED:"mdc-select--disabled",FOCUSED:"mdc-select--focused",INVALID:"mdc-select--invalid",MENU_INVALID:"mdc-select__menu--invalid",OUTLINED:"mdc-select--outlined",REQUIRED:"mdc-select--required",ROOT:"mdc-select",WITH_LEADING_ICON:"mdc-select--with-leading-icon"},Di={ARIA_CONTROLS:"aria-controls",ARIA_DESCRIBEDBY:"aria-describedby",ARIA_SELECTED_ATTR:"aria-selected",CHANGE_EVENT:"MDCSelect:change",HIDDEN_INPUT_SELECTOR:'input[type="hidden"]',LABEL_SELECTOR:".mdc-floating-label",LEADING_ICON_SELECTOR:".mdc-select__icon",LINE_RIPPLE_SELECTOR:".mdc-line-ripple",MENU_SELECTOR:".mdc-select__menu",OUTLINE_SELECTOR:".mdc-notched-outline",SELECTED_TEXT_SELECTOR:".mdc-select__selected-text",SELECT_ANCHOR_SELECTOR:".mdc-select__anchor",VALUE_ATTR:"data-value"},Bi={LABEL_SCALE:.75,UNSET_INDEX:-1,CLICK_DEBOUNCE_TIMEOUT_MS:330},Pi=function(i){function o(e,n){void 0===n&&(n={});var l=i.call(this,t(t({},o.defaultAdapter),e))||this;return l.disabled=!1,l.isMenuOpen=!1,l.useDefaultValidation=!0,l.customValidity=!0,l.lastSelectedIndex=Bi.UNSET_INDEX,l.clickDebounceTimeout=0,l.recentlyClicked=!1,l.leadingIcon=n.leadingIcon,l.helperText=n.helperText,l}return e(o,i),Object.defineProperty(o,"cssClasses",{get:function(){return Mi},enumerable:!1,configurable:!0}),Object.defineProperty(o,"numbers",{get:function(){return Bi},enumerable:!1,configurable:!0}),Object.defineProperty(o,"strings",{get:function(){return Di},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},activateBottomLine:function(){},deactivateBottomLine:function(){},getSelectedIndex:function(){return-1},setSelectedIndex:function(){},hasLabel:function(){return!1},floatLabel:function(){},getLabelWidth:function(){return 0},setLabelRequired:function(){},hasOutline:function(){return!1},notchOutline:function(){},closeOutline:function(){},setRippleCenter:function(){},notifyChange:function(){},setSelectedText:function(){},isSelectAnchorFocused:function(){return!1},getSelectAnchorAttr:function(){return""},setSelectAnchorAttr:function(){},removeSelectAnchorAttr:function(){},addMenuClass:function(){},removeMenuClass:function(){},openMenu:function(){},closeMenu:function(){},getAnchorElement:function(){return null},setMenuAnchorElement:function(){},setMenuAnchorCorner:function(){},setMenuWrapFocus:function(){},focusMenuItemAtIndex:function(){},getMenuItemCount:function(){return 0},getMenuItemValues:function(){return[]},getMenuItemTextAtIndex:function(){return""},isTypeaheadInProgress:function(){return!1},typeaheadMatchItem:function(){return-1}}},enumerable:!1,configurable:!0}),o.prototype.getSelectedIndex=function(){return this.adapter.getSelectedIndex()},o.prototype.setSelectedIndex=function(e,t,i){void 0===t&&(t=!1),void 0===i&&(i=!1),e>=this.adapter.getMenuItemCount()||(e===Bi.UNSET_INDEX?this.adapter.setSelectedText(""):this.adapter.setSelectedText(this.adapter.getMenuItemTextAtIndex(e).trim()),this.adapter.setSelectedIndex(e),t&&this.adapter.closeMenu(),i||this.lastSelectedIndex===e||this.handleChange(),this.lastSelectedIndex=e)},o.prototype.setValue=function(e,t){void 0===t&&(t=!1);var i=this.adapter.getMenuItemValues().indexOf(e);this.setSelectedIndex(i,!1,t)},o.prototype.getValue=function(){var e=this.adapter.getSelectedIndex(),t=this.adapter.getMenuItemValues();return e!==Bi.UNSET_INDEX?t[e]:""},o.prototype.getDisabled=function(){return this.disabled},o.prototype.setDisabled=function(e){this.disabled=e,this.disabled?(this.adapter.addClass(Mi.DISABLED),this.adapter.closeMenu()):this.adapter.removeClass(Mi.DISABLED),this.leadingIcon&&this.leadingIcon.setDisabled(this.disabled),this.disabled?this.adapter.removeSelectAnchorAttr("tabindex"):this.adapter.setSelectAnchorAttr("tabindex","0"),this.adapter.setSelectAnchorAttr("aria-disabled",this.disabled.toString())},o.prototype.openMenu=function(){this.adapter.addClass(Mi.ACTIVATED),this.adapter.openMenu(),this.isMenuOpen=!0,this.adapter.setSelectAnchorAttr("aria-expanded","true")},o.prototype.setHelperTextContent=function(e){this.helperText&&this.helperText.setContent(e)},o.prototype.layout=function(){if(this.adapter.hasLabel()){var e=this.getValue().length>0,t=this.adapter.hasClass(Mi.FOCUSED),i=e||t,o=this.adapter.hasClass(Mi.REQUIRED);this.notchOutline(i),this.adapter.floatLabel(i),this.adapter.setLabelRequired(o)}},o.prototype.layoutOptions=function(){var e=this.adapter.getMenuItemValues().indexOf(this.getValue());this.setSelectedIndex(e,!1,!0)},o.prototype.handleMenuOpened=function(){if(0!==this.adapter.getMenuItemValues().length){var e=this.getSelectedIndex(),t=e>=0?e:0;this.adapter.focusMenuItemAtIndex(t)}},o.prototype.handleMenuClosing=function(){this.adapter.setSelectAnchorAttr("aria-expanded","false")},o.prototype.handleMenuClosed=function(){this.adapter.removeClass(Mi.ACTIVATED),this.isMenuOpen=!1,this.adapter.isSelectAnchorFocused()||this.blur()},o.prototype.handleChange=function(){this.layout(),this.adapter.notifyChange(this.getValue()),this.adapter.hasClass(Mi.REQUIRED)&&this.useDefaultValidation&&this.setValid(this.isValid())},o.prototype.handleMenuItemAction=function(e){this.setSelectedIndex(e,!0)},o.prototype.handleFocus=function(){this.adapter.addClass(Mi.FOCUSED),this.layout(),this.adapter.activateBottomLine()},o.prototype.handleBlur=function(){this.isMenuOpen||this.blur()},o.prototype.handleClick=function(e){this.disabled||this.recentlyClicked||(this.setClickDebounceTimeout(),this.isMenuOpen?this.adapter.closeMenu():(this.adapter.setRippleCenter(e),this.openMenu()))},o.prototype.handleKeydown=function(e){if(!this.isMenuOpen&&this.adapter.hasClass(Mi.FOCUSED)){var t=qt(e)===xt,i=qt(e)===_t,o=qt(e)===Et,n=qt(e)===It;if(!(e.ctrlKey||e.metaKey)&&(!i&&e.key&&1===e.key.length||i&&this.adapter.isTypeaheadInProgress())){var l=i?" ":e.key,d=this.adapter.typeaheadMatchItem(l,this.getSelectedIndex());return d>=0&&this.setSelectedIndex(d),void e.preventDefault()}(t||i||o||n)&&(this.openMenu(),e.preventDefault())}},o.prototype.notchOutline=function(e){if(this.adapter.hasOutline()){var t=this.adapter.hasClass(Mi.FOCUSED);if(e){var i=Bi.LABEL_SCALE,o=this.adapter.getLabelWidth()*i;this.adapter.notchOutline(o)}else t||this.adapter.closeOutline()}},o.prototype.setLeadingIconAriaLabel=function(e){this.leadingIcon&&this.leadingIcon.setAriaLabel(e)},o.prototype.setLeadingIconContent=function(e){this.leadingIcon&&this.leadingIcon.setContent(e)},o.prototype.getUseDefaultValidation=function(){return this.useDefaultValidation},o.prototype.setUseDefaultValidation=function(e){this.useDefaultValidation=e},o.prototype.setValid=function(e){this.useDefaultValidation||(this.customValidity=e),this.adapter.setSelectAnchorAttr("aria-invalid",(!e).toString()),e?(this.adapter.removeClass(Mi.INVALID),this.adapter.removeMenuClass(Mi.MENU_INVALID)):(this.adapter.addClass(Mi.INVALID),this.adapter.addMenuClass(Mi.MENU_INVALID)),this.syncHelperTextValidity(e)},o.prototype.isValid=function(){return this.useDefaultValidation&&this.adapter.hasClass(Mi.REQUIRED)&&!this.adapter.hasClass(Mi.DISABLED)?this.getSelectedIndex()!==Bi.UNSET_INDEX&&(0!==this.getSelectedIndex()||Boolean(this.getValue())):this.customValidity},o.prototype.setRequired=function(e){e?this.adapter.addClass(Mi.REQUIRED):this.adapter.removeClass(Mi.REQUIRED),this.adapter.setSelectAnchorAttr("aria-required",e.toString()),this.adapter.setLabelRequired(e)},o.prototype.getRequired=function(){return"true"===this.adapter.getSelectAnchorAttr("aria-required")},o.prototype.init=function(){var e=this.adapter.getAnchorElement();e&&(this.adapter.setMenuAnchorElement(e),this.adapter.setMenuAnchorCorner(L.BOTTOM_START)),this.adapter.setMenuWrapFocus(!1),this.setDisabled(this.adapter.hasClass(Mi.DISABLED)),this.syncHelperTextValidity(!this.adapter.hasClass(Mi.INVALID)),this.layout(),this.layoutOptions()},o.prototype.blur=function(){this.adapter.removeClass(Mi.FOCUSED),this.layout(),this.adapter.deactivateBottomLine(),this.adapter.hasClass(Mi.REQUIRED)&&this.useDefaultValidation&&this.setValid(this.isValid())},o.prototype.syncHelperTextValidity=function(e){if(this.helperText){this.helperText.setValidity(e);var t=this.helperText.isVisible(),i=this.helperText.getId();t&&i?this.adapter.setSelectAnchorAttr(Di.ARIA_DESCRIBEDBY,i):this.adapter.removeSelectAnchorAttr(Di.ARIA_DESCRIBEDBY)}},o.prototype.setClickDebounceTimeout=function(){var e=this;clearTimeout(this.clickDebounceTimeout),this.clickDebounceTimeout=setTimeout(function(){e.recentlyClicked=!1},Bi.CLICK_DEBOUNCE_TIMEOUT_MS),this.recentlyClicked=!0},o}(A);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Hi=(e={})=>{const t={};for(const i in e)t[i]=e[i];return Object.assign({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1},t)};class Vi extends $i{constructor(){super(...arguments),this.mdcFoundationClass=Pi,this.disabled=!1,this.outlined=!1,this.label="",this.outlineOpen=!1,this.outlineWidth=0,this.value="",this.name="",this.selectedText="",this.icon="",this.menuOpen=!1,this.helper="",this.validateOnInitialRender=!1,this.validationMessage="",this.required=!1,this.naturalMenuWidth=!1,this.isUiValid=!0,this.fixedMenuPosition=!1,this.typeaheadState={bufferClearTimeout:0,currentFirstChar:"",sortedIndexCursor:0,typeaheadBuffer:""},this.sortedIndexByFirstChar=new Map,this.menuElement_=null,this.listeners=[],this.onBodyClickBound=()=>{},this._menuUpdateComplete=null,this.valueSetDirectly=!1,this.validityTransform=null,this._validity=Hi()}get items(){return this.menuElement_||(this.menuElement_=this.menuElement),this.menuElement_?this.menuElement_.items:[]}get selected(){const e=this.menuElement;return e?e.selected:null}get index(){const e=this.menuElement;return e?e.index:-1}get shouldRenderHelperText(){return!!this.helper||!!this.validationMessage}get validity(){return this._checkValidity(this.value),this._validity}render(){const e={"mdc-select--disabled":this.disabled,"mdc-select--no-label":!this.label,"mdc-select--filled":!this.outlined,"mdc-select--outlined":this.outlined,"mdc-select--with-leading-icon":!!this.icon,"mdc-select--required":this.required,"mdc-select--invalid":!this.isUiValid},t=this.label?"label":void 0,i=this.shouldRenderHelperText?"helper-text":void 0;return Ee`
      <div
          class="mdc-select ${ft(e)}">
        <input
            class="formElement"
            name="${this.name}"
            .value="${this.value}"
            hidden
            ?disabled="${this.disabled}"
            ?required=${this.required}>
        <!-- @ts-ignore -->
        <div class="mdc-select__anchor"
            aria-autocomplete="none"
            role="combobox"
            aria-expanded=${this.menuOpen}
            aria-invalid=${!this.isUiValid}
            aria-haspopup="listbox"
            aria-labelledby=${ai(t)}
            aria-required=${this.required}
            aria-describedby=${ai(i)}
            @click=${this.onClick}
            @focus=${this.onFocus}
            @blur=${this.onBlur}
            @keydown=${this.onKeydown}>
          ${this.renderRipple()}
          ${this.outlined?this.renderOutline():this.renderLabel()}
          ${this.renderLeadingIcon()}
          <span class="mdc-select__selected-text-container">
            <span class="mdc-select__selected-text">${this.selectedText}</span>
          </span>
          <span class="mdc-select__dropdown-icon">
            <svg
                class="mdc-select__dropdown-icon-graphic"
                viewBox="7 10 10 5"
                focusable="false">
              <polygon
                  class="mdc-select__dropdown-icon-inactive"
                  stroke="none"
                  fill-rule="evenodd"
                  points="7 10 12 15 17 10">
              </polygon>
              <polygon
                  class="mdc-select__dropdown-icon-active"
                  stroke="none"
                  fill-rule="evenodd"
                  points="7 15 12 10 17 15">
              </polygon>
            </svg>
          </span>
          ${this.renderLineRipple()}
        </div>
        ${this.renderMenu()}
      </div>
      ${this.renderHelperText()}`}renderMenu(){const e=this.getMenuClasses();return Ee`
      <mwc-menu
        innerRole="listbox"
        wrapFocus
        class=" ${ft(e)}"
        activatable
        .fullwidth=${!this.fixedMenuPosition&&!this.naturalMenuWidth}
        .open=${this.menuOpen}
        .anchor=${this.anchorElement}
        .fixed=${this.fixedMenuPosition}
        @selected=${this.onSelected}
        @opened=${this.onOpened}
        @closed=${this.onClosed}
        @items-updated=${this.onItemsUpdated}
        @keydown=${this.handleTypeahead}>
      ${this.renderMenuContent()}
    </mwc-menu>`}getMenuClasses(){return{"mdc-select__menu":!0,"mdc-menu":!0,"mdc-menu-surface":!0,"mdc-select__menu--invalid":!this.isUiValid}}renderMenuContent(){return Ee`<slot></slot>`}renderRipple(){return this.outlined?Ie:Ee`
      <span class="mdc-select__ripple"></span>
    `}renderOutline(){return this.outlined?Ee`
      <mwc-notched-outline
          .width=${this.outlineWidth}
          .open=${this.outlineOpen}
          class="mdc-notched-outline">
        ${this.renderLabel()}
      </mwc-notched-outline>`:Ie}renderLabel(){return this.label?Ee`
      <span
          .floatingLabelFoundation=${Fi(this.label)}
          id="label">${this.label}</span>
    `:Ie}renderLeadingIcon(){return this.icon?Ee`<mwc-icon class="mdc-select__icon"><div>${this.icon}</div></mwc-icon>`:Ie}renderLineRipple(){return this.outlined?Ie:Ee`
      <span .lineRippleFoundation=${zi()}></span>
    `}renderHelperText(){if(!this.shouldRenderHelperText)return Ie;const e=this.validationMessage&&!this.isUiValid;return Ee`
        <p
          class="mdc-select-helper-text ${ft({"mdc-select-helper-text--validation-msg":e})}"
          id="helper-text">${e?this.validationMessage:this.helper}</p>`}createAdapter(){return Object.assign(Object.assign({},qe(this.mdcRoot)),{activateBottomLine:()=>{this.lineRippleElement&&this.lineRippleElement.lineRippleFoundation.activate()},deactivateBottomLine:()=>{this.lineRippleElement&&this.lineRippleElement.lineRippleFoundation.deactivate()},hasLabel:()=>!!this.label,floatLabel:e=>{this.labelElement&&this.labelElement.floatingLabelFoundation.float(e)},getLabelWidth:()=>this.labelElement?this.labelElement.floatingLabelFoundation.getWidth():0,setLabelRequired:e=>{this.labelElement&&this.labelElement.floatingLabelFoundation.setRequired(e)},hasOutline:()=>this.outlined,notchOutline:e=>{this.outlineElement&&!this.outlineOpen&&(this.outlineWidth=e,this.outlineOpen=!0)},closeOutline:()=>{this.outlineElement&&(this.outlineOpen=!1)},setRippleCenter:e=>{if(this.lineRippleElement){this.lineRippleElement.lineRippleFoundation.setRippleCenter(e)}},notifyChange:async e=>{if(!this.valueSetDirectly&&e===this.value)return;this.valueSetDirectly=!1,this.value=e,await this.updateComplete;const t=new Event("change",{bubbles:!0});this.dispatchEvent(t)},setSelectedText:e=>this.selectedText=e,isSelectAnchorFocused:()=>{const e=this.anchorElement;if(!e)return!1;return e.getRootNode().activeElement===e},getSelectAnchorAttr:e=>{const t=this.anchorElement;return t?t.getAttribute(e):null},setSelectAnchorAttr:(e,t)=>{const i=this.anchorElement;i&&i.setAttribute(e,t)},removeSelectAnchorAttr:e=>{const t=this.anchorElement;t&&t.removeAttribute(e)},openMenu:()=>{this.menuOpen=!0},closeMenu:()=>{this.menuOpen=!1},addMenuClass:()=>{},removeMenuClass:()=>{},getAnchorElement:()=>this.anchorElement,setMenuAnchorElement:()=>{},setMenuAnchorCorner:()=>{const e=this.menuElement;e&&(e.corner="BOTTOM_START")},setMenuWrapFocus:e=>{const t=this.menuElement;t&&(t.wrapFocus=e)},focusMenuItemAtIndex:e=>{const t=this.menuElement;if(!t)return;const i=t.items[e];i&&i.focus()},getMenuItemCount:()=>{const e=this.menuElement;return e?e.items.length:0},getMenuItemValues:()=>{const e=this.menuElement;if(!e)return[];return e.items.map(e=>e.value)},getMenuItemTextAtIndex:e=>{const t=this.menuElement;if(!t)return"";const i=t.items[e];return i?i.text:""},getSelectedIndex:()=>this.index,setSelectedIndex:()=>{},isTypeaheadInProgress:()=>ki(this.typeaheadState),typeaheadMatchItem:(e,t)=>{if(!this.menuElement)return-1;const i={focusItemAtIndex:e=>{this.menuElement.focusItemAtIndex(e)},focusedItemIndex:t||this.menuElement.getFocusedItemIndex(),nextChar:e,sortedIndexByFirstChar:this.sortedIndexByFirstChar,skipFocus:!1,isItemAtIndexDisabled:e=>this.items[e].disabled},o=Si(i,this.typeaheadState);return-1!==o&&this.select(o),o}})}checkValidity(){const e=this._checkValidity(this.value);if(!e){const e=new Event("invalid",{bubbles:!1,cancelable:!0});this.dispatchEvent(e)}return e}reportValidity(){const e=this.checkValidity();return this.isUiValid=e,e}_checkValidity(e){const t=this.formElement.validity;let i=Hi(t);if(this.validityTransform){const t=this.validityTransform(e,i);i=Object.assign(Object.assign({},i),t)}return this._validity=i,this._validity.valid}setCustomValidity(e){this.validationMessage=e,this.formElement.setCustomValidity(e)}async getUpdateComplete(){await this._menuUpdateComplete;return await super.getUpdateComplete()}async firstUpdated(){const e=this.menuElement;if(e&&(this._menuUpdateComplete=e.updateComplete,await this._menuUpdateComplete),super.firstUpdated(),this.mdcFoundation.isValid=()=>!0,this.mdcFoundation.setValid=()=>{},this.mdcFoundation.setDisabled(this.disabled),this.validateOnInitialRender&&this.reportValidity(),!this.selected){!this.items.length&&this.slotElement&&this.slotElement.assignedNodes({flatten:!0}).length&&(await new Promise(e=>requestAnimationFrame(e)),await this.layout());const e=this.items.length&&""===this.items[0].value;if(!this.value&&e)return void this.select(0);this.selectByValue(this.value)}this.sortedIndexByFirstChar=Ti(this.items.length,e=>this.items[e].text)}onItemsUpdated(){this.sortedIndexByFirstChar=Ti(this.items.length,e=>this.items[e].text)}select(e){const t=this.menuElement;t&&t.select(e)}selectByValue(e){let t=-1;for(let i=0;i<this.items.length;i++){if(this.items[i].value===e){t=i;break}}this.valueSetDirectly=!0,this.select(t),this.mdcFoundation.handleChange()}disconnectedCallback(){super.disconnectedCallback();for(const e of this.listeners)e.target.removeEventListener(e.name,e.cb)}focus(){const e=new CustomEvent("focus"),t=this.anchorElement;t&&(t.dispatchEvent(e),t.focus())}blur(){const e=new CustomEvent("blur"),t=this.anchorElement;t&&(t.dispatchEvent(e),t.blur())}onFocus(){this.mdcFoundation&&this.mdcFoundation.handleFocus()}onBlur(){this.mdcFoundation&&this.mdcFoundation.handleBlur();const e=this.menuElement;e&&!e.open&&this.reportValidity()}onClick(e){if(this.mdcFoundation){this.focus();const t=e.target.getBoundingClientRect();let i=0;i="touches"in e?e.touches[0].clientX:e.clientX;const o=i-t.left;this.mdcFoundation.handleClick(o)}}onKeydown(e){const t=qt(e)===Et,i=qt(e)===It;if(i||t){const o=t&&this.index>0,n=i&&this.index<this.items.length-1;return o?this.select(this.index-1):n&&this.select(this.index+1),e.preventDefault(),void this.mdcFoundation.openMenu()}this.mdcFoundation.handleKeydown(e)}handleTypeahead(e){if(!this.menuElement)return;const t=this.menuElement.getFocusedItemIndex(),i=Ye(e.target)?e.target:null;!function(e,t){var i=e.event,o=e.isTargetListItem,n=e.focusedItemIndex,l=e.focusItemAtIndex,d=e.sortedIndexByFirstChar,r=e.isItemAtIndexDisabled,a="ArrowLeft"===qt(i),s="ArrowUp"===qt(i),c="ArrowRight"===qt(i),m="ArrowDown"===qt(i),h="Home"===qt(i),p="End"===qt(i),u="Enter"===qt(i),f="Spacebar"===qt(i);i.altKey||i.ctrlKey||i.metaKey||a||s||c||m||h||p||u||(f||1!==i.key.length?f&&(o&&Oi(i),o&&ki(t)&&Si({focusItemAtIndex:l,focusedItemIndex:n,nextChar:" ",sortedIndexByFirstChar:d,skipFocus:!1,isItemAtIndexDisabled:r},t)):(Oi(i),Si({focusItemAtIndex:l,focusedItemIndex:n,nextChar:i.key.toLowerCase(),sortedIndexByFirstChar:d,skipFocus:!1,isItemAtIndexDisabled:r},t)))}({event:e,focusItemAtIndex:e=>{this.menuElement.focusItemAtIndex(e)},focusedItemIndex:t,isTargetListItem:!!i&&i.hasAttribute("mwc-list-item"),sortedIndexByFirstChar:this.sortedIndexByFirstChar,isItemAtIndexDisabled:e=>this.items[e].disabled},this.typeaheadState)}async onSelected(e){this.mdcFoundation||await this.updateComplete,this.mdcFoundation.handleMenuItemAction(e.detail.index);const t=this.items[e.detail.index];t&&(this.value=t.value)}onOpened(){this.mdcFoundation&&(this.menuOpen=!0,this.mdcFoundation.handleMenuOpened())}onClosed(){this.mdcFoundation&&(this.menuOpen=!1,this.mdcFoundation.handleMenuClosed())}setFormData(e){this.name&&null!==this.selected&&e.append(this.name,this.value)}async layout(e=!0){this.mdcFoundation&&this.mdcFoundation.layout(),await this.updateComplete;const t=this.menuElement;t&&t.layout(e);const i=this.labelElement;if(!i)return void(this.outlineOpen=!1);const o=!!this.label&&!!this.value;if(i.floatingLabelFoundation.float(o),!this.outlined)return;this.outlineOpen=o,await this.updateComplete;const n=i.floatingLabelFoundation.getWidth();this.outlineOpen&&(this.outlineWidth=n)}async layoutOptions(){this.mdcFoundation&&this.mdcFoundation.layoutOptions()}}o([dt(".mdc-select")],Vi.prototype,"mdcRoot",void 0),o([dt(".formElement")],Vi.prototype,"formElement",void 0),o([dt("slot")],Vi.prototype,"slotElement",void 0),o([dt("select")],Vi.prototype,"nativeSelectElement",void 0),o([dt("input")],Vi.prototype,"nativeInputElement",void 0),o([dt(".mdc-line-ripple")],Vi.prototype,"lineRippleElement",void 0),o([dt(".mdc-floating-label")],Vi.prototype,"labelElement",void 0),o([dt("mwc-notched-outline")],Vi.prototype,"outlineElement",void 0),o([dt(".mdc-menu")],Vi.prototype,"menuElement",void 0),o([dt(".mdc-select__anchor")],Vi.prototype,"anchorElement",void 0),o([it({type:Boolean,attribute:"disabled",reflect:!0}),et(function(e){this.mdcFoundation&&this.mdcFoundation.setDisabled(e)})],Vi.prototype,"disabled",void 0),o([it({type:Boolean}),et(function(e,t){void 0!==t&&this.outlined!==t&&this.layout(!1)})],Vi.prototype,"outlined",void 0),o([it({type:String}),et(function(e,t){void 0!==t&&this.label!==t&&this.layout(!1)})],Vi.prototype,"label",void 0),o([ot()],Vi.prototype,"outlineOpen",void 0),o([ot()],Vi.prototype,"outlineWidth",void 0),o([it({type:String}),et(function(e){if(this.mdcFoundation){const t=null===this.selected&&!!e,i=this.selected&&this.selected.value!==e;(t||i)&&this.selectByValue(e),this.reportValidity()}})],Vi.prototype,"value",void 0),o([it()],Vi.prototype,"name",void 0),o([ot()],Vi.prototype,"selectedText",void 0),o([it({type:String})],Vi.prototype,"icon",void 0),o([ot()],Vi.prototype,"menuOpen",void 0),o([it({type:String})],Vi.prototype,"helper",void 0),o([it({type:Boolean})],Vi.prototype,"validateOnInitialRender",void 0),o([it({type:String})],Vi.prototype,"validationMessage",void 0),o([it({type:Boolean})],Vi.prototype,"required",void 0),o([it({type:Boolean})],Vi.prototype,"naturalMenuWidth",void 0),o([ot()],Vi.prototype,"isUiValid",void 0),o([it({type:Boolean})],Vi.prototype,"fixedMenuPosition",void 0),o([lt({capture:!0})],Vi.prototype,"handleTypeahead",null);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const Ui=Y`.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform;transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required::after{margin-left:1px;margin-right:0px;content:"*"}[dir=rtl] .mdc-floating-label--required::after,.mdc-floating-label--required[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{border-bottom-width:1px}.mdc-line-ripple::before{z-index:1}.mdc-line-ripple::after{transform:scaleX(0);border-bottom-width:2px;opacity:0;z-index:2}.mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / 0.75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}.mdc-select{display:inline-flex;position:relative}.mdc-select:not(.mdc-select--disabled) .mdc-select__selected-text{color:rgba(0, 0, 0, 0.87)}.mdc-select.mdc-select--disabled .mdc-select__selected-text{color:rgba(0, 0, 0, 0.38)}.mdc-select:not(.mdc-select--disabled) .mdc-floating-label{color:rgba(0, 0, 0, 0.6)}.mdc-select:not(.mdc-select--disabled).mdc-select--focused .mdc-floating-label{color:rgba(98, 0, 238, 0.87)}.mdc-select.mdc-select--disabled .mdc-floating-label{color:rgba(0, 0, 0, 0.38)}.mdc-select:not(.mdc-select--disabled) .mdc-select__dropdown-icon{fill:rgba(0, 0, 0, 0.54)}.mdc-select:not(.mdc-select--disabled).mdc-select--focused .mdc-select__dropdown-icon{fill:#6200ee;fill:var(--mdc-theme-primary, #6200ee)}.mdc-select.mdc-select--disabled .mdc-select__dropdown-icon{fill:rgba(0, 0, 0, 0.38)}.mdc-select:not(.mdc-select--disabled)+.mdc-select-helper-text{color:rgba(0, 0, 0, 0.6)}.mdc-select.mdc-select--disabled+.mdc-select-helper-text{color:rgba(0, 0, 0, 0.38)}.mdc-select:not(.mdc-select--disabled) .mdc-select__icon{color:rgba(0, 0, 0, 0.54)}.mdc-select.mdc-select--disabled .mdc-select__icon{color:rgba(0, 0, 0, 0.38)}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-select.mdc-select--disabled .mdc-select__selected-text{color:GrayText}.mdc-select.mdc-select--disabled .mdc-select__dropdown-icon{fill:red}.mdc-select.mdc-select--disabled .mdc-floating-label{color:GrayText}.mdc-select.mdc-select--disabled .mdc-line-ripple::before{border-bottom-color:GrayText}.mdc-select.mdc-select--disabled .mdc-notched-outline__leading,.mdc-select.mdc-select--disabled .mdc-notched-outline__notch,.mdc-select.mdc-select--disabled .mdc-notched-outline__trailing{border-color:GrayText}.mdc-select.mdc-select--disabled .mdc-select__icon{color:GrayText}.mdc-select.mdc-select--disabled+.mdc-select-helper-text{color:GrayText}}.mdc-select .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-select .mdc-select__anchor{padding-left:16px;padding-right:0}[dir=rtl] .mdc-select .mdc-select__anchor,.mdc-select .mdc-select__anchor[dir=rtl]{padding-left:0;padding-right:16px}.mdc-select.mdc-select--with-leading-icon .mdc-select__anchor{padding-left:0;padding-right:0}[dir=rtl] .mdc-select.mdc-select--with-leading-icon .mdc-select__anchor,.mdc-select.mdc-select--with-leading-icon .mdc-select__anchor[dir=rtl]{padding-left:0;padding-right:0}.mdc-select .mdc-select__icon{width:24px;height:24px;font-size:24px}.mdc-select .mdc-select__dropdown-icon{width:24px;height:24px}.mdc-select .mdc-select__menu .mdc-deprecated-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-select .mdc-select__menu .mdc-deprecated-list-item,.mdc-select .mdc-select__menu .mdc-deprecated-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-select .mdc-select__menu .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:12px}[dir=rtl] .mdc-select .mdc-select__menu .mdc-deprecated-list-item__graphic,.mdc-select .mdc-select__menu .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:12px;margin-right:0}.mdc-select__dropdown-icon{margin-left:12px;margin-right:12px;display:inline-flex;position:relative;align-self:center;align-items:center;justify-content:center;flex-shrink:0;pointer-events:none}.mdc-select__dropdown-icon .mdc-select__dropdown-icon-active,.mdc-select__dropdown-icon .mdc-select__dropdown-icon-inactive{position:absolute;top:0;left:0}.mdc-select__dropdown-icon .mdc-select__dropdown-icon-graphic{width:41.6666666667%;height:20.8333333333%}.mdc-select__dropdown-icon .mdc-select__dropdown-icon-inactive{opacity:1;transition:opacity 75ms linear 75ms}.mdc-select__dropdown-icon .mdc-select__dropdown-icon-active{opacity:0;transition:opacity 75ms linear}[dir=rtl] .mdc-select__dropdown-icon,.mdc-select__dropdown-icon[dir=rtl]{margin-left:12px;margin-right:12px}.mdc-select--activated .mdc-select__dropdown-icon .mdc-select__dropdown-icon-inactive{opacity:0;transition:opacity 49.5ms linear}.mdc-select--activated .mdc-select__dropdown-icon .mdc-select__dropdown-icon-active{opacity:1;transition:opacity 100.5ms linear 49.5ms}.mdc-select__anchor{width:200px;min-width:0;flex:1 1 auto;position:relative;box-sizing:border-box;overflow:hidden;outline:none;cursor:pointer}.mdc-select__anchor .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-select__selected-text-container{display:flex;appearance:none;pointer-events:none;box-sizing:border-box;width:auto;min-width:0;flex-grow:1;height:28px;border:none;outline:none;padding:0;background-color:transparent;color:inherit}.mdc-select__selected-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;width:100%;text-align:left}[dir=rtl] .mdc-select__selected-text,.mdc-select__selected-text[dir=rtl]{text-align:right}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-floating-label{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-floating-label{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--invalid+.mdc-select-helper-text--validation-msg{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-select__dropdown-icon{fill:#b00020;fill:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-select__dropdown-icon{fill:#b00020;fill:var(--mdc-theme-error, #b00020)}.mdc-select--disabled{cursor:default;pointer-events:none}.mdc-select--with-leading-icon .mdc-select__menu .mdc-deprecated-list-item{padding-left:12px;padding-right:12px}[dir=rtl] .mdc-select--with-leading-icon .mdc-select__menu .mdc-deprecated-list-item,.mdc-select--with-leading-icon .mdc-select__menu .mdc-deprecated-list-item[dir=rtl]{padding-left:12px;padding-right:12px}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-select__menu::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:"";pointer-events:none}}@media screen and (forced-colors: active)and (forced-colors: active),screen and (-ms-high-contrast: active)and (forced-colors: active){.mdc-select__menu::before{border-color:CanvasText}}.mdc-select__menu .mdc-deprecated-list .mdc-select__icon,.mdc-select__menu .mdc-list .mdc-select__icon{margin-left:0;margin-right:0}[dir=rtl] .mdc-select__menu .mdc-deprecated-list .mdc-select__icon,[dir=rtl] .mdc-select__menu .mdc-list .mdc-select__icon,.mdc-select__menu .mdc-deprecated-list .mdc-select__icon[dir=rtl],.mdc-select__menu .mdc-list .mdc-select__icon[dir=rtl]{margin-left:0;margin-right:0}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--activated,.mdc-select__menu .mdc-list .mdc-deprecated-list-item--selected,.mdc-select__menu .mdc-list .mdc-deprecated-list-item--activated{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected .mdc-deprecated-list-item__graphic,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--activated .mdc-deprecated-list-item__graphic,.mdc-select__menu .mdc-list .mdc-deprecated-list-item--selected .mdc-deprecated-list-item__graphic,.mdc-select__menu .mdc-list .mdc-deprecated-list-item--activated .mdc-deprecated-list-item__graphic{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-select__menu .mdc-list-item__start{display:inline-flex;align-items:center}.mdc-select__option{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-select__option,.mdc-select__option[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-select__one-line-option.mdc-list-item--with-one-line{height:48px}.mdc-select__two-line-option.mdc-list-item--with-two-lines{height:64px}.mdc-select__two-line-option.mdc-list-item--with-two-lines .mdc-list-item__start{margin-top:20px}.mdc-select__two-line-option.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-select__two-line-option.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-select__two-line-option.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-select__two-line-option.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-select__two-line-option.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:36px;content:"";vertical-align:0}.mdc-select__option-with-leading-content{padding-left:0;padding-right:12px}.mdc-select__option-with-leading-content.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-select__option-with-leading-content.mdc-list-item,.mdc-select__option-with-leading-content.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-select__option-with-leading-content .mdc-list-item__start{margin-left:12px;margin-right:0}[dir=rtl] .mdc-select__option-with-leading-content .mdc-list-item__start,.mdc-select__option-with-leading-content .mdc-list-item__start[dir=rtl]{margin-left:0;margin-right:12px}.mdc-select__option-with-leading-content .mdc-list-item__start{width:36px;height:24px}[dir=rtl] .mdc-select__option-with-leading-content,.mdc-select__option-with-leading-content[dir=rtl]{padding-left:12px;padding-right:0}.mdc-select__option-with-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-select__option-with-meta.mdc-list-item,.mdc-select__option-with-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-select__option-with-meta .mdc-list-item__end{margin-left:12px;margin-right:12px}[dir=rtl] .mdc-select__option-with-meta .mdc-list-item__end,.mdc-select__option-with-meta .mdc-list-item__end[dir=rtl]{margin-left:12px;margin-right:12px}.mdc-select--filled .mdc-select__anchor{height:56px;display:flex;align-items:baseline}.mdc-select--filled .mdc-select__anchor::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-select--filled.mdc-select--no-label .mdc-select__anchor .mdc-select__selected-text::before{content:"​"}.mdc-select--filled.mdc-select--no-label .mdc-select__anchor .mdc-select__selected-text-container{height:100%;display:inline-flex;align-items:center}.mdc-select--filled.mdc-select--no-label .mdc-select__anchor::before{display:none}.mdc-select--filled .mdc-select__anchor{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:0;border-bottom-left-radius:0}.mdc-select--filled:not(.mdc-select--disabled) .mdc-select__anchor{background-color:whitesmoke}.mdc-select--filled.mdc-select--disabled .mdc-select__anchor{background-color:#fafafa}.mdc-select--filled:not(.mdc-select--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42)}.mdc-select--filled:not(.mdc-select--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87)}.mdc-select--filled:not(.mdc-select--disabled) .mdc-line-ripple::after{border-bottom-color:#6200ee;border-bottom-color:var(--mdc-theme-primary, #6200ee)}.mdc-select--filled.mdc-select--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.06)}.mdc-select--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-select--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-select--filled .mdc-menu-surface--is-open-below{border-top-left-radius:0px;border-top-right-radius:0px}.mdc-select--filled.mdc-select--focused.mdc-line-ripple::after{transform:scale(1, 2);opacity:1}.mdc-select--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-select--filled .mdc-floating-label,.mdc-select--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-select--filled.mdc-select--with-leading-icon .mdc-floating-label{left:48px;right:initial}[dir=rtl] .mdc-select--filled.mdc-select--with-leading-icon .mdc-floating-label,.mdc-select--filled.mdc-select--with-leading-icon .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-select--filled.mdc-select--with-leading-icon .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-select--filled.mdc-select--with-leading-icon .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 96px / 0.75)}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled):hover .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-line-ripple::after{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-select--outlined{border:none}.mdc-select--outlined .mdc-select__anchor{height:56px}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--float-above{font-size:.75rem}.mdc-select--outlined .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-select--outlined .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-select-outlined-56px 250ms 1}@keyframes mdc-floating-label-shake-float-above-select-outlined-56px{0%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}}.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px, var(--mdc-shape-small, 4px)) * 2)}}.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}@supports(top: max(0%)){.mdc-select--outlined .mdc-select__anchor{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-select--outlined .mdc-select__anchor,.mdc-select--outlined .mdc-select__anchor[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-select--outlined .mdc-select__anchor,.mdc-select--outlined .mdc-select__anchor[dir=rtl]{padding-right:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-select--outlined+.mdc-select-helper-text{margin-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-select--outlined+.mdc-select-helper-text,.mdc-select--outlined+.mdc-select-helper-text[dir=rtl]{margin-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-select--outlined+.mdc-select-helper-text,.mdc-select--outlined+.mdc-select-helper-text[dir=rtl]{margin-right:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}.mdc-select--outlined:not(.mdc-select--disabled) .mdc-select__anchor{background-color:transparent}.mdc-select--outlined.mdc-select--disabled .mdc-select__anchor{background-color:transparent}.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.38)}.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.87)}.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-width:2px}.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-select--outlined.mdc-select--disabled .mdc-notched-outline__leading,.mdc-select--outlined.mdc-select--disabled .mdc-notched-outline__notch,.mdc-select--outlined.mdc-select--disabled .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.06)}.mdc-select--outlined .mdc-select__anchor :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-select--outlined .mdc-select__anchor{display:flex;align-items:baseline;overflow:visible}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-select-outlined 250ms 1}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--float-above{font-size:.75rem}.mdc-select--outlined .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-select--outlined .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-select--outlined .mdc-select__anchor .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-select--outlined .mdc-select__anchor .mdc-select__selected-text::before{content:"​"}.mdc-select--outlined .mdc-select__anchor .mdc-select__selected-text-container{height:100%;display:inline-flex;align-items:center}.mdc-select--outlined .mdc-select__anchor::before{display:none}.mdc-select--outlined .mdc-select__selected-text-container{display:flex;border:none;z-index:1;background-color:transparent}.mdc-select--outlined .mdc-select__icon{z-index:2}.mdc-select--outlined .mdc-floating-label{line-height:1.15rem;left:4px;right:initial}[dir=rtl] .mdc-select--outlined .mdc-floating-label,.mdc-select--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-select--outlined.mdc-select--focused .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled) .mdc-notched-outline__leading,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled) .mdc-notched-outline__notch,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled) .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-width:2px}.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label,.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--float-above,.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--float-above{font-size:.75rem}.mdc-select--outlined.mdc-select--with-leading-icon.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined.mdc-select--with-leading-icon .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-select--outlined.mdc-select--with-leading-icon.mdc-notched-outline--upgraded .mdc-floating-label--float-above,[dir=rtl] .mdc-select--outlined.mdc-select--with-leading-icon .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined.mdc-select--with-leading-icon.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],.mdc-select--outlined.mdc-select--with-leading-icon .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-select--outlined.mdc-select--with-leading-icon.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined.mdc-select--with-leading-icon .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px 250ms 1}@keyframes mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px{0%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}}[dir=rtl] .mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--shake,.mdc-select--outlined.mdc-select--with-leading-icon[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px 250ms 1}@keyframes mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px-rtl{0%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}}.mdc-select--outlined.mdc-select--with-leading-icon .mdc-select__anchor :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 96px)}.mdc-select--outlined .mdc-menu-surface{margin-bottom:8px}.mdc-select--outlined.mdc-select--no-label .mdc-menu-surface,.mdc-select--outlined .mdc-menu-surface--is-open-below{margin-bottom:0}.mdc-select__anchor{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity}.mdc-select__anchor .mdc-select__ripple::before,.mdc-select__anchor .mdc-select__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-select__anchor .mdc-select__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-select__anchor .mdc-select__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-select__anchor.mdc-ripple-upgraded .mdc-select__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-select__anchor.mdc-ripple-upgraded .mdc-select__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-select__anchor.mdc-ripple-upgraded--unbounded .mdc-select__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-select__anchor.mdc-ripple-upgraded--foreground-activation .mdc-select__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-select__anchor.mdc-ripple-upgraded--foreground-deactivation .mdc-select__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-select__anchor .mdc-select__ripple::before,.mdc-select__anchor .mdc-select__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-select__anchor.mdc-ripple-upgraded .mdc-select__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-select__anchor .mdc-select__ripple::before,.mdc-select__anchor .mdc-select__ripple::after{background-color:rgba(0, 0, 0, 0.87);background-color:var(--mdc-ripple-color, rgba(0, 0, 0, 0.87))}.mdc-select__anchor:hover .mdc-select__ripple::before,.mdc-select__anchor.mdc-ripple-surface--hover .mdc-select__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-select__anchor.mdc-ripple-upgraded--background-focused .mdc-select__ripple::before,.mdc-select__anchor:not(.mdc-ripple-upgraded):focus .mdc-select__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-select__anchor .mdc-select__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected .mdc-deprecated-list-item__ripple::before,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected .mdc-deprecated-list-item__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, var(--mdc-theme-on-surface, #000))}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:hover .mdc-deprecated-list-item__ripple::before,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected.mdc-ripple-surface--hover .mdc-deprecated-list-item__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected.mdc-ripple-upgraded--background-focused .mdc-deprecated-list-item__ripple::before,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):focus .mdc-deprecated-list-item__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded) .mdc-deprecated-list-item__ripple::after{transition:opacity 150ms linear}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):active .mdc-deprecated-list-item__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected .mdc-list-item__ripple::before,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected .mdc-list-item__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, var(--mdc-theme-on-surface, #000))}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:hover .mdc-list-item__ripple::before,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected.mdc-ripple-surface--hover .mdc-list-item__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded) .mdc-list-item__ripple::after{transition:opacity 150ms linear}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):active .mdc-list-item__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-select-helper-text{margin:0;margin-left:16px;margin-right:16px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal}[dir=rtl] .mdc-select-helper-text,.mdc-select-helper-text[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-select-helper-text::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}.mdc-select-helper-text--validation-msg{opacity:0;transition:opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-select--invalid+.mdc-select-helper-text--validation-msg,.mdc-select-helper-text--validation-msg-persistent{opacity:1}.mdc-select--with-leading-icon .mdc-select__icon{display:inline-block;box-sizing:border-box;border:none;text-decoration:none;cursor:pointer;user-select:none;flex-shrink:0;align-self:center;background-color:transparent;fill:currentColor}.mdc-select--with-leading-icon .mdc-select__icon{margin-left:12px;margin-right:12px}[dir=rtl] .mdc-select--with-leading-icon .mdc-select__icon,.mdc-select--with-leading-icon .mdc-select__icon[dir=rtl]{margin-left:12px;margin-right:12px}.mdc-select__icon:not([tabindex]),.mdc-select__icon[tabindex="-1"]{cursor:default;pointer-events:none}.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}:host{display:inline-block;vertical-align:top;outline:none}.mdc-select{width:100%}[hidden]{display:none}.mdc-select__icon{z-index:2}.mdc-select--with-leading-icon{--mdc-list-item-graphic-margin: calc( 48px - var(--mdc-list-item-graphic-size, 24px) - var(--mdc-list-side-padding, 16px) )}.mdc-select .mdc-select__anchor .mdc-select__selected-text{overflow:hidden}.mdc-select .mdc-select__anchor *{display:inline-flex}.mdc-select .mdc-select__anchor .mdc-floating-label{display:inline-block}mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-select-outlined-idle-border-color, rgba(0, 0, 0, 0.38) );--mdc-notched-outline-notch-offset: 1px}:host(:not([disabled]):hover) .mdc-select:not(.mdc-select--invalid):not(.mdc-select--focused) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-select-outlined-hover-border-color, rgba(0, 0, 0, 0.87) )}:host(:not([disabled])) .mdc-select:not(.mdc-select--disabled) .mdc-select__selected-text{color:rgba(0, 0, 0, 0.87);color:var(--mdc-select-ink-color, rgba(0, 0, 0, 0.87))}:host(:not([disabled])) .mdc-select:not(.mdc-select--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42);border-bottom-color:var(--mdc-select-idle-line-color, rgba(0, 0, 0, 0.42))}:host(:not([disabled])) .mdc-select:not(.mdc-select--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87);border-bottom-color:var(--mdc-select-hover-line-color, rgba(0, 0, 0, 0.87))}:host(:not([disabled])) .mdc-select:not(.mdc-select--outlined):not(.mdc-select--disabled) .mdc-select__anchor{background-color:whitesmoke;background-color:var(--mdc-select-fill-color, whitesmoke)}:host(:not([disabled])) .mdc-select.mdc-select--invalid .mdc-select__dropdown-icon{fill:var(--mdc-select-error-dropdown-icon-color, var(--mdc-select-error-color, var(--mdc-theme-error, #b00020)))}:host(:not([disabled])) .mdc-select.mdc-select--invalid .mdc-floating-label,:host(:not([disabled])) .mdc-select.mdc-select--invalid .mdc-floating-label::after{color:var(--mdc-select-error-color, var(--mdc-theme-error, #b00020))}:host(:not([disabled])) .mdc-select.mdc-select--invalid mwc-notched-outline{--mdc-notched-outline-border-color: var(--mdc-select-error-color, var(--mdc-theme-error, #b00020))}.mdc-select__menu--invalid{--mdc-theme-primary: var(--mdc-select-error-color, var(--mdc-theme-error, #b00020))}:host(:not([disabled])) .mdc-select:not(.mdc-select--invalid):not(.mdc-select--focused) .mdc-floating-label,:host(:not([disabled])) .mdc-select:not(.mdc-select--invalid):not(.mdc-select--focused) .mdc-floating-label::after{color:rgba(0, 0, 0, 0.6);color:var(--mdc-select-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-select:not(.mdc-select--invalid):not(.mdc-select--focused) .mdc-select__dropdown-icon{fill:rgba(0, 0, 0, 0.54);fill:var(--mdc-select-dropdown-icon-color, rgba(0, 0, 0, 0.54))}:host(:not([disabled])) .mdc-select.mdc-select--focused mwc-notched-outline{--mdc-notched-outline-stroke-width: 2px;--mdc-notched-outline-notch-offset: 2px}:host(:not([disabled])) .mdc-select.mdc-select--focused:not(.mdc-select--invalid) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-select-focused-label-color, var(--mdc-theme-primary, rgba(98, 0, 238, 0.87)) )}:host(:not([disabled])) .mdc-select.mdc-select--focused:not(.mdc-select--invalid) .mdc-select__dropdown-icon{fill:rgba(98,0,238,.87);fill:var(--mdc-select-focused-dropdown-icon-color, var(--mdc-theme-primary, rgba(98, 0, 238, 0.87)))}:host(:not([disabled])) .mdc-select.mdc-select--focused:not(.mdc-select--invalid) .mdc-floating-label{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host(:not([disabled])) .mdc-select.mdc-select--focused:not(.mdc-select--invalid) .mdc-floating-label::after{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host(:not([disabled])) .mdc-select-helper-text:not(.mdc-select-helper-text--validation-msg){color:var(--mdc-select-label-ink-color, rgba(0, 0, 0, 0.6))}:host([disabled]){pointer-events:none}:host([disabled]) .mdc-select:not(.mdc-select--outlined).mdc-select--disabled .mdc-select__anchor{background-color:#fafafa;background-color:var(--mdc-select-disabled-fill-color, #fafafa)}:host([disabled]) .mdc-select.mdc-select--outlined mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-select-outlined-disabled-border-color, rgba(0, 0, 0, 0.06) )}:host([disabled]) .mdc-select .mdc-select__dropdown-icon{fill:rgba(0, 0, 0, 0.38);fill:var(--mdc-select-disabled-dropdown-icon-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-select:not(.mdc-select--invalid):not(.mdc-select--focused) .mdc-floating-label,:host([disabled]) .mdc-select:not(.mdc-select--invalid):not(.mdc-select--focused) .mdc-floating-label::after{color:rgba(0, 0, 0, 0.38);color:var(--mdc-select-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-select-helper-text{color:rgba(0, 0, 0, 0.38);color:var(--mdc-select-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-select__selected-text{color:rgba(0, 0, 0, 0.38);color:var(--mdc-select-disabled-ink-color, rgba(0, 0, 0, 0.38))}`;let Gi=class extends Vi{static get styles(){return Ui}};Gi=o([n("floor3d-select")],Gi);
/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var Xi={ARIA_CONTROLS:"aria-controls",ARIA_DESCRIBEDBY:"aria-describedby",INPUT_SELECTOR:".mdc-text-field__input",LABEL_SELECTOR:".mdc-floating-label",LEADING_ICON_SELECTOR:".mdc-text-field__icon--leading",LINE_RIPPLE_SELECTOR:".mdc-line-ripple",OUTLINE_SELECTOR:".mdc-notched-outline",PREFIX_SELECTOR:".mdc-text-field__affix--prefix",SUFFIX_SELECTOR:".mdc-text-field__affix--suffix",TRAILING_ICON_SELECTOR:".mdc-text-field__icon--trailing"},Yi={DISABLED:"mdc-text-field--disabled",FOCUSED:"mdc-text-field--focused",HELPER_LINE:"mdc-text-field-helper-line",INVALID:"mdc-text-field--invalid",LABEL_FLOATING:"mdc-text-field--label-floating",NO_LABEL:"mdc-text-field--no-label",OUTLINED:"mdc-text-field--outlined",ROOT:"mdc-text-field",TEXTAREA:"mdc-text-field--textarea",WITH_LEADING_ICON:"mdc-text-field--with-leading-icon",WITH_TRAILING_ICON:"mdc-text-field--with-trailing-icon",WITH_INTERNAL_COUNTER:"mdc-text-field--with-internal-counter"},qi={LABEL_SCALE:.75},Wi=["pattern","min","max","required","step","minlength","maxlength"],Zi=["color","date","datetime-local","month","range","time","week"],Ki=["mousedown","touchstart"],Qi=["click","keydown"],Ji=function(o){function n(e,i){void 0===i&&(i={});var l=o.call(this,t(t({},n.defaultAdapter),e))||this;return l.isFocused=!1,l.receivedUserInput=!1,l.valid=!0,l.useNativeValidation=!0,l.validateOnValueChange=!0,l.helperText=i.helperText,l.characterCounter=i.characterCounter,l.leadingIcon=i.leadingIcon,l.trailingIcon=i.trailingIcon,l.inputFocusHandler=function(){l.activateFocus()},l.inputBlurHandler=function(){l.deactivateFocus()},l.inputInputHandler=function(){l.handleInput()},l.setPointerXOffset=function(e){l.setTransformOrigin(e)},l.textFieldInteractionHandler=function(){l.handleTextFieldInteraction()},l.validationAttributeChangeHandler=function(e){l.handleValidationAttributeChange(e)},l}return e(n,o),Object.defineProperty(n,"cssClasses",{get:function(){return Yi},enumerable:!1,configurable:!0}),Object.defineProperty(n,"strings",{get:function(){return Xi},enumerable:!1,configurable:!0}),Object.defineProperty(n,"numbers",{get:function(){return qi},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"shouldAlwaysFloat",{get:function(){var e=this.getNativeInput().type;return Zi.indexOf(e)>=0},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"shouldFloat",{get:function(){return this.shouldAlwaysFloat||this.isFocused||!!this.getValue()||this.isBadInput()},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"shouldShake",{get:function(){return!this.isFocused&&!this.isValid()&&!!this.getValue()},enumerable:!1,configurable:!0}),Object.defineProperty(n,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!0},setInputAttr:function(){},removeInputAttr:function(){},registerTextFieldInteractionHandler:function(){},deregisterTextFieldInteractionHandler:function(){},registerInputInteractionHandler:function(){},deregisterInputInteractionHandler:function(){},registerValidationAttributeChangeHandler:function(){return new MutationObserver(function(){})},deregisterValidationAttributeChangeHandler:function(){},getNativeInput:function(){return null},isFocused:function(){return!1},activateLineRipple:function(){},deactivateLineRipple:function(){},setLineRippleTransformOrigin:function(){},shakeLabel:function(){},floatLabel:function(){},setLabelRequired:function(){},hasLabel:function(){return!1},getLabelWidth:function(){return 0},hasOutline:function(){return!1},notchOutline:function(){},closeOutline:function(){}}},enumerable:!1,configurable:!0}),n.prototype.init=function(){var e,t,o,n;this.adapter.hasLabel()&&this.getNativeInput().required&&this.adapter.setLabelRequired(!0),this.adapter.isFocused()?this.inputFocusHandler():this.adapter.hasLabel()&&this.shouldFloat&&(this.notchOutline(!0),this.adapter.floatLabel(!0),this.styleFloating(!0)),this.adapter.registerInputInteractionHandler("focus",this.inputFocusHandler),this.adapter.registerInputInteractionHandler("blur",this.inputBlurHandler),this.adapter.registerInputInteractionHandler("input",this.inputInputHandler);try{for(var l=i(Ki),d=l.next();!d.done;d=l.next()){var r=d.value;this.adapter.registerInputInteractionHandler(r,this.setPointerXOffset)}}catch(t){e={error:t}}finally{try{d&&!d.done&&(t=l.return)&&t.call(l)}finally{if(e)throw e.error}}try{for(var a=i(Qi),s=a.next();!s.done;s=a.next()){r=s.value;this.adapter.registerTextFieldInteractionHandler(r,this.textFieldInteractionHandler)}}catch(e){o={error:e}}finally{try{s&&!s.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}this.validationObserver=this.adapter.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler),this.setcharacterCounter(this.getValue().length)},n.prototype.destroy=function(){var e,t,o,n;this.adapter.deregisterInputInteractionHandler("focus",this.inputFocusHandler),this.adapter.deregisterInputInteractionHandler("blur",this.inputBlurHandler),this.adapter.deregisterInputInteractionHandler("input",this.inputInputHandler);try{for(var l=i(Ki),d=l.next();!d.done;d=l.next()){var r=d.value;this.adapter.deregisterInputInteractionHandler(r,this.setPointerXOffset)}}catch(t){e={error:t}}finally{try{d&&!d.done&&(t=l.return)&&t.call(l)}finally{if(e)throw e.error}}try{for(var a=i(Qi),s=a.next();!s.done;s=a.next()){r=s.value;this.adapter.deregisterTextFieldInteractionHandler(r,this.textFieldInteractionHandler)}}catch(e){o={error:e}}finally{try{s&&!s.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}this.adapter.deregisterValidationAttributeChangeHandler(this.validationObserver)},n.prototype.handleTextFieldInteraction=function(){var e=this.adapter.getNativeInput();e&&e.disabled||(this.receivedUserInput=!0)},n.prototype.handleValidationAttributeChange=function(e){var t=this;e.some(function(e){return Wi.indexOf(e)>-1&&(t.styleValidity(!0),t.adapter.setLabelRequired(t.getNativeInput().required),!0)}),e.indexOf("maxlength")>-1&&this.setcharacterCounter(this.getValue().length)},n.prototype.notchOutline=function(e){if(this.adapter.hasOutline()&&this.adapter.hasLabel())if(e){var t=this.adapter.getLabelWidth()*qi.LABEL_SCALE;this.adapter.notchOutline(t)}else this.adapter.closeOutline()},n.prototype.activateFocus=function(){this.isFocused=!0,this.styleFocused(this.isFocused),this.adapter.activateLineRipple(),this.adapter.hasLabel()&&(this.notchOutline(this.shouldFloat),this.adapter.floatLabel(this.shouldFloat),this.styleFloating(this.shouldFloat),this.adapter.shakeLabel(this.shouldShake)),!this.helperText||!this.helperText.isPersistent()&&this.helperText.isValidation()&&this.valid||this.helperText.showToScreenReader()},n.prototype.setTransformOrigin=function(e){if(!this.isDisabled()&&!this.adapter.hasOutline()){var t=e.touches,i=t?t[0]:e,o=i.target.getBoundingClientRect(),n=i.clientX-o.left;this.adapter.setLineRippleTransformOrigin(n)}},n.prototype.handleInput=function(){this.autoCompleteFocus(),this.setcharacterCounter(this.getValue().length)},n.prototype.autoCompleteFocus=function(){this.receivedUserInput||this.activateFocus()},n.prototype.deactivateFocus=function(){this.isFocused=!1,this.adapter.deactivateLineRipple();var e=this.isValid();this.styleValidity(e),this.styleFocused(this.isFocused),this.adapter.hasLabel()&&(this.notchOutline(this.shouldFloat),this.adapter.floatLabel(this.shouldFloat),this.styleFloating(this.shouldFloat),this.adapter.shakeLabel(this.shouldShake)),this.shouldFloat||(this.receivedUserInput=!1)},n.prototype.getValue=function(){return this.getNativeInput().value},n.prototype.setValue=function(e){if(this.getValue()!==e&&(this.getNativeInput().value=e),this.setcharacterCounter(e.length),this.validateOnValueChange){var t=this.isValid();this.styleValidity(t)}this.adapter.hasLabel()&&(this.notchOutline(this.shouldFloat),this.adapter.floatLabel(this.shouldFloat),this.styleFloating(this.shouldFloat),this.validateOnValueChange&&this.adapter.shakeLabel(this.shouldShake))},n.prototype.isValid=function(){return this.useNativeValidation?this.isNativeInputValid():this.valid},n.prototype.setValid=function(e){this.valid=e,this.styleValidity(e);var t=!e&&!this.isFocused&&!!this.getValue();this.adapter.hasLabel()&&this.adapter.shakeLabel(t)},n.prototype.setValidateOnValueChange=function(e){this.validateOnValueChange=e},n.prototype.getValidateOnValueChange=function(){return this.validateOnValueChange},n.prototype.setUseNativeValidation=function(e){this.useNativeValidation=e},n.prototype.isDisabled=function(){return this.getNativeInput().disabled},n.prototype.setDisabled=function(e){this.getNativeInput().disabled=e,this.styleDisabled(e)},n.prototype.setHelperTextContent=function(e){this.helperText&&this.helperText.setContent(e)},n.prototype.setLeadingIconAriaLabel=function(e){this.leadingIcon&&this.leadingIcon.setAriaLabel(e)},n.prototype.setLeadingIconContent=function(e){this.leadingIcon&&this.leadingIcon.setContent(e)},n.prototype.setTrailingIconAriaLabel=function(e){this.trailingIcon&&this.trailingIcon.setAriaLabel(e)},n.prototype.setTrailingIconContent=function(e){this.trailingIcon&&this.trailingIcon.setContent(e)},n.prototype.setcharacterCounter=function(e){if(this.characterCounter){var t=this.getNativeInput().maxLength;if(-1===t)throw new Error("MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.");this.characterCounter.setCounterValue(e,t)}},n.prototype.isBadInput=function(){return this.getNativeInput().validity.badInput||!1},n.prototype.isNativeInputValid=function(){return this.getNativeInput().validity.valid},n.prototype.styleValidity=function(e){var t=n.cssClasses.INVALID;if(e?this.adapter.removeClass(t):this.adapter.addClass(t),this.helperText){if(this.helperText.setValidity(e),!this.helperText.isValidation())return;var i=this.helperText.isVisible(),o=this.helperText.getId();i&&o?this.adapter.setInputAttr(Xi.ARIA_DESCRIBEDBY,o):this.adapter.removeInputAttr(Xi.ARIA_DESCRIBEDBY)}},n.prototype.styleFocused=function(e){var t=n.cssClasses.FOCUSED;e?this.adapter.addClass(t):this.adapter.removeClass(t)},n.prototype.styleDisabled=function(e){var t=n.cssClasses,i=t.DISABLED,o=t.INVALID;e?(this.adapter.addClass(i),this.adapter.removeClass(o)):this.adapter.removeClass(i),this.leadingIcon&&this.leadingIcon.setDisabled(e),this.trailingIcon&&this.trailingIcon.setDisabled(e)},n.prototype.styleFloating=function(e){var t=n.cssClasses.LABEL_FLOATING;e?this.adapter.addClass(t):this.adapter.removeClass(t)},n.prototype.getNativeInput=function(){return(this.adapter?this.adapter.getNativeInput():null)||{disabled:!1,maxLength:-1,required:!1,type:"input",validity:{badInput:!1,valid:!0},value:""}},n}(A);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const eo={},to=pt(class extends ut{constructor(e){if(super(e),e.type!==mt&&e.type!==ct&&e.type!==ht)throw Error("The `live` directive is not allowed on child or event bindings");if(!(e=>void 0===e.strings)(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Ce||t===Ie)return t;const i=e.element,o=e.name;if(e.type===mt){if(t===i[o])return Ce}else if(e.type===ht){if(!!t===i.hasAttribute(o))return Ce}else if(e.type===ct&&i.getAttribute(o)===t+"")return Ce;return((e,t=eo)=>{e._$AH=t;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */})(e),t}}),io=["touchstart","touchmove","scroll","mousewheel"],oo=(e={})=>{const t={};for(const i in e)t[i]=e[i];return Object.assign({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1},t)};class no extends $i{constructor(){super(...arguments),this.mdcFoundationClass=Ji,this.value="",this.type="text",this.placeholder="",this.label="",this.icon="",this.iconTrailing="",this.disabled=!1,this.required=!1,this.minLength=-1,this.maxLength=-1,this.outlined=!1,this.helper="",this.validateOnInitialRender=!1,this.validationMessage="",this.autoValidate=!1,this.pattern="",this.min="",this.max="",this.step=null,this.size=null,this.helperPersistent=!1,this.charCounter=!1,this.endAligned=!1,this.prefix="",this.suffix="",this.name="",this.readOnly=!1,this.autocapitalize="",this.outlineOpen=!1,this.outlineWidth=0,this.isUiValid=!0,this.focused=!1,this._validity=oo(),this.validityTransform=null}get validity(){return this._checkValidity(this.value),this._validity}get willValidate(){return this.formElement.willValidate}get selectionStart(){return this.formElement.selectionStart}get selectionEnd(){return this.formElement.selectionEnd}focus(){const e=new CustomEvent("focus");this.formElement.dispatchEvent(e),this.formElement.focus()}blur(){const e=new CustomEvent("blur");this.formElement.dispatchEvent(e),this.formElement.blur()}select(){this.formElement.select()}setSelectionRange(e,t,i){this.formElement.setSelectionRange(e,t,i)}update(e){e.has("autoValidate")&&this.mdcFoundation&&this.mdcFoundation.setValidateOnValueChange(this.autoValidate),e.has("value")&&"string"!=typeof this.value&&(this.value=`${this.value}`),super.update(e)}setFormData(e){this.name&&e.append(this.name,this.value)}render(){const e=this.charCounter&&-1!==this.maxLength,t=!!this.helper||!!this.validationMessage||e,i={"mdc-text-field--disabled":this.disabled,"mdc-text-field--no-label":!this.label,"mdc-text-field--filled":!this.outlined,"mdc-text-field--outlined":this.outlined,"mdc-text-field--with-leading-icon":this.icon,"mdc-text-field--with-trailing-icon":this.iconTrailing,"mdc-text-field--end-aligned":this.endAligned};return Ee`
      <label class="mdc-text-field ${ft(i)}">
        ${this.renderRipple()}
        ${this.outlined?this.renderOutline():this.renderLabel()}
        ${this.renderLeadingIcon()}
        ${this.renderPrefix()}
        ${this.renderInput(t)}
        ${this.renderSuffix()}
        ${this.renderTrailingIcon()}
        ${this.renderLineRipple()}
      </label>
      ${this.renderHelperText(t,e)}
    `}updated(e){e.has("value")&&void 0!==e.get("value")&&(this.mdcFoundation.setValue(this.value),this.autoValidate&&this.reportValidity())}renderRipple(){return this.outlined?"":Ee`
      <span class="mdc-text-field__ripple"></span>
    `}renderOutline(){return this.outlined?Ee`
      <mwc-notched-outline
          .width=${this.outlineWidth}
          .open=${this.outlineOpen}
          class="mdc-notched-outline">
        ${this.renderLabel()}
      </mwc-notched-outline>`:""}renderLabel(){return this.label?Ee`
      <span
          .floatingLabelFoundation=${Fi(this.label)}
          id="label">${this.label}</span>
    `:""}renderLeadingIcon(){return this.icon?this.renderIcon(this.icon):""}renderTrailingIcon(){return this.iconTrailing?this.renderIcon(this.iconTrailing,!0):""}renderIcon(e,t=!1){return Ee`<i class="material-icons mdc-text-field__icon ${ft({"mdc-text-field__icon--leading":!t,"mdc-text-field__icon--trailing":t})}">${e}</i>`}renderPrefix(){return this.prefix?this.renderAffix(this.prefix):""}renderSuffix(){return this.suffix?this.renderAffix(this.suffix,!0):""}renderAffix(e,t=!1){return Ee`<span class="mdc-text-field__affix ${ft({"mdc-text-field__affix--prefix":!t,"mdc-text-field__affix--suffix":t})}">
        ${e}</span>`}renderInput(e){const t=-1===this.minLength?void 0:this.minLength,i=-1===this.maxLength?void 0:this.maxLength,o=this.autocapitalize?this.autocapitalize:void 0,n=this.validationMessage&&!this.isUiValid,l=this.label?"label":void 0,d=e?"helper-text":void 0,r=this.focused||this.helperPersistent||n?"helper-text":void 0;return Ee`
      <input
          aria-labelledby=${ai(l)}
          aria-controls="${ai(d)}"
          aria-describedby="${ai(r)}"
          class="mdc-text-field__input"
          type="${this.type}"
          .value="${to(this.value)}"
          ?disabled="${this.disabled}"
          placeholder="${this.placeholder}"
          ?required="${this.required}"
          ?readonly="${this.readOnly}"
          minlength="${ai(t)}"
          maxlength="${ai(i)}"
          pattern="${ai(this.pattern?this.pattern:void 0)}"
          min="${ai(""===this.min?void 0:this.min)}"
          max="${ai(""===this.max?void 0:this.max)}"
          step="${ai(null===this.step?void 0:this.step)}"
          size="${ai(null===this.size?void 0:this.size)}"
          name="${ai(""===this.name?void 0:this.name)}"
          inputmode="${ai(this.inputMode)}"
          autocapitalize="${ai(o)}"
          @input="${this.handleInputChange}"
          @focus="${this.onInputFocus}"
          @blur="${this.onInputBlur}">`}renderLineRipple(){return this.outlined?"":Ee`
      <span .lineRippleFoundation=${zi()}></span>
    `}renderHelperText(e,t){const i=this.validationMessage&&!this.isUiValid,o={"mdc-text-field-helper-text--persistent":this.helperPersistent,"mdc-text-field-helper-text--validation-msg":i},n=this.focused||this.helperPersistent||i?void 0:"true",l=i?this.validationMessage:this.helper;return e?Ee`
      <div class="mdc-text-field-helper-line">
        <div id="helper-text"
             aria-hidden="${ai(n)}"
             class="mdc-text-field-helper-text ${ft(o)}"
             >${l}</div>
        ${this.renderCharCounter(t)}
      </div>`:""}renderCharCounter(e){const t=Math.min(this.value.length,this.maxLength);return e?Ee`
      <span class="mdc-text-field-character-counter"
            >${t} / ${this.maxLength}</span>`:""}onInputFocus(){this.focused=!0}onInputBlur(){this.focused=!1,this.reportValidity()}checkValidity(){const e=this._checkValidity(this.value);if(!e){const e=new Event("invalid",{bubbles:!1,cancelable:!0});this.dispatchEvent(e)}return e}reportValidity(){const e=this.checkValidity();return this.mdcFoundation.setValid(e),this.isUiValid=e,e}_checkValidity(e){const t=this.formElement.validity;let i=oo(t);if(this.validityTransform){const t=this.validityTransform(e,i);i=Object.assign(Object.assign({},i),t),this.mdcFoundation.setUseNativeValidation(!1)}else this.mdcFoundation.setUseNativeValidation(!0);return this._validity=i,this._validity.valid}setCustomValidity(e){this.validationMessage=e,this.formElement.setCustomValidity(e)}handleInputChange(){this.value=this.formElement.value}createAdapter(){return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},this.getRootAdapterMethods()),this.getInputAdapterMethods()),this.getLabelAdapterMethods()),this.getLineRippleAdapterMethods()),this.getOutlineAdapterMethods())}getRootAdapterMethods(){return Object.assign({registerTextFieldInteractionHandler:(e,t)=>this.addEventListener(e,t),deregisterTextFieldInteractionHandler:(e,t)=>this.removeEventListener(e,t),registerValidationAttributeChangeHandler:e=>{const t=new MutationObserver(t=>{e((e=>e.map(e=>e.attributeName).filter(e=>e))(t))});return t.observe(this.formElement,{attributes:!0}),t},deregisterValidationAttributeChangeHandler:e=>e.disconnect()},qe(this.mdcRoot))}getInputAdapterMethods(){return{getNativeInput:()=>this.formElement,setInputAttr:()=>{},removeInputAttr:()=>{},isFocused:()=>!!this.shadowRoot&&this.shadowRoot.activeElement===this.formElement,registerInputInteractionHandler:(e,t)=>this.formElement.addEventListener(e,t,{passive:e in io}),deregisterInputInteractionHandler:(e,t)=>this.formElement.removeEventListener(e,t)}}getLabelAdapterMethods(){return{floatLabel:e=>this.labelElement&&this.labelElement.floatingLabelFoundation.float(e),getLabelWidth:()=>this.labelElement?this.labelElement.floatingLabelFoundation.getWidth():0,hasLabel:()=>Boolean(this.labelElement),shakeLabel:e=>this.labelElement&&this.labelElement.floatingLabelFoundation.shake(e),setLabelRequired:e=>{this.labelElement&&this.labelElement.floatingLabelFoundation.setRequired(e)}}}getLineRippleAdapterMethods(){return{activateLineRipple:()=>{this.lineRippleElement&&this.lineRippleElement.lineRippleFoundation.activate()},deactivateLineRipple:()=>{this.lineRippleElement&&this.lineRippleElement.lineRippleFoundation.deactivate()},setLineRippleTransformOrigin:e=>{this.lineRippleElement&&this.lineRippleElement.lineRippleFoundation.setRippleCenter(e)}}}async getUpdateComplete(){var e;const t=await super.getUpdateComplete();return await(null===(e=this.outlineElement)||void 0===e?void 0:e.updateComplete),t}firstUpdated(){var e;super.firstUpdated(),this.mdcFoundation.setValidateOnValueChange(this.autoValidate),this.validateOnInitialRender&&this.reportValidity(),null===(e=this.outlineElement)||void 0===e||e.updateComplete.then(()=>{var e;this.outlineWidth=(null===(e=this.labelElement)||void 0===e?void 0:e.floatingLabelFoundation.getWidth())||0})}getOutlineAdapterMethods(){return{closeOutline:()=>this.outlineElement&&(this.outlineOpen=!1),hasOutline:()=>Boolean(this.outlineElement),notchOutline:e=>{this.outlineElement&&!this.outlineOpen&&(this.outlineWidth=e,this.outlineOpen=!0)}}}async layout(){await this.updateComplete;const e=this.labelElement;if(!e)return void(this.outlineOpen=!1);const t=!!this.label&&!!this.value;if(e.floatingLabelFoundation.float(t),!this.outlined)return;this.outlineOpen=t,await this.updateComplete;const i=e.floatingLabelFoundation.getWidth();this.outlineOpen&&(this.outlineWidth=i,await this.updateComplete)}}o([dt(".mdc-text-field")],no.prototype,"mdcRoot",void 0),o([dt("input")],no.prototype,"formElement",void 0),o([dt(".mdc-floating-label")],no.prototype,"labelElement",void 0),o([dt(".mdc-line-ripple")],no.prototype,"lineRippleElement",void 0),o([dt("mwc-notched-outline")],no.prototype,"outlineElement",void 0),o([dt(".mdc-notched-outline__notch")],no.prototype,"notchElement",void 0),o([it({type:String})],no.prototype,"value",void 0),o([it({type:String})],no.prototype,"type",void 0),o([it({type:String})],no.prototype,"placeholder",void 0),o([it({type:String}),et(function(e,t){void 0!==t&&this.label!==t&&this.layout()})],no.prototype,"label",void 0),o([it({type:String})],no.prototype,"icon",void 0),o([it({type:String})],no.prototype,"iconTrailing",void 0),o([it({type:Boolean,reflect:!0})],no.prototype,"disabled",void 0),o([it({type:Boolean})],no.prototype,"required",void 0),o([it({type:Number})],no.prototype,"minLength",void 0),o([it({type:Number})],no.prototype,"maxLength",void 0),o([it({type:Boolean,reflect:!0}),et(function(e,t){void 0!==t&&this.outlined!==t&&this.layout()})],no.prototype,"outlined",void 0),o([it({type:String})],no.prototype,"helper",void 0),o([it({type:Boolean})],no.prototype,"validateOnInitialRender",void 0),o([it({type:String})],no.prototype,"validationMessage",void 0),o([it({type:Boolean})],no.prototype,"autoValidate",void 0),o([it({type:String})],no.prototype,"pattern",void 0),o([it({type:String})],no.prototype,"min",void 0),o([it({type:String})],no.prototype,"max",void 0),o([it({type:String})],no.prototype,"step",void 0),o([it({type:Number})],no.prototype,"size",void 0),o([it({type:Boolean})],no.prototype,"helperPersistent",void 0),o([it({type:Boolean})],no.prototype,"charCounter",void 0),o([it({type:Boolean})],no.prototype,"endAligned",void 0),o([it({type:String})],no.prototype,"prefix",void 0),o([it({type:String})],no.prototype,"suffix",void 0),o([it({type:String})],no.prototype,"name",void 0),o([it({type:String})],no.prototype,"inputMode",void 0),o([it({type:Boolean})],no.prototype,"readOnly",void 0),o([it({type:String})],no.prototype,"autocapitalize",void 0),o([ot()],no.prototype,"outlineOpen",void 0),o([ot()],no.prototype,"outlineWidth",void 0),o([ot()],no.prototype,"isUiValid",void 0),o([ot()],no.prototype,"focused",void 0),o([lt({passive:!0})],no.prototype,"handleInputChange",null);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const lo=Y`.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform;transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required::after{margin-left:1px;margin-right:0px;content:"*"}[dir=rtl] .mdc-floating-label--required::after,.mdc-floating-label--required[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{border-bottom-width:1px}.mdc-line-ripple::before{z-index:1}.mdc-line-ripple::after{transform:scaleX(0);border-bottom-width:2px;opacity:0;z-index:2}.mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / 0.75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-text-field--filled{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-text-field--filled .mdc-text-field__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-text-field--filled .mdc-text-field__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-text-field--filled.mdc-ripple-upgraded--unbounded .mdc-text-field__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-text-field--filled.mdc-ripple-upgraded--foreground-activation .mdc-text-field__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-text-field--filled.mdc-ripple-upgraded--foreground-deactivation .mdc-text-field__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-text-field__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-text-field{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:0;border-bottom-left-radius:0;display:inline-flex;align-items:baseline;padding:0 16px;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input{color:rgba(0, 0, 0, 0.87)}@media all{.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:rgba(0, 0, 0, 0.54)}}@media all{.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:rgba(0, 0, 0, 0.54)}}.mdc-text-field .mdc-text-field__input{caret-color:#6200ee;caret-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field-character-counter,.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--leading{color:rgba(0, 0, 0, 0.54)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--trailing{color:rgba(0, 0, 0, 0.54)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__affix--prefix{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__affix--suffix{color:rgba(0, 0, 0, 0.6)}.mdc-text-field .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-text-field__input{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);height:28px;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);width:100%;min-width:0;border:none;border-radius:0;background:none;appearance:none;padding:0}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input::-webkit-calendar-picker-indicator{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}@media all{.mdc-text-field__input::placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}}@media all{.mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}}@media all{.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}}@media all{.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}}.mdc-text-field__affix{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);height:28px;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0;white-space:nowrap}.mdc-text-field--label-floating .mdc-text-field__affix,.mdc-text-field--no-label .mdc-text-field__affix{opacity:1}@supports(-webkit-hyphens: none){.mdc-text-field--outlined .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field__affix--prefix,.mdc-text-field__affix--prefix[dir=rtl]{padding-left:2px;padding-right:0}.mdc-text-field--end-aligned .mdc-text-field__affix--prefix{padding-left:0;padding-right:12px}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--end-aligned .mdc-text-field__affix--prefix[dir=rtl]{padding-left:12px;padding-right:0}.mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field__affix--suffix,.mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:12px}.mdc-text-field--end-aligned .mdc-text-field__affix--suffix{padding-left:2px;padding-right:0}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--end-aligned .mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:2px}.mdc-text-field--filled{height:56px}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{background-color:rgba(0, 0, 0, 0.87);background-color:var(--mdc-ripple-color, rgba(0, 0, 0, 0.87))}.mdc-text-field--filled:hover .mdc-text-field__ripple::before,.mdc-text-field--filled.mdc-ripple-surface--hover .mdc-text-field__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-text-field--filled.mdc-ripple-upgraded--background-focused .mdc-text-field__ripple::before,.mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-text-field--filled::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:whitesmoke}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42)}.mdc-text-field--filled:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87)}.mdc-text-field--filled .mdc-line-ripple::after{border-bottom-color:#6200ee;border-bottom-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-text-field--filled .mdc-floating-label,.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled.mdc-text-field--no-label::before{display:none}@supports(-webkit-hyphens: none){.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field--outlined{height:56px;overflow:visible}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}}.mdc-text-field--outlined .mdc-text-field__input{height:100%}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.38)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.87)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px, var(--mdc-shape-small, 4px)) * 2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px, var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px, var(--mdc-shape-small, 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px, var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined .mdc-text-field__ripple::before,.mdc-text-field--outlined .mdc-text-field__ripple::after{background-color:transparent;background-color:var(--mdc-ripple-color, transparent)}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:transparent}.mdc-text-field--outlined .mdc-notched-outline{z-index:1}.mdc-text-field--textarea{flex-direction:column;align-items:center;width:auto;height:auto;padding:0;transition:none}.mdc-text-field--textarea .mdc-floating-label{top:19px}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea .mdc-text-field__input{flex-grow:1;height:auto;min-height:1.5rem;overflow-x:hidden;overflow-y:auto;box-sizing:border-box;resize:none;padding:0 16px;line-height:1.5rem}.mdc-text-field--textarea.mdc-text-field--filled::before{display:none}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-10.25px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-filled 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-filled{0%{transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-10.25px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-10.25px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}}.mdc-text-field--textarea.mdc-text-field--filled .mdc-text-field__input{margin-top:23px;margin-bottom:9px}.mdc-text-field--textarea.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-27.25px) scale(1)}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-24.75px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-24.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-24.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label{top:18px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field__input{margin-bottom:2px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter{align-self:flex-end;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::after{display:inline-block;width:0;height:16px;content:"";vertical-align:-16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::before{display:none}.mdc-text-field__resizer{align-self:stretch;display:inline-flex;flex-direction:column;flex-grow:1;max-height:100%;max-width:100%;min-height:56px;min-width:fit-content;min-width:-moz-available;min-width:-webkit-fill-available;overflow:hidden;resize:both}.mdc-text-field--filled .mdc-text-field__resizer{transform:translateY(-1px)}.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateY(1px)}.mdc-text-field--outlined .mdc-text-field__resizer{transform:translateX(-1px) translateY(-1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer,.mdc-text-field--outlined .mdc-text-field__resizer[dir=rtl]{transform:translateX(1px) translateY(-1px)}.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateX(1px) translateY(1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input[dir=rtl],.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter[dir=rtl]{transform:translateX(-1px) translateY(1px)}.mdc-text-field--with-leading-icon{padding-left:0;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon,.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:16px;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 48px);left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}}.mdc-text-field--with-trailing-icon{padding-left:16px;padding-right:0}[dir=rtl] .mdc-text-field--with-trailing-icon,.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 96px / 0.75)}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(98, 0, 238, 0.87)}.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--focused.mdc-text-field--outlined.mdc-text-field--textarea .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid .mdc-text-field__input{caret-color:#b00020;caret-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__icon--trailing{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--disabled{pointer-events:none}.mdc-text-field--disabled .mdc-text-field__input{color:rgba(0, 0, 0, 0.38)}@media all{.mdc-text-field--disabled .mdc-text-field__input::placeholder{color:rgba(0, 0, 0, 0.38)}}@media all{.mdc-text-field--disabled .mdc-text-field__input:-ms-input-placeholder{color:rgba(0, 0, 0, 0.38)}}.mdc-text-field--disabled .mdc-floating-label{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field-character-counter,.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field__icon--leading{color:rgba(0, 0, 0, 0.3)}.mdc-text-field--disabled .mdc-text-field__icon--trailing{color:rgba(0, 0, 0, 0.3)}.mdc-text-field--disabled .mdc-text-field__affix--prefix{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field__affix--suffix{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.06)}.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.06)}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__input::placeholder{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__input:-ms-input-placeholder{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-floating-label{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field-character-counter,.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__icon--leading{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__icon--trailing{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__affix--prefix{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__affix--suffix{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:GrayText}}@media screen and (forced-colors: active){.mdc-text-field--disabled .mdc-text-field__input{background-color:Window}.mdc-text-field--disabled .mdc-floating-label{z-index:1}}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--disabled.mdc-text-field--filled{background-color:#fafafa}.mdc-text-field--disabled.mdc-text-field--filled .mdc-text-field__ripple{display:none}.mdc-text-field--disabled .mdc-text-field__input{pointer-events:auto}.mdc-text-field--end-aligned .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--end-aligned .mdc-text-field__input[dir=rtl]{text-align:left}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix{direction:ltr}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--leading,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--leading{order:1}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{order:2}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input{order:3}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{order:4}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--trailing,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--trailing{order:5}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--prefix{padding-right:12px}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--suffix{padding-left:2px}.mdc-text-field-helper-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin:0;opacity:0;will-change:opacity;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-text-field-helper-text::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}.mdc-text-field-helper-text--persistent{transition:none;opacity:1;will-change:initial}.mdc-text-field-character-counter{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin-left:auto;margin-right:0;padding-left:16px;padding-right:0;white-space:nowrap}.mdc-text-field-character-counter::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field__icon{align-self:center;cursor:pointer}.mdc-text-field__icon:not([tabindex]),.mdc-text-field__icon[tabindex="-1"]{cursor:default;pointer-events:none}.mdc-text-field__icon svg{display:block}.mdc-text-field__icon--leading{margin-left:16px;margin-right:8px}[dir=rtl] .mdc-text-field__icon--leading,.mdc-text-field__icon--leading[dir=rtl]{margin-left:8px;margin-right:16px}.mdc-text-field__icon--trailing{padding:12px;margin-left:0px;margin-right:0px}[dir=rtl] .mdc-text-field__icon--trailing,.mdc-text-field__icon--trailing[dir=rtl]{margin-left:0px;margin-right:0px}.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}:host{display:inline-flex;flex-direction:column;outline:none}.mdc-text-field{width:100%}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42);border-bottom-color:var(--mdc-text-field-idle-line-color, rgba(0, 0, 0, 0.42))}.mdc-text-field:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87);border-bottom-color:var(--mdc-text-field-hover-line-color, rgba(0, 0, 0, 0.87))}.mdc-text-field.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.06);border-bottom-color:var(--mdc-text-field-disabled-line-color, rgba(0, 0, 0, 0.06))}.mdc-text-field.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field__input{direction:inherit}mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-idle-border-color, rgba(0, 0, 0, 0.38) )}:host(:not([disabled]):hover) :not(.mdc-text-field--invalid):not(.mdc-text-field--focused) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-hover-border-color, rgba(0, 0, 0, 0.87) )}:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--outlined){background-color:var(--mdc-text-field-fill-color, whitesmoke)}:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-error-color, var(--mdc-theme-error, #b00020) )}:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-character-counter,:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid .mdc-text-field__icon{color:var(--mdc-text-field-error-color, var(--mdc-theme-error, #b00020))}:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label,:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label::after{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused mwc-notched-outline{--mdc-notched-outline-stroke-width: 2px}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-focused-label-color, var(--mdc-theme-primary, rgba(98, 0, 238, 0.87)) )}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) .mdc-floating-label{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host(:not([disabled])) .mdc-text-field .mdc-text-field__input{color:var(--mdc-text-field-ink-color, rgba(0, 0, 0, 0.87))}:host(:not([disabled])) .mdc-text-field .mdc-text-field__input::placeholder{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg),:host(:not([disabled])) .mdc-text-field-helper-line:not(.mdc-text-field--invalid) .mdc-text-field-character-counter{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host([disabled]) .mdc-text-field:not(.mdc-text-field--outlined){background-color:var(--mdc-text-field-disabled-fill-color, #fafafa)}:host([disabled]) .mdc-text-field.mdc-text-field--outlined mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-disabled-border-color, rgba(0, 0, 0, 0.06) )}:host([disabled]) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label,:host([disabled]) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label::after{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-text-field .mdc-text-field__input,:host([disabled]) .mdc-text-field .mdc-text-field__input::placeholder{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-text-field-helper-line .mdc-text-field-helper-text,:host([disabled]) .mdc-text-field-helper-line .mdc-text-field-character-counter{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}`;let ro=class extends no{static get styles(){return lo}};ro=o([n("floor3d-textfield")],ro);let ao=class extends r{constructor(){super(...arguments),this._configArray=[],this._configObjectArray=[],this._configZoomArray=[],this._entityOptionsArray=[],this._entityOptionsGroupArray=[],this._entityOptionsZoomArray=[],this._initialized=!1}connectedCallback(){super.connectedCallback(),customElements.get("hui-action-editor")&&customElements.get("ha-icon-picker")&&customElements.get("ha-entity-picker")||customElements.get("hui-button-card")?.getConfigElement()}setConfig(e){console.log("Start editor config");const t=JSON.stringify(e),i=this._internal&&t===this._held;this._held=t,e=a(i?this._internal:e),this._config={...e},e.entities||(this._config.entities=[{entity:""}]),e.object_groups||(this._config.object_groups=[{object_group:""}]),e.zoom_areas||(this._config.zoom_areas=[{zoom:""}]),this._configArray=s(this._config),this._configObjectArray=c(this._config),this._configZoomArray=m(this._config);for(const e of this._configArray)e.light&&0===Object.entries(e.light).length&&delete e.light,e.hide&&0===Object.entries(e.hide).length&&delete e.hide,e.show&&0===Object.entries(e.show).length&&delete e.show,e.room&&0===Object.entries(e.room).length&&delete e.room,e.image&&0===Object.entries(e.image).length&&delete e.image;this._config.object_groups=this._configObjectArray,this._config.entities=this._configArray,this._config.zoom_areas=this._configZoomArray;this.hass.resources;const o={icon:"cube-unfolded",name:"Objects",secondary:"Objects.",show:!1,visible:!1},n={show:!1,options:{zoom:{icon:"magnify-plus",name:"Zoom Area",secondary:"Zoom Area options",show:!1,visible:!1}}},l={show:!1,options:{threed:{icon:"book-variant",name:"Type and Object",secondary:"Type and Object settings.",show:!1},light:{icon:"lightbulb-on-outline",name:"Light",secondary:"Light options",show:!1,visible:!1},room:{icon:"floor-plan",name:"Room",secondary:"Room options",show:!1,visible:!1},color:{icon:"format-color-fill",name:"Color",secondary:"Color condition.",show:!1,visible:!1},hide:{icon:"eye-off",name:"Hide",secondary:"Hide options.",show:!1,visible:!1},show:{icon:"eye",name:"Show",secondary:"Show options.",show:!1,visible:!1},text:{icon:"format-text",name:"Text",secondary:"Text options.",show:!1,visible:!1},door:{icon:"door",name:"Door",secondary:"Door options.",show:!1,visible:!1},cover:{icon:"window-shutter",name:"Cover",secondary:"Cover options.",show:!1,visible:!1},rotate:{icon:"fan",name:"Rotate",secondary:"Rotate options.",show:!1,visible:!1},gesture:{icon:"gesture-tap",name:"Gesture",secondary:"Gesture options.",show:!1,visible:!1},image:{icon:"image",name:"Image",secondary:"Image options.",show:!1,visible:!1}}};for(const e of this._configObjectArray)this._entityOptionsGroupArray.push({...o});for(const e of this._configArray)this._entityOptionsArray.push({...l});for(const e of this._configZoomArray)this._entityOptionsZoomArray.push({...n});this._options||(this._options={object_groups:{icon:"group",name:"Object Groups",secondary:"Manage card Object Groups.",show:!1,options:{object_groups:this._entityOptionsGroupArray}},zoom_areas:{icon:"magnify-expand",name:"Zoom Areas",secondary:"Manage card Zoom Areas.",show:!1,options:{zoom_areas:this._entityOptionsZoomArray}},entities:{icon:"tune",name:"Entities",secondary:"Manage card entities.",show:!1,options:{entities:this._entityOptionsArray}},model:{icon:"video-3d",name:"3D Model",secondary:"Reference your Waterfront 3D model",show:!1},appearance:{icon:"palette",name:"Appearance",secondary:"Customize the global appearance and behavior settings",show:!1},overlay:{icon:"checkbox-multiple-blank-outline",name:"Overlay",secondary:"Customize the overlay appearance and behavior settings",show:!1}}),this._config.objectlist&&!this._objects&&this._fetchObjectList(),console.log("End editor config")}get _show_warning(){return this._config?.show_warning||!1}get _show_error(){return this._config?.show_error||!1}_fetchObjectList(){let e=this._config.path;"/"!=e.substr(-1)&&(e+="/"),fetch(e+this._config.objectlist).then(function(e){if(!e.ok)throw Error(e.statusText);return e.json()}).then(this._onobjectloaded.bind(this))}_onobjectloaded(e){this._objects=Object.keys(e).sort(function(e,t){return e.toLowerCase().localeCompare(t.toLowerCase())})}shouldUpdate(){return console.log("Should Update start"),this._initialized||this._initialize(),!0}render(){const e=!!this._config.overlay&&"yes"==this._config.overlay;return p`
      <div class="sub-category" style="display: flex; flex-direction: row; align-items: center;">
        <ha-icon @click=${this._config_changed} icon="mdi:refresh" class="ha-icon-large"> </ha-icon>
        <span class="version">floor3d-card ${h}</span>
      </div>
      ${this._createModelElement()} ${this._createAppearanceElement()}
      ${e?p` ${this._createOverlayElement()} `:""} ${this._createEntitiesElement()}
      ${this._createObjectGroupsElement()} ${this._createZoomAreasElement()}
    `}_preview_card(){let e=this.parentNode||this.getRootNode().host;for(;e&&"hui-dialog-edit-card"!==e.localName;)e=e.parentNode||e.host;const t=e=>{for(const i of Array.from(e.children)){if("floor3d-card"===i.localName)return i;const e=t(i)||i.shadowRoot&&t(i.shadowRoot);if(e)return e}return null},i=e&&e.shadowRoot;return i?t(i):null}_config_changed(){console.log("Config change start");let e=this._preview_card();e&&e.rerender()}_createObjectGroupsValues(){if(!this.hass||!this._config)return[p``];const e=this._options.object_groups,t=[];for(const i of this._configObjectArray){const o=this._configObjectArray.indexOf(i);t.push(p`
        <div class="sub-category" style="display: flex; flex-direction: row; align-items: center;">
          <div style="display: flex; align-items: center; flex-direction: column;">
            <div
              style="font-size: 10px; margin-bottom: -8px; opacity: 0.5;"
              @click=${this._toggleThing}
              .options=${e.options.object_groups[o]}
              .optionsTarget=${e.options.object_groups}
              .index=${o}
            >
              options
            </div>
            <ha-icon
              icon="mdi:chevron-${e.options.object_groups[o].show?"up":"down"}"
              @click=${this._toggleThing}
              .options=${e.options.object_groups[o]}
              .optionsTarget=${e.options.object_groups}
              .index=${o}
            ></ha-icon>
          </div>
          <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
            <floor3d-textfield
              label="Object Group"
              @input=${this._valueChanged}
              .configAttribute=${"object_group"}
              .configObject=${this._configObjectArray[o]}
              .value=${i.object_group?i.object_group:""}
            >
            </floor3d-textfield>
          </div>
          ${0!==o?p`
                <ha-icon
                  class="ha-icon-large"
                  icon="mdi:arrow-up"
                  @click=${this._moveObject_Group}
                  .configDirection=${"up"}
                  .configArray=${this._config.object_groups}
                  .arrayAttribute=${"object_groups"}
                  .arraySource=${this._config}
                  .index=${o}
                ></ha-icon>
              `:p` <ha-icon icon="mdi:arrow-up" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
          ${o!==this._configObjectArray.length-1?p`
                <ha-icon
                  class="ha-icon-large"
                  icon="mdi:arrow-down"
                  @click=${this._moveObject_Group}
                  .configDirection=${"down"}
                  .configArray=${this._config.object_groups}
                  .arrayAttribute=${"object_groups"}
                  .arraySource=${this._config}
                  .index=${o}
                ></ha-icon>
              `:p` <ha-icon icon="mdi:arrow-down" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
          <ha-icon
            class="ha-icon-large"
            icon="mdi:close"
            @click=${this._removeObject_Group}
            .configAttribute=${"object_group"}
            .configArray=${"object_groups"}
            .configIndex=${o}
          ></ha-icon>
        </div>
        ${e.options.object_groups[o].show?p` <div class="options">${this._createObject_GroupElement(o)}</div> `:""}
      `)}return t}_createActionsElement(){const e=this._options.actions;return p`
      <div class="sub-category" style="opacity: 0.5;">
        <div>
          <div class="row">
            <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
            <div class="title">${e.name}</div>
          </div>
          <div class="secondary">${e.secondary}</div>
        </div>
      </div>
    `}_createZoomAreasValues(){if(!this.hass||!this._config)return[p``];const e=this._options.zoom_areas,t=[];for(const i of this._configZoomArray){const o=this._configZoomArray.indexOf(i);t.push(p`
        <div class="sub-category" style="display: flex; flex-direction: row; align-items: center;">
          <div style="display: flex; align-items: center; flex-direction: column;">
            <div
              style="font-size: 10px; margin-bottom: -8px; opacity: 0.5;"
              @click=${this._toggleThing}
              .options=${e.options.zoom_areas[o]}
              .optionsTarget=${e.options.zoom_areas}
              .index=${o}
            >
              options
            </div>
            <ha-icon
              icon="mdi:chevron-${e.options.zoom_areas[o].show?"up":"down"}"
              @click=${this._toggleThing}
              .options=${e.options.zoom_areas[o]}
              .optionsTarget=${e.options.zoom_areas}
              .index=${o}
            ></ha-icon>
          </div>
          <div class="values" style="flex-grow: 1;">
            <floor3d-textfield
              label="Zoom"
              @input=${this._valueChanged}
              .configAttribute=${"zoom"}
              .configObject=${this._configZoomArray[o]}
              .value=${i.zoom?i.zoom:""}
            >
            </floor3d-textfield>
          </div>
          ${0!==o?p`
                <ha-icon
                  class="ha-icon-large"
                  icon="mdi:arrow-up"
                  @click=${this._moveZoomArea}
                  .configDirection=${"up"}
                  .configArray=${this._config.zoom_areas}
                  .arrayAttribute=${"zoom_areas"}
                  .arraySource=${this._config}
                  .index=${o}
                ></ha-icon>
              `:p` <ha-icon icon="mdi:arrow-up" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
          ${o!==this._configZoomArray.length-1?p`
                <ha-icon
                  class="ha-icon-large"
                  icon="mdi:arrow-down"
                  @click=${this._moveZoomArea}
                  .configDirection=${"down"}
                  .configArray=${this._config.zoom_areas}
                  .arrayAttribute=${"zoom_areas"}
                  .arraySource=${this._config}
                  .index=${o}
                ></ha-icon>
              `:p` <ha-icon icon="mdi:arrow-down" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
          <ha-icon
            class="ha-icon-large"
            icon="mdi:close"
            @click=${this._removeZoomArea}
            .configAttribute=${"zoom"}
            .configArray=${"zoom_areas"}
            .configIndex=${o}
          ></ha-icon>
        </div>
        ${e.options.zoom_areas[o].show?p` <div class="options">${this._createZoomElement(o)}</div> `:""}
      `)}return t}_createEntitiesValues(){if(!this.hass||!this._config)return[p``];const e=this._options.entities;this._entity_ids||(this._entity_ids=Object.keys(this.hass.states).sort(function(e,t){return e.toLowerCase().localeCompare(t.toLowerCase())}));const t=[];for(const i of this._configArray){const o=this._configArray.indexOf(i);t.push(p`
        <div class="sub-category" style="display: flex; flex-direction: row; align-items: center;">
          <div style="display: flex; align-items: center; flex-direction: column;">
            <div
              style="font-size: 10px; margin-bottom: -8px; opacity: 0.5;"
              @click=${this._toggleThing}
              .options=${e.options.entities[o]}
              .optionsTarget=${e.options.entities}
              .index=${o}
            >
              options
            </div>
            <ha-icon
              icon="mdi:chevron-${e.options.entities[o].show?"up":"down"}"
              @click=${this._toggleThing}
              .options=${e.options.entities[o]}
              .optionsTarget=${e.options.entities}
              .index=${o}
            ></ha-icon>
          </div>
          <div class="values" style="flex-grow: 1;">
            ${this._entity_ids.length*this._configArray.length<5e3?p` <floor3d-select
                  label="Entity (Required)"
                  .value=${i.entity}
                  @selected=${this._valueChanged}
                  .configAttribute=${"entity"}
                  .configObject=${this._configArray[o]}
                  .ignoreNull=${!1}
                  @closed=${e=>e.stopPropagation()}
                  fixedMenuPosition
                  naturalMenuWidth
                  required
                  id="entity"
                >
                  ${this._entity_ids.map(e=>p` <mwc-list-item .value=${e}>${e}</mwc-list-item> `)}
                </floor3d-select>`:p`
                  <floor3d-textfield
                    label="Entity"
                    @input=${this._valueChanged}
                    .configAttribute=${"entity"}
                    .configObject=${this._configArray[o]}
                    .value=${i.entity?i.entity:""}
                  >
                  </floor3d-textfield>
                `}
          </div>
          ${0!==o?p`
                <ha-icon
                  class="ha-icon-large"
                  icon="mdi:arrow-up"
                  @click=${this._moveEntity}
                  .configDirection=${"up"}
                  .configArray=${this._config.entities}
                  .arrayAttribute=${"entities"}
                  .arraySource=${this._config}
                  .index=${o}
                ></ha-icon>
              `:p` <ha-icon icon="mdi:arrow-up" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
          ${o!==this._configArray.length-1?p`
                <ha-icon
                  class="ha-icon-large"
                  icon="mdi:arrow-down"
                  @click=${this._moveEntity}
                  .configDirection=${"down"}
                  .configArray=${this._config.entities}
                  .arrayAttribute=${"entities"}
                  .arraySource=${this._config}
                  .index=${o}
                ></ha-icon>
              `:p` <ha-icon icon="mdi:arrow-down" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
          <ha-icon
            class="ha-icon-large"
            icon="mdi:close"
            @click=${this._removeEntity}
            .configAttribute=${"entity"}
            .configArray=${"entities"}
            .configIndex=${o}
          ></ha-icon>
        </div>
        ${e.options.entities[o].show?p`
              <div class="options">
                ${this._createTypeElement(o)} ${this._createLightElement(o)} ${this._createRoomElement(o)}
                ${this._createColorConditionElement(o)} ${this._createHideElement(o)}
                ${this._createShowElement(o)} ${this._createTextElement(o)} ${this._createGestureElement(o)}
                ${this._createDoorElement(o)} ${this._createCoverElement(o)} ${this._createRotateElement(o)}
                ${this._createImageElement(o)} ${this._createTrackerElement(o)} ${this._createInfoElement(o)} ${this._createShowerElement(o)}
              </div>
            `:""}
      `)}return t}_createZoomAreasElement(){if(!this.hass||!this._config)return p``;const e=this._options.zoom_areas;return p`
      <div class="card-config">
        <div class="option" @click=${this._toggleThing} .options=${e} .optionsTarget=${this._options}>
          <div class="row">
            <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
            <div class="title">${e.name}</div>
            <ha-icon .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${e.secondary}</div>
        </div>
        ${e.show?p`
              <div class="card-background" style="max-height: 400px; overflow: auto;">
                ${this._createZoomAreasValues()}
                <div class="sub-category" style="display: flex; flex-direction: column; align-items: flex-end;">
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:plus"
                    .configArray=${this._configZoomArray}
                    .configAddValue=${"zoom"}
                    .sourceArray=${this._config.zoom_areas}
                    @click=${this._addZoomArea}
                  ></ha-icon>
                </div>
              </div>
            `:""}
      </div>
    `}_createObjectGroupsElement(){if(!this.hass||!this._config)return p``;const e=this._options.object_groups;return p`
      <div class="card-config">
        <div class="option" @click=${this._toggleThing} .options=${e} .optionsTarget=${this._options}>
          <div class="row">
            <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
            <div class="title">${e.name}</div>
            <ha-icon .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${e.secondary}</div>
        </div>
        ${e.show?p`
              <div class="card-background" style="max-height: 400px; overflow: auto;">
                ${this._createObjectGroupsValues()}
                <div class="sub-category" style="display: flex; flex-direction: column; align-items: flex-end;">
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:plus"
                    .configArray=${this._configObjectArray}
                    .configAddValue=${"object_group"}
                    .sourceArray=${this._config.object_groups}
                    @click=${this._addObject_Group}
                  ></ha-icon>
                </div>
              </div>
            `:""}
      </div>
    `}_createEntitiesElement(){if(!this.hass||!this._config)return p``;const e=this._options.entities;return p`
      <div class="card-config">
        <div class="option" @click=${this._toggleThing} .options=${e} .optionsTarget=${this._options}>
          <div class="row">
            <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
            <div class="title">${e.name}</div>
            <ha-icon .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${e.secondary}</div>
        </div>
        ${e.show?p`
              <div class="card-background" style="max-height: 400px; overflow: auto;">
                ${this._createEntitiesValues()}
                <div class="sub-category" style="display: flex; flex-direction: column; align-items: flex-end;">
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:plus"
                    .configArray=${this._configArray}
                    .configAddValue=${"entity"}
                    .sourceArray=${this._config.entities}
                    @click=${this._addEntity}
                  ></ha-icon>
                </div>
              </div>
            `:""}
      </div>
    `}_createModelElement(){if(!this.hass)return p``;const e=this._config,t=this._options.model;return p`
      <div class="category" id="card">
        <div class="sub-category" @click=${this._toggleThing} .options=${t} .optionsTarget=${this._options}>
          <div class="row">
            <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
            <div class="title">${t.name}</div>
            <ha-icon .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?p`
              <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                <floor3d-textfield
                  label="Name"
                  fullwidth
                  .value=${e.name?e.name:""}
                  .configObject=${e}
                  .configAttribute=${"name"}
                  @input=${this._valueChanged}
                >
                </floor3d-textfield>
                <floor3d-textfield
                  label="Path"
                  fullwidth
                  .value=${e.path?e.path:""}
                  .configObject=${e}
                  .configAttribute=${"path"}
                  @input=${this._valueChanged}
                ></floor3d-textfield>
                <floor3d-textfield
                  label="Obj/Glb file"
                  fullwidth
                  .value=${e.objfile?e.objfile:""}
                  .configObject=${e}
                  .configAttribute=${"objfile"}
                  @input=${this._valueChanged}
                ></floor3d-textfield>
                <floor3d-textfield
                  label="Mtl Wavefront file"
                  fullwidth
                  .value=${e.mtlfile?e.mtlfile:""}
                  .configObject=${e}
                  .configAttribute=${"mtlfile"}
                  @input=${this._valueChanged}
                ></floor3d-textfield>
                <floor3d-textfield
                  label="Object list JSON"
                  .value=${e.objectlist?e.objectlist:""}
                  .configObject=${e}
                  .configAttribute=${"objectlist"}
                  @input=${this._valueChanged}
                ></floor3d-textfield>
              </div>
            `:""}
      </div>
    `}_createOverlayElement(){if(!this.hass)return p``;const e=this._config,t=this._options.overlay;return p`
      <div class="category" id="card">
        <div class="sub-category" @click=${this._toggleThing} .options=${t} .optionsTarget=${this._options}>
          <div class="row">
            <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
            <div class="title">${t.name}</div>
            <ha-icon .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?p`
              <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                <floor3d-textfield
                  label="Overlay Background color"
                  fullwidth
                  size="20"
                  .value=${e.overlay_bgcolor?e.overlay_bgcolor:"transparent"}
                  .configObject=${e}
                  .configAttribute=${"overlay_bgcolor"}
                  @input=${this._valueChanged}
                ></floor3d-textfield>
                <floor3d-textfield
                  label="Overlay Foreground color"
                  fullwidth
                  size="20"
                  .value=${e.overlay_fgcolor?e.overlay_fgcolor:"black"}
                  .configObject=${e}
                  .configAttribute=${"overlay_fgcolor"}
                  @input=${this._valueChanged}
                ></floor3d-textfield>
                <ha-select
                  label="Overlay Alignment"
                  size="40"
                  @selected=${this._valueChanged}
                  .value=${e.overlay_alignment?e.overlay_alignment:"top-left"}
                  .configObject=${e}
                  .configAttribute=${"overlay_alignment"}
                  .ignoreNull=${!1}
                  @closed=${e=>e.stopPropagation()}
                >
                  <ha-list-item></ha-list-item>
                  <ha-list-item value="top-left">top-left</ha-list-item>
                  <ha-list-item value="top-right">top-right</ha-list-item>
                  <ha-list-item value="bottom-left">bottom-left</ha-list-item>
                  <ha-list-item value="bottom-right">bottom-right</ha-list-item>
                </ha-select>
                <floor3d-formfield alignEnd label="Overlay Width %">
                  <floor3d-textfield
                    type="number"
                    min="0"
                    max="100"
                    fullwidth
                    .ignoreNull=${!1}
                    .value=${e.overlay_width?e.overlay_width:"33"}
                    .configObject=${e}
                    .configAttribute=${"overlay_width"}
                    @input=${this._valueChanged}
                  ></floor3d-textfield>
                </floor3d-formfield>
                <floor3d-formfield alignEnd label="Overlay Height %">
                  <floor3d-textfield
                    type="number"
                    min="0"
                    max="100"
                    fullwidth
                    .ignoreNull=${!1}
                    .value=${e.overlay_height?e.overlay_height:"20"}
                    .configObject=${e}
                    .configAttribute=${"overlay_height"}
                    @input=${this._valueChanged}
                  ></floor3d-textfield>
                </floor3d-formfield>
                <floor3d-textfield
                  label="Overlay Font"
                  size="40"
                  .value="${e.overlay_font?e.overlay_font:""}"
                  .configObject=${e}
                  .configAttribute=${"overlay_font"}
                  @input=${this._valueChanged}
                ></floor3d-textfield>
                <floor3d-textfield
                  label="Overlay Font size"
                  .value="${e.overlay_fontsize?e.overlay_fontsize:""}"
                  .configObject=${e}
                  .configAttribute=${"overlay_fontsize"}
                  @input=${this._valueChanged}
                ></floor3d-textfield>
              </div>
            `:""}
      </div>
    `}_createAppearanceElement(){if(!this.hass)return p``;const e=this._config,t=this._options.appearance;return p`
      <div class="category" id="card">
        <div class="sub-category" @click=${this._toggleThing} .options=${t} .optionsTarget=${this._options}>
          <div class="row">
            <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
            <div class="title">${t.name}</div>
            <ha-icon .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?p`
             <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                <floor3d-textfield
                  label="Style"
                  .value=${e.style?e.style:""}
                  .configObject=${e}
                  .configAttribute=${"style"}
                  @input=${this._valueChanged}
                ></floor3d-textfield>
                <floor3d-select
                  label="Lock Camera (yes/<no>)"
                  @selected=${this._valueChanged}
                  .value=${e.lock_camera?e.lock_camera:"no"}
                  .configObject=${e}
                  .configAttribute=${"lock_camera"}
                  .ignoreNull=${!1}
                  @closed=${e=>e.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>
                <floor3d-select
                  label="Selection Mode (yes/<no>)"
                  @selected=${this._valueChanged}
                  .value=${e.selectionMode?e.selectionMode:"no"}
                  .configObject=${e}
                  .configAttribute=${"selectionMode"}
                  .ignoreNull=${!1}
                  @closed=${e=>e.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>
                <floor3d-select
                  label="Edit Mode PopUp (<yes>/no)"
                  @selected=${this._valueChanged}
                  .value=${e.editModeNotifications?e.editModeNotifications:"yes"}
                  .configObject=${e}
                  .configAttribute=${"editModeNotifications"}
                  .ignoreNull=${!1}
                  @closed=${e=>e.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>
                <floor3d-select
                  label="Header (<yes>/no)"
                  @selected=${this._valueChanged}
                  .value=${e.header?e.header:"yes"}
                  .configObject=${e}
                  .configAttribute=${"header"}
                  .ignoreNull=${!1}
                  @closed=${e=>e.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>
                <floor3d-select
                  label="Click (no dblclick, yes/<no>)"
                  @selected=${this._valueChanged}
                  .value=${e.click?e.click:"no"}
                  .configObject=${e}
                  .configAttribute=${"click"}
                  .ignoreNull=${!1}
                  @closed=${e=>e.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>
                <floor3d-select
                  label="Overlay (yes/<no>)"
                  @selected=${this._valueChanged}
                  .value=${e.overlay?e.overlay:"no"}
                  .configObject=${e}
                  .configAttribute=${"overlay"}
                  .ignoreNull=${!1}
                  @closed=${e=>e.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>

                <floor3d-select
                  label="Hide Levels Menu (yes/<no>)"
                  @selected=${this._valueChanged}
                  .value=${e.hideLevelsMenu?e.hideLevelsMenu:"no"}
                  .configObject=${e}
                  .configAttribute=${"hideLevelsMenu"}
                  .ignoreNull=${!1}
                  @closed=${e=>e.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>
                <floor3d-select
                  label="Hide Zoom Menu (yes/<no>)"
                  @selected=${this._valueChanged}
                  .value=${e.hideZoomMenu?e.hideZoomMenu:"no"}
                  .configObject=${e}
                  .configAttribute=${"hideZoomMenu"}
                  .ignoreNull=${!1}
                  @closed=${e=>e.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>
                ${this._textField("Light Following the Camera (<0.2>, or a sensor)",e,"globalLightPower",.2)}
                <floor3d-select
                  label="Shadow (yes/<no>)"
                  @selected=${this._valueChanged}
                  .value=${e.shadow?e.shadow:"no"}
                  .configObject=${e}
                  .configAttribute=${"shadow"}
                  .ignoreNull=${!1}
                  @closed=${e=>e.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>
                ${this._textField("Exposure (<1>)",e,"exposure",1,"number")}
                ${this._choiceField("Tone mapping (<neutral>)",e,"tone_mapping","neutral",["neutral","agx","aces","linear"])}
                ${this._textField("Lamp Power (<1>)",e,"light_power",1,"number")}
                ${this._textField("Sky Light (<0>, or a sensor)",e,"sky_power",0)}
                ${this._yesNoField("Sun from sun.sun (yes/<no>)",e,"sun","no")}
                ${this._textField("Sun Power (<1>, or a sensor)",e,"sun_power",1)}
                ${this._textField("Max Pixel Ratio (<2>)",e,"max_pixel_ratio",2,"number")}
                ${this._yesNoField("Log depth (yes/<no>)",e,"log_depth","no")}
                ${this._yesNoField("Highlight Open Doors/Windows (yes/<no>)",e,"state_colors","no")}
                ${this._textField("Alarm Entity (e.g. alarm_control_panel.home)",e,"alarm_entity","")}
                ${this._choiceField("Initial Room Map (<none>)",e,"room_colors","none",["none","temperature","presence","illuminance"])}
                <floor3d-select
                  label="+ Lights - Perf (yes/<no>)"
                  @selected=${this._valueChanged}
                  .value=${e.extralightmode?e.extralightmode:"no"}
                  .configObject=${e}
                  .configAttribute=${"extralightmode"}
                  .ignoreNull=${!1}
                  @closed=${e=>e.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>
                <floor3d-select
                  label="Show Axes (yes/<no>)"
                  @selected=${this._valueChanged}
                  .value=${e.show_axes?e.show_axes:"no"}
                  .configObject=${e}
                  .configAttribute=${"show_axes"}
                  .ignoreNull=${!1}
                  @closed=${e=>e.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>

                <paper-input
                  editable
                  label="North Direction {x: xxxx,z: zzzzzz }"
                  .value=${e.north?e.north:null}
                  .configObject=${e}
                  .configAttribute=${"north"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  editable
                  label="Camera Position"
                  .value=${e.camera_position?e.camera_position:null}
                  .configObject=${e}
                  .configAttribute=${"camera_position"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  editable
                  label="Camera Rotation"
                  .value=${e.camera_rotate?e.camera_rotate:null}
                  .configObject=${e}
                  .configAttribute=${"camera_rotate"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  editable
                  label="Camera Target"
                  .value=${e.camera_target?e.camera_target:null}
                  .configObject=${e}
                  .configAttribute=${"camera_target"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
              </div>
            `:""}
      </div>
    `}_toggleThing(e){const t=e.target.options,i=!t.show;if(e.target.optionsTarget)if(Array.isArray(e.target.optionsTarget))for(const t of e.target.optionsTarget)t.show=!1;else for(const[t]of Object.entries(e.target.optionsTarget))e.target.optionsTarget[t].show=!1;t.show=i,this._toggle=!this._toggle}_addObject_Group(e){if(!this._config||!this.hass)return;const t=e.target;let i;i=t.configAddObject?t.configAddObject:{[t.configAddValue]:""};const o=t.configArray.slice();o.push(i),this._config.object_groups=o,this._fireConfigChanged()}_addEntity(e){if(!this._config||!this.hass)return;const t=e.target;let i;i=t.configAddObject?t.configAddObject:{[t.configAddValue]:""};const o=t.configArray.slice();o.push(i),this._config.entities=o,this._fireConfigChanged()}_addZoomArea(e){if(!this._config||!this.hass)return;const t=e.target;let i;i=t.configAddObject?t.configAddObject:{[t.configAddValue]:""};const o=t.configArray.slice();o.push(i),this._config.zoom_areas=o,this._fireConfigChanged()}_moveEntity(e){if(!this._config||!this.hass)return;const t=e.target;let i=t.configArray.slice();"up"==t.configDirection?i=u(i,t.index,t.index-1):"down"==t.configDirection&&(i=u(i,t.index,t.index+1)),this._config.entities=i,this._fireConfigChanged()}_moveZoomArea(e){if(!this._config||!this.hass)return;const t=e.target;let i=t.configArray.slice();"up"==t.configDirection?i=u(i,t.index,t.index-1):"down"==t.configDirection&&(i=u(i,t.index,t.index+1)),this._config.zoom_areas=i,this._fireConfigChanged()}_moveObject_Group(e){if(!this._config||!this.hass)return;const t=e.target;let i=t.configArray.slice();"up"==t.configDirection?i=u(i,t.index,t.index-1):"down"==t.configDirection&&(i=u(i,t.index,t.index+1)),this._config.object_groups=i,this._fireConfigChanged()}_removeEntity(e){if(!this._config||!this.hass)return;const t=e.target,i=[];let o=0;for(const e of this._configArray)t.configIndex!==o&&i.push(e),o++;const n={[t.configArray]:i};this._config=Object.assign(this._config,n),this._fireConfigChanged()}_removeZoomArea(e){if(!this._config||!this.hass)return;const t=e.target,i=[];let o=0;for(const e of this._configZoomArray)t.configIndex!==o&&i.push(e),o++;const n={[t.configArray]:i};this._config=Object.assign(this._config,n),this._fireConfigChanged()}_removeObject_Group(e){if(!this._config||!this.hass)return;const t=e.target,i=[];let o=0;for(const e of this._configObjectArray)t.configIndex!==o&&i.push(e),o++;const n={[t.configArray]:i};this._config=Object.assign(this._config,n),this._fireConfigChanged()}_createTypeElement(e){const t=this._options.entities.options.entities[e].options.threed,i=this._configArray[e];return p`
      <div class="category" id="type">
        <div
          class="sub-category"
          @click=${this._toggleThing}
          .options=${t}
          .optionsTarget=${this._options.entities.options.entities[e].options}
        >
          <div class="row">
            <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
            <div class="title">${t.name}</div>
            <ha-icon .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?p`
              <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                <floor3d-textfield
                  label="Entity template"
                  fullwidth
                  .value=${i.entity_template?i.entity_template:""}
                  .configAttribute=${"entity_template"}
                  .configObject=${i}
                  @input=${this._valueChanged}
                ></floor3d-textfield>
                <floor3d-select
                  label="Action"
                  @selected=${this._valueChanged}
                  .value=${i.action?i.action:null}
                  .optionTgt=${this._options.entities.options.entities[e].options}
                  .configObject=${i}
                  .configAttribute=${"action"}
                  .ignoreNull=${!1}
                  @closed=${e=>e.stopPropagation()}
                >
                  <mwc-list-item></mwc-list-item>
                  <mwc-list-item value="more-info">more-info</mwc-list-item>
                  <mwc-list-item value="overlay">overlay</mwc-list-item>
                  <mwc-list-item value="default">default</mwc-list-item>
                </floor3d-select>
                <floor3d-select
                  label="3D Type"
                  @selected=${this._typeChanged}
                  .value=${i.type3d?i.type3d:null}
                  .optionTgt=${this._options.entities.options.entities[e].options}
                  .configObject=${i}
                  .configAttribute=${"type3d"}
                  .ignoreNull=${!1}
                  .configIndex=${e}
                  fixedMenuPosition
                  naturalMenuWidth
                  @closed=${e=>e.stopPropagation()}
                >
                  <mwc-list-item></mwc-list-item>
                  <mwc-list-item value="light">light</mwc-list-item>
                  <mwc-list-item value="color">color</mwc-list-item>
                  <mwc-list-item value="room">room</mwc-list-item>
                  <mwc-list-item value="hide">hide</mwc-list-item>
                  <mwc-list-item value="image">image</mwc-list-item>
                  <mwc-list-item value="show">show</mwc-list-item>
                  <mwc-list-item value="text">text</mwc-list-item>
                  <mwc-list-item value="door">door</mwc-list-item>
                  <mwc-list-item value="cover">cover</mwc-list-item>
                  <mwc-list-item value="rotate">rotate</mwc-list-item>
                  <mwc-list-item value="gesture">gesture</mwc-list-item>
                  <mwc-list-item value="camera">camera</mwc-list-item>
                  <mwc-list-item value="info">info</mwc-list-item>
                  <mwc-list-item value="shower">shower</mwc-list-item>
                </floor3d-select>
                ${this._objects?p`
                      <floor3d-select
                        label="Object id"
                        @selected=${this._valueChanged}
                        .value=${i.object_id}
                        .configAttribute=${"object_id"}
                        .configObject=${i}
                        .ignoreNull=${!1}
                        required
                        @closed=${e=>e.stopPropagation()}
                      >
                        ${this._objects.map(e=>p` <mwc-list-item value="${e}">${e}</mwc-list-item> `)}
                        ${this._configObjectArray.map(e=>p`
                            <mwc-list-item value="${"<"+e.object_group+">"}"
                              >${"<"+e.object_group+">"}</mwc-list-item
                            >
                          `)}
                      </floor3d-select>
                    `:p`
                      <floor3d-textfield
                        label="Object"
                        .value=${i.object_id?i.object_id:""}
                        .configAttribute=${"object_id"}
                        .configObject=${i}
                        @input=${this._valueChanged}
                        required
                      ></floor3d-textfield>
                    `}
              </div>
            `:""}
      </div>
    `}_createObject_GroupElement(e){const t=this._options.object_groups.options.object_groups[e],i=this._configObjectArray[e],o=i.objects?i.objects.length:0;return p`
      ${p`
            <div class="category" id="bar">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${t}
                .optionsTarget=${this._options.object_groups.options.object_groups}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
                  <div class="title">${t.name}</div>
                  <ha-icon
                    .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${t.secondary}</div>
              </div>
              ${t.show?p`
                    <div class="card-background" style="overflow: auto; max-height: 420px;">
                      ${o>0?p` ${this._createObjectValues(e)} `:""}
                      <div class="sub-category" style="display: flex; flex-direction: column; align-items: flex-end;">
                        <ha-icon
                          class="ha-icon-large"
                          icon="mdi:plus"
                          .index=${e}
                          @click=${this._addObject}
                        ></ha-icon>
                      </div>
                    </div>
                  `:""}
            </div>
          `}
    `}_createColorConditionElement(e){const t=this._options.entities.options.entities[e].options.color,i=this._configArray[e],o=!!i.type3d&&("color"===i.type3d||"room"===i.type3d),n=i.colorcondition?i.colorcondition.length:0;return p`
      ${o?p`
            <div class="category" id="bar">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${t}
                .optionsTarget=${this._options.entities.options.entities[e].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
                  <div class="title">${t.name}</div>
                  <ha-icon
                    .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${t.secondary}</div>
              </div>
              ${t.show?p`
                    <div class="card-background" style="overflow: auto; max-height: 420px;">
                      ${n>0?p` ${this._createColorConditionValues(e)} `:""}
                      <div class="sub-category" style="display: flex; flex-direction: column; align-items: flex-end;">
                        <ha-icon
                          class="ha-icon-large"
                          icon="mdi:plus"
                          .index=${e}
                          @click=${this._addColorCondition}
                        ></ha-icon>
                      </div>
                    </div>
                  `:""}
            </div>
          `:""}
    `}_createObjectValues(e){const t=this._configObjectArray[e],i=[];for(const o of t.objects){const n=t.objects.indexOf(o);i.push(p`
        <div class="sub-category" style="display: flex; flex-direction: row; align-items: center;">
          <div class="value">
            <div style="display:flex;">
              <floor3d-textfield
                label="Object Id"
                .value="${o.object_id?o.object_id:""}"
                .objectAttribute=${"object_id"}
                .index=${e}
                .objectIndex=${n}
                @input=${this._updateObject}
              ></floor3d-textfield>
            </div>
          </div>
          <div style="display: flex;">
            ${0!==n?p`
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:arrow-up"
                    @click=${this._moveObject}
                    .configDirection=${"up"}
                    .index=${e}
                    .objectIndex=${n}
                  ></ha-icon>
                `:p` <ha-icon icon="mdi:arrow-up" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
            ${n!==t.objects.length-1?p`
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:arrow-down"
                    @click=${this._moveObject}
                    .configDirection=${"down"}
                    .index=${e}
                    .objectIndex=${n}
                  ></ha-icon>
                `:p` <ha-icon icon="mdi:arrow-down" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
            <ha-icon
              class="ha-icon-large"
              icon="mdi:close"
              @click=${this._removeObject}
              .index=${e}
              .objectIndex=${n}
            ></ha-icon>
          </div>
        </div>
      `)}return i}_createColorConditionValues(e){const t=this._configArray[e],i=[];for(const o of t.colorcondition){const n=t.colorcondition.indexOf(o);i.push(p`
        <div class="sub-category" style="display: flex; flex-direction: row; align-items: center;">
          <div class="value">
            <div style="display:flex;">
              <floor3d-textfield
                label="Color"
                .value="${o.color?o.color:""}"
                .colorconditionAttribute=${"color"}
                .index=${e}
                .colorconditionIndex=${n}
                @input=${this._updateColorCondition}
              ></floor3d-textfield>
              <floor3d-textfield
                label="State"
                .value="${o.state?o.state:""}"
                .colorconditionAttribute=${"state"}
                .index=${e}
                .colorconditionIndex=${n}
                @input=${this._updateColorCondition}
              ></floor3d-textfield>
            </div>
          </div>
          <div style="display: flex;">
            ${0!==n?p`
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:arrow-up"
                    @click=${this._moveColorCondition}
                    .configDirection=${"up"}
                    .index=${e}
                    .colorconditionIndex=${n}
                  ></ha-icon>
                `:p` <ha-icon icon="mdi:arrow-up" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
            ${n!==t.colorcondition.length-1?p`
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:arrow-down"
                    @click=${this._moveColorCondition}
                    .configDirection=${"down"}
                    .index=${e}
                    .colorconditionIndex=${n}
                  ></ha-icon>
                `:p` <ha-icon icon="mdi:arrow-down" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
            <ha-icon
              class="ha-icon-large"
              icon="mdi:close"
              @click=${this._removeColorCondition}
              .index=${e}
              .colorconditionIndex=${n}
            ></ha-icon>
          </div>
        </div>
      `)}return i}_addObject(e){if(!this._config||!this.hass)return;const t=e.target;let i=this._config.object_groups[t.index].objects;i||(i=[]);const o=i.slice();o.push({object_id:""}),this._configObjectArray[t.index].objects=o,this._config.object_groups=this._configObjectArray,this._fireConfigChanged()}_addColorCondition(e){if(!this._config||!this.hass)return;const t=e.target;let i=this._config.entities[t.index].colorcondition;i||(i=[]);const o=i.slice();o.push({state:"",color:""}),this._configArray[t.index].colorcondition=o,this._config.entities=this._configArray,this._fireConfigChanged()}_moveObject(e){if(!this._config||!this.hass)return;const t=e.target;let i=this._config.object_groups[t.index].objects.slice();"up"==t.configDirection?i=u(i,t.objectIndex,t.objectIndex-1):"down"==t.configDirection&&(i=u(i,t.objectIndex,t.objectIndex+1)),this._configObjectArray[t.index].objects=i,this._config.object_groups=this._configObjectArray,this._fireConfigChanged()}_moveColorCondition(e){if(!this._config||!this.hass)return;const t=e.target;let i=this._config.entities[t.index].colorcondition.slice();"up"==t.configDirection?i=u(i,t.colorconditionIndex,t.colorconditionIndex-1):"down"==t.configDirection&&(i=u(i,t.colorconditionIndex,t.colorconditionIndex+1)),this._configArray[t.index].colorcondition=i,this._config.entities=this._configArray,this._fireConfigChanged()}_removeObject(e){if(!this._config||!this.hass)return;const t=e.target,i=this._configObjectArray[t.index].objects.slice(),o=[];let n=0;for(const e of i)t.objectIndex!==n&&o.push(i[n]),n++;0===o.length?delete this._configObjectArray[t.index].objects:this._configObjectArray[t.index].objects=o,this._config.object_groups=this._configObjectArray,this._fireConfigChanged()}_removeColorCondition(e){if(!this._config||!this.hass)return;const t=e.target,i=this._configArray[t.index].colorcondition.slice(),o=[];let n=0;for(const e of i)t.colorconditionIndex!==n&&o.push(i[n]),n++;0===o.length?delete this._configArray[t.index].colorcondition:this._configArray[t.index].colorcondition=o,this._config.entities=this._configArray,this._fireConfigChanged()}_updateObject(e){const t=e.target,i=this._configObjectArray[t.index].objects,o=[];for(const e in i)if(t.objectIndex==e){const n={...i[e]},l={[t.objectAttribute]:t.value},d=Object.assign(n,l);""==t.value&&delete d[t.objectAttribute],o.push(d)}else o.push(i[e]);this._configObjectArray[t.index].objects=o,this._config.object_groups=this._configObjectArray,this._fireConfigChanged()}_updateColorCondition(e){const t=e.target,i=this._configArray[t.index].colorcondition,o=[];for(const e in i)if(t.colorconditionIndex==e){const n={...i[e]},l={[t.colorconditionAttribute]:t.value},d=Object.assign(n,l);""==t.value&&delete d[t.colorconditionAttribute],o.push(d)}else o.push(i[e]);this._configArray[t.index].colorcondition=o,this._config.entities=this._configArray,this._fireConfigChanged()}_createImageElement(e){const t=this._options.entities.options.entities[e].options.image,i=this._configArray[e],o=!!i.type3d&&"image"===i.type3d;return o&&(i.image={...i.image}),p`
      ${o?p`
            <div class="category" id="image">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${t}
                .optionsTarget=${this._options.entities.options.entities[e].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
                  <div class="title">${t.name}</div>
                  <ha-icon .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
                </div>
                <div class="secondary">${t.secondary}</div>
              </div>
              ${t.show?p`
                    <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                      <floor3d-textfield
                        label="Image Attribute (Optional)"
                        .value=${i.image&&i.image.attribute?i.image.attribute:""}
                        .configAttribute=${"attribute"}
                        .configObject=${i.image}
                        @input=${this._valueChanged}
                      ></floor3d-textfield>
                      <floor3d-textfield
                        label="Rotation (Degrees)"
                        .value=${i.image&&i.image.rotate?i.image.rotate:""}
                        .configAttribute=${"rotate"}
                        .configObject=${i.image}
                        @input=${this._valueChanged}
                        type="number"
                      ></floor3d-textfield>
                      <floor3d-textfield
                        label="Lumens (Emission)"
                        .value=${i.image&&i.image.lumens?i.image.lumens:""}
                        .configAttribute=${"lumens"}
                        .configObject=${i.image}
                        @input=${this._valueChanged}
                        type="number"
                      ></floor3d-textfield>
                      <ha-formfield .label=${"Mirror"}>
                        <ha-switch
                          .checked=${!(!i.image||!i.image.mirror)&&i.image.mirror}
                          .configAttribute=${"mirror"}
                          .configObject=${i.image}
                          @change=${this._valueChanged}
                        ></ha-switch>
                      </ha-formfield>
                      <floor3d-textfield
                        label="Lighting Lumens (Room Light)"
                        .value=${i.image&&i.image.lighting_lumens?i.image.lighting_lumens:""}
                        .configAttribute=${"lighting_lumens"}
                        .configObject=${i.image}
                        @input=${this._valueChanged}
                        type="number"
                      ></floor3d-textfield>
                      <ha-formfield label="Light Direction">
                        <ha-select
                          .label=${"Light Direction"}
                          .configValue=${"lighting_direction"}
                          .value=${i.image&&i.image.lighting_direction?i.image.lighting_direction:"positive_z"}
                          .configAttribute=${"lighting_direction"}
                          .configObject=${i.image}
                          @selected=${this._valueChanged}
                          @closed=${e=>e.stopPropagation()}
                        >
                          <mwc-list-item value="positive_z">Front (+Z)</mwc-list-item>
                          <mwc-list-item value="negative_z">Back (-Z)</mwc-list-item>
                          <mwc-list-item value="positive_x">Right (+X)</mwc-list-item>
                          <mwc-list-item value="negative_x">Left (-X)</mwc-list-item>
                          <mwc-list-item value="positive_y">Top (+Y)</mwc-list-item>
                          <mwc-list-item value="negative_y">Bottom (-Y)</mwc-list-item>
                        </ha-select>
                      </ha-formfield>
                      <ha-formfield label="Light Off State">
                        <ha-select
                          .label=${"Light Off State"}
                          .configValue=${"lighting_off_state"}
                          .value=${i.image&&i.image.lighting_off_state?i.image.lighting_off_state:"unavailable"}
                          .configAttribute=${"lighting_off_state"}
                          .configObject=${i.image}
                          @selected=${this._valueChanged}
                          @closed=${e=>e.stopPropagation()}
                        >
                          <mwc-list-item value="unavailable">Unavailable</mwc-list-item>
                          <mwc-list-item value="off">Off</mwc-list-item>
                          <mwc-list-item value="idle">Idle</mwc-list-item>
                          <mwc-list-item value="paused">Paused</mwc-list-item>
                          <mwc-list-item value="standby">Standby</mwc-list-item>
                        </ha-select>
                      </ha-formfield>
                    </div>
                  `:""}
            </div>
          `:""}
    `}_createLightElement(e){const t=this._options.entities.options.entities[e].options.light,i=this._configArray[e],o=!!i.type3d&&"light"===i.type3d;return o&&(i.light={...i.light}),p`
      ${o?p`
            <div class="category" id="light">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${t}
                .optionsTarget=${this._options.entities.options.entities[e].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
                  <div class="title">${t.name}</div>
                  <ha-icon
                    .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${t.secondary}</div>
              </div>
              ${t.show?p`
                    <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                      ${null!==e?p`
                            <floor3d-formfield alignEnd label="Lumens (0-5000) <800>">
                              <floor3d-textfield
                                type="number"
                                min="0"
                                max="5000"
                                step="50"
                                .value=${i.light.lumens?i.light.lumens:null}
                                .configObject=${i.light}
                                .configAttribute=${"lumens"}
                                .ignoreNull=${!1}
                                @input=${this._valueChanged}
                              ></floor3d-textfield>
                            </floor3d-formfield>
                            <floor3d-textfield
                              label="Color"
                              .value=${i.light.color?i.light.color:""}
                              .configObject=${i.light}
                              .configAttribute=${"color"}
                              @input=${this._valueChanged}
                            ></floor3d-textfield>
                            <floor3d-formfield alignEnd label="Decay (0-inifinity, <2>)">
                              <floor3d-textfield
                                type="number"
                                min="0"
                                .value=${i.light.decay?i.light.decay:null}
                                .configObject=${i.light}
                                .configAttribute=${"decay"}
                                .ignoreNull=${!1}
                                @input=${this._valueChanged}
                              ></floor3d-textfield>
                            </floor3d-formfield>
                            <floor3d-formfield alignEnd label="Distance (cm: 0=inifinity, <600>)">
                              <floor3d-textfield
                                type="number"
                                min="0"
                                .value=${i.light.distance?i.light.distance:null}
                                .configObject=${i.light}
                                .configAttribute=${"distance"}
                                .ignoreNull=${!1}
                                @input=${this._valueChanged}
                              ></floor3d-textfield>
                            </floor3d-formfield>
                            <floor3d-select
                              label="Shadow (yes/<no>)"
                              @selected=${this._valueChanged}
                              .value=${i.light.shadow?i.light.shadow:null}
                              .configObject=${i.light}
                              .configAttribute=${"shadow"}
                              .ignoreNull=${!1}
                              @closed=${e=>e.stopPropagation()}
                            >
                              <mwc-list-item></mwc-list-item>
                              <mwc-list-item value="yes">yes</mwc-list-item>
                              <mwc-list-item value="no">no</mwc-list-item>
                            </floor3d-select>
                            <paper-input
                              editable
                              label="Light Direction (spot)"
                              .value=${i.light.light_direction?i.light.light_direction:""}
                              .configObject=${i.light}
                              .configAttribute=${"light_direction"}
                              @value-changed=${this._valueChanged}
                            ></paper-input>
                            <floor3d-textfield
                              label="Light Target Object (spot)"
                              .value=${i.light.light_target?i.light.light_target:""}
                              .configObject=${i.light}
                              .configAttribute=${"light_target"}
                              @input=${this._valueChanged}
                            ></floor3d-textfield>
                            <floor3d-formfield alignEnd label="Angle degrees (spot)">
                              <floor3d-textfield
                                type="number"
                                min="0"
                                max="180"
                                .value=${i.light.angle?i.light.angle:null}
                                .configObject=${i.light}
                                .configAttribute=${"angle"}
                                .ignoreNull=${!1}
                                @input=${this._valueChanged}
                              ></floor3d-textfield>
                            </floor3d-formfield>
                            <floor3d-select
                              label="Light Vertical Alignment"
                              @selected=${this._valueChanged}
                              .value=${i.light.vertical_alignment?i.light.vertical_alignment:null}
                              .configObject=${i.light}
                              .configAttribute=${"vertical_alignment"}
                              .ignoreNull=${!1}
                              @closed=${e=>e.stopPropagation()}
                            >
                              <mwc-list-item></mwc-list-item>
                              <mwc-list-item value="bottom">bottom</mwc-list-item>
                              <mwc-list-item value="middle">middle</mwc-list-item>
                              <mwc-list-item value="top">top</mwc-list-item>
                            </floor3d-select>
                            <floor3d-select
                              label="One light for all the objects (yes/<no>)"
                              @selected=${this._valueChanged}
                              .value=${i.light.single?i.light.single:null}
                              .configObject=${i.light}
                              .configAttribute=${"single"}
                              .ignoreNull=${!1}
                              @closed=${e=>e.stopPropagation()}
                            >
                              <mwc-list-item></mwc-list-item>
                              <mwc-list-item value="yes">yes</mwc-list-item>
                              <mwc-list-item value="no">no</mwc-list-item>
                            </floor3d-select>
                            <floor3d-textfield
                              label="Light on the object (one light; empty: in the middle)"
                              .value=${i.light.light_object?i.light.light_object:""}
                              .configObject=${i.light}
                              .configAttribute=${"light_object"}
                              @input=${this._valueChanged}
                            ></floor3d-textfield>
                          `:""}
                    </div>
                  `:""}
            </div>
          `:""}
    `}_createRoomElement(e){const t=this._options.entities.options.entities[e].options.room,i=this._configArray[e],o=!!i.type3d&&"room"===i.type3d;return o&&(i.room={...i.room}),p`
      ${o?p`
            <div class="category" id="light">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${t}
                .optionsTarget=${this._options.entities.options.entities[e].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
                  <div class="title">${t.name}</div>
                  <ha-icon
                    .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${t.secondary}</div>
              </div>
              ${t.show?p`
                    <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                      ${null!==e?p` <floor3d-formfield alignEnd label="Transparency %">
                              <floor3d-textfield
                                type="number"
                                min="0"
                                max="100"
                                .value=${i.room.transparency?i.room.transparency:null}
                                .configObject=${i.room}
                                .configAttribute=${"transparency"}
                                .ignoreNull=${!1}
                                @input=${this._valueChanged}
                              ></floor3d-textfield>
                            </floor3d-formfield>
                            <floor3d-textfield
                              label="Color"
                              .value=${i.room.color?i.room.color:""}
                              .configObject=${i.room}
                              .configAttribute=${"color"}
                              @input=${this._valueChanged}
                            ></floor3d-textfield>
                            <floor3d-formfield alignEnd label="Elevation (cm)">
                              <floor3d-textfield
                                type="number"
                                min="0"
                                .value=${i.room.elevation?i.room.elevation:""}
                                .configObject=${i.room}
                                .configAttribute=${"elevation"}
                                .ignoreNull=${!1}
                                @input=${this._valueChanged}
                              ></floor3d-textfield>
                            </floor3d-formfield>
                            <floor3d-textfield
                              label="Label"
                              fullwidth
                              .value=${i.room.label?i.room.label:""}
                              .configObject=${i.room}
                              .configAttribute=${"label"}
                              @input=${this._valueChanged}
                            ></floor3d-textfield>
                            <floor3d-select
                              label="Label text (state or template)"
                              @selected=${this._valueChanged}
                              .value=${i.room.label_text?i.room.label_text:null}
                              .configObject=${i.room}
                              .configAttribute=${"label_text"}
                              .ignoreNull=${!1}
                              @closed=${e=>e.stopPropagation()}
                            >
                              <mwc-list-item></mwc-list-item>
                              <mwc-list-item value="state">state</mwc-list-item>
                              <mwc-list-item value="template">template</mwc-list-item>
                            </floor3d-select>
                            <floor3d-formfield alignEnd label="Label Width (scaled cm)">
                              <floor3d-textfield
                                type="number"
                                min="0"
                                .value=${i.room.width?i.room.width:null}
                                .configObject=${i.room}
                                .configAttribute=${"width"}
                                .ignoreNull=${!1}
                                @input=${this._valueChanged}
                              ></floor3d-textfield>
                            </floor3d-formfield>
                            <floor3d-formfield alignEnd label="Label Height (scaled cm)">
                              <floor3d-textfield
                                type="number"
                                min="0"
                                .value=${i.room.height?i.room.height:null}
                                .configObject=${i.room}
                                .configAttribute=${"height"}
                                .ignoreNull=${!1}
                                @input=${this._valueChanged}
                              ></floor3d-textfield>
                            </floor3d-formfield>
                            ${this._createTextSubElement(i.room)}`:""}
                    </div>
                  `:""}
            </div>
          `:""}
    `}_createZoomElement(e){const t=this._options.zoom_areas.options.zoom_areas[e].options.zoom,i=this._configZoomArray[e];return p`
      <div class="category" id="light">
        <div
          class="sub-category"
          @click=${this._toggleThing}
          .options=${t}
          .optionsTarget=${this._options.zoom_areas.options.zoom_areas[e].options}
        >
          <div class="row">
            <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
            <div class="title">${t.name}</div>
            <ha-icon .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?p`
              <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                ${null!==e?p`
                      ${this._objects?p`
                            <floor3d-select
                              label="Object id"
                              @selected=${this._valueChanged}
                              .value=${i.object_id}
                              .configAttribute=${"object_id"}
                              .configObject=${i}
                              .ignoreNull=${!1}
                              required
                              @closed=${e=>e.stopPropagation()}
                            >
                              ${this._objects.map(e=>p` <mwc-list-item value="${e}">${e}</mwc-list-item> `)}
                              ${this._configObjectArray.map(e=>p`
                                  <mwc-list-item value="${"<"+e.object_group+">"}"
                                    >${"<"+e.object_group+">"}</mwc-list-item
                                  >
                                `)}
                            </floor3d-select>
                          `:p`
                            <floor3d-textfield
                              label="Object"
                              .value=${i.object_id?i.object_id:""}
                              .configAttribute=${"object_id"}
                              .configObject=${i}
                              @input=${this._valueChanged}
                              required
                            ></floor3d-textfield>
                          `}
                      <paper-input
                        editable
                        label="Zoom Direction {x: xxxx,y: yyyy, z: zzzz }"
                        .value=${i.direction?i.direction:null}
                        .configObject=${i}
                        .configAttribute=${"direction"}
                        @value-changed=${this._valueChanged}
                      ></paper-input>
                      <paper-input
                        editable
                        label="Zoom Rotation {x: xxxx,y: yyyy, z: zzzz }"
                        .value=${i.rotation?i.rotation:null}
                        .configObject=${i}
                        .configAttribute=${"rotation"}
                        @value-changed=${this._valueChanged}
                      ></paper-input>
                      <floor3d-formfield alignEnd label="Distance (cm)">
                        <floor3d-textfield
                          type="number"
                          min="0"
                          .value=${i.distance?i.distance:null}
                          .configObject=${i}
                          .configAttribute=${"distance"}
                          .ignoreNull=${!1}
                          @input=${this._valueChanged}
                        ></floor3d-textfield>
                      </floor3d-formfield>
                    `:""}
              </div>
            `:""}
      </div>
    `}_createTextSubElement(e){return p`
      <floor3d-textfield
        label="Attribute"
        fullwidth
        .value=${e.attribute?e.room.attribute:""}
        .configObject=${e}
        .configAttribute=${"attribute"}
        @input=${this._valueChanged}
      ></floor3d-textfield>
      <floor3d-textfield
        label="font"
        fullwidth
        .value=${e.font?e.font:""}
        .configObject=${e}
        .configAttribute=${"font"}
        @input=${this._valueChanged}
      ></floor3d-textfield>
      <floor3d-formfield alignEnd label="Span percentage">
        <floor3d-textfield
          label="Span percentage"
          type="number"
          min="0"
          max="100"
          .value=${e.span?e.span:null}
          .configObject=${e}
          .configAttribute=${"span"}
          .ignoreNull=${!1}
          @input=${this._valueChanged}
        ></floor3d-textfield>
      </floor3d-formfield>
      <floor3d-textfield
        label="Text Background Color"
        .value=${e.textbgcolor?e.textbgcolor:""}
        .configObject=${e}
        .configAttribute=${"textbgcolor"}
        @input=${this._valueChanged}
      ></floor3d-textfield>
      <floor3d-textfield
        label="Text Foreground Color"
        .value=${e.textfgcolor?e.textfgcolor:""}
        .configObject=${e}
        .configAttribute=${"textfgcolor"}
        @input=${this._valueChanged}
      ></floor3d-textfield>
    `}_createTextElement(e){const t=this._options.entities.options.entities[e].options.text,i=this._configArray[e],o=!!i.type3d&&"text"===i.type3d;return o&&(i.text={...i.text}),p`
      ${o?p`
            <div class="category" id="text">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${t}
                .optionsTarget=${this._options.entities.options.entities[e].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
                  <div class="title">${t.name}</div>
                  <ha-icon
                    .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${t.secondary}</div>
              </div>
              ${t.show?p`
                    <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                      ${null!==e?p` ${this._createTextSubElement(i.text)} `:""}
                    </div>
                  `:""}
            </div>
          `:""}
    `}_createDoorElement(e){const t=this._options.entities.options.entities[e].options.door,i=this._configArray[e],o=!!i.type3d&&"door"===i.type3d;return o&&(i.door={...i.door}),p`
      ${o?p`
            <div class="category" id="door">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${t}
                .optionsTarget=${this._options.entities.options.entities[e].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
                  <div class="title">${t.name}</div>
                  <ha-icon
                    .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${t.secondary}</div>
              </div>
              ${t.show?p`
                    <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                      ${null!==e?p`
                            <floor3d-select
                              label="Door Type"
                              @selected=${this._valueChanged}
                              .value=${i.door.doortype?i.door.doortype:null}
                              .configObject=${i.door}
                              .configAttribute=${"doortype"}
                              .ignoreNull=${!1}
                              @closed=${e=>e.stopPropagation()}
                            >
                              <mwc-list-item></mwc-list-item>
                              <mwc-list-item value="swing">swing</mwc-list-item>
                              <mwc-list-item value="slide">slide</mwc-list-item>
                            </floor3d-select>
                            <floor3d-select
                              label="Side"
                              @selected=${this._valueChanged}
                              .value=${i.door.side?i.door.side:null}
                              .configObject=${i.door}
                              .configAttribute=${"side"}
                              .ignoreNull=${!1}
                              @closed=${e=>e.stopPropagation()}
                            >
                              <mwc-list-item></mwc-list-item>
                              <mwc-list-item value="up">up</mwc-list-item>
                              <mwc-list-item value="down">down</mwc-list-item>
                              <mwc-list-item value="left">left</mwc-list-item>
                              <mwc-list-item value="right">right</mwc-list-item>
                            </floor3d-select>
                            <floor3d-select
                              label="Direction"
                              @selected=${this._valueChanged}
                              .value=${i.door.direction?i.door.direction:null}
                              .configObject=${i.door}
                              .configAttribute=${"direction"}
                              .ignoreNull=${!1}
                              @closed=${e=>e.stopPropagation()}
                            >
                              <mwc-list-item></mwc-list-item>
                              <mwc-list-item value="inner">inner</mwc-list-item>
                              <mwc-list-item value="outer">outer</mwc-list-item>
                            </floor3d-select>
                            <floor3d-formfield alignEnd label="Degrees (for Swing)">
                              <floor3d-textfield
                                type="number"
                                min="0"
                                max="180"
                                .value=${i.door.degrees?i.door.degrees:null}
                                .configObject=${i.door}
                                .configAttribute=${"degrees"}
                                .ignoreNull=${!1}
                                @input=${this._valueChanged}
                              ></floor3d-textfield>
                            </floor3d-formfield>
                            <floor3d-formfield alignEnd label="Percentage open (for slide)">
                              <floor3d-textfield
                                type="number"
                                min="0"
                                max="100"
                                label="Percentage open (for slide)"
                                .value=${i.door.percentage?i.door.percentage:null}
                                .configObject=${i.door}
                                .configAttribute=${"percentage"}
                                .ignoreNull=${!1}
                                @input=${this._valueChanged}
                              ></floor3d-textfield>
                            </floor3d-formfield>
                            <floor3d-textfield
                              label="Pane object"
                              .value=${i.door.pane?i.door.pane:""}
                              .configObject=${i.door}
                              .configAttribute=${"pane"}
                              @input=${this._valueChanged}
                            ></floor3d-textfield>
                            <floor3d-textfield
                              label="Hinge object"
                              .value=${i.door.hinge?i.door.hinge:""}
                              .configObject=${i.door}
                              .configAttribute=${"hinge"}
                              @input=${this._valueChanged}
                            ></floor3d-textfield>
                          `:""}
                    </div>
                  `:""}
            </div>
          `:""}
    `}_createCoverElement(e){const t=this._options.entities.options.entities[e].options.cover,i=this._configArray[e],o=!!i.type3d&&"cover"===i.type3d;return o&&(i.cover={...i.cover}),p`
      ${o?p`
            <div class="category" id="cover">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${t}
                .optionsTarget=${this._options.entities.options.entities[e].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
                  <div class="title">${t.name}</div>
                  <ha-icon
                    .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${t.secondary}</div>
              </div>
              ${t.show?p`
                    <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                      ${null!==e?p`
                            <floor3d-textfield
                              label="Pane object"
                              .value=${i.cover.pane?i.cover.pane:""}
                              .configObject=${i.cover}
                              .configAttribute=${"pane"}
                              @input=${this._valueChanged}
                            ></floor3d-textfield>
                          `:""}
                    </div>
                  `:""}
            </div>
          `:""}
    `}_yesNoField(e,t,i,o){const n=t[i];return this._choiceField(e,t,i,o,["yes","no"],!0===n?"yes":!1===n?"no":void 0)}_choiceField(e,t,i,o,n,l){return p`
      <floor3d-select
        label=${e}
        @selected=${this._valueChanged}
        .value=${void 0!==l?l:t[i]?t[i]:o}
        .configObject=${t}
        .configAttribute=${i}
        .ignoreNull=${!1}
        @closed=${e=>e.stopPropagation()}
        style="flex: 1;"
      >
        <mwc-list-item></mwc-list-item>
        ${n.map(e=>p`<mwc-list-item value=${e}>${e}</mwc-list-item>`)}
      </floor3d-select>
    `}_textField(e,t,i,o,n="text"){return p`
      <floor3d-textfield
        label=${e}
        type=${n}
        step="any"
        .value=${void 0!==t[i]?t[i]:o}
        .configObject=${t}
        .configAttribute=${i}
        @input=${this._valueChanged}
      ></floor3d-textfield>
    `}_createTrackerElement(e){if("tracker"==this._configArray[e].type3d){this._configArray[e].tracker||(this._configArray[e].tracker={});const t=this._configArray[e].tracker;return p`
        <div class="card-options">
          <floor3d-textfield
            label="Y Sensor Entity (e.g. sensor.y)"
            .value=${t.sensor_y?t.sensor_y:""}
            .configAttribute=${"sensor_y"}
            .configObject=${t}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Sensor Position [X, Y, Z]"
            .value=${t.sensor_position?JSON.stringify(t.sensor_position):"[0, 0, 0]"}
            .configAttribute=${"sensor_position"}
            .configObject=${t}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <div style="display: flex; gap: 8px;">
            <floor3d-textfield
              label="Rotation (Degrees)"
              type="number"
              .value=${void 0!==t.sensor_rotation?t.sensor_rotation:0}
              .configAttribute=${"sensor_rotation"}
              .configObject=${t}
              @input=${this._valueChanged}
              style="flex: 1;"
            ></floor3d-textfield>
            <floor3d-textfield
              label="Scale"
              type="number"
              step="0.001"
              .value=${void 0!==t.scale?t.scale:.001}
              .configAttribute=${"scale"}
              .configObject=${t}
              @input=${this._valueChanged}
              style="flex: 1;"
            ></floor3d-textfield>
          </div>
          <div style="display: flex; gap: 8px;">
            <floor3d-textfield
              label="Height (cm)"
              type="number"
              .value=${void 0!==t.height?t.height:150}
              .configAttribute=${"height"}
              .configObject=${t}
              @input=${this._valueChanged}
              style="flex: 1;"
            ></floor3d-textfield>
            <floor3d-textfield
              label="Size"
              type="number"
              .value=${void 0!==t.size?t.size:.15}
              .configAttribute=${"size"}
              .configObject=${t}
              @input=${this._valueChanged}
              style="flex: 1;"
            ></floor3d-textfield>
          </div>
          <floor3d-textfield
            label="Color (Hex)"
            .value=${t.color?t.color:"#FF5500"}
            .configAttribute=${"color"}
            .configObject=${t}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <div style="display: flex; gap: 8px;">
            ${this._choiceField("Coordinate Unit (<mm>)",t,"unit","mm",["mm","cm","m"])}
            ${this._yesNoField("Mirror X (yes/<no>)",t,"flip_x","no")}
          </div>
          ${this._textField("Zone Entity (Optional)",t,"zone","")}
        </div>
      `}return p``}_createGestureElement(e){const t=this._options.entities.options.entities[e].options.gesture,i=this._configArray[e],o=!!i.type3d&&"gesture"===i.type3d;return o&&(i.gesture={...i.gesture}),p`
      ${o?p`
            <div class="category" id="text">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${t}
                .optionsTarget=${this._options.entities.options.entities[e].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
                  <div class="title">${t.name}</div>
                  <ha-icon
                    .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${t.secondary}</div>
              </div>
              ${t.show?p`
                    <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                      ${null!==e?p`
                            <floor3d-textfield
                              label="domain"
                              fullwidth
                              .value=${i.gesture.domain?i.gesture.domain:""}
                              .configObject=${i.gesture}
                              .configAttribute=${"domain"}
                              @input=${this._valueChanged}
                            ></floor3d-textfield>
                            <floor3d-textfield
                              label="service"
                              fullwidth
                              .value=${i.gesture.service?i.gesture.service:""}
                              .configObject=${i.gesture}
                              .configAttribute=${"service"}
                              @input=${this._valueChanged}
                            ></floor3d-textfield>
                          `:""}
                    </div>
                  `:""}
            </div>
          `:""}
    `}_createRotateElement(e){const t=this._options.entities.options.entities[e].options.rotate,i=this._configArray[e],o=!!i.type3d&&"rotate"===i.type3d;return o&&(i.rotate={...i.rotate}),p`
      ${o?p`
            <div class="category" id="text">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${t}
                .optionsTarget=${this._options.entities.options.entities[e].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
                  <div class="title">${t.name}</div>
                  <ha-icon
                    .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${t.secondary}</div>
              </div>
              ${t.show?p`
                    <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                      ${null!==e?p`
                            <floor3d-select
                              label="Axis"
                              @selected=${this._valueChanged}
                              .value=${i.rotate.axis?i.rotate.axis:null}
                              .configObject=${i.rotate}
                              .configAttribute=${"axis"}
                              .ignoreNull=${!1}
                              @closed=${e=>e.stopPropagation()}
                            >
                              <mwc-list-item></mwc-list-item>
                              <mwc-list-item value="x">x</mwc-list-item>
                              <mwc-list-item value="y">y</mwc-list-item>
                              <mwc-list-item value="z">z</mwc-list-item>
                            </floor3d-select>
                            <floor3d-textfield
                              label="Hinge-pivot object "
                              .value=${i.rotate.hinge?i.rotate.hinge:""}
                              .configObject=${i.rotate}
                              .configAttribute=${"hinge"}
                              @input=${this._valueChanged}
                            ></floor3d-textfield>
                            <floor3d-textfield
                              label="Round per seconds (2 or less recommended)"
                              .value=${i.rotate.round_per_second?i.rotate.round_per_second:""}
                              .configObject=${i.rotate}
                              .configAttribute=${"round_per_second"}
                              @input=${this._valueChanged}
                            ></floor3d-textfield>
                          `:""}
                    </div>
                  `:""}
            </div>
          `:""}
    `}_createHideElement(e){const t=this._options.entities.options.entities[e].options.hide,i=this._configArray[e],o=!!i.type3d&&"hide"===i.type3d;return o&&(i.hide={...i.hide}),p`
      ${o?p`
            <div class="category" id="hide">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${t}
                .optionsTarget=${this._options.entities.options.entities[e].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
                  <div class="title">${t.name}</div>
                  <ha-icon
                    .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${t.secondary}</div>
              </div>
              ${t.show?p`
                    <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                      ${null!==e?p`
                            <floor3d-textfield
                              label="state"
                              .value=${i.hide.state?i.hide.state:""}
                              .configAttribute=${"state"}
                              .configObject=${i.hide}
                              @input=${this._valueChanged}
                            ></floor3d-textfield>
                          `:""}
                    </div>
                  `:""}
            </div>
          `:""}
    `}_createShowElement(e){const t=this._options.entities.options.entities[e].options.show,i=this._configArray[e],o=!!i.type3d&&"show"===i.type3d;return o&&(i.show={...i.show}),p`
      ${o?p`
            <div class="category" id="show">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${t}
                .optionsTarget=${this._options.entities.options.entities[e].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
                  <div class="title">${t.name}</div>
                  <ha-icon
                    .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${t.secondary}</div>
              </div>
              ${t.show?p`
                    <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                      ${null!==e?p`
                            <floor3d-textfield
                              label="state"
                              .value=${i.show.state?i.show.state:""}
                              .configAttribute=${"state"}
                              .configObject=${i.show}
                              @input=${this._valueChanged}
                            ></floor3d-textfield>
                          `:""}
                    </div>
                  `:""}
            </div>
          `:""}
    `}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_toggleAction(e){this._toggleThing(e)}_toggleOption(e){this._toggleThing(e)}_typeChanged(e){if(!this._config||!this.hass)return;const t=e.target;if(t.configObject[t.configAttribute]==t.value)return;let i=t.configObject[t.configAttribute];if(this._valueChanged(e),console.log("Type3D changed start"),t.configObject[i]){const t=this._configArray,o=[];t.forEach((t,n)=>{if(e.target.configIndex==n){let t;switch(i){case"light":const{light:i,...o}=e.target.configObject;t=o;break;case"image":const{image:n,...l}=e.target.configObject;t=l;break;case"room":let{room:d,...r}=e.target.configObject;t=r;break;case"zoom":let{zoom:a,...s}=e.target.configObject;t=s;break;case"color":let{colorcondition:c,...m}=e.target.configObject;t=m;break;case"hide":let{hide:h,...p}=e.target.configObject;t=p;break;case"show":let{show:u,...f}=e.target.configObject;t=f;break;case"door":let{door:g,...b}=e.target.configObject;t=b;break;case"gesture":let{gesture:x,..._}=e.target.configObject;t=_;break;case"camera":let{camera:v,...y}=e.target.configObject;t=y;break;case"text":let{text:w,...$}=e.target.configObject;t=$;break;case"rotate":let{rotate:A,...E}=e.target.configObject;t=E;break;case"cover":let{cover:C,...I}=e.target.configObject;t=I}console.log(t),o.push(t)}else o.push(t)}),this._configArray=o}e.target.optionTgt.color&&(e.target.optionTgt.color.visible=!1),e.target.optionTgt.hide&&(e.target.optionTgt.hide.visible=!1),e.target.optionTgt.show&&(e.target.optionTgt.show.visible=!1),e.target.optionTgt.room&&(e.target.optionTgt.room.visible=!1),e.target.optionTgt.zoom&&(e.target.optionTgt.zoom.visible=!1),e.target.optionTgt.door&&(e.target.optionTgt.door.visible=!1),e.target.optionTgt.text&&(e.target.optionTgt.text.visible=!1),e.target.optionTgt.cover&&(e.target.optionTgt.cover.visible=!1),e.target.optionTgt.gesture&&(e.target.optionTgt.gesture.visible=!1),e.target.optionTgt.rotate&&(e.target.optionTgt.rotate.visible=!1),e.target.optionTgt.camera&&(e.target.optionTgt.camera.visible=!1),e.target.optionTgt.light&&(e.target.optionTgt.light.visible=!1),console.log("Type3D changed end")}_fireConfigChanged(){this._internal=a(this._config);const e=f(this._config),t=JSON.stringify(e);t!==this._held?(this._held=t,g(this,"config-changed",{config:e})):this.setConfig(e)}_valueChanged(e){if(!this._config||!this.hass)return;const t=e.target;let i=void 0!==t.checked?t.checked:t.value;"number"===t.type&&""!==i&&Number.isFinite(Number(i))&&(i=Number(i));const o=t.configObject[t.configAttribute];if(o!==i&&(null==o||String(o)!==String(i))){if(t.configAdd&&""!==i&&(t.configObject=Object.assign(t.configObject,{[t.configAdd]:{[t.configAttribute]:i}})),t.configAttribute&&t.configObject&&!t.configAdd)if(""===i||!1===i){if(1==t.ignoreNull)return;delete t.configObject[t.configAttribute]}else if("sensor_position"===t.configAttribute){let e;try{e=JSON.parse(i)}catch(e){return}if(!Array.isArray(e)||3!==e.length||!e.every(e=>"number"==typeof e&&isFinite(e)))return;t.configObject[t.configAttribute]=e}else t.configObject[t.configAttribute]=i;this._config.entities=this._configArray,this._config.object_groups=this._configObjectArray,this._config.zoom_areas=this._configZoomArray,this._fireConfigChanged()}}_createInfoElement(e){if("info"==this._configArray[e].type3d){this._configArray[e].info||(this._configArray[e].info={});const t=this._configArray[e].info;return p`
        <div class="card-options">
          <floor3d-textfield
            label="Template/Text"
            .value=${t.text?t.text:""}
            .configAttribute=${"text"}
            .configObject=${t}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Position [X, Y, Z] (Optional)"
            .value=${t.position?JSON.stringify(t.position):""}
            .configAttribute=${"position"}
            .configObject=${t}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Text Color"
            .value=${t.textfgcolor?t.textfgcolor:"white"}
            .configAttribute=${"textfgcolor"}
            .configObject=${t}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Background Color"
            .value=${t.textbgcolor?t.textbgcolor:"transparent"}
            .configAttribute=${"textbgcolor"}
            .configObject=${t}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
             label="Font"
             .value=${t.font?t.font:"monospace"}
             .configAttribute=${"font"}
             .configObject=${t}
             @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Size"
            type="number"
            .value=${void 0!==t.size?t.size:100}
            .configAttribute=${"size"}
            .configObject=${t}
            @input=${this._valueChanged}
          ></floor3d-textfield>
        </div>
      `}return p``}_createShowerElement(e){if("shower"==this._configArray[e].type3d){this._configArray[e].shower||(this._configArray[e].shower={});const t=this._configArray[e].shower;return p`
        <div class="card-options">
          <floor3d-textfield
            label="Speed"
            type="number"
            .value=${void 0!==t.velocity?t.velocity:5}
            .configAttribute=${"velocity"}
            .configObject=${t}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Drop Count"
            type="number"
            .value=${void 0!==t.count?t.count:200}
            .configAttribute=${"count"}
            .configObject=${t}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Color"
            .value=${t.color?t.color:"#aaaaaa"}
            .configAttribute=${"color"}
            .configObject=${t}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Drop Size"
            type="number"
            .value=${void 0!==t.size?t.size:1}
            .configAttribute=${"size"}
            .configObject=${t}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Height (cm)"
            type="number"
            .value=${void 0!==t.height?t.height:100}
            .configAttribute=${"height"}
            .configObject=${t}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Spray Area Side (cm)"
            type="number"
            .value=${void 0!==t.width?t.width:20}
            .configAttribute=${"width"}
            .configObject=${t}
            @input=${this._valueChanged}
          ></floor3d-textfield>
        </div>
      `}return p``}static get styles(){return b`
      .version {
        margin-left: auto;
        color: var(--secondary-text-color);
        font-size: 12px;
      }
      .option {
        padding: 4px 0px;
        cursor: pointer;
      }
      .row {
        display: flex;
        margin-bottom: -14px;
        pointer-events: none;
      }
      .title {
        padding-left: 16px;
        margin-top: -6px;
        pointer-events: none;
      }
      .secondary {
        padding-left: 40px;
        color: var(--secondary-text-color);
        pointer-events: none;
      }
      .values {
        padding-left: 16px;
        background: var(--secondary-background-color);
        display: grid;
      }
      .cards .card-options {
        display: flex;
        justify-content: flex-end;
        width: 100%;
      }
      ha-formfield {
        padding-bottom: 8px;
      }
      floor3d-select,
      floor3d-textfield {
        margin-bottom: 16px;
        display: block;
      }
      floor3d-formfield {
        padding-bottom: 8px;
      }
    `}};o([l({attribute:!1})],ao.prototype,"hass",void 0),o([d()],ao.prototype,"_config",void 0),o([d()],ao.prototype,"_toggle",void 0),o([d()],ao.prototype,"_helpers",void 0),ao=o([n("floor3d-card-editor-classic")],ao);export{ao as Floor3dCardClassicEditor};
