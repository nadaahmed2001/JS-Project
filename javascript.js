export function loadConfig() { //This function was for Contact form but now is replaced with EmailJS
  return fetch('../../config.json')
      .then(response => {
          if (!response.ok) {
              throw new Error(`Failed to fetch config.json: ${response.status}`);
          }
          return response.json();
      })
      .then(config => {
          return config;
      })
      .catch(error => {
          console.error("Error loading JSON:", error);
          return null;
      });
}
const bar = document.querySelector('#bar');
const closes = document.querySelector('#close'); 
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

// document.addEventListener('DOMContentLoaded', () => {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const totalCount = cart.reduce((count, item) => count + item.quantity, 0); // Sum of all product quantities
//     const cartCountElement = document.querySelector('.cart__count'); // Select the element with the class
//     cartCountElement.textContent = totalCount;

//     // ------------------- navbar -------------------
//     const userNav = document.getElementById('user-nav'); // Placeholder for user-specific links
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

//     if (loggedInUser) {
//         // User is logged in, show their name and Logout button
//         userNav.innerHTML = `
//         <a href="/modules/user/profile.html">${loggedInUser.firstName}</a>
//        <a id="logoutBtn" style="margin-left: 10px; color: white; background-color: #dc3545; border-color: #dc3545; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Logout</a>
//       `;

//         // Handle Logout
//         document.getElementById('logoutBtn').addEventListener('click', function () {
//             localStorage.removeItem('loggedInUser');
//             // alert('You have logged out!');
//             window.location.reload(); // Reload page to update the navbar
//         });
//     } else {
//         // User is logged out, show Login and Register buttons
//         userNav.innerHTML =
//             `
//         <a href="../modules/user/login.html"
//         style="margin-right: 10px; color: white; background-color: #007bff; border-color: #007bff; padding: 5px 10px; border-radius: 5px; text-decoration: none; cursor: pointer;"
//         >Login</a>
//         <a href="../modules/user/register.html"
//         style="color: white; background-color: #28a745; border-color: #28a745; padding: 5px 10px; border-radius: 5px; text-decoration: none; cursor: pointer;"
//         >Register</a>

//       `;
//     }
// });