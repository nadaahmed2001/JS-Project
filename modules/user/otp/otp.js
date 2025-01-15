document.getElementById('verifyOtpBtn').addEventListener('click', function () {
    const enteredOtp = document.getElementById('otp').value; // OTP entered by the user
    const storedOtp = localStorage.getItem('otp'); //OTP that was sent to the user email
    const formData = JSON.parse(localStorage.getItem('formDataTemp'));

    if (enteredOtp === storedOtp) {
        // OTP is correct, save user data and redirect to login
        let users = JSON.parse(localStorage.getItem('formData')) || [];
        users.push(formData);
        localStorage.setItem('formData', JSON.stringify(users));
        localStorage.removeItem('otp'); // Clear OTP
        localStorage.removeItem('formDataTemp'); // Clear temporary data
        alert('Registration successful!');
        window.location.href = '../login.html';
    } else {
        alert('Incorrect OTP. Please try again.');
    }
});

document.getElementById('resendOtpBtn').addEventListener('click', function () {
    const formData = JSON.parse(localStorage.getItem('formDataTemp'));
    const otp = Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem('otp', otp); // Update OTP

    // Resend OTP via EmailJS
    emailjs.init('GC4G9jWTtgQhiN7Pr');

    // Send OTP via EmailJS
    emailjs.send('service_kkt50kj', 'template_a3t9zmk', {
        to_name: formData.firstName,
        to_email: formData.email,
        otp: otp,
    })
        .then(
            function () {
                alert('OTP resent successfully to your email!');
            },
            function (error) {
                console.error('Failed to resend OTP:', error);
                alert('Failed to resend OTP. Please try again.');
            }
        );
});
