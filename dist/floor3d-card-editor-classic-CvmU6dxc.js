import{bu as t,bv as e,bw as i,_ as o,bx as n,t as s,n as l,r,i as d,b as a,by as c,bz as h,bA as m,C as p,U as u,bB as f,bc as g,f as v,b7 as _}from"./floor3d-card-core-BzM8HBah.js";
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
var b,x={MENU_SELECTED_LIST_ITEM:"mdc-menu-item--selected",MENU_SELECTION_GROUP:"mdc-menu__selection-group",ROOT:"mdc-menu"},y={ARIA_CHECKED_ATTR:"aria-checked",ARIA_DISABLED_ATTR:"aria-disabled",CHECKBOX_SELECTOR:'input[type="checkbox"]',LIST_SELECTOR:".mdc-list,.mdc-deprecated-list",SELECTED_EVENT:"MDCMenu:selected",SKIP_RESTORE_FOCUS:"data-menu-item-skip-restore-focus"},$={FOCUS_ROOT_INDEX:-1};!function(t){t[t.NONE=0]="NONE",t[t.LIST_ROOT=1]="LIST_ROOT",t[t.FIRST_ITEM=2]="FIRST_ITEM",t[t.LAST_ITEM=3]="LAST_ITEM"}(b||(b={}));
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
var A,w,E=function(){function t(t){void 0===t&&(t={}),this.adapter=t}return Object.defineProperty(t,"cssClasses",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(t,"strings",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(t,"numbers",{get:function(){return{}},enumerable:!1,configurable:!0}),Object.defineProperty(t,"defaultAdapter",{get:function(){return{}},enumerable:!1,configurable:!0}),t.prototype.init=function(){},t.prototype.destroy=function(){},t}(),C="mdc-list-item--activated",S="mdc-list-item",O="mdc-list-item--disabled",I="mdc-list-item--selected",T="mdc-list-item__text",k="mdc-list-item__primary-text",R="mdc-list";
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
 */(A={})[""+C]="mdc-list-item--activated",A[""+S]="mdc-list-item",A[""+O]="mdc-list-item--disabled",A[""+I]="mdc-list-item--selected",A[""+k]="mdc-list-item__primary-text",A[""+R]="mdc-list";var L,N,j=((w={})[""+C]="mdc-deprecated-list-item--activated",w[""+S]="mdc-deprecated-list-item",w[""+O]="mdc-deprecated-list-item--disabled",w[""+I]="mdc-deprecated-list-item--selected",w[""+T]="mdc-deprecated-list-item__text",w[""+k]="mdc-deprecated-list-item__primary-text",w[""+R]="mdc-deprecated-list",w),M={ACTION_EVENT:"MDCList:action",SELECTION_CHANGE_EVENT:"MDCList:selectionChange",ARIA_CHECKED:"aria-checked",ARIA_CHECKED_CHECKBOX_SELECTOR:'[role="checkbox"][aria-checked="true"]',ARIA_CHECKED_RADIO_SELECTOR:'[role="radio"][aria-checked="true"]',ARIA_CURRENT:"aria-current",ARIA_DISABLED:"aria-disabled",ARIA_ORIENTATION:"aria-orientation",ARIA_ORIENTATION_HORIZONTAL:"horizontal",ARIA_ROLE_CHECKBOX_SELECTOR:'[role="checkbox"]',ARIA_SELECTED:"aria-selected",ARIA_INTERACTIVE_ROLES_SELECTOR:'[role="listbox"], [role="menu"]',ARIA_MULTI_SELECTABLE_SELECTOR:'[aria-multiselectable="true"]',CHECKBOX_RADIO_SELECTOR:'input[type="checkbox"], input[type="radio"]',CHECKBOX_SELECTOR:'input[type="checkbox"]',CHILD_ELEMENTS_TO_TOGGLE_TABINDEX:"\n    ."+S+" button:not(:disabled),\n    ."+S+" a,\n    ."+j[S]+" button:not(:disabled),\n    ."+j[S]+" a\n  ",DEPRECATED_SELECTOR:".mdc-deprecated-list",FOCUSABLE_CHILD_ELEMENTS:"\n    ."+S+" button:not(:disabled),\n    ."+S+" a,\n    ."+S+' input[type="radio"]:not(:disabled),\n    .'+S+' input[type="checkbox"]:not(:disabled),\n    .'+j[S]+" button:not(:disabled),\n    ."+j[S]+" a,\n    ."+j[S]+' input[type="radio"]:not(:disabled),\n    .'+j[S]+' input[type="checkbox"]:not(:disabled)\n  ',RADIO_SELECTOR:'input[type="radio"]',SELECTED_ITEM_SELECTOR:'[aria-selected="true"], [aria-current="true"]'},P={UNSET_INDEX:-1,TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS:300},F={ANCHOR:"mdc-menu-surface--anchor",ANIMATING_CLOSED:"mdc-menu-surface--animating-closed",ANIMATING_OPEN:"mdc-menu-surface--animating-open",FIXED:"mdc-menu-surface--fixed",IS_OPEN_BELOW:"mdc-menu-surface--is-open-below",OPEN:"mdc-menu-surface--open",ROOT:"mdc-menu-surface"},z={CLOSED_EVENT:"MDCMenuSurface:closed",CLOSING_EVENT:"MDCMenuSurface:closing",OPENED_EVENT:"MDCMenuSurface:opened",OPENING_EVENT:"MDCMenuSurface:opening",FOCUSABLE_ELEMENTS:["button:not(:disabled)",'[href]:not([aria-disabled="true"])',"input:not(:disabled)","select:not(:disabled)","textarea:not(:disabled)",'[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])'].join(", ")},H={TRANSITION_OPEN_DURATION:120,TRANSITION_CLOSE_DURATION:75,MARGIN_TO_EDGE:32,ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO:.67,TOUCH_EVENT_WAIT_MS:30};!function(t){t[t.BOTTOM=1]="BOTTOM",t[t.CENTER=2]="CENTER",t[t.RIGHT=4]="RIGHT",t[t.FLIP_RTL=8]="FLIP_RTL"}(L||(L={})),function(t){t[t.TOP_LEFT=0]="TOP_LEFT",t[t.TOP_RIGHT=4]="TOP_RIGHT",t[t.BOTTOM_LEFT=1]="BOTTOM_LEFT",t[t.BOTTOM_RIGHT=5]="BOTTOM_RIGHT",t[t.TOP_START=8]="TOP_START",t[t.TOP_END=12]="TOP_END",t[t.BOTTOM_START=9]="BOTTOM_START",t[t.BOTTOM_END=13]="BOTTOM_END"}(N||(N={}));
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
var U=function(o){function n(t){var i=o.call(this,e(e({},n.defaultAdapter),t))||this;return i.isSurfaceOpen=!1,i.isQuickOpen=!1,i.isHoistedElement=!1,i.isFixedPosition=!1,i.isHorizontallyCenteredOnViewport=!1,i.maxHeight=0,i.openBottomBias=0,i.openAnimationEndTimerId=0,i.closeAnimationEndTimerId=0,i.animationRequestId=0,i.anchorCorner=N.TOP_START,i.originCorner=N.TOP_START,i.anchorMargin={top:0,right:0,bottom:0,left:0},i.position={x:0,y:0},i}return t(n,o),Object.defineProperty(n,"cssClasses",{get:function(){return F},enumerable:!1,configurable:!0}),Object.defineProperty(n,"strings",{get:function(){return z},enumerable:!1,configurable:!0}),Object.defineProperty(n,"numbers",{get:function(){return H},enumerable:!1,configurable:!0}),Object.defineProperty(n,"Corner",{get:function(){return N},enumerable:!1,configurable:!0}),Object.defineProperty(n,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},hasAnchor:function(){return!1},isElementInContainer:function(){return!1},isFocused:function(){return!1},isRtl:function(){return!1},getInnerDimensions:function(){return{height:0,width:0}},getAnchorDimensions:function(){return null},getWindowDimensions:function(){return{height:0,width:0}},getBodyDimensions:function(){return{height:0,width:0}},getWindowScroll:function(){return{x:0,y:0}},setPosition:function(){},setMaxHeight:function(){},setTransformOrigin:function(){},saveFocus:function(){},restoreFocus:function(){},notifyClose:function(){},notifyClosing:function(){},notifyOpen:function(){},notifyOpening:function(){}}},enumerable:!1,configurable:!0}),n.prototype.init=function(){var t=n.cssClasses,e=t.ROOT,i=t.OPEN;if(!this.adapter.hasClass(e))throw new Error(e+" class required in root element.");this.adapter.hasClass(i)&&(this.isSurfaceOpen=!0)},n.prototype.destroy=function(){clearTimeout(this.openAnimationEndTimerId),clearTimeout(this.closeAnimationEndTimerId),cancelAnimationFrame(this.animationRequestId)},n.prototype.setAnchorCorner=function(t){this.anchorCorner=t},n.prototype.flipCornerHorizontally=function(){this.originCorner=this.originCorner^L.RIGHT},n.prototype.setAnchorMargin=function(t){this.anchorMargin.top=t.top||0,this.anchorMargin.right=t.right||0,this.anchorMargin.bottom=t.bottom||0,this.anchorMargin.left=t.left||0},n.prototype.setIsHoisted=function(t){this.isHoistedElement=t},n.prototype.setFixedPosition=function(t){this.isFixedPosition=t},n.prototype.isFixed=function(){return this.isFixedPosition},n.prototype.setAbsolutePosition=function(t,e){this.position.x=this.isFinite(t)?t:0,this.position.y=this.isFinite(e)?e:0},n.prototype.setIsHorizontallyCenteredOnViewport=function(t){this.isHorizontallyCenteredOnViewport=t},n.prototype.setQuickOpen=function(t){this.isQuickOpen=t},n.prototype.setMaxHeight=function(t){this.maxHeight=t},n.prototype.setOpenBottomBias=function(t){this.openBottomBias=t},n.prototype.isOpen=function(){return this.isSurfaceOpen},n.prototype.open=function(){var t=this;this.isSurfaceOpen||(this.adapter.notifyOpening(),this.adapter.saveFocus(),this.isQuickOpen?(this.isSurfaceOpen=!0,this.adapter.addClass(n.cssClasses.OPEN),this.dimensions=this.adapter.getInnerDimensions(),this.autoposition(),this.adapter.notifyOpen()):(this.adapter.addClass(n.cssClasses.ANIMATING_OPEN),this.animationRequestId=requestAnimationFrame(function(){t.dimensions=t.adapter.getInnerDimensions(),t.autoposition(),t.adapter.addClass(n.cssClasses.OPEN),t.openAnimationEndTimerId=setTimeout(function(){t.openAnimationEndTimerId=0,t.adapter.removeClass(n.cssClasses.ANIMATING_OPEN),t.adapter.notifyOpen()},H.TRANSITION_OPEN_DURATION)}),this.isSurfaceOpen=!0))},n.prototype.close=function(t){var e=this;if(void 0===t&&(t=!1),this.isSurfaceOpen){if(this.adapter.notifyClosing(),this.isQuickOpen)return this.isSurfaceOpen=!1,t||this.maybeRestoreFocus(),this.adapter.removeClass(n.cssClasses.OPEN),this.adapter.removeClass(n.cssClasses.IS_OPEN_BELOW),void this.adapter.notifyClose();this.adapter.addClass(n.cssClasses.ANIMATING_CLOSED),requestAnimationFrame(function(){e.adapter.removeClass(n.cssClasses.OPEN),e.adapter.removeClass(n.cssClasses.IS_OPEN_BELOW),e.closeAnimationEndTimerId=setTimeout(function(){e.closeAnimationEndTimerId=0,e.adapter.removeClass(n.cssClasses.ANIMATING_CLOSED),e.adapter.notifyClose()},H.TRANSITION_CLOSE_DURATION)}),this.isSurfaceOpen=!1,t||this.maybeRestoreFocus()}},n.prototype.handleBodyClick=function(t){var e=t.target;this.adapter.isElementInContainer(e)||this.close()},n.prototype.handleKeydown=function(t){var e=t.keyCode;("Escape"===t.key||27===e)&&this.close()},n.prototype.autoposition=function(){var t;this.measurements=this.getAutoLayoutmeasurements();var e=this.getoriginCorner(),i=this.getMenuSurfaceMaxHeight(e),o=this.hasBit(e,L.BOTTOM)?"bottom":"top",s=this.hasBit(e,L.RIGHT)?"right":"left",l=this.getHorizontalOriginOffset(e),r=this.getVerticalOriginOffset(e),d=this.measurements,a=d.anchorSize,c=d.surfaceSize,h=((t={})[s]=l,t[o]=r,t);a.width/c.width>H.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO&&(s="center"),(this.isHoistedElement||this.isFixedPosition)&&this.adjustPositionForHoistedElement(h),this.adapter.setTransformOrigin(s+" "+o),this.adapter.setPosition(h),this.adapter.setMaxHeight(i?i+"px":""),this.hasBit(e,L.BOTTOM)||this.adapter.addClass(n.cssClasses.IS_OPEN_BELOW)},n.prototype.getAutoLayoutmeasurements=function(){var t=this.adapter.getAnchorDimensions(),e=this.adapter.getBodyDimensions(),i=this.adapter.getWindowDimensions(),o=this.adapter.getWindowScroll();return t||(t={top:this.position.y,right:this.position.x,bottom:this.position.y,left:this.position.x,width:0,height:0}),{anchorSize:t,bodySize:e,surfaceSize:this.dimensions,viewportDistance:{top:t.top,right:i.width-t.right,bottom:i.height-t.bottom,left:t.left},viewportSize:i,windowScroll:o}},n.prototype.getoriginCorner=function(){var t,e,i=this.originCorner,o=this.measurements,s=o.viewportDistance,l=o.anchorSize,r=o.surfaceSize,d=n.numbers.MARGIN_TO_EDGE;this.hasBit(this.anchorCorner,L.BOTTOM)?(t=s.top-d+this.anchorMargin.bottom,e=s.bottom-d-this.anchorMargin.bottom):(t=s.top-d+this.anchorMargin.top,e=s.bottom-d+l.height-this.anchorMargin.top),!(e-r.height>0)&&t>e+this.openBottomBias&&(i=this.setBit(i,L.BOTTOM));var a,c,h=this.adapter.isRtl(),m=this.hasBit(this.anchorCorner,L.FLIP_RTL),p=this.hasBit(this.anchorCorner,L.RIGHT)||this.hasBit(i,L.RIGHT),u=!1;(u=h&&m?!p:p)?(a=s.left+l.width+this.anchorMargin.right,c=s.right-this.anchorMargin.right):(a=s.left+this.anchorMargin.left,c=s.right+l.width-this.anchorMargin.left);var f=a-r.width>0,g=c-r.width>0,v=this.hasBit(i,L.FLIP_RTL)&&this.hasBit(i,L.RIGHT);return g&&v&&h||!f&&v?i=this.unsetBit(i,L.RIGHT):(f&&u&&h||f&&!u&&p||!g&&a>=c)&&(i=this.setBit(i,L.RIGHT)),i},n.prototype.getMenuSurfaceMaxHeight=function(t){if(this.maxHeight>0)return this.maxHeight;var e=this.measurements.viewportDistance,i=0,o=this.hasBit(t,L.BOTTOM),s=this.hasBit(this.anchorCorner,L.BOTTOM),l=n.numbers.MARGIN_TO_EDGE;return o?(i=e.top+this.anchorMargin.top-l,s||(i+=this.measurements.anchorSize.height)):(i=e.bottom-this.anchorMargin.bottom+this.measurements.anchorSize.height-l,s&&(i-=this.measurements.anchorSize.height)),i},n.prototype.getHorizontalOriginOffset=function(t){var e=this.measurements.anchorSize,i=this.hasBit(t,L.RIGHT),o=this.hasBit(this.anchorCorner,L.RIGHT);if(i){var n=o?e.width-this.anchorMargin.left:this.anchorMargin.right;return this.isHoistedElement||this.isFixedPosition?n-(this.measurements.viewportSize.width-this.measurements.bodySize.width):n}return o?e.width-this.anchorMargin.right:this.anchorMargin.left},n.prototype.getVerticalOriginOffset=function(t){var e=this.measurements.anchorSize,i=this.hasBit(t,L.BOTTOM),o=this.hasBit(this.anchorCorner,L.BOTTOM);return i?o?e.height-this.anchorMargin.top:-this.anchorMargin.bottom:o?e.height+this.anchorMargin.bottom:this.anchorMargin.top},n.prototype.adjustPositionForHoistedElement=function(t){var e,o,n=this.measurements,s=n.windowScroll,l=n.viewportDistance,r=n.surfaceSize,d=n.viewportSize,a=Object.keys(t);try{for(var c=i(a),h=c.next();!h.done;h=c.next()){var m=h.value,p=t[m]||0;!this.isHorizontallyCenteredOnViewport||"left"!==m&&"right"!==m?(p+=l[m],this.isFixedPosition||("top"===m?p+=s.y:"bottom"===m?p-=s.y:"left"===m?p+=s.x:p-=s.x),t[m]=p):t[m]=(d.width-r.width)/2}}catch(t){e={error:t}}finally{try{h&&!h.done&&(o=c.return)&&o.call(c)}finally{if(e)throw e.error}}},n.prototype.maybeRestoreFocus=function(){var t=this,e=this.adapter.isFocused(),i=this.adapter.getOwnerDocument?this.adapter.getOwnerDocument():document,o=i.activeElement&&this.adapter.isElementInContainer(i.activeElement);(e||o)&&setTimeout(function(){t.adapter.restoreFocus()},H.TOUCH_EVENT_WAIT_MS)},n.prototype.hasBit=function(t,e){return Boolean(t&e)},n.prototype.setBit=function(t,e){return t|e},n.prototype.unsetBit=function(t,e){return t^e},n.prototype.isFinite=function(t){return"number"==typeof t&&isFinite(t)},n}(E),D=function(i){function o(t){var n=i.call(this,e(e({},o.defaultAdapter),t))||this;return n.closeAnimationEndTimerId=0,n.defaultFocusState=b.LIST_ROOT,n.selectedIndex=-1,n}return t(o,i),Object.defineProperty(o,"cssClasses",{get:function(){return x},enumerable:!1,configurable:!0}),Object.defineProperty(o,"strings",{get:function(){return y},enumerable:!1,configurable:!0}),Object.defineProperty(o,"numbers",{get:function(){return $},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClassToElementAtIndex:function(){},removeClassFromElementAtIndex:function(){},addAttributeToElementAtIndex:function(){},removeAttributeFromElementAtIndex:function(){},getAttributeFromElementAtIndex:function(){return null},elementContainsClass:function(){return!1},closeSurface:function(){},getElementIndex:function(){return-1},notifySelected:function(){},getMenuItemCount:function(){return 0},focusItemAtIndex:function(){},focusListRoot:function(){},getSelectedSiblingOfItemAtIndex:function(){return-1},isSelectableItemAtIndex:function(){return!1}}},enumerable:!1,configurable:!0}),o.prototype.destroy=function(){this.closeAnimationEndTimerId&&clearTimeout(this.closeAnimationEndTimerId),this.adapter.closeSurface()},o.prototype.handleKeydown=function(t){var e=t.key,i=t.keyCode;("Tab"===e||9===i)&&this.adapter.closeSurface(!0)},o.prototype.handleItemAction=function(t){var e=this,i=this.adapter.getElementIndex(t);if(!(i<0)){this.adapter.notifySelected({index:i});var o="true"===this.adapter.getAttributeFromElementAtIndex(i,y.SKIP_RESTORE_FOCUS);this.adapter.closeSurface(o),this.closeAnimationEndTimerId=setTimeout(function(){var i=e.adapter.getElementIndex(t);i>=0&&e.adapter.isSelectableItemAtIndex(i)&&e.setSelectedIndex(i)},U.numbers.TRANSITION_CLOSE_DURATION)}},o.prototype.handleMenuSurfaceOpened=function(){switch(this.defaultFocusState){case b.FIRST_ITEM:this.adapter.focusItemAtIndex(0);break;case b.LAST_ITEM:this.adapter.focusItemAtIndex(this.adapter.getMenuItemCount()-1);break;case b.NONE:break;default:this.adapter.focusListRoot()}},o.prototype.setDefaultFocusState=function(t){this.defaultFocusState=t},o.prototype.getSelectedIndex=function(){return this.selectedIndex},o.prototype.setSelectedIndex=function(t){if(this.validatedIndex(t),!this.adapter.isSelectableItemAtIndex(t))throw new Error("MDCMenuFoundation: No selection group at specified index.");var e=this.adapter.getSelectedSiblingOfItemAtIndex(t);e>=0&&(this.adapter.removeAttributeFromElementAtIndex(e,y.ARIA_CHECKED_ATTR),this.adapter.removeClassFromElementAtIndex(e,x.MENU_SELECTED_LIST_ITEM)),this.adapter.addClassToElementAtIndex(t,x.MENU_SELECTED_LIST_ITEM),this.adapter.addAttributeToElementAtIndex(t,y.ARIA_CHECKED_ATTR,"true"),this.selectedIndex=t},o.prototype.setEnabled=function(t,e){this.validatedIndex(t),e?(this.adapter.removeClassFromElementAtIndex(t,O),this.adapter.addAttributeToElementAtIndex(t,y.ARIA_DISABLED_ATTR,"false")):(this.adapter.addClassToElementAtIndex(t,O),this.adapter.addAttributeToElementAtIndex(t,y.ARIA_DISABLED_ATTR,"true"))},o.prototype.validatedIndex=function(t){var e=this.adapter.getMenuItemCount();if(!(t>=0&&t<e))throw new Error("MDCMenuFoundation: No list item at specified index.")},o}(E);
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
const B=window,V=B.ShadowRoot&&(void 0===B.ShadyCSS||B.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol(),W=new WeakMap;let X=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==G)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(V&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=W.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&W.set(e,t))}return t}toString(){return this.cssText}};const q=V?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new X("string"==typeof t?t:t+"",void 0,G))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Y;const K=window,Z=K.trustedTypes,J=Z?Z.emptyScript:"",Q=K.reactiveElementPolyfillSupport,tt={toAttribute(t,e){switch(e){case Boolean:t=t?J:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},et=(t,e)=>e!==t&&(e==e||t==t),it={attribute:!0,type:String,converter:tt,reflect:!1,hasChanged:et},ot="finalized";let nt=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const o=this._$Ep(i,e);void 0!==o&&(this._$Ev.set(o,i),t.push(o))}),t}static createProperty(t,e=it){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const n=this[t];this[e]=o,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||it}static finalize(){if(this.hasOwnProperty(ot))return!1;this[ot]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(q(t))}else void 0!==t&&e.push(q(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{V?t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(e=>{const i=document.createElement("style"),o=B.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=e.cssText,t.appendChild(i)})})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=it){var o;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:tt).toAttribute(e,i.type);this._$El=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$El=null}}_$AK(t,e){var i;const o=this.constructor,n=o._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=o.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:tt;this._$El=n,this[n]=s.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let o=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||et)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var st;nt[ot]=!0,nt.elementProperties=new Map,nt.elementStyles=[],nt.shadowRootOptions={mode:"open"},null==Q||Q({ReactiveElement:nt}),(null!==(Y=K.reactiveElementVersions)&&void 0!==Y?Y:K.reactiveElementVersions=[]).push("1.6.3");const lt=window,rt=lt.trustedTypes,dt=rt?rt.createPolicy("lit-html",{createHTML:t=>t}):void 0,at="$lit$",ct=`lit$${(Math.random()+"").slice(9)}$`,ht="?"+ct,mt=`<${ht}>`,pt=document,ut=()=>pt.createComment(""),ft=t=>null===t||"object"!=typeof t&&"function"!=typeof t,gt=Array.isArray,vt="[ \t\n\f\r]",_t=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bt=/-->/g,xt=/>/g,yt=RegExp(`>|${vt}(?:([^\\s"'>=/]+)(${vt}*=${vt}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),$t=/'/g,At=/"/g,wt=/^(?:script|style|textarea|title)$/i,Et=Symbol.for("lit-noChange"),Ct=Symbol.for("lit-nothing"),St=new WeakMap,Ot=pt.createTreeWalker(pt,129,null,!1);function It(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==dt?dt.createHTML(e):e}let Tt=class t{constructor({strings:e,_$litType$:i},o){let n;this.parts=[];let s=0,l=0;const r=e.length-1,d=this.parts,[a,c]=((t,e)=>{const i=t.length-1,o=[];let n,s=2===e?"<svg>":"",l=_t;for(let e=0;e<i;e++){const i=t[e];let r,d,a=-1,c=0;for(;c<i.length&&(l.lastIndex=c,d=l.exec(i),null!==d);)c=l.lastIndex,l===_t?"!--"===d[1]?l=bt:void 0!==d[1]?l=xt:void 0!==d[2]?(wt.test(d[2])&&(n=RegExp("</"+d[2],"g")),l=yt):void 0!==d[3]&&(l=yt):l===yt?">"===d[0]?(l=null!=n?n:_t,a=-1):void 0===d[1]?a=-2:(a=l.lastIndex-d[2].length,r=d[1],l=void 0===d[3]?yt:'"'===d[3]?At:$t):l===At||l===$t?l=yt:l===bt||l===xt?l=_t:(l=yt,n=void 0);const h=l===yt&&t[e+1].startsWith("/>")?" ":"";s+=l===_t?i+mt:a>=0?(o.push(r),i.slice(0,a)+at+i.slice(a)+ct+h):i+ct+(-2===a?(o.push(void 0),e):h)}return[It(t,s+(t[i]||"<?>")+(2===e?"</svg>":"")),o]})(e,i);if(this.el=t.createElement(a,o),Ot.currentNode=this.el.content,2===i){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(n=Ot.nextNode())&&d.length<r;){if(1===n.nodeType){if(n.hasAttributes()){const t=[];for(const e of n.getAttributeNames())if(e.endsWith(at)||e.startsWith(ct)){const i=c[l++];if(t.push(e),void 0!==i){const t=n.getAttribute(i.toLowerCase()+at).split(ct),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?jt:"?"===e[1]?Pt:"@"===e[1]?Ft:Nt})}else d.push({type:6,index:s})}for(const e of t)n.removeAttribute(e)}if(wt.test(n.tagName)){const t=n.textContent.split(ct),e=t.length-1;if(e>0){n.textContent=rt?rt.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],ut()),Ot.nextNode(),d.push({type:2,index:++s});n.append(t[e],ut())}}}else if(8===n.nodeType)if(n.data===ht)d.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(ct,t+1));)d.push({type:7,index:s}),t+=ct.length-1}s++}}static createElement(t,e){const i=pt.createElement("template");return i.innerHTML=t,i}};function kt(t,e,i=t,o){var n,s,l,r;if(e===Et)return e;let d=void 0!==o?null===(n=i._$Co)||void 0===n?void 0:n[o]:i._$Cl;const a=ft(e)?void 0:e._$litDirective$;return(null==d?void 0:d.constructor)!==a&&(null===(s=null==d?void 0:d._$AO)||void 0===s||s.call(d,!1),void 0===a?d=void 0:(d=new a(t),d._$AT(t,i,o)),void 0!==o?(null!==(l=(r=i)._$Co)&&void 0!==l?l:r._$Co=[])[o]=d:i._$Cl=d),void 0!==d&&(e=kt(t,d._$AS(t,e.values),d,o)),e}let Rt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:o}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:pt).importNode(i,!0);Ot.currentNode=n;let s=Ot.nextNode(),l=0,r=0,d=o[0];for(;void 0!==d;){if(l===d.index){let e;2===d.type?e=new Lt(s,s.nextSibling,this,t):1===d.type?e=new d.ctor(s,d.name,d.strings,this,t):6===d.type&&(e=new zt(s,this,t)),this._$AV.push(e),d=o[++r]}l!==(null==d?void 0:d.index)&&(s=Ot.nextNode(),l++)}return Ot.currentNode=pt,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},Lt=class t{constructor(t,e,i,o){var n;this.type=2,this._$AH=Ct,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cp=null===(n=null==o?void 0:o.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=kt(this,t,e),ft(t)?t===Ct||null==t||""===t?(this._$AH!==Ct&&this._$AR(),this._$AH=Ct):t!==this._$AH&&t!==Et&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>gt(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==Ct&&ft(this._$AH)?this._$AA.nextSibling.data=t:this.$(pt.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:o}=t,n="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=Tt.createElement(It(o.h,o.h[0]),this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new Rt(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=St.get(t.strings);return void 0===e&&St.set(t.strings,e=new Tt(t)),e}T(e){gt(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let o,n=0;for(const s of e)n===i.length?i.push(o=new t(this.k(ut()),this.k(ut()),this,this.options)):o=i[n],o._$AI(s),n++;n<i.length&&(this._$AR(o&&o._$AB.nextSibling,n),i.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}},Nt=class{constructor(t,e,i,o,n){this.type=1,this._$AH=Ct,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Ct}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,o){const n=this.strings;let s=!1;if(void 0===n)t=kt(this,t,e,0),s=!ft(t)||t!==this._$AH&&t!==Et,s&&(this._$AH=t);else{const o=t;let l,r;for(t=n[0],l=0;l<n.length-1;l++)r=kt(this,o[i+l],e,l),r===Et&&(r=this._$AH[l]),s||(s=!ft(r)||r!==this._$AH[l]),r===Ct?t=Ct:t!==Ct&&(t+=(null!=r?r:"")+n[l+1]),this._$AH[l]=r}s&&!o&&this.j(t)}j(t){t===Ct?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}},jt=class extends Nt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Ct?void 0:t}};const Mt=rt?rt.emptyScript:"";let Pt=class extends Nt{constructor(){super(...arguments),this.type=4}j(t){t&&t!==Ct?this.element.setAttribute(this.name,Mt):this.element.removeAttribute(this.name)}},Ft=class extends Nt{constructor(t,e,i,o,n){super(t,e,i,o,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=kt(this,t,e,0))&&void 0!==i?i:Ct)===Et)return;const o=this._$AH,n=t===Ct&&o!==Ct||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==Ct&&(o===Ct||n);n&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}},zt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){kt(this,t)}};const Ht=lt.litHtmlPolyfillSupport;null==Ht||Ht(Tt,Lt),(null!==(st=lt.litHtmlVersions)&&void 0!==st?st:lt.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Ut,Dt;let Bt=class extends nt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var o,n;const s=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:e;let l=s._$litPart$;if(void 0===l){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;s._$litPart$=l=new Lt(e.insertBefore(ut(),t),t,void 0,null!=i?i:{})}return l._$AI(t),l})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return Et}};Bt.finalized=!0,Bt._$litElement$=!0,null===(Ut=globalThis.litElementHydrateSupport)||void 0===Ut||Ut.call(globalThis,{LitElement:Bt});const Vt=globalThis.litElementPolyfillSupport;null==Vt||Vt({LitElement:Bt}),(null!==(Dt=globalThis.litElementVersions)&&void 0!==Dt?Dt:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const Gt=t=>t.nodeType===Node.ELEMENT_NODE;function Wt(t){return{addClass:e=>{t.classList.add(e)},removeClass:e=>{t.classList.remove(e)},hasClass:e=>t.classList.contains(e)}}const Xt=()=>{},qt={get passive(){return!1}};document.addEventListener("x",Xt,qt),document.removeEventListener("x",Xt);const Yt=(t=window.document)=>{let e=t.activeElement;const i=[];if(!e)return i;for(;e&&(i.push(e),e.shadowRoot);)e=e.shadowRoot.activeElement;return i},Kt=t=>{const e=Yt();if(!e.length)return!1;const i=e[e.length-1],o=new Event("check-if-focused",{bubbles:!0,composed:!0});let n=[];const s=t=>{n=t.composedPath()};return document.body.addEventListener("check-if-focused",s),i.dispatchEvent(o),document.body.removeEventListener("check-if-focused",s),-1!==n.indexOf(t)};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class Zt extends Bt{click(){if(this.mdcRoot)return this.mdcRoot.focus(),void this.mdcRoot.click();super.click()}createFoundation(){void 0!==this.mdcFoundation&&this.mdcFoundation.destroy(),this.mdcFoundationClass&&(this.mdcFoundation=new this.mdcFoundationClass(this.createAdapter()),this.mdcFoundation.init())}firstUpdated(){this.createFoundation()}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const Jt=t=>(e,i)=>{if(e.constructor._observers){if(!e.constructor.hasOwnProperty("_observers")){const t=e.constructor._observers;e.constructor._observers=new Map,t.forEach((t,i)=>e.constructor._observers.set(i,t))}}else{e.constructor._observers=new Map;const t=e.updated;e.updated=function(e){t.call(this,e),e.forEach((t,e)=>{const i=this.constructor._observers.get(e);void 0!==i&&i.call(this,this[e],t)})}}e.constructor._observers.set(i,t)},Qt=window,te=Qt.ShadowRoot&&(void 0===Qt.ShadyCSS||Qt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ee=Symbol(),ie=new WeakMap;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let oe=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==ee)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(te&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=ie.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ie.set(e,t))}return t}toString(){return this.cssText}};const ne=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new oe(i,t,ee)},se=te?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new oe("string"==typeof t?t:t+"",void 0,ee))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var le;const re=window,de=re.trustedTypes,ae=de?de.emptyScript:"",ce=re.reactiveElementPolyfillSupport,he={toAttribute(t,e){switch(e){case Boolean:t=t?ae:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},me=(t,e)=>e!==t&&(e==e||t==t),pe={attribute:!0,type:String,converter:he,reflect:!1,hasChanged:me},ue="finalized";let fe=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const o=this._$Ep(i,e);void 0!==o&&(this._$Ev.set(o,i),t.push(o))}),t}static createProperty(t,e=pe){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const n=this[t];this[e]=o,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||pe}static finalize(){if(this.hasOwnProperty(ue))return!1;this[ue]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(se(t))}else void 0!==t&&e.push(se(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{te?t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(e=>{const i=document.createElement("style"),o=Qt.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=e.cssText,t.appendChild(i)})})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=pe){var o;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:he).toAttribute(e,i.type);this._$El=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$El=null}}_$AK(t,e){var i;const o=this.constructor,n=o._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=o.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:he;this._$El=n,this[n]=s.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let o=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||me)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ge;fe[ue]=!0,fe.elementProperties=new Map,fe.elementStyles=[],fe.shadowRootOptions={mode:"open"},null==ce||ce({ReactiveElement:fe}),(null!==(le=re.reactiveElementVersions)&&void 0!==le?le:re.reactiveElementVersions=[]).push("1.6.3");const ve=window,_e=ve.trustedTypes,be=_e?_e.createPolicy("lit-html",{createHTML:t=>t}):void 0,xe="$lit$",ye=`lit$${(Math.random()+"").slice(9)}$`,$e="?"+ye,Ae=`<${$e}>`,we=document,Ee=()=>we.createComment(""),Ce=t=>null===t||"object"!=typeof t&&"function"!=typeof t,Se=Array.isArray,Oe="[ \t\n\f\r]",Ie=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Te=/-->/g,ke=/>/g,Re=RegExp(`>|${Oe}(?:([^\\s"'>=/]+)(${Oe}*=${Oe}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Le=/'/g,Ne=/"/g,je=/^(?:script|style|textarea|title)$/i,Me=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),Pe=Symbol.for("lit-noChange"),Fe=Symbol.for("lit-nothing"),ze=new WeakMap,He=we.createTreeWalker(we,129,null,!1);function Ue(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==be?be.createHTML(e):e}let De=class t{constructor({strings:e,_$litType$:i},o){let n;this.parts=[];let s=0,l=0;const r=e.length-1,d=this.parts,[a,c]=((t,e)=>{const i=t.length-1,o=[];let n,s=2===e?"<svg>":"",l=Ie;for(let e=0;e<i;e++){const i=t[e];let r,d,a=-1,c=0;for(;c<i.length&&(l.lastIndex=c,d=l.exec(i),null!==d);)c=l.lastIndex,l===Ie?"!--"===d[1]?l=Te:void 0!==d[1]?l=ke:void 0!==d[2]?(je.test(d[2])&&(n=RegExp("</"+d[2],"g")),l=Re):void 0!==d[3]&&(l=Re):l===Re?">"===d[0]?(l=null!=n?n:Ie,a=-1):void 0===d[1]?a=-2:(a=l.lastIndex-d[2].length,r=d[1],l=void 0===d[3]?Re:'"'===d[3]?Ne:Le):l===Ne||l===Le?l=Re:l===Te||l===ke?l=Ie:(l=Re,n=void 0);const h=l===Re&&t[e+1].startsWith("/>")?" ":"";s+=l===Ie?i+Ae:a>=0?(o.push(r),i.slice(0,a)+xe+i.slice(a)+ye+h):i+ye+(-2===a?(o.push(void 0),e):h)}return[Ue(t,s+(t[i]||"<?>")+(2===e?"</svg>":"")),o]})(e,i);if(this.el=t.createElement(a,o),He.currentNode=this.el.content,2===i){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(n=He.nextNode())&&d.length<r;){if(1===n.nodeType){if(n.hasAttributes()){const t=[];for(const e of n.getAttributeNames())if(e.endsWith(xe)||e.startsWith(ye)){const i=c[l++];if(t.push(e),void 0!==i){const t=n.getAttribute(i.toLowerCase()+xe).split(ye),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?Xe:"?"===e[1]?Ye:"@"===e[1]?Ke:We})}else d.push({type:6,index:s})}for(const e of t)n.removeAttribute(e)}if(je.test(n.tagName)){const t=n.textContent.split(ye),e=t.length-1;if(e>0){n.textContent=_e?_e.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],Ee()),He.nextNode(),d.push({type:2,index:++s});n.append(t[e],Ee())}}}else if(8===n.nodeType)if(n.data===$e)d.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(ye,t+1));)d.push({type:7,index:s}),t+=ye.length-1}s++}}static createElement(t,e){const i=we.createElement("template");return i.innerHTML=t,i}};function Be(t,e,i=t,o){var n,s,l,r;if(e===Pe)return e;let d=void 0!==o?null===(n=i._$Co)||void 0===n?void 0:n[o]:i._$Cl;const a=Ce(e)?void 0:e._$litDirective$;return(null==d?void 0:d.constructor)!==a&&(null===(s=null==d?void 0:d._$AO)||void 0===s||s.call(d,!1),void 0===a?d=void 0:(d=new a(t),d._$AT(t,i,o)),void 0!==o?(null!==(l=(r=i)._$Co)&&void 0!==l?l:r._$Co=[])[o]=d:i._$Cl=d),void 0!==d&&(e=Be(t,d._$AS(t,e.values),d,o)),e}let Ve=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:o}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:we).importNode(i,!0);He.currentNode=n;let s=He.nextNode(),l=0,r=0,d=o[0];for(;void 0!==d;){if(l===d.index){let e;2===d.type?e=new Ge(s,s.nextSibling,this,t):1===d.type?e=new d.ctor(s,d.name,d.strings,this,t):6===d.type&&(e=new Ze(s,this,t)),this._$AV.push(e),d=o[++r]}l!==(null==d?void 0:d.index)&&(s=He.nextNode(),l++)}return He.currentNode=we,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},Ge=class t{constructor(t,e,i,o){var n;this.type=2,this._$AH=Fe,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cp=null===(n=null==o?void 0:o.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Be(this,t,e),Ce(t)?t===Fe||null==t||""===t?(this._$AH!==Fe&&this._$AR(),this._$AH=Fe):t!==this._$AH&&t!==Pe&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>Se(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==Fe&&Ce(this._$AH)?this._$AA.nextSibling.data=t:this.$(we.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:o}=t,n="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=De.createElement(Ue(o.h,o.h[0]),this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new Ve(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=ze.get(t.strings);return void 0===e&&ze.set(t.strings,e=new De(t)),e}T(e){Se(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let o,n=0;for(const s of e)n===i.length?i.push(o=new t(this.k(Ee()),this.k(Ee()),this,this.options)):o=i[n],o._$AI(s),n++;n<i.length&&(this._$AR(o&&o._$AB.nextSibling,n),i.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}},We=class{constructor(t,e,i,o,n){this.type=1,this._$AH=Fe,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Fe}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,o){const n=this.strings;let s=!1;if(void 0===n)t=Be(this,t,e,0),s=!Ce(t)||t!==this._$AH&&t!==Pe,s&&(this._$AH=t);else{const o=t;let l,r;for(t=n[0],l=0;l<n.length-1;l++)r=Be(this,o[i+l],e,l),r===Pe&&(r=this._$AH[l]),s||(s=!Ce(r)||r!==this._$AH[l]),r===Fe?t=Fe:t!==Fe&&(t+=(null!=r?r:"")+n[l+1]),this._$AH[l]=r}s&&!o&&this.j(t)}j(t){t===Fe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}},Xe=class extends We{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Fe?void 0:t}};const qe=_e?_e.emptyScript:"";let Ye=class extends We{constructor(){super(...arguments),this.type=4}j(t){t&&t!==Fe?this.element.setAttribute(this.name,qe):this.element.removeAttribute(this.name)}},Ke=class extends We{constructor(t,e,i,o,n){super(t,e,i,o,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=Be(this,t,e,0))&&void 0!==i?i:Fe)===Pe)return;const o=this._$AH,n=t===Fe&&o!==Fe||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==Fe&&(o===Fe||n);n&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}},Ze=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Be(this,t)}};const Je=ve.litHtmlPolyfillSupport;null==Je||Je(De,Ge),(null!==(ge=ve.litHtmlVersions)&&void 0!==ge?ge:ve.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Qe,ti;let ei=class extends fe{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var o,n;const s=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:e;let l=s._$litPart$;if(void 0===l){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;s._$litPart$=l=new Ge(e.insertBefore(Ee(),t),t,void 0,null!=i?i:{})}return l._$AI(t),l})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return Pe}};ei.finalized=!0,ei._$litElement$=!0,null===(Qe=globalThis.litElementHydrateSupport)||void 0===Qe||Qe.call(globalThis,{LitElement:ei});const ii=globalThis.litElementPolyfillSupport;null==ii||ii({LitElement:ei}),(null!==(ti=globalThis.litElementVersions)&&void 0!==ti?ti:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const oi=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function ni(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):oi(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function si(t){return ni({...t,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function li(t,e){return(({finisher:t,descriptor:e})=>(i,o)=>{var n;if(void 0===o){const o=null!==(n=i.originalKey)&&void 0!==n?n:i.key,s=null!=e?{kind:"method",placement:"prototype",key:o,descriptor:e(i.key)}:{...i,key:o};return null!=t&&(s.finisher=function(e){t(e,o)}),s}{const n=i.constructor;void 0!==e&&Object.defineProperty(i,o,e(o)),null==t||t(n,o)}})({descriptor:e=>{const i={get(){var e,i;return null!==(i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==i?i:null},enumerable:!0,configurable:!0};return i}})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ri;null===(ri=window.HTMLSlotElement)||void 0===ri||ri.prototype.assignedElements;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const di=1,ai=t=>(...e)=>({_$litDirective$:t,values:e});let ci=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const hi=ai(class extends ci{constructor(t){var e;if(super(t),t.type!==di||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var i,o;if(void 0===this.it){this.it=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!(null===(i=this.nt)||void 0===i?void 0:i.has(t))&&this.it.add(t);return this.render(e)}const n=t.element.classList;this.it.forEach(t=>{t in e||(n.remove(t),this.it.delete(t))});for(const t in e){const i=!!e[t];i===this.it.has(t)||(null===(o=this.nt)||void 0===o?void 0:o.has(t))||(i?(n.add(t),this.it.add(t)):(n.remove(t),this.it.delete(t)))}return Pe}});
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
 */var mi="Unknown",pi="Backspace",ui="Enter",fi="Spacebar",gi="PageUp",vi="PageDown",_i="End",bi="Home",xi="ArrowLeft",yi="ArrowUp",$i="ArrowRight",Ai="ArrowDown",wi="Delete",Ei="Escape",Ci="Tab",Si=new Set;Si.add(pi),Si.add(ui),Si.add(fi),Si.add(gi),Si.add(vi),Si.add(_i),Si.add(bi),Si.add(xi),Si.add(yi),Si.add($i),Si.add(Ai),Si.add(wi),Si.add(Ei),Si.add(Ci);var Oi=8,Ii=13,Ti=32,ki=33,Ri=34,Li=35,Ni=36,ji=37,Mi=38,Pi=39,Fi=40,zi=46,Hi=27,Ui=9,Di=new Map;Di.set(Oi,pi),Di.set(Ii,ui),Di.set(Ti,fi),Di.set(ki,gi),Di.set(Ri,vi),Di.set(Li,_i),Di.set(Ni,bi),Di.set(ji,xi),Di.set(Mi,yi),Di.set(Pi,$i),Di.set(Fi,Ai),Di.set(zi,wi),Di.set(Hi,Ei),Di.set(Ui,Ci);var Bi=new Set;function Vi(t){var e=t.key;if(Si.has(e))return e;var i=Di.get(t.keyCode);return i||mi}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */Bi.add(gi),Bi.add(vi),Bi.add(_i),Bi.add(bi),Bi.add(xi),Bi.add(yi),Bi.add($i),Bi.add(Ai);const Gi=(t,e)=>t-e,Wi=["input","button","textarea","select"];function Xi(t){return t instanceof Set}const qi=t=>{const e=t===P.UNSET_INDEX?new Set:t;return Xi(e)?new Set(e):new Set([e])};class Yi extends E{constructor(t){super(Object.assign(Object.assign({},Yi.defaultAdapter),t)),this.isMulti_=!1,this.wrapFocus_=!1,this.isVertical_=!0,this.selectedIndex_=P.UNSET_INDEX,this.focusedItemIndex_=P.UNSET_INDEX,this.useActivatedClass_=!1,this.ariaCurrentAttrValue_=null}static get strings(){return M}static get numbers(){return P}static get defaultAdapter(){return{focusItemAtIndex:()=>{},getFocusedElementIndex:()=>0,getListItemCount:()=>0,isFocusInsideList:()=>!1,isRootFocused:()=>!1,notifyAction:()=>{},notifySelected:()=>{},getSelectedStateForElementIndex:()=>!1,setDisabledStateForElementIndex:()=>{},getDisabledStateForElementIndex:()=>!1,setSelectedStateForElementIndex:()=>{},setActivatedStateForElementIndex:()=>{},setTabIndexForElementIndex:()=>{},setAttributeForElementIndex:()=>{},getAttributeForElementIndex:()=>null}}setWrapFocus(t){this.wrapFocus_=t}setMulti(t){this.isMulti_=t;const e=this.selectedIndex_;if(t){if(!Xi(e)){const t=e===P.UNSET_INDEX;this.selectedIndex_=t?new Set:new Set([e])}}else if(Xi(e))if(e.size){const t=Array.from(e).sort(Gi);this.selectedIndex_=t[0]}else this.selectedIndex_=P.UNSET_INDEX}setVerticalOrientation(t){this.isVertical_=t}setUseActivatedClass(t){this.useActivatedClass_=t}getSelectedIndex(){return this.selectedIndex_}setSelectedIndex(t){this.isIndexValid_(t)&&(this.isMulti_?this.setMultiSelectionAtIndex_(qi(t)):this.setSingleSelectionAtIndex_(t))}handleFocusIn(t,e){e>=0&&this.adapter.setTabIndexForElementIndex(e,0)}handleFocusOut(t,e){e>=0&&this.adapter.setTabIndexForElementIndex(e,-1),setTimeout(()=>{this.adapter.isFocusInsideList()||this.setTabindexToFirstSelectedItem_()},0)}handleKeydown(t,e,i){const o="ArrowLeft"===Vi(t),n="ArrowUp"===Vi(t),s="ArrowRight"===Vi(t),l="ArrowDown"===Vi(t),r="Home"===Vi(t),d="End"===Vi(t),a="Enter"===Vi(t),c="Spacebar"===Vi(t);if(this.adapter.isRootFocused())return void(n||d?(t.preventDefault(),this.focusLastElement()):(l||r)&&(t.preventDefault(),this.focusFirstElement()));let h,m=this.adapter.getFocusedElementIndex();if(!(-1===m&&(m=i,m<0))){if(this.isVertical_&&l||!this.isVertical_&&s)this.preventDefaultEvent(t),h=this.focusNextElement(m);else if(this.isVertical_&&n||!this.isVertical_&&o)this.preventDefaultEvent(t),h=this.focusPrevElement(m);else if(r)this.preventDefaultEvent(t),h=this.focusFirstElement();else if(d)this.preventDefaultEvent(t),h=this.focusLastElement();else if((a||c)&&e){const e=t.target;if(e&&"A"===e.tagName&&a)return;this.preventDefaultEvent(t),this.setSelectedIndexOnAction_(m,!0)}this.focusedItemIndex_=m,void 0!==h&&(this.setTabindexAtIndex_(h),this.focusedItemIndex_=h)}}handleSingleSelection(t,e,i){t!==P.UNSET_INDEX&&(this.setSelectedIndexOnAction_(t,e,i),this.setTabindexAtIndex_(t),this.focusedItemIndex_=t)}focusNextElement(t){let e=t+1;if(e>=this.adapter.getListItemCount()){if(!this.wrapFocus_)return t;e=0}return this.adapter.focusItemAtIndex(e),e}focusPrevElement(t){let e=t-1;if(e<0){if(!this.wrapFocus_)return t;e=this.adapter.getListItemCount()-1}return this.adapter.focusItemAtIndex(e),e}focusFirstElement(){return this.adapter.focusItemAtIndex(0),0}focusLastElement(){const t=this.adapter.getListItemCount()-1;return this.adapter.focusItemAtIndex(t),t}setEnabled(t,e){this.isIndexValid_(t)&&this.adapter.setDisabledStateForElementIndex(t,!e)}preventDefaultEvent(t){const e=`${t.target.tagName}`.toLowerCase();-1===Wi.indexOf(e)&&t.preventDefault()}setSingleSelectionAtIndex_(t,e=!0){this.selectedIndex_!==t&&(this.selectedIndex_!==P.UNSET_INDEX&&(this.adapter.setSelectedStateForElementIndex(this.selectedIndex_,!1),this.useActivatedClass_&&this.adapter.setActivatedStateForElementIndex(this.selectedIndex_,!1)),e&&this.adapter.setSelectedStateForElementIndex(t,!0),this.useActivatedClass_&&this.adapter.setActivatedStateForElementIndex(t,!0),this.setAriaForSingleSelectionAtIndex_(t),this.selectedIndex_=t,this.adapter.notifySelected(t))}setMultiSelectionAtIndex_(t,e=!0){const i=((t,e)=>{const i=Array.from(t),o=Array.from(e),n={added:[],removed:[]},s=i.sort(Gi),l=o.sort(Gi);let r=0,d=0;for(;r<s.length||d<l.length;){const t=s[r],e=l[d];t!==e?void 0!==t&&(void 0===e||t<e)?(n.removed.push(t),r++):void 0!==e&&(void 0===t||e<t)&&(n.added.push(e),d++):(r++,d++)}return n})(qi(this.selectedIndex_),t);if(i.removed.length||i.added.length){for(const t of i.removed)e&&this.adapter.setSelectedStateForElementIndex(t,!1),this.useActivatedClass_&&this.adapter.setActivatedStateForElementIndex(t,!1);for(const t of i.added)e&&this.adapter.setSelectedStateForElementIndex(t,!0),this.useActivatedClass_&&this.adapter.setActivatedStateForElementIndex(t,!0);this.selectedIndex_=t,this.adapter.notifySelected(t,i)}}setAriaForSingleSelectionAtIndex_(t){this.selectedIndex_===P.UNSET_INDEX&&(this.ariaCurrentAttrValue_=this.adapter.getAttributeForElementIndex(t,M.ARIA_CURRENT));const e=null!==this.ariaCurrentAttrValue_,i=e?M.ARIA_CURRENT:M.ARIA_SELECTED;this.selectedIndex_!==P.UNSET_INDEX&&this.adapter.setAttributeForElementIndex(this.selectedIndex_,i,"false");const o=e?this.ariaCurrentAttrValue_:"true";this.adapter.setAttributeForElementIndex(t,i,o)}setTabindexAtIndex_(t){this.focusedItemIndex_===P.UNSET_INDEX&&0!==t?this.adapter.setTabIndexForElementIndex(0,-1):this.focusedItemIndex_>=0&&this.focusedItemIndex_!==t&&this.adapter.setTabIndexForElementIndex(this.focusedItemIndex_,-1),this.adapter.setTabIndexForElementIndex(t,0)}setTabindexToFirstSelectedItem_(){let t=0;"number"==typeof this.selectedIndex_&&this.selectedIndex_!==P.UNSET_INDEX?t=this.selectedIndex_:Xi(this.selectedIndex_)&&this.selectedIndex_.size>0&&(t=Math.min(...this.selectedIndex_)),this.setTabindexAtIndex_(t)}isIndexValid_(t){if(t instanceof Set){if(!this.isMulti_)throw new Error("MDCListFoundation: Array of index is only supported for checkbox based list");if(0===t.size)return!0;{let e=!1;for(const i of t)if(e=this.isIndexInRange_(i),e)break;return e}}if("number"==typeof t){if(this.isMulti_)throw new Error("MDCListFoundation: Expected array of index for checkbox based list but got number: "+t);return t===P.UNSET_INDEX||this.isIndexInRange_(t)}return!1}isIndexInRange_(t){const e=this.adapter.getListItemCount();return t>=0&&t<e}setSelectedIndexOnAction_(t,e,i){if(this.adapter.getDisabledStateForElementIndex(t))return;let o=t;if(this.isMulti_&&(o=new Set([t])),this.isIndexValid_(o)){if(this.isMulti_)this.toggleMultiAtIndex(t,i,e);else if(e||i)this.setSingleSelectionAtIndex_(t,e);else{this.selectedIndex_===t&&this.setSingleSelectionAtIndex_(P.UNSET_INDEX)}e&&this.adapter.notifyAction(t)}}toggleMultiAtIndex(t,e,i=!0){let o=!1;o=void 0===e?!this.adapter.getSelectedStateForElementIndex(t):e;const n=qi(this.selectedIndex_);o?n.add(t):n.delete(t),this.setMultiSelectionAtIndex_(n,i)}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ki extends Zt{constructor(){super(...arguments),this.mdcFoundationClass=D,this.listElement_=null,this.anchor=null,this.open=!1,this.quick=!1,this.wrapFocus=!1,this.innerRole="menu",this.innerAriaLabel=null,this.corner="TOP_START",this.x=null,this.y=null,this.absolute=!1,this.multi=!1,this.activatable=!1,this.fixed=!1,this.forceGroupSelection=!1,this.fullwidth=!1,this.menuCorner="START",this.stayOpenOnBodyClick=!1,this.defaultFocus="LIST_ROOT",this._listUpdateComplete=null}get listElement(){return this.listElement_||(this.listElement_=this.renderRoot.querySelector("mwc-list")),this.listElement_}get items(){const t=this.listElement;return t?t.items:[]}get index(){const t=this.listElement;return t?t.index:-1}get selected(){const t=this.listElement;return t?t.selected:null}render(){return this.renderSurface()}renderSurface(){const t=this.getSurfaceClasses();return Me`
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
        class=${hi(t)}
        @closed=${this.onClosed}
        @opened=${this.onOpened}
        @keydown=${this.onKeydown}>
      ${this.renderList()}
    </mwc-menu-surface>`}getSurfaceClasses(){return{"mdc-menu":!0,"mdc-menu-surface":!0}}renderList(){const t="menu"===this.innerRole?"menuitem":"option",e=this.renderListClasses();return Me`
      <mwc-list
          rootTabbable
          .innerAriaLabel=${this.innerAriaLabel}
          .innerRole=${this.innerRole}
          .multi=${this.multi}
          class=${hi(e)}
          .itemRoles=${t}
          .wrapFocus=${this.wrapFocus}
          .activatable=${this.activatable}
          @action=${this.onAction}>
        <slot></slot>
      </mwc-list>`}renderListClasses(){return{"mdc-deprecated-list":!0}}createAdapter(){return{addClassToElementAtIndex:(t,e)=>{const i=this.listElement;if(!i)return;const o=i.items[t];o&&("mdc-menu-item--selected"===e?this.forceGroupSelection&&!o.selected&&i.toggle(t,!0):o.classList.add(e))},removeClassFromElementAtIndex:(t,e)=>{const i=this.listElement;if(!i)return;const o=i.items[t];o&&("mdc-menu-item--selected"===e?o.selected&&i.toggle(t,!1):o.classList.remove(e))},addAttributeToElementAtIndex:(t,e,i)=>{const o=this.listElement;if(!o)return;const n=o.items[t];n&&n.setAttribute(e,i)},removeAttributeFromElementAtIndex:(t,e)=>{const i=this.listElement;if(!i)return;const o=i.items[t];o&&o.removeAttribute(e)},getAttributeFromElementAtIndex:(t,e)=>{const i=this.listElement;if(!i)return null;const o=i.items[t];return o?o.getAttribute(e):null},elementContainsClass:(t,e)=>t.classList.contains(e),closeSurface:()=>{this.open=!1},getElementIndex:t=>{const e=this.listElement;return e?e.items.indexOf(t):-1},notifySelected:()=>{},getMenuItemCount:()=>{const t=this.listElement;return t?t.items.length:0},focusItemAtIndex:t=>{const e=this.listElement;if(!e)return;const i=e.items[t];i&&i.focus()},focusListRoot:()=>{this.listElement&&this.listElement.focus()},getSelectedSiblingOfItemAtIndex:t=>{const e=this.listElement;if(!e)return-1;const i=e.items[t];if(!i||!i.group)return-1;for(let o=0;o<e.items.length;o++){if(o===t)continue;const n=e.items[o];if(n.selected&&n.group===i.group)return o}return-1},isSelectableItemAtIndex:t=>{const e=this.listElement;if(!e)return!1;const i=e.items[t];return!!i&&i.hasAttribute("group")}}}onKeydown(t){this.mdcFoundation&&this.mdcFoundation.handleKeydown(t)}onAction(t){const e=this.listElement;if(this.mdcFoundation&&e){const i=t.detail.index,o=e.items[i];o&&this.mdcFoundation.handleItemAction(o)}}onOpened(){this.open=!0,this.mdcFoundation&&this.mdcFoundation.handleMenuSurfaceOpened()}onClosed(){this.open=!1}async getUpdateComplete(){await this._listUpdateComplete;return await super.getUpdateComplete()}async firstUpdated(){super.firstUpdated();const t=this.listElement;t&&(this._listUpdateComplete=t.updateComplete,await this._listUpdateComplete)}select(t){const e=this.listElement;e&&e.select(t)}close(){this.open=!1}show(){this.open=!0}getFocusedItemIndex(){const t=this.listElement;return t?t.getFocusedItemIndex():-1}focusItemAtIndex(t){const e=this.listElement;e&&e.focusItemAtIndex(t)}layout(t=!0){const e=this.listElement;e&&e.layout(t)}}o([li(".mdc-menu")],Ki.prototype,"mdcRoot",void 0),o([li("slot")],Ki.prototype,"slotElement",void 0),o([ni({type:Object})],Ki.prototype,"anchor",void 0),o([ni({type:Boolean,reflect:!0})],Ki.prototype,"open",void 0),o([ni({type:Boolean})],Ki.prototype,"quick",void 0),o([ni({type:Boolean})],Ki.prototype,"wrapFocus",void 0),o([ni({type:String})],Ki.prototype,"innerRole",void 0),o([ni({type:String})],Ki.prototype,"innerAriaLabel",void 0),o([ni({type:String})],Ki.prototype,"corner",void 0),o([ni({type:Number})],Ki.prototype,"x",void 0),o([ni({type:Number})],Ki.prototype,"y",void 0),o([ni({type:Boolean})],Ki.prototype,"absolute",void 0),o([ni({type:Boolean})],Ki.prototype,"multi",void 0),o([ni({type:Boolean})],Ki.prototype,"activatable",void 0),o([ni({type:Boolean})],Ki.prototype,"fixed",void 0),o([ni({type:Boolean})],Ki.prototype,"forceGroupSelection",void 0),o([ni({type:Boolean})],Ki.prototype,"fullwidth",void 0),o([ni({type:String})],Ki.prototype,"menuCorner",void 0),o([ni({type:Boolean})],Ki.prototype,"stayOpenOnBodyClick",void 0),o([ni({type:String}),Jt(function(t){this.mdcFoundation&&this.mdcFoundation.setDefaultFocusState(b[t])})],Ki.prototype,"defaultFocus",void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const Zi=ne`mwc-list ::slotted([mwc-list-item]:not([twoline])),mwc-list ::slotted([noninteractive]:not([twoline])){height:var(--mdc-menu-item-height, 48px)}`
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,Ji="important",Qi=" !"+Ji,to=ai(class extends ci{constructor(t){var e;if(super(t),t.type!==di||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const o=t[i];return null==o?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ht){this.ht=new Set;for(const t in e)this.ht.add(t);return this.render(e)}this.ht.forEach(t=>{null==e[t]&&(this.ht.delete(t),t.includes("-")?i.removeProperty(t):i[t]="")});for(const t in e){const o=e[t];if(null!=o){this.ht.add(t);const e="string"==typeof o&&o.endsWith(Qi);t.includes("-")||e?i.setProperty(t,e?o.slice(0,-11):o,e?Ji:""):i[t]=o}}return Pe}}),eo={TOP_LEFT:N.TOP_LEFT,TOP_RIGHT:N.TOP_RIGHT,BOTTOM_LEFT:N.BOTTOM_LEFT,BOTTOM_RIGHT:N.BOTTOM_RIGHT,TOP_START:N.TOP_START,TOP_END:N.TOP_END,BOTTOM_START:N.BOTTOM_START,BOTTOM_END:N.BOTTOM_END};class io extends Zt{constructor(){super(...arguments),this.mdcFoundationClass=U,this.absolute=!1,this.fullwidth=!1,this.fixed=!1,this.x=null,this.y=null,this.quick=!1,this.open=!1,this.stayOpenOnBodyClick=!1,this.bitwiseCorner=N.TOP_START,this.previousMenuCorner=null,this.menuCorner="START",this.corner="TOP_START",this.styleTop="",this.styleLeft="",this.styleRight="",this.styleBottom="",this.styleMaxHeight="",this.styleTransformOrigin="",this.anchor=null,this.previouslyFocused=null,this.previousAnchor=null,this.onBodyClickBound=()=>{}}render(){return this.renderSurface()}renderSurface(){const t=this.getRootClasses(),e=this.getRootStyles();return Me`
      <div
          class=${hi(t)}
          style="${to(e)}"
          @keydown=${this.onKeydown}
          @opened=${this.registerBodyClick}
          @closed=${this.deregisterBodyClick}>
        ${this.renderContent()}
      </div>`}getRootClasses(){return{"mdc-menu-surface":!0,"mdc-menu-surface--fixed":this.fixed,"mdc-menu-surface--fullwidth":this.fullwidth}}getRootStyles(){return{top:this.styleTop,left:this.styleLeft,right:this.styleRight,bottom:this.styleBottom,"max-height":this.styleMaxHeight,"transform-origin":this.styleTransformOrigin}}renderContent(){return Me`<slot></slot>`}createAdapter(){return Object.assign(Object.assign({},Wt(this.mdcRoot)),{hasAnchor:()=>!!this.anchor,notifyClose:()=>{const t=new CustomEvent("closed",{bubbles:!0,composed:!0});this.open=!1,this.mdcRoot.dispatchEvent(t)},notifyClosing:()=>{const t=new CustomEvent("closing",{bubbles:!0,composed:!0});this.mdcRoot.dispatchEvent(t)},notifyOpen:()=>{const t=new CustomEvent("opened",{bubbles:!0,composed:!0});this.open=!0,this.mdcRoot.dispatchEvent(t)},notifyOpening:()=>{const t=new CustomEvent("opening",{bubbles:!0,composed:!0});this.mdcRoot.dispatchEvent(t)},isElementInContainer:()=>!1,isRtl:()=>!!this.mdcRoot&&"rtl"===getComputedStyle(this.mdcRoot).direction,setTransformOrigin:t=>{this.mdcRoot&&(this.styleTransformOrigin=t)},isFocused:()=>Kt(this),saveFocus:()=>{const t=Yt(),e=t.length;e||(this.previouslyFocused=null),this.previouslyFocused=t[e-1]},restoreFocus:()=>{this.previouslyFocused&&"focus"in this.previouslyFocused&&this.previouslyFocused.focus()},getInnerDimensions:()=>{const t=this.mdcRoot;return t?{width:t.offsetWidth,height:t.offsetHeight}:{width:0,height:0}},getAnchorDimensions:()=>{const t=this.anchor;return t?t.getBoundingClientRect():null},getBodyDimensions:()=>({width:document.body.clientWidth,height:document.body.clientHeight}),getWindowDimensions:()=>({width:window.innerWidth,height:window.innerHeight}),getWindowScroll:()=>({x:window.pageXOffset,y:window.pageYOffset}),setPosition:t=>{this.mdcRoot&&(this.styleLeft="left"in t?`${t.left}px`:"",this.styleRight="right"in t?`${t.right}px`:"",this.styleTop="top"in t?`${t.top}px`:"",this.styleBottom="bottom"in t?`${t.bottom}px`:"")},setMaxHeight:async t=>{this.mdcRoot&&(this.styleMaxHeight=t,await this.updateComplete,this.styleMaxHeight=`var(--mdc-menu-max-height, ${t})`)}})}onKeydown(t){this.mdcFoundation&&this.mdcFoundation.handleKeydown(t)}onBodyClick(t){if(this.stayOpenOnBodyClick)return;-1===t.composedPath().indexOf(this)&&this.close()}registerBodyClick(){this.onBodyClickBound=this.onBodyClick.bind(this),document.body.addEventListener("click",this.onBodyClickBound,{passive:!0,capture:!0})}deregisterBodyClick(){document.body.removeEventListener("click",this.onBodyClickBound,{capture:!0})}onOpenChanged(t,e){this.mdcFoundation&&(t?this.mdcFoundation.open():void 0!==e&&this.mdcFoundation.close())}close(){this.open=!1}show(){this.open=!0}}o([li(".mdc-menu-surface")],io.prototype,"mdcRoot",void 0),o([li("slot")],io.prototype,"slotElement",void 0),o([ni({type:Boolean}),Jt(function(t){this.mdcFoundation&&!this.fixed&&this.mdcFoundation.setIsHoisted(t)})],io.prototype,"absolute",void 0),o([ni({type:Boolean})],io.prototype,"fullwidth",void 0),o([ni({type:Boolean}),Jt(function(t){this.mdcFoundation&&!this.absolute&&this.mdcFoundation.setFixedPosition(t)})],io.prototype,"fixed",void 0),o([ni({type:Number}),Jt(function(t){this.mdcFoundation&&null!==this.y&&null!==t&&(this.mdcFoundation.setAbsolutePosition(t,this.y),this.mdcFoundation.setAnchorMargin({left:t,top:this.y,right:-t,bottom:this.y}))})],io.prototype,"x",void 0),o([ni({type:Number}),Jt(function(t){this.mdcFoundation&&null!==this.x&&null!==t&&(this.mdcFoundation.setAbsolutePosition(this.x,t),this.mdcFoundation.setAnchorMargin({left:this.x,top:t,right:-this.x,bottom:t}))})],io.prototype,"y",void 0),o([ni({type:Boolean}),Jt(function(t){this.mdcFoundation&&this.mdcFoundation.setQuickOpen(t)})],io.prototype,"quick",void 0),o([ni({type:Boolean,reflect:!0}),Jt(function(t,e){this.onOpenChanged(t,e)})],io.prototype,"open",void 0),o([ni({type:Boolean})],io.prototype,"stayOpenOnBodyClick",void 0),o([si(),Jt(function(t){this.mdcFoundation&&this.mdcFoundation.setAnchorCorner(t)})],io.prototype,"bitwiseCorner",void 0),o([ni({type:String}),Jt(function(t){if(this.mdcFoundation){const e="START"===t||"END"===t,i=null===this.previousMenuCorner,o=!i&&t!==this.previousMenuCorner;e&&(o||i&&"END"===t)&&(this.bitwiseCorner=this.bitwiseCorner^L.RIGHT,this.mdcFoundation.flipCornerHorizontally(),this.previousMenuCorner=t)}})],io.prototype,"menuCorner",void 0),o([ni({type:String}),Jt(function(t){if(this.mdcFoundation&&t){let e=eo[t];"END"===this.menuCorner&&(e^=L.RIGHT),this.bitwiseCorner=e}})],io.prototype,"corner",void 0),o([si()],io.prototype,"styleTop",void 0),o([si()],io.prototype,"styleLeft",void 0),o([si()],io.prototype,"styleRight",void 0),o([si()],io.prototype,"styleBottom",void 0),o([si()],io.prototype,"styleMaxHeight",void 0),o([si()],io.prototype,"styleTransformOrigin",void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const oo=ne`.mdc-menu-surface{display:none;position:absolute;box-sizing:border-box;max-width:calc(100vw - 32px);max-width:var(--mdc-menu-max-width, calc(100vw - 32px));max-height:calc(100vh - 32px);max-height:var(--mdc-menu-max-height, calc(100vh - 32px));margin:0;padding:0;transform:scale(1);transform-origin:top left;opacity:0;overflow:auto;will-change:transform,opacity;z-index:8;transition:opacity .03s linear,transform .12s cubic-bezier(0, 0, 0.2, 1),height 250ms cubic-bezier(0, 0, 0.2, 1);box-shadow:0px 5px 5px -3px rgba(0, 0, 0, 0.2),0px 8px 10px 1px rgba(0, 0, 0, 0.14),0px 3px 14px 2px rgba(0,0,0,.12);background-color:#fff;background-color:var(--mdc-theme-surface, #fff);color:#000;color:var(--mdc-theme-on-surface, #000);border-radius:4px;border-radius:var(--mdc-shape-medium, 4px);transform-origin-left:top left;transform-origin-right:top right}.mdc-menu-surface:focus{outline:none}.mdc-menu-surface--animating-open{display:inline-block;transform:scale(0.8);opacity:0}.mdc-menu-surface--open{display:inline-block;transform:scale(1);opacity:1}.mdc-menu-surface--animating-closed{display:inline-block;opacity:0;transition:opacity .075s linear}[dir=rtl] .mdc-menu-surface,.mdc-menu-surface[dir=rtl]{transform-origin-left:top right;transform-origin-right:top left}.mdc-menu-surface--anchor{position:relative;overflow:visible}.mdc-menu-surface--fixed{position:fixed}.mdc-menu-surface--fullwidth{width:100%}:host(:not([open])){display:none}.mdc-menu-surface{z-index:8;z-index:var(--mdc-menu-z-index, 8);min-width:112px;min-width:var(--mdc-menu-min-width, 112px)}`
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,no=window,so=no.ShadowRoot&&(void 0===no.ShadyCSS||no.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,lo=Symbol(),ro=new WeakMap;let ao=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==lo)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(so&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=ro.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&ro.set(e,t))}return t}toString(){return this.cssText}};const co=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new ao(i,t,lo)},ho=so?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new ao("string"==typeof t?t:t+"",void 0,lo))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var mo;const po=window,uo=po.trustedTypes,fo=uo?uo.emptyScript:"",go=po.reactiveElementPolyfillSupport,vo={toAttribute(t,e){switch(e){case Boolean:t=t?fo:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_o=(t,e)=>e!==t&&(e==e||t==t),bo={attribute:!0,type:String,converter:vo,reflect:!1,hasChanged:_o},xo="finalized";let yo=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const o=this._$Ep(i,e);void 0!==o&&(this._$Ev.set(o,i),t.push(o))}),t}static createProperty(t,e=bo){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const n=this[t];this[e]=o,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||bo}static finalize(){if(this.hasOwnProperty(xo))return!1;this[xo]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(ho(t))}else void 0!==t&&e.push(ho(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{so?t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(e=>{const i=document.createElement("style"),o=no.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=e.cssText,t.appendChild(i)})})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=bo){var o;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:vo).toAttribute(e,i.type);this._$El=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$El=null}}_$AK(t,e){var i;const o=this.constructor,n=o._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=o.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:vo;this._$El=n,this[n]=s.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let o=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||_o)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var $o;yo[xo]=!0,yo.elementProperties=new Map,yo.elementStyles=[],yo.shadowRootOptions={mode:"open"},null==go||go({ReactiveElement:yo}),(null!==(mo=po.reactiveElementVersions)&&void 0!==mo?mo:po.reactiveElementVersions=[]).push("1.6.3");const Ao=window,wo=Ao.trustedTypes,Eo=wo?wo.createPolicy("lit-html",{createHTML:t=>t}):void 0,Co="$lit$",So=`lit$${(Math.random()+"").slice(9)}$`,Oo="?"+So,Io=`<${Oo}>`,To=document,ko=()=>To.createComment(""),Ro=t=>null===t||"object"!=typeof t&&"function"!=typeof t,Lo=Array.isArray,No="[ \t\n\f\r]",jo=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Mo=/-->/g,Po=/>/g,Fo=RegExp(`>|${No}(?:([^\\s"'>=/]+)(${No}*=${No}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),zo=/'/g,Ho=/"/g,Uo=/^(?:script|style|textarea|title)$/i,Do=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),Bo=Symbol.for("lit-noChange"),Vo=Symbol.for("lit-nothing"),Go=new WeakMap,Wo=To.createTreeWalker(To,129,null,!1);function Xo(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==Eo?Eo.createHTML(e):e}let qo=class t{constructor({strings:e,_$litType$:i},o){let n;this.parts=[];let s=0,l=0;const r=e.length-1,d=this.parts,[a,c]=((t,e)=>{const i=t.length-1,o=[];let n,s=2===e?"<svg>":"",l=jo;for(let e=0;e<i;e++){const i=t[e];let r,d,a=-1,c=0;for(;c<i.length&&(l.lastIndex=c,d=l.exec(i),null!==d);)c=l.lastIndex,l===jo?"!--"===d[1]?l=Mo:void 0!==d[1]?l=Po:void 0!==d[2]?(Uo.test(d[2])&&(n=RegExp("</"+d[2],"g")),l=Fo):void 0!==d[3]&&(l=Fo):l===Fo?">"===d[0]?(l=null!=n?n:jo,a=-1):void 0===d[1]?a=-2:(a=l.lastIndex-d[2].length,r=d[1],l=void 0===d[3]?Fo:'"'===d[3]?Ho:zo):l===Ho||l===zo?l=Fo:l===Mo||l===Po?l=jo:(l=Fo,n=void 0);const h=l===Fo&&t[e+1].startsWith("/>")?" ":"";s+=l===jo?i+Io:a>=0?(o.push(r),i.slice(0,a)+Co+i.slice(a)+So+h):i+So+(-2===a?(o.push(void 0),e):h)}return[Xo(t,s+(t[i]||"<?>")+(2===e?"</svg>":"")),o]})(e,i);if(this.el=t.createElement(a,o),Wo.currentNode=this.el.content,2===i){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(n=Wo.nextNode())&&d.length<r;){if(1===n.nodeType){if(n.hasAttributes()){const t=[];for(const e of n.getAttributeNames())if(e.endsWith(Co)||e.startsWith(So)){const i=c[l++];if(t.push(e),void 0!==i){const t=n.getAttribute(i.toLowerCase()+Co).split(So),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?Qo:"?"===e[1]?en:"@"===e[1]?on:Jo})}else d.push({type:6,index:s})}for(const e of t)n.removeAttribute(e)}if(Uo.test(n.tagName)){const t=n.textContent.split(So),e=t.length-1;if(e>0){n.textContent=wo?wo.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],ko()),Wo.nextNode(),d.push({type:2,index:++s});n.append(t[e],ko())}}}else if(8===n.nodeType)if(n.data===Oo)d.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(So,t+1));)d.push({type:7,index:s}),t+=So.length-1}s++}}static createElement(t,e){const i=To.createElement("template");return i.innerHTML=t,i}};function Yo(t,e,i=t,o){var n,s,l,r;if(e===Bo)return e;let d=void 0!==o?null===(n=i._$Co)||void 0===n?void 0:n[o]:i._$Cl;const a=Ro(e)?void 0:e._$litDirective$;return(null==d?void 0:d.constructor)!==a&&(null===(s=null==d?void 0:d._$AO)||void 0===s||s.call(d,!1),void 0===a?d=void 0:(d=new a(t),d._$AT(t,i,o)),void 0!==o?(null!==(l=(r=i)._$Co)&&void 0!==l?l:r._$Co=[])[o]=d:i._$Cl=d),void 0!==d&&(e=Yo(t,d._$AS(t,e.values),d,o)),e}let Ko=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:o}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:To).importNode(i,!0);Wo.currentNode=n;let s=Wo.nextNode(),l=0,r=0,d=o[0];for(;void 0!==d;){if(l===d.index){let e;2===d.type?e=new Zo(s,s.nextSibling,this,t):1===d.type?e=new d.ctor(s,d.name,d.strings,this,t):6===d.type&&(e=new nn(s,this,t)),this._$AV.push(e),d=o[++r]}l!==(null==d?void 0:d.index)&&(s=Wo.nextNode(),l++)}return Wo.currentNode=To,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},Zo=class t{constructor(t,e,i,o){var n;this.type=2,this._$AH=Vo,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cp=null===(n=null==o?void 0:o.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Yo(this,t,e),Ro(t)?t===Vo||null==t||""===t?(this._$AH!==Vo&&this._$AR(),this._$AH=Vo):t!==this._$AH&&t!==Bo&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>Lo(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==Vo&&Ro(this._$AH)?this._$AA.nextSibling.data=t:this.$(To.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:o}=t,n="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=qo.createElement(Xo(o.h,o.h[0]),this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new Ko(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=Go.get(t.strings);return void 0===e&&Go.set(t.strings,e=new qo(t)),e}T(e){Lo(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let o,n=0;for(const s of e)n===i.length?i.push(o=new t(this.k(ko()),this.k(ko()),this,this.options)):o=i[n],o._$AI(s),n++;n<i.length&&(this._$AR(o&&o._$AB.nextSibling,n),i.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}},Jo=class{constructor(t,e,i,o,n){this.type=1,this._$AH=Vo,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Vo}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,o){const n=this.strings;let s=!1;if(void 0===n)t=Yo(this,t,e,0),s=!Ro(t)||t!==this._$AH&&t!==Bo,s&&(this._$AH=t);else{const o=t;let l,r;for(t=n[0],l=0;l<n.length-1;l++)r=Yo(this,o[i+l],e,l),r===Bo&&(r=this._$AH[l]),s||(s=!Ro(r)||r!==this._$AH[l]),r===Vo?t=Vo:t!==Vo&&(t+=(null!=r?r:"")+n[l+1]),this._$AH[l]=r}s&&!o&&this.j(t)}j(t){t===Vo?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}},Qo=class extends Jo{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Vo?void 0:t}};const tn=wo?wo.emptyScript:"";let en=class extends Jo{constructor(){super(...arguments),this.type=4}j(t){t&&t!==Vo?this.element.setAttribute(this.name,tn):this.element.removeAttribute(this.name)}},on=class extends Jo{constructor(t,e,i,o,n){super(t,e,i,o,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=Yo(this,t,e,0))&&void 0!==i?i:Vo)===Bo)return;const o=this._$AH,n=t===Vo&&o!==Vo||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==Vo&&(o===Vo||n);n&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}},nn=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Yo(this,t)}};const sn=Ao.litHtmlPolyfillSupport;null==sn||sn(qo,Zo),(null!==($o=Ao.litHtmlVersions)&&void 0!==$o?$o:Ao.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ln,rn;let dn=class extends yo{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var o,n;const s=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:e;let l=s._$litPart$;if(void 0===l){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;s._$litPart$=l=new Zo(e.insertBefore(ko(),t),t,void 0,null!=i?i:{})}return l._$AI(t),l})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return Bo}};dn.finalized=!0,dn._$litElement$=!0,null===(ln=globalThis.litElementHydrateSupport)||void 0===ln||ln.call(globalThis,{LitElement:dn});const an=globalThis.litElementPolyfillSupport;null==an||an({LitElement:dn}),(null!==(rn=globalThis.litElementVersions)&&void 0!==rn?rn:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const cn=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function hn(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):cn(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function mn(t){return hn({...t,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pn=({finisher:t,descriptor:e})=>(i,o)=>{var n;if(void 0===o){const o=null!==(n=i.originalKey)&&void 0!==n?n:i.key,s=null!=e?{kind:"method",placement:"prototype",key:o,descriptor:e(i.key)}:{...i,key:o};return null!=t&&(s.finisher=function(e){t(e,o)}),s}{const n=i.constructor;void 0!==e&&Object.defineProperty(i,o,e(o)),null==t||t(n,o)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function un(t,e){return pn({descriptor:e=>{const i={get(){var e,i;return null!==(i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==i?i:null},enumerable:!0,configurable:!0};return i}})}
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
var fn;const gn=null!=(null===(fn=window.HTMLSlotElement)||void 0===fn?void 0:fn.prototype.assignedElements)?(t,e)=>t.assignedElements(e):(t,e)=>t.assignedNodes(e).filter(t=>t.nodeType===Node.ELEMENT_NODE);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function vn(t,e,i){let o;return o={flatten:e},i?function(t){const{slot:e,selector:i}=null!=t?t:{};return pn({descriptor:o=>({get(){var o;const n="slot"+(e?`[name=${e}]`:":not([name])"),s=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(n),l=null!=s?gn(s,t):[];return i?l.filter(t=>t.matches(i)):l},enumerable:!0,configurable:!0})})}({slot:t,flatten:e,selector:i}):pn({descriptor:t=>({get(){var t,e;const i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector("slot:not([name])");return null!==(e=null==i?void 0:i.assignedNodes(o))&&void 0!==e?e:[]},enumerable:!0,configurable:!0})})}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _n=t=>null!=t?t:Vo;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const bn=t=>t.hasAttribute("mwc-list-item");function xn(){const t=this.itemsReadyResolver;this.itemsReady=new Promise(t=>this.itemsReadyResolver=t),t()}class yn extends Zt{constructor(){super(),this.mdcAdapter=null,this.mdcFoundationClass=Yi,this.activatable=!1,this.multi=!1,this.wrapFocus=!1,this.itemRoles=null,this.innerRole=null,this.innerAriaLabel=null,this.rootTabbable=!1,this.previousTabindex=null,this.noninteractive=!1,this.itemsReadyResolver=()=>{},this.itemsReady=Promise.resolve([]),this.items_=[];const t=function(t,e=50){let i;return function(o=!0){clearTimeout(i),i=setTimeout(()=>{t(o)},e)}}(this.layout.bind(this));this.debouncedLayout=(e=!0)=>{xn.call(this),t(e)}}async getUpdateComplete(){const t=await super.getUpdateComplete();return await this.itemsReady,t}get items(){return this.items_}updateItems(){var t;const e=null!==(t=this.assignedElements)&&void 0!==t?t:[],i=[];for(const t of e)bn(t)&&(i.push(t),t._managingList=this),t.hasAttribute("divider")&&!t.hasAttribute("role")&&t.setAttribute("role","separator");this.items_=i;const o=new Set;if(this.items_.forEach((t,e)=>{this.itemRoles?t.setAttribute("role",this.itemRoles):t.removeAttribute("role"),t.selected&&o.add(e)}),this.multi)this.select(o);else{const t=o.size?o.entries().next().value[1]:-1;this.select(t)}const n=new Event("items-updated",{bubbles:!0,composed:!0});this.dispatchEvent(n)}get selected(){const t=this.index;if(!Xi(t))return-1===t?null:this.items[t];const e=[];for(const i of t)e.push(this.items[i]);return e}get index(){return this.mdcFoundation?this.mdcFoundation.getSelectedIndex():-1}render(){const t=null===this.innerRole?void 0:this.innerRole,e=null===this.innerAriaLabel?void 0:this.innerAriaLabel,i=this.rootTabbable?"0":"-1";return Do`
      <!-- @ts-ignore -->
      <ul
          tabindex=${i}
          role="${_n(t)}"
          aria-label="${_n(e)}"
          class="mdc-deprecated-list"
          @keydown=${this.onKeydown}
          @focusin=${this.onFocusIn}
          @focusout=${this.onFocusOut}
          @request-selected=${this.onRequestSelected}
          @list-item-rendered=${this.onListItemConnected}>
        <slot></slot>
        ${this.renderPlaceholder()}
      </ul>
    `}renderPlaceholder(){var t;const e=null!==(t=this.assignedElements)&&void 0!==t?t:[];return void 0!==this.emptyMessage&&0===e.length?Do`
        <mwc-list-item noninteractive>${this.emptyMessage}</mwc-list-item>
      `:null}firstUpdated(){super.firstUpdated(),this.items.length||(this.mdcFoundation.setMulti(this.multi),this.layout())}onFocusIn(t){if(this.mdcFoundation&&this.mdcRoot){const e=this.getIndexOfTarget(t);this.mdcFoundation.handleFocusIn(t,e)}}onFocusOut(t){if(this.mdcFoundation&&this.mdcRoot){const e=this.getIndexOfTarget(t);this.mdcFoundation.handleFocusOut(t,e)}}onKeydown(t){if(this.mdcFoundation&&this.mdcRoot){const e=this.getIndexOfTarget(t),i=t.target,o=bn(i);this.mdcFoundation.handleKeydown(t,o,e)}}onRequestSelected(t){if(this.mdcFoundation){let e=this.getIndexOfTarget(t);if(-1===e&&(this.layout(),e=this.getIndexOfTarget(t),-1===e))return;if(this.items[e].disabled)return;const i=t.detail.selected,o=t.detail.source;this.mdcFoundation.handleSingleSelection(e,"interaction"===o,i),t.stopPropagation()}}getIndexOfTarget(t){const e=this.items,i=t.composedPath();for(const t of i){let i=-1;if(Gt(t)&&bn(t)&&(i=e.indexOf(t)),-1!==i)return i}return-1}createAdapter(){return this.mdcAdapter={getListItemCount:()=>this.mdcRoot?this.items.length:0,getFocusedElementIndex:this.getFocusedItemIndex,getAttributeForElementIndex:(t,e)=>{if(!this.mdcRoot)return"";const i=this.items[t];return i?i.getAttribute(e):""},setAttributeForElementIndex:(t,e,i)=>{if(!this.mdcRoot)return;const o=this.items[t];o&&o.setAttribute(e,i)},focusItemAtIndex:t=>{const e=this.items[t];e&&e.focus()},setTabIndexForElementIndex:(t,e)=>{const i=this.items[t];i&&(i.tabindex=e)},notifyAction:t=>{const e={bubbles:!0,composed:!0};e.detail={index:t};const i=new CustomEvent("action",e);this.dispatchEvent(i)},notifySelected:(t,e)=>{const i={bubbles:!0,composed:!0};i.detail={index:t,diff:e};const o=new CustomEvent("selected",i);this.dispatchEvent(o)},isFocusInsideList:()=>Kt(this),isRootFocused:()=>{const t=this.mdcRoot;return t.getRootNode().activeElement===t},setDisabledStateForElementIndex:(t,e)=>{const i=this.items[t];i&&(i.disabled=e)},getDisabledStateForElementIndex:t=>{const e=this.items[t];return!!e&&e.disabled},setSelectedStateForElementIndex:(t,e)=>{const i=this.items[t];i&&(i.selected=e)},getSelectedStateForElementIndex:t=>{const e=this.items[t];return!!e&&e.selected},setActivatedStateForElementIndex:(t,e)=>{const i=this.items[t];i&&(i.activated=e)}},this.mdcAdapter}selectUi(t,e=!1){const i=this.items[t];i&&(i.selected=!0,i.activated=e)}deselectUi(t){const e=this.items[t];e&&(e.selected=!1,e.activated=!1)}select(t){this.mdcFoundation&&this.mdcFoundation.setSelectedIndex(t)}toggle(t,e){this.multi&&this.mdcFoundation.toggleMultiAtIndex(t,e)}onListItemConnected(t){const e=t.target;this.layout(-1===this.items.indexOf(e))}layout(t=!0){t&&this.updateItems();const e=this.items[0];for(const t of this.items)t.tabindex=-1;e&&(this.noninteractive?this.previousTabindex||(this.previousTabindex=e):e.tabindex=0),this.itemsReadyResolver()}getFocusedItemIndex(){if(!this.mdcRoot)return-1;if(!this.items.length)return-1;const t=Yt();if(!t.length)return-1;for(let e=t.length-1;e>=0;e--){const i=t[e];if(bn(i))return this.items.indexOf(i)}return-1}focusItemAtIndex(t){for(const t of this.items)if(0===t.tabindex){t.tabindex=-1;break}this.items[t].tabindex=0,this.items[t].focus()}focus(){const t=this.mdcRoot;t&&t.focus()}blur(){const t=this.mdcRoot;t&&t.blur()}}o([hn({type:String})],yn.prototype,"emptyMessage",void 0),o([un(".mdc-deprecated-list")],yn.prototype,"mdcRoot",void 0),o([vn("",!0,"*")],yn.prototype,"assignedElements",void 0),o([vn("",!0,'[tabindex="0"]')],yn.prototype,"tabbableElements",void 0),o([hn({type:Boolean}),Jt(function(t){this.mdcFoundation&&this.mdcFoundation.setUseActivatedClass(t)})],yn.prototype,"activatable",void 0),o([hn({type:Boolean}),Jt(function(t,e){this.mdcFoundation&&this.mdcFoundation.setMulti(t),void 0!==e&&this.layout()})],yn.prototype,"multi",void 0),o([hn({type:Boolean}),Jt(function(t){this.mdcFoundation&&this.mdcFoundation.setWrapFocus(t)})],yn.prototype,"wrapFocus",void 0),o([hn({type:String}),Jt(function(t,e){void 0!==e&&this.updateItems()})],yn.prototype,"itemRoles",void 0),o([hn({type:String})],yn.prototype,"innerRole",void 0),o([hn({type:String})],yn.prototype,"innerAriaLabel",void 0),o([hn({type:Boolean})],yn.prototype,"rootTabbable",void 0),o([hn({type:Boolean,reflect:!0}),Jt(function(t){var e,i;if(t){const t=null!==(i=null===(e=this.tabbableElements)||void 0===e?void 0:e[0])&&void 0!==i?i:null;this.previousTabindex=t,t&&t.setAttribute("tabindex","-1")}else!t&&this.previousTabindex&&(this.previousTabindex.setAttribute("tabindex","0"),this.previousTabindex=null)})],yn.prototype,"noninteractive",void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const $n=co`@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}:host{display:block}.mdc-deprecated-list{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);line-height:1.5rem;margin:0;padding:8px 0;list-style-type:none;color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));padding:var(--mdc-list-vertical-padding, 8px) 0}.mdc-deprecated-list:focus{outline:none}.mdc-deprecated-list-item{height:48px}.mdc-deprecated-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-deprecated-list ::slotted([divider]){height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid;border-bottom-color:rgba(0, 0, 0, 0.12)}.mdc-deprecated-list ::slotted([divider][padded]){margin:0 var(--mdc-list-side-padding, 16px)}.mdc-deprecated-list ::slotted([divider][inset]){margin-left:var(--mdc-list-inset-margin, 72px);margin-right:0;width:calc( 100% - var(--mdc-list-inset-margin, 72px) )}[dir=rtl] .mdc-deprecated-list ::slotted([divider][inset]),.mdc-deprecated-list ::slotted([divider][inset][dir=rtl]){margin-left:0;margin-right:var(--mdc-list-inset-margin, 72px)}.mdc-deprecated-list ::slotted([divider][inset][padded]){width:calc( 100% - var(--mdc-list-inset-margin, 72px) - var(--mdc-list-side-padding, 16px) )}.mdc-deprecated-list--dense ::slotted([mwc-list-item]){height:40px}.mdc-deprecated-list--dense ::slotted([mwc-list]){--mdc-list-item-graphic-size: 20px}.mdc-deprecated-list--two-line.mdc-deprecated-list--dense ::slotted([mwc-list-item]),.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense ::slotted([mwc-list-item]){height:60px}.mdc-deprecated-list--avatar-list.mdc-deprecated-list--dense ::slotted([mwc-list]){--mdc-list-item-graphic-size: 36px}:host([noninteractive]){pointer-events:none;cursor:default}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text){display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text)::before{display:inline-block;width:0;height:24px;content:"";vertical-align:0}.mdc-deprecated-list--dense ::slotted(.mdc-deprecated-list-item__primary-text)::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}`
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,An=1;let wn=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const En=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends wn{constructor(t){var e;if(super(t),t.type!==An||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var i,o;if(void 0===this.it){this.it=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!(null===(i=this.nt)||void 0===i?void 0:i.has(t))&&this.it.add(t);return this.render(e)}const n=t.element.classList;this.it.forEach(t=>{t in e||(n.remove(t),this.it.delete(t))});for(const t in e){const i=!!e[t];i===this.it.has(t)||(null===(o=this.nt)||void 0===o?void 0:o.has(t))||(i?(n.add(t),this.it.add(t)):(n.remove(t),this.it.delete(t)))}return Bo}});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Cn extends dn{constructor(){super(...arguments),this.value="",this.group=null,this.tabindex=-1,this.disabled=!1,this.twoline=!1,this.activated=!1,this.graphic=null,this.multipleGraphics=!1,this.hasMeta=!1,this.noninteractive=!1,this.selected=!1,this.shouldRenderRipple=!1,this._managingList=null,this.boundOnClick=this.onClick.bind(this),this._firstChanged=!0,this._skipPropRequest=!1,this.rippleHandlers=new n(()=>(this.shouldRenderRipple=!0,this.ripple)),this.listeners=[{target:this,eventNames:["click"],cb:()=>{this.onClick()}},{target:this,eventNames:["mouseenter"],cb:this.rippleHandlers.startHover},{target:this,eventNames:["mouseleave"],cb:this.rippleHandlers.endHover},{target:this,eventNames:["focus"],cb:this.rippleHandlers.startFocus},{target:this,eventNames:["blur"],cb:this.rippleHandlers.endFocus},{target:this,eventNames:["mousedown","touchstart"],cb:t=>{const e=t.type;this.onDown("mousedown"===e?"mouseup":"touchend",t)}}]}get text(){const t=this.textContent;return t?t.trim():""}render(){const t=this.renderText(),e=this.graphic?this.renderGraphic():Do``,i=this.hasMeta?this.renderMeta():Do``;return Do`
      ${this.renderRipple()}
      ${e}
      ${t}
      ${i}`}renderRipple(){return this.shouldRenderRipple?Do`
      <mwc-ripple
        .activated=${this.activated}>
      </mwc-ripple>`:this.activated?Do`<div class="fake-activated-ripple"></div>`:""}renderGraphic(){const t={multi:this.multipleGraphics};return Do`
      <span class="mdc-deprecated-list-item__graphic material-icons ${En(t)}">
        <slot name="graphic"></slot>
      </span>`}renderMeta(){return Do`
      <span class="mdc-deprecated-list-item__meta material-icons">
        <slot name="meta"></slot>
      </span>`}renderText(){const t=this.twoline?this.renderTwoline():this.renderSingleLine();return Do`
      <span class="mdc-deprecated-list-item__text">
        ${t}
      </span>`}renderSingleLine(){return Do`<slot></slot>`}renderTwoline(){return Do`
      <span class="mdc-deprecated-list-item__primary-text">
        <slot></slot>
      </span>
      <span class="mdc-deprecated-list-item__secondary-text">
        <slot name="secondary"></slot>
      </span>
    `}onClick(){this.fireRequestSelected(!this.selected,"interaction")}onDown(t,e){const i=()=>{window.removeEventListener(t,i),this.rippleHandlers.endPress()};window.addEventListener(t,i),this.rippleHandlers.startPress(e)}fireRequestSelected(t,e){if(this.noninteractive)return;const i=new CustomEvent("request-selected",{bubbles:!0,composed:!0,detail:{source:e,selected:t}});this.dispatchEvent(i)}connectedCallback(){super.connectedCallback(),this.noninteractive||this.setAttribute("mwc-list-item","");for(const t of this.listeners)for(const e of t.eventNames)t.target.addEventListener(e,t.cb,{passive:!0})}disconnectedCallback(){super.disconnectedCallback();for(const t of this.listeners)for(const e of t.eventNames)t.target.removeEventListener(e,t.cb);this._managingList&&(this._managingList.debouncedLayout?this._managingList.debouncedLayout(!0):this._managingList.layout(!0))}firstUpdated(){const t=new Event("list-item-rendered",{bubbles:!0,composed:!0});this.dispatchEvent(t)}}o([un("slot")],Cn.prototype,"slotElement",void 0),o([function(t){return pn({descriptor:e=>({async get(){var e;return await this.updateComplete,null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t)},enumerable:!0,configurable:!0})})}("mwc-ripple")],Cn.prototype,"ripple",void 0),o([hn({type:String})],Cn.prototype,"value",void 0),o([hn({type:String,reflect:!0})],Cn.prototype,"group",void 0),o([hn({type:Number,reflect:!0})],Cn.prototype,"tabindex",void 0),o([hn({type:Boolean,reflect:!0}),Jt(function(t){t?this.setAttribute("aria-disabled","true"):this.setAttribute("aria-disabled","false")})],Cn.prototype,"disabled",void 0),o([hn({type:Boolean,reflect:!0})],Cn.prototype,"twoline",void 0),o([hn({type:Boolean,reflect:!0})],Cn.prototype,"activated",void 0),o([hn({type:String,reflect:!0})],Cn.prototype,"graphic",void 0),o([hn({type:Boolean})],Cn.prototype,"multipleGraphics",void 0),o([hn({type:Boolean})],Cn.prototype,"hasMeta",void 0),o([hn({type:Boolean,reflect:!0}),Jt(function(t){t?(this.removeAttribute("aria-checked"),this.removeAttribute("mwc-list-item"),this.selected=!1,this.activated=!1,this.tabIndex=-1):this.setAttribute("mwc-list-item","")})],Cn.prototype,"noninteractive",void 0),o([hn({type:Boolean,reflect:!0}),Jt(function(t){const e=this.getAttribute("role"),i="gridcell"===e||"option"===e||"row"===e||"tab"===e;i&&t?this.setAttribute("aria-selected","true"):i&&this.setAttribute("aria-selected","false"),this._firstChanged?this._firstChanged=!1:this._skipPropRequest||this.fireRequestSelected(t,"property")})],Cn.prototype,"selected",void 0),o([mn()],Cn.prototype,"shouldRenderRipple",void 0),o([mn()],Cn.prototype,"_managingList",void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const Sn=co`:host{cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;height:48px;display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;padding-left:var(--mdc-list-side-padding, 16px);padding-right:var(--mdc-list-side-padding, 16px);outline:none;height:48px;color:rgba(0,0,0,.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}:host:focus{outline:none}:host([activated]){color:#6200ee;color:var(--mdc-theme-primary, #6200ee);--mdc-ripple-color: var( --mdc-theme-primary, #6200ee )}:host([activated]) .mdc-deprecated-list-item__graphic{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host([activated]) .fake-activated-ripple::before{position:absolute;display:block;top:0;bottom:0;left:0;right:0;width:100%;height:100%;pointer-events:none;z-index:1;content:"";opacity:0.12;opacity:var(--mdc-ripple-activated-opacity, 0.12);background-color:#6200ee;background-color:var(--mdc-ripple-color, var(--mdc-theme-primary, #6200ee))}.mdc-deprecated-list-item__graphic{flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;display:inline-flex}.mdc-deprecated-list-item__graphic ::slotted(*){flex-shrink:0;align-items:center;justify-content:center;fill:currentColor;width:100%;height:100%;text-align:center}.mdc-deprecated-list-item__meta{width:var(--mdc-list-item-meta-size, 24px);height:var(--mdc-list-item-meta-size, 24px);margin-left:auto;margin-right:0;color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-item__meta.multi{width:auto}.mdc-deprecated-list-item__meta ::slotted(*){width:var(--mdc-list-item-meta-size, 24px);line-height:var(--mdc-list-item-meta-size, 24px)}.mdc-deprecated-list-item__meta ::slotted(.material-icons),.mdc-deprecated-list-item__meta ::slotted(mwc-icon){line-height:var(--mdc-list-item-meta-size, 24px) !important}.mdc-deprecated-list-item__meta ::slotted(:not(.material-icons):not(mwc-icon)){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit)}[dir=rtl] .mdc-deprecated-list-item__meta,.mdc-deprecated-list-item__meta[dir=rtl]{margin-left:0;margin-right:auto}.mdc-deprecated-list-item__meta ::slotted(*){width:100%;height:100%}.mdc-deprecated-list-item__text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mdc-deprecated-list-item__text ::slotted([for]),.mdc-deprecated-list-item__text[for]{pointer-events:none}.mdc-deprecated-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;margin-bottom:-20px;display:block}.mdc-deprecated-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-deprecated-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-deprecated-list-item__secondary-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;line-height:normal;display:block}.mdc-deprecated-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-deprecated-list--dense .mdc-deprecated-list-item__secondary-text{font-size:inherit}* ::slotted(a),a{color:inherit;text-decoration:none}:host([twoline]){height:72px}:host([twoline]) .mdc-deprecated-list-item__text{align-self:flex-start}:host([disabled]),:host([noninteractive]){cursor:default;pointer-events:none}:host([disabled]) .mdc-deprecated-list-item__text ::slotted(*){opacity:.38}:host([disabled]) .mdc-deprecated-list-item__text ::slotted(*),:host([disabled]) .mdc-deprecated-list-item__primary-text ::slotted(*),:host([disabled]) .mdc-deprecated-list-item__secondary-text ::slotted(*){color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-deprecated-list-item__secondary-text ::slotted(*){color:rgba(0, 0, 0, 0.54);color:var(--mdc-theme-text-secondary-on-background, rgba(0, 0, 0, 0.54))}.mdc-deprecated-list-item__graphic ::slotted(*){background-color:transparent;color:rgba(0, 0, 0, 0.38);color:var(--mdc-theme-text-icon-on-background, rgba(0, 0, 0, 0.38))}.mdc-deprecated-list-group__subheader ::slotted(*){color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 40px);height:var(--mdc-list-item-graphic-size, 40px)}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 40px);line-height:var(--mdc-list-item-graphic-size, 40px)}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 40px) !important}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic ::slotted(*){border-radius:50%}:host([graphic=avatar]) .mdc-deprecated-list-item__graphic,:host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic,:host([graphic=control]) .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:var(--mdc-list-item-graphic-margin, 16px)}[dir=rtl] :host([graphic=avatar]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=medium]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=large]) .mdc-deprecated-list-item__graphic,[dir=rtl] :host([graphic=control]) .mdc-deprecated-list-item__graphic,:host([graphic=avatar]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=medium]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=large]) .mdc-deprecated-list-item__graphic[dir=rtl],:host([graphic=control]) .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:var(--mdc-list-item-graphic-margin, 16px);margin-right:0}:host([graphic=icon]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 24px);height:var(--mdc-list-item-graphic-size, 24px);margin-left:0;margin-right:var(--mdc-list-item-graphic-margin, 32px)}:host([graphic=icon]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 24px);line-height:var(--mdc-list-item-graphic-size, 24px)}:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=icon]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 24px) !important}[dir=rtl] :host([graphic=icon]) .mdc-deprecated-list-item__graphic,:host([graphic=icon]) .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:var(--mdc-list-item-graphic-margin, 32px);margin-right:0}:host([graphic=avatar]:not([twoLine])),:host([graphic=icon]:not([twoLine])){height:56px}:host([graphic=medium]:not([twoLine])),:host([graphic=large]:not([twoLine])){height:72px}:host([graphic=medium]) .mdc-deprecated-list-item__graphic,:host([graphic=large]) .mdc-deprecated-list-item__graphic{width:var(--mdc-list-item-graphic-size, 56px);height:var(--mdc-list-item-graphic-size, 56px)}:host([graphic=medium]) .mdc-deprecated-list-item__graphic.multi,:host([graphic=large]) .mdc-deprecated-list-item__graphic.multi{width:auto}:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(*),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(*){width:var(--mdc-list-item-graphic-size, 56px);line-height:var(--mdc-list-item-graphic-size, 56px)}:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=medium]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(.material-icons),:host([graphic=large]) .mdc-deprecated-list-item__graphic ::slotted(mwc-icon){line-height:var(--mdc-list-item-graphic-size, 56px) !important}:host([graphic=large]){padding-left:0px}`;function On(t,e,i){customElements.get(t)||customElements.define(t,class extends e{static get styles(){return i}})}On("mwc-menu-surface",io,oo),On("mwc-list-item",Cn,Sn),On("mwc-list",yn,$n),On("mwc-menu",Ki,Zi);
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
var In={ROOT:"mdc-form-field"},Tn={LABEL_SELECTOR:".mdc-form-field > label"},kn=function(i){function o(t){var n=i.call(this,e(e({},o.defaultAdapter),t))||this;return n.click=function(){n.handleClick()},n}return t(o,i),Object.defineProperty(o,"cssClasses",{get:function(){return In},enumerable:!1,configurable:!0}),Object.defineProperty(o,"strings",{get:function(){return Tn},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{activateInputRipple:function(){},deactivateInputRipple:function(){},deregisterInteractionHandler:function(){},registerInteractionHandler:function(){}}},enumerable:!1,configurable:!0}),o.prototype.init=function(){this.adapter.registerInteractionHandler("click",this.click)},o.prototype.destroy=function(){this.adapter.deregisterInteractionHandler("click",this.click)},o.prototype.handleClick=function(){var t=this;this.adapter.activateInputRipple(),requestAnimationFrame(function(){t.adapter.deactivateInputRipple()})},o}(E);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rn=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Ln,Nn,jn;null===(Ln=window.HTMLSlotElement)||void 0===Ln||Ln.prototype.assignedElements;const Mn=null!==(jn=null===(Nn=window.ShadyDOM)||void 0===Nn?void 0:Nn.inUse)&&void 0!==jn&&jn;class Pn extends Zt{constructor(){super(...arguments),this.disabled=!1,this.containingForm=null,this.formDataListener=t=>{this.disabled||this.setFormData(t.formData)}}findFormElement(){if(!this.shadowRoot||Mn)return null;const t=this.getRootNode().querySelectorAll("form");for(const e of Array.from(t))if(e.contains(this))return e;return null}connectedCallback(){var t;super.connectedCallback(),this.containingForm=this.findFormElement(),null===(t=this.containingForm)||void 0===t||t.addEventListener("formdata",this.formDataListener)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this.containingForm)||void 0===t||t.removeEventListener("formdata",this.formDataListener),this.containingForm=null}click(){this.formElement&&!this.disabled&&(this.formElement.focus(),this.formElement.click())}firstUpdated(){super.firstUpdated(),this.shadowRoot&&this.mdcRoot.addEventListener("change",t=>{this.dispatchEvent(new Event("change",t))})}}Pn.shadowRootOptions={mode:"open",delegatesFocus:!0},o([function(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Rn(t,e)}({type:Boolean})],Pn.prototype,"disabled",void 0);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Fn=window,zn=Fn.ShadowRoot&&(void 0===Fn.ShadyCSS||Fn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Hn=Symbol(),Un=new WeakMap;let Dn=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Hn)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(zn&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=Un.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Un.set(e,t))}return t}toString(){return this.cssText}};const Bn=zn?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new Dn("string"==typeof t?t:t+"",void 0,Hn))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Vn;const Gn=window,Wn=Gn.trustedTypes,Xn=Wn?Wn.emptyScript:"",qn=Gn.reactiveElementPolyfillSupport,Yn={toAttribute(t,e){switch(e){case Boolean:t=t?Xn:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},Kn=(t,e)=>e!==t&&(e==e||t==t),Zn={attribute:!0,type:String,converter:Yn,reflect:!1,hasChanged:Kn},Jn="finalized";let Qn=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const o=this._$Ep(i,e);void 0!==o&&(this._$Ev.set(o,i),t.push(o))}),t}static createProperty(t,e=Zn){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const n=this[t];this[e]=o,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Zn}static finalize(){if(this.hasOwnProperty(Jn))return!1;this[Jn]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(Bn(t))}else void 0!==t&&e.push(Bn(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{zn?t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(e=>{const i=document.createElement("style"),o=Fn.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=e.cssText,t.appendChild(i)})})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=Zn){var o;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:Yn).toAttribute(e,i.type);this._$El=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$El=null}}_$AK(t,e){var i;const o=this.constructor,n=o._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=o.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:Yn;this._$El=n,this[n]=s.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let o=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||Kn)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ts;Qn[Jn]=!0,Qn.elementProperties=new Map,Qn.elementStyles=[],Qn.shadowRootOptions={mode:"open"},null==qn||qn({ReactiveElement:Qn}),(null!==(Vn=Gn.reactiveElementVersions)&&void 0!==Vn?Vn:Gn.reactiveElementVersions=[]).push("1.6.3");const es=window,is=es.trustedTypes,os=is?is.createPolicy("lit-html",{createHTML:t=>t}):void 0,ns="$lit$",ss=`lit$${(Math.random()+"").slice(9)}$`,ls="?"+ss,rs=`<${ls}>`,ds=document,as=()=>ds.createComment(""),cs=t=>null===t||"object"!=typeof t&&"function"!=typeof t,hs=Array.isArray,ms="[ \t\n\f\r]",ps=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,us=/-->/g,fs=/>/g,gs=RegExp(`>|${ms}(?:([^\\s"'>=/]+)(${ms}*=${ms}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),vs=/'/g,_s=/"/g,bs=/^(?:script|style|textarea|title)$/i,xs=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),ys=Symbol.for("lit-noChange"),$s=Symbol.for("lit-nothing"),As=new WeakMap,ws=ds.createTreeWalker(ds,129,null,!1);function Es(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==os?os.createHTML(e):e}let Cs=class t{constructor({strings:e,_$litType$:i},o){let n;this.parts=[];let s=0,l=0;const r=e.length-1,d=this.parts,[a,c]=((t,e)=>{const i=t.length-1,o=[];let n,s=2===e?"<svg>":"",l=ps;for(let e=0;e<i;e++){const i=t[e];let r,d,a=-1,c=0;for(;c<i.length&&(l.lastIndex=c,d=l.exec(i),null!==d);)c=l.lastIndex,l===ps?"!--"===d[1]?l=us:void 0!==d[1]?l=fs:void 0!==d[2]?(bs.test(d[2])&&(n=RegExp("</"+d[2],"g")),l=gs):void 0!==d[3]&&(l=gs):l===gs?">"===d[0]?(l=null!=n?n:ps,a=-1):void 0===d[1]?a=-2:(a=l.lastIndex-d[2].length,r=d[1],l=void 0===d[3]?gs:'"'===d[3]?_s:vs):l===_s||l===vs?l=gs:l===us||l===fs?l=ps:(l=gs,n=void 0);const h=l===gs&&t[e+1].startsWith("/>")?" ":"";s+=l===ps?i+rs:a>=0?(o.push(r),i.slice(0,a)+ns+i.slice(a)+ss+h):i+ss+(-2===a?(o.push(void 0),e):h)}return[Es(t,s+(t[i]||"<?>")+(2===e?"</svg>":"")),o]})(e,i);if(this.el=t.createElement(a,o),ws.currentNode=this.el.content,2===i){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(n=ws.nextNode())&&d.length<r;){if(1===n.nodeType){if(n.hasAttributes()){const t=[];for(const e of n.getAttributeNames())if(e.endsWith(ns)||e.startsWith(ss)){const i=c[l++];if(t.push(e),void 0!==i){const t=n.getAttribute(i.toLowerCase()+ns).split(ss),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?ks:"?"===e[1]?Ls:"@"===e[1]?Ns:Ts})}else d.push({type:6,index:s})}for(const e of t)n.removeAttribute(e)}if(bs.test(n.tagName)){const t=n.textContent.split(ss),e=t.length-1;if(e>0){n.textContent=is?is.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],as()),ws.nextNode(),d.push({type:2,index:++s});n.append(t[e],as())}}}else if(8===n.nodeType)if(n.data===ls)d.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(ss,t+1));)d.push({type:7,index:s}),t+=ss.length-1}s++}}static createElement(t,e){const i=ds.createElement("template");return i.innerHTML=t,i}};function Ss(t,e,i=t,o){var n,s,l,r;if(e===ys)return e;let d=void 0!==o?null===(n=i._$Co)||void 0===n?void 0:n[o]:i._$Cl;const a=cs(e)?void 0:e._$litDirective$;return(null==d?void 0:d.constructor)!==a&&(null===(s=null==d?void 0:d._$AO)||void 0===s||s.call(d,!1),void 0===a?d=void 0:(d=new a(t),d._$AT(t,i,o)),void 0!==o?(null!==(l=(r=i)._$Co)&&void 0!==l?l:r._$Co=[])[o]=d:i._$Cl=d),void 0!==d&&(e=Ss(t,d._$AS(t,e.values),d,o)),e}let Os=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:o}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:ds).importNode(i,!0);ws.currentNode=n;let s=ws.nextNode(),l=0,r=0,d=o[0];for(;void 0!==d;){if(l===d.index){let e;2===d.type?e=new Is(s,s.nextSibling,this,t):1===d.type?e=new d.ctor(s,d.name,d.strings,this,t):6===d.type&&(e=new js(s,this,t)),this._$AV.push(e),d=o[++r]}l!==(null==d?void 0:d.index)&&(s=ws.nextNode(),l++)}return ws.currentNode=ds,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},Is=class t{constructor(t,e,i,o){var n;this.type=2,this._$AH=$s,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cp=null===(n=null==o?void 0:o.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Ss(this,t,e),cs(t)?t===$s||null==t||""===t?(this._$AH!==$s&&this._$AR(),this._$AH=$s):t!==this._$AH&&t!==ys&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>hs(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==$s&&cs(this._$AH)?this._$AA.nextSibling.data=t:this.$(ds.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:o}=t,n="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=Cs.createElement(Es(o.h,o.h[0]),this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new Os(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=As.get(t.strings);return void 0===e&&As.set(t.strings,e=new Cs(t)),e}T(e){hs(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let o,n=0;for(const s of e)n===i.length?i.push(o=new t(this.k(as()),this.k(as()),this,this.options)):o=i[n],o._$AI(s),n++;n<i.length&&(this._$AR(o&&o._$AB.nextSibling,n),i.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}},Ts=class{constructor(t,e,i,o,n){this.type=1,this._$AH=$s,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=$s}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,o){const n=this.strings;let s=!1;if(void 0===n)t=Ss(this,t,e,0),s=!cs(t)||t!==this._$AH&&t!==ys,s&&(this._$AH=t);else{const o=t;let l,r;for(t=n[0],l=0;l<n.length-1;l++)r=Ss(this,o[i+l],e,l),r===ys&&(r=this._$AH[l]),s||(s=!cs(r)||r!==this._$AH[l]),r===$s?t=$s:t!==$s&&(t+=(null!=r?r:"")+n[l+1]),this._$AH[l]=r}s&&!o&&this.j(t)}j(t){t===$s?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}},ks=class extends Ts{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===$s?void 0:t}};const Rs=is?is.emptyScript:"";let Ls=class extends Ts{constructor(){super(...arguments),this.type=4}j(t){t&&t!==$s?this.element.setAttribute(this.name,Rs):this.element.removeAttribute(this.name)}},Ns=class extends Ts{constructor(t,e,i,o,n){super(t,e,i,o,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=Ss(this,t,e,0))&&void 0!==i?i:$s)===ys)return;const o=this._$AH,n=t===$s&&o!==$s||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==$s&&(o===$s||n);n&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}},js=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Ss(this,t)}};const Ms=es.litHtmlPolyfillSupport;null==Ms||Ms(Cs,Is),(null!==(ts=es.litHtmlVersions)&&void 0!==ts?ts:es.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Ps,Fs;let zs=class extends Qn{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var o,n;const s=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:e;let l=s._$litPart$;if(void 0===l){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;s._$litPart$=l=new Is(e.insertBefore(as(),t),t,void 0,null!=i?i:{})}return l._$AI(t),l})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return ys}};zs.finalized=!0,zs._$litElement$=!0,null===(Ps=globalThis.litElementHydrateSupport)||void 0===Ps||Ps.call(globalThis,{LitElement:zs});const Hs=globalThis.litElementPolyfillSupport;null==Hs||Hs({LitElement:zs}),(null!==(Fs=globalThis.litElementVersions)&&void 0!==Fs?Fs:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Us=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function Ds(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Us(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bs=({finisher:t,descriptor:e})=>(i,o)=>{var n;if(void 0===o){const o=null!==(n=i.originalKey)&&void 0!==n?n:i.key,s=null!=e?{kind:"method",placement:"prototype",key:o,descriptor:e(i.key)}:{...i,key:o};return null!=t&&(s.finisher=function(e){t(e,o)}),s}{const n=i.constructor;void 0!==e&&Object.defineProperty(i,o,e(o)),null==t||t(n,o)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Vs(t,e){return Bs({descriptor:e=>{const i={get(){var e,i;return null!==(i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==i?i:null},enumerable:!0,configurable:!0};return i}})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Gs;const Ws=null!=(null===(Gs=window.HTMLSlotElement)||void 0===Gs?void 0:Gs.prototype.assignedElements)?(t,e)=>t.assignedElements(e):(t,e)=>t.assignedNodes(e).filter(t=>t.nodeType===Node.ELEMENT_NODE);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xs=1;let qs=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ys=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends qs{constructor(t){var e;if(super(t),t.type!==Xs||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var i,o;if(void 0===this.it){this.it=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!(null===(i=this.nt)||void 0===i?void 0:i.has(t))&&this.it.add(t);return this.render(e)}const n=t.element.classList;this.it.forEach(t=>{t in e||(n.remove(t),this.it.delete(t))});for(const t in e){const i=!!e[t];i===this.it.has(t)||(null===(o=this.nt)||void 0===o?void 0:o.has(t))||(i?(n.add(t),this.it.add(t)):(n.remove(t),this.it.delete(t)))}return ys}});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class Ks extends Zt{constructor(){super(...arguments),this.alignEnd=!1,this.spaceBetween=!1,this.nowrap=!1,this.label="",this.mdcFoundationClass=kn}createAdapter(){return{registerInteractionHandler:(t,e)=>{this.labelEl.addEventListener(t,e)},deregisterInteractionHandler:(t,e)=>{this.labelEl.removeEventListener(t,e)},activateInputRipple:async()=>{const t=this.input;if(t instanceof Pn){const e=await t.ripple;e&&e.startPress()}},deactivateInputRipple:async()=>{const t=this.input;if(t instanceof Pn){const e=await t.ripple;e&&e.endPress()}}}}get input(){var t,e;return null!==(e=null===(t=this.slottedInputs)||void 0===t?void 0:t[0])&&void 0!==e?e:null}render(){const t={"mdc-form-field--align-end":this.alignEnd,"mdc-form-field--space-between":this.spaceBetween,"mdc-form-field--nowrap":this.nowrap};return xs`
      <div class="mdc-form-field ${Ys(t)}">
        <slot></slot>
        <label class="mdc-label"
               @click="${this._labelClick}">${this.label}</label>
      </div>`}click(){this._labelClick()}_labelClick(){const t=this.input;t&&(t.focus(),t.click())}}o([Ds({type:Boolean})],Ks.prototype,"alignEnd",void 0),o([Ds({type:Boolean})],Ks.prototype,"spaceBetween",void 0),o([Ds({type:Boolean})],Ks.prototype,"nowrap",void 0),o([Ds({type:String}),Jt(async function(t){var e;null===(e=this.input)||void 0===e||e.setAttribute("aria-label",t)})],Ks.prototype,"label",void 0),o([Vs(".mdc-form-field")],Ks.prototype,"mdcRoot",void 0),o([
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function(t,e,i){let o;return o={flatten:e},i?function(t){const{slot:e,selector:i}=null!=t?t:{};return Bs({descriptor:o=>({get(){var o;const n="slot"+(e?`[name=${e}]`:":not([name])"),s=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(n),l=null!=s?Ws(s,t):[];return i?l.filter(t=>t.matches(i)):l},enumerable:!0,configurable:!0})})}({slot:t,flatten:e,selector:i}):Bs({descriptor:t=>({get(){var t,e;const i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector("slot:not([name])");return null!==(e=null==i?void 0:i.assignedNodes(o))&&void 0!==e?e:[]},enumerable:!0,configurable:!0})})}("",!0,"*")],Ks.prototype,"slottedInputs",void 0),o([Vs("label")],Ks.prototype,"labelEl",void 0);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const Zs=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new Dn(i,t,Hn)})`.mdc-form-field{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87));display:inline-flex;align-items:center;vertical-align:middle}.mdc-form-field>label{margin-left:0;margin-right:auto;padding-left:4px;padding-right:0;order:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{margin-left:auto;margin-right:0}[dir=rtl] .mdc-form-field>label,.mdc-form-field>label[dir=rtl]{padding-left:0;padding-right:4px}.mdc-form-field--nowrap>label{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.mdc-form-field--align-end>label{margin-left:auto;margin-right:0;padding-left:0;padding-right:4px;order:-1}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-form-field--align-end>label,.mdc-form-field--align-end>label[dir=rtl]{padding-left:4px;padding-right:0}.mdc-form-field--space-between{justify-content:space-between}.mdc-form-field--space-between>label{margin:0}[dir=rtl] .mdc-form-field--space-between>label,.mdc-form-field--space-between>label[dir=rtl]{margin:0}:host{display:inline-flex}.mdc-form-field{width:100%}::slotted(*){-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-body2-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.875rem;font-size:var(--mdc-typography-body2-font-size, 0.875rem);line-height:1.25rem;line-height:var(--mdc-typography-body2-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-body2-font-weight, 400);letter-spacing:0.0178571429em;letter-spacing:var(--mdc-typography-body2-letter-spacing, 0.0178571429em);text-decoration:inherit;text-decoration:var(--mdc-typography-body2-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-body2-text-transform, inherit);color:rgba(0, 0, 0, 0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0, 0, 0, 0.87))}::slotted(mwc-switch){margin-right:10px}[dir=rtl] ::slotted(mwc-switch),::slotted(mwc-switch[dir=rtl]){margin-left:10px}`;let Js=class extends Ks{static get styles(){return Zs}};Js=o([s("floor3d-formfield")],Js);
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
var Qs=["input","button","textarea","select"],tl=function(t){var e=t.target;if(e){var i=(""+e.tagName).toLowerCase();-1===Qs.indexOf(i)&&t.preventDefault()}};function el(t,e){for(var i=new Map,o=0;o<t;o++){var n=e(o).trim();if(n){var s=n[0].toLowerCase();i.has(s)||i.set(s,[]),i.get(s).push({text:n.toLowerCase(),index:o})}}return i.forEach(function(t){t.sort(function(t,e){return t.index-e.index})}),i}function il(t,e){var i,o=t.nextChar,n=t.focusItemAtIndex,s=t.sortedIndexByFirstChar,l=t.focusedItemIndex,r=t.skipFocus,d=t.isItemAtIndexDisabled;return clearTimeout(e.bufferClearTimeout),e.bufferClearTimeout=setTimeout(function(){!function(t){t.typeaheadBuffer=""}(e)},P.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS),e.typeaheadBuffer=e.typeaheadBuffer+o,i=1===e.typeaheadBuffer.length?function(t,e,i,o){var n=o.typeaheadBuffer[0],s=t.get(n);if(!s)return-1;if(n===o.currentFirstChar&&s[o.sortedIndexCursor].index===e){o.sortedIndexCursor=(o.sortedIndexCursor+1)%s.length;var l=s[o.sortedIndexCursor].index;if(!i(l))return l}o.currentFirstChar=n;var r,d=-1;for(r=0;r<s.length;r++)if(!i(s[r].index)){d=r;break}for(;r<s.length;r++)if(s[r].index>e&&!i(s[r].index)){d=r;break}if(-1!==d)return o.sortedIndexCursor=d,s[o.sortedIndexCursor].index;return-1}(s,l,d,e):function(t,e,i){var o=i.typeaheadBuffer[0],n=t.get(o);if(!n)return-1;var s=n[i.sortedIndexCursor];if(0===s.text.lastIndexOf(i.typeaheadBuffer,0)&&!e(s.index))return s.index;var l=(i.sortedIndexCursor+1)%n.length,r=-1;for(;l!==i.sortedIndexCursor;){var d=n[l],a=0===d.text.lastIndexOf(i.typeaheadBuffer,0),c=!e(d.index);if(a&&c){r=l;break}l=(l+1)%n.length}if(-1!==r)return i.sortedIndexCursor=r,n[i.sortedIndexCursor].index;return-1}(s,d,e),-1===i||r||n(i),i}function ol(t){return t.typeaheadBuffer.length>0}
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
var nl={LABEL_FLOAT_ABOVE:"mdc-floating-label--float-above",LABEL_REQUIRED:"mdc-floating-label--required",LABEL_SHAKE:"mdc-floating-label--shake",ROOT:"mdc-floating-label"},sl=function(i){function o(t){var n=i.call(this,e(e({},o.defaultAdapter),t))||this;return n.shakeAnimationEndHandler=function(){n.handleShakeAnimationEnd()},n}return t(o,i),Object.defineProperty(o,"cssClasses",{get:function(){return nl},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},getWidth:function(){return 0},registerInteractionHandler:function(){},deregisterInteractionHandler:function(){}}},enumerable:!1,configurable:!0}),o.prototype.init=function(){this.adapter.registerInteractionHandler("animationend",this.shakeAnimationEndHandler)},o.prototype.destroy=function(){this.adapter.deregisterInteractionHandler("animationend",this.shakeAnimationEndHandler)},o.prototype.getWidth=function(){return this.adapter.getWidth()},o.prototype.shake=function(t){var e=o.cssClasses.LABEL_SHAKE;t?this.adapter.addClass(e):this.adapter.removeClass(e)},o.prototype.float=function(t){var e=o.cssClasses,i=e.LABEL_FLOAT_ABOVE,n=e.LABEL_SHAKE;t?this.adapter.addClass(i):(this.adapter.removeClass(i),this.adapter.removeClass(n))},o.prototype.setRequired=function(t){var e=o.cssClasses.LABEL_REQUIRED;t?this.adapter.addClass(e):this.adapter.removeClass(e)},o.prototype.handleShakeAnimationEnd=function(){var t=o.cssClasses.LABEL_SHAKE;this.adapter.removeClass(t)},o}(E);
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
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ll=1,rl=3;let dl=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const al=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends dl{constructor(t){switch(super(t),this.foundation=null,this.previousPart=null,t.type){case ll:case rl:break;default:throw new Error("FloatingLabel directive only support attribute and property parts")}}update(t,[e]){if(t!==this.previousPart){this.foundation&&this.foundation.destroy(),this.previousPart=t;const e=t.element;e.classList.add("mdc-floating-label");const i=(t=>({addClass:e=>t.classList.add(e),removeClass:e=>t.classList.remove(e),getWidth:()=>t.scrollWidth,registerInteractionHandler:(e,i)=>{t.addEventListener(e,i)},deregisterInteractionHandler:(e,i)=>{t.removeEventListener(e,i)}}))(e);this.foundation=new sl(i),this.foundation.init()}return this.render(e)}render(t){return this.foundation}});
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
 */var cl={LINE_RIPPLE_ACTIVE:"mdc-line-ripple--active",LINE_RIPPLE_DEACTIVATING:"mdc-line-ripple--deactivating"},hl=function(i){function o(t){var n=i.call(this,e(e({},o.defaultAdapter),t))||this;return n.transitionEndHandler=function(t){n.handleTransitionEnd(t)},n}return t(o,i),Object.defineProperty(o,"cssClasses",{get:function(){return cl},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},setStyle:function(){},registerEventHandler:function(){},deregisterEventHandler:function(){}}},enumerable:!1,configurable:!0}),o.prototype.init=function(){this.adapter.registerEventHandler("transitionend",this.transitionEndHandler)},o.prototype.destroy=function(){this.adapter.deregisterEventHandler("transitionend",this.transitionEndHandler)},o.prototype.activate=function(){this.adapter.removeClass(cl.LINE_RIPPLE_DEACTIVATING),this.adapter.addClass(cl.LINE_RIPPLE_ACTIVE)},o.prototype.setRippleCenter=function(t){this.adapter.setStyle("transform-origin",t+"px center")},o.prototype.deactivate=function(){this.adapter.addClass(cl.LINE_RIPPLE_DEACTIVATING)},o.prototype.handleTransitionEnd=function(t){var e=this.adapter.hasClass(cl.LINE_RIPPLE_DEACTIVATING);"opacity"===t.propertyName&&e&&(this.adapter.removeClass(cl.LINE_RIPPLE_ACTIVE),this.adapter.removeClass(cl.LINE_RIPPLE_DEACTIVATING))},o}(E);
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
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ml=1,pl=3;let ul=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const fl=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends ul{constructor(t){switch(super(t),this.previousPart=null,this.foundation=null,t.type){case ml:case pl:return;default:throw new Error("LineRipple only support attribute and property parts.")}}update(t,e){if(this.previousPart!==t){this.foundation&&this.foundation.destroy(),this.previousPart=t;const e=t.element;e.classList.add("mdc-line-ripple");const i=(t=>({addClass:e=>t.classList.add(e),removeClass:e=>t.classList.remove(e),hasClass:e=>t.classList.contains(e),setStyle:(e,i)=>t.style.setProperty(e,i),registerEventHandler:(e,i)=>{t.addEventListener(e,i)},deregisterEventHandler:(e,i)=>{t.removeEventListener(e,i)}}))(e);this.foundation=new hl(i),this.foundation.init()}return this.render()}render(){return this.foundation}});
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
 */var gl={ACTIVATED:"mdc-select--activated",DISABLED:"mdc-select--disabled",FOCUSED:"mdc-select--focused",INVALID:"mdc-select--invalid",MENU_INVALID:"mdc-select__menu--invalid",OUTLINED:"mdc-select--outlined",REQUIRED:"mdc-select--required",ROOT:"mdc-select",WITH_LEADING_ICON:"mdc-select--with-leading-icon"},vl={ARIA_CONTROLS:"aria-controls",ARIA_DESCRIBEDBY:"aria-describedby",ARIA_SELECTED_ATTR:"aria-selected",CHANGE_EVENT:"MDCSelect:change",HIDDEN_INPUT_SELECTOR:'input[type="hidden"]',LABEL_SELECTOR:".mdc-floating-label",LEADING_ICON_SELECTOR:".mdc-select__icon",LINE_RIPPLE_SELECTOR:".mdc-line-ripple",MENU_SELECTOR:".mdc-select__menu",OUTLINE_SELECTOR:".mdc-notched-outline",SELECTED_TEXT_SELECTOR:".mdc-select__selected-text",SELECT_ANCHOR_SELECTOR:".mdc-select__anchor",VALUE_ATTR:"data-value"},_l={LABEL_SCALE:.75,UNSET_INDEX:-1,CLICK_DEBOUNCE_TIMEOUT_MS:330},bl=function(i){function o(t,n){void 0===n&&(n={});var s=i.call(this,e(e({},o.defaultAdapter),t))||this;return s.disabled=!1,s.isMenuOpen=!1,s.useDefaultValidation=!0,s.customValidity=!0,s.lastSelectedIndex=_l.UNSET_INDEX,s.clickDebounceTimeout=0,s.recentlyClicked=!1,s.leadingIcon=n.leadingIcon,s.helperText=n.helperText,s}return t(o,i),Object.defineProperty(o,"cssClasses",{get:function(){return gl},enumerable:!1,configurable:!0}),Object.defineProperty(o,"numbers",{get:function(){return _l},enumerable:!1,configurable:!0}),Object.defineProperty(o,"strings",{get:function(){return vl},enumerable:!1,configurable:!0}),Object.defineProperty(o,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!1},activateBottomLine:function(){},deactivateBottomLine:function(){},getSelectedIndex:function(){return-1},setSelectedIndex:function(){},hasLabel:function(){return!1},floatLabel:function(){},getLabelWidth:function(){return 0},setLabelRequired:function(){},hasOutline:function(){return!1},notchOutline:function(){},closeOutline:function(){},setRippleCenter:function(){},notifyChange:function(){},setSelectedText:function(){},isSelectAnchorFocused:function(){return!1},getSelectAnchorAttr:function(){return""},setSelectAnchorAttr:function(){},removeSelectAnchorAttr:function(){},addMenuClass:function(){},removeMenuClass:function(){},openMenu:function(){},closeMenu:function(){},getAnchorElement:function(){return null},setMenuAnchorElement:function(){},setMenuAnchorCorner:function(){},setMenuWrapFocus:function(){},focusMenuItemAtIndex:function(){},getMenuItemCount:function(){return 0},getMenuItemValues:function(){return[]},getMenuItemTextAtIndex:function(){return""},isTypeaheadInProgress:function(){return!1},typeaheadMatchItem:function(){return-1}}},enumerable:!1,configurable:!0}),o.prototype.getSelectedIndex=function(){return this.adapter.getSelectedIndex()},o.prototype.setSelectedIndex=function(t,e,i){void 0===e&&(e=!1),void 0===i&&(i=!1),t>=this.adapter.getMenuItemCount()||(t===_l.UNSET_INDEX?this.adapter.setSelectedText(""):this.adapter.setSelectedText(this.adapter.getMenuItemTextAtIndex(t).trim()),this.adapter.setSelectedIndex(t),e&&this.adapter.closeMenu(),i||this.lastSelectedIndex===t||this.handleChange(),this.lastSelectedIndex=t)},o.prototype.setValue=function(t,e){void 0===e&&(e=!1);var i=this.adapter.getMenuItemValues().indexOf(t);this.setSelectedIndex(i,!1,e)},o.prototype.getValue=function(){var t=this.adapter.getSelectedIndex(),e=this.adapter.getMenuItemValues();return t!==_l.UNSET_INDEX?e[t]:""},o.prototype.getDisabled=function(){return this.disabled},o.prototype.setDisabled=function(t){this.disabled=t,this.disabled?(this.adapter.addClass(gl.DISABLED),this.adapter.closeMenu()):this.adapter.removeClass(gl.DISABLED),this.leadingIcon&&this.leadingIcon.setDisabled(this.disabled),this.disabled?this.adapter.removeSelectAnchorAttr("tabindex"):this.adapter.setSelectAnchorAttr("tabindex","0"),this.adapter.setSelectAnchorAttr("aria-disabled",this.disabled.toString())},o.prototype.openMenu=function(){this.adapter.addClass(gl.ACTIVATED),this.adapter.openMenu(),this.isMenuOpen=!0,this.adapter.setSelectAnchorAttr("aria-expanded","true")},o.prototype.setHelperTextContent=function(t){this.helperText&&this.helperText.setContent(t)},o.prototype.layout=function(){if(this.adapter.hasLabel()){var t=this.getValue().length>0,e=this.adapter.hasClass(gl.FOCUSED),i=t||e,o=this.adapter.hasClass(gl.REQUIRED);this.notchOutline(i),this.adapter.floatLabel(i),this.adapter.setLabelRequired(o)}},o.prototype.layoutOptions=function(){var t=this.adapter.getMenuItemValues().indexOf(this.getValue());this.setSelectedIndex(t,!1,!0)},o.prototype.handleMenuOpened=function(){if(0!==this.adapter.getMenuItemValues().length){var t=this.getSelectedIndex(),e=t>=0?t:0;this.adapter.focusMenuItemAtIndex(e)}},o.prototype.handleMenuClosing=function(){this.adapter.setSelectAnchorAttr("aria-expanded","false")},o.prototype.handleMenuClosed=function(){this.adapter.removeClass(gl.ACTIVATED),this.isMenuOpen=!1,this.adapter.isSelectAnchorFocused()||this.blur()},o.prototype.handleChange=function(){this.layout(),this.adapter.notifyChange(this.getValue()),this.adapter.hasClass(gl.REQUIRED)&&this.useDefaultValidation&&this.setValid(this.isValid())},o.prototype.handleMenuItemAction=function(t){this.setSelectedIndex(t,!0)},o.prototype.handleFocus=function(){this.adapter.addClass(gl.FOCUSED),this.layout(),this.adapter.activateBottomLine()},o.prototype.handleBlur=function(){this.isMenuOpen||this.blur()},o.prototype.handleClick=function(t){this.disabled||this.recentlyClicked||(this.setClickDebounceTimeout(),this.isMenuOpen?this.adapter.closeMenu():(this.adapter.setRippleCenter(t),this.openMenu()))},o.prototype.handleKeydown=function(t){if(!this.isMenuOpen&&this.adapter.hasClass(gl.FOCUSED)){var e=Vi(t)===ui,i=Vi(t)===fi,o=Vi(t)===yi,n=Vi(t)===Ai;if(!(t.ctrlKey||t.metaKey)&&(!i&&t.key&&1===t.key.length||i&&this.adapter.isTypeaheadInProgress())){var s=i?" ":t.key,l=this.adapter.typeaheadMatchItem(s,this.getSelectedIndex());return l>=0&&this.setSelectedIndex(l),void t.preventDefault()}(e||i||o||n)&&(this.openMenu(),t.preventDefault())}},o.prototype.notchOutline=function(t){if(this.adapter.hasOutline()){var e=this.adapter.hasClass(gl.FOCUSED);if(t){var i=_l.LABEL_SCALE,o=this.adapter.getLabelWidth()*i;this.adapter.notchOutline(o)}else e||this.adapter.closeOutline()}},o.prototype.setLeadingIconAriaLabel=function(t){this.leadingIcon&&this.leadingIcon.setAriaLabel(t)},o.prototype.setLeadingIconContent=function(t){this.leadingIcon&&this.leadingIcon.setContent(t)},o.prototype.getUseDefaultValidation=function(){return this.useDefaultValidation},o.prototype.setUseDefaultValidation=function(t){this.useDefaultValidation=t},o.prototype.setValid=function(t){this.useDefaultValidation||(this.customValidity=t),this.adapter.setSelectAnchorAttr("aria-invalid",(!t).toString()),t?(this.adapter.removeClass(gl.INVALID),this.adapter.removeMenuClass(gl.MENU_INVALID)):(this.adapter.addClass(gl.INVALID),this.adapter.addMenuClass(gl.MENU_INVALID)),this.syncHelperTextValidity(t)},o.prototype.isValid=function(){return this.useDefaultValidation&&this.adapter.hasClass(gl.REQUIRED)&&!this.adapter.hasClass(gl.DISABLED)?this.getSelectedIndex()!==_l.UNSET_INDEX&&(0!==this.getSelectedIndex()||Boolean(this.getValue())):this.customValidity},o.prototype.setRequired=function(t){t?this.adapter.addClass(gl.REQUIRED):this.adapter.removeClass(gl.REQUIRED),this.adapter.setSelectAnchorAttr("aria-required",t.toString()),this.adapter.setLabelRequired(t)},o.prototype.getRequired=function(){return"true"===this.adapter.getSelectAnchorAttr("aria-required")},o.prototype.init=function(){var t=this.adapter.getAnchorElement();t&&(this.adapter.setMenuAnchorElement(t),this.adapter.setMenuAnchorCorner(N.BOTTOM_START)),this.adapter.setMenuWrapFocus(!1),this.setDisabled(this.adapter.hasClass(gl.DISABLED)),this.syncHelperTextValidity(!this.adapter.hasClass(gl.INVALID)),this.layout(),this.layoutOptions()},o.prototype.blur=function(){this.adapter.removeClass(gl.FOCUSED),this.layout(),this.adapter.deactivateBottomLine(),this.adapter.hasClass(gl.REQUIRED)&&this.useDefaultValidation&&this.setValid(this.isValid())},o.prototype.syncHelperTextValidity=function(t){if(this.helperText){this.helperText.setValidity(t);var e=this.helperText.isVisible(),i=this.helperText.getId();e&&i?this.adapter.setSelectAnchorAttr(vl.ARIA_DESCRIBEDBY,i):this.adapter.removeSelectAnchorAttr(vl.ARIA_DESCRIBEDBY)}},o.prototype.setClickDebounceTimeout=function(){var t=this;clearTimeout(this.clickDebounceTimeout),this.clickDebounceTimeout=setTimeout(function(){t.recentlyClicked=!1},_l.CLICK_DEBOUNCE_TIMEOUT_MS),this.recentlyClicked=!0},o}(E);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const xl=window,yl=xl.ShadowRoot&&(void 0===xl.ShadyCSS||xl.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,$l=Symbol(),Al=new WeakMap;let wl=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==$l)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(yl&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=Al.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Al.set(e,t))}return t}toString(){return this.cssText}};const El=yl?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new wl("string"==typeof t?t:t+"",void 0,$l))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Cl;const Sl=window,Ol=Sl.trustedTypes,Il=Ol?Ol.emptyScript:"",Tl=Sl.reactiveElementPolyfillSupport,kl={toAttribute(t,e){switch(e){case Boolean:t=t?Il:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},Rl=(t,e)=>e!==t&&(e==e||t==t),Ll={attribute:!0,type:String,converter:kl,reflect:!1,hasChanged:Rl},Nl="finalized";let jl=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const o=this._$Ep(i,e);void 0!==o&&(this._$Ev.set(o,i),t.push(o))}),t}static createProperty(t,e=Ll){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const n=this[t];this[e]=o,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||Ll}static finalize(){if(this.hasOwnProperty(Nl))return!1;this[Nl]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(El(t))}else void 0!==t&&e.push(El(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{yl?t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(e=>{const i=document.createElement("style"),o=xl.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=e.cssText,t.appendChild(i)})})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=Ll){var o;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:kl).toAttribute(e,i.type);this._$El=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$El=null}}_$AK(t,e){var i;const o=this.constructor,n=o._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=o.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:kl;this._$El=n,this[n]=s.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let o=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||Rl)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Ml;jl[Nl]=!0,jl.elementProperties=new Map,jl.elementStyles=[],jl.shadowRootOptions={mode:"open"},null==Tl||Tl({ReactiveElement:jl}),(null!==(Cl=Sl.reactiveElementVersions)&&void 0!==Cl?Cl:Sl.reactiveElementVersions=[]).push("1.6.3");const Pl=window,Fl=Pl.trustedTypes,zl=Fl?Fl.createPolicy("lit-html",{createHTML:t=>t}):void 0,Hl="$lit$",Ul=`lit$${(Math.random()+"").slice(9)}$`,Dl="?"+Ul,Bl=`<${Dl}>`,Vl=document,Gl=()=>Vl.createComment(""),Wl=t=>null===t||"object"!=typeof t&&"function"!=typeof t,Xl=Array.isArray,ql="[ \t\n\f\r]",Yl=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Kl=/-->/g,Zl=/>/g,Jl=RegExp(`>|${ql}(?:([^\\s"'>=/]+)(${ql}*=${ql}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Ql=/'/g,tr=/"/g,er=/^(?:script|style|textarea|title)$/i,ir=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),or=Symbol.for("lit-noChange"),nr=Symbol.for("lit-nothing"),sr=new WeakMap,lr=Vl.createTreeWalker(Vl,129,null,!1);function rr(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==zl?zl.createHTML(e):e}let dr=class t{constructor({strings:e,_$litType$:i},o){let n;this.parts=[];let s=0,l=0;const r=e.length-1,d=this.parts,[a,c]=((t,e)=>{const i=t.length-1,o=[];let n,s=2===e?"<svg>":"",l=Yl;for(let e=0;e<i;e++){const i=t[e];let r,d,a=-1,c=0;for(;c<i.length&&(l.lastIndex=c,d=l.exec(i),null!==d);)c=l.lastIndex,l===Yl?"!--"===d[1]?l=Kl:void 0!==d[1]?l=Zl:void 0!==d[2]?(er.test(d[2])&&(n=RegExp("</"+d[2],"g")),l=Jl):void 0!==d[3]&&(l=Jl):l===Jl?">"===d[0]?(l=null!=n?n:Yl,a=-1):void 0===d[1]?a=-2:(a=l.lastIndex-d[2].length,r=d[1],l=void 0===d[3]?Jl:'"'===d[3]?tr:Ql):l===tr||l===Ql?l=Jl:l===Kl||l===Zl?l=Yl:(l=Jl,n=void 0);const h=l===Jl&&t[e+1].startsWith("/>")?" ":"";s+=l===Yl?i+Bl:a>=0?(o.push(r),i.slice(0,a)+Hl+i.slice(a)+Ul+h):i+Ul+(-2===a?(o.push(void 0),e):h)}return[rr(t,s+(t[i]||"<?>")+(2===e?"</svg>":"")),o]})(e,i);if(this.el=t.createElement(a,o),lr.currentNode=this.el.content,2===i){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(n=lr.nextNode())&&d.length<r;){if(1===n.nodeType){if(n.hasAttributes()){const t=[];for(const e of n.getAttributeNames())if(e.endsWith(Hl)||e.startsWith(Ul)){const i=c[l++];if(t.push(e),void 0!==i){const t=n.getAttribute(i.toLowerCase()+Hl).split(Ul),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:s,name:e[2],strings:t,ctor:"."===e[1]?pr:"?"===e[1]?fr:"@"===e[1]?gr:mr})}else d.push({type:6,index:s})}for(const e of t)n.removeAttribute(e)}if(er.test(n.tagName)){const t=n.textContent.split(Ul),e=t.length-1;if(e>0){n.textContent=Fl?Fl.emptyScript:"";for(let i=0;i<e;i++)n.append(t[i],Gl()),lr.nextNode(),d.push({type:2,index:++s});n.append(t[e],Gl())}}}else if(8===n.nodeType)if(n.data===Dl)d.push({type:2,index:s});else{let t=-1;for(;-1!==(t=n.data.indexOf(Ul,t+1));)d.push({type:7,index:s}),t+=Ul.length-1}s++}}static createElement(t,e){const i=Vl.createElement("template");return i.innerHTML=t,i}};function ar(t,e,i=t,o){var n,s,l,r;if(e===or)return e;let d=void 0!==o?null===(n=i._$Co)||void 0===n?void 0:n[o]:i._$Cl;const a=Wl(e)?void 0:e._$litDirective$;return(null==d?void 0:d.constructor)!==a&&(null===(s=null==d?void 0:d._$AO)||void 0===s||s.call(d,!1),void 0===a?d=void 0:(d=new a(t),d._$AT(t,i,o)),void 0!==o?(null!==(l=(r=i)._$Co)&&void 0!==l?l:r._$Co=[])[o]=d:i._$Cl=d),void 0!==d&&(e=ar(t,d._$AS(t,e.values),d,o)),e}let cr=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:o}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:Vl).importNode(i,!0);lr.currentNode=n;let s=lr.nextNode(),l=0,r=0,d=o[0];for(;void 0!==d;){if(l===d.index){let e;2===d.type?e=new hr(s,s.nextSibling,this,t):1===d.type?e=new d.ctor(s,d.name,d.strings,this,t):6===d.type&&(e=new vr(s,this,t)),this._$AV.push(e),d=o[++r]}l!==(null==d?void 0:d.index)&&(s=lr.nextNode(),l++)}return lr.currentNode=Vl,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},hr=class t{constructor(t,e,i,o){var n;this.type=2,this._$AH=nr,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cp=null===(n=null==o?void 0:o.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=ar(this,t,e),Wl(t)?t===nr||null==t||""===t?(this._$AH!==nr&&this._$AR(),this._$AH=nr):t!==this._$AH&&t!==or&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>Xl(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==nr&&Wl(this._$AH)?this._$AA.nextSibling.data=t:this.$(Vl.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:o}=t,n="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=dr.createElement(rr(o.h,o.h[0]),this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new cr(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=sr.get(t.strings);return void 0===e&&sr.set(t.strings,e=new dr(t)),e}T(e){Xl(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let o,n=0;for(const s of e)n===i.length?i.push(o=new t(this.k(Gl()),this.k(Gl()),this,this.options)):o=i[n],o._$AI(s),n++;n<i.length&&(this._$AR(o&&o._$AB.nextSibling,n),i.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}},mr=class{constructor(t,e,i,o,n){this.type=1,this._$AH=nr,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=nr}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,o){const n=this.strings;let s=!1;if(void 0===n)t=ar(this,t,e,0),s=!Wl(t)||t!==this._$AH&&t!==or,s&&(this._$AH=t);else{const o=t;let l,r;for(t=n[0],l=0;l<n.length-1;l++)r=ar(this,o[i+l],e,l),r===or&&(r=this._$AH[l]),s||(s=!Wl(r)||r!==this._$AH[l]),r===nr?t=nr:t!==nr&&(t+=(null!=r?r:"")+n[l+1]),this._$AH[l]=r}s&&!o&&this.j(t)}j(t){t===nr?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}},pr=class extends mr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===nr?void 0:t}};const ur=Fl?Fl.emptyScript:"";let fr=class extends mr{constructor(){super(...arguments),this.type=4}j(t){t&&t!==nr?this.element.setAttribute(this.name,ur):this.element.removeAttribute(this.name)}},gr=class extends mr{constructor(t,e,i,o,n){super(t,e,i,o,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=ar(this,t,e,0))&&void 0!==i?i:nr)===or)return;const o=this._$AH,n=t===nr&&o!==nr||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==nr&&(o===nr||n);n&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}},vr=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){ar(this,t)}};const _r=Pl.litHtmlPolyfillSupport;null==_r||_r(dr,hr),(null!==(Ml=Pl.litHtmlVersions)&&void 0!==Ml?Ml:Pl.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var br,xr;let yr=class extends jl{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var o,n;const s=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:e;let l=s._$litPart$;if(void 0===l){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;s._$litPart$=l=new hr(e.insertBefore(Gl(),t),t,void 0,null!=i?i:{})}return l._$AI(t),l})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return or}};yr.finalized=!0,yr._$litElement$=!0,null===(br=globalThis.litElementHydrateSupport)||void 0===br||br.call(globalThis,{LitElement:yr});const $r=globalThis.litElementPolyfillSupport;null==$r||$r({LitElement:yr}),(null!==(xr=globalThis.litElementVersions)&&void 0!==xr?xr:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ar=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function wr(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Ar(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Er(t){return wr({...t,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Cr=({finisher:t,descriptor:e})=>(i,o)=>{var n;if(void 0===o){const o=null!==(n=i.originalKey)&&void 0!==n?n:i.key,s=null!=e?{kind:"method",placement:"prototype",key:o,descriptor:e(i.key)}:{...i,key:o};return null!=t&&(s.finisher=function(e){t(e,o)}),s}{const n=i.constructor;void 0!==e&&Object.defineProperty(i,o,e(o)),null==t||t(n,o)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Sr(t,e){return Cr({descriptor:e=>{const i={get(){var e,i;return null!==(i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==i?i:null},enumerable:!0,configurable:!0};return i}})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Or;null===(Or=window.HTMLSlotElement)||void 0===Or||Or.prototype.assignedElements;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ir=1;let Tr=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const kr=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends Tr{constructor(t){var e;if(super(t),t.type!==Ir||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var i,o;if(void 0===this.it){this.it=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!(null===(i=this.nt)||void 0===i?void 0:i.has(t))&&this.it.add(t);return this.render(e)}const n=t.element.classList;this.it.forEach(t=>{t in e||(n.remove(t),this.it.delete(t))});for(const t in e){const i=!!e[t];i===this.it.has(t)||(null===(o=this.nt)||void 0===o?void 0:o.has(t))||(i?(n.add(t),this.it.add(t)):(n.remove(t),this.it.delete(t)))}return or}}),Rr=t=>null!=t?t:nr,Lr=(t={})=>{const e={};for(const i in t)e[i]=t[i];return Object.assign({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1},e)};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Nr extends Pn{constructor(){super(...arguments),this.mdcFoundationClass=bl,this.disabled=!1,this.outlined=!1,this.label="",this.outlineOpen=!1,this.outlineWidth=0,this.value="",this.name="",this.selectedText="",this.icon="",this.menuOpen=!1,this.helper="",this.validateOnInitialRender=!1,this.validationMessage="",this.required=!1,this.naturalMenuWidth=!1,this.isUiValid=!0,this.fixedMenuPosition=!1,this.typeaheadState={bufferClearTimeout:0,currentFirstChar:"",sortedIndexCursor:0,typeaheadBuffer:""},this.sortedIndexByFirstChar=new Map,this.menuElement_=null,this.listeners=[],this.onBodyClickBound=()=>{},this._menuUpdateComplete=null,this.valueSetDirectly=!1,this.validityTransform=null,this._validity=Lr()}get items(){return this.menuElement_||(this.menuElement_=this.menuElement),this.menuElement_?this.menuElement_.items:[]}get selected(){const t=this.menuElement;return t?t.selected:null}get index(){const t=this.menuElement;return t?t.index:-1}get shouldRenderHelperText(){return!!this.helper||!!this.validationMessage}get validity(){return this._checkValidity(this.value),this._validity}render(){const t={"mdc-select--disabled":this.disabled,"mdc-select--no-label":!this.label,"mdc-select--filled":!this.outlined,"mdc-select--outlined":this.outlined,"mdc-select--with-leading-icon":!!this.icon,"mdc-select--required":this.required,"mdc-select--invalid":!this.isUiValid},e=this.label?"label":void 0,i=this.shouldRenderHelperText?"helper-text":void 0;return ir`
      <div
          class="mdc-select ${kr(t)}">
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
            aria-labelledby=${Rr(e)}
            aria-required=${this.required}
            aria-describedby=${Rr(i)}
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
      ${this.renderHelperText()}`}renderMenu(){const t=this.getMenuClasses();return ir`
      <mwc-menu
        innerRole="listbox"
        wrapFocus
        class=" ${kr(t)}"
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
    </mwc-menu>`}getMenuClasses(){return{"mdc-select__menu":!0,"mdc-menu":!0,"mdc-menu-surface":!0,"mdc-select__menu--invalid":!this.isUiValid}}renderMenuContent(){return ir`<slot></slot>`}renderRipple(){return this.outlined?nr:ir`
      <span class="mdc-select__ripple"></span>
    `}renderOutline(){return this.outlined?ir`
      <mwc-notched-outline
          .width=${this.outlineWidth}
          .open=${this.outlineOpen}
          class="mdc-notched-outline">
        ${this.renderLabel()}
      </mwc-notched-outline>`:nr}renderLabel(){return this.label?ir`
      <span
          .floatingLabelFoundation=${al(this.label)}
          id="label">${this.label}</span>
    `:nr}renderLeadingIcon(){return this.icon?ir`<mwc-icon class="mdc-select__icon"><div>${this.icon}</div></mwc-icon>`:nr}renderLineRipple(){return this.outlined?nr:ir`
      <span .lineRippleFoundation=${fl()}></span>
    `}renderHelperText(){if(!this.shouldRenderHelperText)return nr;const t=this.validationMessage&&!this.isUiValid;return ir`
        <p
          class="mdc-select-helper-text ${kr({"mdc-select-helper-text--validation-msg":t})}"
          id="helper-text">${t?this.validationMessage:this.helper}</p>`}createAdapter(){return Object.assign(Object.assign({},Wt(this.mdcRoot)),{activateBottomLine:()=>{this.lineRippleElement&&this.lineRippleElement.lineRippleFoundation.activate()},deactivateBottomLine:()=>{this.lineRippleElement&&this.lineRippleElement.lineRippleFoundation.deactivate()},hasLabel:()=>!!this.label,floatLabel:t=>{this.labelElement&&this.labelElement.floatingLabelFoundation.float(t)},getLabelWidth:()=>this.labelElement?this.labelElement.floatingLabelFoundation.getWidth():0,setLabelRequired:t=>{this.labelElement&&this.labelElement.floatingLabelFoundation.setRequired(t)},hasOutline:()=>this.outlined,notchOutline:t=>{this.outlineElement&&!this.outlineOpen&&(this.outlineWidth=t,this.outlineOpen=!0)},closeOutline:()=>{this.outlineElement&&(this.outlineOpen=!1)},setRippleCenter:t=>{if(this.lineRippleElement){this.lineRippleElement.lineRippleFoundation.setRippleCenter(t)}},notifyChange:async t=>{if(!this.valueSetDirectly&&t===this.value)return;this.valueSetDirectly=!1,this.value=t,await this.updateComplete;const e=new Event("change",{bubbles:!0});this.dispatchEvent(e)},setSelectedText:t=>this.selectedText=t,isSelectAnchorFocused:()=>{const t=this.anchorElement;if(!t)return!1;return t.getRootNode().activeElement===t},getSelectAnchorAttr:t=>{const e=this.anchorElement;return e?e.getAttribute(t):null},setSelectAnchorAttr:(t,e)=>{const i=this.anchorElement;i&&i.setAttribute(t,e)},removeSelectAnchorAttr:t=>{const e=this.anchorElement;e&&e.removeAttribute(t)},openMenu:()=>{this.menuOpen=!0},closeMenu:()=>{this.menuOpen=!1},addMenuClass:()=>{},removeMenuClass:()=>{},getAnchorElement:()=>this.anchorElement,setMenuAnchorElement:()=>{},setMenuAnchorCorner:()=>{const t=this.menuElement;t&&(t.corner="BOTTOM_START")},setMenuWrapFocus:t=>{const e=this.menuElement;e&&(e.wrapFocus=t)},focusMenuItemAtIndex:t=>{const e=this.menuElement;if(!e)return;const i=e.items[t];i&&i.focus()},getMenuItemCount:()=>{const t=this.menuElement;return t?t.items.length:0},getMenuItemValues:()=>{const t=this.menuElement;if(!t)return[];return t.items.map(t=>t.value)},getMenuItemTextAtIndex:t=>{const e=this.menuElement;if(!e)return"";const i=e.items[t];return i?i.text:""},getSelectedIndex:()=>this.index,setSelectedIndex:()=>{},isTypeaheadInProgress:()=>ol(this.typeaheadState),typeaheadMatchItem:(t,e)=>{if(!this.menuElement)return-1;const i={focusItemAtIndex:t=>{this.menuElement.focusItemAtIndex(t)},focusedItemIndex:e||this.menuElement.getFocusedItemIndex(),nextChar:t,sortedIndexByFirstChar:this.sortedIndexByFirstChar,skipFocus:!1,isItemAtIndexDisabled:t=>this.items[t].disabled},o=il(i,this.typeaheadState);return-1!==o&&this.select(o),o}})}checkValidity(){const t=this._checkValidity(this.value);if(!t){const t=new Event("invalid",{bubbles:!1,cancelable:!0});this.dispatchEvent(t)}return t}reportValidity(){const t=this.checkValidity();return this.isUiValid=t,t}_checkValidity(t){const e=this.formElement.validity;let i=Lr(e);if(this.validityTransform){const e=this.validityTransform(t,i);i=Object.assign(Object.assign({},i),e)}return this._validity=i,this._validity.valid}setCustomValidity(t){this.validationMessage=t,this.formElement.setCustomValidity(t)}async getUpdateComplete(){await this._menuUpdateComplete;return await super.getUpdateComplete()}async firstUpdated(){const t=this.menuElement;if(t&&(this._menuUpdateComplete=t.updateComplete,await this._menuUpdateComplete),super.firstUpdated(),this.mdcFoundation.isValid=()=>!0,this.mdcFoundation.setValid=()=>{},this.mdcFoundation.setDisabled(this.disabled),this.validateOnInitialRender&&this.reportValidity(),!this.selected){!this.items.length&&this.slotElement&&this.slotElement.assignedNodes({flatten:!0}).length&&(await new Promise(t=>requestAnimationFrame(t)),await this.layout());const t=this.items.length&&""===this.items[0].value;if(!this.value&&t)return void this.select(0);this.selectByValue(this.value)}this.sortedIndexByFirstChar=el(this.items.length,t=>this.items[t].text)}onItemsUpdated(){this.sortedIndexByFirstChar=el(this.items.length,t=>this.items[t].text)}select(t){const e=this.menuElement;e&&e.select(t)}selectByValue(t){let e=-1;for(let i=0;i<this.items.length;i++){if(this.items[i].value===t){e=i;break}}this.valueSetDirectly=!0,this.select(e),this.mdcFoundation.handleChange()}disconnectedCallback(){super.disconnectedCallback();for(const t of this.listeners)t.target.removeEventListener(t.name,t.cb)}focus(){const t=new CustomEvent("focus"),e=this.anchorElement;e&&(e.dispatchEvent(t),e.focus())}blur(){const t=new CustomEvent("blur"),e=this.anchorElement;e&&(e.dispatchEvent(t),e.blur())}onFocus(){this.mdcFoundation&&this.mdcFoundation.handleFocus()}onBlur(){this.mdcFoundation&&this.mdcFoundation.handleBlur();const t=this.menuElement;t&&!t.open&&this.reportValidity()}onClick(t){if(this.mdcFoundation){this.focus();const e=t.target.getBoundingClientRect();let i=0;i="touches"in t?t.touches[0].clientX:t.clientX;const o=i-e.left;this.mdcFoundation.handleClick(o)}}onKeydown(t){const e=Vi(t)===yi,i=Vi(t)===Ai;if(i||e){const o=e&&this.index>0,n=i&&this.index<this.items.length-1;return o?this.select(this.index-1):n&&this.select(this.index+1),t.preventDefault(),void this.mdcFoundation.openMenu()}this.mdcFoundation.handleKeydown(t)}handleTypeahead(t){if(!this.menuElement)return;const e=this.menuElement.getFocusedItemIndex(),i=Gt(t.target)?t.target:null;!function(t,e){var i=t.event,o=t.isTargetListItem,n=t.focusedItemIndex,s=t.focusItemAtIndex,l=t.sortedIndexByFirstChar,r=t.isItemAtIndexDisabled,d="ArrowLeft"===Vi(i),a="ArrowUp"===Vi(i),c="ArrowRight"===Vi(i),h="ArrowDown"===Vi(i),m="Home"===Vi(i),p="End"===Vi(i),u="Enter"===Vi(i),f="Spacebar"===Vi(i);i.altKey||i.ctrlKey||i.metaKey||d||a||c||h||m||p||u||(f||1!==i.key.length?f&&(o&&tl(i),o&&ol(e)&&il({focusItemAtIndex:s,focusedItemIndex:n,nextChar:" ",sortedIndexByFirstChar:l,skipFocus:!1,isItemAtIndexDisabled:r},e)):(tl(i),il({focusItemAtIndex:s,focusedItemIndex:n,nextChar:i.key.toLowerCase(),sortedIndexByFirstChar:l,skipFocus:!1,isItemAtIndexDisabled:r},e)))}({event:t,focusItemAtIndex:t=>{this.menuElement.focusItemAtIndex(t)},focusedItemIndex:e,isTargetListItem:!!i&&i.hasAttribute("mwc-list-item"),sortedIndexByFirstChar:this.sortedIndexByFirstChar,isItemAtIndexDisabled:t=>this.items[t].disabled},this.typeaheadState)}async onSelected(t){this.mdcFoundation||await this.updateComplete,this.mdcFoundation.handleMenuItemAction(t.detail.index);const e=this.items[t.detail.index];e&&(this.value=e.value)}onOpened(){this.mdcFoundation&&(this.menuOpen=!0,this.mdcFoundation.handleMenuOpened())}onClosed(){this.mdcFoundation&&(this.menuOpen=!1,this.mdcFoundation.handleMenuClosed())}setFormData(t){this.name&&null!==this.selected&&t.append(this.name,this.value)}async layout(t=!0){this.mdcFoundation&&this.mdcFoundation.layout(),await this.updateComplete;const e=this.menuElement;e&&e.layout(t);const i=this.labelElement;if(!i)return void(this.outlineOpen=!1);const o=!!this.label&&!!this.value;if(i.floatingLabelFoundation.float(o),!this.outlined)return;this.outlineOpen=o,await this.updateComplete;const n=i.floatingLabelFoundation.getWidth();this.outlineOpen&&(this.outlineWidth=n)}async layoutOptions(){this.mdcFoundation&&this.mdcFoundation.layoutOptions()}}o([Sr(".mdc-select")],Nr.prototype,"mdcRoot",void 0),o([Sr(".formElement")],Nr.prototype,"formElement",void 0),o([Sr("slot")],Nr.prototype,"slotElement",void 0),o([Sr("select")],Nr.prototype,"nativeSelectElement",void 0),o([Sr("input")],Nr.prototype,"nativeInputElement",void 0),o([Sr(".mdc-line-ripple")],Nr.prototype,"lineRippleElement",void 0),o([Sr(".mdc-floating-label")],Nr.prototype,"labelElement",void 0),o([Sr("mwc-notched-outline")],Nr.prototype,"outlineElement",void 0),o([Sr(".mdc-menu")],Nr.prototype,"menuElement",void 0),o([Sr(".mdc-select__anchor")],Nr.prototype,"anchorElement",void 0),o([wr({type:Boolean,attribute:"disabled",reflect:!0}),Jt(function(t){this.mdcFoundation&&this.mdcFoundation.setDisabled(t)})],Nr.prototype,"disabled",void 0),o([wr({type:Boolean}),Jt(function(t,e){void 0!==e&&this.outlined!==e&&this.layout(!1)})],Nr.prototype,"outlined",void 0),o([wr({type:String}),Jt(function(t,e){void 0!==e&&this.label!==e&&this.layout(!1)})],Nr.prototype,"label",void 0),o([Er()],Nr.prototype,"outlineOpen",void 0),o([Er()],Nr.prototype,"outlineWidth",void 0),o([wr({type:String}),Jt(function(t){if(this.mdcFoundation){const e=null===this.selected&&!!t,i=this.selected&&this.selected.value!==t;(e||i)&&this.selectByValue(t),this.reportValidity()}})],Nr.prototype,"value",void 0),o([wr()],Nr.prototype,"name",void 0),o([Er()],Nr.prototype,"selectedText",void 0),o([wr({type:String})],Nr.prototype,"icon",void 0),o([Er()],Nr.prototype,"menuOpen",void 0),o([wr({type:String})],Nr.prototype,"helper",void 0),o([wr({type:Boolean})],Nr.prototype,"validateOnInitialRender",void 0),o([wr({type:String})],Nr.prototype,"validationMessage",void 0),o([wr({type:Boolean})],Nr.prototype,"required",void 0),o([wr({type:Boolean})],Nr.prototype,"naturalMenuWidth",void 0),o([Er()],Nr.prototype,"isUiValid",void 0),o([wr({type:Boolean})],Nr.prototype,"fixedMenuPosition",void 0),o([function(t){return Cr({finisher:(e,i)=>{Object.assign(e.prototype[i],t)}})}({capture:!0})],Nr.prototype,"handleTypeahead",null);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const jr=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new wl(i,t,$l)})`.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform;transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required::after{margin-left:1px;margin-right:0px;content:"*"}[dir=rtl] .mdc-floating-label--required::after,.mdc-floating-label--required[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{border-bottom-width:1px}.mdc-line-ripple::before{z-index:1}.mdc-line-ripple::after{transform:scaleX(0);border-bottom-width:2px;opacity:0;z-index:2}.mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / 0.75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}.mdc-select{display:inline-flex;position:relative}.mdc-select:not(.mdc-select--disabled) .mdc-select__selected-text{color:rgba(0, 0, 0, 0.87)}.mdc-select.mdc-select--disabled .mdc-select__selected-text{color:rgba(0, 0, 0, 0.38)}.mdc-select:not(.mdc-select--disabled) .mdc-floating-label{color:rgba(0, 0, 0, 0.6)}.mdc-select:not(.mdc-select--disabled).mdc-select--focused .mdc-floating-label{color:rgba(98, 0, 238, 0.87)}.mdc-select.mdc-select--disabled .mdc-floating-label{color:rgba(0, 0, 0, 0.38)}.mdc-select:not(.mdc-select--disabled) .mdc-select__dropdown-icon{fill:rgba(0, 0, 0, 0.54)}.mdc-select:not(.mdc-select--disabled).mdc-select--focused .mdc-select__dropdown-icon{fill:#6200ee;fill:var(--mdc-theme-primary, #6200ee)}.mdc-select.mdc-select--disabled .mdc-select__dropdown-icon{fill:rgba(0, 0, 0, 0.38)}.mdc-select:not(.mdc-select--disabled)+.mdc-select-helper-text{color:rgba(0, 0, 0, 0.6)}.mdc-select.mdc-select--disabled+.mdc-select-helper-text{color:rgba(0, 0, 0, 0.38)}.mdc-select:not(.mdc-select--disabled) .mdc-select__icon{color:rgba(0, 0, 0, 0.54)}.mdc-select.mdc-select--disabled .mdc-select__icon{color:rgba(0, 0, 0, 0.38)}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-select.mdc-select--disabled .mdc-select__selected-text{color:GrayText}.mdc-select.mdc-select--disabled .mdc-select__dropdown-icon{fill:red}.mdc-select.mdc-select--disabled .mdc-floating-label{color:GrayText}.mdc-select.mdc-select--disabled .mdc-line-ripple::before{border-bottom-color:GrayText}.mdc-select.mdc-select--disabled .mdc-notched-outline__leading,.mdc-select.mdc-select--disabled .mdc-notched-outline__notch,.mdc-select.mdc-select--disabled .mdc-notched-outline__trailing{border-color:GrayText}.mdc-select.mdc-select--disabled .mdc-select__icon{color:GrayText}.mdc-select.mdc-select--disabled+.mdc-select-helper-text{color:GrayText}}.mdc-select .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-select .mdc-select__anchor{padding-left:16px;padding-right:0}[dir=rtl] .mdc-select .mdc-select__anchor,.mdc-select .mdc-select__anchor[dir=rtl]{padding-left:0;padding-right:16px}.mdc-select.mdc-select--with-leading-icon .mdc-select__anchor{padding-left:0;padding-right:0}[dir=rtl] .mdc-select.mdc-select--with-leading-icon .mdc-select__anchor,.mdc-select.mdc-select--with-leading-icon .mdc-select__anchor[dir=rtl]{padding-left:0;padding-right:0}.mdc-select .mdc-select__icon{width:24px;height:24px;font-size:24px}.mdc-select .mdc-select__dropdown-icon{width:24px;height:24px}.mdc-select .mdc-select__menu .mdc-deprecated-list-item{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-select .mdc-select__menu .mdc-deprecated-list-item,.mdc-select .mdc-select__menu .mdc-deprecated-list-item[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-select .mdc-select__menu .mdc-deprecated-list-item__graphic{margin-left:0;margin-right:12px}[dir=rtl] .mdc-select .mdc-select__menu .mdc-deprecated-list-item__graphic,.mdc-select .mdc-select__menu .mdc-deprecated-list-item__graphic[dir=rtl]{margin-left:12px;margin-right:0}.mdc-select__dropdown-icon{margin-left:12px;margin-right:12px;display:inline-flex;position:relative;align-self:center;align-items:center;justify-content:center;flex-shrink:0;pointer-events:none}.mdc-select__dropdown-icon .mdc-select__dropdown-icon-active,.mdc-select__dropdown-icon .mdc-select__dropdown-icon-inactive{position:absolute;top:0;left:0}.mdc-select__dropdown-icon .mdc-select__dropdown-icon-graphic{width:41.6666666667%;height:20.8333333333%}.mdc-select__dropdown-icon .mdc-select__dropdown-icon-inactive{opacity:1;transition:opacity 75ms linear 75ms}.mdc-select__dropdown-icon .mdc-select__dropdown-icon-active{opacity:0;transition:opacity 75ms linear}[dir=rtl] .mdc-select__dropdown-icon,.mdc-select__dropdown-icon[dir=rtl]{margin-left:12px;margin-right:12px}.mdc-select--activated .mdc-select__dropdown-icon .mdc-select__dropdown-icon-inactive{opacity:0;transition:opacity 49.5ms linear}.mdc-select--activated .mdc-select__dropdown-icon .mdc-select__dropdown-icon-active{opacity:1;transition:opacity 100.5ms linear 49.5ms}.mdc-select__anchor{width:200px;min-width:0;flex:1 1 auto;position:relative;box-sizing:border-box;overflow:hidden;outline:none;cursor:pointer}.mdc-select__anchor .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-select__selected-text-container{display:flex;appearance:none;pointer-events:none;box-sizing:border-box;width:auto;min-width:0;flex-grow:1;height:28px;border:none;outline:none;padding:0;background-color:transparent;color:inherit}.mdc-select__selected-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);line-height:1.75rem;line-height:var(--mdc-typography-subtitle1-line-height, 1.75rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;width:100%;text-align:left}[dir=rtl] .mdc-select__selected-text,.mdc-select__selected-text[dir=rtl]{text-align:right}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-floating-label{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-floating-label{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--invalid+.mdc-select-helper-text--validation-msg{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-select__dropdown-icon{fill:#b00020;fill:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-select__dropdown-icon{fill:#b00020;fill:var(--mdc-theme-error, #b00020)}.mdc-select--disabled{cursor:default;pointer-events:none}.mdc-select--with-leading-icon .mdc-select__menu .mdc-deprecated-list-item{padding-left:12px;padding-right:12px}[dir=rtl] .mdc-select--with-leading-icon .mdc-select__menu .mdc-deprecated-list-item,.mdc-select--with-leading-icon .mdc-select__menu .mdc-deprecated-list-item[dir=rtl]{padding-left:12px;padding-right:12px}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-select__menu::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid transparent;border-radius:inherit;content:"";pointer-events:none}}@media screen and (forced-colors: active)and (forced-colors: active),screen and (-ms-high-contrast: active)and (forced-colors: active){.mdc-select__menu::before{border-color:CanvasText}}.mdc-select__menu .mdc-deprecated-list .mdc-select__icon,.mdc-select__menu .mdc-list .mdc-select__icon{margin-left:0;margin-right:0}[dir=rtl] .mdc-select__menu .mdc-deprecated-list .mdc-select__icon,[dir=rtl] .mdc-select__menu .mdc-list .mdc-select__icon,.mdc-select__menu .mdc-deprecated-list .mdc-select__icon[dir=rtl],.mdc-select__menu .mdc-list .mdc-select__icon[dir=rtl]{margin-left:0;margin-right:0}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--activated,.mdc-select__menu .mdc-list .mdc-deprecated-list-item--selected,.mdc-select__menu .mdc-list .mdc-deprecated-list-item--activated{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected .mdc-deprecated-list-item__graphic,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--activated .mdc-deprecated-list-item__graphic,.mdc-select__menu .mdc-list .mdc-deprecated-list-item--selected .mdc-deprecated-list-item__graphic,.mdc-select__menu .mdc-list .mdc-deprecated-list-item--activated .mdc-deprecated-list-item__graphic{color:#000;color:var(--mdc-theme-on-surface, #000)}.mdc-select__menu .mdc-list-item__start{display:inline-flex;align-items:center}.mdc-select__option{padding-left:16px;padding-right:16px}[dir=rtl] .mdc-select__option,.mdc-select__option[dir=rtl]{padding-left:16px;padding-right:16px}.mdc-select__one-line-option.mdc-list-item--with-one-line{height:48px}.mdc-select__two-line-option.mdc-list-item--with-two-lines{height:64px}.mdc-select__two-line-option.mdc-list-item--with-two-lines .mdc-list-item__start{margin-top:20px}.mdc-select__two-line-option.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-select__two-line-option.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-select__two-line-option.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-select__two-line-option.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-select__two-line-option.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:36px;content:"";vertical-align:0}.mdc-select__option-with-leading-content{padding-left:0;padding-right:12px}.mdc-select__option-with-leading-content.mdc-list-item{padding-left:0;padding-right:auto}[dir=rtl] .mdc-select__option-with-leading-content.mdc-list-item,.mdc-select__option-with-leading-content.mdc-list-item[dir=rtl]{padding-left:auto;padding-right:0}.mdc-select__option-with-leading-content .mdc-list-item__start{margin-left:12px;margin-right:0}[dir=rtl] .mdc-select__option-with-leading-content .mdc-list-item__start,.mdc-select__option-with-leading-content .mdc-list-item__start[dir=rtl]{margin-left:0;margin-right:12px}.mdc-select__option-with-leading-content .mdc-list-item__start{width:36px;height:24px}[dir=rtl] .mdc-select__option-with-leading-content,.mdc-select__option-with-leading-content[dir=rtl]{padding-left:12px;padding-right:0}.mdc-select__option-with-meta.mdc-list-item{padding-left:auto;padding-right:0}[dir=rtl] .mdc-select__option-with-meta.mdc-list-item,.mdc-select__option-with-meta.mdc-list-item[dir=rtl]{padding-left:0;padding-right:auto}.mdc-select__option-with-meta .mdc-list-item__end{margin-left:12px;margin-right:12px}[dir=rtl] .mdc-select__option-with-meta .mdc-list-item__end,.mdc-select__option-with-meta .mdc-list-item__end[dir=rtl]{margin-left:12px;margin-right:12px}.mdc-select--filled .mdc-select__anchor{height:56px;display:flex;align-items:baseline}.mdc-select--filled .mdc-select__anchor::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-select--filled.mdc-select--no-label .mdc-select__anchor .mdc-select__selected-text::before{content:"​"}.mdc-select--filled.mdc-select--no-label .mdc-select__anchor .mdc-select__selected-text-container{height:100%;display:inline-flex;align-items:center}.mdc-select--filled.mdc-select--no-label .mdc-select__anchor::before{display:none}.mdc-select--filled .mdc-select__anchor{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:0;border-bottom-left-radius:0}.mdc-select--filled:not(.mdc-select--disabled) .mdc-select__anchor{background-color:whitesmoke}.mdc-select--filled.mdc-select--disabled .mdc-select__anchor{background-color:#fafafa}.mdc-select--filled:not(.mdc-select--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42)}.mdc-select--filled:not(.mdc-select--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87)}.mdc-select--filled:not(.mdc-select--disabled) .mdc-line-ripple::after{border-bottom-color:#6200ee;border-bottom-color:var(--mdc-theme-primary, #6200ee)}.mdc-select--filled.mdc-select--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.06)}.mdc-select--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-select--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-select--filled .mdc-menu-surface--is-open-below{border-top-left-radius:0px;border-top-right-radius:0px}.mdc-select--filled.mdc-select--focused.mdc-line-ripple::after{transform:scale(1, 2);opacity:1}.mdc-select--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-select--filled .mdc-floating-label,.mdc-select--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-select--filled.mdc-select--with-leading-icon .mdc-floating-label{left:48px;right:initial}[dir=rtl] .mdc-select--filled.mdc-select--with-leading-icon .mdc-floating-label,.mdc-select--filled.mdc-select--with-leading-icon .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-select--filled.mdc-select--with-leading-icon .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-select--filled.mdc-select--with-leading-icon .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 96px / 0.75)}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled):hover .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-select--invalid:not(.mdc-select--disabled) .mdc-line-ripple::after{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-select--outlined{border:none}.mdc-select--outlined .mdc-select__anchor{height:56px}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--float-above{font-size:.75rem}.mdc-select--outlined .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-select--outlined .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-select-outlined-56px 250ms 1}@keyframes mdc-floating-label-shake-float-above-select-outlined-56px{0%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}}.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px, var(--mdc-shape-small, 4px)) * 2)}}.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-select--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}@supports(top: max(0%)){.mdc-select--outlined .mdc-select__anchor{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-select--outlined .mdc-select__anchor,.mdc-select--outlined .mdc-select__anchor[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-select--outlined .mdc-select__anchor,.mdc-select--outlined .mdc-select__anchor[dir=rtl]{padding-right:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-select--outlined+.mdc-select-helper-text{margin-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-select--outlined+.mdc-select-helper-text,.mdc-select--outlined+.mdc-select-helper-text[dir=rtl]{margin-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-select--outlined+.mdc-select-helper-text,.mdc-select--outlined+.mdc-select-helper-text[dir=rtl]{margin-right:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}.mdc-select--outlined:not(.mdc-select--disabled) .mdc-select__anchor{background-color:transparent}.mdc-select--outlined.mdc-select--disabled .mdc-select__anchor{background-color:transparent}.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled) .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.38)}.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.87)}.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-width:2px}.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-select--outlined.mdc-select--disabled .mdc-notched-outline__leading,.mdc-select--outlined.mdc-select--disabled .mdc-notched-outline__notch,.mdc-select--outlined.mdc-select--disabled .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.06)}.mdc-select--outlined .mdc-select__anchor :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-select--outlined .mdc-select__anchor{display:flex;align-items:baseline;overflow:visible}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-select-outlined 250ms 1}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-select--outlined .mdc-select__anchor .mdc-floating-label--float-above{font-size:.75rem}.mdc-select--outlined .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-select--outlined .mdc-select__anchor.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined .mdc-select__anchor .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-select--outlined .mdc-select__anchor .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-select--outlined .mdc-select__anchor .mdc-select__selected-text::before{content:"​"}.mdc-select--outlined .mdc-select__anchor .mdc-select__selected-text-container{height:100%;display:inline-flex;align-items:center}.mdc-select--outlined .mdc-select__anchor::before{display:none}.mdc-select--outlined .mdc-select__selected-text-container{display:flex;border:none;z-index:1;background-color:transparent}.mdc-select--outlined .mdc-select__icon{z-index:2}.mdc-select--outlined .mdc-floating-label{line-height:1.15rem;left:4px;right:initial}[dir=rtl] .mdc-select--outlined .mdc-floating-label,.mdc-select--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-select--outlined.mdc-select--focused .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled) .mdc-notched-outline__leading,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled) .mdc-notched-outline__notch,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled) .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled):not(.mdc-select--focused) .mdc-select__anchor:hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-width:2px}.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-select--outlined.mdc-select--invalid:not(.mdc-select--disabled).mdc-select--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label,.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--float-above,.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--float-above{font-size:.75rem}.mdc-select--outlined.mdc-select--with-leading-icon.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined.mdc-select--with-leading-icon .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-select--outlined.mdc-select--with-leading-icon.mdc-notched-outline--upgraded .mdc-floating-label--float-above,[dir=rtl] .mdc-select--outlined.mdc-select--with-leading-icon .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined.mdc-select--with-leading-icon.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],.mdc-select--outlined.mdc-select--with-leading-icon .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-select--outlined.mdc-select--with-leading-icon.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-select--outlined.mdc-select--with-leading-icon .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px 250ms 1}@keyframes mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px{0%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}}[dir=rtl] .mdc-select--outlined.mdc-select--with-leading-icon .mdc-floating-label--shake,.mdc-select--outlined.mdc-select--with-leading-icon[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px 250ms 1}@keyframes mdc-floating-label-shake-float-above-select-outlined-leading-icon-56px-rtl{0%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}}.mdc-select--outlined.mdc-select--with-leading-icon .mdc-select__anchor :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 96px)}.mdc-select--outlined .mdc-menu-surface{margin-bottom:8px}.mdc-select--outlined.mdc-select--no-label .mdc-menu-surface,.mdc-select--outlined .mdc-menu-surface--is-open-below{margin-bottom:0}.mdc-select__anchor{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity}.mdc-select__anchor .mdc-select__ripple::before,.mdc-select__anchor .mdc-select__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-select__anchor .mdc-select__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-select__anchor .mdc-select__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-select__anchor.mdc-ripple-upgraded .mdc-select__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-select__anchor.mdc-ripple-upgraded .mdc-select__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-select__anchor.mdc-ripple-upgraded--unbounded .mdc-select__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-select__anchor.mdc-ripple-upgraded--foreground-activation .mdc-select__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-select__anchor.mdc-ripple-upgraded--foreground-deactivation .mdc-select__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-select__anchor .mdc-select__ripple::before,.mdc-select__anchor .mdc-select__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-select__anchor.mdc-ripple-upgraded .mdc-select__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-select__anchor .mdc-select__ripple::before,.mdc-select__anchor .mdc-select__ripple::after{background-color:rgba(0, 0, 0, 0.87);background-color:var(--mdc-ripple-color, rgba(0, 0, 0, 0.87))}.mdc-select__anchor:hover .mdc-select__ripple::before,.mdc-select__anchor.mdc-ripple-surface--hover .mdc-select__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-select__anchor.mdc-ripple-upgraded--background-focused .mdc-select__ripple::before,.mdc-select__anchor:not(.mdc-ripple-upgraded):focus .mdc-select__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-select__anchor .mdc-select__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected .mdc-deprecated-list-item__ripple::before,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected .mdc-deprecated-list-item__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, var(--mdc-theme-on-surface, #000))}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:hover .mdc-deprecated-list-item__ripple::before,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected.mdc-ripple-surface--hover .mdc-deprecated-list-item__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected.mdc-ripple-upgraded--background-focused .mdc-deprecated-list-item__ripple::before,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):focus .mdc-deprecated-list-item__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded) .mdc-deprecated-list-item__ripple::after{transition:opacity 150ms linear}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):active .mdc-deprecated-list-item__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected .mdc-list-item__ripple::before,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected .mdc-list-item__ripple::after{background-color:#000;background-color:var(--mdc-ripple-color, var(--mdc-theme-on-surface, #000))}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:hover .mdc-list-item__ripple::before,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected.mdc-ripple-surface--hover .mdc-list-item__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected.mdc-ripple-upgraded--background-focused .mdc-list-item__ripple::before,.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):focus .mdc-list-item__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded) .mdc-list-item__ripple::after{transition:opacity 150ms linear}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected:not(.mdc-ripple-upgraded):active .mdc-list-item__ripple::after{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-select__menu .mdc-deprecated-list .mdc-deprecated-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.12)}.mdc-select-helper-text{margin:0;margin-left:16px;margin-right:16px;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal}[dir=rtl] .mdc-select-helper-text,.mdc-select-helper-text[dir=rtl]{margin-left:16px;margin-right:16px}.mdc-select-helper-text::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}.mdc-select-helper-text--validation-msg{opacity:0;transition:opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-select--invalid+.mdc-select-helper-text--validation-msg,.mdc-select-helper-text--validation-msg-persistent{opacity:1}.mdc-select--with-leading-icon .mdc-select__icon{display:inline-block;box-sizing:border-box;border:none;text-decoration:none;cursor:pointer;user-select:none;flex-shrink:0;align-self:center;background-color:transparent;fill:currentColor}.mdc-select--with-leading-icon .mdc-select__icon{margin-left:12px;margin-right:12px}[dir=rtl] .mdc-select--with-leading-icon .mdc-select__icon,.mdc-select--with-leading-icon .mdc-select__icon[dir=rtl]{margin-left:12px;margin-right:12px}.mdc-select__icon:not([tabindex]),.mdc-select__icon[tabindex="-1"]{cursor:default;pointer-events:none}.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}:host{display:inline-block;vertical-align:top;outline:none}.mdc-select{width:100%}[hidden]{display:none}.mdc-select__icon{z-index:2}.mdc-select--with-leading-icon{--mdc-list-item-graphic-margin: calc( 48px - var(--mdc-list-item-graphic-size, 24px) - var(--mdc-list-side-padding, 16px) )}.mdc-select .mdc-select__anchor .mdc-select__selected-text{overflow:hidden}.mdc-select .mdc-select__anchor *{display:inline-flex}.mdc-select .mdc-select__anchor .mdc-floating-label{display:inline-block}mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-select-outlined-idle-border-color, rgba(0, 0, 0, 0.38) );--mdc-notched-outline-notch-offset: 1px}:host(:not([disabled]):hover) .mdc-select:not(.mdc-select--invalid):not(.mdc-select--focused) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-select-outlined-hover-border-color, rgba(0, 0, 0, 0.87) )}:host(:not([disabled])) .mdc-select:not(.mdc-select--disabled) .mdc-select__selected-text{color:rgba(0, 0, 0, 0.87);color:var(--mdc-select-ink-color, rgba(0, 0, 0, 0.87))}:host(:not([disabled])) .mdc-select:not(.mdc-select--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42);border-bottom-color:var(--mdc-select-idle-line-color, rgba(0, 0, 0, 0.42))}:host(:not([disabled])) .mdc-select:not(.mdc-select--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87);border-bottom-color:var(--mdc-select-hover-line-color, rgba(0, 0, 0, 0.87))}:host(:not([disabled])) .mdc-select:not(.mdc-select--outlined):not(.mdc-select--disabled) .mdc-select__anchor{background-color:whitesmoke;background-color:var(--mdc-select-fill-color, whitesmoke)}:host(:not([disabled])) .mdc-select.mdc-select--invalid .mdc-select__dropdown-icon{fill:var(--mdc-select-error-dropdown-icon-color, var(--mdc-select-error-color, var(--mdc-theme-error, #b00020)))}:host(:not([disabled])) .mdc-select.mdc-select--invalid .mdc-floating-label,:host(:not([disabled])) .mdc-select.mdc-select--invalid .mdc-floating-label::after{color:var(--mdc-select-error-color, var(--mdc-theme-error, #b00020))}:host(:not([disabled])) .mdc-select.mdc-select--invalid mwc-notched-outline{--mdc-notched-outline-border-color: var(--mdc-select-error-color, var(--mdc-theme-error, #b00020))}.mdc-select__menu--invalid{--mdc-theme-primary: var(--mdc-select-error-color, var(--mdc-theme-error, #b00020))}:host(:not([disabled])) .mdc-select:not(.mdc-select--invalid):not(.mdc-select--focused) .mdc-floating-label,:host(:not([disabled])) .mdc-select:not(.mdc-select--invalid):not(.mdc-select--focused) .mdc-floating-label::after{color:rgba(0, 0, 0, 0.6);color:var(--mdc-select-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-select:not(.mdc-select--invalid):not(.mdc-select--focused) .mdc-select__dropdown-icon{fill:rgba(0, 0, 0, 0.54);fill:var(--mdc-select-dropdown-icon-color, rgba(0, 0, 0, 0.54))}:host(:not([disabled])) .mdc-select.mdc-select--focused mwc-notched-outline{--mdc-notched-outline-stroke-width: 2px;--mdc-notched-outline-notch-offset: 2px}:host(:not([disabled])) .mdc-select.mdc-select--focused:not(.mdc-select--invalid) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-select-focused-label-color, var(--mdc-theme-primary, rgba(98, 0, 238, 0.87)) )}:host(:not([disabled])) .mdc-select.mdc-select--focused:not(.mdc-select--invalid) .mdc-select__dropdown-icon{fill:rgba(98,0,238,.87);fill:var(--mdc-select-focused-dropdown-icon-color, var(--mdc-theme-primary, rgba(98, 0, 238, 0.87)))}:host(:not([disabled])) .mdc-select.mdc-select--focused:not(.mdc-select--invalid) .mdc-floating-label{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host(:not([disabled])) .mdc-select.mdc-select--focused:not(.mdc-select--invalid) .mdc-floating-label::after{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host(:not([disabled])) .mdc-select-helper-text:not(.mdc-select-helper-text--validation-msg){color:var(--mdc-select-label-ink-color, rgba(0, 0, 0, 0.6))}:host([disabled]){pointer-events:none}:host([disabled]) .mdc-select:not(.mdc-select--outlined).mdc-select--disabled .mdc-select__anchor{background-color:#fafafa;background-color:var(--mdc-select-disabled-fill-color, #fafafa)}:host([disabled]) .mdc-select.mdc-select--outlined mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-select-outlined-disabled-border-color, rgba(0, 0, 0, 0.06) )}:host([disabled]) .mdc-select .mdc-select__dropdown-icon{fill:rgba(0, 0, 0, 0.38);fill:var(--mdc-select-disabled-dropdown-icon-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-select:not(.mdc-select--invalid):not(.mdc-select--focused) .mdc-floating-label,:host([disabled]) .mdc-select:not(.mdc-select--invalid):not(.mdc-select--focused) .mdc-floating-label::after{color:rgba(0, 0, 0, 0.38);color:var(--mdc-select-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-select-helper-text{color:rgba(0, 0, 0, 0.38);color:var(--mdc-select-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-select__selected-text{color:rgba(0, 0, 0, 0.38);color:var(--mdc-select-disabled-ink-color, rgba(0, 0, 0, 0.38))}`;let Mr=class extends Nr{static get styles(){return jr}};Mr=o([s("floor3d-select")],Mr);
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
var Pr={ARIA_CONTROLS:"aria-controls",ARIA_DESCRIBEDBY:"aria-describedby",INPUT_SELECTOR:".mdc-text-field__input",LABEL_SELECTOR:".mdc-floating-label",LEADING_ICON_SELECTOR:".mdc-text-field__icon--leading",LINE_RIPPLE_SELECTOR:".mdc-line-ripple",OUTLINE_SELECTOR:".mdc-notched-outline",PREFIX_SELECTOR:".mdc-text-field__affix--prefix",SUFFIX_SELECTOR:".mdc-text-field__affix--suffix",TRAILING_ICON_SELECTOR:".mdc-text-field__icon--trailing"},Fr={DISABLED:"mdc-text-field--disabled",FOCUSED:"mdc-text-field--focused",HELPER_LINE:"mdc-text-field-helper-line",INVALID:"mdc-text-field--invalid",LABEL_FLOATING:"mdc-text-field--label-floating",NO_LABEL:"mdc-text-field--no-label",OUTLINED:"mdc-text-field--outlined",ROOT:"mdc-text-field",TEXTAREA:"mdc-text-field--textarea",WITH_LEADING_ICON:"mdc-text-field--with-leading-icon",WITH_TRAILING_ICON:"mdc-text-field--with-trailing-icon",WITH_INTERNAL_COUNTER:"mdc-text-field--with-internal-counter"},zr={LABEL_SCALE:.75},Hr=["pattern","min","max","required","step","minlength","maxlength"],Ur=["color","date","datetime-local","month","range","time","week"],Dr=["mousedown","touchstart"],Br=["click","keydown"],Vr=function(o){function n(t,i){void 0===i&&(i={});var s=o.call(this,e(e({},n.defaultAdapter),t))||this;return s.isFocused=!1,s.receivedUserInput=!1,s.valid=!0,s.useNativeValidation=!0,s.validateOnValueChange=!0,s.helperText=i.helperText,s.characterCounter=i.characterCounter,s.leadingIcon=i.leadingIcon,s.trailingIcon=i.trailingIcon,s.inputFocusHandler=function(){s.activateFocus()},s.inputBlurHandler=function(){s.deactivateFocus()},s.inputInputHandler=function(){s.handleInput()},s.setPointerXOffset=function(t){s.setTransformOrigin(t)},s.textFieldInteractionHandler=function(){s.handleTextFieldInteraction()},s.validationAttributeChangeHandler=function(t){s.handleValidationAttributeChange(t)},s}return t(n,o),Object.defineProperty(n,"cssClasses",{get:function(){return Fr},enumerable:!1,configurable:!0}),Object.defineProperty(n,"strings",{get:function(){return Pr},enumerable:!1,configurable:!0}),Object.defineProperty(n,"numbers",{get:function(){return zr},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"shouldAlwaysFloat",{get:function(){var t=this.getNativeInput().type;return Ur.indexOf(t)>=0},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"shouldFloat",{get:function(){return this.shouldAlwaysFloat||this.isFocused||!!this.getValue()||this.isBadInput()},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"shouldShake",{get:function(){return!this.isFocused&&!this.isValid()&&!!this.getValue()},enumerable:!1,configurable:!0}),Object.defineProperty(n,"defaultAdapter",{get:function(){return{addClass:function(){},removeClass:function(){},hasClass:function(){return!0},setInputAttr:function(){},removeInputAttr:function(){},registerTextFieldInteractionHandler:function(){},deregisterTextFieldInteractionHandler:function(){},registerInputInteractionHandler:function(){},deregisterInputInteractionHandler:function(){},registerValidationAttributeChangeHandler:function(){return new MutationObserver(function(){})},deregisterValidationAttributeChangeHandler:function(){},getNativeInput:function(){return null},isFocused:function(){return!1},activateLineRipple:function(){},deactivateLineRipple:function(){},setLineRippleTransformOrigin:function(){},shakeLabel:function(){},floatLabel:function(){},setLabelRequired:function(){},hasLabel:function(){return!1},getLabelWidth:function(){return 0},hasOutline:function(){return!1},notchOutline:function(){},closeOutline:function(){}}},enumerable:!1,configurable:!0}),n.prototype.init=function(){var t,e,o,n;this.adapter.hasLabel()&&this.getNativeInput().required&&this.adapter.setLabelRequired(!0),this.adapter.isFocused()?this.inputFocusHandler():this.adapter.hasLabel()&&this.shouldFloat&&(this.notchOutline(!0),this.adapter.floatLabel(!0),this.styleFloating(!0)),this.adapter.registerInputInteractionHandler("focus",this.inputFocusHandler),this.adapter.registerInputInteractionHandler("blur",this.inputBlurHandler),this.adapter.registerInputInteractionHandler("input",this.inputInputHandler);try{for(var s=i(Dr),l=s.next();!l.done;l=s.next()){var r=l.value;this.adapter.registerInputInteractionHandler(r,this.setPointerXOffset)}}catch(e){t={error:e}}finally{try{l&&!l.done&&(e=s.return)&&e.call(s)}finally{if(t)throw t.error}}try{for(var d=i(Br),a=d.next();!a.done;a=d.next()){r=a.value;this.adapter.registerTextFieldInteractionHandler(r,this.textFieldInteractionHandler)}}catch(t){o={error:t}}finally{try{a&&!a.done&&(n=d.return)&&n.call(d)}finally{if(o)throw o.error}}this.validationObserver=this.adapter.registerValidationAttributeChangeHandler(this.validationAttributeChangeHandler),this.setcharacterCounter(this.getValue().length)},n.prototype.destroy=function(){var t,e,o,n;this.adapter.deregisterInputInteractionHandler("focus",this.inputFocusHandler),this.adapter.deregisterInputInteractionHandler("blur",this.inputBlurHandler),this.adapter.deregisterInputInteractionHandler("input",this.inputInputHandler);try{for(var s=i(Dr),l=s.next();!l.done;l=s.next()){var r=l.value;this.adapter.deregisterInputInteractionHandler(r,this.setPointerXOffset)}}catch(e){t={error:e}}finally{try{l&&!l.done&&(e=s.return)&&e.call(s)}finally{if(t)throw t.error}}try{for(var d=i(Br),a=d.next();!a.done;a=d.next()){r=a.value;this.adapter.deregisterTextFieldInteractionHandler(r,this.textFieldInteractionHandler)}}catch(t){o={error:t}}finally{try{a&&!a.done&&(n=d.return)&&n.call(d)}finally{if(o)throw o.error}}this.adapter.deregisterValidationAttributeChangeHandler(this.validationObserver)},n.prototype.handleTextFieldInteraction=function(){var t=this.adapter.getNativeInput();t&&t.disabled||(this.receivedUserInput=!0)},n.prototype.handleValidationAttributeChange=function(t){var e=this;t.some(function(t){return Hr.indexOf(t)>-1&&(e.styleValidity(!0),e.adapter.setLabelRequired(e.getNativeInput().required),!0)}),t.indexOf("maxlength")>-1&&this.setcharacterCounter(this.getValue().length)},n.prototype.notchOutline=function(t){if(this.adapter.hasOutline()&&this.adapter.hasLabel())if(t){var e=this.adapter.getLabelWidth()*zr.LABEL_SCALE;this.adapter.notchOutline(e)}else this.adapter.closeOutline()},n.prototype.activateFocus=function(){this.isFocused=!0,this.styleFocused(this.isFocused),this.adapter.activateLineRipple(),this.adapter.hasLabel()&&(this.notchOutline(this.shouldFloat),this.adapter.floatLabel(this.shouldFloat),this.styleFloating(this.shouldFloat),this.adapter.shakeLabel(this.shouldShake)),!this.helperText||!this.helperText.isPersistent()&&this.helperText.isValidation()&&this.valid||this.helperText.showToScreenReader()},n.prototype.setTransformOrigin=function(t){if(!this.isDisabled()&&!this.adapter.hasOutline()){var e=t.touches,i=e?e[0]:t,o=i.target.getBoundingClientRect(),n=i.clientX-o.left;this.adapter.setLineRippleTransformOrigin(n)}},n.prototype.handleInput=function(){this.autoCompleteFocus(),this.setcharacterCounter(this.getValue().length)},n.prototype.autoCompleteFocus=function(){this.receivedUserInput||this.activateFocus()},n.prototype.deactivateFocus=function(){this.isFocused=!1,this.adapter.deactivateLineRipple();var t=this.isValid();this.styleValidity(t),this.styleFocused(this.isFocused),this.adapter.hasLabel()&&(this.notchOutline(this.shouldFloat),this.adapter.floatLabel(this.shouldFloat),this.styleFloating(this.shouldFloat),this.adapter.shakeLabel(this.shouldShake)),this.shouldFloat||(this.receivedUserInput=!1)},n.prototype.getValue=function(){return this.getNativeInput().value},n.prototype.setValue=function(t){if(this.getValue()!==t&&(this.getNativeInput().value=t),this.setcharacterCounter(t.length),this.validateOnValueChange){var e=this.isValid();this.styleValidity(e)}this.adapter.hasLabel()&&(this.notchOutline(this.shouldFloat),this.adapter.floatLabel(this.shouldFloat),this.styleFloating(this.shouldFloat),this.validateOnValueChange&&this.adapter.shakeLabel(this.shouldShake))},n.prototype.isValid=function(){return this.useNativeValidation?this.isNativeInputValid():this.valid},n.prototype.setValid=function(t){this.valid=t,this.styleValidity(t);var e=!t&&!this.isFocused&&!!this.getValue();this.adapter.hasLabel()&&this.adapter.shakeLabel(e)},n.prototype.setValidateOnValueChange=function(t){this.validateOnValueChange=t},n.prototype.getValidateOnValueChange=function(){return this.validateOnValueChange},n.prototype.setUseNativeValidation=function(t){this.useNativeValidation=t},n.prototype.isDisabled=function(){return this.getNativeInput().disabled},n.prototype.setDisabled=function(t){this.getNativeInput().disabled=t,this.styleDisabled(t)},n.prototype.setHelperTextContent=function(t){this.helperText&&this.helperText.setContent(t)},n.prototype.setLeadingIconAriaLabel=function(t){this.leadingIcon&&this.leadingIcon.setAriaLabel(t)},n.prototype.setLeadingIconContent=function(t){this.leadingIcon&&this.leadingIcon.setContent(t)},n.prototype.setTrailingIconAriaLabel=function(t){this.trailingIcon&&this.trailingIcon.setAriaLabel(t)},n.prototype.setTrailingIconContent=function(t){this.trailingIcon&&this.trailingIcon.setContent(t)},n.prototype.setcharacterCounter=function(t){if(this.characterCounter){var e=this.getNativeInput().maxLength;if(-1===e)throw new Error("MDCTextFieldFoundation: Expected maxlength html property on text input or textarea.");this.characterCounter.setCounterValue(t,e)}},n.prototype.isBadInput=function(){return this.getNativeInput().validity.badInput||!1},n.prototype.isNativeInputValid=function(){return this.getNativeInput().validity.valid},n.prototype.styleValidity=function(t){var e=n.cssClasses.INVALID;if(t?this.adapter.removeClass(e):this.adapter.addClass(e),this.helperText){if(this.helperText.setValidity(t),!this.helperText.isValidation())return;var i=this.helperText.isVisible(),o=this.helperText.getId();i&&o?this.adapter.setInputAttr(Pr.ARIA_DESCRIBEDBY,o):this.adapter.removeInputAttr(Pr.ARIA_DESCRIBEDBY)}},n.prototype.styleFocused=function(t){var e=n.cssClasses.FOCUSED;t?this.adapter.addClass(e):this.adapter.removeClass(e)},n.prototype.styleDisabled=function(t){var e=n.cssClasses,i=e.DISABLED,o=e.INVALID;t?(this.adapter.addClass(i),this.adapter.removeClass(o)):this.adapter.removeClass(i),this.leadingIcon&&this.leadingIcon.setDisabled(t),this.trailingIcon&&this.trailingIcon.setDisabled(t)},n.prototype.styleFloating=function(t){var e=n.cssClasses.LABEL_FLOATING;t?this.adapter.addClass(e):this.adapter.removeClass(e)},n.prototype.getNativeInput=function(){return(this.adapter?this.adapter.getNativeInput():null)||{disabled:!1,maxLength:-1,required:!1,type:"input",validity:{badInput:!1,valid:!0},value:""}},n}(E);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Gr=window,Wr=Gr.ShadowRoot&&(void 0===Gr.ShadyCSS||Gr.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Xr=Symbol(),qr=new WeakMap;let Yr=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Xr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Wr&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=qr.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&qr.set(e,t))}return t}toString(){return this.cssText}};const Kr=Wr?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new Yr("string"==typeof t?t:t+"",void 0,Xr))(e)})(t):t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Zr;const Jr=window,Qr=Jr.trustedTypes,td=Qr?Qr.emptyScript:"",ed=Jr.reactiveElementPolyfillSupport,id={toAttribute(t,e){switch(e){case Boolean:t=t?td:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},od=(t,e)=>e!==t&&(e==e||t==t),nd={attribute:!0,type:String,converter:id,reflect:!1,hasChanged:od},sd="finalized";let ld=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const o=this._$Ep(i,e);void 0!==o&&(this._$Ev.set(o,i),t.push(o))}),t}static createProperty(t,e=nd){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,i,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(o){const n=this[t];this[e]=o,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||nd}static finalize(){if(this.hasOwnProperty(sd))return!1;this[sd]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(Kr(t))}else void 0!==t&&e.push(Kr(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach(t=>t(this))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{Wr?t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(e=>{const i=document.createElement("style"),o=Gr.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=e.cssText,t.appendChild(i)})})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)})}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=nd){var o;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const s=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:id).toAttribute(e,i.type);this._$El=t,null==s?this.removeAttribute(n):this.setAttribute(n,s),this._$El=null}}_$AK(t,e){var i;const o=this.constructor,n=o._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=o.getPropertyOptions(n),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:id;this._$El=n,this[n]=s.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let o=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||od)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((t,e)=>this[e]=t),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach(t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)}),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach(t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach((t,e)=>this._$EO(e,this[e],t)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var rd;ld[sd]=!0,ld.elementProperties=new Map,ld.elementStyles=[],ld.shadowRootOptions={mode:"open"},null==ed||ed({ReactiveElement:ld}),(null!==(Zr=Jr.reactiveElementVersions)&&void 0!==Zr?Zr:Jr.reactiveElementVersions=[]).push("1.6.3");const dd=window,ad=dd.trustedTypes,cd=ad?ad.createPolicy("lit-html",{createHTML:t=>t}):void 0,hd="$lit$",md=`lit$${(Math.random()+"").slice(9)}$`,pd="?"+md,ud=`<${pd}>`,fd=document,gd=()=>fd.createComment(""),vd=t=>null===t||"object"!=typeof t&&"function"!=typeof t,_d=Array.isArray,bd="[ \t\n\f\r]",xd=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,yd=/-->/g,$d=/>/g,Ad=RegExp(`>|${bd}(?:([^\\s"'>=/]+)(${bd}*=${bd}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),wd=/'/g,Ed=/"/g,Cd=/^(?:script|style|textarea|title)$/i,Sd=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),Od=Symbol.for("lit-noChange"),Id=Symbol.for("lit-nothing"),Td=new WeakMap,kd=fd.createTreeWalker(fd,129,null,!1);function Rd(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==cd?cd.createHTML(e):e}const Ld=(t,e)=>{const i=t.length-1,o=[];let n,s=2===e?"<svg>":"",l=xd;for(let e=0;e<i;e++){const i=t[e];let r,d,a=-1,c=0;for(;c<i.length&&(l.lastIndex=c,d=l.exec(i),null!==d);)c=l.lastIndex,l===xd?"!--"===d[1]?l=yd:void 0!==d[1]?l=$d:void 0!==d[2]?(Cd.test(d[2])&&(n=RegExp("</"+d[2],"g")),l=Ad):void 0!==d[3]&&(l=Ad):l===Ad?">"===d[0]?(l=null!=n?n:xd,a=-1):void 0===d[1]?a=-2:(a=l.lastIndex-d[2].length,r=d[1],l=void 0===d[3]?Ad:'"'===d[3]?Ed:wd):l===Ed||l===wd?l=Ad:l===yd||l===$d?l=xd:(l=Ad,n=void 0);const h=l===Ad&&t[e+1].startsWith("/>")?" ":"";s+=l===xd?i+ud:a>=0?(o.push(r),i.slice(0,a)+hd+i.slice(a)+md+h):i+md+(-2===a?(o.push(void 0),e):h)}return[Rd(t,s+(t[i]||"<?>")+(2===e?"</svg>":"")),o]};class Nd{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let n=0,s=0;const l=t.length-1,r=this.parts,[d,a]=Ld(t,e);if(this.el=Nd.createElement(d,i),kd.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(o=kd.nextNode())&&r.length<l;){if(1===o.nodeType){if(o.hasAttributes()){const t=[];for(const e of o.getAttributeNames())if(e.endsWith(hd)||e.startsWith(md)){const i=a[s++];if(t.push(e),void 0!==i){const t=o.getAttribute(i.toLowerCase()+hd).split(md),e=/([.?@])?(.*)/.exec(i);r.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?zd:"?"===e[1]?Ud:"@"===e[1]?Dd:Fd})}else r.push({type:6,index:n})}for(const e of t)o.removeAttribute(e)}if(Cd.test(o.tagName)){const t=o.textContent.split(md),e=t.length-1;if(e>0){o.textContent=ad?ad.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],gd()),kd.nextNode(),r.push({type:2,index:++n});o.append(t[e],gd())}}}else if(8===o.nodeType)if(o.data===pd)r.push({type:2,index:n});else{let t=-1;for(;-1!==(t=o.data.indexOf(md,t+1));)r.push({type:7,index:n}),t+=md.length-1}n++}}static createElement(t,e){const i=fd.createElement("template");return i.innerHTML=t,i}}function jd(t,e,i=t,o){var n,s,l,r;if(e===Od)return e;let d=void 0!==o?null===(n=i._$Co)||void 0===n?void 0:n[o]:i._$Cl;const a=vd(e)?void 0:e._$litDirective$;return(null==d?void 0:d.constructor)!==a&&(null===(s=null==d?void 0:d._$AO)||void 0===s||s.call(d,!1),void 0===a?d=void 0:(d=new a(t),d._$AT(t,i,o)),void 0!==o?(null!==(l=(r=i)._$Co)&&void 0!==l?l:r._$Co=[])[o]=d:i._$Cl=d),void 0!==d&&(e=jd(t,d._$AS(t,e.values),d,o)),e}class Md{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:o}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:fd).importNode(i,!0);kd.currentNode=n;let s=kd.nextNode(),l=0,r=0,d=o[0];for(;void 0!==d;){if(l===d.index){let e;2===d.type?e=new Pd(s,s.nextSibling,this,t):1===d.type?e=new d.ctor(s,d.name,d.strings,this,t):6===d.type&&(e=new Bd(s,this,t)),this._$AV.push(e),d=o[++r]}l!==(null==d?void 0:d.index)&&(s=kd.nextNode(),l++)}return kd.currentNode=fd,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Pd{constructor(t,e,i,o){var n;this.type=2,this._$AH=Id,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cp=null===(n=null==o?void 0:o.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=jd(this,t,e),vd(t)?t===Id||null==t||""===t?(this._$AH!==Id&&this._$AR(),this._$AH=Id):t!==this._$AH&&t!==Od&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>_d(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==Id&&vd(this._$AH)?this._$AA.nextSibling.data=t:this.$(fd.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:o}=t,n="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=Nd.createElement(Rd(o.h,o.h[0]),this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new Md(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=Td.get(t.strings);return void 0===e&&Td.set(t.strings,e=new Nd(t)),e}T(t){_d(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,o=0;for(const n of t)o===e.length?e.push(i=new Pd(this.k(gd()),this.k(gd()),this,this.options)):i=e[o],i._$AI(n),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Fd{constructor(t,e,i,o,n){this.type=1,this._$AH=Id,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Id}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,o){const n=this.strings;let s=!1;if(void 0===n)t=jd(this,t,e,0),s=!vd(t)||t!==this._$AH&&t!==Od,s&&(this._$AH=t);else{const o=t;let l,r;for(t=n[0],l=0;l<n.length-1;l++)r=jd(this,o[i+l],e,l),r===Od&&(r=this._$AH[l]),s||(s=!vd(r)||r!==this._$AH[l]),r===Id?t=Id:t!==Id&&(t+=(null!=r?r:"")+n[l+1]),this._$AH[l]=r}s&&!o&&this.j(t)}j(t){t===Id?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class zd extends Fd{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Id?void 0:t}}const Hd=ad?ad.emptyScript:"";class Ud extends Fd{constructor(){super(...arguments),this.type=4}j(t){t&&t!==Id?this.element.setAttribute(this.name,Hd):this.element.removeAttribute(this.name)}}class Dd extends Fd{constructor(t,e,i,o,n){super(t,e,i,o,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=jd(this,t,e,0))&&void 0!==i?i:Id)===Od)return;const o=this._$AH,n=t===Id&&o!==Id||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==Id&&(o===Id||n);n&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class Bd{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){jd(this,t)}}const Vd=dd.litHtmlPolyfillSupport;null==Vd||Vd(Nd,Pd),(null!==(rd=dd.litHtmlVersions)&&void 0!==rd?rd:dd.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Gd,Wd;let Xd=class extends ld{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var o,n;const s=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:e;let l=s._$litPart$;if(void 0===l){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;s._$litPart$=l=new Pd(e.insertBefore(gd(),t),t,void 0,null!=i?i:{})}return l._$AI(t),l})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return Od}};Xd.finalized=!0,Xd._$litElement$=!0,null===(Gd=globalThis.litElementHydrateSupport)||void 0===Gd||Gd.call(globalThis,{LitElement:Xd});const qd=globalThis.litElementPolyfillSupport;null==qd||qd({LitElement:Xd}),(null!==(Wd=globalThis.litElementVersions)&&void 0!==Wd?Wd:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Yd=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function Kd(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Yd(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Zd(t){return Kd({...t,state:!0})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jd=({finisher:t,descriptor:e})=>(i,o)=>{var n;if(void 0===o){const o=null!==(n=i.originalKey)&&void 0!==n?n:i.key,s=null!=e?{kind:"method",placement:"prototype",key:o,descriptor:e(i.key)}:{...i,key:o};return null!=t&&(s.finisher=function(e){t(e,o)}),s}{const n=i.constructor;void 0!==e&&Object.defineProperty(i,o,e(o)),null==t||t(n,o)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function Qd(t,e){return Jd({descriptor:e=>{const i={get(){var e,i;return null!==(i=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==i?i:null},enumerable:!0,configurable:!0};return i}})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ta;null===(ta=window.HTMLSlotElement)||void 0===ta||ta.prototype.assignedElements;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ea=1,ia=3,oa=4,na=t=>(...e)=>({_$litDirective$:t,values:e});class sa{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const la=na(class extends sa{constructor(t){var e;if(super(t),t.type!==ea||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var i,o;if(void 0===this.it){this.it=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t)));for(const t in e)e[t]&&!(null===(i=this.nt)||void 0===i?void 0:i.has(t))&&this.it.add(t);return this.render(e)}const n=t.element.classList;this.it.forEach(t=>{t in e||(n.remove(t),this.it.delete(t))});for(const t in e){const i=!!e[t];i===this.it.has(t)||(null===(o=this.nt)||void 0===o?void 0:o.has(t))||(i?(n.add(t),this.it.add(t)):(n.remove(t),this.it.delete(t)))}return Od}}),ra=t=>null!=t?t:Id,da={},aa=na(class extends sa{constructor(t){if(super(t),t.type!==ia&&t.type!==ea&&t.type!==oa)throw Error("The `live` directive is not allowed on child or event bindings");if(!(t=>void 0===t.strings)(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===Od||e===Id)return e;const i=t.element,o=t.name;if(t.type===ia){if(e===i[o])return Od}else if(t.type===oa){if(!!e===i.hasAttribute(o))return Od}else if(t.type===ea&&i.getAttribute(o)===e+"")return Od;return((t,e=da)=>{t._$AH=e;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */})(t),e}}),ca=["touchstart","touchmove","scroll","mousewheel"],ha=(t={})=>{const e={};for(const i in t)e[i]=t[i];return Object.assign({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1},e)};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ma extends Pn{constructor(){super(...arguments),this.mdcFoundationClass=Vr,this.value="",this.type="text",this.placeholder="",this.label="",this.icon="",this.iconTrailing="",this.disabled=!1,this.required=!1,this.minLength=-1,this.maxLength=-1,this.outlined=!1,this.helper="",this.validateOnInitialRender=!1,this.validationMessage="",this.autoValidate=!1,this.pattern="",this.min="",this.max="",this.step=null,this.size=null,this.helperPersistent=!1,this.charCounter=!1,this.endAligned=!1,this.prefix="",this.suffix="",this.name="",this.readOnly=!1,this.autocapitalize="",this.outlineOpen=!1,this.outlineWidth=0,this.isUiValid=!0,this.focused=!1,this._validity=ha(),this.validityTransform=null}get validity(){return this._checkValidity(this.value),this._validity}get willValidate(){return this.formElement.willValidate}get selectionStart(){return this.formElement.selectionStart}get selectionEnd(){return this.formElement.selectionEnd}focus(){const t=new CustomEvent("focus");this.formElement.dispatchEvent(t),this.formElement.focus()}blur(){const t=new CustomEvent("blur");this.formElement.dispatchEvent(t),this.formElement.blur()}select(){this.formElement.select()}setSelectionRange(t,e,i){this.formElement.setSelectionRange(t,e,i)}update(t){t.has("autoValidate")&&this.mdcFoundation&&this.mdcFoundation.setValidateOnValueChange(this.autoValidate),t.has("value")&&"string"!=typeof this.value&&(this.value=`${this.value}`),super.update(t)}setFormData(t){this.name&&t.append(this.name,this.value)}render(){const t=this.charCounter&&-1!==this.maxLength,e=!!this.helper||!!this.validationMessage||t,i={"mdc-text-field--disabled":this.disabled,"mdc-text-field--no-label":!this.label,"mdc-text-field--filled":!this.outlined,"mdc-text-field--outlined":this.outlined,"mdc-text-field--with-leading-icon":this.icon,"mdc-text-field--with-trailing-icon":this.iconTrailing,"mdc-text-field--end-aligned":this.endAligned};return Sd`
      <label class="mdc-text-field ${la(i)}">
        ${this.renderRipple()}
        ${this.outlined?this.renderOutline():this.renderLabel()}
        ${this.renderLeadingIcon()}
        ${this.renderPrefix()}
        ${this.renderInput(e)}
        ${this.renderSuffix()}
        ${this.renderTrailingIcon()}
        ${this.renderLineRipple()}
      </label>
      ${this.renderHelperText(e,t)}
    `}updated(t){t.has("value")&&void 0!==t.get("value")&&(this.mdcFoundation.setValue(this.value),this.autoValidate&&this.reportValidity())}renderRipple(){return this.outlined?"":Sd`
      <span class="mdc-text-field__ripple"></span>
    `}renderOutline(){return this.outlined?Sd`
      <mwc-notched-outline
          .width=${this.outlineWidth}
          .open=${this.outlineOpen}
          class="mdc-notched-outline">
        ${this.renderLabel()}
      </mwc-notched-outline>`:""}renderLabel(){return this.label?Sd`
      <span
          .floatingLabelFoundation=${al(this.label)}
          id="label">${this.label}</span>
    `:""}renderLeadingIcon(){return this.icon?this.renderIcon(this.icon):""}renderTrailingIcon(){return this.iconTrailing?this.renderIcon(this.iconTrailing,!0):""}renderIcon(t,e=!1){return Sd`<i class="material-icons mdc-text-field__icon ${la({"mdc-text-field__icon--leading":!e,"mdc-text-field__icon--trailing":e})}">${t}</i>`}renderPrefix(){return this.prefix?this.renderAffix(this.prefix):""}renderSuffix(){return this.suffix?this.renderAffix(this.suffix,!0):""}renderAffix(t,e=!1){return Sd`<span class="mdc-text-field__affix ${la({"mdc-text-field__affix--prefix":!e,"mdc-text-field__affix--suffix":e})}">
        ${t}</span>`}renderInput(t){const e=-1===this.minLength?void 0:this.minLength,i=-1===this.maxLength?void 0:this.maxLength,o=this.autocapitalize?this.autocapitalize:void 0,n=this.validationMessage&&!this.isUiValid,s=this.label?"label":void 0,l=t?"helper-text":void 0,r=this.focused||this.helperPersistent||n?"helper-text":void 0;return Sd`
      <input
          aria-labelledby=${ra(s)}
          aria-controls="${ra(l)}"
          aria-describedby="${ra(r)}"
          class="mdc-text-field__input"
          type="${this.type}"
          .value="${aa(this.value)}"
          ?disabled="${this.disabled}"
          placeholder="${this.placeholder}"
          ?required="${this.required}"
          ?readonly="${this.readOnly}"
          minlength="${ra(e)}"
          maxlength="${ra(i)}"
          pattern="${ra(this.pattern?this.pattern:void 0)}"
          min="${ra(""===this.min?void 0:this.min)}"
          max="${ra(""===this.max?void 0:this.max)}"
          step="${ra(null===this.step?void 0:this.step)}"
          size="${ra(null===this.size?void 0:this.size)}"
          name="${ra(""===this.name?void 0:this.name)}"
          inputmode="${ra(this.inputMode)}"
          autocapitalize="${ra(o)}"
          @input="${this.handleInputChange}"
          @focus="${this.onInputFocus}"
          @blur="${this.onInputBlur}">`}renderLineRipple(){return this.outlined?"":Sd`
      <span .lineRippleFoundation=${fl()}></span>
    `}renderHelperText(t,e){const i=this.validationMessage&&!this.isUiValid,o={"mdc-text-field-helper-text--persistent":this.helperPersistent,"mdc-text-field-helper-text--validation-msg":i},n=this.focused||this.helperPersistent||i?void 0:"true",s=i?this.validationMessage:this.helper;return t?Sd`
      <div class="mdc-text-field-helper-line">
        <div id="helper-text"
             aria-hidden="${ra(n)}"
             class="mdc-text-field-helper-text ${la(o)}"
             >${s}</div>
        ${this.renderCharCounter(e)}
      </div>`:""}renderCharCounter(t){const e=Math.min(this.value.length,this.maxLength);return t?Sd`
      <span class="mdc-text-field-character-counter"
            >${e} / ${this.maxLength}</span>`:""}onInputFocus(){this.focused=!0}onInputBlur(){this.focused=!1,this.reportValidity()}checkValidity(){const t=this._checkValidity(this.value);if(!t){const t=new Event("invalid",{bubbles:!1,cancelable:!0});this.dispatchEvent(t)}return t}reportValidity(){const t=this.checkValidity();return this.mdcFoundation.setValid(t),this.isUiValid=t,t}_checkValidity(t){const e=this.formElement.validity;let i=ha(e);if(this.validityTransform){const e=this.validityTransform(t,i);i=Object.assign(Object.assign({},i),e),this.mdcFoundation.setUseNativeValidation(!1)}else this.mdcFoundation.setUseNativeValidation(!0);return this._validity=i,this._validity.valid}setCustomValidity(t){this.validationMessage=t,this.formElement.setCustomValidity(t)}handleInputChange(){this.value=this.formElement.value}createAdapter(){return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},this.getRootAdapterMethods()),this.getInputAdapterMethods()),this.getLabelAdapterMethods()),this.getLineRippleAdapterMethods()),this.getOutlineAdapterMethods())}getRootAdapterMethods(){return Object.assign({registerTextFieldInteractionHandler:(t,e)=>this.addEventListener(t,e),deregisterTextFieldInteractionHandler:(t,e)=>this.removeEventListener(t,e),registerValidationAttributeChangeHandler:t=>{const e=new MutationObserver(e=>{t((t=>t.map(t=>t.attributeName).filter(t=>t))(e))});return e.observe(this.formElement,{attributes:!0}),e},deregisterValidationAttributeChangeHandler:t=>t.disconnect()},Wt(this.mdcRoot))}getInputAdapterMethods(){return{getNativeInput:()=>this.formElement,setInputAttr:()=>{},removeInputAttr:()=>{},isFocused:()=>!!this.shadowRoot&&this.shadowRoot.activeElement===this.formElement,registerInputInteractionHandler:(t,e)=>this.formElement.addEventListener(t,e,{passive:t in ca}),deregisterInputInteractionHandler:(t,e)=>this.formElement.removeEventListener(t,e)}}getLabelAdapterMethods(){return{floatLabel:t=>this.labelElement&&this.labelElement.floatingLabelFoundation.float(t),getLabelWidth:()=>this.labelElement?this.labelElement.floatingLabelFoundation.getWidth():0,hasLabel:()=>Boolean(this.labelElement),shakeLabel:t=>this.labelElement&&this.labelElement.floatingLabelFoundation.shake(t),setLabelRequired:t=>{this.labelElement&&this.labelElement.floatingLabelFoundation.setRequired(t)}}}getLineRippleAdapterMethods(){return{activateLineRipple:()=>{this.lineRippleElement&&this.lineRippleElement.lineRippleFoundation.activate()},deactivateLineRipple:()=>{this.lineRippleElement&&this.lineRippleElement.lineRippleFoundation.deactivate()},setLineRippleTransformOrigin:t=>{this.lineRippleElement&&this.lineRippleElement.lineRippleFoundation.setRippleCenter(t)}}}async getUpdateComplete(){var t;const e=await super.getUpdateComplete();return await(null===(t=this.outlineElement)||void 0===t?void 0:t.updateComplete),e}firstUpdated(){var t;super.firstUpdated(),this.mdcFoundation.setValidateOnValueChange(this.autoValidate),this.validateOnInitialRender&&this.reportValidity(),null===(t=this.outlineElement)||void 0===t||t.updateComplete.then(()=>{var t;this.outlineWidth=(null===(t=this.labelElement)||void 0===t?void 0:t.floatingLabelFoundation.getWidth())||0})}getOutlineAdapterMethods(){return{closeOutline:()=>this.outlineElement&&(this.outlineOpen=!1),hasOutline:()=>Boolean(this.outlineElement),notchOutline:t=>{this.outlineElement&&!this.outlineOpen&&(this.outlineWidth=t,this.outlineOpen=!0)}}}async layout(){await this.updateComplete;const t=this.labelElement;if(!t)return void(this.outlineOpen=!1);const e=!!this.label&&!!this.value;if(t.floatingLabelFoundation.float(e),!this.outlined)return;this.outlineOpen=e,await this.updateComplete;const i=t.floatingLabelFoundation.getWidth();this.outlineOpen&&(this.outlineWidth=i,await this.updateComplete)}}o([Qd(".mdc-text-field")],ma.prototype,"mdcRoot",void 0),o([Qd("input")],ma.prototype,"formElement",void 0),o([Qd(".mdc-floating-label")],ma.prototype,"labelElement",void 0),o([Qd(".mdc-line-ripple")],ma.prototype,"lineRippleElement",void 0),o([Qd("mwc-notched-outline")],ma.prototype,"outlineElement",void 0),o([Qd(".mdc-notched-outline__notch")],ma.prototype,"notchElement",void 0),o([Kd({type:String})],ma.prototype,"value",void 0),o([Kd({type:String})],ma.prototype,"type",void 0),o([Kd({type:String})],ma.prototype,"placeholder",void 0),o([Kd({type:String}),Jt(function(t,e){void 0!==e&&this.label!==e&&this.layout()})],ma.prototype,"label",void 0),o([Kd({type:String})],ma.prototype,"icon",void 0),o([Kd({type:String})],ma.prototype,"iconTrailing",void 0),o([Kd({type:Boolean,reflect:!0})],ma.prototype,"disabled",void 0),o([Kd({type:Boolean})],ma.prototype,"required",void 0),o([Kd({type:Number})],ma.prototype,"minLength",void 0),o([Kd({type:Number})],ma.prototype,"maxLength",void 0),o([Kd({type:Boolean,reflect:!0}),Jt(function(t,e){void 0!==e&&this.outlined!==e&&this.layout()})],ma.prototype,"outlined",void 0),o([Kd({type:String})],ma.prototype,"helper",void 0),o([Kd({type:Boolean})],ma.prototype,"validateOnInitialRender",void 0),o([Kd({type:String})],ma.prototype,"validationMessage",void 0),o([Kd({type:Boolean})],ma.prototype,"autoValidate",void 0),o([Kd({type:String})],ma.prototype,"pattern",void 0),o([Kd({type:String})],ma.prototype,"min",void 0),o([Kd({type:String})],ma.prototype,"max",void 0),o([Kd({type:String})],ma.prototype,"step",void 0),o([Kd({type:Number})],ma.prototype,"size",void 0),o([Kd({type:Boolean})],ma.prototype,"helperPersistent",void 0),o([Kd({type:Boolean})],ma.prototype,"charCounter",void 0),o([Kd({type:Boolean})],ma.prototype,"endAligned",void 0),o([Kd({type:String})],ma.prototype,"prefix",void 0),o([Kd({type:String})],ma.prototype,"suffix",void 0),o([Kd({type:String})],ma.prototype,"name",void 0),o([Kd({type:String})],ma.prototype,"inputMode",void 0),o([Kd({type:Boolean})],ma.prototype,"readOnly",void 0),o([Kd({type:String})],ma.prototype,"autocapitalize",void 0),o([Zd()],ma.prototype,"outlineOpen",void 0),o([Zd()],ma.prototype,"outlineWidth",void 0),o([Zd()],ma.prototype,"isUiValid",void 0),o([Zd()],ma.prototype,"focused",void 0),o([function(t){return Jd({finisher:(e,i)=>{Object.assign(e.prototype[i],t)}})}({passive:!0})],ma.prototype,"handleInputChange",null);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const pa=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]);return new Yr(i,t,Xr)})`.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform;transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required::after{margin-left:1px;margin-right:0px;content:"*"}[dir=rtl] .mdc-floating-label--required::after,.mdc-floating-label--required[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-106%) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-106%) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-106%) scale(0.75)}}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{border-bottom-width:1px}.mdc-line-ripple::before{z-index:1}.mdc-line-ripple::after{transform:scaleX(0);border-bottom-width:2px;opacity:0;z-index:2}.mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;border-top:1px solid;border-bottom:1px solid;pointer-events:none}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid;flex-grow:1}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{flex:0 0 auto;width:auto;max-width:calc(100% - 12px * 2)}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(100% / 0.75)}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-text-field--filled{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform,opacity}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}.mdc-text-field--filled .mdc-text-field__ripple::before{transition:opacity 15ms linear,background-color 15ms linear;z-index:1;z-index:var(--mdc-ripple-z-index, 1)}.mdc-text-field--filled .mdc-text-field__ripple::after{z-index:0;z-index:var(--mdc-ripple-z-index, 0)}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::after{top:0;left:0;transform:scale(0);transform-origin:center center}.mdc-text-field--filled.mdc-ripple-upgraded--unbounded .mdc-text-field__ripple::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}.mdc-text-field--filled.mdc-ripple-upgraded--foreground-activation .mdc-text-field__ripple::after{animation:mdc-ripple-fg-radius-in 225ms forwards,mdc-ripple-fg-opacity-in 75ms forwards}.mdc-text-field--filled.mdc-ripple-upgraded--foreground-deactivation .mdc-text-field__ripple::after{animation:mdc-ripple-fg-opacity-out 150ms;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}.mdc-text-field--filled.mdc-ripple-upgraded .mdc-text-field__ripple::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}.mdc-text-field__ripple{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.mdc-text-field{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:0;border-bottom-left-radius:0;display:inline-flex;align-items:baseline;padding:0 16px;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input{color:rgba(0, 0, 0, 0.87)}@media all{.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:rgba(0, 0, 0, 0.54)}}@media all{.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:rgba(0, 0, 0, 0.54)}}.mdc-text-field .mdc-text-field__input{caret-color:#6200ee;caret-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field-character-counter,.mdc-text-field:not(.mdc-text-field--disabled)+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--leading{color:rgba(0, 0, 0, 0.54)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__icon--trailing{color:rgba(0, 0, 0, 0.54)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__affix--prefix{color:rgba(0, 0, 0, 0.6)}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-text-field__affix--suffix{color:rgba(0, 0, 0, 0.6)}.mdc-text-field .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-text-field__input{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);height:28px;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);width:100%;min-width:0;border:none;border-radius:0;background:none;appearance:none;padding:0}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input::-webkit-calendar-picker-indicator{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}@media all{.mdc-text-field__input::placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}}@media all{.mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0}}@media all{.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}}@media all{.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}}.mdc-text-field__affix{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-subtitle1-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1rem;font-size:var(--mdc-typography-subtitle1-font-size, 1rem);font-weight:400;font-weight:var(--mdc-typography-subtitle1-font-weight, 400);letter-spacing:0.009375em;letter-spacing:var(--mdc-typography-subtitle1-letter-spacing, 0.009375em);text-decoration:inherit;text-decoration:var(--mdc-typography-subtitle1-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-subtitle1-text-transform, inherit);height:28px;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);opacity:0;white-space:nowrap}.mdc-text-field--label-floating .mdc-text-field__affix,.mdc-text-field--no-label .mdc-text-field__affix{opacity:1}@supports(-webkit-hyphens: none){.mdc-text-field--outlined .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field__affix--prefix,.mdc-text-field__affix--prefix[dir=rtl]{padding-left:2px;padding-right:0}.mdc-text-field--end-aligned .mdc-text-field__affix--prefix{padding-left:0;padding-right:12px}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--end-aligned .mdc-text-field__affix--prefix[dir=rtl]{padding-left:12px;padding-right:0}.mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field__affix--suffix,.mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:12px}.mdc-text-field--end-aligned .mdc-text-field__affix--suffix{padding-left:2px;padding-right:0}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--end-aligned .mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:2px}.mdc-text-field--filled{height:56px}.mdc-text-field--filled .mdc-text-field__ripple::before,.mdc-text-field--filled .mdc-text-field__ripple::after{background-color:rgba(0, 0, 0, 0.87);background-color:var(--mdc-ripple-color, rgba(0, 0, 0, 0.87))}.mdc-text-field--filled:hover .mdc-text-field__ripple::before,.mdc-text-field--filled.mdc-ripple-surface--hover .mdc-text-field__ripple::before{opacity:0.04;opacity:var(--mdc-ripple-hover-opacity, 0.04)}.mdc-text-field--filled.mdc-ripple-upgraded--background-focused .mdc-text-field__ripple::before,.mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms;opacity:0.12;opacity:var(--mdc-ripple-focus-opacity, 0.12)}.mdc-text-field--filled::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:whitesmoke}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42)}.mdc-text-field--filled:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87)}.mdc-text-field--filled .mdc-line-ripple::after{border-bottom-color:#6200ee;border-bottom-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-text-field--filled .mdc-floating-label,.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled.mdc-text-field--no-label::before{display:none}@supports(-webkit-hyphens: none){.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field--outlined{height:56px;overflow:visible}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-34.75px) scale(0.75)}}.mdc-text-field--outlined .mdc-text-field__input{height:100%}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.38)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.87)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px, var(--mdc-shape-small, 4px)) * 2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px, var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px, var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px, var(--mdc-shape-small, 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px, var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px, calc(var(--mdc-shape-small, 4px) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined .mdc-text-field__ripple::before,.mdc-text-field--outlined .mdc-text-field__ripple::after{background-color:transparent;background-color:var(--mdc-ripple-color, transparent)}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:transparent}.mdc-text-field--outlined .mdc-notched-outline{z-index:1}.mdc-text-field--textarea{flex-direction:column;align-items:center;width:auto;height:auto;padding:0;transition:none}.mdc-text-field--textarea .mdc-floating-label{top:19px}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea .mdc-text-field__input{flex-grow:1;height:auto;min-height:1.5rem;overflow-x:hidden;overflow-y:auto;box-sizing:border-box;resize:none;padding:0 16px;line-height:1.5rem}.mdc-text-field--textarea.mdc-text-field--filled::before{display:none}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-10.25px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-filled 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-filled{0%{transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-10.25px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-10.25px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-10.25px) scale(0.75)}}.mdc-text-field--textarea.mdc-text-field--filled .mdc-text-field__input{margin-top:23px;margin-bottom:9px}.mdc-text-field--textarea.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-27.25px) scale(1)}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-24.75px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-outlined{0%{transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(-24.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(-24.75px) scale(0.75)}100%{transform:translateX(calc(0 - 0%)) translateY(-24.75px) scale(0.75)}}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label{top:18px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field__input{margin-bottom:2px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter{align-self:flex-end;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::after{display:inline-block;width:0;height:16px;content:"";vertical-align:-16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::before{display:none}.mdc-text-field__resizer{align-self:stretch;display:inline-flex;flex-direction:column;flex-grow:1;max-height:100%;max-width:100%;min-height:56px;min-width:fit-content;min-width:-moz-available;min-width:-webkit-fill-available;overflow:hidden;resize:both}.mdc-text-field--filled .mdc-text-field__resizer{transform:translateY(-1px)}.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateY(1px)}.mdc-text-field--outlined .mdc-text-field__resizer{transform:translateX(-1px) translateY(-1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer,.mdc-text-field--outlined .mdc-text-field__resizer[dir=rtl]{transform:translateX(1px) translateY(-1px)}.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateX(1px) translateY(1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input[dir=rtl],.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter[dir=rtl]{transform:translateX(-1px) translateY(1px)}.mdc-text-field--with-leading-icon{padding-left:0;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon,.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:16px;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 48px);left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - 32px)) translateY(-34.75px) scale(0.75)}}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -32px)) translateY(-34.75px) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -32px)) translateY(-34.75px) scale(0.75)}100%{transform:translateX(calc(0 - -32px)) translateY(-34.75px) scale(0.75)}}.mdc-text-field--with-trailing-icon{padding-left:16px;padding-right:0}[dir=rtl] .mdc-text-field--with-trailing-icon,.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 64px / 0.75)}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100% / 0.75 - 96px / 0.75)}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused:not(.mdc-text-field--disabled) .mdc-floating-label{color:rgba(98, 0, 238, 0.87)}.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--focused.mdc-text-field--outlined.mdc-text-field--textarea .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--invalid:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid .mdc-text-field__input{caret-color:#b00020;caret-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__icon--trailing{color:#b00020;color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:#b00020;border-color:var(--mdc-theme-error, #b00020)}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--disabled{pointer-events:none}.mdc-text-field--disabled .mdc-text-field__input{color:rgba(0, 0, 0, 0.38)}@media all{.mdc-text-field--disabled .mdc-text-field__input::placeholder{color:rgba(0, 0, 0, 0.38)}}@media all{.mdc-text-field--disabled .mdc-text-field__input:-ms-input-placeholder{color:rgba(0, 0, 0, 0.38)}}.mdc-text-field--disabled .mdc-floating-label{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field-character-counter,.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field__icon--leading{color:rgba(0, 0, 0, 0.3)}.mdc-text-field--disabled .mdc-text-field__icon--trailing{color:rgba(0, 0, 0, 0.3)}.mdc-text-field--disabled .mdc-text-field__affix--prefix{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-text-field__affix--suffix{color:rgba(0, 0, 0, 0.38)}.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.06)}.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:rgba(0, 0, 0, 0.06)}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__input::placeholder{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__input:-ms-input-placeholder{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-floating-label{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-helper-text{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field-character-counter,.mdc-text-field--disabled+.mdc-text-field-helper-line .mdc-text-field-character-counter{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__icon--leading{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__icon--trailing{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__affix--prefix{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-text-field__affix--suffix{color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:GrayText}}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:GrayText}}@media screen and (forced-colors: active){.mdc-text-field--disabled .mdc-text-field__input{background-color:Window}.mdc-text-field--disabled .mdc-floating-label{z-index:1}}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--disabled.mdc-text-field--filled{background-color:#fafafa}.mdc-text-field--disabled.mdc-text-field--filled .mdc-text-field__ripple{display:none}.mdc-text-field--disabled .mdc-text-field__input{pointer-events:auto}.mdc-text-field--end-aligned .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--end-aligned .mdc-text-field__input[dir=rtl]{text-align:left}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix{direction:ltr}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--leading,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--leading{order:1}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{order:2}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input{order:3}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{order:4}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--trailing,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--trailing{order:5}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--prefix{padding-right:12px}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--suffix{padding-left:2px}.mdc-text-field-helper-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin:0;opacity:0;will-change:opacity;transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-text-field-helper-text::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}.mdc-text-field-helper-text--persistent{transition:none;opacity:1;will-change:initial}.mdc-text-field-character-counter{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-caption-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:0.75rem;font-size:var(--mdc-typography-caption-font-size, 0.75rem);line-height:1.25rem;line-height:var(--mdc-typography-caption-line-height, 1.25rem);font-weight:400;font-weight:var(--mdc-typography-caption-font-weight, 400);letter-spacing:0.0333333333em;letter-spacing:var(--mdc-typography-caption-letter-spacing, 0.0333333333em);text-decoration:inherit;text-decoration:var(--mdc-typography-caption-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-caption-text-transform, inherit);display:block;margin-top:0;line-height:normal;margin-left:auto;margin-right:0;padding-left:16px;padding-right:0;white-space:nowrap}.mdc-text-field-character-counter::before{display:inline-block;width:0;height:16px;content:"";vertical-align:0}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{margin-left:0;margin-right:auto}[dir=rtl] .mdc-text-field-character-counter,.mdc-text-field-character-counter[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field__icon{align-self:center;cursor:pointer}.mdc-text-field__icon:not([tabindex]),.mdc-text-field__icon[tabindex="-1"]{cursor:default;pointer-events:none}.mdc-text-field__icon svg{display:block}.mdc-text-field__icon--leading{margin-left:16px;margin-right:8px}[dir=rtl] .mdc-text-field__icon--leading,.mdc-text-field__icon--leading[dir=rtl]{margin-left:8px;margin-right:16px}.mdc-text-field__icon--trailing{padding:12px;margin-left:0px;margin-right:0px}[dir=rtl] .mdc-text-field__icon--trailing,.mdc-text-field__icon--trailing[dir=rtl]{margin-left:0px;margin-right:0px}.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}:host{display:inline-flex;flex-direction:column;outline:none}.mdc-text-field{width:100%}.mdc-text-field:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.42);border-bottom-color:var(--mdc-text-field-idle-line-color, rgba(0, 0, 0, 0.42))}.mdc-text-field:not(.mdc-text-field--disabled):hover .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.87);border-bottom-color:var(--mdc-text-field-hover-line-color, rgba(0, 0, 0, 0.87))}.mdc-text-field.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:rgba(0, 0, 0, 0.06);border-bottom-color:var(--mdc-text-field-disabled-line-color, rgba(0, 0, 0, 0.06))}.mdc-text-field.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:#b00020;border-bottom-color:var(--mdc-theme-error, #b00020)}.mdc-text-field__input{direction:inherit}mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-idle-border-color, rgba(0, 0, 0, 0.38) )}:host(:not([disabled]):hover) :not(.mdc-text-field--invalid):not(.mdc-text-field--focused) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-hover-border-color, rgba(0, 0, 0, 0.87) )}:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--outlined){background-color:var(--mdc-text-field-fill-color, whitesmoke)}:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-error-color, var(--mdc-theme-error, #b00020) )}:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-character-counter,:host(:not([disabled])) .mdc-text-field.mdc-text-field--invalid .mdc-text-field__icon{color:var(--mdc-text-field-error-color, var(--mdc-theme-error, #b00020))}:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label,:host(:not([disabled])) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label::after{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused mwc-notched-outline{--mdc-notched-outline-stroke-width: 2px}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-focused-label-color, var(--mdc-theme-primary, rgba(98, 0, 238, 0.87)) )}:host(:not([disabled])) .mdc-text-field.mdc-text-field--focused:not(.mdc-text-field--invalid) .mdc-floating-label{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}:host(:not([disabled])) .mdc-text-field .mdc-text-field__input{color:var(--mdc-text-field-ink-color, rgba(0, 0, 0, 0.87))}:host(:not([disabled])) .mdc-text-field .mdc-text-field__input::placeholder{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host(:not([disabled])) .mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg),:host(:not([disabled])) .mdc-text-field-helper-line:not(.mdc-text-field--invalid) .mdc-text-field-character-counter{color:var(--mdc-text-field-label-ink-color, rgba(0, 0, 0, 0.6))}:host([disabled]) .mdc-text-field:not(.mdc-text-field--outlined){background-color:var(--mdc-text-field-disabled-fill-color, #fafafa)}:host([disabled]) .mdc-text-field.mdc-text-field--outlined mwc-notched-outline{--mdc-notched-outline-border-color: var( --mdc-text-field-outlined-disabled-border-color, rgba(0, 0, 0, 0.06) )}:host([disabled]) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label,:host([disabled]) .mdc-text-field:not(.mdc-text-field--invalid):not(.mdc-text-field--focused) .mdc-floating-label::after{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-text-field .mdc-text-field__input,:host([disabled]) .mdc-text-field .mdc-text-field__input::placeholder{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}:host([disabled]) .mdc-text-field-helper-line .mdc-text-field-helper-text,:host([disabled]) .mdc-text-field-helper-line .mdc-text-field-character-counter{color:var(--mdc-text-field-disabled-ink-color, rgba(0, 0, 0, 0.38))}`;let ua=class extends ma{static get styles(){return pa}};ua=o([s("floor3d-textfield")],ua);let fa=class extends d{constructor(){super(...arguments),this._configArray=[],this._configObjectArray=[],this._configZoomArray=[],this._entityOptionsArray=[],this._entityOptionsGroupArray=[],this._entityOptionsZoomArray=[],this._initialized=!1}connectedCallback(){super.connectedCallback(),customElements.get("hui-action-editor")&&customElements.get("ha-icon-picker")&&customElements.get("ha-entity-picker")||customElements.get("hui-button-card")?.getConfigElement()}setConfig(t){console.log("Start editor config");const e=JSON.stringify(t),i=this._internal&&e===this._held;this._held=e,t=a(i?this._internal:t),this._config={...t},t.entities||(this._config.entities=[{entity:""}]),t.object_groups||(this._config.object_groups=[{object_group:""}]),t.zoom_areas||(this._config.zoom_areas=[{zoom:""}]),this._configArray=c(this._config),this._configObjectArray=h(this._config),this._configZoomArray=m(this._config);for(const t of this._configArray)t.light&&0===Object.entries(t.light).length&&delete t.light,t.hide&&0===Object.entries(t.hide).length&&delete t.hide,t.show&&0===Object.entries(t.show).length&&delete t.show,t.room&&0===Object.entries(t.room).length&&delete t.room,t.image&&0===Object.entries(t.image).length&&delete t.image;this._config.object_groups=this._configObjectArray,this._config.entities=this._configArray,this._config.zoom_areas=this._configZoomArray;this.hass.resources;const o={icon:"cube-unfolded",name:"Objects",secondary:"Objects.",show:!1,visible:!1},n={show:!1,options:{zoom:{icon:"magnify-plus",name:"Zoom Area",secondary:"Zoom Area options",show:!1,visible:!1}}},s={show:!1,options:{threed:{icon:"book-variant",name:"Type and Object",secondary:"Type and Object settings.",show:!1},light:{icon:"lightbulb-on-outline",name:"Light",secondary:"Light options",show:!1,visible:!1},room:{icon:"floor-plan",name:"Room",secondary:"Room options",show:!1,visible:!1},color:{icon:"format-color-fill",name:"Color",secondary:"Color condition.",show:!1,visible:!1},hide:{icon:"eye-off",name:"Hide",secondary:"Hide options.",show:!1,visible:!1},show:{icon:"eye",name:"Show",secondary:"Show options.",show:!1,visible:!1},text:{icon:"format-text",name:"Text",secondary:"Text options.",show:!1,visible:!1},door:{icon:"door",name:"Door",secondary:"Door options.",show:!1,visible:!1},cover:{icon:"window-shutter",name:"Cover",secondary:"Cover options.",show:!1,visible:!1},rotate:{icon:"fan",name:"Rotate",secondary:"Rotate options.",show:!1,visible:!1},gesture:{icon:"gesture-tap",name:"Gesture",secondary:"Gesture options.",show:!1,visible:!1},image:{icon:"image",name:"Image",secondary:"Image options.",show:!1,visible:!1}}};for(const t of this._configObjectArray)this._entityOptionsGroupArray.push({...o});for(const t of this._configArray)this._entityOptionsArray.push({...s});for(const t of this._configZoomArray)this._entityOptionsZoomArray.push({...n});this._options||(this._options={object_groups:{icon:"group",name:"Object Groups",secondary:"Manage card Object Groups.",show:!1,options:{object_groups:this._entityOptionsGroupArray}},zoom_areas:{icon:"magnify-expand",name:"Zoom Areas",secondary:"Manage card Zoom Areas.",show:!1,options:{zoom_areas:this._entityOptionsZoomArray}},entities:{icon:"tune",name:"Entities",secondary:"Manage card entities.",show:!1,options:{entities:this._entityOptionsArray}},model:{icon:"video-3d",name:"3D Model",secondary:"Reference your Waterfront 3D model",show:!1},appearance:{icon:"palette",name:"Appearance",secondary:"Customize the global appearance and behavior settings",show:!1},overlay:{icon:"checkbox-multiple-blank-outline",name:"Overlay",secondary:"Customize the overlay appearance and behavior settings",show:!1}}),this._config.objectlist&&!this._objects&&this._fetchObjectList(),console.log("End editor config")}get _show_warning(){return this._config?.show_warning||!1}get _show_error(){return this._config?.show_error||!1}_fetchObjectList(){let t=this._config.path;"/"!=t.substr(-1)&&(t+="/"),fetch(t+this._config.objectlist).then(function(t){if(!t.ok)throw Error(t.statusText);return t.json()}).then(this._onobjectloaded.bind(this))}_onobjectloaded(t){this._objects=Object.keys(t).sort(function(t,e){return t.toLowerCase().localeCompare(e.toLowerCase())})}shouldUpdate(){return console.log("Should Update start"),this._initialized||this._initialize(),!0}render(){const t=!!this._config.overlay&&"yes"==this._config.overlay;return u`
      <div class="sub-category" style="display: flex; flex-direction: row; align-items: center;">
        <ha-icon @click=${this._config_changed} icon="mdi:refresh" class="ha-icon-large"> </ha-icon>
        <span class="version">floor3d-card ${p}</span>
      </div>
      ${this._createModelElement()} ${this._createAppearanceElement()}
      ${t?u` ${this._createOverlayElement()} `:""} ${this._createEntitiesElement()}
      ${this._createObjectGroupsElement()} ${this._createZoomAreasElement()}
    `}_preview_card(){let t=this.parentNode||this.getRootNode().host;for(;t&&"hui-dialog-edit-card"!==t.localName;)t=t.parentNode||t.host;const e=t=>{for(const i of Array.from(t.children)){if("floor3d-card"===i.localName)return i;const t=e(i)||i.shadowRoot&&e(i.shadowRoot);if(t)return t}return null},i=t&&t.shadowRoot;return i?e(i):null}_config_changed(){console.log("Config change start");let t=this._preview_card();t&&t.rerender()}_createObjectGroupsValues(){if(!this.hass||!this._config)return[u``];const t=this._options.object_groups,e=[];for(const i of this._configObjectArray){const o=this._configObjectArray.indexOf(i);e.push(u`
        <div class="sub-category" style="display: flex; flex-direction: row; align-items: center;">
          <div style="display: flex; align-items: center; flex-direction: column;">
            <div
              style="font-size: 10px; margin-bottom: -8px; opacity: 0.5;"
              @click=${this._toggleThing}
              .options=${t.options.object_groups[o]}
              .optionsTarget=${t.options.object_groups}
              .index=${o}
            >
              options
            </div>
            <ha-icon
              icon="mdi:chevron-${t.options.object_groups[o].show?"up":"down"}"
              @click=${this._toggleThing}
              .options=${t.options.object_groups[o]}
              .optionsTarget=${t.options.object_groups}
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
          ${0!==o?u`
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
              `:u` <ha-icon icon="mdi:arrow-up" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
          ${o!==this._configObjectArray.length-1?u`
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
              `:u` <ha-icon icon="mdi:arrow-down" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
          <ha-icon
            class="ha-icon-large"
            icon="mdi:close"
            @click=${this._removeObject_Group}
            .configAttribute=${"object_group"}
            .configArray=${"object_groups"}
            .configIndex=${o}
          ></ha-icon>
        </div>
        ${t.options.object_groups[o].show?u` <div class="options">${this._createObject_GroupElement(o)}</div> `:""}
      `)}return e}_createActionsElement(){const t=this._options.actions;return u`
      <div class="sub-category" style="opacity: 0.5;">
        <div>
          <div class="row">
            <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
            <div class="title">${t.name}</div>
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
      </div>
    `}_createZoomAreasValues(){if(!this.hass||!this._config)return[u``];const t=this._options.zoom_areas,e=[];for(const i of this._configZoomArray){const o=this._configZoomArray.indexOf(i);e.push(u`
        <div class="sub-category" style="display: flex; flex-direction: row; align-items: center;">
          <div style="display: flex; align-items: center; flex-direction: column;">
            <div
              style="font-size: 10px; margin-bottom: -8px; opacity: 0.5;"
              @click=${this._toggleThing}
              .options=${t.options.zoom_areas[o]}
              .optionsTarget=${t.options.zoom_areas}
              .index=${o}
            >
              options
            </div>
            <ha-icon
              icon="mdi:chevron-${t.options.zoom_areas[o].show?"up":"down"}"
              @click=${this._toggleThing}
              .options=${t.options.zoom_areas[o]}
              .optionsTarget=${t.options.zoom_areas}
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
          ${0!==o?u`
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
              `:u` <ha-icon icon="mdi:arrow-up" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
          ${o!==this._configZoomArray.length-1?u`
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
              `:u` <ha-icon icon="mdi:arrow-down" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
          <ha-icon
            class="ha-icon-large"
            icon="mdi:close"
            @click=${this._removeZoomArea}
            .configAttribute=${"zoom"}
            .configArray=${"zoom_areas"}
            .configIndex=${o}
          ></ha-icon>
        </div>
        ${t.options.zoom_areas[o].show?u` <div class="options">${this._createZoomElement(o)}</div> `:""}
      `)}return e}_createEntitiesValues(){if(!this.hass||!this._config)return[u``];const t=this._options.entities;this._entity_ids||(this._entity_ids=Object.keys(this.hass.states).sort(function(t,e){return t.toLowerCase().localeCompare(e.toLowerCase())}));const e=[];for(const i of this._configArray){const o=this._configArray.indexOf(i);e.push(u`
        <div class="sub-category" style="display: flex; flex-direction: row; align-items: center;">
          <div style="display: flex; align-items: center; flex-direction: column;">
            <div
              style="font-size: 10px; margin-bottom: -8px; opacity: 0.5;"
              @click=${this._toggleThing}
              .options=${t.options.entities[o]}
              .optionsTarget=${t.options.entities}
              .index=${o}
            >
              options
            </div>
            <ha-icon
              icon="mdi:chevron-${t.options.entities[o].show?"up":"down"}"
              @click=${this._toggleThing}
              .options=${t.options.entities[o]}
              .optionsTarget=${t.options.entities}
              .index=${o}
            ></ha-icon>
          </div>
          <div class="values" style="flex-grow: 1;">
            ${this._entity_ids.length*this._configArray.length<5e3?u` <floor3d-select
                  label="Entity (Required)"
                  .value=${i.entity}
                  @selected=${this._valueChanged}
                  .configAttribute=${"entity"}
                  .configObject=${this._configArray[o]}
                  .ignoreNull=${!1}
                  @closed=${t=>t.stopPropagation()}
                  fixedMenuPosition
                  naturalMenuWidth
                  required
                  id="entity"
                >
                  ${this._entity_ids.map(t=>u` <mwc-list-item .value=${t}>${t}</mwc-list-item> `)}
                </floor3d-select>`:u`
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
          ${0!==o?u`
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
              `:u` <ha-icon icon="mdi:arrow-up" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
          ${o!==this._configArray.length-1?u`
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
              `:u` <ha-icon icon="mdi:arrow-down" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
          <ha-icon
            class="ha-icon-large"
            icon="mdi:close"
            @click=${this._removeEntity}
            .configAttribute=${"entity"}
            .configArray=${"entities"}
            .configIndex=${o}
          ></ha-icon>
        </div>
        ${t.options.entities[o].show?u`
              <div class="options">
                ${this._createTypeElement(o)} ${this._createLightElement(o)} ${this._createRoomElement(o)}
                ${this._createColorConditionElement(o)} ${this._createHideElement(o)}
                ${this._createShowElement(o)} ${this._createTextElement(o)} ${this._createGestureElement(o)}
                ${this._createDoorElement(o)} ${this._createCoverElement(o)} ${this._createRotateElement(o)}
                ${this._createImageElement(o)} ${this._createTrackerElement(o)} ${this._createInfoElement(o)} ${this._createShowerElement(o)}
              </div>
            `:""}
      `)}return e}_createZoomAreasElement(){if(!this.hass||!this._config)return u``;const t=this._options.zoom_areas;return u`
      <div class="card-config">
        <div class="option" @click=${this._toggleThing} .options=${t} .optionsTarget=${this._options}>
          <div class="row">
            <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
            <div class="title">${t.name}</div>
            <ha-icon .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?u`
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
    `}_createObjectGroupsElement(){if(!this.hass||!this._config)return u``;const t=this._options.object_groups;return u`
      <div class="card-config">
        <div class="option" @click=${this._toggleThing} .options=${t} .optionsTarget=${this._options}>
          <div class="row">
            <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
            <div class="title">${t.name}</div>
            <ha-icon .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?u`
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
    `}_createEntitiesElement(){if(!this.hass||!this._config)return u``;const t=this._options.entities;return u`
      <div class="card-config">
        <div class="option" @click=${this._toggleThing} .options=${t} .optionsTarget=${this._options}>
          <div class="row">
            <ha-icon .icon=${`mdi:${t.icon}`}></ha-icon>
            <div class="title">${t.name}</div>
            <ha-icon .icon=${t.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${t.secondary}</div>
        </div>
        ${t.show?u`
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
    `}_createModelElement(){if(!this.hass)return u``;const t=this._config,e=this._options.model;return u`
      <div class="category" id="card">
        <div class="sub-category" @click=${this._toggleThing} .options=${e} .optionsTarget=${this._options}>
          <div class="row">
            <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
            <div class="title">${e.name}</div>
            <ha-icon .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${e.secondary}</div>
        </div>
        ${e.show?u`
              <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                <floor3d-textfield
                  label="Name"
                  fullwidth
                  .value=${t.name?t.name:""}
                  .configObject=${t}
                  .configAttribute=${"name"}
                  @input=${this._valueChanged}
                >
                </floor3d-textfield>
                <floor3d-textfield
                  label="Path"
                  fullwidth
                  .value=${t.path?t.path:""}
                  .configObject=${t}
                  .configAttribute=${"path"}
                  @input=${this._valueChanged}
                ></floor3d-textfield>
                <floor3d-textfield
                  label="Obj/Glb file"
                  fullwidth
                  .value=${t.objfile?t.objfile:""}
                  .configObject=${t}
                  .configAttribute=${"objfile"}
                  @input=${this._valueChanged}
                ></floor3d-textfield>
                <floor3d-textfield
                  label="Mtl Wavefront file"
                  fullwidth
                  .value=${t.mtlfile?t.mtlfile:""}
                  .configObject=${t}
                  .configAttribute=${"mtlfile"}
                  @input=${this._valueChanged}
                ></floor3d-textfield>
                <floor3d-textfield
                  label="Object list JSON"
                  .value=${t.objectlist?t.objectlist:""}
                  .configObject=${t}
                  .configAttribute=${"objectlist"}
                  @input=${this._valueChanged}
                ></floor3d-textfield>
              </div>
            `:""}
      </div>
    `}_createOverlayElement(){if(!this.hass)return u``;const t=this._config,e=this._options.overlay;return u`
      <div class="category" id="card">
        <div class="sub-category" @click=${this._toggleThing} .options=${e} .optionsTarget=${this._options}>
          <div class="row">
            <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
            <div class="title">${e.name}</div>
            <ha-icon .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${e.secondary}</div>
        </div>
        ${e.show?u`
              <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                <floor3d-textfield
                  label="Overlay Background color"
                  fullwidth
                  size="20"
                  .value=${t.overlay_bgcolor?t.overlay_bgcolor:"transparent"}
                  .configObject=${t}
                  .configAttribute=${"overlay_bgcolor"}
                  @input=${this._valueChanged}
                ></floor3d-textfield>
                <floor3d-textfield
                  label="Overlay Foreground color"
                  fullwidth
                  size="20"
                  .value=${t.overlay_fgcolor?t.overlay_fgcolor:"black"}
                  .configObject=${t}
                  .configAttribute=${"overlay_fgcolor"}
                  @input=${this._valueChanged}
                ></floor3d-textfield>
                <ha-select
                  label="Overlay Alignment"
                  size="40"
                  @selected=${this._valueChanged}
                  .value=${t.overlay_alignment?t.overlay_alignment:"top-left"}
                  .configObject=${t}
                  .configAttribute=${"overlay_alignment"}
                  .ignoreNull=${!1}
                  @closed=${t=>t.stopPropagation()}
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
                    .value=${t.overlay_width?t.overlay_width:"33"}
                    .configObject=${t}
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
                    .value=${t.overlay_height?t.overlay_height:"20"}
                    .configObject=${t}
                    .configAttribute=${"overlay_height"}
                    @input=${this._valueChanged}
                  ></floor3d-textfield>
                </floor3d-formfield>
                <floor3d-textfield
                  label="Overlay Font"
                  size="40"
                  .value="${t.overlay_font?t.overlay_font:""}"
                  .configObject=${t}
                  .configAttribute=${"overlay_font"}
                  @input=${this._valueChanged}
                ></floor3d-textfield>
                <floor3d-textfield
                  label="Overlay Font size"
                  .value="${t.overlay_fontsize?t.overlay_fontsize:""}"
                  .configObject=${t}
                  .configAttribute=${"overlay_fontsize"}
                  @input=${this._valueChanged}
                ></floor3d-textfield>
              </div>
            `:""}
      </div>
    `}_createAppearanceElement(){if(!this.hass)return u``;const t=this._config,e=this._options.appearance;return u`
      <div class="category" id="card">
        <div class="sub-category" @click=${this._toggleThing} .options=${e} .optionsTarget=${this._options}>
          <div class="row">
            <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
            <div class="title">${e.name}</div>
            <ha-icon .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${e.secondary}</div>
        </div>
        ${e.show?u`
             <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                <floor3d-textfield
                  label="Style"
                  .value=${t.style?t.style:""}
                  .configObject=${t}
                  .configAttribute=${"style"}
                  @input=${this._valueChanged}
                ></floor3d-textfield>
                <floor3d-select
                  label="Lock Camera (yes/<no>)"
                  @selected=${this._valueChanged}
                  .value=${t.lock_camera?t.lock_camera:"no"}
                  .configObject=${t}
                  .configAttribute=${"lock_camera"}
                  .ignoreNull=${!1}
                  @closed=${t=>t.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>
                <floor3d-select
                  label="Selection Mode (yes/<no>)"
                  @selected=${this._valueChanged}
                  .value=${t.selectionMode?t.selectionMode:"no"}
                  .configObject=${t}
                  .configAttribute=${"selectionMode"}
                  .ignoreNull=${!1}
                  @closed=${t=>t.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>
                <floor3d-select
                  label="Edit Mode PopUp (<yes>/no)"
                  @selected=${this._valueChanged}
                  .value=${t.editModeNotifications?t.editModeNotifications:"yes"}
                  .configObject=${t}
                  .configAttribute=${"editModeNotifications"}
                  .ignoreNull=${!1}
                  @closed=${t=>t.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>
                <floor3d-select
                  label="Header (<yes>/no)"
                  @selected=${this._valueChanged}
                  .value=${t.header?t.header:"yes"}
                  .configObject=${t}
                  .configAttribute=${"header"}
                  .ignoreNull=${!1}
                  @closed=${t=>t.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>
                <floor3d-select
                  label="Click (no dblclick, yes/<no>)"
                  @selected=${this._valueChanged}
                  .value=${t.click?t.click:"no"}
                  .configObject=${t}
                  .configAttribute=${"click"}
                  .ignoreNull=${!1}
                  @closed=${t=>t.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>
                <floor3d-select
                  label="Overlay (yes/<no>)"
                  @selected=${this._valueChanged}
                  .value=${t.overlay?t.overlay:"no"}
                  .configObject=${t}
                  .configAttribute=${"overlay"}
                  .ignoreNull=${!1}
                  @closed=${t=>t.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>

                <floor3d-select
                  label="Hide Levels Menu (yes/<no>)"
                  @selected=${this._valueChanged}
                  .value=${t.hideLevelsMenu?t.hideLevelsMenu:"no"}
                  .configObject=${t}
                  .configAttribute=${"hideLevelsMenu"}
                  .ignoreNull=${!1}
                  @closed=${t=>t.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>
                <floor3d-select
                  label="Hide Zoom Menu (yes/<no>)"
                  @selected=${this._valueChanged}
                  .value=${t.hideZoomMenu?t.hideZoomMenu:"no"}
                  .configObject=${t}
                  .configAttribute=${"hideZoomMenu"}
                  .ignoreNull=${!1}
                  @closed=${t=>t.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>
                ${this._textField("Light Following the Camera (<0.2>, or a sensor)",t,"globalLightPower",.2)}
                <floor3d-select
                  label="Shadow (yes/<no>)"
                  @selected=${this._valueChanged}
                  .value=${t.shadow?t.shadow:"no"}
                  .configObject=${t}
                  .configAttribute=${"shadow"}
                  .ignoreNull=${!1}
                  @closed=${t=>t.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>
                ${this._textField("Exposure (<1>)",t,"exposure",1,"number")}
                ${this._choiceField("Tone mapping (<neutral>)",t,"tone_mapping","neutral",["neutral","agx","aces","linear"])}
                ${this._textField("Lamp Power (<1>)",t,"light_power",1,"number")}
                ${this._textField("Sky Light (<0>, or a sensor)",t,"sky_power",0)}
                ${this._yesNoField("Sun from sun.sun (yes/<no>)",t,"sun","no")}
                ${this._textField("Sun Power (<1>, or a sensor)",t,"sun_power",1)}
                ${this._textField("Max Pixel Ratio (<2>)",t,"max_pixel_ratio",2,"number")}
                ${this._yesNoField("Log depth (yes/<no>)",t,"log_depth","no")}
                ${this._yesNoField("Highlight Open Doors/Windows (yes/<no>)",t,"state_colors","no")}
                ${this._textField("Alarm Entity (e.g. alarm_control_panel.home)",t,"alarm_entity","")}
                ${this._choiceField("Initial Room Map (<none>)",t,"room_colors","none",["none","temperature","presence","illuminance"])}
                <floor3d-select
                  label="+ Lights - Perf (yes/<no>)"
                  @selected=${this._valueChanged}
                  .value=${t.extralightmode?t.extralightmode:"no"}
                  .configObject=${t}
                  .configAttribute=${"extralightmode"}
                  .ignoreNull=${!1}
                  @closed=${t=>t.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>
                <floor3d-select
                  label="Show Axes (yes/<no>)"
                  @selected=${this._valueChanged}
                  .value=${t.show_axes?t.show_axes:"no"}
                  .configObject=${t}
                  .configAttribute=${"show_axes"}
                  .ignoreNull=${!1}
                  @closed=${t=>t.stopPropagation()}
                >
                    <mwc-list-item></mwc-list-item>
                    <mwc-list-item value="yes">yes</mwc-list-item>
                    <mwc-list-item value="no">no</mwc-list-item>
                </floor3d-select>

                <paper-input
                  editable
                  label="North Direction {x: xxxx,z: zzzzzz }"
                  .value=${t.north?t.north:null}
                  .configObject=${t}
                  .configAttribute=${"north"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  editable
                  label="Camera Position"
                  .value=${t.camera_position?t.camera_position:null}
                  .configObject=${t}
                  .configAttribute=${"camera_position"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  editable
                  label="Camera Rotation"
                  .value=${t.camera_rotate?t.camera_rotate:null}
                  .configObject=${t}
                  .configAttribute=${"camera_rotate"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
                <paper-input
                  editable
                  label="Camera Target"
                  .value=${t.camera_target?t.camera_target:null}
                  .configObject=${t}
                  .configAttribute=${"camera_target"}
                  @value-changed=${this._valueChanged}
                ></paper-input>
              </div>
            `:""}
      </div>
    `}_toggleThing(t){const e=t.target.options,i=!e.show;if(t.target.optionsTarget)if(Array.isArray(t.target.optionsTarget))for(const e of t.target.optionsTarget)e.show=!1;else for(const[e]of Object.entries(t.target.optionsTarget))t.target.optionsTarget[e].show=!1;e.show=i,this._toggle=!this._toggle}_addObject_Group(t){if(!this._config||!this.hass)return;const e=t.target;let i;i=e.configAddObject?e.configAddObject:{[e.configAddValue]:""};const o=e.configArray.slice();o.push(i),this._config.object_groups=o,this._fireConfigChanged()}_addEntity(t){if(!this._config||!this.hass)return;const e=t.target;let i;i=e.configAddObject?e.configAddObject:{[e.configAddValue]:""};const o=e.configArray.slice();o.push(i),this._config.entities=o,this._fireConfigChanged()}_addZoomArea(t){if(!this._config||!this.hass)return;const e=t.target;let i;i=e.configAddObject?e.configAddObject:{[e.configAddValue]:""};const o=e.configArray.slice();o.push(i),this._config.zoom_areas=o,this._fireConfigChanged()}_moveEntity(t){if(!this._config||!this.hass)return;const e=t.target;let i=e.configArray.slice();"up"==e.configDirection?i=f(i,e.index,e.index-1):"down"==e.configDirection&&(i=f(i,e.index,e.index+1)),this._config.entities=i,this._fireConfigChanged()}_moveZoomArea(t){if(!this._config||!this.hass)return;const e=t.target;let i=e.configArray.slice();"up"==e.configDirection?i=f(i,e.index,e.index-1):"down"==e.configDirection&&(i=f(i,e.index,e.index+1)),this._config.zoom_areas=i,this._fireConfigChanged()}_moveObject_Group(t){if(!this._config||!this.hass)return;const e=t.target;let i=e.configArray.slice();"up"==e.configDirection?i=f(i,e.index,e.index-1):"down"==e.configDirection&&(i=f(i,e.index,e.index+1)),this._config.object_groups=i,this._fireConfigChanged()}_removeEntity(t){if(!this._config||!this.hass)return;const e=t.target,i=[];let o=0;for(const t of this._configArray)e.configIndex!==o&&i.push(t),o++;const n={[e.configArray]:i};this._config=Object.assign(this._config,n),this._fireConfigChanged()}_removeZoomArea(t){if(!this._config||!this.hass)return;const e=t.target,i=[];let o=0;for(const t of this._configZoomArray)e.configIndex!==o&&i.push(t),o++;const n={[e.configArray]:i};this._config=Object.assign(this._config,n),this._fireConfigChanged()}_removeObject_Group(t){if(!this._config||!this.hass)return;const e=t.target,i=[];let o=0;for(const t of this._configObjectArray)e.configIndex!==o&&i.push(t),o++;const n={[e.configArray]:i};this._config=Object.assign(this._config,n),this._fireConfigChanged()}_createTypeElement(t){const e=this._options.entities.options.entities[t].options.threed,i=this._configArray[t];return u`
      <div class="category" id="type">
        <div
          class="sub-category"
          @click=${this._toggleThing}
          .options=${e}
          .optionsTarget=${this._options.entities.options.entities[t].options}
        >
          <div class="row">
            <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
            <div class="title">${e.name}</div>
            <ha-icon .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${e.secondary}</div>
        </div>
        ${e.show?u`
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
                  .optionTgt=${this._options.entities.options.entities[t].options}
                  .configObject=${i}
                  .configAttribute=${"action"}
                  .ignoreNull=${!1}
                  @closed=${t=>t.stopPropagation()}
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
                  .optionTgt=${this._options.entities.options.entities[t].options}
                  .configObject=${i}
                  .configAttribute=${"type3d"}
                  .ignoreNull=${!1}
                  .configIndex=${t}
                  fixedMenuPosition
                  naturalMenuWidth
                  @closed=${t=>t.stopPropagation()}
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
                ${this._objects?u`
                      <floor3d-select
                        label="Object id"
                        @selected=${this._valueChanged}
                        .value=${i.object_id}
                        .configAttribute=${"object_id"}
                        .configObject=${i}
                        .ignoreNull=${!1}
                        required
                        @closed=${t=>t.stopPropagation()}
                      >
                        ${this._objects.map(t=>u` <mwc-list-item value="${t}">${t}</mwc-list-item> `)}
                        ${this._configObjectArray.map(t=>u`
                            <mwc-list-item value="${"<"+t.object_group+">"}"
                              >${"<"+t.object_group+">"}</mwc-list-item
                            >
                          `)}
                      </floor3d-select>
                    `:u`
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
    `}_createObject_GroupElement(t){const e=this._options.object_groups.options.object_groups[t],i=this._configObjectArray[t],o=i.objects?i.objects.length:0;return u`
      ${u`
            <div class="category" id="bar">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${e}
                .optionsTarget=${this._options.object_groups.options.object_groups}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
                  <div class="title">${e.name}</div>
                  <ha-icon
                    .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${e.secondary}</div>
              </div>
              ${e.show?u`
                    <div class="card-background" style="overflow: auto; max-height: 420px;">
                      ${o>0?u` ${this._createObjectValues(t)} `:""}
                      <div class="sub-category" style="display: flex; flex-direction: column; align-items: flex-end;">
                        <ha-icon
                          class="ha-icon-large"
                          icon="mdi:plus"
                          .index=${t}
                          @click=${this._addObject}
                        ></ha-icon>
                      </div>
                    </div>
                  `:""}
            </div>
          `}
    `}_createColorConditionElement(t){const e=this._options.entities.options.entities[t].options.color,i=this._configArray[t],o=!!i.type3d&&("color"===i.type3d||"room"===i.type3d),n=i.colorcondition?i.colorcondition.length:0;return u`
      ${o?u`
            <div class="category" id="bar">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${e}
                .optionsTarget=${this._options.entities.options.entities[t].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
                  <div class="title">${e.name}</div>
                  <ha-icon
                    .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${e.secondary}</div>
              </div>
              ${e.show?u`
                    <div class="card-background" style="overflow: auto; max-height: 420px;">
                      ${n>0?u` ${this._createColorConditionValues(t)} `:""}
                      <div class="sub-category" style="display: flex; flex-direction: column; align-items: flex-end;">
                        <ha-icon
                          class="ha-icon-large"
                          icon="mdi:plus"
                          .index=${t}
                          @click=${this._addColorCondition}
                        ></ha-icon>
                      </div>
                    </div>
                  `:""}
            </div>
          `:""}
    `}_createObjectValues(t){const e=this._configObjectArray[t],i=[];for(const o of e.objects){const n=e.objects.indexOf(o);i.push(u`
        <div class="sub-category" style="display: flex; flex-direction: row; align-items: center;">
          <div class="value">
            <div style="display:flex;">
              <floor3d-textfield
                label="Object Id"
                .value="${o.object_id?o.object_id:""}"
                .objectAttribute=${"object_id"}
                .index=${t}
                .objectIndex=${n}
                @input=${this._updateObject}
              ></floor3d-textfield>
            </div>
          </div>
          <div style="display: flex;">
            ${0!==n?u`
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:arrow-up"
                    @click=${this._moveObject}
                    .configDirection=${"up"}
                    .index=${t}
                    .objectIndex=${n}
                  ></ha-icon>
                `:u` <ha-icon icon="mdi:arrow-up" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
            ${n!==e.objects.length-1?u`
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:arrow-down"
                    @click=${this._moveObject}
                    .configDirection=${"down"}
                    .index=${t}
                    .objectIndex=${n}
                  ></ha-icon>
                `:u` <ha-icon icon="mdi:arrow-down" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
            <ha-icon
              class="ha-icon-large"
              icon="mdi:close"
              @click=${this._removeObject}
              .index=${t}
              .objectIndex=${n}
            ></ha-icon>
          </div>
        </div>
      `)}return i}_createColorConditionValues(t){const e=this._configArray[t],i=[];for(const o of e.colorcondition){const n=e.colorcondition.indexOf(o);i.push(u`
        <div class="sub-category" style="display: flex; flex-direction: row; align-items: center;">
          <div class="value">
            <div style="display:flex;">
              <floor3d-textfield
                label="Color"
                .value="${o.color?o.color:""}"
                .colorconditionAttribute=${"color"}
                .index=${t}
                .colorconditionIndex=${n}
                @input=${this._updateColorCondition}
              ></floor3d-textfield>
              <floor3d-textfield
                label="State"
                .value="${o.state?o.state:""}"
                .colorconditionAttribute=${"state"}
                .index=${t}
                .colorconditionIndex=${n}
                @input=${this._updateColorCondition}
              ></floor3d-textfield>
            </div>
          </div>
          <div style="display: flex;">
            ${0!==n?u`
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:arrow-up"
                    @click=${this._moveColorCondition}
                    .configDirection=${"up"}
                    .index=${t}
                    .colorconditionIndex=${n}
                  ></ha-icon>
                `:u` <ha-icon icon="mdi:arrow-up" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
            ${n!==e.colorcondition.length-1?u`
                  <ha-icon
                    class="ha-icon-large"
                    icon="mdi:arrow-down"
                    @click=${this._moveColorCondition}
                    .configDirection=${"down"}
                    .index=${t}
                    .colorconditionIndex=${n}
                  ></ha-icon>
                `:u` <ha-icon icon="mdi:arrow-down" style="opacity: 25%;" class="ha-icon-large"></ha-icon> `}
            <ha-icon
              class="ha-icon-large"
              icon="mdi:close"
              @click=${this._removeColorCondition}
              .index=${t}
              .colorconditionIndex=${n}
            ></ha-icon>
          </div>
        </div>
      `)}return i}_addObject(t){if(!this._config||!this.hass)return;const e=t.target;let i=this._config.object_groups[e.index].objects;i||(i=[]);const o=i.slice();o.push({object_id:""}),this._configObjectArray[e.index].objects=o,this._config.object_groups=this._configObjectArray,this._fireConfigChanged()}_addColorCondition(t){if(!this._config||!this.hass)return;const e=t.target;let i=this._config.entities[e.index].colorcondition;i||(i=[]);const o=i.slice();o.push({state:"",color:""}),this._configArray[e.index].colorcondition=o,this._config.entities=this._configArray,this._fireConfigChanged()}_moveObject(t){if(!this._config||!this.hass)return;const e=t.target;let i=this._config.object_groups[e.index].objects.slice();"up"==e.configDirection?i=f(i,e.objectIndex,e.objectIndex-1):"down"==e.configDirection&&(i=f(i,e.objectIndex,e.objectIndex+1)),this._configObjectArray[e.index].objects=i,this._config.object_groups=this._configObjectArray,this._fireConfigChanged()}_moveColorCondition(t){if(!this._config||!this.hass)return;const e=t.target;let i=this._config.entities[e.index].colorcondition.slice();"up"==e.configDirection?i=f(i,e.colorconditionIndex,e.colorconditionIndex-1):"down"==e.configDirection&&(i=f(i,e.colorconditionIndex,e.colorconditionIndex+1)),this._configArray[e.index].colorcondition=i,this._config.entities=this._configArray,this._fireConfigChanged()}_removeObject(t){if(!this._config||!this.hass)return;const e=t.target,i=this._configObjectArray[e.index].objects.slice(),o=[];let n=0;for(const t of i)e.objectIndex!==n&&o.push(i[n]),n++;0===o.length?delete this._configObjectArray[e.index].objects:this._configObjectArray[e.index].objects=o,this._config.object_groups=this._configObjectArray,this._fireConfigChanged()}_removeColorCondition(t){if(!this._config||!this.hass)return;const e=t.target,i=this._configArray[e.index].colorcondition.slice(),o=[];let n=0;for(const t of i)e.colorconditionIndex!==n&&o.push(i[n]),n++;0===o.length?delete this._configArray[e.index].colorcondition:this._configArray[e.index].colorcondition=o,this._config.entities=this._configArray,this._fireConfigChanged()}_updateObject(t){const e=t.target,i=this._configObjectArray[e.index].objects,o=[];for(const t in i)if(e.objectIndex==t){const n={...i[t]},s={[e.objectAttribute]:e.value},l=Object.assign(n,s);""==e.value&&delete l[e.objectAttribute],o.push(l)}else o.push(i[t]);this._configObjectArray[e.index].objects=o,this._config.object_groups=this._configObjectArray,this._fireConfigChanged()}_updateColorCondition(t){const e=t.target,i=this._configArray[e.index].colorcondition,o=[];for(const t in i)if(e.colorconditionIndex==t){const n={...i[t]},s={[e.colorconditionAttribute]:e.value},l=Object.assign(n,s);""==e.value&&delete l[e.colorconditionAttribute],o.push(l)}else o.push(i[t]);this._configArray[e.index].colorcondition=o,this._config.entities=this._configArray,this._fireConfigChanged()}_createImageElement(t){const e=this._options.entities.options.entities[t].options.image,i=this._configArray[t],o=!!i.type3d&&"image"===i.type3d;return o&&(i.image={...i.image}),u`
      ${o?u`
            <div class="category" id="image">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${e}
                .optionsTarget=${this._options.entities.options.entities[t].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
                  <div class="title">${e.name}</div>
                  <ha-icon .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
                </div>
                <div class="secondary">${e.secondary}</div>
              </div>
              ${e.show?u`
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
                          @closed=${t=>t.stopPropagation()}
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
                          @closed=${t=>t.stopPropagation()}
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
    `}_createLightElement(t){const e=this._options.entities.options.entities[t].options.light,i=this._configArray[t],o=!!i.type3d&&"light"===i.type3d;return o&&(i.light={...i.light}),u`
      ${o?u`
            <div class="category" id="light">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${e}
                .optionsTarget=${this._options.entities.options.entities[t].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
                  <div class="title">${e.name}</div>
                  <ha-icon
                    .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${e.secondary}</div>
              </div>
              ${e.show?u`
                    <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                      ${null!==t?u`
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
                              @closed=${t=>t.stopPropagation()}
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
                              @closed=${t=>t.stopPropagation()}
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
                              @closed=${t=>t.stopPropagation()}
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
    `}_createRoomElement(t){const e=this._options.entities.options.entities[t].options.room,i=this._configArray[t],o=!!i.type3d&&"room"===i.type3d;return o&&(i.room={...i.room}),u`
      ${o?u`
            <div class="category" id="light">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${e}
                .optionsTarget=${this._options.entities.options.entities[t].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
                  <div class="title">${e.name}</div>
                  <ha-icon
                    .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${e.secondary}</div>
              </div>
              ${e.show?u`
                    <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                      ${null!==t?u` <floor3d-formfield alignEnd label="Transparency %">
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
                              @closed=${t=>t.stopPropagation()}
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
    `}_createZoomElement(t){const e=this._options.zoom_areas.options.zoom_areas[t].options.zoom,i=this._configZoomArray[t];return u`
      <div class="category" id="light">
        <div
          class="sub-category"
          @click=${this._toggleThing}
          .options=${e}
          .optionsTarget=${this._options.zoom_areas.options.zoom_areas[t].options}
        >
          <div class="row">
            <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
            <div class="title">${e.name}</div>
            <ha-icon .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"} style="margin-left: auto;"></ha-icon>
          </div>
          <div class="secondary">${e.secondary}</div>
        </div>
        ${e.show?u`
              <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                ${null!==t?u`
                      ${this._objects?u`
                            <floor3d-select
                              label="Object id"
                              @selected=${this._valueChanged}
                              .value=${i.object_id}
                              .configAttribute=${"object_id"}
                              .configObject=${i}
                              .ignoreNull=${!1}
                              required
                              @closed=${t=>t.stopPropagation()}
                            >
                              ${this._objects.map(t=>u` <mwc-list-item value="${t}">${t}</mwc-list-item> `)}
                              ${this._configObjectArray.map(t=>u`
                                  <mwc-list-item value="${"<"+t.object_group+">"}"
                                    >${"<"+t.object_group+">"}</mwc-list-item
                                  >
                                `)}
                            </floor3d-select>
                          `:u`
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
    `}_createTextSubElement(t){return u`
      <floor3d-textfield
        label="Attribute"
        fullwidth
        .value=${t.attribute?t.room.attribute:""}
        .configObject=${t}
        .configAttribute=${"attribute"}
        @input=${this._valueChanged}
      ></floor3d-textfield>
      <floor3d-textfield
        label="font"
        fullwidth
        .value=${t.font?t.font:""}
        .configObject=${t}
        .configAttribute=${"font"}
        @input=${this._valueChanged}
      ></floor3d-textfield>
      <floor3d-formfield alignEnd label="Span percentage">
        <floor3d-textfield
          label="Span percentage"
          type="number"
          min="0"
          max="100"
          .value=${t.span?t.span:null}
          .configObject=${t}
          .configAttribute=${"span"}
          .ignoreNull=${!1}
          @input=${this._valueChanged}
        ></floor3d-textfield>
      </floor3d-formfield>
      <floor3d-textfield
        label="Text Background Color"
        .value=${t.textbgcolor?t.textbgcolor:""}
        .configObject=${t}
        .configAttribute=${"textbgcolor"}
        @input=${this._valueChanged}
      ></floor3d-textfield>
      <floor3d-textfield
        label="Text Foreground Color"
        .value=${t.textfgcolor?t.textfgcolor:""}
        .configObject=${t}
        .configAttribute=${"textfgcolor"}
        @input=${this._valueChanged}
      ></floor3d-textfield>
    `}_createTextElement(t){const e=this._options.entities.options.entities[t].options.text,i=this._configArray[t],o=!!i.type3d&&"text"===i.type3d;return o&&(i.text={...i.text}),u`
      ${o?u`
            <div class="category" id="text">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${e}
                .optionsTarget=${this._options.entities.options.entities[t].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
                  <div class="title">${e.name}</div>
                  <ha-icon
                    .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${e.secondary}</div>
              </div>
              ${e.show?u`
                    <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                      ${null!==t?u` ${this._createTextSubElement(i.text)} `:""}
                    </div>
                  `:""}
            </div>
          `:""}
    `}_createDoorElement(t){const e=this._options.entities.options.entities[t].options.door,i=this._configArray[t],o=!!i.type3d&&"door"===i.type3d;return o&&(i.door={...i.door}),u`
      ${o?u`
            <div class="category" id="door">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${e}
                .optionsTarget=${this._options.entities.options.entities[t].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
                  <div class="title">${e.name}</div>
                  <ha-icon
                    .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${e.secondary}</div>
              </div>
              ${e.show?u`
                    <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                      ${null!==t?u`
                            <floor3d-select
                              label="Door Type"
                              @selected=${this._valueChanged}
                              .value=${i.door.doortype?i.door.doortype:null}
                              .configObject=${i.door}
                              .configAttribute=${"doortype"}
                              .ignoreNull=${!1}
                              @closed=${t=>t.stopPropagation()}
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
                              @closed=${t=>t.stopPropagation()}
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
                              @closed=${t=>t.stopPropagation()}
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
    `}_createCoverElement(t){const e=this._options.entities.options.entities[t].options.cover,i=this._configArray[t],o=!!i.type3d&&"cover"===i.type3d;return o&&(i.cover={...i.cover}),u`
      ${o?u`
            <div class="category" id="cover">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${e}
                .optionsTarget=${this._options.entities.options.entities[t].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
                  <div class="title">${e.name}</div>
                  <ha-icon
                    .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${e.secondary}</div>
              </div>
              ${e.show?u`
                    <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                      ${null!==t?u`
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
    `}_yesNoField(t,e,i,o){const n=e[i];return this._choiceField(t,e,i,o,["yes","no"],!0===n?"yes":!1===n?"no":void 0)}_choiceField(t,e,i,o,n,s){return u`
      <floor3d-select
        label=${t}
        @selected=${this._valueChanged}
        .value=${void 0!==s?s:e[i]?e[i]:o}
        .configObject=${e}
        .configAttribute=${i}
        .ignoreNull=${!1}
        @closed=${t=>t.stopPropagation()}
        style="flex: 1;"
      >
        <mwc-list-item></mwc-list-item>
        ${n.map(t=>u`<mwc-list-item value=${t}>${t}</mwc-list-item>`)}
      </floor3d-select>
    `}_textField(t,e,i,o,n="text"){return u`
      <floor3d-textfield
        label=${t}
        type=${n}
        step="any"
        .value=${void 0!==e[i]?e[i]:o}
        .configObject=${e}
        .configAttribute=${i}
        @input=${this._valueChanged}
      ></floor3d-textfield>
    `}_createTrackerElement(t){if("tracker"==this._configArray[t].type3d){this._configArray[t].tracker||(this._configArray[t].tracker={});const e=this._configArray[t].tracker;return u`
        <div class="card-options">
          <floor3d-textfield
            label="Y Sensor Entity (e.g. sensor.y)"
            .value=${e.sensor_y?e.sensor_y:""}
            .configAttribute=${"sensor_y"}
            .configObject=${e}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Sensor Position [X, Y, Z]"
            .value=${e.sensor_position?JSON.stringify(e.sensor_position):"[0, 0, 0]"}
            .configAttribute=${"sensor_position"}
            .configObject=${e}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <div style="display: flex; gap: 8px;">
            <floor3d-textfield
              label="Rotation (Degrees)"
              type="number"
              .value=${void 0!==e.sensor_rotation?e.sensor_rotation:0}
              .configAttribute=${"sensor_rotation"}
              .configObject=${e}
              @input=${this._valueChanged}
              style="flex: 1;"
            ></floor3d-textfield>
            <floor3d-textfield
              label="Scale"
              type="number"
              step="0.001"
              .value=${void 0!==e.scale?e.scale:.001}
              .configAttribute=${"scale"}
              .configObject=${e}
              @input=${this._valueChanged}
              style="flex: 1;"
            ></floor3d-textfield>
          </div>
          <div style="display: flex; gap: 8px;">
            <floor3d-textfield
              label="Height (cm)"
              type="number"
              .value=${void 0!==e.height?e.height:150}
              .configAttribute=${"height"}
              .configObject=${e}
              @input=${this._valueChanged}
              style="flex: 1;"
            ></floor3d-textfield>
            <floor3d-textfield
              label="Size"
              type="number"
              .value=${void 0!==e.size?e.size:.15}
              .configAttribute=${"size"}
              .configObject=${e}
              @input=${this._valueChanged}
              style="flex: 1;"
            ></floor3d-textfield>
          </div>
          <floor3d-textfield
            label="Color (Hex)"
            .value=${e.color?e.color:"#FF5500"}
            .configAttribute=${"color"}
            .configObject=${e}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <div style="display: flex; gap: 8px;">
            ${this._choiceField("Coordinate Unit (<mm>)",e,"unit","mm",["mm","cm","m"])}
            ${this._yesNoField("Mirror X (yes/<no>)",e,"flip_x","no")}
          </div>
          ${this._textField("Zone Entity (Optional)",e,"zone","")}
        </div>
      `}return u``}_createGestureElement(t){const e=this._options.entities.options.entities[t].options.gesture,i=this._configArray[t],o=!!i.type3d&&"gesture"===i.type3d;return o&&(i.gesture={...i.gesture}),u`
      ${o?u`
            <div class="category" id="text">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${e}
                .optionsTarget=${this._options.entities.options.entities[t].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
                  <div class="title">${e.name}</div>
                  <ha-icon
                    .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${e.secondary}</div>
              </div>
              ${e.show?u`
                    <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                      ${null!==t?u`
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
    `}_createRotateElement(t){const e=this._options.entities.options.entities[t].options.rotate,i=this._configArray[t],o=!!i.type3d&&"rotate"===i.type3d;return o&&(i.rotate={...i.rotate}),u`
      ${o?u`
            <div class="category" id="text">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${e}
                .optionsTarget=${this._options.entities.options.entities[t].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
                  <div class="title">${e.name}</div>
                  <ha-icon
                    .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${e.secondary}</div>
              </div>
              ${e.show?u`
                    <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                      ${null!==t?u`
                            <floor3d-select
                              label="Axis"
                              @selected=${this._valueChanged}
                              .value=${i.rotate.axis?i.rotate.axis:null}
                              .configObject=${i.rotate}
                              .configAttribute=${"axis"}
                              .ignoreNull=${!1}
                              @closed=${t=>t.stopPropagation()}
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
    `}_createHideElement(t){const e=this._options.entities.options.entities[t].options.hide,i=this._configArray[t],o=!!i.type3d&&"hide"===i.type3d;return o&&(i.hide={...i.hide}),u`
      ${o?u`
            <div class="category" id="hide">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${e}
                .optionsTarget=${this._options.entities.options.entities[t].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
                  <div class="title">${e.name}</div>
                  <ha-icon
                    .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${e.secondary}</div>
              </div>
              ${e.show?u`
                    <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                      ${null!==t?u`
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
    `}_createShowElement(t){const e=this._options.entities.options.entities[t].options.show,i=this._configArray[t],o=!!i.type3d&&"show"===i.type3d;return o&&(i.show={...i.show}),u`
      ${o?u`
            <div class="category" id="show">
              <div
                class="sub-category"
                @click=${this._toggleThing}
                .options=${e}
                .optionsTarget=${this._options.entities.options.entities[t].options}
              >
                <div class="row">
                  <ha-icon .icon=${`mdi:${e.icon}`}></ha-icon>
                  <div class="title">${e.name}</div>
                  <ha-icon
                    .icon=${e.show?"mdi:chevron-up":"mdi:chevron-down"}
                    style="margin-left: auto;"
                  ></ha-icon>
                </div>
                <div class="secondary">${e.secondary}</div>
              </div>
              ${e.show?u`
                    <div class="card-options" style="display: flex; flex-direction: column; align-items: left;">
                      ${null!==t?u`
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
    `}_initialize(){void 0!==this.hass&&void 0!==this._config&&void 0!==this._helpers&&(this._initialized=!0)}async loadCardHelpers(){this._helpers=await window.loadCardHelpers()}_toggleAction(t){this._toggleThing(t)}_toggleOption(t){this._toggleThing(t)}_typeChanged(t){if(!this._config||!this.hass)return;const e=t.target;if(e.configObject[e.configAttribute]==e.value)return;let i=e.configObject[e.configAttribute];if(this._valueChanged(t),console.log("Type3D changed start"),e.configObject[i]){const e=this._configArray,o=[];e.forEach((e,n)=>{if(t.target.configIndex==n){let e;switch(i){case"light":const{light:i,...o}=t.target.configObject;e=o;break;case"image":const{image:n,...s}=t.target.configObject;e=s;break;case"room":let{room:l,...r}=t.target.configObject;e=r;break;case"zoom":let{zoom:d,...a}=t.target.configObject;e=a;break;case"color":let{colorcondition:c,...h}=t.target.configObject;e=h;break;case"hide":let{hide:m,...p}=t.target.configObject;e=p;break;case"show":let{show:u,...f}=t.target.configObject;e=f;break;case"door":let{door:g,...v}=t.target.configObject;e=v;break;case"gesture":let{gesture:_,...b}=t.target.configObject;e=b;break;case"camera":let{camera:x,...y}=t.target.configObject;e=y;break;case"text":let{text:$,...A}=t.target.configObject;e=A;break;case"rotate":let{rotate:w,...E}=t.target.configObject;e=E;break;case"cover":let{cover:C,...S}=t.target.configObject;e=S}console.log(e),o.push(e)}else o.push(e)}),this._configArray=o}t.target.optionTgt.color&&(t.target.optionTgt.color.visible=!1),t.target.optionTgt.hide&&(t.target.optionTgt.hide.visible=!1),t.target.optionTgt.show&&(t.target.optionTgt.show.visible=!1),t.target.optionTgt.room&&(t.target.optionTgt.room.visible=!1),t.target.optionTgt.zoom&&(t.target.optionTgt.zoom.visible=!1),t.target.optionTgt.door&&(t.target.optionTgt.door.visible=!1),t.target.optionTgt.text&&(t.target.optionTgt.text.visible=!1),t.target.optionTgt.cover&&(t.target.optionTgt.cover.visible=!1),t.target.optionTgt.gesture&&(t.target.optionTgt.gesture.visible=!1),t.target.optionTgt.rotate&&(t.target.optionTgt.rotate.visible=!1),t.target.optionTgt.camera&&(t.target.optionTgt.camera.visible=!1),t.target.optionTgt.light&&(t.target.optionTgt.light.visible=!1),console.log("Type3D changed end")}_fireConfigChanged(){this._internal=a(this._config);const t=g(this._config),e=JSON.stringify(t);e!==this._held?(this._held=e,v(this,"config-changed",{config:t})):this.setConfig(t)}_valueChanged(t){if(!this._config||!this.hass)return;const e=t.target;let i=void 0!==e.checked?e.checked:e.value;"number"===e.type&&""!==i&&Number.isFinite(Number(i))&&(i=Number(i));const o=e.configObject[e.configAttribute];if(o!==i&&(null==o||String(o)!==String(i))){if(e.configAdd&&""!==i&&(e.configObject=Object.assign(e.configObject,{[e.configAdd]:{[e.configAttribute]:i}})),e.configAttribute&&e.configObject&&!e.configAdd)if(""===i||!1===i){if(1==e.ignoreNull)return;delete e.configObject[e.configAttribute]}else if("sensor_position"===e.configAttribute){let t;try{t=JSON.parse(i)}catch(t){return}if(!Array.isArray(t)||3!==t.length||!t.every(t=>"number"==typeof t&&isFinite(t)))return;e.configObject[e.configAttribute]=t}else e.configObject[e.configAttribute]=i;this._config.entities=this._configArray,this._config.object_groups=this._configObjectArray,this._config.zoom_areas=this._configZoomArray,this._fireConfigChanged()}}_createInfoElement(t){if("info"==this._configArray[t].type3d){this._configArray[t].info||(this._configArray[t].info={});const e=this._configArray[t].info;return u`
        <div class="card-options">
          <floor3d-textfield
            label="Template/Text"
            .value=${e.text?e.text:""}
            .configAttribute=${"text"}
            .configObject=${e}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Position [X, Y, Z] (Optional)"
            .value=${e.position?JSON.stringify(e.position):""}
            .configAttribute=${"position"}
            .configObject=${e}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Text Color"
            .value=${e.textfgcolor?e.textfgcolor:"white"}
            .configAttribute=${"textfgcolor"}
            .configObject=${e}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Background Color"
            .value=${e.textbgcolor?e.textbgcolor:"transparent"}
            .configAttribute=${"textbgcolor"}
            .configObject=${e}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
             label="Font"
             .value=${e.font?e.font:"monospace"}
             .configAttribute=${"font"}
             .configObject=${e}
             @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Size"
            type="number"
            .value=${void 0!==e.size?e.size:100}
            .configAttribute=${"size"}
            .configObject=${e}
            @input=${this._valueChanged}
          ></floor3d-textfield>
        </div>
      `}return u``}_createShowerElement(t){if("shower"==this._configArray[t].type3d){this._configArray[t].shower||(this._configArray[t].shower={});const e=this._configArray[t].shower;return u`
        <div class="card-options">
          <floor3d-textfield
            label="Speed"
            type="number"
            .value=${void 0!==e.velocity?e.velocity:5}
            .configAttribute=${"velocity"}
            .configObject=${e}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Drop Count"
            type="number"
            .value=${void 0!==e.count?e.count:200}
            .configAttribute=${"count"}
            .configObject=${e}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Color"
            .value=${e.color?e.color:"#aaaaaa"}
            .configAttribute=${"color"}
            .configObject=${e}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Drop Size"
            type="number"
            .value=${void 0!==e.size?e.size:1}
            .configAttribute=${"size"}
            .configObject=${e}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Height (cm)"
            type="number"
            .value=${void 0!==e.height?e.height:100}
            .configAttribute=${"height"}
            .configObject=${e}
            @input=${this._valueChanged}
          ></floor3d-textfield>
          <floor3d-textfield
            label="Spray Area Side (cm)"
            type="number"
            .value=${void 0!==e.width?e.width:20}
            .configAttribute=${"width"}
            .configObject=${e}
            @input=${this._valueChanged}
          ></floor3d-textfield>
        </div>
      `}return u``}static get styles(){return _`
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
    `}};o([l({attribute:!1})],fa.prototype,"hass",void 0),o([r()],fa.prototype,"_config",void 0),o([r()],fa.prototype,"_toggle",void 0),o([r()],fa.prototype,"_helpers",void 0),fa=o([s("floor3d-card-editor-classic")],fa);export{fa as Floor3dCardClassicEditor};
