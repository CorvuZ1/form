import phone from "./formScript.js";

phone.DOM.addEventListener("input", inputMask);

function inputMask() {
  console.log(phone.DOM.value);
}

