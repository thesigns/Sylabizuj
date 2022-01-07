import {sylabizuj} from "./sylabizuj.js";

let input = document.querySelector("input");
let output = document.querySelector("output");

input.addEventListener("keyup", e => {
  let result = sylabizuj(e.target.value).join(" – ");
  if (result === "") {
    output.value = "Wpisz polskie słowo";
  } else {
    output.value = result;
  }
});

