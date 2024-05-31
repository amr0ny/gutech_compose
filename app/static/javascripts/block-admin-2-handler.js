function formSlideSubmitHandler(event) {
    try {
        event.preventDefault();
        var submitEvent = event.target;
        var form = submitEvent.closest('.admin-panel-form');
        if (!form.header.value || !form.text.value || !form.image.value)
            throw new Error('Form is empty or some fields are missing');
        var formData = new FormData(form);
        if(form.id) {
            formData.append('id', form.id);
        }
        fetch('/api/updateslide', {
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
function deleteSlideSubmitHandler(event) {
    try {
        event.preventDefault();
        var submitEvent = event.target;
        var form = submitEvent.closest('.admin-panel-form');
        if(!form.id)
            throw new Error('Slide id is missing');
        var formData = new FormData(form);
        formData.append('id', form.id);
        fetch('/api/dropslide', {
            method: 'POST',
            body: formData
        })
        .then((res) => {
            if (res.status == 200) {
                console.log('Data succesfully written');
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