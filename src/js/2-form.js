const form = document.querySelector('.feedback-form');
const LSKEY_FORM_DATA = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

function restoreFormData() {
  const savedData = localStorage.getItem(LSKEY_FORM_DATA);
  if (savedData) {
    formData = JSON.parse(savedData);
    Object.keys(formData).forEach(key => {
      form.elements[key].value = formData[key];
    });
  }
}
function registerFormChangeEvent() {
  form.addEventListener('input', event => {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem(LSKEY_FORM_DATA, JSON.stringify(formData));
  });
}

function registerSubmitEvent() {
  form.addEventListener('submit', event => {
    event.preventDefault();

    if (validateForm()) {
      console.log('Form Data:', formData);
      clearData();
    }
  });
}

function validateForm() {
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return false;
  }
  return true;
}

function clearData() {
  localStorage.removeItem(LSKEY_FORM_DATA);
  Object.keys(formData).forEach(key => {
    formData[key] = '';
  });
  form.reset();
}

document.addEventListener('DOMContentLoaded', function () {
  restoreFormData();
  registerFormChangeEvent();
  registerSubmitEvent();
});
