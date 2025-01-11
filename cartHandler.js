document.addEventListener("DOMContentLoaded", () => {
    // Add event listeners to cart icons
    document.body.addEventListener("click", (e) => {
      if (e.target.classList.contains("cart")) {
        e.preventDefault(); // Prevent default anchor behavior
        updateCartCount();
        // Get the product details from the clicked cart icon
        const productId = e.target.getAttribute("data-id");
        const productName = e.target.getAttribute("data-name");
        const productPrice = e.target.getAttribute("data-price");
        const productImage = e.target.getAttribute("data-image");
  
        // Check if data attributes are properly retrieved
        if (productId && productName && productPrice && productImage) {
          // Create a product object to add to cart
          const product = {
            id: productId,
            name: productName,
            price: parseFloat(productPrice),
            image: productImage,
            quantity: 1
          };
  
          addToCart(product);
        } 
      }
    });
  });
  
  // Add to local storage 
  function addToCart(product) {
    // Retrieve the current cart from localStorage or initialize it
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Check if the product already exists in the cart
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1; // Increment quantity if product exists
    } else {
      cart.push(product); // Add new product if it doesn't exist in the cart
    }
  
    localStorage.setItem("cart", JSON.stringify(cart));
    //alert("Product added to cart!");
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cart.reduce((count, item) => count + item.quantity, 0); // Sum of all product quantities
    const cartCountElements = document.querySelectorAll('.cart__count'); // Select all elements with the class
  
    cartCountElements.forEach((element) => {
      element.textContent = totalCount; // Update the count in each element
    });
  }