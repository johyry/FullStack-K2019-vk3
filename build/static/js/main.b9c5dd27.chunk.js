(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,n,t){e.exports=t(39)},39:function(e,n,t){"use strict";t.r(n);var a=t(0),u=t.n(a),o=t(12),r=t.n(o),i=(t(6),t(2)),c=t(3),l=t.n(c),m="/api/persons",f=function(){return l.a.get(m).then(function(e){return e.data})},s=function(e){return l.a.post(m,e).then(function(e){return e.data})},d=function(e){return l.a.put("".concat(m,"/").concat(e.id),e).then(function(e){return e.data})},v=function(e){return l.a.delete("".concat(m,"/").concat(e)).then(function(e){return e.data})},h=function(e){return u.a.createElement("form",null,u.a.createElement("div",null,"Rajaa n\xe4ytett\xe4vi\xe4: ",u.a.createElement("input",{value:e.value,onChange:e.onChange})))},p=function(e){return u.a.createElement("form",{onSubmit:e.onSubmit},u.a.createElement("div",null,"nimi: ",u.a.createElement("input",{value:e.valueName,onChange:e.onNameChange})),u.a.createElement("div",null,"numero:"," ",u.a.createElement("input",{value:e.valueNumber,onChange:e.onNumberChange})),u.a.createElement("div",null,u.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},b=function(e){var n=e.numbers,t=e.filter,a=e.handleClick;return n.filter(function(e){return e.name.toUpperCase().includes(t.toUpperCase())}).map(function(e){return u.a.createElement("div",{key:e.id},e.name," ",e.number,u.a.createElement("button",{onClick:function(){return a({number:e})}},"delete"))})},E=function(e){var n=e.message;return null===n?null:u.a.createElement("div",{className:"error"},n)},g=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],o=n[1],r=Object(a.useState)(""),c=Object(i.a)(r,2),l=c[0],m=c[1],g=Object(a.useState)(""),k=Object(i.a)(g,2),j=k[0],w=k[1],C=Object(a.useState)(""),O=Object(i.a)(C,2),N=O[0],S=O[1],y=Object(a.useState)(null),H=Object(i.a)(y,2),B=H[0],J=H[1];Object(a.useEffect)(function(){f().then(function(e){o(e)})},[]);var P=function(e){for(var n=0;n<t.length;n++)if(t[n].name===e)return t[n];return-1},U=function(e){J(e),setTimeout(function(){J(null)},5e3)};return u.a.createElement("div",null,u.a.createElement("h2",null,"Puhelinluettelo"),u.a.createElement(E,{message:B}),u.a.createElement(h,{value:N,onChange:function(e){S(e.target.value)}}),u.a.createElement("h2",null,"Lis\xe4\xe4 uusi"),u.a.createElement(p,{onSubmit:function(e){e.preventDefault();var n={name:l,number:j},a=P(l);-1===a?s(n).then(function(e){o(t.concat(e)),U("Henkil\xf6 ".concat(n.name," lis\xe4tty palvelimelle"))}).catch(function(e){U("Henkil\xf6 ".concat(n.name," on jo poistettu palvelimelta")),o(t.filter(function(e){return e.id!==a.id}))}):window.confirm("".concat(a.name," on jo luettelossa, korvataanko vanha numero uudella?"))&&(a.number=j,d(a).then(function(e){o(t.map(function(n){return n.id!==e.id?n:e})),U("Henkil\xf6n ".concat(a.name," numero muutettu palvelimella"))}).catch(function(e){U("Henkil\xf6 ".concat(n.name," on jo poistettu palvelimelta")),o(t.filter(function(e){return e.id!==a.id}))})),m(""),w("")},valueName:l,onNameChange:function(e){m(e.target.value)},valueNumber:j,onNumberChange:function(e){w(e.target.value)}}),u.a.createElement("h2",null,"Numerot"),u.a.createElement(b,{numbers:t,filter:N,handleClick:function(e){return function(e){var n=e.number;window.confirm("Poistetaanko ".concat(n.name))&&v(n.id).then(function(e){o(t.filter(function(e){return e.id!==n.id})),U("Henkil\xf6n ".concat(n.name," poistettu palvelimelta"))}).catch(function(e){U("Henkil\xf6 ".concat(n.name," on jo poistettu palvelimelta")),o(t.filter(function(e){return e.id!==n.id}))})}(e)}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(u.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},6:function(e,n,t){}},[[13,2,1]]]);
//# sourceMappingURL=main.b9c5dd27.chunk.js.map