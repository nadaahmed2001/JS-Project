// Fetch products using XMLHttpRequest
var xhr = new XMLHttpRequest();
xhr.open("GET", "../database/allProducts.json", true);

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
    } else { //Shop page (show all products)
    // Pagination container
    var pagination = document.querySelector("#pagination");

    // Variables for pagination
    const productsPerPage = 12;
    const totalProducts = data.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    let currentPage = 1;


    function displayProducts(page) {
      proContainer.innerHTML = ""; // Clear current products
      //The Index of the first and last product to display on the selected page
      const startIndex = (page - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;

      const productsToDisplay = data.slice(startIndex, endIndex);
      productsToDisplay.forEach(function (product) {
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
    }//End displayProducts function


    function updatePaginationButtons() {
      pagination.innerHTML = ""; // Clear current buttons

      // Add "Previous" button
      if (currentPage > 1) {
        pagination.innerHTML += `<a href="#" class="prev">&laquo;</a>`;
      }

      // Add page buttons
      for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `<a href="#" class="page ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</a>`;
      }

      // Add "Next" button
      if (currentPage < totalPages) {
        pagination.innerHTML += `<a href="#" class="next">&raquo;</a>`;
      }
    }

    // Event delegation for pagination buttons
    pagination.addEventListener("click", function (e) {
      e.preventDefault();
      //  if  clicked element is a page button
      if (e.target.classList.contains("page")) {
        currentPage = parseInt(e.target.getAttribute("data-page"));
        displayProducts(currentPage);
        updatePaginationButtons();

      // if clicked element is a previous button
      } else if (e.target.classList.contains("prev")) {
        if (currentPage > 1) {
          currentPage--;
          displayProducts(currentPage);
          updatePaginationButtons();
        }
      
      // if clicked element is a next button
      } else if (e.target.classList.contains("next")) {
        if (currentPage < totalPages) {
          currentPage++;
          displayProducts(currentPage);
          updatePaginationButtons();
        }
      }
    });

    // Initial rendering
    displayProducts(currentPage);
    updatePaginationButtons();
  }
  } else {
    console.error("Error fetching the JSON file");
  }
};


xhr.onerror = function (error) {
  console.error("Error:", error);
};

xhr.send();
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
