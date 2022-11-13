#!/usr/bin/env node
"use strict";var q=Object.create;var x=Object.defineProperty;var J=Object.getOwnPropertyDescriptor;var R=Object.getOwnPropertyNames,w=Object.getOwnPropertySymbols,W=Object.getPrototypeOf,F=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable;var D=(e,t,s)=>t in e?x(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,y=(e,t)=>{for(var s in t||(t={}))F.call(t,s)&&D(e,s,t[s]);if(w)for(var s of w(t))z.call(t,s)&&D(e,s,t[s]);return e};var B=(e,t,s,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of R(t))!F.call(e,o)&&o!==s&&x(e,o,{get:()=>t[o],enumerable:!(n=J(t,o))||n.enumerable});return e};var v=(e,t,s)=>(s=e!=null?q(W(e)):{},B(t||!e||!e.__esModule?x(s,"default",{value:e,enumerable:!0}):s,e));var L=require("commander");var $={name:"@sugarat/ghost",version:"0.1.3",description:"phantom dependency scanning tool - \u5E7D\u7075\u4F9D\u8D56\u626B\u63CF\u5DE5\u5177",main:"dist/index.js",types:"dist/index.d.ts",repository:{type:"git",url:"https://github.com/ATQQ/tools",directory:"packages/cli/ghost"},homepage:"https://github.com/ATQQ/tools/blob/main/packages/cli/ghost/README.md",bin:{scan:"dist/bin.js"},files:["dist"],scripts:{dev:"tsup --watch",build:"tsup --minify",prepublish:"pnpm build"},keywords:["phantom dependency","phantom","ghost dependency","CLI","\u5E7D\u7075\u4F9D\u8D56","\u5E7B\u5F71\u4F9D\u8D56"],author:"ATQQ",license:"MIT",dependencies:{commander:"^9.2.0",gogocode:"^1.0.53","validate-npm-package-name":"^4.0.0"}};var u=require("fs"),f=v(require("path"));var p=require("fs"),a=require("path"),k=v(require("gogocode")),I=v(require("validate-npm-package-name"));var l=[".css",".scss",".sass",".less"],d=[".js",".jsx",".ts",".tsx"],b=[".vue"];function O(e,t,s={}){var P,j;let n=[e].flat(),o=t&&(0,p.existsSync)(t)?JSON.parse((0,p.readFileSync)(t,"utf-8")):{},c=y(y({},o.dependencies),o.devDependencies),r=[],T=[...l,...d,...b];for(let i of n)!(0,p.existsSync)(i)||((0,p.statSync)(i).isDirectory()?r.push(..._(i,T)):r.push(i));r=[...new Set(r)];let E=[];for(let i of r){let V=K((0,p.readFileSync)(i,"utf-8"),(0,a.parse)(i).ext).filter(h=>X(i,h)).map(h=>Y(h));E.push(...V)}let g=new Set(E);for(let i of Object.keys(c))g.has(i)&&g.delete(i);let M=(P=s.exclude)!=null?P:[],N=!((j=s.includeNodeLib)!=null&&j);return[...g].filter(i=>!Q(i,M)).filter(i=>!N||!G(i)).filter(i=>N||!G(i)?Z(i):!0)}function K(e,t){let s=[];return d.includes(t)&&s.push(...C(e)),l.includes(t)&&s.push(...A(e)),b.includes(t)&&s.push(...U(e)),s}function U(e){let t=[],n=(0,k.default)(e.replace(/<script(.*)setup(.*)>/,"<script$1$2>"),{parseOptions:{language:"vue"}}).find("<script><\/script>").generate().trim();return t.push(...C(n)),t.push(...A(e)),t}function A(e){var o;let t=[],s=/^@import\s+['"](.*)?['"]/,n=e.split(`
`);for(let c of n){let r=(o=c.trim().match(s))==null?void 0:o[1];r&&t.push(r)}return t}function C(e){let t=[],s=(0,k.default)(e);if(!s.find)return t;let n=o=>{let c=o.attr("source.value");t.push(c)};return s.find({type:"ImportDeclaration"}).each(n),s.find({type:"ExportNamedDeclaration"}).each(n),s.find("import($_$)").each(o=>{var r;let c=(r=o.match[0][0])==null?void 0:r.value;t.push(c)}),s.find("require($_$)").each(o=>{var r;let c=(r=o.match[0][0])==null?void 0:r.value;t.push(c)}),t}function _(e,t=[],s=["node_modules",".git",".vscode"]){let n=(0,p.readdirSync)(e,{withFileTypes:!0}),o=[];for(let c of n){let r=(0,a.join)(e,c.name);Q(r,s)||(c.isFile()&&(t.length===0||t.includes((0,a.parse)(r).ext))&&o.push(r),c.isDirectory()&&o.push(..._(r,t,s)))}return o}function Q(e,t){return[t].flat().filter(n=>n).findIndex(n=>typeof n=="string"?e.includes(n):n.test(e))!==-1}function X(e,t){let{dir:s}=(0,a.parse)(e);return t?t.includes("node_modules")?!0:!(["./","../","@/","~@/","`"].some(n=>t.startsWith(n))||["",...l,...d].some(n=>(0,p.existsSync)((0,a.join)(s,`${t}${n}`)))):!1}function Y(e){let t=e.replace(/~/g,"").replace(/.*node_modules\//,"").split("/");return t[0].startsWith("@")?t.slice(0,2).join("/"):t[0]}function G(e){return/^(?:assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib)$/.test(e)}function Z(e){return(0,I.default)(e).validForNewPackages}function m(e,t){e.length||e.push("src");let s=e.map(c=>f.default.resolve(process.cwd(),c)).filter(c=>(0,u.existsSync)(c)),n=f.default.resolve(process.cwd(),t.pkg||"package.json");(0,u.existsSync)(n)&&(0,u.statSync)(n).isDirectory()&&(n=f.default.resolve(n,"package.json"));let o=O(s,n,{includeNodeLib:t.node});console.log(o.length,"\u{1F47B}"),console.log(o)}var S=new L.Command;S.version($.version);S.command("scan [paths...]").description("Scan a directory or file for phantom dependency").alias("s").option("-p, --pkg <path>","set package.json path").option("-n, --node","include node lib {fs, path, etc}").action(m);S.parse(process.argv);
//# sourceMappingURL=bin.js.map