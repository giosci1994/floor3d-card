import{am as e,an as t,_ as i,n as o,r as n,t as s,i as r,P as a,a as c,ao as l,f as d,E as h,ap as m,H as _,C as p,o as u,m as g,aj as f}from"./floor3d-card-core-D1VuBadV.js";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=2;let y=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:v}=e,w=e=>e,x=()=>document.createComment(""),j=(e,t,i)=>{const o=e._$AA.parentNode,n=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=o.insertBefore(x(),n),s=o.insertBefore(x(),n);i=new v(t,s,e,e.options)}else{const t=i._$AB.nextSibling,s=i._$AM,r=s!==e;if(r){let t;i._$AQ?.(e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==s._$AU&&i._$AP(t)}if(t!==n||r){let e=i._$AA;for(;e!==t;){const t=w(e).nextSibling;w(o).insertBefore(e,n),e=t}}}return i},$=(e,t,i=e)=>(e._$AI(t,i),e),k={},L=(e,t=k)=>e._$AH=t,A=e=>{e._$AR(),e._$AA.remove()},C=(e,t,i)=>{const o=new Map;for(let n=t;n<=i;n++)o.set(e[n],n);return o},O=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends y{constructor(e){if(super(e),e.type!==b)throw Error("repeat() can only be used in text expressions")}dt(e,t,i){let o;void 0===i?i=t:void 0!==t&&(o=t);const n=[],s=[];let r=0;for(const t of e)n[r]=o?o(t,r):r,s[r]=i(t,r),r++;return{values:s,keys:n}}render(e,t,i){return this.dt(e,t,i).values}update(e,[i,o,n]){const s=e._$AH,{values:r,keys:a}=this.dt(i,o,n);if(!Array.isArray(s))return this.ut=a,r;const c=this.ut??=[],l=[];let d,h,m=0,_=s.length-1,p=0,u=r.length-1;for(;m<=_&&p<=u;)if(null===s[m])m++;else if(null===s[_])_--;else if(c[m]===a[p])l[p]=$(s[m],r[p]),m++,p++;else if(c[_]===a[u])l[u]=$(s[_],r[u]),_--,u--;else if(c[m]===a[u])l[u]=$(s[m],r[u]),j(e,l[u+1],s[m]),m++,u--;else if(c[_]===a[p])l[p]=$(s[_],r[p]),j(e,s[m],s[_]),_--,p++;else if(void 0===d&&(d=C(a,p,u),h=C(c,m,_)),d.has(c[m]))if(d.has(c[_])){const t=h.get(a[p]),i=void 0!==t?s[t]:null;if(null===i){const t=j(e,s[m]);$(t,r[p]),l[p]=t}else l[p]=$(i,r[p]),j(e,s[m],i),s[t]=null;p++}else A(s[_]),_--;else A(s[m]),m++;for(;p<=u;){const t=j(e,l[u+1]);$(t,r[p]),l[p++]=t}for(;m<=_;){const e=s[m++];null!==e&&A(e)}return this.ut=a,L(e,l),t}});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var S="M11.5,11L17.88,16.37L17,16.55L16.36,16.67C15.73,16.8 15.37,17.5 15.65,18.07L15.92,18.65L17.28,21.59L15.86,22.25L14.5,19.32L14.24,18.74C13.97,18.15 13.22,17.97 12.72,18.38L12.21,18.78L11.5,19.35V11M10.76,8.69A0.76,0.76 0 0,0 10,9.45V20.9C10,21.32 10.34,21.66 10.76,21.66C10.95,21.66 11.11,21.6 11.24,21.5L13.15,19.95L14.81,23.57C14.94,23.84 15.21,24 15.5,24C15.61,24 15.72,24 15.83,23.92L18.59,22.64C18.97,22.46 19.15,22 18.95,21.63L17.28,18L19.69,17.55C19.85,17.5 20,17.43 20.12,17.29C20.39,16.97 20.35,16.5 20,16.21L11.26,8.86L11.25,8.87C11.12,8.76 10.95,8.69 10.76,8.69M15,10V8H20V10H15M13.83,4.76L16.66,1.93L18.07,3.34L15.24,6.17L13.83,4.76M10,0H12V5H10V0M3.93,14.66L6.76,11.83L8.17,13.24L5.34,16.07L3.93,14.66M3.93,3.34L5.34,1.93L8.17,4.76L6.76,6.17L3.93,3.34M7,10H2V8H7V10",M="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",H="M21 11H3V9H21V11M21 13H3V15H21V13Z",P="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";const z=(e,t={})=>({name:e,selector:{text:t}}),E=(e,t={})=>({name:e,selector:{number:{mode:"box",step:"any",...t}}}),V=e=>({name:e,selector:{boolean:{}}}),D=(e,t)=>({name:e,selector:{select:{mode:"dropdown",options:t.map(([e,t])=>({value:e,label:t}))}}}),T=(e,t,i=!1)=>({name:e,selector:{entity:{...t?{filter:{domain:t}}:{},...i?{multiple:!0}:{}}}}),N=(...e)=>({type:"grid",name:"",flatten:!0,column_min_width:"140px",schema:e}),I=(e,t=["x","y","z"])=>({type:"grid",name:e,column_min_width:"70px",schema:t.map(e=>E(e))}),R=(e,t)=>({name:e,selector:{select:{mode:"dropdown",custom_value:!0,sort:!1,options:t}}}),Z={header:"yes",click:"no",overlay:"no",lock_camera:"no",show_axes:"no",shadow:"no",extralightmode:"no",hideLevelsMenu:"no",hideZoomMenu:"no",editModeNotifications:"yes",selectionMode:"no",sun:"no",sun_shadow:"yes",log_depth:"no",reversed_depth:"yes",state_colors:"no"},F={image:{lighting_shadow:"yes"},room:{label:"no"},tracker:{label:"yes",flip_x:"no",flip_y:"no"}},B={info:["position"],tracker:["sensor_position"]},J=[{key:"model",title:"3D model",icon:"mdi:cube-outline",content:()=>[[z("name"),V("header")],[z("path"),N(z("objfile"),z("mtlfile")),z("objectlist")],[N(z("backgroundColor"),z("style"))]]},{key:"view",title:"Camera and navigation",icon:"mdi:camera-outline",content:()=>["Initial view",[I("camera_position")],[I("camera_target")],[I("camera_rotate")],[N(V("lock_camera"),V("hideZoomMenu")),N(V("hideLevelsMenu"),E("initialLevel",{step:1}))],[{name:"url_parameters",type:"grid",column_min_width:"140px",schema:[{...z("zoom"),label:"View from the page address",helper:"A parameter name, e.g. area: ?area=kitchen shows the view kitchen"}]}],"North (orients the sun)",[I("north",["x","z"])]]},{key:"light",title:"Light and shadows",icon:"mdi:lightbulb-on-outline",content:e=>[[N(z("globalLightPower"),E("light_power",{min:0})),N(E("exposure",{min:0}),D("tone_mapping",[["neutral","Neutral"],["agx","AgX"],["aces","ACES Filmic"],["linear","Linear"]])),N(V("shadow"),V("extralightmode")),V("sun")],..."yes"===e.sun||!0===e.sun?[[N(T("sun_entity","sun"),E("sun_power",{min:0})),V("sun_shadow")],"sun_roof"]:[]]},{key:"interaction",title:"Interaction",icon:"mdi:gesture-tap",content:e=>[[N(V("click"),V("editModeNotifications")),N(V("selectionMode"),V("show_axes")),V("overlay")],..."yes"===e.overlay||!0===e.overlay?["Overlay",[N(z("overlay_bgcolor"),z("overlay_fgcolor")),N(D("overlay_alignment",[["top-left","Top left"],["top-right","Top right"],["bottom-left","Bottom left"],["bottom-right","Bottom right"]]),E("overlay_width",{min:0,max:100,unit_of_measurement:"%"}),E("overlay_height",{min:0,max:100,unit_of_measurement:"%"})),N(z("overlay_font"),z("overlay_fontsize"))]]:[]]},{key:"colours",title:"State colours and room maps",icon:"mdi:palette-outline",content:()=>[[V("state_colors"),N(z("open_color"),z("alarm_color")),T("alarm_entity","alarm_control_panel"),N(D("room_colors",[["none","None"],["temperature","Temperature"],["presence","Presence"]]),z("presence_color")),N(E("temperature_min"),E("temperature_max"))],"rooms"]},{key:"rendering",title:"Rendering",icon:"mdi:tune-variant",content:()=>[[N(E("max_pixel_ratio",{min:.5,max:4}),V("log_depth")),V("reversed_depth"),z("draco_decoder_path")]]}],U=[["light","Light","mdi:lightbulb-outline"],["hide","Hidden in a state","mdi:eye-off-outline"],["show","Shown in a state","mdi:eye-outline"],["color","Colour by state","mdi:palette-outline"],["text","Text","mdi:format-text"],["room","Room label and colour","mdi:floor-plan"],["door","Door or window","mdi:door-open"],["cover","Cover (roller shutter)","mdi:window-shutter"],["rotate","Rotating object (fan)","mdi:fan"],["gesture","Service on tap","mdi:gesture-tap"],["camera","Camera","mdi:cctv"],["image","Picture (TV screen)","mdi:television"],["info","Info box","mdi:information-outline"],["shower","Shower","mdi:shower-head"],["tracker","Person tracker","mdi:account-search-outline"]],X=[["more-info","Show the entity details"],["overlay","Show the state in the overlay"],["default","Default (toggle a light, run the service, open the camera)"]],Y=()=>[T("entity"),{name:"type3d",selector:{select:{mode:"dropdown",options:U.map(([e,t])=>({value:e,label:t}))}}}],W=(e,t)=>{switch(e){case"light":return[[{name:"light",type:"grid",column_min_width:"140px",schema:[E("lumens",{min:0,max:2e4,step:50}),z("color"),E("decay",{min:0}),E("distance",{min:0,unit_of_measurement:"cm"}),D("shadow",[["yes","Yes"],["no","No"]]),D("vertical_alignment",[["top","Top"],["middle","Middle"],["bottom","Bottom"]])]}],"Spot (optional)",[{name:"light",type:"grid",column_min_width:"140px",schema:[R("light_target",t),E("angle",{min:0,max:180,unit_of_measurement:"°"})]}],"light.light_direction"];case"door":return[[{name:"door",type:"grid",column_min_width:"140px",schema:[D("doortype",[["swing","Swing"],["slide","Slide"]]),D("side",[["left","Left"],["right","Right"],["up","Up"],["down","Down"]]),D("direction",[["inner","Inner"],["outer","Outer"]]),E("degrees",{min:-180,max:180,unit_of_measurement:"°"}),E("percentage",{min:0,max:100,unit_of_measurement:"%"}),R("hinge",t),R("pane",t)]}]];case"cover":return[[{name:"cover",type:"grid",column_min_width:"140px",schema:[R("pane",t),D("side",[["up","Up"],["down","Down"]])]}]];case"rotate":return[[{name:"rotate",type:"grid",column_min_width:"140px",schema:[D("axis",[["x","X"],["y","Y"],["z","Z"]]),E("round_per_second",{min:0}),E("ramp",{min:0,unit_of_measurement:"s"}),R("hinge",t)]}]];case"room":return[[{name:"room",type:"grid",column_min_width:"140px",schema:[z("color"),E("transparency",{min:0,max:100,unit_of_measurement:"%"}),E("elevation",{min:0,unit_of_measurement:"cm"}),V("label"),D("label_text",[["state","State"],["template","Template"]]),z("attribute"),E("width",{min:0}),E("height",{min:0})]}],"Label text",q(),"colorcondition"];case"text":return[[{name:"text",type:"grid",column_min_width:"140px",schema:[z("attribute")]}],q()];case"color":return["colorcondition"];case"hide":case"show":return[[{name:e,type:"grid",column_min_width:"140px",schema:[z("state")]}]];case"gesture":return[[{name:"gesture",type:"grid",column_min_width:"140px",schema:[z("domain"),z("service")]}]];case"image":return[[{name:"image",type:"grid",column_min_width:"140px",schema:[z("attribute"),E("rotate",{unit_of_measurement:"°"}),V("mirror"),E("lumens",{min:0})]}],"Room light from the picture",[{name:"image",type:"grid",column_min_width:"140px",schema:[E("lighting_lumens",{min:0}),D("lighting_direction",[["positive_z","+Z"],["negative_z","−Z"],["positive_x","+X"],["negative_x","−X"],["positive_y","+Y"],["negative_y","−Y"]]),E("lighting_distance",{min:0,unit_of_measurement:"cm"}),z("lighting_off_state"),V("lighting_shadow")]}]];case"info":return[[{name:"info",type:"grid",column_min_width:"140px",schema:[z("text"),z("textfgcolor"),z("textbgcolor"),z("font"),E("size",{min:0})]}],"info.position"];case"shower":return[[{name:"shower",type:"grid",column_min_width:"140px",schema:[E("velocity",{min:0}),E("count",{min:1,step:1}),z("color"),E("size",{min:0}),E("width",{min:0,unit_of_measurement:"cm"}),E("height",{min:0,unit_of_measurement:"cm"})]}]];case"tracker":return[[{name:"tracker",type:"grid",column_min_width:"140px",schema:[T("sensor_x","sensor"),T("sensor_y","sensor"),D("unit",[["mm","mm"],["cm","cm"],["m","m"]]),E("scale",{min:0}),V("flip_x"),V("flip_y"),T("zone"),V("label"),z("color"),E("size",{min:0}),E("height",{min:0,unit_of_measurement:"cm"}),E("sensor_rotation",{unit_of_measurement:"°"})]}],"tracker.sensor_position"];default:return[]}},q=()=>[N(z("font"),E("span",{min:0,max:100,unit_of_measurement:"%"})),N(z("textfgcolor"),z("textbgcolor"))],G={name:"Name",header:"Show the header",path:"Folder of the model",objfile:"Model file (.obj or .glb)",mtlfile:"Materials file (.mtl)",objectlist:"Object list (JSON file)",backgroundColor:"Background colour",style:"Canvas style (CSS)",x:"X",y:"Y",z:"Z",lock_camera:"Lock the camera",hideZoomMenu:"Buttons instead of the Views menu",hideLevelsMenu:"Hide the levels menu",initialLevel:"Initial level",globalLightPower:"Light following the camera",light_power:"Lamp power",exposure:"Exposure",tone_mapping:"Tone mapping",shadow:"Shadows",extralightmode:"Extra light mode",sun:"Sunlight",sun_entity:"Sun entity",sun_power:"Sun power",sun_shadow:"Sun shadows",click:"Tap runs the action",editModeNotifications:"Object names on double click (dashboard in edit mode)",selectionMode:"Selection mode",show_axes:"Show the axes",overlay:"Overlay",overlay_bgcolor:"Background colour",overlay_fgcolor:"Text colour",overlay_alignment:"Position",overlay_width:"Width",overlay_height:"Height",overlay_font:"Font",overlay_fontsize:"Font size",state_colors:"Colour open doors and windows",open_color:"Colour when open",alarm_color:"Colour when the alarm is armed",alarm_entity:"Alarm",room_colors:"Initial room map",presence_color:"Presence colour",temperature_min:"Temperature for blue",temperature_max:"Temperature for red",max_pixel_ratio:"Maximum pixel ratio",log_depth:"Logarithmic depth buffer",reversed_depth:"Reversed depth buffer",entity:"Entity",type3d:"Type",object_id:"Object",action:"Tap action",long_press_action:"Long press action",entity_template:"Entity template",lumens:"Lumens",color:"Colour",decay:"Decay",distance:"Distance",vertical_alignment:"Vertical position",light_target:"Spot target object",angle:"Spot angle",doortype:"Door type",side:"Side",direction:"Direction",degrees:"Opening angle (swing)",percentage:"Opening (slide)",hinge:"Hinge object",pane:"Pane object",axis:"Axis",round_per_second:"Rounds per second",ramp:"Spin-up and coast-down",draco_decoder_path:"Draco decoder folder",transparency:"Transparency",elevation:"Height of the room",label:"Label",label_text:"Label shows",attribute:"Attribute",width:"Width",height:"Height",font:"Font",span:"Width of the text",textfgcolor:"Text colour",textbgcolor:"Background colour",state:"State",domain:"Service domain",service:"Service",mirror:"Mirror",lighting_lumens:"Lumens",lighting_direction:"Direction",lighting_distance:"Distance",lighting_off_state:"Off in state",lighting_shadow:"Shadows",text:"Text or template",size:"Size",velocity:"Speed",count:"Drops",sensor_x:"X sensor",sensor_y:"Y sensor",unit:"Unit of the coordinates",scale:"Scale",flip_x:"Mirror X",flip_y:"Mirror Y",zone:"Zone entity",sensor_rotation:"Sensor rotation",object_group:"Group name",temperature:"Temperature sensor",presence:"Presence entities",zoom:"Name",level:"Level"},Q={path:"For example /local/floor3d/",objectlist:"Optional: a JSON list of the object names, for the object menus",backgroundColor:"A colour, #rrggbb or transparent. Default #aaaaaa",globalLightPower:"From 0 to 1, or a numeric sensor. Default 0.2",light_power:"Multiplies all the lamps. Default 1",exposure:"Default 1",sun_power:"Default 1",extralightmode:"Only the lights that are on cast shadows",click:"Off: a double click runs it",selectionMode:"Taps color the objects and list them, to build groups",max_pixel_ratio:"Default 2",temperature_min:"Default 17",temperature_max:"Default 27",entity_template:"JavaScript between [[[ ]]], $entity is the state",lumens:"Default 800",decay:"Default 2",distance:"Default 600 cm",round_per_second:"2 or less",ramp:"Seconds to full speed or to stop. Default 1.5, 0 for none",objfile:"A .glb can be compressed with Draco or meshopt",draco_decoder_path:"Only for .glb models compressed with Draco. Default: Google CDN",span:"Of the object, in %",lighting_off_state:"Default off, standby, unavailable, unknown",scale:"Default 0.001",text:"A text or a template"},K=e=>e.label??G[e.name]??e.name,ee=e=>e.helper??Q[e.name],te={camera_position:"Camera position",camera_target:"Camera target",camera_rotate:"Camera rotation","light.light_direction":"Spot direction","info.position":"Position (optional)","tracker.sensor_position":"Sensor position"},ie=e=>null!==e&&"object"==typeof e&&!Array.isArray(e),oe=e=>JSON.parse(JSON.stringify(e??null));function ne(e,t){const i={...e};return Object.entries(t).forEach(([e,t])=>{const o=i[e]??t;i[e]=!0===o||"yes"===o}),i}function se(e,t,i){const o={...e};return Object.entries(i).forEach(([e,i])=>{if("boolean"!=typeof o[e])return;const n=o[e]?"yes":"no";n===i&&void 0===(t||{})[e]?delete o[e]:o[e]=n}),o}function re(e){return Object.keys(e).forEach(t=>{void 0!==e[t]&&""!==e[t]&&null!==e[t]||delete e[t]}),e}function ae(e){const t={...e};return Object.entries(F).forEach(([e,i])=>{(ie(t[e])||t.type3d===e)&&(t[e]=ne(t[e]||{},i))}),Object.entries(B).forEach(([e,i])=>{ie(t[e])&&(t[e]={...t[e]},i.forEach(i=>{const o=t[e][i];Array.isArray(o)&&(t[e][i]={x:o[0],y:o[1],z:o[2]})}))}),t}function ce(e,t){const i=re({...e});return Object.entries(F).forEach(([e,o])=>{ie(i[e])&&(i[e]=se(i[e],(t||{})[e],o))}),Object.entries(B).forEach(([e,t])=>{ie(i[e])&&t.forEach(t=>{const o=i[e][t];if(!ie(o))return;const n=[o.x,o.y,o.z];n.every(e=>"number"==typeof e&&isFinite(e))?i[e][t]=n:n.every(e=>null==e)&&delete i[e][t]})}),Object.keys(i).forEach(e=>{ie(i[e])&&re(i[e])}),i}let le=class extends r{constructor(){super(...arguments),this._view={},this._expanded=[],this._mode="loading",this._modelObjects=[],this._listObjects=[],this._keys=new WeakMap,this._previewListener=e=>this._onPreview(e.detail)}connectedCallback(){super.connectedCallback(),window.addEventListener(a,this._previewListener),this._toPreview({request:"objects"}),"loading"===this._mode&&async function(){if(customElements.get("ha-form")&&customElements.get("ha-expansion-panel"))return!0;try{const e=await window.loadCardHelpers();for(const t of[{type:"entities",entities:[]},{type:"tile",entity:"sun.sun"}]){const i=await e.createCardElement(t);await(i.constructor.getConfigElement?.())}}catch(e){}return await Promise.race([customElements.whenDefined("ha-form").then(()=>!0),new Promise(e=>setTimeout(()=>e(!1),5e3))])&&!!customElements.get("ha-expansion-panel")}().then(e=>{this._mode=e?"ready":"classic",e||this._showClassic()})}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(a,this._previewListener),this._toPreview({pick:!1,highlight:[]})}setConfig(e){const t=JSON.stringify(e),i=this._internal&&t===this._held;this._held=t;const o=c(i?this._internal:e);Array.isArray(o.entities)||(o.entities=[]),this._config||(this._expanded=o.entities.length?["entities"]:["model"]),this._config=o,this._classic&&this._classic.setConfig(e),this._loadObjectList()}_update(e){this._config=e,this._internal=c(e);const t=l(e),i=JSON.stringify(t);i!==this._held&&(this._held=i,d(this,"config-changed",{config:t}))}_setTop(e){this._update(re(se(e,this._config,Z)))}_list(e){return Array.isArray(this._config[e])?this._config[e]:[]}_setList(e,t){this._update({...this._config,[e]:t})}_setItem(e,t,i){const o=this._list(e).slice();o[t]=i,this._setList(e,o)}_key(e){return ie(e)?(this._keys.has(e)||this._keys.set(e,Math.random().toString(36).slice(2)),this._keys.get(e)):String(e)}_toPreview(e){window.dispatchEvent(new CustomEvent(h,{detail:e}))}_onPreview(e){if(e&&(e.objects&&(this._modelObjects=e.objects,this._picking&&this._toPreview({pick:!0}),this._highlightCurrent()),e.picked&&this._picking&&this._onPicked(e.picked),e.camera&&this._cameraTarget)){const t=this._cameraTarget;this._cameraTarget=void 0,this._applyCamera(t,e.camera)}}_useCurrentView(e,t){this._cameraTarget={list:e,index:t},this._toPreview({request:"camera"})}_applyCamera(e,t){const i=e=>({x:+e.x.toFixed(2),y:+e.y.toFixed(2),z:+e.z.toFixed(2)}),o={camera_position:i(t.camera_position),camera_target:i(t.camera_target),camera_rotate:{x:+t.camera_rotate.x.toFixed(4),y:+t.camera_rotate.y.toFixed(4),z:+t.camera_rotate.z.toFixed(4)}};if(e.list){const t={...this._list(e.list)[e.index],...o};this._setItem(e.list,e.index,t)}else this._update({...this._config,...o})}_startPick(e){const t=this._picking&&JSON.stringify(this._picking)===JSON.stringify(e);this._picking=t?void 0:e,this._toPreview({pick:!t})}_onPicked(e){const t=this._picking;if(t.add){const[i,o]=t.path,n={...this._list(i)[o]},s=(n.objects||[]).slice(),r=s.findIndex(t=>(ie(t)?t.object_id:t)===e);r>=0?s.splice(r,1):s.push({object_id:e}),this._setItem(i,o,{...n,objects:s})}else this._picking=void 0,this._toPreview({pick:!1}),this._setPath(t.path,e)}_setPath(e,t){const i=oe(this._config);let o=i;e.slice(0,-1).forEach(e=>{void 0===o[e]&&(o[e]={}),o=o[e]}),o[e[e.length-1]]=t,this._update(i)}_highlight(e){this._toPreview({highlight:e.filter(e=>"string"==typeof e&&""!==e)})}_highlightCurrent(){const{list:e,index:t}=this._view;this._highlight(e&&void 0!==t?this._itemObjects(e,this._list(e)[t]):[])}_itemObjects(e,t){return ie(t)?"object_groups"===e?(t.objects||[]).map(e=>ie(e)?e.object_id:e):[t.object_id]:[]}_objectOptions(){const e=this._list("object_groups").filter(e=>ie(e)&&e.object_group).map(e=>"<"+e.object_group+">"),t=Array.from(new Set([...this._modelObjects,...this._listObjects])).sort((e,t)=>e.toLowerCase().localeCompare(t.toLowerCase()));return[...e,...t]}_loadObjectList(){const{path:e,objectlist:t}=this._config||{},i=t&&e?e.replace(/\/?$/,"/")+t:void 0;i!==this._objectlist&&(this._objectlist=i,this._listObjects=[],i&&fetch(i).then(e=>e.ok?e.json():{}).then(e=>{this._objectlist===i&&(this._listObjects=Object.keys(e||{}))}).catch(()=>{}))}async _showClassic(){await(import("./floor3d-card-editor-classic-Ca0i0jhM.js"));const e=document.createElement("floor3d-card-editor-classic");e.hass=this.hass,this._config&&e.setConfig(this._config),this._classic=e,this.requestUpdate()}updated(e){e.has("hass")&&this._classic&&(this._classic.hass=this.hass),e.has("_view")&&this._highlightCurrent()}render(){if(!this.hass||!this._config)return m;if("classic"===this._mode)return _`${this._classic||m}`;if("loading"===this._mode)return _`<div class="loading">Loading…</div>`;const{list:e,index:t}=this._view;return e&&void 0!==t&&void 0!==this._list(e)[t]?this._renderItemEditor(e,t):_`
      <div class="version">
        floor3d-card ${p}
        <ha-icon-button .label=${"Reload the preview"} .path=${"M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"} @click=${()=>this._toPreview({request:"reload"})}></ha-icon-button>
      </div>
      ${J.map(e=>this._renderPanel(e.key,e.title,e.icon,()=>this._renderContent(e.content(this._config),this._config,e=>this._setTop(e),!0)))}
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
    `}_renderContent(e,t,i,o=!1,n,s){return e.map(e=>{if("string"!=typeof e)return this._form(e,o?ne(t,Z):ae(t),e=>i(o?e:ce(e,t)));switch(e){case"sun_roof":return this._form([(r="sun_roof",a=this._objectOptions(),{name:r,selector:{select:{mode:"dropdown",custom_value:!0,multiple:!0,options:a}}})],{sun_roof:Array.isArray(t.sun_roof)?t.sun_roof:[]},e=>i({...ne(t,Z),sun_roof:e.sun_roof?.length?e.sun_roof:void 0}),"Indoor floors: roof for the sun");case"rooms":return _`
            <div class="heading">Rooms</div>
            ${this._renderList("rooms","Add room",{name:""})}
          `;case"colorcondition":return this._renderColorConditions(n,s,t);default:if(e in te){const[o,n]=e.split(".");return this._form([{name:o,type:"grid",schema:[I(n)]}],ae(t),e=>i(ce(e,t)),te[e])}return _`<div class="heading">${e}</div>`}var r,a})}_form(e,t,i,o){const n=o??(1===e.length&&te[e[0].name]?te[e[0].name]:void 0);return _`
      ${n?_`<div class="heading">${n}</div>`:m}
      <ha-form
        .hass=${this.hass}
        .data=${t}
        .schema=${e}
        .computeLabel=${K}
        .computeHelper=${ee}
        @value-changed=${e=>{e.stopPropagation(),i(e.detail.value)}}
      ></ha-form>
    `}_missing(e){if(!e)return!1;const t=/^<(.*)>$/.exec(e);if(t)return!this._list("object_groups").some(e=>ie(e)&&e.object_group===t[1]);const i=[...this._modelObjects,...this._listObjects];return u(e)?i.length>0&&0===g(e,i).length:i.length>0&&!i.includes(e)}_objectText(e){if(!e)return"no object";if(this._missing(e))return e+" (not in the model)";const t=Array.from(new Set([...this._modelObjects,...this._listObjects]));if(!u(e)||0===t.length)return e;const i=g(e,t).length;return e+" ("+i+" object"+(1===i?"":"s")+")"}_describe(e,t){if("entities"===e){const e=ie(t)?t:{entity:t},i=U.find(([t])=>t===e.type3d),o=e.entity&&this.hass?.states[e.entity],n=o?o.attributes.friendly_name||e.entity:e.entity||"No entity",s=this._missing(e.object_id),r=[i?i[1]:"No type",this._objectText(e.object_id)];return e.entity&&!o&&r.unshift("Entity not found"),{icon:i?i[2]:"mdi:help-circle-outline",primary:n,secondary:r.join(" · "),warning:!o||!i||!e.object_id||s}}if("object_groups"===e){const e=(t.objects||[]).length;return{icon:"mdi:group",primary:t.object_group||"No name",secondary:`${e} object${1===e?"":"s"}`,warning:!t.object_group}}if("zoom_areas"===e){const e=t.object_id?"Around "+t.object_id:t.camera_position?"Camera position":"Not set";return{icon:"mdi:magnify-expand",primary:t.zoom||"No name",secondary:e,warning:!t.zoom}}const i=this._missing(t.object_id);return{icon:"mdi:floor-plan",primary:t.name||"No name",secondary:t.object_id?t.object_id+(i?" (not in the model)":""):"no object",warning:!t.object_id||i}}_renderList(e,t,i){const o=this._list(e);return _`
      <ha-sortable handle-selector=".handle" @item-moved=${t=>this._moveItem(e,t.detail.oldIndex,t.detail.newIndex)}>
        <div class="rows">
          ${O(o,e=>this._key(e),(t,i)=>{const o=this._describe(e,t);return _`
                <div
                  class="row"
                  @mouseenter=${()=>this._highlight(this._itemObjects(e,t))}
                  @mouseleave=${()=>this._highlight([])}
                >
                  <div class="handle"><ha-svg-icon .path=${H}></ha-svg-icon></div>
                  <ha-icon class="type" .icon=${o.icon}></ha-icon>
                  <div class="info" @click=${()=>this._edit(e,i)}>
                    <span class="primary">${o.primary}</span>
                    <span class="secondary ${o.warning?"warning":""}">${o.secondary}</span>
                  </div>
                  <ha-icon-button .label=${"Edit"} .path=${"M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"} @click=${()=>this._edit(e,i)}></ha-icon-button>
                  <ha-icon-button .label=${"Remove"} .path=${M} @click=${()=>this._removeItem(e,i)}></ha-icon-button>
                </div>
              `})}
        </div>
      </ha-sortable>
      <ha-button class="add" @click=${()=>this._addItem(e,i)}>
        <ha-svg-icon slot="start" .path=${P}></ha-svg-icon>${t}
      </ha-button>
    `}_moveItem(e,t,i){const o=this._list(e).slice();o.splice(i,0,o.splice(t,1)[0]),this._setList(e,o)}_removeItem(e,t){const i=this._list(e).slice();i.splice(t,1),this._highlight([]),this._setList(e,i)}_addItem(e,t){const i=[...this._list(e),oe(t)];this._setList(e,i),this._edit(e,i.length-1)}_edit(e,t){this._view={list:e,index:t}}_back(){this._picking&&this._startPick(this._picking),this._view={},this._highlight([])}_renderItemEditor(e,t){const i=this._list(e)[t],o=i=>this._setItem(e,t,i);let n;return n="entities"===e?this._renderEntity(t,ie(i)?i:{entity:i},o):"object_groups"===e?this._renderGroup(t,i,o):"zoom_areas"===e?this._renderZoom(t,i,o):this._renderRoom(t,i,o),_`
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
          .path=${S}
          @click=${()=>this._startPick({path:e})}
        ></ha-icon-button>
      </div>
      ${n?_`<div class="hint">Tap an object in the preview</div>`:m}
    `}_renderEntity(e,t,i){const o=e=>{e.type3d!==t.type3d&&t.type3d&&void 0!==e[t.type3d]&&delete e[t.type3d],i(e)},n=this._objectOptions();return[this._form(Y(),ae(t),e=>o(ce(e,t))),this._objectRow(["entities",e,"object_id"],[{...R("object_id",n),helper:"An object, a <group>, or a name with * for all the objects it matches (Lamp_*)"}],t,e=>o(re({...t,object_id:e.object_id}))),...t.type3d?[_`<div class="heading">${(U.find(([e])=>e===t.type3d)||[])[1]||""} options</div>`,...this._renderContent(W(t.type3d,n),t,o,!1,"entities",e)]:[],_`
        <ha-expansion-panel outlined .header=${"Tap, long press and template"}>
          <div class="panel">
            ${this._form([N(D("action",X),D("long_press_action",X)),z("entity_template")],t,e=>o(re({...e})))}
          </div>
        </ha-expansion-panel>
      `]}_renderColorConditions(e,t,i){const o=Array.isArray(i.colorcondition)?i.colorcondition:[],n=o=>this._setItem(e,t,{...i,colorcondition:o});return _`
      <div class="heading">Colour by state</div>
      <ha-sortable
        handle-selector=".handle"
        @item-moved=${e=>{const t=o.slice();t.splice(e.detail.newIndex,0,t.splice(e.detail.oldIndex,1)[0]),n(t)}}
      >
        <div class="rows">
          ${O(o,e=>this._key(e),(e,t)=>_`
              <div class="row condition">
                <div class="handle"><ha-svg-icon .path=${H}></ha-svg-icon></div>
                ${this._form([N(z("state"),z("color"))],e,e=>{const i=o.slice();i[t]=re({...e}),n(i)})}
                <ha-icon-button
                  .label=${"Remove"}
                  .path=${M}
                  @click=${()=>n(o.filter((e,i)=>i!==t))}
                ></ha-icon-button>
              </div>
            `)}
        </div>
      </ha-sortable>
      <ha-button class="add" @click=${()=>n([...o,{state:"",color:""}])}>
        <ha-svg-icon slot="start" .path=${P}></ha-svg-icon>Add colour
      </ha-button>
    `}_renderGroup(e,t,i){const o=t.objects||[],n=e=>ie(e)?e.object_id:e,s=["object_groups",e,"objects"],r=this._picking&&JSON.stringify(this._picking.path)===JSON.stringify(s),a=e=>i({...t,objects:e});return[this._form([z("object_group")],t,e=>i(re({...e}))),_`
        <div class="heading">Objects</div>
        <ha-sortable
          handle-selector=".handle"
          @item-moved=${e=>{const t=o.slice();t.splice(e.detail.newIndex,0,t.splice(e.detail.oldIndex,1)[0]),a(t)}}
        >
          <div class="rows">
            ${O(o,e=>this._key(e),(e,t)=>_`
                <div class="row" @mouseenter=${()=>this._highlight([n(e)])} @mouseleave=${()=>this._highlightCurrent()}>
                  <div class="handle"><ha-svg-icon .path=${H}></ha-svg-icon></div>
                  <div class="info"><span class="primary">${n(e)||"No object"}</span></div>
                  <ha-icon-button
                    .label=${"Remove"}
                    .path=${M}
                    @click=${()=>a(o.filter((e,i)=>i!==t))}
                  ></ha-icon-button>
                </div>
              `)}
          </div>
        </ha-sortable>
        <div class="object-row">
          ${this._form([R("add",this._objectOptions().filter(e=>!e.startsWith("<")))],{},e=>{e.add&&a([...o,{object_id:e.add}])},"")}
          <ha-icon-button
            class=${r?"picking":""}
            .label=${"Pick in the preview"}
            .path=${S}
            @click=${()=>this._startPick({path:s,add:!0})}
          ></ha-icon-button>
        </div>
        ${r?_`<div class="hint">Tap objects in the preview to add them, tap again to take them out</div>`:m}
      `]}_renderZoom(e,t,i){const o=e=>i(ce(e,t));return[this._form([N(z("zoom"),E("level",{step:1}))],t,o),_`
        <div class="heading-row">
          <div class="heading">Camera</div>
          <ha-button appearance="plain" size="s" @click=${()=>this._useCurrentView("zoom_areas",e)}>
            <ha-svg-icon slot="start" .path=${"M20,4H16.83L15,2H9L7.17,4H4A2,2 0 0,0 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6A2,2 0 0,0 20,4M20,18H4V6H8.05L9.88,4H14.12L15.95,6H20V18M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15Z"}></ha-svg-icon>Use the current view
          </ha-button>
        </div>
      `,this._form([I("camera_position")],t,o),this._form([I("camera_target")],t,o),this._form([I("camera_rotate")],t,o),_`<div class="heading">Or around an object</div>
        <div class="hint">With an object, the camera looks at it from the direction and distance below.</div>`,this._objectRow(["zoom_areas",e,"object_id"],(n=this._objectOptions(),[N(R("object_id",n),E("distance",{min:0,unit_of_measurement:"cm"}))]),t,o),this._form([I("direction")],t,o,"Direction"),this._form([I("rotation")],t,o,"Rotation")];var n}_renderRoom(e,t,i){const o=t.presence?Array.isArray(t.presence)?t.presence:[t.presence]:[];return[this._objectRow(["rooms",e,"object_id"],(n=this._objectOptions(),[N(z("name"),R("object_id",n)),N(T("temperature","sensor"),T("presence",["binary_sensor","person","device_tracker"],!0))]),{...t,presence:o},e=>{const t=re({...e});Array.isArray(t.presence)&&(0===t.presence.length?delete t.presence:1===t.presence.length&&(t.presence=t.presence[0])),i(t)})];var n}static get styles(){return f`
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
    `}};i([o({attribute:!1})],le.prototype,"hass",void 0),i([n()],le.prototype,"_config",void 0),i([n()],le.prototype,"_view",void 0),i([n()],le.prototype,"_expanded",void 0),i([n()],le.prototype,"_mode",void 0),i([n()],le.prototype,"_modelObjects",void 0),i([n()],le.prototype,"_listObjects",void 0),i([n()],le.prototype,"_picking",void 0),le=i([s("floor3d-card-editor")],le);export{le as Floor3dCardEditor};
