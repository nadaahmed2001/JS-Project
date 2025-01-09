// Fetch products using XMLHttpRequest
var xhr = new XMLHttpRequest();
xhr.open("GET", "allProducts.json", true);

xhr.onload = function () {
  if (xhr.status === 200) {
    var data = JSON.parse(xhr.responseText);
    var proContainer = document.querySelector(".pro-container");

    // Check if the current page is `singleProduct.html`
    if (window.location.pathname.includes("singleProduct.html")) {
      // Show only 4 products
      const featuredProducts = data.slice(0, 4); // First 4 products
      featuredProducts.forEach(function (product) {
        var productHTML = `
                    <div class="pro">
                        <img src="${product.image}" alt="Product Image"
                        onClick="window.location.href='singleProduct.html?id=${product.id}'"
                        >
                        <div class="des">
                            <span>Brand Name</span>
                            <h5>${product.name}</h5>
                            <div class="star">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <h4>$${product.price}</h4>
                        </div>
                        <a href="#">
                          <i class="fa-solid fa-cart-shopping cart" 
                             data-id="${product.id}"
                             data-name="${product.name}"
                             data-price="${product.price}"
                             data-image="${product.image}">
                          </i>
                        </a>
                    </div>
                `;
        proContainer.innerHTML += productHTML;
      });
    } else {
      // For other pages, show all products
      data.forEach(function (product) {
        var productHTML = `
                    <div class="pro">
                        <img src="${product.image}" alt="Product Image"
                        onClick="window.location.href='singleProduct.html?id=${product.id}'"
                        >
                        <div class="des">
                            <span>Brand Name</span>
                            <h5>${product.name}</h5>
                            <div class="star">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <h4>$${product.price}</h4>
                        </div>
                        <a href="#">
                          <i class="fa-solid fa-cart-shopping cart" 
                             data-id="${product.id}"
                             data-name="${product.name}"
                             data-price="${product.price}"
                             data-image="${product.image}">
                          </i>
                        </a>
                    </div>
                `;
        proContainer.innerHTML += productHTML;
      });
    }
  } else {
    console.error("Error fetching the JSON file");
  }
};

xhr.onerror = function (error) {
  console.error("Error:", error);
};

xhr.send();
