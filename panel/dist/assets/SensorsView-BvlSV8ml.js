import{p as E,r as _,q as c,d as C,a as k,o as d,b as f,w as o,E as N,e as t,c as x,f as B,g as u,t as m,s as V,F as b,h as $,i as A,j as F,k as M,l as T,m as j,_ as q}from"./index-ce5FYkX7.js";/* empty css                */const D=E("sensor",()=>{const n=_([]),l=_({}),r=_(!1);return{sensors:n,loading:r,getSensors:async()=>{r.value=!0;try{const s=await c.get("sensors");n.value=s.data}catch(s){console.error("Error fetching sensors:",s)}finally{r.value=!1}},registerNewSensor:async s=>{try{const{data:e}=await c.post("sensors",s);n.value.push(e)}catch(e){console.error("Error registering new sensor:",e)}},addNewAlertTrigger:async s=>{try{await c.post("sensors/alert-trigger",s)}catch(e){console.error("Error registering new trigger:",e)}},getSensor:async s=>{try{r.value=!0;const e=await c.get(`sensors/${s}`);return l.value=e.data,r.value=!1,e.data}catch(e){console.error("Error fetching sensor:",e)}}}}),I={class:"card-content"},L={class:""},R={class:""},z=C({__name:"SensorsView",setup(n){const{getSensors:l,sensors:r,loading:w}=D();k(async()=>{await l()});function g(i){$.push(`/installation/${i.id}`)}return(i,h)=>{const s=A,e=F,S=M,v=T,y=j,p=N;return d(),f(p,{class:"container"},{default:o(()=>[t(p,null,{default:o(()=>[t(y,null,{default:o(()=>[t(v,null,{default:o(()=>[t(S,null,{default:o(()=>[(d(!0),x(b,null,B(V(r),a=>(d(),f(e,{xs:24,sm:12,md:8,lg:6,key:a.id},{default:o(()=>[t(s,{onClick:G=>g(a),class:"card"},{default:o(()=>[u("div",I,[u("div",L,m(a.alias),1),u("div",R,m(a.code),1)])]),_:2},1032,["onClick"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}}}),K=q(z,[["__scopeId","data-v-5c0362c9"]]);export{K as default};