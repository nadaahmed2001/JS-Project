//
const bar = document.querySelector('#bar');
const closes = document.querySelector('#close');  // Ensure you're using `closes`
const nav = document.querySelector('#navbar');

if (bar) {
  bar.addEventListener('click', () => {
    console.log("Hamburger menu clicked");
    nav.classList.add('active');  // Show the menu
  });
}

if (closes) {
  closes.addEventListener('click', () => {
    console.log("Close menu clicked");
    nav.classList.remove('active');  // Hide the menu
  });
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalCount = cart.reduce((count, item) => count + item.quantity, 0); // Sum of all product quantities
  const cartCountElements = document.querySelectorAll('.cart__count'); // Select all elements with the class

  cartCountElements.forEach((element) => {
    element.textContent = totalCount; // Update the count in each element
  });


}

/* event on when click on cart icon // or cart button */
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('cart')) {
    updateCartCount();
  }
});

document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((count, item) => count + item.quantity, 0); // Sum of all product quantities
    const cartCountElement = document.querySelector('.cart__count'); // Select the element with the class
    cartCountElement.textContent = totalCount;
});