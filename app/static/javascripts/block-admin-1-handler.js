function formVideoSubmitHandler(event) {
    try {
        event.preventDefault();
        console.loge
        var submitEvent = event.target;
        var form = submitEvent.closest('.admin-panel-form');
        if (!form.text.value || !form.url.value || !form.duration.value)
            throw new Error('Video is empty or some fields are missing');
        var formData = new FormData(form);
        if(form.id)
            formData.append('id', form.id);
        fetch('/api/updatevideo', {
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
function deleteVideoSubmitHandler(event) {
    try {
        event.preventDefault();
        var submitEvent = event.target;
        var form = submitEvent.closest('.admin-panel-form');
        if(!form.id)
            throw new Error('Video id is missing');
        var formData = new FormData(form);
        formData.append('id', form.id);
        fetch('/api/dropvideo', {
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