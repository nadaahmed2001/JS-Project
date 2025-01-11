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
                    <a>                
                    <i class="fa-solid fa-cart-shopping cart" 
                   data-id="${product.id}"
                   data-name="${product.name}"
                   data-price="${product.price}"
                   data-image="${product.image}">
                </i></a>
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
                    <a href="#">
                    
                    <a>                
                    <i class="fa-solid fa-cart-shopping cart" 
                   data-id="${product.id}"
                   data-name="${product.name}"
                   data-price="${product.price}"
                   data-image="${product.image}">
                </i></a>
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