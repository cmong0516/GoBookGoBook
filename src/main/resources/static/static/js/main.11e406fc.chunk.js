(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{68:function(e,c,t){},87:function(e,c,t){},99:function(e,c,t){"use strict";t.r(c);var n=t(0),s=t.n(n),a=t(21),r=t.n(a),i=(t(68),t(42)),j=t(106),l=t(107),b=t(102),o=t(104),d=t(103),h=t(105),O=t(25),x=t(8),u=t(9),p=t(33),g=t.n(p),m=t(1);var f=function(){var e=Object(n.useState)(),c=Object(u.a)(e,2),t=c[0],s=c[1];return Object(n.useEffect)((function(){g.a.get("/api/bestseller").then((function(e){s(e.data)})).catch((function(e){alert("\ub3c4\uc11c \ub370\uc774\ud130\ub97c \ubc1b\uc544\uc624\ub294 \ub370 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4."),console.log(e)}))}),[]),Object(m.jsx)("div",{className:"row",children:t&&t.map((function(e,c){return Object(m.jsxs)("div",{className:"col-lg-2 col-md-3 col-sm-4",children:[Object(m.jsx)("img",{src:e.coverLargeUrl,width:"90%"}),Object(m.jsx)("p",{children:e.title}),e.author," | ",e.publisher]},e.itemId)}))})};var v,k,w=function(){var e=Object(n.useState)(),c=Object(u.a)(e,2),t=c[0],s=c[1];return Object(n.useEffect)((function(){g.a.get("/api/newbook").then((function(e){console.log(e.data),console.log(Array.isArray(e.data)),s(e.data)})).catch((function(e){alert("\ub3c4\uc11c \ub370\uc774\ud130\ub97c \ubc1b\uc544\uc624\ub294 \ub370 \uc2e4\ud328\ud588\uc2b5\ub2c8\ub2e4."),console.log(e)}))}),[]),Object(m.jsx)("div",{className:"row",children:t&&t.map((function(e,c){return Object(m.jsxs)("div",{className:"col-lg-2 col-md-3 col-sm-4",children:[Object(m.jsx)("img",{src:e.coverLargeUrl,width:"90%"}),Object(m.jsx)("p",{children:e.title}),e.author," | ",e.publisher]},e.itemId)}))})},N=(t(87),t(43)),y=N.a.div(v||(v=Object(i.a)(["\n  width : 80%;\n  margin : auto;\n"]))),L=N.a.div(k||(k=Object(i.a)(["\n  text-align: right;\n  padding : 20pt;\n  font-size : 13pt;\n  background-color: hsl(146, 45%, 36%);\n  color: floralwhite;\n"])));var S=function(){return Object(m.jsxs)("div",{className:"App",children:[Object(m.jsxs)(L,{children:[Object(m.jsx)("span",{children:"\ub85c\uadf8\uc778"}),Object(m.jsx)("span",{children:" | "}),Object(m.jsx)("span",{children:"\ud68c\uc6d0\uac00\uc785"}),Object(m.jsx)("span",{children:" | "}),Object(m.jsx)("span",{children:"\ub9c8\uc774\ud398\uc774\uc9c0"}),Object(m.jsxs)(j.a,{className:"my-5 w-50 mx-auto",children:[Object(m.jsx)(l.a,{size:"lg",type:"search",placeholder:"\uac80\uc0c9\uc744 \uc6d0\ud558\ub294 \ucc45, \uc800\uc790\ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694.","aria-label":"Search"}),Object(m.jsx)(b.a,{variant:"outline-light",children:"\uac80\uc0c9"})]})]}),Object(m.jsx)(o.a,{bg:"success",variant:"dark",children:Object(m.jsxs)(d.a,{children:[Object(m.jsx)(o.a.Brand,{className:"fs-3",children:"\ub3c4\uc11c"}),Object(m.jsxs)(h.a,{className:"me-auto fs-5",children:[Object(m.jsx)(h.a.Link,{as:O.b,to:"/bestseller",children:"\ubca0\uc2a4\ud2b8\uc140\ub7ec"}),Object(m.jsx)(h.a.Link,{as:O.b,to:"/newbook",children:"\uc2e0\uac04\ub3c4\uc11c"})]})]})}),Object(m.jsxs)(L,{children:[Object(m.jsx)("span",{children:"\ub85c\uadf8\uc778"}),Object(m.jsx)("span",{children:" | "}),Object(m.jsx)("span",{children:"\ud68c\uc6d0\uac00\uc785"}),Object(m.jsx)("span",{children:" | "}),Object(m.jsx)("span",{children:"\ub9c8\uc774\ud398\uc774\uc9c0"})]}),Object(m.jsx)("div",{children:Object(m.jsxs)("form",{action:"/kakao/search",method:"GET",children:[Object(m.jsx)("label",{for:"searching",children:"\uac80\uc0c9\uc744 \uc6d0\ud558\ub294 \ucc45 , \uc800\uc790 \ub97c \uc785\ub825\ud574\uc8fc\uc138\uc694."}),Object(m.jsx)("input",{type:"text",name:"query",id:"searching"}),Object(m.jsx)("button",{type:"submit",children:"\uac80\uc0c9"})]})}),Object(m.jsx)(o.a,{bg:"light",expand:"lg",children:Object(m.jsxs)(d.a,{children:[Object(m.jsx)(o.a.Brand,{children:"\ub3c4\uc11c"}),Object(m.jsx)(o.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(m.jsx)(o.a.Collapse,{id:"basic-navbar-nav",children:Object(m.jsxs)(h.a,{className:"me-auto",children:[Object(m.jsx)(h.a.Link,{as:O.b,to:"/bestseller",children:"\ubca0\uc2a4\ud2b8\uc140\ub7ec"}),Object(m.jsx)(h.a.Link,{as:O.b,to:"/newbook",children:"\uc2e0\uac04\ub3c4\uc11c"})]})})]})}),Object(m.jsx)("hr",{}),Object(m.jsx)(x.c,{children:Object(m.jsxs)(y,{children:[Object(m.jsx)(x.a,{exact:!0,path:"/bestseller",children:Object(m.jsx)(f,{})}),Object(m.jsx)(x.a,{path:"/newbook",children:Object(m.jsx)(w,{})})]})})]})},B=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,108)).then((function(c){var t=c.getCLS,n=c.getFID,s=c.getFCP,a=c.getLCP,r=c.getTTFB;t(e),n(e),s(e),a(e),r(e)}))};r.a.render(Object(m.jsx)(s.a.StrictMode,{children:Object(m.jsx)(O.a,{children:Object(m.jsx)(S,{})})}),document.getElementById("root")),B()}},[[99,1,2]]]);
//# sourceMappingURL=main.11e406fc.chunk.js.map