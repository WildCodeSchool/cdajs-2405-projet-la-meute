import{j as e}from"./jsx-runtime-DR9Q75dM.js";import{L as x}from"./index-Bmt1039H.js";import{R as r,r as v}from"./index-DRjF_FHU.js";import{B as p}from"./Button-CvrOE9iN.js";import{T as n}from"./TextInput-2AtmFPx3.js";import"./index-CxRLcT2J.js";import"./validationRules-DSUEyXvZ.js";function g({style:a="dark-blue",className:l,title:o,children:s,onSubmit:i}){const m=r.Children.toArray(s).filter(t=>r.isValidElement(t)&&t.type===p),d=r.Children.toArray(s).filter(t=>r.isValidElement(t)&&t.type===n),u=r.Children.toArray(s).filter(t=>r.isValidElement(t)&&t.type==="p"&&t.props.className==="introductiveText"),c=r.Children.toArray(s).filter(t=>!r.isValidElement(t)||t.type!==p&&t.type!==n&&t.props.className!=="introductiveText");return e.jsxs("form",{className:`form form--${a} ${l}`,onSubmit:i,children:[e.jsx("h2",{children:o}),u,e.jsx("div",{children:d}),e.jsx("div",{className:"form__buttons",children:m}),e.jsx("div",{className:"form__otherFields",children:c})]})}g.__docgenInfo={description:"",methods:[],displayName:"Form",props:{style:{required:!1,tsType:{name:"union",raw:'"dark-blue" | "beige"',elements:[{name:"literal",value:'"dark-blue"'},{name:"literal",value:'"beige"'}]},description:"",defaultValue:{value:'"dark-blue"',computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},title:{required:!0,tsType:{name:"string"},description:""},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},onSubmit:{required:!1,tsType:{name:"signature",type:"function",raw:"(e: React.FormEvent<HTMLFormElement>) => void",signature:{arguments:[{type:{name:"ReactFormEvent",raw:"React.FormEvent<HTMLFormElement>",elements:[{name:"HTMLFormElement"}]},name:"e"}],return:{name:"void"}}},description:""}}};const N={title:"molecules/Form",tags:["autodocs"],component:g,decorators:[a=>e.jsx("div",{style:{width:"100%",maxWidth:"500px",margin:"0 auto"},children:e.jsx(a,{})})]},y={args:{title:"Connectez-vous ici",className:"login__form",style:"dark-blue"}};y.render=function(l){const[o,s]=v.useState({email:"",password:""}),i=m=>{const{name:d,value:u}=m.target;s(c=>({...c,[d]:u}))};return e.jsxs(g,{...l,children:[e.jsx(n,{type:"email",name:"email",style:"dark",required:!0,isLogin:!0,value:o.email,onChange:i}),e.jsx(n,{type:"password",name:"password",style:"dark",required:!0,isLogin:!0,value:o.password,onChange:i}),e.jsx(p,{style:"submit",type:"submit",children:"Me connecter"}),e.jsxs("p",{className:"login__bottomLinks",children:["Si vous avez oublié votre mot de passe"," ",e.jsx(x,{to:"/reset-password",children:"cliquez ici"}),"."]}),e.jsxs("p",{className:"login__bottomLinks",children:["Si vous n'êtes pas inscrit, vous pouvez"," ",e.jsx(x,{to:"/registration",children:"vous inscrire ici"}),"."]}),e.jsx("p",{className:"login__errorMessage",children:"Message d'erreur exemple"})]})};const T=["LoginForm"];export{y as LoginForm,T as __namedExportsOrder,N as default};
