//signin-validation

document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
  
    const enteredEmail = document.querySelector('input[name="name"]').value;
    const enteredPassword = document.querySelector('input[name="pass"]').value;
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const emailInput = document.querySelector('input[name="name"]');
    const passwordInput = document.querySelector('input[name="pass"]');
  
  
    emailError.innerHTML = '';
    passwordError.innerHTML = '';
    emailInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');
  
    let valid = true;
  
  
    if (!enteredEmail) {
      valid = false;
      emailError.innerHTML = '<p style="color: red;">Email is required.</p>';
      emailInput.classList.add('is-invalid');
    }
  
  
    if (!enteredPassword) {
      valid = false;
      passwordError.innerHTML = '<p style="color: red;">Password is required.</p>';
      passwordInput.classList.add('is-invalid');
    }
  
  
    if (!valid) {
      return;
    }
  
  
    const storedData = JSON.parse(localStorage.getItem('formData'));
  
  
    if (storedData) {
      let userFound = false;
  
  
      for (let i = 0; i < storedData.length; i++) {
        const user = storedData[i];
  
        if (user.email === enteredEmail && user.password === enteredPassword) {
          userFound = true;
          window.location.href = '/index.html';
  
          break;
        }
      }
  
  
      if (!userFound) {
        document.getElementById('emailHelp').innerHTML = '<p style="color: red;">Invalid email or password.</p>';
      }
    } else {
      alert('No users found. Please register first.');
    }
  });
  