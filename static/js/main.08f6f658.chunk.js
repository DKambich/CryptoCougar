(this.webpackJsonpcryptocougar=this.webpackJsonpcryptocougar||[]).push([[0],{504:function(e,t,n){"use strict";n.r(t);var r=n(4),a=n(0),c=n.n(a),i=n(54),o=n.n(i),s=n(203),j=(n(383),n(43)),d=n(352),l=n(24),u=n(67),b=n(550),h=n(555),g=n(558),p=n(554),O=n(350),x=n(560),m=n(551),f=n(557),v=n(336),y=n(553),k=n(552),I=n(145),C=[{title:"Home",icon:"home",link:"/home"},{title:"Browse",icon:"search",link:"/browse"},{title:"Trending",icon:"chart line",link:"/trending"}],w=[{title:"Favorites",icon:"star",link:"/favorites"},{title:"Profile",icon:"user circle",link:"/profile"},{title:"Logout",icon:"sign-out",link:"/logout"}],F=[{title:"Login",icon:"sign-in",link:"/login"},{title:"Sign Up",icon:"add user",link:"/signup"}],S=function(e){var t=e.mobile,n=e.desktop;return Object(r.jsxs)(g.a,{children:[Object(r.jsx)(g.a.Row,{only:"tablet mobile",children:Object(r.jsx)(g.a.Column,{children:t})}),Object(r.jsx)(g.a.Row,{only:"computer",children:Object(r.jsx)(g.a.Column,{children:n})})]})},_=function(e){if(e.loggedIn){var t=Object(r.jsxs)("span",{children:[Object(r.jsx)(O.a,{src:"https://picsum.photos/200",avatar:!0,style:{marginRight:".5em"}}),"John Smith"]});return Object(r.jsx)(y.a.Menu,{position:"right",children:Object(r.jsx)(k.a,{item:!0,trigger:t,children:Object(r.jsx)(k.a.Menu,{children:w.map((function(e){var t=e.title,n=e.icon,a=e.link;return Object(r.jsxs)(k.a.Item,{as:u.b,to:a,children:[Object(r.jsx)(I.a,{name:n}),t]},t)}))})})})}return Object(r.jsx)(y.a.Item,{position:"right",children:F.map((function(e){var t=e.title,n=e.icon,a=e.link;return Object(r.jsxs)(f.a,{animated:"fade",style:{marginLeft:".25em",marginRight:".25em"},as:u.b,to:a,children:[Object(r.jsx)(f.a.Content,{visible:!0,children:t}),Object(r.jsx)(f.a.Content,{hidden:!0,children:Object(r.jsx)(I.a,{name:n})})]},t)}))})},T=function(e){var t=e.loggedIn?w:F;return Object(r.jsx)(r.Fragment,{children:t.map((function(e){var t=e.title,n=e.icon,a=e.link;return Object(r.jsxs)(k.a.Item,{as:u.b,to:a,children:[Object(r.jsx)(I.a,{name:n}),t]},t)}))})},L=function(e){var t=e.loggedIn;return Object(r.jsx)(y.a,{children:Object(r.jsxs)(b.a,{children:[Object(r.jsx)(k.a,{item:!0,icon:"sidebar",children:Object(r.jsxs)(k.a.Menu,{style:{width:"100vw"},children:[C.map((function(e){var t=e.title,n=e.icon,a=e.link;return Object(r.jsxs)(k.a.Item,{as:u.b,to:a,children:[Object(r.jsx)(I.a,{name:n}),t]},t)})),Object(r.jsx)(T,{loggedIn:t})]})}),Object(r.jsxs)(y.a.Item,{as:u.b,to:"/about",header:!0,style:{flexGrow:1},children:[Object(r.jsx)(O.a,{avatar:!0,src:"./logo.png",style:{marginRight:".5em"}}),"CryptoCougar"]})]})})},R=function(e){var t=e.loggedIn;return Object(r.jsx)(y.a,{children:Object(r.jsxs)(b.a,{children:[Object(r.jsxs)(y.a.Item,{as:u.b,to:"/about",header:!0,children:[Object(r.jsx)(O.a,{size:"mini",src:"/CryptoCougar/logo.png",style:{marginRight:".5em"}}),"CryptoCougar"]}),C.map((function(e){var t=e.title,n=e.icon,a=e.link;return Object(r.jsxs)(y.a.Item,{as:u.b,to:a,children:[Object(r.jsx)(I.a,{name:n}),t]},t)})),Object(r.jsx)(_,{loggedIn:t})]})})};var N=function(){return Object(r.jsx)(S,{mobile:Object(r.jsx)(L,{loggedIn:true}),desktop:Object(r.jsx)(R,{loggedIn:true})})},E=n(16),H=n.n(E),P=n(59),D="TRENDING_COINS_START_FETCH",z="TRENDING_COINS_FAIL_FETCH",M="TRENDING_COINS_FINISH_FETCH",G=n(348);function A(e){return{type:M,payload:e}}function B(e){return J.apply(this,arguments)}function J(){return(J=Object(P.a)(H.a.mark((function e(t){var n,r;return H.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.coingecko.com/api/v3/coins/".concat(t,"/market_chart?vs_currency=usd&days=6&interval=daily"));case 2:return n=e.sent,e.next=5,n.json();case 5:return r=e.sent,e.abrupt("return",r);case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function U(){return $.apply(this,arguments)}function $(){return($=Object(P.a)(H.a.mark((function e(){var t,n,r,a,c,i,o,s,d,l,u;return H.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.coingecko.com/api/v3/search/trending");case 2:return t=e.sent,e.next=5,t.json();case 5:return n=e.sent,r=n.coins.map((function(e){return e.item})),a=r.map((function(e){return B(e.id)})),e.next=10,Promise.allSettled(a);case 10:c=e.sent,i=new G.a,o=[],s=0;case 14:if(!(s<c.length)){e.next=25;break}if("fulfilled"!==(d=c[s]).status){e.next=22;break}return l="https://cors-anywhere.herokuapp.com/".concat(r[s].thumb),e.next=20,i.getColorAsync(l);case 20:u=e.sent.rgb,o.push(Object(j.a)(Object(j.a)({},r[s]),{},{historicData:d.value,color:u}));case 22:s++,e.next=14;break;case 25:return e.abrupt("return",o);case 26:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var q={root:{padding:"1.5em"},graph:{height:300,width:"auto"},card:{width:"100%"},cardHeader:{margin:0,marginLeft:"1em"},cardContainer:{display:"flex",alignItems:"center"}},K=Object(s.b)((function(e){var t=e.trending;return{trending:t.data,error:t.error,loading:t.isLoading}}),(function(e){return{getTrending:function(){return e(function(){var e=Object(P.a)(H.a.mark((function e(t){var n;return H.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:D}),e.prev=1,e.next=4,U();case 4:n=e.sent,t(A(n)),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),t((r=e.t0,{type:z,payload:r}));case 11:case"end":return e.stop()}var r}),e,null,[[1,8]])})));return function(t){return e.apply(this,arguments)}}())}}})),Q=function(e){var t=e.id,n=e.data,a=e.lineColor,c={id:t,data:n};return Object(r.jsx)("div",{style:q.graph,children:Object(r.jsx)(v.a,{data:[c],colors:a,curve:"cardinal",useMesh:!0,tooltip:function(e){var t=e.point;return Object(r.jsxs)(h.a,{children:[t.data.yFormatted," on ",t.data.xFormatted]})},pointSize:8,margin:{top:50,right:80,bottom:50,left:80},axisLeft:{tickSize:10,tickPadding:5,legend:"Price",legendOffset:-55,legendPosition:"middle"},yFormat:" >-$.3r",axisBottom:{tickSize:10,tickPadding:5,legend:"Date",legendOffset:40,legendPosition:"middle"}})})},V=function(e){var t,n=e.coin,a=n.id,c=n.symbol,i=n.market_cap_rank,o=n.name,s=n.large,j=n.color,d=n.historicData.prices;return Object(r.jsx)(g.a.Column,{mobile:16,tablet:16,computer:8,children:Object(r.jsxs)(p.a,{style:q.card,children:[Object(r.jsx)(Q,{id:o,data:(t=d,t.map((function(e){return{x:e[0],y:e[1]}}))),lineColor:j}),Object(r.jsx)(p.a.Content,{children:Object(r.jsx)(p.a.Header,{children:Object(r.jsxs)("div",{style:q.cardContainer,children:[Object(r.jsx)(O.a,{src:s,size:"mini"}),Object(r.jsxs)(x.a,{as:"h5",style:q.cardHeader,children:[o," (",c,")",Object(r.jsxs)(x.a.Subheader,{children:["Current market cap rank ",i]})]})]})})})]})},a)};var W=K((function(e){var t=e.loading,n=e.trending,c=e.error,i=e.getTrending;return Object(a.useEffect)((function(){i()}),[i]),Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(N,{}),Object(r.jsxs)(b.a,{style:q.root,children:[t&&Object(r.jsx)(m.a,{active:t,inline:"centered"}),c&&Object(r.jsxs)(h.a,{negative:!0,children:[Object(r.jsx)(h.a.Header,{children:"Error loading trending coin data"}),Object(r.jsxs)("p",{children:["The following error occured when trying to load the trending coin data: '",c,"'"]}),Object(r.jsx)(f.a,{negative:!0,onClick:i,children:"Retry"})]}),Object(r.jsx)(g.a,{container:!0,centered:!0,columns:2,children:n.map((function(e){return Object(r.jsx)(V,{coin:e})}))})]})]})}));function X(e){var t=e.component,n=e.guarded,a=Object(d.a)(e,["component","guarded"]);return Object(r.jsx)(l.b,Object(j.a)(Object(j.a)({},a),{},{render:function(e){var a=e.match.params;return(null===n||void 0===n?void 0:n.redirect)?Object(r.jsx)(l.a,{to:n.url}):Object(r.jsx)(t,Object(j.a)({},a))}}))}function Y(){var e=l.g();return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)(N,{}),Object(r.jsx)(b.a,{children:e.pathname})]})}var Z=function(){var e=!0;return Object(r.jsx)(u.a,{basename:"/",children:Object(r.jsxs)(l.d,{children:[Object(r.jsx)(X,{path:"/about",component:Y}),Object(r.jsx)(X,{path:"/home",component:Y}),Object(r.jsx)(X,{path:"/browse",component:Y}),Object(r.jsx)(X,{path:"/trending",component:W}),Object(r.jsx)(X,{path:"/favorites",component:Y,guarded:{redirect:!1,url:"/login"}}),Object(r.jsx)(X,{path:"/profile",component:Y,guarded:{redirect:!1,url:"/login"}}),Object(r.jsx)(X,{path:"/logout",component:Y,guarded:{redirect:!1,url:"/login"}}),Object(r.jsx)(X,{path:"/login",component:Y,guarded:{redirect:e,url:"/"}}),Object(r.jsx)(X,{path:"/signup",component:Y,guarded:{redirect:e,url:"/"}}),Object(r.jsx)(X,{path:"/",component:Y})]})})};var ee=function(){return Object(r.jsx)(r.Fragment,{children:Object(r.jsx)(Z,{})})},te=n(138),ne=n(349),re={data:[],isLoading:!1,error:""};var ae=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:re,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case D:return Object(j.a)(Object(j.a)({},e),{},{isLoading:!0,data:[],error:""});case z:return Object(j.a)(Object(j.a)({},e),{},{isLoading:!1,error:t.payload});case M:return Object(j.a)(Object(j.a)({},e),{},{isLoading:!1,data:t.payload,error:""});default:return e}},ce=Object(te.c)({trending:ae}),ie=Object(te.d)(ce,Object(te.a)(ne.a));o.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(s.a,{store:ie,children:Object(r.jsx)(ee,{})})}),document.getElementById("root"))}},[[504,1,2]]]);
//# sourceMappingURL=main.08f6f658.chunk.js.map