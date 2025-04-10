import{S as n}from"./SearchBar-CB-Z8are.js";import"./jsx-runtime-DR9Q75dM.js";import"./index-DRjF_FHU.js";const m={title:"atoms/SearchBar",component:n,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"A search bar component with an input field and a submit button."}}}},o={args:{onSearch:a=>{console.log("Searching for:",a)}},parameters:{docs:{description:{story:"Default search bar with placeholder text and submit button"}}}};var e,t,r;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    onSearch: (query: string) => {
      // biome-ignore lint/suspicious/noConsoleLog: Storybook documentation
      console.log("Searching for:", query);
    }
  },
  parameters: {
    docs: {
      description: {
        story: "Default search bar with placeholder text and submit button"
      }
    }
  }
}`,...(r=(t=o.parameters)==null?void 0:t.docs)==null?void 0:r.source}}};const p=["Default"];export{o as Default,p as __namedExportsOrder,m as default};
