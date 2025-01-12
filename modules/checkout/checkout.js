document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartProductsBody = document.querySelector(".cart__products-body");
    const cartSubtotalElem = document.querySelector(".cart__subtotal-value");
    const shippingElem = document.querySelector(".cart__shipping-value");
    const totalElem = document.querySelector(".cart__total-value");

    const shipping = 20;

    const renderCartProducts = () => {
      cartProductsBody.innerHTML = "";

      if (cart.length === 0) {
        cartProductsBody.innerHTML = `<tr><td colspan="6">Your cart is empty.</td></tr>`;
      } else {
        cart.forEach((product) => {
          const rowHTML = `
            <tr>
              <td><img src="../../images/${product.image}" alt="${product.name}" class="product__img" /></td>
              <td>${product.name}</td>
              <td>$${product.price.toFixed(2)}</td>
              <td>${product.quantity}</td>
              <td>$${(product.price * product.quantity).toFixed(2)}</td>
              <td><button class="rename-btn" data-id="${product.id}">Rename</button></td>
            </tr>
          `;
          cartProductsBody.innerHTML += rowHTML;
        });
      }
    };

    const updateCartTotals = () => {
      let subtotal = 0;
      cart.forEach((item) => {
        subtotal += item.price * item.quantity;
      });

      const total = subtotal + shipping;
      cartSubtotalElem.textContent = `$${subtotal.toFixed(2)}`;
      shippingElem.textContent = `$${shipping.toFixed(2)}`;
      totalElem.textContent = `$${total.toFixed(2)}`;
      
    };

    renderCartProducts();
    updateCartTotals();

    cartProductsBody.addEventListener("click", (e) => {
      if (e.target.classList.contains("rename-btn")) {
        const productId = e.target.dataset.id;
        const newName = prompt("Enter new name for the product:");
        if (newName) {
          const product = cart.find((item) => item.id === productId);
          if (product) {
            product.name = newName;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCartProducts();
          }
        }
      }
    });
  });
  const calculateTotals = () => {
    let subtotal = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    const shipping = 20;
    const total = subtotal + shipping;

    cartSubtotalElem.textContent = `$${subtotal.toFixed(2)}`;
    shippingElem.textContent = `$${shipping.toFixed(2)}`;
    totalElem.textContent = `$${total.toFixed(2)}`;

    // Save updated totals to localStorage
    localStorage.setItem("updatedCartTotals", JSON.stringify({
      subtotal: subtotal.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2)
    }));
  };


