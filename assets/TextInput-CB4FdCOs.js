import{j as e}from"./jsx-runtime-DR9Q75dM.js";import{R as X,r as i}from"./index-DRjF_FHU.js";import{v as n}from"./validationRules-BjahIRag.js";const C=({fill:a="currentColor",className:r=""})=>e.jsxs("svg",{className:r,xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:a,stroke:"#FAF4E6",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("title",{children:"Eye"}),e.jsx("path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}),e.jsx("circle",{cx:"12",cy:"12",r:"3"})]});C.__docgenInfo={description:"",methods:[],displayName:"Eye",props:{fill:{defaultValue:{value:'"currentColor"',computed:!1},required:!1},className:{defaultValue:{value:'""',computed:!1},required:!1}}};const M=({fill:a="currentColor",className:r=""})=>e.jsxs("svg",{className:r,xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:a,stroke:"#FAF4E6",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("title",{children:"Eye-off"}),e.jsx("path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}),e.jsx("path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}),e.jsx("path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}),e.jsx("path",{d:"m2 2 20 20"})]});M.__docgenInfo={description:"",methods:[],displayName:"EyeOff",props:{fill:{defaultValue:{value:'"currentColor"',computed:!1},required:!1},className:{defaultValue:{value:'""',computed:!1},required:!1}}};const J={email:{mappedLabel:"Email",mappedPlaceholder:"Entrez votre email",mappedName:"email",validationRules:{pattern:n.EMAIL.pattern,message:n.EMAIL.message},maxLength:255},password:{mappedLabel:"Mot de passe",mappedPlaceholder:"Entrez votre mot de passe",mappedName:"password",validationRules:{pattern:n.PASSWORD.pattern,message:n.PASSWORD.message},maxLength:255},confirmPassword:{mappedLabel:"Confirmation mot de passe",mappedPlaceholder:"Confirmer le mot de passe",mappedName:"confirmPassword",maxLength:255},oldPassword:{mappedLabel:"Ancien mot de passe",mappedPlaceholder:"Entrez votre ancien mot de passe",mappedName:"oldPassword",maxLength:255},lastname:{mappedLabel:"Nom",mappedPlaceholder:"Entrez votre nom",mappedName:"lastname",maxLength:255},firstname:{mappedLabel:"Prénom",mappedPlaceholder:"Entrez votre prénom",mappedName:"firstname",maxLength:255},city:{mappedLabel:"Ville",mappedPlaceholder:"Entrez votre ville",mappedName:"city",maxLength:50},postal_code:{mappedLabel:"Code Postal",mappedPlaceholder:"Entrez votre code postal",mappedName:"postal_code",validationRules:{pattern:n.POSTAL_CODE.pattern,message:n.POSTAL_CODE.message},maxLength:5},SIRET:{mappedLabel:"SIRET",mappedPlaceholder:"Entrez votre SIRET",mappedName:"SIRET",validationRules:{pattern:n.SIRET.pattern,message:n.SIRET.message},maxLength:14},company_name:{mappedLabel:"Nom de l'entreprise",mappedPlaceholder:"Entrez le nom de votre entreprise",mappedName:"company_name",maxLength:255},telephone:{mappedLabel:"Numéro de téléphone",mappedPlaceholder:"Entrez votre numéro de téléphone",mappedName:"telephone",validationRules:{pattern:n.PHONE.pattern,message:n.PHONE.message},maxLength:15},description:{mappedLabel:"Description",mappedPlaceholder:"Entrez votre description",mappedName:"description",maxLength:1e3},name:{mappedLabel:"Nom de mon chien",mappedPlaceholder:"Entrez le nom de votre chien",mappedName:"name",maxLength:255},birthDate:{mappedLabel:"Date de naissance de mon chien",mappedPlaceholder:"Sélectionnez la date de naissance",mappedName:"birthDate"},breed:{mappedLabel:"Race de mon chien",mappedPlaceholder:"Entrez la race de votre chien",mappedName:"breed",maxLength:255},info:{mappedLabel:"Informations complémentaires",mappedPlaceholder:"Entrez un commentaire sur votre chien",mappedName:"info",maxLength:255},title:{mappedLabel:"Nom de l'évènement",mappedPlaceholder:"Entrez le nom de l'évènement",mappedName:"title",maxLength:255}},K=X.forwardRef(({type:a,required:r=!1,inputType:L="input",style:S="light",passwordRef:_,isLogin:f=!1,label:q,placeholder:z,className:A="",name:H,value:l,count:O,onChange:E},v)=>{var y,j;const[c,D]=i.useState(!1),[o,w]=i.useState(""),[V,k]=i.useState(l.length),[F,$]=i.useState(!1),d=J[a],B=q||d.mappedLabel||"",T=z||d.mappedPlaceholder||"",u=d.maxLength||1e3,m=(y=d.validationRules)==null?void 0:y.pattern,h=((j=d.validationRules)==null?void 0:j.message)||"Format invalide",P=H||d.mappedName||a,W=r?" *":"",G=i.useRef(null);i.useImperativeHandle(v,()=>G.current);const p=`textInput-${a}`,b=a==="password"||a==="confirmPassword"||a==="oldPassword",U=t=>m?m.test(t):!0,N=()=>{if(f)return!0;let t=!0,s="";return r&&!l.trim()?(t=!1,s=a==="password"?h:"Ce champ est requis"):a==="password"&&!U(l)?(t=!1,s=h):a==="confirmPassword"&&_!==l?(t=!1,s="Les mots de passe ne correspondent pas."):m&&l.trim()&&!m.test(l)&&(t=!1,s=h),w(s),t},R=()=>{$(!0),N()},I=t=>{if(E&&E(t),k(t.target.value.length),a==="password"||F)if(a==="password"){const s=m?m.test(t.target.value):!0;w(s?"":h)}else N()},g=u-V;let x="default";return g<=u*.2&&(x="warning"),g===0&&(x="error"),e.jsxs("div",{className:`textInput ${A} textInput__${S} ${!f&&o?"has-error":""} ${O&&"length-counter"}`,"data-error":o,"data-count":`Caractères restants : ${g}`,"data-color":x,children:[e.jsxs("label",{htmlFor:p,children:[B,W]}),L==="textarea"?e.jsx("textarea",{id:p,name:P,ref:v,placeholder:T,value:l,required:r,onChange:I,onBlur:R,maxLength:u,"aria-invalid":!!o,"aria-describedby":o?`${p}-error`:void 0}):e.jsx("input",{id:p,name:P,ref:v,type:b?c?"text":"password":L==="date"?"date":"text",placeholder:T,value:l,required:r,onChange:I,onBlur:R,maxLength:u,"aria-invalid":!!o,"aria-describedby":o?`${p}-error`:void 0}),b&&e.jsx("button",{type:"button",onMouseDown:t=>{t.preventDefault(),D(!c)},className:"password-toggle","aria-label":c?"Masquer le mot de passe":"Afficher le mot de passe",children:c?e.jsx(M,{className:"eyes",fill:"none"}):e.jsx(C,{className:"eyes",fill:"none"})}),a==="password"&&!f&&e.jsx("div",{className:"password-info",children:"Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."})]})});K.__docgenInfo={description:"TextInput Component",methods:[],displayName:"TextInput",props:{type:{required:!0,tsType:{name:"union",raw:`| "email"
| "password"
| "confirmPassword"
| "oldPassword"
| "lastname"
| "firstname"
| "city"
| "postal_code"
| "SIRET"
| "company_name"
| "telephone"
| "description"
| "name"
| "birthDate"
| "breed"
| "info"
| "title"`,elements:[{name:"literal",value:'"email"'},{name:"literal",value:'"password"'},{name:"literal",value:'"confirmPassword"'},{name:"literal",value:'"oldPassword"'},{name:"literal",value:'"lastname"'},{name:"literal",value:'"firstname"'},{name:"literal",value:'"city"'},{name:"literal",value:'"postal_code"'},{name:"literal",value:'"SIRET"'},{name:"literal",value:'"company_name"'},{name:"literal",value:'"telephone"'},{name:"literal",value:'"description"'},{name:"literal",value:'"name"'},{name:"literal",value:'"birthDate"'},{name:"literal",value:'"breed"'},{name:"literal",value:'"info"'},{name:"literal",value:'"title"'}]},description:""},required:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},passwordRef:{required:!1,tsType:{name:"union",raw:"string | React.RefObject<HTMLInputElement>",elements:[{name:"string"},{name:"ReactRefObject",raw:"React.RefObject<HTMLInputElement>",elements:[{name:"HTMLInputElement"}]}]},description:""},isLogin:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},inputType:{required:!1,tsType:{name:"union",raw:'"input" | "textarea" | "date"',elements:[{name:"literal",value:'"input"'},{name:"literal",value:'"textarea"'},{name:"literal",value:'"date"'}]},description:"",defaultValue:{value:'"input"',computed:!1}},style:{required:!1,tsType:{name:"union",raw:'"dark" | "light"',elements:[{name:"literal",value:'"dark"'},{name:"literal",value:'"light"'}]},description:"",defaultValue:{value:'"light"',computed:!1}},label:{required:!1,tsType:{name:"string"},description:""},placeholder:{required:!1,tsType:{name:"string"},description:""},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},name:{required:!1,tsType:{name:"string"},description:""},count:{required:!1,tsType:{name:"boolean"},description:""},value:{required:!0,tsType:{name:"string"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:`(
	e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => void`,signature:{arguments:[{type:{name:"ReactChangeEvent",raw:"React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>",elements:[{name:"union",raw:"HTMLInputElement | HTMLTextAreaElement",elements:[{name:"HTMLInputElement"},{name:"HTMLTextAreaElement"}]}]},name:"e"}],return:{name:"void"}}},description:""}}};export{K as T};
