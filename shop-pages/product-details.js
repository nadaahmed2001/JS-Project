// Fetch the product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

if (productId) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "allProducts.json", true);

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
        <select>
          <option>Select Size</option>
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
          <option>Extra Large</option>
        </select>
        <input type="number" value="1" />
        <button class="normal">Add To Cart</button>
        <h2>Product Details</h2>
        <span>${product.description}</span>
      </div>
        `;
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
