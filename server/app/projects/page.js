(()=>{var e={};e.id=895,e.ids=[895],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},82361:e=>{"use strict";e.exports=require("events")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},28547:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>d,routeModule:()=>m,tree:()=>c});var s=r(50482),n=r(69108),a=r(62563),i=r.n(a),o=r(68300),l={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);r.d(t,l);let c=["",{children:["projects",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,69629)),"/home/runner/work/portfolio/portfolio/nextjs/app/projects/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,19097)),"/home/runner/work/portfolio/portfolio/nextjs/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,69361,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["/home/runner/work/portfolio/portfolio/nextjs/app/projects/page.tsx"],p="/projects/page",u={require:r,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:n.x.APP_PAGE,page:"/projects/page",pathname:"/projects",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},28713:(e,t,r)=>{let s={"96ed5e9b5cfd2f2f80a8e27eb31a4f564e9a77de":()=>Promise.resolve().then(r.bind(r,36915)).then(e=>e.revalidateRootLayout)};async function n(e,...t){return(await s[e]()).apply(null,t)}e.exports={"96ed5e9b5cfd2f2f80a8e27eb31a4f564e9a77de":n.bind(null,"96ed5e9b5cfd2f2f80a8e27eb31a4f564e9a77de")}},46563:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,61476,23))},7825:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2583,23)),Promise.resolve().then(r.t.bind(r,26840,23)),Promise.resolve().then(r.t.bind(r,38771,23)),Promise.resolve().then(r.t.bind(r,13225,23)),Promise.resolve().then(r.t.bind(r,9295,23)),Promise.resolve().then(r.t.bind(r,43982,23))},75147:(e,t,r)=>{Promise.resolve().then(r.bind(r,1156)),Promise.resolve().then(r.t.bind(r,31900,23))},19097:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c,metadata:()=>l});var s=r(25036),n=r(24260),a=r.n(n);r(67272);var i=r(16274);let o=()=>s.jsx("nav",{className:"navbar",children:(0,s.jsxs)("div",{className:"navbar-links",children:[s.jsx(i.default,{href:"/",className:"navbar-link",children:"Home"}),s.jsx(i.default,{href:"/timeline",className:"navbar-link",children:"Experience"}),s.jsx(i.default,{href:"/skills",className:"navbar-link",children:"Skills"}),s.jsx(i.default,{href:"/projects",className:"navbar-link",children:"Projects"}),s.jsx(i.default,{href:"/awards",className:"navbar-link",children:"Awards"}),s.jsx(i.default,{href:"/interests",className:"navbar-link",children:"Interests"}),s.jsx(i.default,{href:"/contact",className:"navbar-link",children:"Contact"})]})}),l={title:"Marcel Kornblum",description:"Generated by create next app"};function c({children:e}){return s.jsx("html",{lang:"en",className:a().variable,children:(0,s.jsxs)("body",{className:"body",children:[s.jsx(o,{}),e]})})}},69629:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var s=r(25036),n=r(11514),a=r(73674),i=r(2813);let o=({project:e})=>(0,s.jsxs)("div",{className:"project",children:[s.jsx("h2",{children:e.name}),(0,s.jsxs)("div",{className:"project-header",children:[e.image&&s.jsx(i.default,{src:e.image.asset.url,alt:e.name,width:200,height:100}),s.jsx("p",{children:e.role.role}),s.jsx("p",{children:(0,a.WU)(new Date(e.date),"MMM yyyy")})]}),s.jsx("div",{className:"project-details",children:e.details.map((e,t)=>s.jsx("p",{children:e.children[0].text},t))})]});async function l(){let e=await (0,n.mW)();return(0,s.jsxs)("main",{className:"projects",children:[s.jsx("h1",{children:"Projects"}),s.jsx("div",{className:"projects-list",children:e.map(e=>s.jsx(o,{project:e},e._id))})]})}},11514:(e,t,r)=>{"use strict";r.d(t,{R0:()=>o,HQ:()=>d,vS:()=>l,E$:()=>i,gv:()=>p,mW:()=>a,SM:()=>c});let s=(0,r(74737).eI)({projectId:"ctyiavss",dataset:"production",apiVersion:"2023-05-03",useCdn:!0});var n=r(97433);async function a(){return s.fetch(n.Z`
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
    `)}async function i(){return s.fetch(n.Z`
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
    `)}async function o(){return s.fetch(n.Z`*[_type == "about"]`)}async function l(){return s.fetch(n.Z`*[_type == "contact"]`)}async function c(){return s.fetch(n.Z`
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
    `)}async function d(){return s.fetch(n.Z`
        *[_type == "award"] {
            _id,
            name,
            details,
            role-> {
                role
            }
        }
    `)}async function p(){return s.fetch(n.Z`
        *[_type == "passion"] {
            _id,
            name,
            details
        }
    `)}},57481:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});var s=r(70337);let n=e=>[{type:"image/x-icon",sizes:"16x16",url:(0,s.fillMetadataSegment)(".",e.params,"favicon.ico")+""}]},67272:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[638,565,435,674,861],()=>r(28547));module.exports=s})();