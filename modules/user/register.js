document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    // Collect form data
    const formData = {
        firstName: document.querySelector('input[name="firstName"]').value,
        lastName: document.querySelector('input[name="lastName"]').value,
        email: document.querySelector('input[name="email"]').value,
        password: document.querySelector('input[name="password"]').value,
        phone: document.querySelector('input[name="phone"]').value,
        address: document.querySelector('input[name="address"]').value,
        city: document.querySelector('input[name="city"]').value,
        terms: document.querySelector('input[name="terms"]').checked,
    };
    console.log(formData);
    let isValid = true;

    // Clear all error messages before validation
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((message) => {
        message.style.display = "none";
    });

    // Validate required fields
    const fields = [
        { name: "firstName", label: "First Name" },
        { name: "lastName", label: "Last Name" },
        { name: "email", label: "Email" },
        { name: "password", label: "Password" },
        { name: "phone", label: "Phone" },
        { name: "address", label: "Address" },
        { name: "city", label: "City" },
    ];

    fields.forEach((field) => {
        if (!formData[field.name]) {
            isValid = false;
            document.getElementById(`${field.name}Error`).style.display = "block";
        }
    });

    // Validate terms checkbox
    if (!formData.terms) {
        isValid = false;
        document.getElementById("checkboxError").style.display = "block";
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
        isValid = false;
        document.getElementById("emailError").style.display = "block";
    }

    // Validate password format (at least 8 characters, includes a letter, a number, and a special character)
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (!passwordPattern.test(formData.password)) {
        isValid = false;
        document.getElementById("passwordError").textContent =
            "Password must be at least 8 characters long and include a letter, a number, and a special character.";
        document.getElementById("passwordError").style.display = "block";
    }

    // Check if email already exists in localStorage
    let users = JSON.parse(localStorage.getItem("formData")) || [];
    const emailExists = users.some((user) => user.email === formData.email);
    if (emailExists) {
        isValid = false;
        document.getElementById("emailError").textContent = "Email is already registered";
        document.getElementById("emailError").style.display = "block";
    }

    if (isValid) {
        // Generate a 4-digit OTP
        const otp = Math.floor(1000 + Math.random() * 9000);
        console.log("otp: ", otp);
        localStorage.setItem("otp", otp); // Store OTP temporarily
        localStorage.setItem("formDataTemp", JSON.stringify(formData)); // Temporarily store user data to use in OTP verification

        // Initialize EmailJS
        emailjs.init('GC4G9jWTtgQhiN7Pr');

        // Send OTP via EmailJS
        emailjs.send('service_kkt50kj', 'template_a3t9zmk', {
                to_name: formData.firstName,
                to_email: formData.email,
                otp: otp,
            })
            .then(
                function () {
                    console.log('OTP sent successfully to your email: ', formData.email);
                    alert('We sent a verification code to your email');
                    window.location.href = './otp/otp.html'; // Redirect to OTP verification page
                },
                function (error) {
                    console.error('Failed to send OTP:', error);
                    alert('Failed to send OTP. Please try again.');
                }
            );
    }
});


// document.getElementById("myForm").addEventListener("submit", function (event) {
//     event.preventDefault(); // Prevent page refresh

//     const formData = {
//         firstName: document.querySelector('input[name="firstName"]').value,
//         lastName: document.querySelector('input[name="lastName"]').value,
//         email: document.querySelector('input[name="email"]').value,
//         password: document.querySelector('input[name="password"]').value,
//         phone: document.querySelector('input[name="phone"]').value,
//         address: document.querySelector('input[name="address"]').value,
//         city: document.querySelector('input[name="city"]').value,
//         terms: document.querySelector('input[name="terms"]').checked
//     };

//     let isValid = true;

//     // Clear all error messages before validation
//     const errorMessages = document.querySelectorAll(".error-message");
//     errorMessages.forEach((message) => {
//         message.style.display = "none";
//     });

//     // Validate required fields
//     const fields = [
//         { name: "firstName", label: "First Name" },
//         { name: "lastName", label: "Last Name" },
//         { name: "email", label: "Email" },
//         { name: "password", label: "Password" },
//         { name: "phone", label: "Phone" },
//         { name: "address", label: "Address" },
//         { name: "city", label: "City" },
//     ];

//     fields.forEach((field) => {
//         if (!formData[field.name]) {
//             isValid = false;
//             document.getElementById(`${field.name}Error`).style.display = "block";
//         }
//     });

//     // Validate terms checkbox
//     if (!formData.terms) {
//         isValid = false;
//         document.getElementById("checkboxError").style.display = "block";
//     }

//     // Validate email format
//     const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//     if (!emailPattern.test(formData.email)) {
//         isValid = false;
//         document.getElementById("emailError").style.display = "block";
//     }

//     // Validate password format (at least 8 characters, includes a letter and a number)
//     const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
//     if (!passwordPattern.test(formData.password)) {
//         isValid = false;
//         document.getElementById("passwordError").style.display = "block";
//     }

//     // Check if email already exists in localStorage
//     let users = JSON.parse(localStorage.getItem("formData")) || [];
//     const emailExists = users.some((user) => user.email === formData.email);
//     if (emailExists) {
//         isValid = false;
//         document.getElementById("emailError").textContent = "Email is already registered";
//         document.getElementById("emailError").style.display = "block";
//     }

//     // If all validations passed, save user data
//     if (isValid) {
//         users.push(formData);
//         localStorage.setItem("formData", JSON.stringify(users));
//         alert("Registration successful!");
//         window.location.href = "./login.html";  // Redirect to login page after successful registration
//     }
// });
