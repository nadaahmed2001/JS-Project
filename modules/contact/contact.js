document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#contact-form');
    const successAlert = document.querySelector('.contact-success-alert');

    // Form validation logic
    const validators = {
        'first-name': (value) => value.trim() ? '' : 'First name is required.',
        'last-name': (value) => value.trim() ? '' : 'Last name is required.',
        'email': (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Please enter a valid email address.',
        'phone': (value) => /^\d{10}$/.test(value.trim()) ? '' : 'Please enter a valid phone number.',
        'message': (value) => value.trim() ? '' : 'Message is required.',
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearErrors();

        const isValid = validateForm();
        if (!isValid) return;

        try {
            const formData = new FormData(form);
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: formData,
                headers: { Accept: 'application/json' },
            });

            if (!response.ok) throw new Error('Form submission failed');

            form.reset();
            showSuccessAlert();
        } catch (error) {
            console.error(error);
        }
    });

    // Helper functions
    function validateForm() {
        let isValid = true;

        Object.keys(validators).forEach((fieldId) => {
            const field = document.getElementById(fieldId);
            const errorMessage = validators[fieldId](field.value);
            if (errorMessage) {
                isValid = false;
                showError(field, errorMessage);
            }
        });

        return isValid;
    }

    function showError(input, message) {
        const error = document.createElement('p');
        error.className = 'error-message';
        error.style.color = 'red';
        error.style.fontSize = '0.9em';
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach((el) => el.remove());
    }

    function showSuccessAlert() {
        successAlert.style.display = 'block';
        successAlert.textContent = 'Your response is successfully submitted';
    }
});
