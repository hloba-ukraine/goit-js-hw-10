import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i as t}from"./assets/vendor-77e16229.js";const i={form:document.querySelector(".form")},e=document.getElementById("form");function n(){t.show({message:`✅ Fulfilled promise in ${e.delay.value}ms`,messageColor:"#FFFFFF",backgroundColor:"#59A10D",position:"topRight"})}function m(){t.show({message:`❌ Rejected promise in ${e.delay.value}ms`,messageColor:"#FFF",backgroundColor:"#FF0000",position:"topRight"})}function a(){return new Promise((s,r)=>{setTimeout(()=>{e.state.value==="fulfilled"&&s(e.delay.value),r(e.delay.value)},Number(e.delay.value))}).then(n).catch(m)}function l(o){o.preventDefault(),a()}i.form.addEventListener("submit",l);
//# sourceMappingURL=commonHelpers2.js.map