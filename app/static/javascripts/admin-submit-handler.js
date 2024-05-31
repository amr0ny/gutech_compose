function formLoginSubmitHandler(event) {
    try {
    event.preventDefault();
    var submitEvent = event.target;
    var form = submitEvent.closest('.admin-login-form');
    if (!form.username.value || !form.password.value)
      throw new Error('Form is empty or some fields are missing');
    var formData = new FormData(form);
    console.log(formData.get('username'));
    fetch('/api/adminlogin', {
      method: 'POST',
      body: formData
    })
    .then((res) => {
        if (res.status == 200) {
          setTimeout(() => {
            document.location.href = '/adminpanel';
          }, 1000);
        } else {
            throw new Error('Server returned an error');
        }
    })
    .catch((error) => { 
        console.error('Error:', error);
    });
  } catch(error) {
    console.error('Error:', error);
  }
};
