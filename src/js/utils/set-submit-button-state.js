const setSubmitButtonState = (form, button) => {
  const btn = button;
  if (form.checkValidity()) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
};

export default setSubmitButtonState;
