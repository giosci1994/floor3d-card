import{aq as e,ar as t,_ as i,n as o,r as n,t as s,i as r,P as a,p as c,a as l,as as d,f as h,at as m,au as _,av as p,Q as u,E as g,aw as f,C as b,o as v,m as y,ax as w,ay as x,az as j,aA as $,aB as k,aC as A,aD as O,an as L}from"./floor3d-card-core-B7-MuakF.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const S=2;let C=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:P}=e,z=e=>e,E=()=>document.createComment(""),D=(e,t,i)=>{const o=e._$AA.parentNode,n=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=o.insertBefore(E(),n),s=o.insertBefore(E(),n);i=new P(t,s,e,e.options)}else{const t=i._$AB.nextSibling,s=i._$AM,r=s!==e;if(r){let t;i._$AQ?.(e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==s._$AU&&i._$AP(t)}if(t!==n||r){let e=i._$AA;for(;e!==t;){const t=z(e).nextSibling;z(o).insertBefore(e,n),e=t}}}return i},T=(e,t,i=e)=>(e._$AI(t,i),e),I={},N=(e,t=I)=>e._$AH=t,M=e=>{e._$AR(),e._$AA.remove()},R=(e,t,i)=>{const o=new Map;for(let n=t;n<=i;n++)o.set(e[n],n);return o},B=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends C{constructor(e){if(super(e),e.type!==S)throw Error("repeat() can only be used in text expressions")}dt(e,t,i){let o;void 0===i?i=t:void 0!==t&&(o=t);const n=[],s=[];let r=0;for(const t of e)n[r]=o?o(t,r):r,s[r]=i(t,r),r++;return{values:s,keys:n}}render(e,t,i){return this.dt(e,t,i).values}update(e,[i,o,n]){const s=e._$AH,{values:r,keys:a}=this.dt(i,o,n);if(!Array.isArray(s))return this.ut=a,r;const c=this.ut??=[],l=[];let d,h,m=0,_=s.length-1,p=0,u=r.length-1;for(;m<=_&&p<=u;)if(null===s[m])m++;else if(null===s[_])_--;else if(c[m]===a[p])l[p]=T(s[m],r[p]),m++,p++;else if(c[_]===a[u])l[u]=T(s[_],r[u]),_--,u--;else if(c[m]===a[u])l[u]=T(s[m],r[u]),D(e,l[u+1],s[m]),m++,u--;else if(c[_]===a[p])l[p]=T(s[_],r[p]),D(e,s[m],s[_]),_--,p++;else if(void 0===d&&(d=R(a,p,u),h=R(c,m,_)),d.has(c[m]))if(d.has(c[_])){const t=h.get(a[p]),i=void 0!==t?s[t]:null;if(null===i){const t=D(e,s[m]);T(t,r[p]),l[p]=t}else l[p]=T(i,r[p]),D(e,s[m],i),s[t]=null;p++}else M(s[_]),_--;else M(s[m]),m++;for(;p<=u;){const t=D(e,l[u+1]);T(t,r[p]),l[p++]=t}for(;m<=_;){const e=s[m++];null!==e&&M(e)}return this.ut=a,N(e,l),t}}),F=(e,t={})=>({name:e,selector:{text:t}}),J=(e,t={})=>({name:e,selector:{number:{mode:"box",step:"any",...t}}}),H=e=>({name:e,selector:{boolean:{}}}),Z=(e,t)=>({name:e,selector:{select:{mode:"dropdown",options:t.map(([e,t])=>({value:e,label:t}))}}}),U=(e,t,i=!1)=>({name:e,selector:{entity:{...t?{filter:{domain:t}}:{},...i?{multiple:!0}:{}}}}),V=(...e)=>({type:"grid",name:"",flatten:!0,column_min_width:"140px",schema:e}),X=(e,t=["x","y","z"])=>({type:"grid",name:e,column_min_width:"70px",schema:t.map(e=>J(e))}),Y=(e,t)=>({name:e,selector:{select:{mode:"dropdown",custom_value:!0,sort:!1,options:t}}}),q={header:"yes",click:"no",overlay:"no",lock_camera:"no",show_axes:"no",shadow:"no",extralightmode:"no",hideLevelsMenu:"no",hideZoomMenu:"no",editModeNotifications:"yes",selectionMode:"no",sun:"no",sun_shadow:"yes",log_depth:"no",reversed_depth:"yes",state_colors:"no"},W={image:{lighting_shadow:"yes"},room:{label:"no"},tracker:{label:"yes",flip_x:"no",flip_y:"no"}},G={info:["position"],tracker:["sensor_position"]},Q=[{key:"model",title:"3D model",icon:"mdi:cube-outline",content:()=>[[F("name"),H("header")],[F("path"),V(F("objfile"),F("mtlfile")),F("objectlist")],[V(F("backgroundColor"),F("style"))]]},{key:"view",title:"Camera and navigation",icon:"mdi:camera-outline",content:()=>["Initial view",[X("camera_position")],[X("camera_target")],[X("camera_rotate")],[V(H("lock_camera"),H("hideZoomMenu")),V(H("hideLevelsMenu"),J("initialLevel",{step:1}))],[{name:"url_parameters",type:"grid",column_min_width:"140px",schema:[{...F("zoom"),label:"View from the page address",helper:"A parameter name, e.g. area: ?area=kitchen shows the view kitchen"}]}],"North (orients the sun)",[X("north",["x","z"])]]},{key:"light",title:"Light and shadows",icon:"mdi:lightbulb-on-outline",content:e=>[[V(F("globalLightPower"),J("light_power",{min:0})),V(J("exposure",{min:0}),Z("tone_mapping",[["neutral","Neutral"],["agx","AgX"],["aces","ACES Filmic"],["linear","Linear"]])),V(H("shadow"),H("extralightmode")),F("sky_power"),...null!=e.sky_power&&0!==Number(e.sky_power)?[V(F("sky_color"),F("ground_color"))]:[],H("sun")],..."yes"===e.sun||!0===e.sun?[[V(U("sun_entity","sun"),F("sun_power")),H("sun_shadow")],"sun_roof"]:[]]},{key:"interaction",title:"Interaction",icon:"mdi:gesture-tap",content:e=>[[V(H("click"),H("editModeNotifications")),V(H("selectionMode"),H("show_axes")),H("overlay")],..."yes"===e.overlay||!0===e.overlay?["Overlay",[V(F("overlay_bgcolor"),F("overlay_fgcolor")),V(Z("overlay_alignment",[["top-left","Top left"],["top-right","Top right"],["bottom-left","Bottom left"],["bottom-right","Bottom right"]]),J("overlay_width",{min:0,max:100,unit_of_measurement:"%"}),J("overlay_height",{min:0,max:100,unit_of_measurement:"%"})),V(F("overlay_font"),F("overlay_fontsize"))]]:[]]},{key:"colours",title:"State colours and room maps",icon:"mdi:palette-outline",content:()=>[[H("state_colors"),V(F("open_color"),F("alarm_color")),U("alarm_entity","alarm_control_panel"),V(Z("room_colors",[["none","None"],["temperature","Temperature"],["presence","Presence"],["illuminance","Illuminance"]]),F("presence_color")),V(J("temperature_min"),J("temperature_max")),V(J("illuminance_min",{min:0}),J("illuminance_max",{min:0}))],"rooms"]},{key:"rendering",title:"Rendering",icon:"mdi:tune-variant",content:()=>[[V(J("max_pixel_ratio",{min:.5,max:4}),H("log_depth")),H("reversed_depth"),F("draco_decoder_path")]]}],K=[["light","Light","mdi:lightbulb-outline"],["hide","Hidden in a state","mdi:eye-off-outline"],["show","Shown in a state","mdi:eye-outline"],["color","Colour by state","mdi:palette-outline"],["text","Text","mdi:format-text"],["room","Room label and colour","mdi:floor-plan"],["door","Door or window","mdi:door-open"],["cover","Cover (roller shutter)","mdi:window-shutter"],["rotate","Rotating object (fan)","mdi:fan"],["gesture","Service on tap","mdi:gesture-tap"],["camera","Camera","mdi:cctv"],["image","Picture (TV screen)","mdi:television"],["info","Info box","mdi:information-outline"],["shower","Shower","mdi:shower-head"],["tracker","Person tracker","mdi:account-search-outline"]],ee=[["more-info","Show the entity details"],["overlay","Show the state in the overlay"],["default","Default (toggle a light, run the service, open the camera)"]],te=()=>[U("entity"),{name:"type3d",selector:{select:{mode:"dropdown",options:K.map(([e,t])=>({value:e,label:t}))}}}],ie=(e,t)=>{switch(e){case"light":return[[{name:"light",type:"grid",column_min_width:"140px",schema:[J("lumens",{min:0,max:2e4,step:50}),F("color"),J("decay",{min:0}),J("distance",{min:0,unit_of_measurement:"cm"}),Z("shadow",[["yes","Yes"],["no","No"]]),Z("vertical_alignment",[["top","Top"],["middle","Middle"],["bottom","Bottom"]])]}],"Spot (optional)",[{name:"light",type:"grid",column_min_width:"140px",schema:[Y("light_target",t),J("angle",{min:0,max:180,unit_of_measurement:"°"})]}],"light.light_direction"];case"door":return[[{name:"door",type:"grid",column_min_width:"140px",schema:[Z("doortype",[["swing","Swing"],["slide","Slide"]]),Z("side",[["left","Left"],["right","Right"],["up","Up"],["down","Down"]]),Z("direction",[["inner","Inner"],["outer","Outer"]]),J("degrees",{min:-180,max:180,unit_of_measurement:"°"}),J("percentage",{min:0,max:100,unit_of_measurement:"%"}),Y("hinge",t),Y("pane",t)]}]];case"cover":return[[{name:"cover",type:"grid",column_min_width:"140px",schema:[Y("pane",t),Z("side",[["up","Up"],["down","Down"]])]}]];case"rotate":return[[{name:"rotate",type:"grid",column_min_width:"140px",schema:[Z("axis",[["x","X"],["y","Y"],["z","Z"]]),J("round_per_second",{min:0}),J("ramp",{min:0,unit_of_measurement:"s"}),Y("hinge",t)]}]];case"room":return[[{name:"room",type:"grid",column_min_width:"140px",schema:[F("color"),J("transparency",{min:0,max:100,unit_of_measurement:"%"}),J("elevation",{min:0,unit_of_measurement:"cm"}),H("label"),Z("label_text",[["state","State"],["template","Template"]]),F("attribute"),J("width",{min:0}),J("height",{min:0})]}],"Label text",oe(),"colorcondition"];case"text":return[[{name:"text",type:"grid",column_min_width:"140px",schema:[F("attribute")]}],oe()];case"color":return["colorcondition"];case"hide":case"show":return[[{name:e,type:"grid",column_min_width:"140px",schema:[F("state")]}]];case"gesture":return[[{name:"gesture",type:"grid",column_min_width:"140px",schema:[F("domain"),F("service")]}]];case"image":return[[{name:"image",type:"grid",column_min_width:"140px",schema:[F("attribute"),J("rotate",{unit_of_measurement:"°"}),H("mirror"),J("lumens",{min:0})]}],"Room light from the picture",[{name:"image",type:"grid",column_min_width:"140px",schema:[J("lighting_lumens",{min:0}),Z("lighting_direction",[["positive_z","+Z"],["negative_z","−Z"],["positive_x","+X"],["negative_x","−X"],["positive_y","+Y"],["negative_y","−Y"]]),J("lighting_distance",{min:0,unit_of_measurement:"cm"}),F("lighting_off_state"),H("lighting_shadow")]}]];case"info":return[[{name:"info",type:"grid",column_min_width:"140px",schema:[F("text"),F("textfgcolor"),F("textbgcolor"),F("font"),J("size",{min:0})]}],"info.position"];case"shower":return[[{name:"shower",type:"grid",column_min_width:"140px",schema:[J("velocity",{min:0}),J("count",{min:1,step:1}),F("color"),J("size",{min:0}),J("width",{min:0,unit_of_measurement:"cm"}),J("height",{min:0,unit_of_measurement:"cm"})]}]];case"tracker":return[[{name:"tracker",type:"grid",column_min_width:"140px",schema:[U("sensor_x","sensor"),U("sensor_y","sensor"),Z("unit",[["mm","mm"],["cm","cm"],["m","m"]]),J("scale",{min:0}),H("flip_x"),H("flip_y"),U("zone"),H("label"),F("color"),J("size",{min:0}),J("height",{min:0,unit_of_measurement:"cm"}),J("sensor_rotation",{unit_of_measurement:"°"})]}],"tracker.sensor_position"];default:return[]}},oe=()=>[V(F("font"),J("span",{min:0,max:100,unit_of_measurement:"%"})),V(F("textfgcolor"),F("textbgcolor"))],ne={name:"Name",header:"Show the header",path:"Folder of the model",objfile:"Model file (.obj or .glb)",mtlfile:"Materials file (.mtl)",objectlist:"Object list (JSON file)",backgroundColor:"Background colour",style:"Canvas style (CSS)",x:"X",y:"Y",z:"Z",lock_camera:"Lock the camera",hideZoomMenu:"Buttons instead of the Views menu",hideLevelsMenu:"Hide the levels menu",initialLevel:"Initial level",globalLightPower:"Light following the camera",light_power:"Lamp power",exposure:"Exposure",tone_mapping:"Tone mapping",shadow:"Shadows",extralightmode:"Extra light mode",sun:"Sunlight",sun_entity:"Sun entity",sun_power:"Sun power",sun_shadow:"Sun shadows",sky_power:"Sky light",sky_color:"Sky colour",ground_color:"Ground colour",click:"Tap runs the action",editModeNotifications:"Object names on double click (dashboard in edit mode)",selectionMode:"Selection mode",show_axes:"Show the axes",overlay:"Overlay",overlay_bgcolor:"Background colour",overlay_fgcolor:"Text colour",overlay_alignment:"Position",overlay_width:"Width",overlay_height:"Height",overlay_font:"Font",overlay_fontsize:"Font size",state_colors:"Colour open doors and windows",open_color:"Colour when open",alarm_color:"Colour when the alarm is armed",alarm_entity:"Alarm",room_colors:"Initial room map",presence_color:"Presence colour",temperature_min:"Temperature for blue",temperature_max:"Temperature for red",illuminance_min:"Lux for dark blue",illuminance_max:"Lux for yellow",max_pixel_ratio:"Maximum pixel ratio",log_depth:"Logarithmic depth buffer",reversed_depth:"Reversed depth buffer",entity:"Entity",type3d:"Type",object_id:"Object",action:"Tap action",long_press_action:"Long press action",entity_template:"Entity template",lumens:"Lumens",color:"Colour",decay:"Decay",distance:"Distance",vertical_alignment:"Vertical position",light_target:"Spot target object",angle:"Spot angle",doortype:"Door type",side:"Side",direction:"Direction",degrees:"Opening angle (swing)",percentage:"Opening (slide)",hinge:"Hinge object",pane:"Pane object",axis:"Axis",round_per_second:"Rounds per second",ramp:"Spin-up and coast-down",draco_decoder_path:"Draco decoder folder",transparency:"Transparency",elevation:"Height of the room",label:"Label",label_text:"Label shows",attribute:"Attribute",width:"Width",height:"Height",font:"Font",span:"Width of the text",textfgcolor:"Text colour",textbgcolor:"Background colour",state:"State",domain:"Service domain",service:"Service",mirror:"Mirror",lighting_lumens:"Lumens",lighting_direction:"Direction",lighting_distance:"Distance",lighting_off_state:"Off in state",lighting_shadow:"Shadows",text:"Text or template",size:"Size",velocity:"Speed",count:"Drops",sensor_x:"X sensor",sensor_y:"Y sensor",unit:"Unit of the coordinates",scale:"Scale",flip_x:"Mirror X",flip_y:"Mirror Y",zone:"Zone entity",sensor_rotation:"Sensor rotation",object_group:"Group name",temperature:"Temperature sensor",illuminance:"Illuminance sensor",presence:"Presence entities",zoom:"Name",level:"Level"},se={path:"For example /local/floor3d/",objectlist:"Optional: a JSON list of the object names, for the object menus",backgroundColor:"A colour, #rrggbb or transparent. Default #aaaaaa",globalLightPower:"From 0 to 1, or a numeric sensor. Default 0.2",light_power:"Multiplies all the lamps. Default 1",exposure:"Default 1",sun_power:"A number or a numeric sensor, to dim it with clouds. Default 1",sky_power:"Fills the shade, without shadows: a number or a numeric sensor. Default 0 (off)",sky_color:"Light from above. Default #e6eeff",ground_color:"Light from below. Default #706458",extralightmode:"Only the lights that are on cast shadows",click:"Off: a double click runs it",selectionMode:"Taps color the objects and list them, to build groups",max_pixel_ratio:"Default 2",temperature_min:"Default 17",temperature_max:"Default 27",illuminance_min:"Default 5 (the scale is logarithmic)",illuminance_max:"Default 1000",entity_template:"JavaScript between [[[ ]]], $entity is the state",lumens:"Default 800",decay:"Default 2",distance:"Default 600 cm",round_per_second:"2 or less",ramp:"Seconds to full speed or to stop. Default 1.5, 0 for none",objfile:"A .glb can be compressed with Draco or meshopt",draco_decoder_path:"Only for .glb models compressed with Draco. Default: Google CDN",span:"Of the object, in %",lighting_off_state:"Default off, standby, unavailable, unknown",scale:"Default 0.001",text:"A text or a template"},re=e=>e.label??ne[e.name]??e.name,ae=e=>e.helper??se[e.name],ce={camera_position:"Camera position",camera_target:"Camera target",camera_rotate:"Camera rotation","light.light_direction":"Spot direction","info.position":"Position (optional)","tracker.sensor_position":"Sensor position"},le=e=>null!==e&&"object"==typeof e&&!Array.isArray(e),de=e=>JSON.parse(JSON.stringify(e??null));
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function he(e,t){const i={...e};return Object.entries(t).forEach(([e,t])=>{const o=i[e]??t;i[e]=!0===o||"yes"===o}),i}function me(e,t,i){const o={...e};return Object.entries(i).forEach(([e,i])=>{if("boolean"!=typeof o[e])return;const n=o[e]?"yes":"no";n===i&&void 0===(t||{})[e]?delete o[e]:o[e]=n}),o}function _e(e){return Object.keys(e).forEach(t=>{void 0!==e[t]&&""!==e[t]&&null!==e[t]||delete e[t]}),e}function pe(e){const t={...e};return Object.entries(W).forEach(([e,i])=>{(le(t[e])||t.type3d===e)&&(t[e]=he(t[e]||{},i))}),Object.entries(G).forEach(([e,i])=>{le(t[e])&&(t[e]={...t[e]},i.forEach(i=>{const o=t[e][i];Array.isArray(o)&&(t[e][i]={x:o[0],y:o[1],z:o[2]})}))}),t}function ue(e,t){const i=_e({...e});return Object.entries(W).forEach(([e,o])=>{le(i[e])&&(i[e]=me(i[e],(t||{})[e],o))}),Object.entries(G).forEach(([e,t])=>{le(i[e])&&t.forEach(t=>{const o=i[e][t];if(!le(o))return;const n=[o.x,o.y,o.z];n.every(e=>"number"==typeof e&&isFinite(e))?i[e][t]=n:n.every(e=>null==e)&&delete i[e][t]})}),Object.keys(i).forEach(e=>{le(i[e])&&_e(i[e])}),i}let ge=class extends r{constructor(){super(...arguments),this._view={},this._expanded=[],this._mode="loading",this._modelObjects=[],this._listObjects=[],this._paused=!1,this._flushListener=()=>{this._flush()},this._keys=new WeakMap,this._previewListener=e=>this._onPreview(e.detail)}connectedCallback(){super.connectedCallback(),window.addEventListener(a,this._previewListener),this.addEventListener("focusout",this._flushListener),window.addEventListener("pointerdown",this._flushListener,!0),this._paused=c.paused,this._toPreview({request:"objects"}),"loading"===this._mode&&async function(){if(customElements.get("ha-form")&&customElements.get("ha-expansion-panel"))return!0;try{const e=await window.loadCardHelpers();for(const t of[{type:"entities",entities:[]},{type:"tile",entity:"sun.sun"}]){const i=await e.createCardElement(t);await(i.constructor.getConfigElement?.())}}catch(e){}return await Promise.race([customElements.whenDefined("ha-form").then(()=>!0),new Promise(e=>setTimeout(()=>e(!1),5e3))])&&!!customElements.get("ha-expansion-panel")}().then(e=>{this._mode=e?"ready":"classic",e||this._showClassic()})}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(a,this._previewListener),this.removeEventListener("focusout",this._flushListener),window.removeEventListener("pointerdown",this._flushListener,!0),this._flush(),c.paused=!1,this._toPreview({pick:!1,highlight:[]})}setConfig(e){const t=JSON.stringify(e),i=this._internal&&t===this._held;this._held=t,i||(window.clearTimeout(this._timer),this._pending=void 0);const o=l(i?this._internal:e);Array.isArray(o.entities)||(o.entities=[]),this._config||(this._expanded=o.entities.length?["entities"]:["model"]),this._config=o,this._classic&&this._classic.setConfig(e),this._loadObjectList()}_update(e){this._config=e,this._internal=l(e),this._pending=d(e),window.clearTimeout(this._timer),this._timer=window.setTimeout(()=>this._flush(),1e3)}_flush(){window.clearTimeout(this._timer),this._timer=void 0;const e=this._pending;if(this._pending=void 0,!e)return!1;const t=JSON.stringify(e);return t!==this._held&&(this._held=t,h(this,"config-changed",{config:e}),!0)}_previewButtons(){return u`
      <ha-icon-button
        .label=${this._paused?"Resume the preview":"Pause the preview (it keeps its last picture while you edit)"}
        .path=${this._paused?m:_}
        @click=${()=>this._setPaused(!this._paused)}
      ></ha-icon-button>
      <ha-icon-button .label=${"Reload the preview"} .path=${p} @click=${()=>this._reloadPreview()}></ha-icon-button>
    `}_setPaused(e){this._paused=e,c.paused=e,e?(c.image=void 0,this._toPreview({request:"snapshot"})):this._reloadPreview()}_reloadPreview(){this._flush()||this._toPreview({request:"reload"})}_setTop(e){this._update(_e(me(e,this._config,q)))}_list(e){return Array.isArray(this._config[e])?this._config[e]:[]}_setList(e,t){this._update({...this._config,[e]:t})}_setItem(e,t,i){const o=this._list(e).slice();o[t]=i,this._setList(e,o)}_key(e){return le(e)?(this._keys.has(e)||this._keys.set(e,Math.random().toString(36).slice(2)),this._keys.get(e)):String(e)}_toPreview(e){window.dispatchEvent(new CustomEvent(g,{detail:e}))}_onPreview(e){if(e&&(e.objects&&(this._modelObjects=e.objects,this._picking&&this._toPreview({pick:!0}),this._highlightCurrent()),e.picked&&this._picking&&this._onPicked(e.picked),e.camera&&this._cameraTarget)){const t=this._cameraTarget;this._cameraTarget=void 0,this._applyCamera(t,e.camera)}}_useCurrentView(e,t){this._paused?this._setPaused(!1):(this._cameraTarget={list:e,index:t},this._toPreview({request:"camera"}))}_applyCamera(e,t){const i=e=>({x:+e.x.toFixed(2),y:+e.y.toFixed(2),z:+e.z.toFixed(2)}),o={camera_position:i(t.camera_position),camera_target:i(t.camera_target),camera_rotate:{x:+t.camera_rotate.x.toFixed(4),y:+t.camera_rotate.y.toFixed(4),z:+t.camera_rotate.z.toFixed(4)}};if(e.list){const t={...this._list(e.list)[e.index],...o};this._setItem(e.list,e.index,t)}else this._update({...this._config,...o})}_startPick(e){this._paused&&this._setPaused(!1);const t=this._picking&&JSON.stringify(this._picking)===JSON.stringify(e);this._picking=t?void 0:e,this._toPreview({pick:!t})}_onPicked(e){const t=this._picking;if(t.add){const[i,o]=t.path,n={...this._list(i)[o]},s=(n.objects||[]).slice(),r=s.findIndex(t=>(le(t)?t.object_id:t)===e);r>=0?s.splice(r,1):s.push({object_id:e}),this._setItem(i,o,{...n,objects:s})}else this._picking=void 0,this._toPreview({pick:!1}),this._setPath(t.path,e)}_setPath(e,t){const i=de(this._config);let o=i;e.slice(0,-1).forEach(e=>{void 0===o[e]&&(o[e]={}),o=o[e]}),o[e[e.length-1]]=t,this._update(i)}_highlight(e){this._toPreview({highlight:e.filter(e=>"string"==typeof e&&""!==e)})}_highlightCurrent(){const{list:e,index:t}=this._view;this._highlight(e&&void 0!==t?this._itemObjects(e,this._list(e)[t]):[])}_itemObjects(e,t){return le(t)?"object_groups"===e?(t.objects||[]).map(e=>le(e)?e.object_id:e):[t.object_id]:[]}_objectOptions(){const e=this._list("object_groups").filter(e=>le(e)&&e.object_group).map(e=>"<"+e.object_group+">"),t=Array.from(new Set([...this._modelObjects,...this._listObjects])).sort((e,t)=>e.toLowerCase().localeCompare(t.toLowerCase()));return[...e,...t]}_loadObjectList(){const{path:e,objectlist:t}=this._config||{},i=t&&e?e.replace(/\/?$/,"/")+t:void 0;i!==this._objectlist&&(this._objectlist=i,this._listObjects=[],i&&fetch(i).then(e=>e.ok?e.json():{}).then(e=>{this._objectlist===i&&(this._listObjects=Object.keys(e||{}))}).catch(()=>{}))}async _showClassic(){await(import("./floor3d-card-editor-classic-DKXjOOiT.js"));const e=document.createElement("floor3d-card-editor-classic");e.hass=this.hass,this._config&&e.setConfig(this._config),this._classic=e,this.requestUpdate()}updated(e){e.has("hass")&&this._classic&&(this._classic.hass=this.hass),e.has("_view")&&this._highlightCurrent()}render(){if(!this.hass||!this._config)return f;if("classic"===this._mode)return u`${this._classic||f}`;if("loading"===this._mode)return u`<div class="loading">Loading…</div>`;const{list:e,index:t}=this._view;return e&&void 0!==t&&void 0!==this._list(e)[t]?this._renderItemEditor(e,t):u`
      <div class="version">
        floor3d-card ${b} ${this._previewButtons()}
      </div>
      ${Q.map(e=>this._renderPanel(e.key,e.title,e.icon,()=>this._renderContent(e.content(this._config),this._config,e=>this._setTop(e),!0)))}
      ${this._renderPanel("entities",`Entities (${this._list("entities").length})`,"mdi:format-list-bulleted",()=>this._renderList("entities","Add entity",{entity:""}))}
      ${this._renderPanel("object_groups",`Object groups (${this._list("object_groups").length})`,"mdi:group",()=>this._renderList("object_groups","Add group",{object_group:"",objects:[]}))}
      ${this._renderPanel("zoom_areas",`Views (${this._list("zoom_areas").length})`,"mdi:magnify-expand",()=>this._renderList("zoom_areas","Add view",{zoom:""}))}
    `}_renderPanel(e,t,i,o){const n=this._expanded.includes(e);return u`
      <ha-expansion-panel
        outlined
        .header=${t}
        .expanded=${n}
        @expanded-changed=${t=>{const i=t.detail.expanded;i!==this._expanded.includes(e)&&(this._expanded=i?[...this._expanded,e]:this._expanded.filter(t=>t!==e))}}
      >
        <ha-icon slot="leading-icon" .icon=${i}></ha-icon>
        <div class="panel">${n?o():f}</div>
      </ha-expansion-panel>
    `}_renderContent(e,t,i,o=!1,n,s){return e.map(e=>{if("string"!=typeof e)return this._form(e,o?he(t,q):pe(t),e=>i(o?e:ue(e,t)));switch(e){case"sun_roof":return this._form([(r="sun_roof",a=this._objectOptions(),{name:r,selector:{select:{mode:"dropdown",custom_value:!0,multiple:!0,options:a}}})],{sun_roof:Array.isArray(t.sun_roof)?t.sun_roof:[]},e=>i({...he(t,q),sun_roof:e.sun_roof?.length?e.sun_roof:void 0}),"Indoor floors: roof for the sun");case"rooms":return u`
            <div class="heading">Rooms</div>
            ${this._renderList("rooms","Add room",{name:""})}
          `;case"colorcondition":return this._renderColorConditions(n,s,t);default:if(e in ce){const[o,n]=e.split(".");return this._form([{name:o,type:"grid",schema:[X(n)]}],pe(t),e=>i(ue(e,t)),ce[e])}return u`<div class="heading">${e}</div>`}var r,a})}_form(e,t,i,o){const n=o??(1===e.length&&ce[e[0].name]?ce[e[0].name]:void 0);return u`
      ${n?u`<div class="heading">${n}</div>`:f}
      <ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${e}
        .computeLabel=${re}
        .computeHelper=${ae}
        @value-changed=${e=>{e.stopPropagation(),i(e.detail.value)}}
      ></ha-form>
    `}_missing(e){if(!e)return!1;const t=/^<(.*)>$/.exec(e);if(t)return!this._list("object_groups").some(e=>le(e)&&e.object_group===t[1]);const i=[...this._modelObjects,...this._listObjects];return v(e)?i.length>0&&0===y(e,i).length:i.length>0&&!i.includes(e)}_objectText(e){if(!e)return"no object";if(this._missing(e))return e+" (not in the model)";const t=Array.from(new Set([...this._modelObjects,...this._listObjects]));if(!v(e)||0===t.length)return e;const i=y(e,t).length;return e+" ("+i+" object"+(1===i?"":"s")+")"}_describe(e,t){if("entities"===e){const e=le(t)?t:{entity:t},i=K.find(([t])=>t===e.type3d),o=e.entity&&this.hass?.states[e.entity],n=o?o.attributes.friendly_name||e.entity:e.entity||"No entity",s=this._missing(e.object_id),r=[i?i[1]:"No type",this._objectText(e.object_id)];return e.entity&&!o&&r.unshift("Entity not found"),{icon:i?i[2]:"mdi:help-circle-outline",primary:n,secondary:r.join(" · "),warning:!o||!i||!e.object_id||s}}if("object_groups"===e){const e=(t.objects||[]).length;return{icon:"mdi:group",primary:t.object_group||"No name",secondary:`${e} object${1===e?"":"s"}`,warning:!t.object_group}}if("zoom_areas"===e){const e=t.object_id?"Around "+t.object_id:t.camera_position?"Camera position":"Not set";return{icon:"mdi:magnify-expand",primary:t.zoom||"No name",secondary:e,warning:!t.zoom}}const i=this._missing(t.object_id);return{icon:"mdi:floor-plan",primary:t.name||"No name",secondary:t.object_id?t.object_id+(i?" (not in the model)":""):"no object",warning:!t.object_id||i}}_renderList(e,t,i){const o=this._list(e);return u`
      <ha-sortable handle-selector=".handle" @item-moved=${t=>this._moveItem(e,t.detail.oldIndex,t.detail.newIndex)}>
        <div class="rows">
          ${B(o,e=>this._key(e),(t,i)=>{const o=this._describe(e,t);return u`
                <div
                  class="row"
                  @mouseenter=${()=>this._highlight(this._itemObjects(e,t))}
                  @mouseleave=${()=>this._highlight([])}
                >
                  <div class="handle"><ha-svg-icon .path=${x}></ha-svg-icon></div>
                  <ha-icon class="type" .icon=${o.icon}></ha-icon>
                  <div class="info" @click=${()=>this._edit(e,i)}>
                    <span class="primary">${o.primary}</span>
                    <span class="secondary ${o.warning?"warning":""}">${o.secondary}</span>
                  </div>
                  <ha-icon-button .label=${"Edit"} .path=${j} @click=${()=>this._edit(e,i)}></ha-icon-button>
                  <ha-icon-button .label=${"Remove"} .path=${$} @click=${()=>this._removeItem(e,i)}></ha-icon-button>
                </div>
              `})}
        </div>
      </ha-sortable>
      <ha-button class="add" @click=${()=>this._addItem(e,i)}>
        <ha-svg-icon slot="start" .path=${w}></ha-svg-icon>${t}
      </ha-button>
    `}_moveItem(e,t,i){const o=this._list(e).slice();o.splice(i,0,o.splice(t,1)[0]),this._setList(e,o)}_removeItem(e,t){const i=this._list(e).slice();i.splice(t,1),this._highlight([]),this._setList(e,i)}_addItem(e,t){const i=[...this._list(e),de(t)];this._setList(e,i),this._edit(e,i.length-1)}_edit(e,t){this._view={list:e,index:t}}_back(){this._picking&&this._startPick(this._picking),this._view={},this._highlight([])}_renderItemEditor(e,t){const i=this._list(e)[t],o=i=>this._setItem(e,t,i);let n;return n="entities"===e?this._renderEntity(t,le(i)?i:{entity:i},o):"object_groups"===e?this._renderGroup(t,i,o):"zoom_areas"===e?this._renderZoom(t,i,o):this._renderRoom(t,i,o),u`
      <div class="subheader">
        <ha-icon-button .label=${"Back"} .path=${k} @click=${()=>this._back()}></ha-icon-button>
        <span class="title">${{entities:"Entity",object_groups:"Object group",zoom_areas:"View",rooms:"Room"}[e]}</span>
        ${this._previewButtons()}
      </div>
      ${n}
    `}_objectRow(e,t,i,o){const n=this._picking&&JSON.stringify(this._picking.path)===JSON.stringify(e);return u`
      <div class="object-row">
        ${this._form(t,i,o)}
        <ha-icon-button
          class=${n?"picking":""}
          .label=${"Pick in the preview"}
          .path=${A}
          @click=${()=>this._startPick({path:e})}
        ></ha-icon-button>
      </div>
      ${n?u`<div class="hint">Tap an object in the preview</div>`:f}
    `}_renderEntity(e,t,i){const o=e=>{e.type3d!==t.type3d&&t.type3d&&void 0!==e[t.type3d]&&delete e[t.type3d],i(e)},n=this._objectOptions();return[this._form(te(),pe(t),e=>o(ue(e,t))),this._objectRow(["entities",e,"object_id"],[{...Y("object_id",n),helper:"An object, a <group>, or a name with * for all the objects it matches (Lamp_*)"}],t,e=>o(_e({...t,object_id:e.object_id}))),...t.type3d?[u`<div class="heading">${(K.find(([e])=>e===t.type3d)||[])[1]||""} options</div>`,...this._renderContent(ie(t.type3d,n),t,o,!1,"entities",e)]:[],u`
        <ha-expansion-panel outlined .header=${"Tap, long press and template"}>
          <div class="panel">
            ${this._form([V(Z("action",ee),Z("long_press_action",ee)),F("entity_template")],t,e=>o(_e({...e})))}
          </div>
        </ha-expansion-panel>
      `]}_renderColorConditions(e,t,i){const o=Array.isArray(i.colorcondition)?i.colorcondition:[],n=o=>this._setItem(e,t,{...i,colorcondition:o});return u`
      <div class="heading">Colour by state</div>
      <ha-sortable
        handle-selector=".handle"
        @item-moved=${e=>{const t=o.slice();t.splice(e.detail.newIndex,0,t.splice(e.detail.oldIndex,1)[0]),n(t)}}
      >
        <div class="rows">
          ${B(o,e=>this._key(e),(e,t)=>u`
              <div class="row condition">
                <div class="handle"><ha-svg-icon .path=${x}></ha-svg-icon></div>
                ${this._form([V(F("state"),F("color"))],e,e=>{const i=o.slice();i[t]=_e({...e}),n(i)})}
                <ha-icon-button
                  .label=${"Remove"}
                  .path=${$}
                  @click=${()=>n(o.filter((e,i)=>i!==t))}
                ></ha-icon-button>
              </div>
            `)}
        </div>
      </ha-sortable>
      <ha-button class="add" @click=${()=>n([...o,{state:"",color:""}])}>
        <ha-svg-icon slot="start" .path=${w}></ha-svg-icon>Add colour
      </ha-button>
    `}_renderGroup(e,t,i){const o=t.objects||[],n=e=>le(e)?e.object_id:e,s=["object_groups",e,"objects"],r=this._picking&&JSON.stringify(this._picking.path)===JSON.stringify(s),a=e=>i({...t,objects:e});return[this._form([F("object_group")],t,e=>i(_e({...e}))),u`
        <div class="heading">Objects</div>
        <ha-sortable
          handle-selector=".handle"
          @item-moved=${e=>{const t=o.slice();t.splice(e.detail.newIndex,0,t.splice(e.detail.oldIndex,1)[0]),a(t)}}
        >
          <div class="rows">
            ${B(o,e=>this._key(e),(e,t)=>u`
                <div class="row" @mouseenter=${()=>this._highlight([n(e)])} @mouseleave=${()=>this._highlightCurrent()}>
                  <div class="handle"><ha-svg-icon .path=${x}></ha-svg-icon></div>
                  <div class="info"><span class="primary">${n(e)||"No object"}</span></div>
                  <ha-icon-button
                    .label=${"Remove"}
                    .path=${$}
                    @click=${()=>a(o.filter((e,i)=>i!==t))}
                  ></ha-icon-button>
                </div>
              `)}
          </div>
        </ha-sortable>
        <div class="object-row">
          ${this._form([Y("add",this._objectOptions().filter(e=>!e.startsWith("<")))],{},e=>{e.add&&a([...o,{object_id:e.add}])},"")}
          <ha-icon-button
            class=${r?"picking":""}
            .label=${"Pick in the preview"}
            .path=${A}
            @click=${()=>this._startPick({path:s,add:!0})}
          ></ha-icon-button>
        </div>
        ${r?u`<div class="hint">Tap objects in the preview to add them, tap again to take them out</div>`:f}
      `]}_renderZoom(e,t,i){const o=e=>i(ue(e,t));return[this._form([V(F("zoom"),J("level",{step:1}))],t,o),u`
        <div class="heading-row">
          <div class="heading">Camera</div>
          <ha-button appearance="plain" size="s" @click=${()=>this._useCurrentView("zoom_areas",e)}>
            <ha-svg-icon slot="start" .path=${O}></ha-svg-icon>Use the current view
          </ha-button>
        </div>
      `,this._form([X("camera_position")],t,o),this._form([X("camera_target")],t,o),this._form([X("camera_rotate")],t,o),u`<div class="heading">Or around an object</div>
        <div class="hint">With an object, the camera looks at it from the direction and distance below.</div>`,this._objectRow(["zoom_areas",e,"object_id"],(n=this._objectOptions(),[V(Y("object_id",n),J("distance",{min:0,unit_of_measurement:"cm"}))]),t,o),this._form([X("direction")],t,o,"Direction"),this._form([X("rotation")],t,o,"Rotation")];var n}_renderRoom(e,t,i){const o=t.presence?Array.isArray(t.presence)?t.presence:[t.presence]:[];return[this._objectRow(["rooms",e,"object_id"],(n=this._objectOptions(),[V(F("name"),Y("object_id",n)),V(U("temperature","sensor"),U("illuminance","sensor")),U("presence",["binary_sensor","person","device_tracker"],!0)]),{...t,presence:o},e=>{const t=_e({...e});Array.isArray(t.presence)&&(0===t.presence.length?delete t.presence:1===t.presence.length&&(t.presence=t.presence[0])),i(t)})];var n}static get styles(){return L`
      :host {
        display: block;
      }
      .version {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
      }
      .loading {
        padding: 16px;
        color: var(--secondary-text-color);
      }
      ha-expansion-panel {
        display: block;
        margin-bottom: 8px;
        --expansion-panel-content-padding: 0;
        border-radius: 6px;
      }
      ha-expansion-panel ha-icon[slot='leading-icon'] {
        color: var(--secondary-text-color);
      }
      .panel {
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .heading {
        font-weight: 500;
        margin-top: 8px;
        color: var(--primary-text-color);
      }
      .heading-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
      }
      .heading-row .heading {
        margin-top: 0;
      }
      .hint {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .rows {
        display: flex;
        flex-direction: column;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 4px;
        border-bottom: 1px solid var(--divider-color);
        min-height: 52px;
      }
      .row.condition ha-form {
        flex: 1;
      }
      .row:hover {
        background: var(--secondary-background-color);
      }
      .handle {
        cursor: grab;
        padding: 0 8px;
        color: var(--secondary-text-color);
        display: flex;
      }
      .row ha-icon.type {
        color: var(--secondary-text-color);
        margin-right: 8px;
      }
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        overflow: hidden;
        padding: 6px 0;
      }
      .info span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .secondary {
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .secondary.warning {
        color: var(--warning-color);
      }
      .add {
        align-self: flex-start;
        margin-top: 8px;
      }
      .subheader {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 18px;
        margin-bottom: 8px;
      }
      .subheader .title {
        flex: 1;
      }
      .object-row {
        display: flex;
        align-items: flex-start;
        gap: 4px;
      }
      .object-row ha-form {
        flex: 1;
      }
      .object-row ha-icon-button {
        margin-top: 4px;
      }
      ha-icon-button.picking {
        color: var(--primary-color);
        background: rgba(var(--rgb-primary-color), 0.15);
        border-radius: 50%;
      }
    `}};i([o({attribute:!1})],ge.prototype,"hass",void 0),i([n()],ge.prototype,"_config",void 0),i([n()],ge.prototype,"_view",void 0),i([n()],ge.prototype,"_expanded",void 0),i([n()],ge.prototype,"_mode",void 0),i([n()],ge.prototype,"_modelObjects",void 0),i([n()],ge.prototype,"_listObjects",void 0),i([n()],ge.prototype,"_picking",void 0),i([n()],ge.prototype,"_paused",void 0),ge=i([s("floor3d-card-editor")],ge);export{ge as Floor3dCardEditor};
