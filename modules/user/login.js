document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission and page refresh

    const enteredEmail = document.querySelector('input[name="name"]').value;
    const enteredPassword = document.querySelector('input[name="pass"]').value;

    // Clear previous error messages
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    let isValid = true;

    // Validate empty email
    if (!enteredEmail) {
        isValid = false;
        document.getElementById('emailError').textContent = 'Email is required.';
        document.getElementById('emailError').style.color = 'red';
    }

    // Validate empty password
    if (!enteredPassword) {
        isValid = false;
        document.getElementById('passwordError').textContent = 'Password is required.';
        document.getElementById('passwordError').style.color = 'red';
    }

    // Check if the form is valid before checking the user credentials
    if (isValid) {
        const users = JSON.parse(localStorage.getItem('formData')) || [];
        const user = users.find(user => user.email === enteredEmail && user.password === enteredPassword);
        console.log(user);
        if (user) {
            // If credentials are correct, store logged-in user and redirect
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            alert('Login successful!');
            window.location.href = '../../index.html'; // Redirect to Home 
        } else {
            // If credentials are incorrect, show "Wrong data" error
            console.log('Wrong data entered.');
            document.getElementById('emailError').textContent = 'Wrong data entered.';
            document.getElementById('emailError').style.color = 'red';
            document.getElementById('passwordError').textContent = 'Wrong data entered.';
            document.getElementById('passwordError').style.color = 'red';
        }
    }
});





// // //signin-validation
// document.getElementById('myForm').addEventListener('submit', function (event) {
//   event.preventDefault();

//   const enteredEmail = document.querySelector('input[name="name"]').value;
//   const enteredPassword = document.querySelector('input[name="pass"]').value;
//   const emailError = document.getElementById('emailError');
//   const passwordError = document.getElementById('passwordError');
//   const emailInput = document.querySelector('input[name="name"]');
//   const passwordInput = document.querySelector('input[name="pass"]');


//   emailError.innerHTML = '';
//   passwordError.innerHTML = '';
//   emailInput.classList.remove('is-invalid');
//   passwordInput.classList.remove('is-invalid');

//   let valid = true;

//   if (!enteredEmail) {
//       valid = false;
//       emailError.innerHTML = '<p style="color: red;">Email is required.</p>';
//       emailInput.classList.add('is-invalid');
//   }

//   if (!enteredPassword) {
//       valid = false;
//       passwordError.innerHTML = '<p style="color: red;">Password is required.</p>';
//       passwordInput.classList.add('is-invalid');
//   }

//   if (!valid) {
//       return;
//   }

//   const storedData = JSON.parse(localStorage.getItem('formData'));

//   if (storedData) {
//       let userFound = false;

//       for (let i = 0; i < storedData.length; i++) {
//           const user = storedData[i];

//           if (user.email === enteredEmail && user.password === enteredPassword) {
//               userFound = true;
//               window.location.href = '/index.html';
//               break;
//           }
//       }

//       if (!userFound) {
//           document.getElementById('emailHelp').innerHTML = '<p style="color: red;">Invalid email or password.</p>';
//       }
//   } else {
//       alert('No users found. Please register first.');
//   }
// });


// const emailInput = document.querySelector('input[name="name"]');
// const passwordInput = document.querySelector('input[name="pass"]');

// emailInput.addEventListener('input', function () {
//   const emailError = document.getElementById('emailError');
//   const emailInput = document.querySelector('input[name="name"]');
//   emailError.innerHTML = '';  
//   emailInput.classList.remove('is-invalid');  
// });

// passwordInput.addEventListener('input', function () {
//   const passwordError = document.getElementById('passwordError');
//   const passwordInput = document.querySelector('input[name="pass"]');
//   passwordError.innerHTML = ''; 
//   passwordInput.classList.remove('is-invalid');  
// });
