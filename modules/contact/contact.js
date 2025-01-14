
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    // Select inputs
    const firstNameField = document.getElementById("first-name");
    const emailField =document.getElementById("email");
    const phoneField = document.getElementById("phone");
    const messageField = document.getElementById("message");
  
    // Clear previous error messages
    clearErrors();
  
    let isValid = true;
  
    // First Name Validation
    if (firstNameField.value.trim().length < 2) {
      showError(firstNameField, 'First Name must be at least 2 characters.');
      isValid = false;
    }
  
    // Email Validation
    if (!/\S+@\S+\.\S+/.test(emailField.value.trim())) {
      showError(emailField, 'Please enter a valid email address.');
      isValid = false;
    }
    // Phone Number Validation
    if ((/^\d{11}$/.test(phoneField.value.trim())) == false) {
     console.log(/^\d{10}$/.test(phoneField.value.trim()))
      showError(phoneField, 'Phone Number must be 10 digits.');
      isValid = false;
    }
  
    // Message Validation
    if (messageField.value.trim().length < 10) {
      showError(messageField, 'Message must be at least 10 characters.');
      isValid = false;
    }
  
    // If valid, send email
    if (isValid) {
      sendMail();
    }
  });
  
  // Function to clear previous error messages
  function clearErrors() {
    document.querySelectorAll('.error-message').forEach((span) => {
      span.style.display = 'none';
    });
    document.querySelectorAll('input, textarea').forEach((input) => {
      input.classList.remove('error');
    });
  }
  
  // Function to show an error message for a field
  function showError(input, message) {
    const errorSpan = input.nextElementSibling; // Get the <span> right after the input
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';
    input.classList.add('error');
  }
  
  
export function sendMail(){
    var params={
        firstName: document.getElementById("first-name").value,
        lastName: document.getElementById("last-name").value,
        phoneNum: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        msgContent: document.getElementById("message").value,
    };

    const serviceID= "service_11foc4r";
    const templateID= "template_58bk2o4";

    emailjs.send(serviceID,templateID,params)
    .then(res=>{
        // document.getElementById("first-name").value="";
        // document.getElementById("last-name").value="";
        // document.getElementById("phone").value="";
        // document.getElementById("email").value="";
        // document.getElementById("message").value="";
        console.log(res);
        alert ("Your message was sent for our owners and we will contact you as soon as possible");
    }).catch(error=>console.log(error));
}//End sendMail

window.sendMail = sendMail;
