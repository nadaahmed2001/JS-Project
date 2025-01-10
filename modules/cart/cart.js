document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const couponInput = document.querySelector(".coupon__form .form__input");
  const applyCouponBtn = document.querySelector(".coupon__form .btn");

  // Ensure these elements exist in the DOM before proceeding
  const cartSubtotalElem = document.querySelector(".cart__subtotal-value");
  const shippingElem = document.querySelector(".cart__shipping-value");
  const totalElem = document.querySelector(".cart__total-value");
  const cartTableBody = document.querySelector(".table tbody");

  if (!cartSubtotalElem || !shippingElem || !totalElem ) {
    console.error("Some required elements are missing from the DOM.");
    return; // Exit if required elements are not found
  }

  let coupons = [];

  // Fetch coupons from the JSON file
  function fetchCoupons() {
    fetch('../../database/coupon.json')
      .then(response => response.json())
      .then(data => {
        coupons = data;  // Store the fetched coupons in the `coupons` array
      })
      .catch(err => console.error('Error fetching coupons:', err));
  }

  // Function to update subtotal, shipping, and total
  function updateCartTotals() {
    const subtotal = cart.reduce((total, product) => total + (product.price * product.quantity), 0);
    const shipping = 10; // Default shipping cost
    const total = subtotal + shipping;

    // Update the UI
    cartSubtotalElem.textContent = `$${subtotal.toFixed(2)}`;
    shippingElem.textContent = `$${shipping.toFixed(2)}`;
    totalElem.textContent = `$${total.toFixed(2)}`;
  }

  // Apply coupon functionality
  applyCouponBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form submission

    const couponCode = couponInput.value.trim().toUpperCase(); // Ensure the coupon code is uppercase

    // Find the coupon based on the entered code
    const coupon = coupons.find(c => c.code === couponCode);

    if (coupon) {
      // Apply discount based on coupon type
      let subtotal = cart.reduce((total, product) => total + (product.price * product.quantity), 0);
      let discount = 0;

      if (coupon.type === "percentage") {
        discount = (subtotal * coupon.value) / 100;  // Apply percentage discount
      } else if (coupon.type === "fixed") {
        discount = coupon.value;  // Apply fixed discount
      }

      // Subtract the discount from the subtotal
      subtotal -= discount;

      // Update totals with discount applied
      const shipping = 10; // Shipping is still fixed
      const total = subtotal + shipping;

      // Update UI with new totals
      cartSubtotalElem.textContent = `$${subtotal.toFixed(2)}`;
      totalElem.textContent = `$${total.toFixed(2)}`;
    } else {
      // Invalid coupon
      alert("Invalid coupon code!");
    }
  });

  // Function to render the cart items in the table
  function renderCartItems() {
    cartTableBody.innerHTML = ""; // Clear existing rows

    if (cart.length === 0) {
      cartTableBody.innerHTML = `<tr><td colspan="6">Your cart is empty.</td></tr>`;
      updateCartTotals();
    } else {
      cart.forEach((product) => {
        const rowHTML = `
          <tr>
            <td><img src="../../images/${product.image}" alt="${product.name}" class="table__img" /></td>
            <td><h3 class="table__title">${product.name}</h3></td>
            <td><span class="table__price">$${product.price}</span></td>
            <td><input type="number" value="${product.quantity}" class="quantity" min="1" /></td>
            <td><span class="subtotal">$${(product.price * product.quantity).toFixed(2)}</span></td>
            <td><i class="fi fi-rs-trash table__trash" data-id="${product.id}"></i></td>
          </tr>
        `;
        cartTableBody.innerHTML += rowHTML;
      });

      // Recalculate the totals after rendering the cart items
      updateCartTotals();
    }
  }

  // Render cart items on page load
  renderCartItems();

  // Handle quantity change and update localStorage
  cartTableBody.addEventListener("input", (e) => {
    if (e.target.classList.contains("quantity")) {
      const updatedQuantity = parseInt(e.target.value);
      const productId = e.target.closest("tr").querySelector(".table__trash").getAttribute("data-id");

      const product = cart.find((item) => item.id === productId);
      if (product) {
        product.quantity = updatedQuantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems();
      }
    }
  });

  // Handle delete product from cart
  cartTableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("table__trash")) {
      const productId = e.target.getAttribute("data-id");

      // Remove the product from the cart
      const updatedCart = cart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Re-render the cart table
      renderCartItems();
    }
  });

  // Fetch coupons when the page loads
  fetchCoupons();





  
});
