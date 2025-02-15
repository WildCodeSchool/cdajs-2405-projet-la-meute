import{j as u}from"./jsx-runtime-DR9Q75dM.js";import{r,a as w}from"./index-DRjF_FHU.js";import"./index-CxRLcT2J.js";import{c as T,R as d}from"./index-D0-1SKyy.js";/**
 * React Router DOM v6.26.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const F="6";try{window.__reactRouterVersion=F}catch{}const U="startTransition",m=w[U];function b(t){let{basename:S,children:f,future:i,window:p}=t,s=r.useRef();s.current==null&&(s.current=T({window:p,v5Compat:!0}));let e=s.current,[n,o]=r.useState({action:e.action,location:e.location}),{v7_startTransition:a}=i||{},c=r.useCallback(l=>{a&&m?m(()=>o(l)):o(l)},[o,a]);return r.useLayoutEffect(()=>e.listen(c),[e,c]),r.createElement(d,{basename:S,children:f,location:n.location,navigationType:n.action,navigator:e,future:i})}var h;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(h||(h={}));var R;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(R||(R={}));const v=t=>u.jsx(b,{children:u.jsx(t,{})}),I={decorators:[v],parameters:{controls:{matchers:{color:/(background|color)$/i,date:/Date$/}}}};export{I as default};
