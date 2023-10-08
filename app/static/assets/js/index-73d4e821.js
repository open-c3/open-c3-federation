var e=Object.defineProperty,t=Object.defineProperties,n=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertyNames,r=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,i=(t,n,l)=>n in t?e(t,n,{enumerable:!0,configurable:!0,writable:!0,value:l}):t[n]=l,o=(e,t)=>{for(var n in t||(t={}))a.call(t,n)&&i(e,n,t[n]);if(r)for(var n of r(t))s.call(t,n)&&i(e,n,t[n]);return e},c=(e,l)=>t(e,n(l)),d=(e,t,n)=>new Promise(((l,r)=>{var a=e=>{try{i(n.next(e))}catch(t){r(t)}},s=e=>{try{i(n.throw(e))}catch(t){r(t)}},i=e=>e.done?l(e.value):Promise.resolve(e.value).then(a,s);i((n=n.apply(e,t)).next())}));import{u,j as m,R as h,e as p,n as x,m as g,r as f,L as y,I as j,D as v,a as _,M as w,b,A as k,c as S,d as C,f as I,g as O,T as N,P as F,C as L,B as T,h as A,i as E,k as Y,l as $,o as M,E as P,p as z,q as H,F as D,s as B,S as R,t as K,U as q,v as G,w as U,H as J,x as V,y as W,z as Q,G as X,J as Z,K as ee}from"./vendor-1fc3638c.js";var te,ne,le=(te={"assets/js/index-73d4e821.js"(e){!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const n of e)if("childList"===n.type)for(const e of n.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const t=e=>{const t=u();return"/"===t.location.pathname&&t.push("/alert"),m.jsx(h,o({},e))},n={200:"请求成功",400:"请求错误",401:"用户没有权限（令牌、用户名、密码错误）。",403:"用户得到授权，但是访问是被禁止的。",404:"发出的请求针对的是不存在的记录，服务器没有进行操作。",406:"请求的格式不可得。",410:"请求的资源被永久删除，且不会再得到的。",422:"当创建一个对象时，发生一个验证错误。",500:"服务器发生错误，请检查服务器。",502:"网关错误。",503:"服务不可用，服务器暂时过载或维护。",504:"网关超时。",1e4:"登录已过期，请重新登录"};let l=!1;const r=p({errorHandler:e=>{const{response:t}=e;if(t&&t.status){const{status:e}=t,r=n[t.status]||t.statusText;l||(g.error(`${n[e]||"请求错误"}`),x.error({message:`${n[e]||"请求错误"}`,description:r}),l=!0)}else t||l||(g.error("您的网络发生异常，无法连接服务器"),x.error({description:"您的网络发生异常，无法连接服务器",message:"网络异常"}),l=!0);return t},prefix:"/api"});function a(e){return f.createElement("svg",o({t:1694685932840,className:"icon",viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg","p-id":4048,width:128,height:128},e),f.createElement("path",{d:"M811.8 203.6h-98V200c0-19.9-16.1-36-36-36H625c-8.2-54.8-55.6-97-112.7-97s-104.5 42.2-112.7 97h-52.8c-19.9 0-36 16.1-36 36v3.6h-98c-19.9 0-36 16.1-36 36v682.6c0 19.9 16.1 36 36 36h599c19.9 0 36-16.1 36-36V239.6c0-19.9-16.1-36-36-36zM512.3 139c17.1 0 31.9 10.3 38.4 25h-76.8c6.6-14.8 21.3-25 38.4-25z m-129.5 97h259v64h-259v-64z m393 650.2h-527V275.6h62V336c0 19.9 16.1 36 36 36h331c19.9 0 36-16.1 36-36v-60.4h62v610.6z","p-id":4049,fill:"#ffffff"}),f.createElement("path",{d:"M677.8 486.1h-331c-19.9 0-36 16.1-36 36s16.1 36 36 36h331c19.9 0 36-16.1 36-36s-16.1-36-36-36zM677.8 669h-331c-19.9 0-36 16.1-36 36s16.1 36 36 36h331c19.9 0 36-16.1 36-36s-16.1-36-36-36z","p-id":4050,fill:"#ffffff"}))}r.interceptors.request.use(((e,t)=>({url:e,options:o({},t)})),{global:!1}),r.interceptors.request.use(((e,t)=>({url:`${e}`,options:c(o({},t),{interceptors:!0})})),{global:!0}),r.interceptors.response.use((t=>d(e,null,(function*(){try{const e=yield t.clone().text(),r=e?JSON.parse(e.indexOf("<!doctype")>-1?"{}":e):{};if(r&&r.code&&200!==r.code){let e="";r.data&&(e=r.data.Message),l||(x.error({description:r.info||e,message:n[r.code]}),l=!0,1e4===r.code&&(window.location.href=`/#/login?callback=${window.location.href}`))}if(r&&"Unauthorized"===r.info&&!l)return x.error({description:"暂无权限",message:r.info}),void(l=!0)}catch(e){}return t}))));const s="/static/assets/jpeg/open-c3-logo-v2-ac7169ee.jpeg",i="_header_fq40g_1",te="_logo_fq40g_8",ne="_logo-text_fq40g_22",le="_header-userinfo_fq40g_36",{Header:re,Content:ae,Sider:se}=y,ie=[{label:"登出",key:"logout",icon:m.jsx(b,{})}],oe=({children:t})=>{const n=u(),l=n.location.pathname.replace("/",""),[o,c]=f.useState(!0),[h,p]=f.useState({}),x=[{key:"alert",label:"告警",icon:m.jsx(k,{}),onClick:()=>{n.push("/alert")}},{key:"ticket",label:"工单",icon:m.jsx(a,{style:{width:"1em",height:"1em"}}),onClick:()=>{n.push("/ticket")}}],b=()=>d(e,null,(function*(){const e=yield r.get("/connector/connectorx/approve/ssologout"),{code:t,data:l}=e;200===t&&(g.success(l||"退出成功！"),(()=>{const e=document.cookie.split(";");for(let t=0;t<e.length;t++){const n=e[t],l=n.indexOf("="),r=l>-1?n.substr(0,l):n;document.cookie=r+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"}})(),n.push(`/login?callback=${window.location.href}`))}));return f.useEffect((()=>{d(e,null,(function*(){const e=yield r.get("/connector/connectorx/sso/userinfo");if(e){const{code:t,data:n}=e;200===t&&p(n)}}))}),[]),m.jsxs(y,{style:{width:"100%",height:"100%"},children:[m.jsxs(re,{className:i,children:[m.jsxs("div",{className:te,onClick:()=>{n.push("/alert")},children:[m.jsx(j,{width:60,src:s,preview:!1}),m.jsx("span",{className:ne,children:"OPEN-C3"})]}),m.jsx("div",{className:le,children:m.jsx(v,{menu:{items:ie,onClick:({key:e})=>{"logout"===e&&b()}},trigger:["click"],arrow:!0,children:m.jsxs("div",{onClick:e=>e.preventDefault(),children:[m.jsx("span",{children:null==h?void 0:h.name}),m.jsx(_,{style:{marginLeft:10}})]})})})]}),m.jsxs(y,{children:[m.jsx(se,{width:200,className:"site-layout-background",collapsible:!0,collapsed:o,onCollapse:e=>c(e),children:m.jsx(w,{theme:"dark",mode:"inline",defaultSelectedKeys:[l||"alert"],defaultOpenKeys:["alerts"],style:{height:"100%",borderRight:0},items:x})}),m.jsx(y,{className:"site-layout",style:{padding:"0"},children:m.jsx(ae,{className:"site-layout-background",style:{margin:0,minHeight:280},children:t})})]})]})},ce={login:"_login_csfe7_1","login-image":"_login-image_csfe7_7","login-address":"_login-address_csfe7_11","li-items":"_li-items_csfe7_21",active:"_active_csfe7_42",none:"_none_csfe7_45"},de=()=>{const[t,n]=f.useState([]);f.useEffect((()=>{d(e,null,(function*(){const e=yield r.get("/federation/endpoints");if(e){const{data:t}=e;n(t||[])}}))}),[]);const l=e=>{const n=(e=>{const t={},n=e.indexOf("?");if(n>-1){const l=e.slice(n+1).split("&");for(const e of l){const[n,l]=e.split("=");t[decodeURIComponent(n)]=decodeURIComponent(l)}}return t})(window.location.href),l=t.find((t=>t.name===e));l.callback?window.location.href=`${l.callback}${n.callback?n.callback:""}`:window.location.href=l.domain};return m.jsxs("div",{className:ce.login,children:[m.jsx("div",{className:ce["login-image"],children:m.jsx(j,{width:234,src:s,preview:!1})}),m.jsxs("div",{className:ce["login-address"],children:[m.jsx("div",{style:{marginTop:"67px"},children:"请选择要跳转的平台"}),m.jsx("div",{className:ce["platform-list"],children:t.map((e=>m.jsx("div",{className:ce["li-items"],style:{margin:"20px 0"},children:m.jsxs("div",{onClick:()=>l(e.name),children:["登录",e.name,"平台"]})},e.name)))})]})]})};let ue;const me="zh-cn",he=localStorage.getItem("NG_TRANSLATE_LANG_KEY")||me;localStorage.getItem("NG_TRANSLATE_LANG_KEY")||localStorage.setItem("NG_TRANSLATE_LANG_KEY",me);const pe={en:{messages:{switchLan:"Chinese-English shift",currentAlarm:"Current Alarm",tt_ticket_list:"TT Work Order List"},locale:"en",antd:S,momentLocale:""},"zh-cn":{messages:{switchLan:"中英文切换",currentAlarm:"当前告警",tt_ticket_list:"TT工单列表"},locale:"zh-cn",antd:C,momentLocale:"zh-cn"}},xe=()=>he,ge=e=>m.jsx(I,{locale:xe(),children:e.children}),fe=e=>{ue=((e,t)=>{if(ue&&!t&&!e)return ue;if(e&&pe[e])return O(pe[e]);if(pe[me])return O(pe[me]);if(pe["zh-cn"])return O(pe["zh-cn"]);if(!e||pe[e])throw new Error(`Could not find locale data for locale "${e}"`);return O({locale:"",messages:{}})})(e,!0)},ye=(e,t)=>(ue||fe(xe()),ue.formatMessage(e,t)),je={filterTitle:"筛选",filterConfirm:"确定",filterReset:"重置",filterEmptyText:"无筛选项",filterCheckall:"全选",filterSearchPlaceholder:"在筛选项中搜索",selectAll:"全选当页",selectInvert:"反选当页",selectNone:"清空所有",selectionAll:"全选所有",sortTitle:"排序",expand:"展开行",collapse:"关闭行",triggerDesc:"点击降序",triggerAsc:"点击升序",cancelSort:"取消排序"},ve="_site-page-header_o03on_14",_e="_content-table-card_o03on_22",we="_table-operate-button_o03on_27",be="_content-table-header-operate_o03on_31",ke="_content-table-header-operate-left_o03on_37",Se="_content-table-header-operate-right_o03on_40",Ce="_content-table-header-operate-right-icon_o03on_45",Ie=[{text:"全部",value:""},{text:"level1",value:"level1"},{text:"level2",value:"level2"},{text:"level3",value:"level3"},{text:"level4",value:"level4"}],Oe=[{text:"全部告警",value:""},{text:"已抑制告警",value:"suppressed"},{text:"未抑制告警",value:"active"}],Ne=[{text:"全部",value:""},{text:"未认领",value:"unclaimed"},{text:"已认领",value:"claimed"}],Fe={"":"",level1:"_first-almost_o03on_49",level2:"_second-almost_o03on_52",level3:"_third-almost_o03on_55",level4:"_forth-almost_o03on_58"},Le=()=>{const[t,l]=f.useState(!1),[a,s]=f.useState([]),[i,u]=f.useState([]),[h,p]=f.useState([]),[x,y]=f.useState({}),[j,v]=f.useState({}),[_,w]=f.useState(null),[b,k]=f.useState({current:1,pageSize:20,total:0}),S=()=>d(e,null,(function*(){const e=`${window.location.protocol}//${window.location.host}`,t=yield(e=>r.get(`/agent/monitor/alert/0?siteaddr=${e}`))(e).catch((e=>{}));if(t){const{data:e}=t;k(c(o({},b),{total:(null==e?void 0:e.length)||0})),p(e||[]),s([])}})),C=()=>d(e,null,(function*(){const e=yield r.get("/agent/monitor/alert/tottbind/0").catch((e=>{}));if(e){const{data:t}=e;y(t||{})}})),I=()=>d(e,null,(function*(){const e=yield r.get("/agent/monitor/ack/deal/info").catch((e=>{}));if(e){const{data:t}=e;v(t||{})}})),O=()=>d(e,null,(function*(){try{l(!0),g.loading("加载中..."),yield I(),yield C(),yield S(),l(!1)}catch(e){g.error("加载失败!"),l(!1)}})),D=e=>{let t=e.instance;return e.instanceid&&(t=e.instanceid),e.cache_cluster_id&&(t=e.cache_cluster_id),e.dbinstance_identifier&&(t=e.dbinstance_identifier),t},B={view:e=>{var t;window.open(null==(t=e[0])?void 0:t.generatorURL,"_blank")},order:t=>{M.confirm({title:"提交工单",icon:m.jsx(P,{}),content:"确认要将监控告警转成工单吗？",onOk:()=>d(e,null,(function*(){const e=yield(l=t[0].c3_name,a=t[0],r.post(`/agent/monitor/alert/tott/0?c3_name=${l}`,{data:a})).catch((e=>{g.error("加载失败!")}));var l,a;if(e){const{stat:t,status:l,statusText:r,code:a}=e;if(t&&"ok"!==t||l&&200!==l||a&&200!==a)return void g.error(`${n[l]}:${r}}`||"加载失败");g.success("操作成功!")}return!1})),onCancel:()=>{M.destroyAll()},okText:"确认",cancelText:"取消"})},alarm:t=>{M.confirm({title:"告警认领",icon:m.jsx(P,{}),content:"确认要认领告警吗？",onOk:()=>d(e,null,(function*(){const e=t.reduce(((e,t)=>{const{c3_name:n,uuid:l}=t;return e[n]?e[n]+=`,${l}`:e[n]=l,e}),{}),l=yield(e=>r.post("/agent//monitor/ack/deal/info",{data:e}))({data:e}).catch((e=>{g.error("加载失败!")}));if(l){const{stat:e,status:t,statusText:r,code:a}=l;if(e&&"ok"!==e||t&&200!==t||a&&200!==a)return void g.error(`${n[t]}:${r}}`||"加载失败");g.success("操作成功!")}})),onCancel:()=>{M.destroyAll()},okText:"确认",cancelText:"取消"})}},R=(e,t)=>B[e](t),K=()=>{_&&(clearInterval(_),w(null))};f.useEffect((()=>()=>{K()}),[]),f.useEffect((()=>{O()}),[]);const q=[{title:"开始时间",key:"startsAt",dataIndex:"startsAt",width:130,align:"center",showSorterTooltip:!1,sorter:(e,t)=>((e,t)=>{const n=H(e,"YYYY-MM-DD HH:mm:ss"),l=H(t,"YYYY-MM-DD HH:mm:ss");return n.isBefore(l)?-1:n.isAfter(l)?1:0})(e.startsAt,t.startsAt),sortDirections:["descend","ascend"]},{title:"C3来源",key:"c3_name",dataIndex:"c3_name",width:100,align:"center",render:e=>m.jsx(m.Fragment,{children:e||"-"})},{title:"认领人",dataIndex:"claimUuid",key:"claimUuid",width:100,align:"center",filters:Ne,onFilter:(e,t)=>""===e||("unclaimed"===e?!j[t.uuid]:!!j[t.uuid]),render:(e,t)=>m.jsx(m.Fragment,{children:j[t.uuid]||"-"})},{title:"名称",key:"labels",width:100,align:"center",dataIndex:["labels","alertname"]},{title:"监控对象",key:"instance",width:100,align:"center",dataIndex:["labels","instance"],render:(e,t)=>m.jsx(m.Fragment,{children:m.jsx("div",{children:D(t.labels)||"-"})})},{title:"Owner",key:"owner",dataIndex:"owner",width:100,align:"center"},{title:"OpsOwner",key:"opsowner",dataIndex:"opsowner",width:110,align:"center"},{title:"资源别名",key:"alias",dataIndex:"alias",width:110,align:"center"},{title:"状态",key:"state",dataIndex:["status","state"],width:100,align:"center",filters:Oe,defaultFilteredValue:["active"],onFilter:(e,t)=>0===t.status.state.indexOf(e),render:e=>m.jsx(m.Fragment,{children:e||"-"})},{title:"告警级别",key:"severity",dataIndex:["labels","severity"],width:130,align:"center",filters:Ie,onFilter:(e,t)=>0===t.labels.severity.indexOf(e)},{title:"概要",key:"summary",dataIndex:["annotations","summary"],width:100,align:"center"},{title:"值",key:"value",dataIndex:["annotations","value"],width:100,align:"center"},{title:"关联工单",key:"tottbind",dataIndex:"tottbind",width:130,align:"center",render:(e,t)=>m.jsx(m.Fragment,{children:x[t.uuid]&&x[t.uuid].map((e=>m.jsx(m.Fragment,{children:m.jsx(z,{color:"blue",style:{margin:"2px 0"},children:e},e)})))})},{title:"操作",key:"operate",fixed:"right",align:"center",width:180,render:(e,t)=>m.jsxs(m.Fragment,{children:[m.jsx(T,{type:"link",className:we,onClick:()=>R("view",[t]),children:"查看图表"}),m.jsx(T,{type:"link",className:we,onClick:()=>R("order",[t]),children:"转工单"}),m.jsx(T,{type:"link",className:we,onClick:()=>R("alarm",[t]),children:"认领"})]})}],G={selectedRowKeys:a,onChange:(e,t)=>{s(e),u(t)},selections:[N.SELECTION_ALL,N.SELECTION_INVERT,N.SELECTION_NONE]};return m.jsxs(m.Fragment,{children:[m.jsx(F,{className:ve,title:ye({id:"currentAlarm"})}),m.jsxs(L,{className:_e,bordered:!1,children:[m.jsxs("div",{className:be,children:[m.jsxs("div",{className:ke,style:{fontWeight:"normal",fontSize:"14px"},children:[m.jsx(T,{type:"primary",onClick:()=>R("alarm",i),disabled:!(a.length>0),children:"批量认领"}),m.jsx("span",{style:{marginLeft:8},children:a.length>0?`已选择${a.length}条`:""})]}),m.jsxs("div",{className:Se,children:[m.jsx(A,{title:"开启定时刷新",children:m.jsx(T,{type:"link",className:Ce,disabled:!!_||t,onClick:()=>M.confirm({title:"开启定时刷新",icon:m.jsx(P,{}),content:"确认要开启定时刷新吗？",onOk:()=>{if(_)return!1;const e=setInterval((()=>{O()}),15e3);w(e)},onCancel:()=>{M.destroyAll()},okText:"确认",cancelText:"取消"}),icon:m.jsx(E,{})})}),m.jsx(A,{title:"暂停",children:m.jsx(T,{type:"link",className:Ce,disabled:!_||t,onClick:()=>M.confirm({title:"关闭定时刷新",icon:m.jsx(P,{}),content:"确认要关闭定时刷新吗？",onOk:()=>{K()},onCancel:()=>{M.destroyAll()},okText:"确认",cancelText:"取消"}),icon:m.jsx(Y,{})})}),m.jsx(A,{title:"刷新列表",children:m.jsx(T,{type:"link",className:Ce,disabled:t,onClick:()=>(O(),void s([])),icon:m.jsx($,{})})})]})]}),m.jsx(N,{rowKey:"uuid",size:"small",rowClassName:e=>Fe[e.labels.severity]?Fe[e.labels.severity]:"",loading:t,pagination:b,onChange:(e,t)=>{const n=JSON.parse(JSON.stringify(h));let l=[];for(const r in t)l=n.filter((e=>!(t[r]&&t[r].length>0)||t[r].includes(e[r])));k(c(o({},e),{total:(null==l?void 0:l.length)||0}))},rowSelection:G,columns:q,dataSource:h,locale:je,scroll:{x:1500}})]})]})},Te={1:{text:"关键业务系统失效",color:"#f5222d"},2:{text:"关键业务系统受影响",color:"#fa541c"},3:{text:"部门生产效率受影响",color:"#fa8c16"},4:{text:"个人生产效率受影响",color:"#faad14"},5:{text:"生产效率暂未影响",color:"#1890ff"}},Ae={assigned:{text:"已指派",color:"#2f54eb"},closed:{text:"已关闭",color:"#000"},pending:{text:"等待",color:"#faad14"},resolved:{text:"已解决",color:"#73d13d"},wip:{text:"正在处理",color:"#91d5ff"}},Ee={false:{text:"未超时",color:"#108ee9"},true:{text:"已超时",color:"#f50"}},Ye=[{value:"assigned",label:"已指派"},{value:"wip",label:"正在处理"},{value:"pending",label:"等待"},{value:"resolved",label:"已解决"},{value:"closed",label:"已关闭"}],$e=[{text:"已指派",value:"assigned"},{text:"正在处理",value:"wip"},{text:"等待",value:"pending"},{text:"已解决",value:"resolved"},{text:"已关闭",value:"closed"}],Me=[{value:1,text:"1-关键业务系统失效"},{value:2,text:"2-关键业务系统受影响"},{value:3,text:"3-部门生产效率受影响"},{value:4,text:"4-个人生产效率受影响"},{value:5,text:"5-生产效率暂未影响"}],Pe=(e,t,n,l)=>{let r="",a=!1;for(const s in t){if(s===n){for(const n of t[s])if(n.id===e)return r=l?n[l]:n.name,r;return a=!0,r}if(a)return r}return r||"-"},ze="_site-page-header_dbvm2_14",He="_content-search-card_dbvm2_17",De="_content-table-card_dbvm2_22",Be="_table-row-assigned_dbvm2_28",{RangePicker:Re}=G;H().startOf("day");const Ke={labelCol:{span:6},wrapperCol:{span:14}},qe=()=>{const[t]=D.useForm(),[n,l]=f.useState([]),[a,s]=f.useState([]),[i,u]=f.useState(!1),[h]=f.useState("inline"),[p,x]=f.useState([]),[y,j]=f.useState([]),[v,w]=f.useState([]),[b,k]=f.useState({current:1,pageSize:20,total:0}),[S,C]=f.useState([]),[I,O]=f.useState([]),[A,E]=f.useState({create_start:H().startOf("month").toISOString(),create_end:H().endOf("month").toISOString()}),[Y,$]=f.useState([]),[M,P]=f.useState(!0),[G,U]=f.useState(!1),J=[{title:"#",key:"id",dataIndex:"id",width:50,align:"center",fixed:"left",render:(e,t,n)=>m.jsx(m.Fragment,{children:b.current&&b.pageSize&&b.pageSize*(b.current-1)+n+1||"-"})},{title:"C3来源",key:"c3_name",dataIndex:"id",width:100,align:"center",render:(e,{c3_name:t})=>m.jsx(m.Fragment,{children:t||"-"})},{title:"事件编号",key:"no",dataIndex:"id",width:130,align:"center",render:(e,t)=>m.jsx(m.Fragment,{children:m.jsx(T,{type:"link",onClick:()=>{window.open(`${t.c3_domain}/tt/#/tt/show/${t.no}`)},children:t.no||"-"})})},{title:"影响级别",key:"impact",dataIndex:"impact",width:150,align:"center",filters:Me,onFilter:(e,t)=>t.impact===e,render:(e,{impact:t})=>m.jsx(m.Fragment,{children:m.jsxs("div",{style:{color:`${Te[t].color}`},children:[t," - ",Te[t].text||"-"]})})},{title:"状态",key:"status",dataIndex:"status",width:100,align:"center",filters:$e,onFilter:(e,t)=>t.status===e,render:(e,{status:t})=>m.jsx(m.Fragment,{children:m.jsx("div",{style:{color:`${Ae[t].color}`},children:Ae[t].text||"-"})})},{title:"C.T.I.",key:"category",dataIndex:"category",width:200,align:"center",render:(e,{category:t,type:n,item:l,c3_name:r})=>m.jsxs(m.Fragment,{children:[Pe(t,a[r],"category")||"-",".",Pe(n,a[r],"type")||"-",".",Pe(l,a[r],"item")||"-"]})},{title:"标题",key:"title",dataIndex:"title",width:150,align:"center",render:(e,{title:t})=>m.jsx(m.Fragment,{children:t||"-"})},{title:"工作组",key:"workgroup",dataIndex:"workgroup",width:150,align:"center",render:(e,{workgroup:t,c3_name:n})=>m.jsxs(m.Fragment,{children:[" ",Pe(t,a[n],"group","group_name")||"-"," "]})},{title:"组员",key:"group_user",dataIndex:"group_user",width:150,align:"center",render:(e,{group_user:t,c3_name:n})=>m.jsxs(m.Fragment,{children:[" ",Pe(t,a[n],"group","group_name")||"-"," "]})},{title:"提交人",key:"submit_user",dataIndex:"submit_user",width:100,align:"center",render:(e,{submit_user:t})=>m.jsx(m.Fragment,{children:t||"-"})},{title:"申请人",key:"apply_user",dataIndex:"apply_user",width:100,align:"center",render:(e,{apply_user:t})=>m.jsx(m.Fragment,{children:t||"-"})},{title:"创建时间",key:"created_at",dataIndex:"created_at",width:150,align:"center",render:(e,{created_at:t})=>m.jsx(m.Fragment,{children:H(t).format("YYYY-MM-DD HH:mm:ss")||"-"})},{title:"响应时间",key:"response_time",dataIndex:"response_time",width:150,align:"center",render:(e,{response_time:t})=>m.jsx(m.Fragment,{children:0===t.indexOf("0001")?"-":m.jsx("div",{children:H(t).format("YYYY-MM-DD HH:mm:ss")||"-"})})},{title:"解决时间",key:"resolve_time",dataIndex:"resolve_time",width:150,align:"center",render:(e,{status:t,resolve_time:n})=>m.jsx(m.Fragment,{children:["resolved","closed"].includes(t)?m.jsx("div",{children:H(n).format("YYYY-MM-DD HH:mm:ss")||"-"}):"-"})},{title:"响应SLA",key:"response_timeout",dataIndex:"response_timeout",width:100,align:"center",render:(e,{response_timeout:t})=>m.jsx(m.Fragment,{children:m.jsx(z,{color:Ee[String(t)].color,children:Ee[String(t)].text})})},{title:"解决SLA",key:"resolve_timeout",dataIndex:"resolve_timeout",width:100,align:"center",render:(e,{resolve_timeout:t})=>m.jsx(m.Fragment,{children:m.jsx(z,{color:Ee[String(t)].color,children:Ee[String(t)].text})})},{title:"解决期限",key:"resolve_deadline",dataIndex:"resolve_deadline",width:150,align:"center",render:(e,{resolve_deadline:t})=>m.jsx(m.Fragment,{children:H(t).format("YYYY-MM-DD HH:mm:ss")||"-"})}],V=t=>d(e,null,(function*(){u(!0);const e=yield(n=t,r.post("/tt/public/search/list",{data:n})).catch((e=>{u(!1),g.error("获取数据失败!")}));var n;if(e){u(!1);const{code:t,data:n}=e;200===t?(k(c(o({},b),{total:(null==n?void 0:n.length)||0})),l(n||[])):g.error("获取数据失败!")}}));return f.useEffect((()=>{d(e,null,(function*(){const e=yield r.get("/tt/public/base/all").catch((e=>{g.error("获取数据失败")}));if(e){const{data:t,code:n,msg:l}=e;if(200===n){s(t);const e=[];for(const n in t)e.push({value:n,label:n});$(e)}else g.error(`获取数据失败！${l||""}`)}}))}),[]),f.useEffect((()=>{V(A)}),[]),m.jsxs(m.Fragment,{children:[m.jsx(F,{className:ze,title:ye({id:"tt_ticket_list"})}),m.jsx(L,{className:He,bordered:!1,children:m.jsxs(D,c(o({name:"basic"},Ke),{form:t,initialValues:{"range-picker":[H().startOf("month"),H().endOf("month")]},onFinish:e=>{const t=o(c(o({},e),{create_start:e["range-picker"]?e["range-picker"][0].toISOString():void 0,create_end:e["range-picker"]?e["range-picker"][1].toISOString():void 0}),A);delete t["range-picker"];const n=(l=t,Object.entries(l).reduce(((e,[t,n])=>(void 0!==n&&(e[t]=n),e)),{}));var l;E(n),V(n)},autoComplete:"off",layout:h,children:[m.jsx(D.Item,{name:"range-picker",label:"",children:m.jsx(Re,{allowEmpty:[!0,!1],ranges:{"本周":[H().startOf("week"),H().endOf("week")],"本月":[H().startOf("month"),H().endOf("month")],"本季度":[H().startOf("quarter"),H().endOf("quarter")],"本年":[H().startOf("year"),H().endOf("year")]},locale:B,style:{width:536,marginBottom:20}})}),G?m.jsxs(m.Fragment,{children:[m.jsx(D.Item,{label:"",name:"c3_name",children:m.jsx(R,{allowClear:!0,placeholder:"C3来源",showSearch:!0,optionFilterProp:"children",filterOption:(e,t)=>{var n;return(null!=(n=null==t?void 0:t.label)?n:"").toLowerCase().includes(e.toLowerCase())},options:Y,onChange:e=>{e?(P(!1),x(a[e].category.map((e=>({value:e.id,label:e.name})))),j(a[e].type.map((e=>({value:e.id,label:e.name})))),w(a[e].item.map((e=>({value:e.id,label:e.name})))),C(a[e].group.map((e=>({value:e.id,label:e.group_name})))),O(a[e].impact.map((e=>({value:e.id,label:e.name}))))):(t.resetFields(),P(!0))},style:{width:260,marginBottom:20}})}),m.jsx(D.Item,{label:"",name:"keyword",children:m.jsx(K,{allowClear:!0,placeholder:"Keyword",style:{width:260,marginBottom:20},disabled:M})}),m.jsx(D.Item,{label:"",name:"group_user",children:m.jsx(K,{allowClear:!0,placeholder:"Group User",style:{width:260,marginBottom:20},disabled:M})}),m.jsx(D.Item,{label:"",name:"category",children:m.jsx(R,{allowClear:!0,placeholder:"总类",showSearch:!0,disabled:M,optionFilterProp:"children",filterOption:(e,t)=>{var n;return(null!=(n=null==t?void 0:t.label)?n:"").toLowerCase().includes(e.toLowerCase())},options:p,style:{width:260,marginBottom:20}})}),m.jsx(D.Item,{label:"",name:"type",children:m.jsx(R,{allowClear:!0,placeholder:"子类",disabled:M,showSearch:!0,optionFilterProp:"children",filterOption:(e,t)=>{var n;return(null!=(n=null==t?void 0:t.label)?n:"").toLowerCase().includes(e.toLowerCase())},options:y,style:{width:260,marginBottom:20}})}),m.jsx(D.Item,{label:"",name:"item",children:m.jsx(R,{allowClear:!0,placeholder:"名目",showSearch:!0,disabled:M,optionFilterProp:"children",filterOption:(e,t)=>{var n;return(null!=(n=null==t?void 0:t.label)?n:"").toLowerCase().includes(e.toLowerCase())},options:v,style:{width:260,marginBottom:20}})}),m.jsx(D.Item,{label:"",name:"workgroup",children:m.jsx(R,{allowClear:!0,placeholder:"工作组",showSearch:!0,disabled:M,optionFilterProp:"children",filterOption:(e,t)=>{var n;return(null!=(n=null==t?void 0:t.label)?n:"").toLowerCase().includes(e.toLowerCase())},options:S,style:{width:260,marginBottom:20}})}),m.jsx(D.Item,{label:"",name:"impact",children:m.jsx(R,{allowClear:!0,placeholder:"影响级别",showSearch:!0,disabled:M,optionFilterProp:"children",filterOption:(e,t)=>{var n;return(null!=(n=null==t?void 0:t.label)?n:"").toLowerCase().includes(e.toLowerCase())},options:I,style:{width:260,marginBottom:20}})}),m.jsx(D.Item,{label:"",name:"status",children:m.jsx(R,{allowClear:!0,placeholder:"状态",showSearch:!0,disabled:M,optionFilterProp:"children",filterOption:(e,t)=>{var n;return(null!=(n=null==t?void 0:t.label)?n:"").toLowerCase().includes(e.toLowerCase())},options:Ye,style:{width:260,marginBottom:20}})}),m.jsx(D.Item,{label:"",name:"processing_time",children:m.jsx(K,{allowClear:!0,disabled:M,placeholder:"处理时长（单位：h）=解决时间-创建时间",style:{width:260,marginBottom:20}})})]}):"",m.jsx(D.Item,{style:{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"},children:m.jsxs("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"},children:[m.jsx(T,{type:"primary",htmlType:"submit",style:{marginRight:12},children:"搜索"}),m.jsx(T,{type:"default",onClick:()=>{t.resetFields(),P(!0),l([]),V({})},children:"重置"}),m.jsxs(T,{type:"link",onClick:()=>{U(!G)},children:[G?"收起":"展开",G?m.jsx(q,{}):m.jsx(_,{})]})]})})]}))}),m.jsx(L,{className:De,bordered:!1,children:m.jsx(N,{rowKey:e=>`${e.c3_name}-${e.no}`,size:"small",rowClassName:e=>"assigned"===e.status?Be:"",loading:i,columns:J,pagination:b,onChange:(e,t)=>{const l=JSON.parse(JSON.stringify(n));let r=[];for(const n in t)r=l.filter((e=>!(t[n]&&t[n].length>0)||t[n].includes(e[n])));k(c(o({},e),{total:(null==r?void 0:r.length)||0}))},dataSource:n,locale:je,scroll:{x:1500}})})]})},Ge=()=>{const e=u();return m.jsx(U,{status:"404",title:"404",subTitle:"抱歉，您访问的页面不存在。",extra:m.jsx(T,{type:"primary",onClick:()=>{e.push("/alert")},children:"跳转到首页"})})},Ue=()=>m.jsx(J,{children:m.jsxs(V,{children:[m.jsx(h,{path:"/login",component:de}),m.jsx(h,{path:"/",render:()=>m.jsx(oe,{children:m.jsxs(V,{children:[m.jsx(t,{path:"/alert",component:Le}),m.jsx(t,{path:"/ticket",component:qe}),m.jsx(t,{path:"/*",component:Ge}),m.jsx(W,{to:"/alert"})]})})})]})}),Je="_App_mlfty_1",Ve="_AppHeader_mlfty_13",We=()=>{const[e]=f.useState(pe[xe()]);return m.jsx(m.Fragment,{children:m.jsx("div",{className:Je,children:m.jsx("header",{className:Ve,children:m.jsx(ge,{children:m.jsx(Q,{locale:null==e?void 0:e.antd,children:m.jsx(Ue,{})})})})})})};X.render(m.jsxs(Z.StrictMode,{children:[m.jsx(ee,{children:m.jsx(We,{})}),","]}),document.getElementById("root"))}},function(){return ne||(0,te[l(te)[0]])((ne={exports:{}}).exports,ne),ne.exports});export default le();