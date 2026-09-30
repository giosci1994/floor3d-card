import{ag as e,ah as t,_ as i,n as o,r as n,t as s,i as r,P as a,a as c,ai as l,f as d,E as h,aj as m,y as _,C as p,af as u}from"./floor3d-card-core-Dq2efH2T.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const g=2;let f=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:b}=e,y=e=>e,v=()=>document.createComment(""),x=(e,t,i)=>{const o=e._$AA.parentNode,n=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=o.insertBefore(v(),n),s=o.insertBefore(v(),n);i=new b(t,s,e,e.options)}else{const t=i._$AB.nextSibling,s=i._$AM,r=s!==e;if(r){let t;i._$AQ?.(e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==s._$AU&&i._$AP(t)}if(t!==n||r){let e=i._$AA;for(;e!==t;){const t=y(e).nextSibling;y(o).insertBefore(e,n),e=t}}}return i},w=(e,t,i=e)=>(e._$AI(t,i),e),j={},$=(e,t=j)=>e._$AH=t,k=e=>{e._$AR(),e._$AA.remove()},L=(e,t,i)=>{const o=new Map;for(let n=t;n<=i;n++)o.set(e[n],n);return o},A=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends f{constructor(e){if(super(e),e.type!==g)throw Error("repeat() can only be used in text expressions")}dt(e,t,i){let o;void 0===i?i=t:void 0!==t&&(o=t);const n=[],s=[];let r=0;for(const t of e)n[r]=o?o(t,r):r,s[r]=i(t,r),r++;return{values:s,keys:n}}render(e,t,i){return this.dt(e,t,i).values}update(e,[i,o,n]){const s=e._$AH,{values:r,keys:a}=this.dt(i,o,n);if(!Array.isArray(s))return this.ut=a,r;const c=this.ut??=[],l=[];let d,h,m=0,_=s.length-1,p=0,u=r.length-1;for(;m<=_&&p<=u;)if(null===s[m])m++;else if(null===s[_])_--;else if(c[m]===a[p])l[p]=w(s[m],r[p]),m++,p++;else if(c[_]===a[u])l[u]=w(s[_],r[u]),_--,u--;else if(c[m]===a[u])l[u]=w(s[m],r[u]),x(e,l[u+1],s[m]),m++,u--;else if(c[_]===a[p])l[p]=w(s[_],r[p]),x(e,s[m],s[_]),_--,p++;else if(void 0===d&&(d=L(a,p,u),h=L(c,m,_)),d.has(c[m]))if(d.has(c[_])){const t=h.get(a[p]),i=void 0!==t?s[t]:null;if(null===i){const t=x(e,s[m]);w(t,r[p]),l[p]=t}else l[p]=w(i,r[p]),x(e,s[m],i),s[t]=null;p++}else k(s[_]),_--;else k(s[m]),m++;for(;p<=u;){const t=x(e,l[u+1]);w(t,r[p]),l[p++]=t}for(;m<=_;){const e=s[m++];null!==e&&k(e)}return this.ut=a,$(e,l),t}});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var C="M11.5,11L17.88,16.37L17,16.55L16.36,16.67C15.73,16.8 15.37,17.5 15.65,18.07L15.92,18.65L17.28,21.59L15.86,22.25L14.5,19.32L14.24,18.74C13.97,18.15 13.22,17.97 12.72,18.38L12.21,18.78L11.5,19.35V11M10.76,8.69A0.76,0.76 0 0,0 10,9.45V20.9C10,21.32 10.34,21.66 10.76,21.66C10.95,21.66 11.11,21.6 11.24,21.5L13.15,19.95L14.81,23.57C14.94,23.84 15.21,24 15.5,24C15.61,24 15.72,24 15.83,23.92L18.59,22.64C18.97,22.46 19.15,22 18.95,21.63L17.28,18L19.69,17.55C19.85,17.5 20,17.43 20.12,17.29C20.39,16.97 20.35,16.5 20,16.21L11.26,8.86L11.25,8.87C11.12,8.76 10.95,8.69 10.76,8.69M15,10V8H20V10H15M13.83,4.76L16.66,1.93L18.07,3.34L15.24,6.17L13.83,4.76M10,0H12V5H10V0M3.93,14.66L6.76,11.83L8.17,13.24L5.34,16.07L3.93,14.66M3.93,3.34L5.34,1.93L8.17,4.76L6.76,6.17L3.93,3.34M7,10H2V8H7V10",O="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",S="M21 11H3V9H21V11M21 13H3V15H21V13Z",M="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";const H=(e,t={})=>({name:e,selector:{text:t}}),P=(e,t={})=>({name:e,selector:{number:{mode:"box",step:"any",...t}}}),z=e=>({name:e,selector:{boolean:{}}}),E=(e,t)=>({name:e,selector:{select:{mode:"dropdown",options:t.map(([e,t])=>({value:e,label:t}))}}}),V=(e,t,i=!1)=>({name:e,selector:{entity:{...t?{filter:{domain:t}}:{},...i?{multiple:!0}:{}}}}),T=(...e)=>({type:"grid",name:"",flatten:!0,column_min_width:"140px",schema:e}),I=(e,t=["x","y","z"])=>({type:"grid",name:e,column_min_width:"70px",schema:t.map(e=>P(e))}),N=(e,t)=>({name:e,selector:{select:{mode:"dropdown",custom_value:!0,sort:!1,options:t}}}),D={header:"yes",click:"no",overlay:"no",lock_camera:"no",show_axes:"no",shadow:"no",extralightmode:"no",hideLevelsMenu:"no",hideZoomMenu:"no",editModeNotifications:"yes",selectionMode:"no",sun:"no",sun_shadow:"yes",log_depth:"no",reversed_depth:"yes",state_colors:"no"},R={image:{lighting_shadow:"yes"},room:{label:"no"},tracker:{label:"yes",flip_x:"no",flip_y:"no"}},Z={info:["position"],tracker:["sensor_position"]},F=[{key:"model",title:"3D model",icon:"mdi:cube-outline",content:()=>[[H("name"),z("header")],[H("path"),T(H("objfile"),H("mtlfile")),H("objectlist")],[T(H("backgroundColor"),H("style"))]]},{key:"view",title:"Camera and navigation",icon:"mdi:camera-outline",content:()=>["Initial view",[I("camera_position")],[I("camera_target")],[I("camera_rotate")],[T(z("lock_camera"),z("hideZoomMenu")),T(z("hideLevelsMenu"),P("initialLevel",{step:1}))],"North (orients the sun)",[I("north",["x","z"])]]},{key:"light",title:"Light and shadows",icon:"mdi:lightbulb-on-outline",content:e=>[[T(H("globalLightPower"),P("light_power",{min:0})),T(P("exposure",{min:0}),E("tone_mapping",[["neutral","Neutral"],["agx","AgX"],["aces","ACES Filmic"],["linear","Linear"]])),T(z("shadow"),z("extralightmode")),z("sun")],..."yes"===e.sun||!0===e.sun?[[T(V("sun_entity","sun"),P("sun_power",{min:0})),z("sun_shadow")],"sun_roof"]:[]]},{key:"interaction",title:"Interaction",icon:"mdi:gesture-tap",content:e=>[[T(z("click"),z("editModeNotifications")),T(z("selectionMode"),z("show_axes")),z("overlay")],..."yes"===e.overlay||!0===e.overlay?["Overlay",[T(H("overlay_bgcolor"),H("overlay_fgcolor")),T(E("overlay_alignment",[["top-left","Top left"],["top-right","Top right"],["bottom-left","Bottom left"],["bottom-right","Bottom right"]]),P("overlay_width",{min:0,max:100,unit_of_measurement:"%"}),P("overlay_height",{min:0,max:100,unit_of_measurement:"%"})),T(H("overlay_font"),H("overlay_fontsize"))]]:[]]},{key:"colours",title:"State colours and room maps",icon:"mdi:palette-outline",content:()=>[[z("state_colors"),T(H("open_color"),H("alarm_color")),V("alarm_entity","alarm_control_panel"),T(E("room_colors",[["none","None"],["temperature","Temperature"],["presence","Presence"]]),H("presence_color")),T(P("temperature_min"),P("temperature_max"))],"rooms"]},{key:"rendering",title:"Rendering",icon:"mdi:tune-variant",content:()=>[[T(P("max_pixel_ratio",{min:.5,max:4}),z("log_depth")),z("reversed_depth")]]}],B=[["light","Light","mdi:lightbulb-outline"],["hide","Hidden in a state","mdi:eye-off-outline"],["show","Shown in a state","mdi:eye-outline"],["color","Colour by state","mdi:palette-outline"],["text","Text","mdi:format-text"],["room","Room label and colour","mdi:floor-plan"],["door","Door or window","mdi:door-open"],["cover","Cover (roller shutter)","mdi:window-shutter"],["rotate","Rotating object (fan)","mdi:fan"],["gesture","Service on tap","mdi:gesture-tap"],["camera","Camera","mdi:cctv"],["image","Picture (TV screen)","mdi:television"],["info","Info box","mdi:information-outline"],["shower","Shower","mdi:shower-head"],["tracker","Person tracker","mdi:account-search-outline"]],J=[["more-info","Show the entity details"],["overlay","Show the state in the overlay"],["default","Default (toggle a light, run the service, open the camera)"]],U=()=>[V("entity"),{name:"type3d",selector:{select:{mode:"dropdown",options:B.map(([e,t])=>({value:e,label:t}))}}}],X=(e,t)=>{switch(e){case"light":return[[{name:"light",type:"grid",column_min_width:"140px",schema:[P("lumens",{min:0,max:2e4,step:50}),H("color"),P("decay",{min:0}),P("distance",{min:0,unit_of_measurement:"cm"}),E("shadow",[["yes","Yes"],["no","No"]]),E("vertical_alignment",[["top","Top"],["middle","Middle"],["bottom","Bottom"]])]}],"Spot (optional)",[{name:"light",type:"grid",column_min_width:"140px",schema:[N("light_target",t),P("angle",{min:0,max:180,unit_of_measurement:"°"})]}],"light.light_direction"];case"door":return[[{name:"door",type:"grid",column_min_width:"140px",schema:[E("doortype",[["swing","Swing"],["slide","Slide"]]),E("side",[["left","Left"],["right","Right"],["up","Up"],["down","Down"]]),E("direction",[["inner","Inner"],["outer","Outer"]]),P("degrees",{min:-180,max:180,unit_of_measurement:"°"}),P("percentage",{min:0,max:100,unit_of_measurement:"%"}),N("hinge",t),N("pane",t)]}]];case"cover":return[[{name:"cover",type:"grid",column_min_width:"140px",schema:[N("pane",t),E("side",[["up","Up"],["down","Down"]])]}]];case"rotate":return[[{name:"rotate",type:"grid",column_min_width:"140px",schema:[E("axis",[["x","X"],["y","Y"],["z","Z"]]),P("round_per_second",{min:0}),N("hinge",t)]}]];case"room":return[[{name:"room",type:"grid",column_min_width:"140px",schema:[H("color"),P("transparency",{min:0,max:100,unit_of_measurement:"%"}),P("elevation",{min:0,unit_of_measurement:"cm"}),z("label"),E("label_text",[["state","State"],["template","Template"]]),H("attribute"),P("width",{min:0}),P("height",{min:0})]}],"Label text",Y(),"colorcondition"];case"text":return[[{name:"text",type:"grid",column_min_width:"140px",schema:[H("attribute")]}],Y()];case"color":return["colorcondition"];case"hide":case"show":return[[{name:e,type:"grid",column_min_width:"140px",schema:[H("state")]}]];case"gesture":return[[{name:"gesture",type:"grid",column_min_width:"140px",schema:[H("domain"),H("service")]}]];case"image":return[[{name:"image",type:"grid",column_min_width:"140px",schema:[H("attribute"),P("rotate",{unit_of_measurement:"°"}),z("mirror"),P("lumens",{min:0})]}],"Room light from the picture",[{name:"image",type:"grid",column_min_width:"140px",schema:[P("lighting_lumens",{min:0}),E("lighting_direction",[["positive_z","+Z"],["negative_z","−Z"],["positive_x","+X"],["negative_x","−X"],["positive_y","+Y"],["negative_y","−Y"]]),P("lighting_distance",{min:0,unit_of_measurement:"cm"}),H("lighting_off_state"),z("lighting_shadow")]}]];case"info":return[[{name:"info",type:"grid",column_min_width:"140px",schema:[H("text"),H("textfgcolor"),H("textbgcolor"),H("font"),P("size",{min:0})]}],"info.position"];case"shower":return[[{name:"shower",type:"grid",column_min_width:"140px",schema:[P("velocity",{min:0}),P("count",{min:1,step:1}),H("color"),P("size",{min:0}),P("width",{min:0,unit_of_measurement:"cm"}),P("height",{min:0,unit_of_measurement:"cm"})]}]];case"tracker":return[[{name:"tracker",type:"grid",column_min_width:"140px",schema:[V("sensor_x","sensor"),V("sensor_y","sensor"),E("unit",[["mm","mm"],["cm","cm"],["m","m"]]),P("scale",{min:0}),z("flip_x"),z("flip_y"),V("zone"),z("label"),H("color"),P("size",{min:0}),P("height",{min:0,unit_of_measurement:"cm"}),P("sensor_rotation",{unit_of_measurement:"°"})]}],"tracker.sensor_position"];default:return[]}},Y=()=>[T(H("font"),P("span",{min:0,max:100,unit_of_measurement:"%"})),T(H("textfgcolor"),H("textbgcolor"))],W={name:"Name",header:"Show the header",path:"Folder of the model",objfile:"Model file (.obj or .glb)",mtlfile:"Materials file (.mtl)",objectlist:"Object list (JSON file)",backgroundColor:"Background colour",style:"Canvas style (CSS)",x:"X",y:"Y",z:"Z",lock_camera:"Lock the camera",hideZoomMenu:"Buttons instead of the Views menu",hideLevelsMenu:"Hide the levels menu",initialLevel:"Initial level",globalLightPower:"Light following the camera",light_power:"Lamp power",exposure:"Exposure",tone_mapping:"Tone mapping",shadow:"Shadows",extralightmode:"Extra light mode",sun:"Sunlight",sun_entity:"Sun entity",sun_power:"Sun power",sun_shadow:"Sun shadows",click:"Tap runs the action",editModeNotifications:"Object names on double click (dashboard in edit mode)",selectionMode:"Selection mode",show_axes:"Show the axes",overlay:"Overlay",overlay_bgcolor:"Background colour",overlay_fgcolor:"Text colour",overlay_alignment:"Position",overlay_width:"Width",overlay_height:"Height",overlay_font:"Font",overlay_fontsize:"Font size",state_colors:"Colour open doors and windows",open_color:"Colour when open",alarm_color:"Colour when the alarm is armed",alarm_entity:"Alarm",room_colors:"Initial room map",presence_color:"Presence colour",temperature_min:"Temperature for blue",temperature_max:"Temperature for red",max_pixel_ratio:"Maximum pixel ratio",log_depth:"Logarithmic depth buffer",reversed_depth:"Reversed depth buffer",entity:"Entity",type3d:"Type",object_id:"Object",action:"Tap action",long_press_action:"Long press action",entity_template:"Entity template",lumens:"Lumens",color:"Colour",decay:"Decay",distance:"Distance",vertical_alignment:"Vertical position",light_target:"Spot target object",angle:"Spot angle",doortype:"Door type",side:"Side",direction:"Direction",degrees:"Opening angle (swing)",percentage:"Opening (slide)",hinge:"Hinge object",pane:"Pane object",axis:"Axis",round_per_second:"Rounds per second",transparency:"Transparency",elevation:"Height of the room",label:"Label",label_text:"Label shows",attribute:"Attribute",width:"Width",height:"Height",font:"Font",span:"Width of the text",textfgcolor:"Text colour",textbgcolor:"Background colour",state:"State",domain:"Service domain",service:"Service",mirror:"Mirror",lighting_lumens:"Lumens",lighting_direction:"Direction",lighting_distance:"Distance",lighting_off_state:"Off in state",lighting_shadow:"Shadows",text:"Text or template",size:"Size",velocity:"Speed",count:"Drops",sensor_x:"X sensor",sensor_y:"Y sensor",unit:"Unit of the coordinates",scale:"Scale",flip_x:"Mirror X",flip_y:"Mirror Y",zone:"Zone entity",sensor_rotation:"Sensor rotation",object_group:"Group name",temperature:"Temperature sensor",presence:"Presence entities",zoom:"Name",level:"Level"},q={path:"For example /local/floor3d/",objectlist:"Optional: a JSON list of the object names, for the object menus",backgroundColor:"A colour, #rrggbb or transparent. Default #aaaaaa",globalLightPower:"From 0 to 1, or a numeric sensor. Default 0.2",light_power:"Multiplies all the lamps. Default 1",exposure:"Default 1",sun_power:"Default 1",extralightmode:"Only the lights that are on cast shadows",click:"Off: a double click runs it",selectionMode:"Taps color the objects and list them, to build groups",max_pixel_ratio:"Default 2",temperature_min:"Default 17",temperature_max:"Default 27",entity_template:"JavaScript between [[[ ]]], $entity is the state",lumens:"Default 800",decay:"Default 2",distance:"Default 600 cm",round_per_second:"2 or less",span:"Of the object, in %",lighting_off_state:"Default off, standby, unavailable, unknown",scale:"Default 0.001",text:"A text or a template"},G=e=>W[e.name]??e.name,Q=e=>q[e.name],K={camera_position:"Camera position",camera_target:"Camera target",camera_rotate:"Camera rotation","light.light_direction":"Spot direction","info.position":"Position (optional)","tracker.sensor_position":"Sensor position"},ee=e=>null!==e&&"object"==typeof e&&!Array.isArray(e),te=e=>JSON.parse(JSON.stringify(e??null));function ie(e,t){const i={...e};return Object.entries(t).forEach(([e,t])=>{const o=i[e]??t;i[e]=!0===o||"yes"===o}),i}function oe(e,t,i){const o={...e};return Object.entries(i).forEach(([e,i])=>{if("boolean"!=typeof o[e])return;const n=o[e]?"yes":"no";n===i&&void 0===(t||{})[e]?delete o[e]:o[e]=n}),o}function ne(e){return Object.keys(e).forEach(t=>{void 0!==e[t]&&""!==e[t]&&null!==e[t]||delete e[t]}),e}function se(e){const t={...e};return Object.entries(R).forEach(([e,i])=>{(ee(t[e])||t.type3d===e)&&(t[e]=ie(t[e]||{},i))}),Object.entries(Z).forEach(([e,i])=>{ee(t[e])&&(t[e]={...t[e]},i.forEach(i=>{const o=t[e][i];Array.isArray(o)&&(t[e][i]={x:o[0],y:o[1],z:o[2]})}))}),t}function re(e,t){const i=ne({...e});return Object.entries(R).forEach(([e,o])=>{ee(i[e])&&(i[e]=oe(i[e],(t||{})[e],o))}),Object.entries(Z).forEach(([e,t])=>{ee(i[e])&&t.forEach(t=>{const o=i[e][t];if(!ee(o))return;const n=[o.x,o.y,o.z];n.every(e=>"number"==typeof e&&isFinite(e))?i[e][t]=n:n.every(e=>null==e)&&delete i[e][t]})}),Object.keys(i).forEach(e=>{ee(i[e])&&ne(i[e])}),i}let ae=class extends r{constructor(){super(...arguments),this._view={},this._expanded=[],this._mode="loading",this._modelObjects=[],this._listObjects=[],this._keys=new WeakMap,this._previewListener=e=>this._onPreview(e.detail)}connectedCallback(){super.connectedCallback(),window.addEventListener(a,this._previewListener),this._toPreview({request:"objects"}),"loading"===this._mode&&async function(){if(customElements.get("ha-form")&&customElements.get("ha-expansion-panel"))return!0;try{const e=await window.loadCardHelpers();for(const t of[{type:"entities",entities:[]},{type:"tile",entity:"sun.sun"}]){const i=await e.createCardElement(t);await(i.constructor.getConfigElement?.())}}catch(e){}return await Promise.race([customElements.whenDefined("ha-form").then(()=>!0),new Promise(e=>setTimeout(()=>e(!1),5e3))])&&!!customElements.get("ha-expansion-panel")}().then(e=>{this._mode=e?"ready":"classic",e||this._showClassic()})}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(a,this._previewListener),this._toPreview({pick:!1,highlight:[]})}setConfig(e){const t=JSON.stringify(e),i=this._internal&&t===this._held;this._held=t;const o=c(i?this._internal:e);Array.isArray(o.entities)||(o.entities=[]),this._config||(this._expanded=o.entities.length?["entities"]:["model"]),this._config=o,this._classic&&this._classic.setConfig(e),this._loadObjectList()}_update(e){this._config=e,this._internal=c(e);const t=l(e),i=JSON.stringify(t);i!==this._held&&(this._held=i,d(this,"config-changed",{config:t}))}_setTop(e){this._update(ne(oe(e,this._config,D)))}_list(e){return Array.isArray(this._config[e])?this._config[e]:[]}_setList(e,t){this._update({...this._config,[e]:t})}_setItem(e,t,i){const o=this._list(e).slice();o[t]=i,this._setList(e,o)}_key(e){return ee(e)?(this._keys.has(e)||this._keys.set(e,Math.random().toString(36).slice(2)),this._keys.get(e)):String(e)}_toPreview(e){window.dispatchEvent(new CustomEvent(h,{detail:e}))}_onPreview(e){if(e&&(e.objects&&(this._modelObjects=e.objects,this._picking&&this._toPreview({pick:!0}),this._highlightCurrent()),e.picked&&this._picking&&this._onPicked(e.picked),e.camera&&this._cameraTarget)){const t=this._cameraTarget;this._cameraTarget=void 0,this._applyCamera(t,e.camera)}}_useCurrentView(e,t){this._cameraTarget={list:e,index:t},this._toPreview({request:"camera"})}_applyCamera(e,t){const i=e=>({x:+e.x.toFixed(2),y:+e.y.toFixed(2),z:+e.z.toFixed(2)}),o={camera_position:i(t.camera_position),camera_target:i(t.camera_target),camera_rotate:{x:+t.camera_rotate.x.toFixed(4),y:+t.camera_rotate.y.toFixed(4),z:+t.camera_rotate.z.toFixed(4)}};if(e.list){const t={...this._list(e.list)[e.index],...o};this._setItem(e.list,e.index,t)}else this._update({...this._config,...o})}_startPick(e){const t=this._picking&&JSON.stringify(this._picking)===JSON.stringify(e);this._picking=t?void 0:e,this._toPreview({pick:!t})}_onPicked(e){const t=this._picking;if(t.add){const[i,o]=t.path,n={...this._list(i)[o]},s=(n.objects||[]).slice(),r=s.findIndex(t=>(ee(t)?t.object_id:t)===e);r>=0?s.splice(r,1):s.push({object_id:e}),this._setItem(i,o,{...n,objects:s})}else this._picking=void 0,this._toPreview({pick:!1}),this._setPath(t.path,e)}_setPath(e,t){const i=te(this._config);let o=i;e.slice(0,-1).forEach(e=>{void 0===o[e]&&(o[e]={}),o=o[e]}),o[e[e.length-1]]=t,this._update(i)}_highlight(e){this._toPreview({highlight:e.filter(e=>"string"==typeof e&&""!==e)})}_highlightCurrent(){const{list:e,index:t}=this._view;this._highlight(e&&void 0!==t?this._itemObjects(e,this._list(e)[t]):[])}_itemObjects(e,t){return ee(t)?"object_groups"===e?(t.objects||[]).map(e=>ee(e)?e.object_id:e):[t.object_id]:[]}_objectOptions(){const e=this._list("object_groups").filter(e=>ee(e)&&e.object_group).map(e=>"<"+e.object_group+">"),t=Array.from(new Set([...this._modelObjects,...this._listObjects])).sort((e,t)=>e.toLowerCase().localeCompare(t.toLowerCase()));return[...e,...t]}_loadObjectList(){const{path:e,objectlist:t}=this._config||{},i=t&&e?e.replace(/\/?$/,"/")+t:void 0;i!==this._objectlist&&(this._objectlist=i,this._listObjects=[],i&&fetch(i).then(e=>e.ok?e.json():{}).then(e=>{this._objectlist===i&&(this._listObjects=Object.keys(e||{}))}).catch(()=>{}))}async _showClassic(){await(import("./floor3d-card-editor-classic-Ce5HGHpO.js"));const e=document.createElement("floor3d-card-editor-classic");e.hass=this.hass,this._config&&e.setConfig(this._config),this._classic=e,this.requestUpdate()}updated(e){e.has("hass")&&this._classic&&(this._classic.hass=this.hass),e.has("_view")&&this._highlightCurrent()}render(){if(!this.hass||!this._config)return m;if("classic"===this._mode)return _`${this._classic||m}`;if("loading"===this._mode)return _`<div class="loading">Loading…</div>`;const{list:e,index:t}=this._view;return e&&void 0!==t&&void 0!==this._list(e)[t]?this._renderItemEditor(e,t):_`
      <div class="version">
        floor3d-card ${p}
        <ha-icon-button .label=${"Reload the preview"} .path=${"M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"} @click=${()=>this._toPreview({request:"reload"})}></ha-icon-button>
      </div>
      ${F.map(e=>this._renderPanel(e.key,e.title,e.icon,()=>this._renderContent(e.content(this._config),this._config,e=>this._setTop(e),!0)))}
      ${this._renderPanel("entities",`Entities (${this._list("entities").length})`,"mdi:format-list-bulleted",()=>this._renderList("entities","Add entity",{entity:""}))}
      ${this._renderPanel("object_groups",`Object groups (${this._list("object_groups").length})`,"mdi:group",()=>this._renderList("object_groups","Add group",{object_group:"",objects:[]}))}
      ${this._renderPanel("zoom_areas",`Views (${this._list("zoom_areas").length})`,"mdi:magnify-expand",()=>this._renderList("zoom_areas","Add view",{zoom:""}))}
    `}_renderPanel(e,t,i,o){const n=this._expanded.includes(e);return _`
      <ha-expansion-panel
        outlined
        .header=${t}
        .expanded=${n}
        @expanded-changed=${t=>{const i=t.detail.expanded;i!==this._expanded.includes(e)&&(this._expanded=i?[...this._expanded,e]:this._expanded.filter(t=>t!==e))}}
      >
        <ha-icon slot="leading-icon" .icon=${i}></ha-icon>
        <div class="panel">${n?o():m}</div>
      </ha-expansion-panel>
    `}_renderContent(e,t,i,o=!1,n,s){return e.map(e=>{if("string"!=typeof e)return this._form(e,o?ie(t,D):se(t),e=>i(o?e:re(e,t)));switch(e){case"sun_roof":return this._form([(r="sun_roof",a=this._objectOptions(),{name:r,selector:{select:{mode:"dropdown",custom_value:!0,multiple:!0,options:a}}})],{sun_roof:Array.isArray(t.sun_roof)?t.sun_roof:[]},e=>i({...ie(t,D),sun_roof:e.sun_roof?.length?e.sun_roof:void 0}),"Indoor floors: roof for the sun");case"rooms":return _`
            <div class="heading">Rooms</div>
            ${this._renderList("rooms","Add room",{name:""})}
          `;case"colorcondition":return this._renderColorConditions(n,s,t);default:if(e in K){const[o,n]=e.split(".");return this._form([{name:o,type:"grid",schema:[I(n)]}],se(t),e=>i(re(e,t)),K[e])}return _`<div class="heading">${e}</div>`}var r,a})}_form(e,t,i,o){const n=o??(1===e.length&&K[e[0].name]?K[e[0].name]:void 0);return _`
      ${n?_`<div class="heading">${n}</div>`:m}
      <ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${e}
        .computeLabel=${G}
        .computeHelper=${Q}
        @value-changed=${e=>{e.stopPropagation(),i(e.detail.value)}}
      ></ha-form>
    `}_missing(e){if(!e)return!1;const t=/^<(.*)>$/.exec(e);if(t)return!this._list("object_groups").some(e=>ee(e)&&e.object_group===t[1]);const i=[...this._modelObjects,...this._listObjects];return i.length>0&&!i.includes(e)}_describe(e,t){if("entities"===e){const e=ee(t)?t:{entity:t},i=B.find(([t])=>t===e.type3d),o=e.entity&&this.hass?.states[e.entity],n=o?o.attributes.friendly_name||e.entity:e.entity||"No entity",s=this._missing(e.object_id),r=[i?i[1]:"No type",e.object_id?e.object_id+(s?" (not in the model)":""):"no object"];return e.entity&&!o&&r.unshift("Entity not found"),{icon:i?i[2]:"mdi:help-circle-outline",primary:n,secondary:r.join(" · "),warning:!o||!i||!e.object_id||s}}if("object_groups"===e){const e=(t.objects||[]).length;return{icon:"mdi:group",primary:t.object_group||"No name",secondary:`${e} object${1===e?"":"s"}`,warning:!t.object_group}}if("zoom_areas"===e){const e=t.object_id?"Around "+t.object_id:t.camera_position?"Camera position":"Not set";return{icon:"mdi:magnify-expand",primary:t.zoom||"No name",secondary:e,warning:!t.zoom}}const i=this._missing(t.object_id);return{icon:"mdi:floor-plan",primary:t.name||"No name",secondary:t.object_id?t.object_id+(i?" (not in the model)":""):"no object",warning:!t.object_id||i}}_renderList(e,t,i){const o=this._list(e);return _`
      <ha-sortable handle-selector=".handle" @item-moved=${t=>this._moveItem(e,t.detail.oldIndex,t.detail.newIndex)}>
        <div class="rows">
          ${A(o,e=>this._key(e),(t,i)=>{const o=this._describe(e,t);return _`
                <div
                  class="row"
                  @mouseenter=${()=>this._highlight(this._itemObjects(e,t))}
                  @mouseleave=${()=>this._highlight([])}
                >
                  <div class="handle"><ha-svg-icon .path=${S}></ha-svg-icon></div>
                  <ha-icon class="type" .icon=${o.icon}></ha-icon>
                  <div class="info" @click=${()=>this._edit(e,i)}>
                    <span class="primary">${o.primary}</span>
                    <span class="secondary ${o.warning?"warning":""}">${o.secondary}</span>
                  </div>
                  <ha-icon-button .label=${"Edit"} .path=${"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"} @click=${()=>this._edit(e,i)}></ha-icon-button>
                  <ha-icon-button .label=${"Remove"} .path=${O} @click=${()=>this._removeItem(e,i)}></ha-icon-button>
                </div>
              `})}
        </div>
      </ha-sortable>
      <ha-button class="add" @click=${()=>this._addItem(e,i)}>
        <ha-svg-icon slot="start" .path=${M}></ha-svg-icon>${t}
      </ha-button>
    `}_moveItem(e,t,i){const o=this._list(e).slice();o.splice(i,0,o.splice(t,1)[0]),this._setList(e,o)}_removeItem(e,t){const i=this._list(e).slice();i.splice(t,1),this._highlight([]),this._setList(e,i)}_addItem(e,t){const i=[...this._list(e),te(t)];this._setList(e,i),this._edit(e,i.length-1)}_edit(e,t){this._view={list:e,index:t}}_back(){this._picking&&this._startPick(this._picking),this._view={},this._highlight([])}_renderItemEditor(e,t){const i=this._list(e)[t],o=i=>this._setItem(e,t,i);let n;return n="entities"===e?this._renderEntity(t,ee(i)?i:{entity:i},o):"object_groups"===e?this._renderGroup(t,i,o):"zoom_areas"===e?this._renderZoom(t,i,o):this._renderRoom(t,i,o),_`
      <div class="subheader">
        <ha-icon-button .label=${"Back"} .path=${"M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"} @click=${()=>this._back()}></ha-icon-button>
        <span>${{entities:"Entity",object_groups:"Object group",zoom_areas:"View",rooms:"Room"}[e]}</span>
      </div>
      ${n}
    `}_objectRow(e,t,i,o){const n=this._picking&&JSON.stringify(this._picking.path)===JSON.stringify(e);return _`
      <div class="object-row">
        ${this._form(t,i,o)}
        <ha-icon-button
          class=${n?"picking":""}
          .label=${"Pick in the preview"}
          .path=${C}
          @click=${()=>this._startPick({path:e})}
        ></ha-icon-button>
      </div>
      ${n?_`<div class="hint">Tap an object in the preview</div>`:m}
    `}_renderEntity(e,t,i){const o=e=>{e.type3d!==t.type3d&&t.type3d&&void 0!==e[t.type3d]&&delete e[t.type3d],i(e)},n=this._objectOptions();return[this._form(U(),se(t),e=>o(re(e,t))),this._objectRow(["entities",e,"object_id"],[N("object_id",n)],t,e=>o(ne({...t,object_id:e.object_id}))),...t.type3d?[_`<div class="heading">${(B.find(([e])=>e===t.type3d)||[])[1]||""} options</div>`,...this._renderContent(X(t.type3d,n),t,o,!1,"entities",e)]:[],_`
        <ha-expansion-panel outlined .header=${"Tap, long press and template"}>
          <div class="panel">
            ${this._form([T(E("action",J),E("long_press_action",J)),H("entity_template")],t,e=>o(ne({...e})))}
          </div>
        </ha-expansion-panel>
      `]}_renderColorConditions(e,t,i){const o=Array.isArray(i.colorcondition)?i.colorcondition:[],n=o=>this._setItem(e,t,{...i,colorcondition:o});return _`
      <div class="heading">Colour by state</div>
      <ha-sortable
        handle-selector=".handle"
        @item-moved=${e=>{const t=o.slice();t.splice(e.detail.newIndex,0,t.splice(e.detail.oldIndex,1)[0]),n(t)}}
      >
        <div class="rows">
          ${A(o,e=>this._key(e),(e,t)=>_`
              <div class="row condition">
                <div class="handle"><ha-svg-icon .path=${S}></ha-svg-icon></div>
                ${this._form([T(H("state"),H("color"))],e,e=>{const i=o.slice();i[t]=ne({...e}),n(i)})}
                <ha-icon-button
                  .label=${"Remove"}
                  .path=${O}
                  @click=${()=>n(o.filter((e,i)=>i!==t))}
                ></ha-icon-button>
              </div>
            `)}
        </div>
      </ha-sortable>
      <ha-button class="add" @click=${()=>n([...o,{state:"",color:""}])}>
        <ha-svg-icon slot="start" .path=${M}></ha-svg-icon>Add colour
      </ha-button>
    `}_renderGroup(e,t,i){const o=t.objects||[],n=e=>ee(e)?e.object_id:e,s=["object_groups",e,"objects"],r=this._picking&&JSON.stringify(this._picking.path)===JSON.stringify(s),a=e=>i({...t,objects:e});return[this._form([H("object_group")],t,e=>i(ne({...e}))),_`
        <div class="heading">Objects</div>
        <ha-sortable
          handle-selector=".handle"
          @item-moved=${e=>{const t=o.slice();t.splice(e.detail.newIndex,0,t.splice(e.detail.oldIndex,1)[0]),a(t)}}
        >
          <div class="rows">
            ${A(o,e=>this._key(e),(e,t)=>_`
                <div class="row" @mouseenter=${()=>this._highlight([n(e)])} @mouseleave=${()=>this._highlightCurrent()}>
                  <div class="handle"><ha-svg-icon .path=${S}></ha-svg-icon></div>
                  <div class="info"><span class="primary">${n(e)||"No object"}</span></div>
                  <ha-icon-button
                    .label=${"Remove"}
                    .path=${O}
                    @click=${()=>a(o.filter((e,i)=>i!==t))}
                  ></ha-icon-button>
                </div>
              `)}
          </div>
        </ha-sortable>
        <div class="object-row">
          ${this._form([N("add",this._objectOptions().filter(e=>!e.startsWith("<")))],{},e=>{e.add&&a([...o,{object_id:e.add}])},"")}
          <ha-icon-button
            class=${r?"picking":""}
            .label=${"Pick in the preview"}
            .path=${C}
            @click=${()=>this._startPick({path:s,add:!0})}
          ></ha-icon-button>
        </div>
        ${r?_`<div class="hint">Tap objects in the preview to add them, tap again to take them out</div>`:m}
      `]}_renderZoom(e,t,i){const o=e=>i(re(e,t));return[this._form([T(H("zoom"),P("level",{step:1}))],t,o),_`
        <div class="heading-row">
          <div class="heading">Camera</div>
          <ha-button appearance="plain" size="s" @click=${()=>this._useCurrentView("zoom_areas",e)}>
            <ha-svg-icon slot="start" .path=${"M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z"}></ha-svg-icon>Use the current view
          </ha-button>
        </div>
      `,this._form([I("camera_position")],t,o),this._form([I("camera_target")],t,o),this._form([I("camera_rotate")],t,o),_`<div class="heading">Or around an object</div>
        <div class="hint">With an object, the camera looks at it from the direction and distance below.</div>`,this._objectRow(["zoom_areas",e,"object_id"],(n=this._objectOptions(),[T(N("object_id",n),P("distance",{min:0,unit_of_measurement:"cm"}))]),t,o),this._form([I("direction")],t,o,"Direction"),this._form([I("rotation")],t,o,"Rotation")];var n}_renderRoom(e,t,i){const o=t.presence?Array.isArray(t.presence)?t.presence:[t.presence]:[];return[this._objectRow(["rooms",e,"object_id"],(n=this._objectOptions(),[T(H("name"),N("object_id",n)),T(V("temperature","sensor"),V("presence",["binary_sensor","person","device_tracker"],!0))]),{...t,presence:o},e=>{const t=ne({...e});Array.isArray(t.presence)&&(0===t.presence.length?delete t.presence:1===t.presence.length&&(t.presence=t.presence[0])),i(t)})];var n}static get styles(){return u`
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
    `}};i([o({attribute:!1})],ae.prototype,"hass",void 0),i([n()],ae.prototype,"_config",void 0),i([n()],ae.prototype,"_view",void 0),i([n()],ae.prototype,"_expanded",void 0),i([n()],ae.prototype,"_mode",void 0),i([n()],ae.prototype,"_modelObjects",void 0),i([n()],ae.prototype,"_listObjects",void 0),i([n()],ae.prototype,"_picking",void 0),ae=i([s("floor3d-card-editor")],ae);export{ae as Floor3dCardEditor};
