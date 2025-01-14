
 // Assuming xhr.request and proContainer are already set up as before
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:3000/product", true);

xhr.onload = function () {
  if (xhr.status === 200) {
    var data = JSON.parse(xhr.responseText);
    var proContainer = document.querySelector(".pro-container");

    // Store all products
    let allProducts = data;

    // Store the filtered products initially as all products
    let filteredProducts = [...allProducts];

    // Search Input Handling
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', e => {
      const value = e.target.value.toLowerCase();

      // Filter based on name search
      filteredProducts = allProducts.filter(pro => pro.name.toLowerCase().includes(value));
      
      // Apply gender filter if selected
      updateProductsDisplay();
    });

    // Gender filter buttons
    const btnMan = document.querySelector('.btn-man');
    const btnWomen = document.querySelector('.btn-women');

    // Gender filter state
    let selectedGender = null;

    // Handle gender filter button clicks
    btnMan.addEventListener('click', () => {
      selectedGender = 'man';
      filterByGender();
    });

    btnWomen.addEventListener('click', () => {
      selectedGender = 'woman';
      filterByGender();
    });

    // Function to filter products based on selected gender
    function filterByGender() {
      if (selectedGender) {
        filteredProducts = allProducts.filter(pro => pro.gender === selectedGender);
      } else {
        filteredProducts = [...allProducts];
      }

      // Apply search filtering after gender filtering
      const value = searchInput.value.toLowerCase();
      filteredProducts = filteredProducts.filter(pro => pro.name.toLowerCase().includes(value));

      updateProductsDisplay();
    }

    // Function to update products display
    function updateProductsDisplay() {
      proContainer.innerHTML = "";

      if (filteredProducts.length > 0) {
        filteredProducts.forEach(pro => {
          const productHTML = `
            <div class="pro">
              <img src="${pro.image}" alt="Product Image"
                   onClick="window.location.href='singleProduct.html?id=${pro.id}'">
              <div class="des">
                <span>Brand Name</span>
                <h5>${pro.name}</h5>
                <div class="star">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <h4>$${pro.price}</h4>
              </div>
              <a href="#">
                <i class="fa-solid fa-cart-shopping cart" 
                   data-id="${pro.id}"
                   data-name="${pro.name}"
                   data-price="${pro.price}"
                   data-image="${pro.image}">
                </i>
              </a>
            </div>
          `;
          proContainer.innerHTML += productHTML;
        });
      } else {
        proContainer.innerHTML = "<p>No matches found</p>";
      }
    }

    // Initial display of all products
    updateProductsDisplay();

  } else {
    console.error("Error fetching the JSON file");
  }
};

xhr.onerror = function (error) {
  console.error("Error:", error);
};

xhr.send();
