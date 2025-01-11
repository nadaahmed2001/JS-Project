// Create a new XMLHttpRequest object
var xhr = new XMLHttpRequest();


xhr.open('GET', './database/allProducts.json', true);



xhr.onload = function () {

  if (xhr.status === 200) {


    var data = JSON.parse(xhr.responseText);

    var proContainer = document.querySelector('.pro-container');
    data.forEach(function (product) {
      if(product.isFeatured == 'true'){

      var productHTML = `
                <div class="pro">
                    <img src="${product.image}" alt="Product Image"
                      onClick="window.location.href='./shop-pages/singleProduct.html?id=${product.id}'"
                      >
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
      
      // Append the new product HTML to the container
      proContainer.innerHTML += productHTML;
      }
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


xhr2.open('GET', './database/allProducts.json', true);



xhr2.onload = function () {

  if (xhr2.status === 200) {


    var data2 = JSON.parse(xhr2.responseText);

    var proContainer2 = document.querySelector('.pro-container2');
    data2.forEach(function (product) {
      if(product.isFeatured == 'false'){
      var productHTML = `
                <div class="pro">
                    <img src="${product.image}" alt="Product Image"
                      onClick="window.location.href='./shop-pages/singleProduct.html?id=${product.id}'"
                      >
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

      // Append the new product HTML to the container
      proContainer2.innerHTML += productHTML;
      }
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

document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});