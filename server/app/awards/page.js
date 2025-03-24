(()=>{var e={};e.id=695,e.ids=[695],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},82361:e=>{"use strict";e.exports=require("events")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},29243:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>c,routeModule:()=>m,tree:()=>d});var a=r(50482),s=r(69108),n=r(62563),i=r.n(n),o=r(68300),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let d=["",{children:["awards",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,7820)),"/home/runner/work/portfolio/portfolio/nextjs/app/awards/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,19097)),"/home/runner/work/portfolio/portfolio/nextjs/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,69361,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/home/runner/work/portfolio/portfolio/nextjs/app/awards/page.tsx"],u="/awards/page",p={require:r,loadChunk:()=>Promise.resolve()},m=new a.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/awards/page",pathname:"/awards",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},28713:(e,t,r)=>{let a={"96ed5e9b5cfd2f2f80a8e27eb31a4f564e9a77de":()=>Promise.resolve().then(r.bind(r,36915)).then(e=>e.revalidateRootLayout)};async function s(e,...t){return(await a[e]()).apply(null,t)}e.exports={"96ed5e9b5cfd2f2f80a8e27eb31a4f564e9a77de":s.bind(null,"96ed5e9b5cfd2f2f80a8e27eb31a4f564e9a77de")}},46563:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,61476,23))},7825:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2583,23)),Promise.resolve().then(r.t.bind(r,26840,23)),Promise.resolve().then(r.t.bind(r,38771,23)),Promise.resolve().then(r.t.bind(r,13225,23)),Promise.resolve().then(r.t.bind(r,9295,23)),Promise.resolve().then(r.t.bind(r,43982,23))},16731:(e,t,r)=>{Promise.resolve().then(r.bind(r,1156))},7820:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var a=r(25036),s=r(11514);let n=({award:e})=>(0,a.jsxs)("div",{className:"award",children:[a.jsx("h2",{children:e.name}),a.jsx("p",{children:e.role.role}),a.jsx("div",{className:"award-details",children:e.details.map((e,t)=>a.jsx("p",{children:e.children[0].text},t))})]});async function i(){let e=await (0,s.HQ)();return(0,a.jsxs)("main",{className:"awards",children:[a.jsx("h1",{children:"Awards"}),a.jsx("div",{className:"awards-list",children:e.map(e=>a.jsx(n,{award:e},e._id))})]})}},19097:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d,metadata:()=>l});var a=r(25036),s=r(24260),n=r.n(s);r(67272);var i=r(16274);let o=()=>a.jsx("nav",{className:"navbar",children:(0,a.jsxs)("div",{className:"navbar-links",children:[a.jsx(i.default,{href:"/",className:"navbar-link",children:"Home"}),a.jsx(i.default,{href:"/timeline",className:"navbar-link",children:"Experience"}),a.jsx(i.default,{href:"/skills",className:"navbar-link",children:"Skills"}),a.jsx(i.default,{href:"/projects",className:"navbar-link",children:"Projects"}),a.jsx(i.default,{href:"/awards",className:"navbar-link",children:"Awards"}),a.jsx(i.default,{href:"/interests",className:"navbar-link",children:"Interests"}),a.jsx(i.default,{href:"/contact",className:"navbar-link",children:"Contact"})]})}),l={title:"Marcel Kornblum",description:"Generated by create next app"};function d({children:e}){return a.jsx("html",{lang:"en",className:n().variable,children:(0,a.jsxs)("body",{className:"body",children:[a.jsx(o,{}),e]})})}},11514:(e,t,r)=>{"use strict";r.d(t,{R0:()=>o,HQ:()=>c,vS:()=>l,E$:()=>i,gv:()=>u,mW:()=>n,SM:()=>d});let a=(0,r(74737).eI)({projectId:"ctyiavss",dataset:"production",apiVersion:"2023-05-03",useCdn:!0});var s=r(97433);async function n(){return a.fetch(s.Z`
        *[_type == "project"] {
            _id,
            name,
            date,
            image,
            details,
            role-> {
                role
            }
        }
    `)}async function i(){return a.fetch(s.Z`
        *[_type == "experience"] | order(start desc) {
            _id,
            role,
            start,
            end,
            details,
            company->{
                name,
                logo,
                link
            },
            slug
        }
    `)}async function o(){return a.fetch(s.Z`*[_type == "about"]`)}async function l(){return a.fetch(s.Z`*[_type == "contact"]`)}async function d(){return a.fetch(s.Z`
        *[_type == "skill"] {
            _id,
            name,
            details,
            evidence[] {
                point,
                role-> {
                    _id,
                    role,
                    start,
                    end,
                    slug
                }
            }
        }
    `)}async function c(){return a.fetch(s.Z`
        *[_type == "award"] {
            _id,
            name,
            details,
            role-> {
                role
            }
        }
    `)}async function u(){return a.fetch(s.Z`
        *[_type == "passion"] {
            _id,
            name,
            details
        }
    `)}},57481:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var a=r(70337);let s=e=>[{type:"image/x-icon",sizes:"16x16",url:(0,a.fillMetadataSegment)(".",e.params,"favicon.ico")+""}]},67272:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[638,565,435],()=>r(29243));module.exports=a})();