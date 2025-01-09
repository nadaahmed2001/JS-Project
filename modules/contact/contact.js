(function () {
    const form = document.querySelector('#contact-form');
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent form from reloading the page
        const formData = new FormData(form);
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json'
            }
        }).then(response => {
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

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission for validation

        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());

        let isValid = true;

        // Validate first name
        const firstName = document.getElementById('first-name');
        if (!firstName.value.trim()) {
            isValid = false;
            showError(firstName, 'First name is required.');
        }

        // Validate last name
        const lastName = document.getElementById('last-name');
        if (!lastName.value.trim()) {
            isValid = false;
            showError(lastName, 'Last name is required.');
        }

        // Validate email
        const email = document.getElementById('email');
        if (!validateEmail(email.value.trim())) {
            isValid = false;
            showError(email, 'Please enter a valid email address.');
        }

        // Validate phone number
        const phone = document.getElementById('phone');
        if (!validatePhone(phone.value.trim())) {
            isValid = false;
            showError(phone, 'Please enter a valid phone number.');
        }

        // Validate message
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            isValid = false;
            showError(message, 'Message is required.');
        }

        // If all validations pass, submit the form
        if (isValid) {
            console.log('Form submitted successfully!');
            // Simulate form submission
            alert('Form submitted successfully!');
        }
    });

    // Helper function to show error message
    function showError(input, message) {
        const error = document.createElement('p');
        error.className = 'error-message';
        error.style.color = 'red';
        error.style.fontSize = '0.9em';
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    // Helper function to validate email
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Helper function to validate phone number
    function validatePhone(phone) {
        const regex = /^\d{10}$/; // Validates 10-digit phone numbers
        return regex.test(phone);
    }
});

