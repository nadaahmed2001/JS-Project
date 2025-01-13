document.addEventListener("DOMContentLoaded", () => {
    const cartSubtotalElem = document.querySelector(".cart__subtotal-value");
    const shippingElem = document.querySelector(".cart__shipping-value");
    const totalElem = document.querySelector(".cart__total-value");
    const shipping = 20;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartTotals() {
      let subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
      let total = subtotal + shipping;

      cartSubtotalElem.textContent = `$${subtotal.toFixed(2)}`;
      totalElem.textContent = `$${total.toFixed(2)}`;
    }

    updateCartTotals();
  });




   // Validate input fields on blur and on form submission
  function validateField(input, errorId, message, regex = null) {
    const value = input.value.trim();
    const errorElement = document.getElementById(errorId);

    if (!value) {
        errorElement.textContent = message;
        input.classList.add('is-invalid');
        return false;
    } else if (regex && !regex.test(value)) {
        errorElement.textContent = `Invalid ${input.name}.`;
        input.classList.add('is-invalid');
        return false;
    } else {
        errorElement.textContent = '';
        input.classList.remove('is-invalid');
        return true;
    }
}

document.getElementById('email').addEventListener('blur', function () {
    validateField(this, 'emailError', 'Valid email is required.', /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});

document.getElementById('phone').addEventListener('blur', function () {
    validateField(this, 'phoneError', 'Valid phone number is required.', /^\d{10,15}$/);
});

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const isNameValid = validateField(document.getElementById('name'), 'nameError', 'Name is required.');
    const isEmailValid = validateField(document.getElementById('email'), 'emailError', 'Valid email is required.', /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const isPhoneValid = validateField(document.getElementById('phone'), 'phoneError', 'Valid phone number is required.', /^\d{10,15}$/);
    const isAddressValid = validateField(document.getElementById('address'), 'addressError', 'Address is required.');

    if (isNameValid && isEmailValid && isPhoneValid && isAddressValid) {
        alert('Order placed successfully!');
        form.reset();
    }
});