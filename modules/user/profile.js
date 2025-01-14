const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
if (!loggedInUser) {
    alert('You need to log in first!');
    window.location.href = './login.html';
} else {
    document.getElementById('userName').textContent = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
    document.getElementById('userEmail').textContent = loggedInUser.email;
    document.getElementById('userPhone').textContent = loggedInUser.phone;
    document.getElementById('userAddress').textContent = `${loggedInUser.address}, ${loggedInUser.city}`;
}

document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser');
    alert('You have logged out!');
    window.location.href = './login.html';
});
