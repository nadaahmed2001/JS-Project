(function () {
    const form = document.querySelector('.contact-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form from reloading the page
        const formData = new FormData(form);
        fetch('https://formspree.io/f/mjvqjzwd', {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    form.reset();
                    alert('Form submitted successfully');
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error(error);
                alert('Form submission failed');
            });
    });    
})();
