// document.addEventListener('DOMContentLoaded', function () {
//     const userNav = document.getElementById('user-nav'); // Placeholder for user-specific links
//     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

//     if (loggedInUser) {
//         // User is logged in, show their name and Logout button
//         userNav.innerHTML = `
//         <a href="../modules/user/profile.html">${loggedInUser.firstName}</a>
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
