function formPartnerSubmitHandler(event) {
    try {
        event.preventDefault();
        var submitEvent = event.target;
        var form = submitEvent.closest('.admin-panel-form');
        console.log(form.image.value);
        if (!form.image.value)
            throw new Error('Partner is empty or some fields are missing');
        var formData = new FormData(form);
        if(form.id)
            formData.append('id', form.id);
        console.log(formData.get('image'));
        fetch('/api/updatepartner', {
            method: 'POST',
            body: formData
        })
        .then((res) => {
            if (res.status == 200) {
                location.reload();
            } else {
                throw new Error('Server returned an error');
            }
        })
        .catch((error) => { 
            console.error('Error:', error);
        });

    } catch (error) {
        console.error('Error:', error);
    }
}
function deletePartnerSubmitHandler(event) {
    try {
        event.preventDefault();
        var submitEvent = event.target;
        var form = submitEvent.closest('.admin-panel-form');
        if(!form.id)
            throw new Error('Partner id is missing');
        var formData = new FormData(form);
        formData.append('id', form.id);
        fetch('/api/droppartner', {
            method: 'POST',
            body: formData
        })
        .then((res) => {
            if (res.status == 200) {
                location.reload();
            } else {
                throw new Error('Server returned an error');
            }
        })
        .catch((error) => { 
            console.error('Error:', error);
        });
    } catch(error) {
        console.log('Error:', error)
    }
}