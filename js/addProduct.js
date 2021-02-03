"use strict"

let form = document.querySelector(".add-form");
form.onsubmit = function(event) {
  event.preventDefault();
  addProduct(form);
}

function addProduct(form) {
  let formData = new FormData(form);
  fetch("addProduct_obr.php", {
    method: "POST",
    body: formData,
  })
    .then(response => response.text())
    .then(result => {
      if(result == "ok") {
        let errorElement = document.querySelector(".error-text");
        errorElement.classList.add("d-none");
        showText();
      } else {
        showErrorText(result);
      }
    });
}
function showText(success) {
  
  let alertSuccess = document.querySelector(".popup");
  alertSuccess.classList.remove("d-none");
}
function showErrorText(error) {
  let errorElement = document.querySelector(".error-text");
  errorElement.classList.remove("d-none");
  errorElement.innerHTML = error;
}