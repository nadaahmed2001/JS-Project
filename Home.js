// import { loadConfig } from "../../javascript.js";

function fetchProducts(url) {
  console.log(`Fetching from URL: ${url}`);
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error fetching the JSON file');
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
}

// Function to render products based on a given container
function renderProducts(data, containerSelector, isFeatured) {
  const container = document.querySelector(containerSelector);
  
  data.forEach(product => {
    // Check if the product matches the 'featured' condition
    if (product.isFeatured === isFeatured) {
      const productHTML = `
        <div class="pro">
          <img src="${product.image}" alt="Product Image" onClick="window.location.href='./shop-pages/singleProduct.html?id=${product.id}'">
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
            </i>
          </a>
        </div>
      `;
      
      container.innerHTML += productHTML;
    }
  });
}

(async function () {
  try {
    const data = await fetchProducts('http://localhost:3000/product');
    
    renderProducts(data, '.pro-container', 'true');
    renderProducts(data, '.pro-container2', 'false');
  } catch (error) {
    console.error('Error loading products:', error);
  }
})();


function getProducts() {
  loadConfig().then(config => {
    const url = config ? config.getProductsGateway : "";
    (async function () {
      try {
        const data = await fetchProducts(url || 'http://localhost:3000/product');
        renderProducts(data, '.pro-container', 'true');
        renderProducts(data, '.pro-container2', 'false');
      } catch (error) {
        console.error('Error loading products:', error);
      }
    })();
  }).catch(error => {
    console.error('Error loading config:', error);
  });
}


