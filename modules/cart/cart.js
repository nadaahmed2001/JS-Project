document.addEventListener("DOMContentLoaded", () => {
  // Retrieve the cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Select the cart table body to populate with items
  const cartTableBody = document.querySelector(".table tbody");

  cartTableBody.innerHTML = "";

  // Check if the cart is empty
  if (cart.length === 0) {
    cartTableBody.innerHTML = `<tr><td colspan="6">Your cart is empty.</td></tr>`;
  } else {
    // Loop through the cart items and populate the table rows
    cart.forEach((product) => {
      const rowHTML = `
        <tr>
          <td>
            <img src="../../images/${product.image}" alt="${product.name}" class="table__img" />
          </td>
          <td>
            <h3 class="table__title">${product.name}</h3>
            <p class="table__description">Product description here</p>
          </td>
          <td>
            <span class="table__price">$${product.price}</span>
          </td>
          <td>
            <input type="number" value="${product.quantity}" class="quantity" min="1" />
          </td>
          <td>
            <span class="subtotal">$${(product.price * product.quantity).toFixed(2)}</span>
          </td>
          <td>
            <i class="fi fi-rs-trash table__trash" data-id="${product.id}"></i>
          </td>
        </tr>
      `;
      cartTableBody.innerHTML += rowHTML;
    });
  }

  // Handle quantity change and update localStorage
  cartTableBody.addEventListener("input", (e) => {
    if (e.target.classList.contains("quantity")) {
      const updatedQuantity = parseInt(e.target.value);
      const productId = e.target.closest("tr").querySelector(".table__trash").getAttribute("data-id");

      const product = cart.find((item) => item.id === productId);
      if (product) {
        product.quantity = updatedQuantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateSubtotal(product);
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
      location.reload(); // Reload the page to reflect changes
    }
  });

  // Function to update subtotal in each row
  function updateSubtotal(product) {
    const row = document.querySelector(`.table__trash[data-id="${product.id}"]`).closest("tr");
    const subtotalElement = row.querySelector(".subtotal");
    subtotalElement.textContent = `$${(product.price * product.quantity).toFixed(2)}`;
  }
});
