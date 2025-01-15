import { loadConfig } from "../../javascript.js";

document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const couponInput = document.querySelector(".coupon__form .form__input");
  const applyCouponBtn = document.querySelector(".coupon__form .btn");
  const cartSubtotalElem = document.querySelector(".cart__subtotal-value");
  const totalElem = document.querySelector(".cart__total-value");
  const cartTableBody = document.querySelector(".table tbody");
  let shipping = 20;
  const checkoutBtn = document.querySelector("#btnCheckout");

  loadConfig().then(config => {
          shipping = config ? config.shippingValue : 0;})

  let coupons = [];
  const fetchCoupons = (() => {
    fetch("../../database/coupon.json")
      .then((response) => response.json())
      .then((data) => {
        coupons = data;
      })
      .catch((err) => console.error("Error fetching coupons:", err));
  })();

  const renderCartItems = () => {
    cartTableBody.innerHTML = "";
    if (cart.length === 0) {
      cartTableBody.innerHTML = `<tr><td colspan="6">Your cart is empty.</td></tr>`;
      updateCartTotals();
    } else {
      cart.forEach((product) => {
        const rowHTML = `
            <tr data-id="${product.id}">
              <td><img src="../../images/${product.image}" alt="${
          product.name
        }" class="table__img" /></td>
              <td><h3 class="table__title">${product.name}</h3></td>
              <td><span class="table__price">$${product.price}</span></td>
              <td><input type="number" value="${
                product.quantity
              }" class="quantity" min="1" /></td>
              <td><span class="subtotal">$${(
                product.price * product.quantity
              ).toFixed(2)}</span></td>
              <td><i class="fi fi-rs-trash table__trash" data-id="${
                product.id
              }"></i></td>
            </tr>
          `;
        cartTableBody.innerHTML += rowHTML;
      });
      updateCartTotals();
    }
  };
  renderCartItems();

  function updateCartTotals() {
    let subtotal = 0;
    cart.forEach((item) => {
      subtotal += item.price * item.quantity;
    });

    const total = subtotal + shipping;

    console.log(total)
    cartSubtotalElem.textContent = `$${subtotal.toFixed(2)}`;
    totalElem.textContent = `$${total.toFixed(2)}`;
  }

  /* Events */
  applyCouponBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const couponCode = couponInput.value.trim().toUpperCase();
    const coupon = coupons.find((c) => c.code === couponCode);

    if (coupon) {
      let subtotal = cart.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
      let discount = 0;

      if (coupon.type === "percentage") {
        discount = (subtotal * coupon.value) / 100;
      } else if (coupon.type === "fixed") {
        discount = coupon.value;
      }

      subtotal -= discount;

      const total = subtotal + shipping;

      cartSubtotalElem.textContent = `$${subtotal.toFixed(2)}`;
      totalElem.textContent = `$${total.toFixed(2)}`;

      (() => {
        document.querySelector(".cart-coupon-alert").innerHTML = "Your coupon is successfully applied";
        document.querySelector(".cart-coupon-alert").style.display =
          "block";
      })();
    } else {
      (() => {
        document.querySelector(".cart-coupon-alert").innerHTML = "Invalid coupon code";
        document.querySelector(".cart-coupon-alert").style.display =
          "block";
      })();
    }
  });

  cartTableBody.addEventListener("input", (e) => {
    if (e.target.classList.contains("quantity")) {
      const updatedQuantity = parseInt(e.target.value);
      const productId = e.target
        .closest("tr")
        .querySelector(".table__trash")
        .getAttribute("data-id");
      const product = cart.find((item) => item.id == productId);
      if (product) {
        product.quantity = updatedQuantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems();
      }
    }
    updateCartCount();
  });

  cartTableBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("table__trash")) {
      const productId = e.target.getAttribute("data-id");
      const row = e.target.closest("tr");
      row.remove();
      function removeFromLocalStorage(productId) {
        const updatedCart = cart.filter((item) => item.id != productId);
        cart = updatedCart;
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      removeFromLocalStorage(productId);
      updateCartTotals();
      updateCartCount();
    }
  });
 //navigate to checkout page and send subtotal , shipping and total as query parameter in url in this event

    //navigate to checkout page and send subtotal , shipping and total as query parameter in url in this event
checkoutBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  console.log("checkout.html?subtotal="+cartSubtotalElem.textContent+"&shipping="+shipping+"&total="+totalElem.textContent);
  window.location.href = "../checkout/checkout.html?subtotal="+cartSubtotalElem.textContent+"&shipping="+shipping+"&total="+totalElem.textContent;
});

});

function updateCartCount () {
  const totalCount = cart.reduce((count, item) => count + item.quantity, 0); 
  const cartCountElement = document.querySelector('.cart__count'); 
  cartCountElement.textContent = totalCount;
}

