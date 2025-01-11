// Validation functions for email and password format
const validEmail = document.getElementById('inputEmail4');
const validPassword = document.getElementById('inputPassword4');
const validEmailErrorFormat = document.getElementById('emailErrorFormat'); 
const validPasswordErrorFormat = document.getElementById('passwordErrorFormat');  
const validEmailErrorRequired = document.getElementById('emailErrorRequired'); 
const validPasswordErrorRequired = document.getElementById('passwordErrorRequired');  

validEmail.addEventListener('blur', function() {
    if (!this.value) {
        validEmailErrorRequired.style.display = 'block';
        validEmailErrorFormat.style.display = 'none';
        this.classList.add('error');
        this.classList.remove('success');
    } else if (!checkUserEmail(this.value)) {
        validEmailErrorFormat.style.display = 'block';
        validEmailErrorRequired.style.display = 'none';
        this.classList.add('error');
        this.classList.remove('success');
    } else {
        validEmailErrorFormat.style.display = 'none';
        validEmailErrorRequired.style.display = 'none';
        this.classList.add('success');
        this.classList.remove('error');
    }
});

validPassword.addEventListener('blur', function() {
    if (!this.value) {
        validPasswordErrorRequired.style.display = 'block';
        validPasswordErrorFormat.style.display = 'none';
        this.classList.add('error');
        this.classList.remove('success');
    } else if (!checkUserPassword(this.value)) {
        validPasswordErrorFormat.style.display = 'block';
        validPasswordErrorRequired.style.display = 'none';
        this.classList.add('error');
        this.classList.remove('success');
    } else {
        validPasswordErrorFormat.style.display = 'none';
        validPasswordErrorRequired.style.display = 'none';
        this.classList.add('success');
        this.classList.remove('error');
    }
});

// Email and Password format check 

function checkUserEmail(v) {
    return v.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
}

function checkUserPassword(v) {
    return v.match(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/);
}

// Handle form submission and validate all fields
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    let isValid = true; 
    
    // Collecting form data
    const formData = {
        firstName: document.querySelector('input[name="name"]').value,
        lastName: document.querySelector('input[name="pass"]').value,
        email: document.getElementById('inputEmail4').value,
        password: document.getElementById('inputPassword4').value,
        phone: document.getElementById('inputphonenum').value,
        address: document.getElementById('inputAddress').value,
        city: document.getElementById('inputCity').value,
        checkBox: document.getElementById('gridCheck').checked
    };
    
    // Reset all error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((message) => {
        message.style.display = 'none';
    });
  
    // Field validation
    if (!formData.firstName) {
        document.getElementById('firstNameError').style.display = 'block';
        isValid = false;
    }
    if (!formData.lastName) {
        document.getElementById('lastNameError').style.display = 'block';
        isValid = false;
    }
    if (!formData.email) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    if (!formData.password) {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }
    if (!formData.phone) {
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    }
    if (!formData.address) {
        document.getElementById('addressError').style.display = 'block';
        isValid = false;
    }
    if (!formData.city) {
        document.getElementById('cityError').style.display = 'block';
        isValid = false;
    }
    if (!formData.checkBox) {
        document.getElementById('checkboxError').style.display = 'block';
        isValid = false;
    }

    // If the form is valid, save the data to localStorage
    if (isValid) {
        let formDataArray = JSON.parse(localStorage.getItem('formData')) || [];
        formDataArray.push(formData); 
        localStorage.setItem('formData', JSON.stringify(formDataArray));
  
        // Redirect to login page
        window.location.href = './login.html';
    }
});

// Remove error message when user starts typing
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('input', function() {
        const errorMessage = this.parentElement.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.style.display = 'none';  // Hide error message
        }
        this.classList.remove('is-invalid');  // Remove invalid class
    });
});
