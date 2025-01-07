var xhr = new XMLHttpRequest();
xhr.open('GET', 'db.json', true);
xhr.onload = function () {
  if (xhr.status === 200) {
    var data = JSON.parse(xhr.responseText);

    var proContainer = document.querySelector('.pro-container');
    data.forEach(function (product) {
      var productHTML = `
                <div class="pro">
                    <img src="${product.image}" alt="Product Image">
                    <div class="des">
                        <span>Brand Name</span>
                        <h5>${product.name}</h5> <!-- Dynamically inserting the name -->
                        <div class="star">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <h4>$${product.price}</h4> <!-- Dynamically inserting the price -->
                    </div>
                    <a href="#"><i class="fa-solid fa-cart-shopping cart"></i></a>
                </div>
            `;

   
      proContainer.innerHTML += productHTML; 
    });

  }
  else {
    console.error('Error fetching the JSON file');
  }
};


xhr.onerror = function (error) {

  console.error(error);
};


xhr.send();

////

var xhr2 = new XMLHttpRequest();


xhr2.open('GET', 'db2.json', true);



xhr2.onload = function () {

  if (xhr2.status === 200) {


    var data2 = JSON.parse(xhr2.responseText);

    var proContainer2 = document.querySelector('.pro-container2');
    data2.forEach(function (product) {
      var productHTML = `
                <div class="pro">
                    <img src="${product.image}" alt="Product Image">
                    <div class="des">
                        <span>Brand Name</span>
                        <h5>${product.name}</h5> <!-- Dynamically inserting the name -->
                        <div class="star">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <h4>$${product.price}</h4> <!-- Dynamically inserting the price -->
                    </div>
                    <a href="#"><i class="fa-solid fa-cart-shopping cart"></i></a>
                </div>
            `;

     
      proContainer2.innerHTML += productHTML;
    });

  }
  else {
    console.error('Error fetching the JSON file');
  }
};


xhr2.onerror = function (error) {

  console.error(error);
};


xhr2.send();

const bar = document.querySelector('#bar');
const closes = document.querySelector('#close');  
const nav = document.querySelector('#navbar');

if (bar) {
  bar.addEventListener('click', () => {
    console.log("Hamburger menu clicked");
    nav.classList.add('active'); 
  });
}

if (closes) {
  closes.addEventListener('click', () => {
    console.log("Close menu clicked");
    nav.classList.remove('active'); 
  });
}


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

//register-validation

document.getElementById('myForm').addEventListener('submit', function(event) {
  event.preventDefault(); 
  
  let isValid = true; 
  

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

  
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach((message) => {
      message.style.display = 'none';
  });

  
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
  // if (!formData.state) {
  //     document.getElementById('stateError').style.display = 'block';
  //     isValid = false;
  // }
  if (!formData.checkBox) {
      document.getElementById('checkboxError').style.display = 'block';
      isValid = false;
  }



  if (isValid) {
     
      console.log(formData);  
      
      
      let formDataArray = JSON.parse(localStorage.getItem('formData')) || [];
      formDataArray.push(formData); 
      localStorage.setItem('formData', JSON.stringify(formDataArray));

      window.location.href = './login.html';
  }
});

