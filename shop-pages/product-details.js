// Fetch the product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

if (productId) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../database/allProducts.json", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);

      // Find the product with the matching ID
      const product = data.find(p => p.id == productId);

      if (product) {
        // Display the product details
        document.querySelector("#prodDetails").innerHTML = `
      <div class="single-prod-image">
        <img src="${product.image}" width="100%" id="MainImage" alt="" />
      </div>
      <div class="single-prod-details">
        <h6>${product.name}</h6>
        <h2>$${product.price}</h2>
        <input type="number" id="productQuantity"  value="1" min="1" />
        <button class="normal btnAddToCart cart">Add To Cart</button>
        <h2>Product Details</h2>
        <span>${product.description}</span>
      </div>
        `;

        // Add event listener for the Add To Cart button
        document.querySelector(".btnAddToCart").addEventListener("click", function () {
          const quantityInput = document.querySelector("#productQuantity");
          const quantity = parseInt(quantityInput.value);

          if (quantity > 0) {
            addToCart(product, quantity);
          } 
        });
      } else {
        console.error("Product not found");
        document.querySelector("#prodDetails").innerHTML = `<p>Product not found</p>`;
      }
    } else {
      console.error("Error fetching the JSON file");
    }
  };

  xhr.onerror = function (error) {
    console.error(error);
  };

  xhr.send();
} else {
  console.error("No product ID specified in the URL");
  document.querySelector("#prodDetails").innerHTML = `<p>No product selected</p>`;
}

function addToCart(product, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  //if product already exists just increment it
  const existingProduct = cart.find(item => item.id == product.id);
  if (existingProduct) {
    existingProduct.quantity += quantity; 
  } else {
    cart.push({ ...product, quantity }); 
  }

  localStorage.setItem("cart", JSON.stringify(cart)); 
}
