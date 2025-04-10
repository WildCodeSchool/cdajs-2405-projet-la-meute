import{j as n}from"./jsx-runtime-DR9Q75dM.js";import{B as p}from"./Button-q5UOKopa.js";import{r as c,R as o}from"./index-DRjF_FHU.js";import"./index-Bmt1039H.js";import"./index-CxRLcT2J.js";const m=""+new URL("logo-pawplanner-symbol-beige-BK9ukH99.svg",import.meta.url).href;function f({variant:s="confirm",type:t="info",children:l,isOpen:r,onClose:a,filePreview:u=null,selectMenu:g,onSelectChange:h}){const i=c.useRef(null),[d,v]=c.useState(null),w={success:m,info:m,warning:m},y=o.Children.toArray(l).filter(e=>o.isValidElement(e)&&e.type==="p"),x=o.Children.toArray(l).filter(e=>o.isValidElement(e)&&e.type===p);if(y.length===0||x.length===0)throw new Error("Modal requires both a paragraph (<p>) and a Button component as children");c.useEffect(()=>{var j;const e=i.current;e&&(r?(e.showModal(),(j=i.current)==null||j.focus()):e.close())},[r]),c.useEffect(()=>{if(u){const e=URL.createObjectURL(u);return v(e),()=>{URL.revokeObjectURL(e)}}v(null)},[u]);const C=e=>{e.target===i.current&&a()},R=e=>{h&&h(e.target.value)};return n.jsxs("dialog",{ref:i,className:`modal modal--${t} modal--${s}`,onClick:C,onKeyDown:()=>"",children:[n.jsx("img",{src:d||w[t],alt:d?"selected file":`${t} icon`,className:"modal__picture"}),n.jsx("div",{className:"modal__prompt",children:y}),g&&n.jsxs("select",{id:"selected",name:"selected",className:"modal__selectInput",onChange:R,children:[n.jsx("option",{value:"",children:"Sélectionnez une option"}),g.map(e=>n.jsx("option",{value:e,children:e},e))]}),n.jsxs("div",{className:"modal__actions",children:[n.jsx("button",{type:"button",className:"modal__actions--cancel",onClick:a,children:"Annuler"}),x]})]})}f.__docgenInfo={description:"",methods:[],displayName:"Modal",props:{variant:{required:!1,tsType:{name:"literal",value:'"confirm"'},description:"",defaultValue:{value:'"confirm"',computed:!1}},type:{required:!1,tsType:{name:"union",raw:'"success" | "info" | "warning"',elements:[{name:"literal",value:'"success"'},{name:"literal",value:'"info"'},{name:"literal",value:'"warning"'}]},description:"",defaultValue:{value:'"info"',computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},isOpen:{required:!0,tsType:{name:"boolean"},description:""},onClose:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},filePreview:{required:!1,tsType:{name:"union",raw:"File | null",elements:[{name:"File"},{name:"null"}]},description:"",defaultValue:{value:"null",computed:!1}},selectMenu:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},onSelectChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""}}};const E={title:"molecules/Modal",tags:["autodocs"],component:f,decorators:[s=>n.jsx("div",{style:{width:"100%"},children:n.jsx(s,{})})]},_={args:{variant:"confirm",type:"info",isOpen:!0,onClose:()=>console.log("Modal closed")}};_.render=function(t){const[l,r]=o.useState(t.isOpen),a=()=>{r(!1),t.onClose()};return n.jsxs(n.Fragment,{children:[n.jsx(p,{style:"btn-dark",onClick:()=>r(!0),children:"Ouvrir Modal"}),n.jsxs(f,{...t,isOpen:l,onClose:a,children:[n.jsx("p",{children:"Êtes-vous sûr de vouloir continuer cette action?"}),n.jsx(p,{style:"btn-dark",onClick:a,children:"Confirmer"})]})]})};const O=["ConfirmModal"];export{_ as ConfirmModal,O as __namedExportsOrder,E as default};
