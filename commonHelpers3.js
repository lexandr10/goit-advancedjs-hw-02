import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */import{i}from"./assets/vendor-593e3bfb.js";const m=document.querySelector(".form");m.addEventListener("submit",u);function u(s){s.preventDefault();let t=Number(m.delay.value);for(let e=1;e<=m.amount.value;e+=1)a(e,t).then(({position:o,delay:r})=>{i.show({message:`✅ Fulfilled promise ${o} in ${r}ms`})}).catch(({position:o,delay:r})=>{i.show({message:`❌ Rejected promise ${o} in ${r}ms`})}),t+=Number(m.step.value);s.currentTarget.reset()}function a(s,t){const e={position:s,delay:t},o=Math.random()>.3;return new Promise((r,n)=>{setTimeout(()=>{o?r(e):n(e)},t)})}
//# sourceMappingURL=commonHelpers3.js.map