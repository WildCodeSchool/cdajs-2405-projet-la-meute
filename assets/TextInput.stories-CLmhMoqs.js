import{T as I}from"./TextInput-bcS45L5J.js";import"./jsx-runtime-DR9Q75dM.js";import"./index-DRjF_FHU.js";import"./validationRules-BjahIRag.js";const E={title:"atoms/TextInput",component:I,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{type:{control:"select",options:["email","password","confirmPassword","lastname","firstname","city","postal_code","SIRET","company_name","telephone","description","name","birthDate","breed","info"],description:"Type of input field"},required:{control:"boolean",description:"Whether the field is required"},inputType:{control:"select",options:["input","textarea","date"],description:"HTML input type"},style:{control:"select",options:["dark","light"],description:"Visual style of the input"},label:{control:"text",description:"Custom label (overrides default label from type)"},placeholder:{control:"text",description:"Custom placeholder (overrides default placeholder from type)"},className:{control:"text",description:"Additional CSS classes"},isLogin:{control:"boolean",description:"Whether the input is used in a login form"}}},a={args:{type:"firstname",style:"light",required:!0,value:"",onChange:e=>console.log("Value changed:",e.target.value)}},r={args:{type:"password",style:"dark",required:!0,value:"",onChange:e=>console.log("Value changed:",e.target.value)}},t={args:{type:"confirmPassword",style:"dark",required:!0,value:"",onChange:e=>console.log("Value changed:",e.target.value)}},o={args:{type:"description",inputType:"textarea",style:"light",value:"",onChange:e=>console.log("Value changed:",e.target.value)}},n={args:{type:"birthDate",inputType:"date",style:"light",value:"",onChange:e=>console.log("Value changed:",e.target.value)}},s={args:{type:"email",style:"dark",required:!0,value:"",onChange:e=>console.log("Value changed:",e.target.value)}},l={args:{type:"email",style:"light",required:!0,isLogin:!0,value:"",onChange:e=>console.log("Value changed:",e.target.value)}};var c,i,u;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    type: "firstname",
    style: "light",
    required: true,
    value: "",
    onChange: e => console.log("Value changed:", e.target.value)
  }
}`,...(u=(i=a.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};var p,d,g;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    type: "password",
    style: "dark",
    required: true,
    value: "",
    onChange: e => console.log("Value changed:", e.target.value)
  }
}`,...(g=(d=r.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var m,h,y;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    type: "confirmPassword",
    style: "dark",
    required: true,
    value: "",
    onChange: e => console.log("Value changed:", e.target.value)
  }
}`,...(y=(h=t.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var v,f,C;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    type: "description",
    inputType: "textarea",
    style: "light",
    value: "",
    onChange: e => console.log("Value changed:", e.target.value)
  }
}`,...(C=(f=o.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};var T,V,q;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    type: "birthDate",
    inputType: "date",
    style: "light",
    value: "",
    onChange: e => console.log("Value changed:", e.target.value)
  }
}`,...(q=(V=n.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};var x,w,S;s.parameters={...s.parameters,docs:{...(x=s.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    type: "email",
    style: "dark",
    required: true,
    value: "",
    onChange: e => console.log("Value changed:", e.target.value)
  }
}`,...(S=(w=s.parameters)==null?void 0:w.docs)==null?void 0:S.source}}};var b,k,D;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    type: "email",
    style: "light",
    required: true,
    isLogin: true,
    value: "",
    onChange: e => console.log("Value changed:", e.target.value)
  }
}`,...(D=(k=l.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};const W=["Default","Password","PasswordConfirmation","TextArea","DateInput","DarkTheme","LoginInput"];export{s as DarkTheme,n as DateInput,a as Default,l as LoginInput,r as Password,t as PasswordConfirmation,o as TextArea,W as __namedExportsOrder,E as default};
