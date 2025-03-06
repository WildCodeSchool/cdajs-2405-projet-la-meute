import{T as L}from"./TextInput-Dpb6CeAB.js";import"./jsx-runtime-DR9Q75dM.js";import"./index-DRjF_FHU.js";const v={title:"atoms/TextInput",component:L,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{type:{control:"select",options:["email","password","confirmPassword","lastname","firstname","city","postal_code","SIRET","company_name","telephone","description","name","birthDate","breed","info"],description:"Type of input field"},required:{control:"boolean",description:"Whether the field is required"},inputType:{control:"select",options:["input","textarea","date"],description:"HTML input type"},style:{control:"select",options:["dark","light"],description:"Visual style of the input"},label:{control:"text",description:"Custom label (overrides default label from type)"},placeholder:{control:"text",description:"Custom placeholder (overrides default placeholder from type)"},className:{control:"text",description:"Additional CSS classes"},isLogin:{control:"boolean",description:"Whether the input is used in a login form"}}},e={args:{type:"firstname",style:"light",required:!0}},r={args:{type:"password",style:"dark",required:!0}},t={args:{type:"confirmPassword",style:"dark",required:!0}},s={args:{type:"description",inputType:"textarea",style:"light"}},a={args:{type:"birthDate",inputType:"date",style:"light"}},o={args:{type:"email",style:"dark",required:!0}},n={args:{type:"email",style:"light",required:!0,isLogin:!0}};var i,p,c;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    type: "firstname",
    style: "light",
    required: true
  }
}`,...(c=(p=e.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var d,l,u;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    type: "password",
    style: "dark",
    required: true
  }
}`,...(u=(l=r.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var m,y,g;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    type: "confirmPassword",
    style: "dark",
    required: true
  }
}`,...(g=(y=t.parameters)==null?void 0:y.docs)==null?void 0:g.source}}};var h,f,T;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    type: "description",
    inputType: "textarea",
    style: "light"
  }
}`,...(T=(f=s.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var q,x,w;a.parameters={...a.parameters,docs:{...(q=a.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    type: "birthDate",
    inputType: "date",
    style: "light"
  }
}`,...(w=(x=a.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};var S,b,k;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    type: "email",
    style: "dark",
    required: true
  }
}`,...(k=(b=o.parameters)==null?void 0:b.docs)==null?void 0:k.source}}};var D,I,P;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    type: "email",
    style: "light",
    required: true,
    isLogin: true
  }
}`,...(P=(I=n.parameters)==null?void 0:I.docs)==null?void 0:P.source}}};const E=["Default","Password","PasswordConfirmation","TextArea","DateInput","DarkTheme","LoginInput"];export{o as DarkTheme,a as DateInput,e as Default,n as LoginInput,r as Password,t as PasswordConfirmation,s as TextArea,E as __namedExportsOrder,v as default};
