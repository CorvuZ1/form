const submitBtn = document.querySelector(".form__submit");

const inputData = {
  formName: {
    errors: [],
    DOM: document.getElementById("form-name")
  },
  
  formPhone: {
    value: "",
    optionalValidate: true,
    errors: [],
    DOM: document.getElementById("form-phone")
  },

  formEmail: {
    optionalValidate: true,
    errors: [],
    DOM: document.getElementById("form-email")
  },

  formMessage: {
    errors: [],
    DOM: document.getElementById("form-message")
  }
}

submitBtn.addEventListener("click", formValidate)

function formValidate(event) {
  event.preventDefault();
  reset();

  let valid = true;
  
  if (inputData.formPhone.optionalValidate) {
    if (inputData.formPhone.DOM.value.trim() == "") {
      inputData.formPhone.errors.push("Заполните Телефон или Почту");
      valid = false;
    } else if (!phoneRegexp(inputData.formPhone.DOM.value)) {
      inputData.formPhone.errors.push("Проверьте введённый телефон");
      valid = false;
    } else {
      inputData.formEmail.optionalValidate = false;
      inputData.formEmail.errors = [];
      valid = true;
    }
  } 
  
  if (inputData.formEmail.optionalValidate) {
    if (inputData.formEmail.DOM.value.trim() == "") {
      inputData.formEmail.errors.push("Заполните Почту или Телефон");
      valid = false;
    } else if (!emailRegexp(inputData.formEmail.DOM.value)) {
      inputData.formEmail.errors.push("Проверьте введённый email");
      valid = false;
    } else {
      inputData.formPhone.optionalValidate = false;
      inputData.formPhone.errors = [];
      valid = true;
    }
  }
  
  if (inputData.formMessage.DOM.value.trim() == "") {
    inputData.formMessage.errors.push("Обязательно для заполнения");
    valid = false;
  }
  
  if (inputData.formName.DOM.value.trim() == "" ) {
    inputData.formName.errors.push("Обязательно для заполнения");
    valid = false;
  }
  
  errorStyles();
  errorRender();
  sendForm(valid);
}

function reset() {
  for (const item in inputData) {
    inputData[item].errors = [];
    if (inputData[item].hasOwnProperty("optionalValidate")) {
      inputData[item].optionalValidate = true;
    }
  }
}

function errorRender() {
  const errorText = document.querySelectorAll(".form__error");
  errorText[0].textContent = inputData.formName.errors;
  errorText[1].textContent = inputData.formPhone.errors;
  errorText[2].textContent = inputData.formEmail.errors;
  errorText[3].textContent = inputData.formMessage.errors;
}

function phoneRegexp(value) {
  return /[\+]\d{1}\s[\(]\d{3}[\)]\s\d{3}[\-]\d{2}[\-]\d{2}/.test(value);
}

function emailRegexp(value) {
  return /[а-яА-Яa-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@[а-яА-Яa-zA-Z0-9-]+\.[а-яА-Яa-zA-Z]\w{1,2}/.test(value);
}

function errorStyles() {
  for (const item in inputData) {
    if (inputData[item].errors.length != 0) {
      inputData[item].DOM.classList.add("form__input_invalid");
      inputData[item].DOM.nextSibling.nextSibling.classList.add("form__label_error");
    } else {
      inputData[item].DOM.classList.remove("form__input_invalid");
      inputData[item].DOM.nextSibling.nextSibling.classList.remove("form__label_error");
    }
  }
}


function sendForm(valid) {
  if (valid) {
    const form = document.querySelector("form");
    fetch("sendForm.php", { 
      method: "POST",
      body: new FormData(form)
    })
    .then(response => {
      form.reset();
      if (response.ok) {
        alert("Сообщение успешно отправлено.");
        form.classList.add("form_valid");
      } else {
        alert("Сообщение не отправлено. Сервер выключен.");
        form.classList.add("form_invalid");
      }
    })
    .catch(e => console.log(e))
  }
}

export default inputData.formPhone;


