import{j as u}from"./jsx-runtime-DR9Q75dM.js";import{u as c}from"./index-D0-1SKyy.js";function m({style:t,type:r,children:n,href:e,className:b,onClick:o}){const s=t==="submit"?"submit":"button",i=typeof t=="object"?`thin-btn-light thin-btn-${t.color}`:t==="submit"?"btn-submit":t==="btn-dark"?"btn-dark":t==="invite"||t==="event"?"btn-invite":t==="role-select-left"?"btn-role-select-left":t==="role-select-right"?"btn-role-select-right":"btn-light",a=c();return e?u.jsx("a",{href:e,className:`button ${i}`,onClick:e==="back"?()=>a(-1):o,children:t==="invite"&&!n?"+ Inviter un client à s'inscrire":t==="event"&&!n?"+ Ajouter un évènement":n}):u.jsx("button",{type:r||s,className:`button ${i} ${b}`,onClick:o,children:t==="invite"&&!n?"+ Inviter un client à s'inscrire":t==="event"&&!n?"+ Ajouter un évènement":n})}m.__docgenInfo={description:"Button componnents",methods:[],displayName:"Button"};export{m as B};
