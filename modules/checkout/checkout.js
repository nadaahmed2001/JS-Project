document.addEventListener("DOMContentLoaded", () => {
    (function populateFormFieldsFromLocalStorage() {
        const storedData = localStorage.getItem("formData");
        if (storedData) {
          const formDataArray = JSON.parse(storedData); // Parse the data to get the array  
          if (formDataArray.length > 0) {
            const formData = formDataArray[0]; // Get the first item in the array
      
            document.getElementById("name").value = (formData.firstName + " " + formData.lastName) || "";
            document.getElementById("email").value = formData.email || "";
            document.getElementById("phone").value = formData.phone || "";
            document.getElementById("address").value = formData.address || "";
            document.getElementById("additionalInfo").value = formData.additionalInfo || "";
          }
        }
      })();
  
    // Function to extract query parameters
    function getQueryParams() {
      const params = new URLSearchParams(window.location.search);
      return {
        subtotal: params.get("subtotal") || "$0.00",
        shipping: params.get("shipping") || "Free Shipping",
        total: params.get("total") || "$0.00",
      };
    }
  
    function getCartData() {
      const cartData = localStorage.getItem("cart");
      return cartData ? JSON.parse(cartData) : [];
    }
  
    function populateOrderTable() {
      const { subtotal, shipping, total } = getQueryParams();
      const cartData = getCartData();
      const tableBody = document.querySelector("table tbody");
  
      // Clear existing rows in the table body
      tableBody.innerHTML = "";
  
      // Populate table with cart items
      cartData.forEach((item) => {
        const row = `
          <tr>
            <td>
              <img
                src="../../images/${item.image}"
                alt="${item.name}"
                class="order__img"
              />
            </td>
            <td>
              <h3 class="table__title">${item.name}</h3>
            </td>
            <td><span class="table__price">$${(item.price * item.quantity).toFixed(2)}</span></td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
  
      // Add subtotal row
      const subtotalRow = `
        <tr>
          <td><span class="order__subtitle">Subtotal</span></td>
          <td colspan="2"><span class="table__price">${subtotal}</span></td>
        </tr>
      `;
      tableBody.innerHTML += subtotalRow;
  
      // Add shipping row
      const shippingRow = `
        <tr>
          <td><span class="order__subtitle">Shipping</span></td>
          <td colspan="2"><span class="table__price">${shipping}</span></td>
        </tr>
      `;
      tableBody.innerHTML += shippingRow;
  
      // Add total row
      const totalRow = `
        <tr>
          <td><span class="order__subtitle">Total</span></td>
          <td colspan="2"><span class="order__grand-total">${total}</span></td>
        </tr>
      `;
      tableBody.innerHTML += totalRow;
    }
  
    populateOrderTable();
    function getUserInfo() {
        const storedData = localStorage.getItem("formData");
        return storedData ? JSON.parse(storedData) : {};
      }
    // Function to make the API call
    async function checkout() {
      const { subtotal, shipping, total } = getQueryParams();
      const cartData = getCartData();
      const userInfo = getUserInfo();
  
      // Prepare data to send to the API
      const requestData = {
        user: {
          name: userInfo.firstName + " " + userInfo.lastName,
          email: userInfo.email,
          phone: userInfo.phone,
          address: userInfo.address,
        },
        cart: cartData,
        totals: {
          subtotal,
          shipping,
          total,
        },
      };
  
      console.log("Sending data to API:", requestData);
  
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
  
        if (response.ok) {
          const responseData = await response.json();
          console.log("API Response:", responseData);
  
          // Clear local storage on success
          localStorage.removeItem("cart");
          //localStorage.removeItem("formData");
  
          // Navigate to the homepage
          alert("Checkout successful! Redirecting to homepage...");
          window.location.href = "../../index.html"; // Update with your actual homepage path
        } else {
          console.error("API Error:", response.statusText);
          alert("Checkout failed. Please try again.");
        }
      } catch (error) {
        console.error("Network Error:", error);
        alert("Unable to process your request at this time.");
      }
    }
  
    // Add event listener to the "Place Order" button
    const placeOrderButton = document.querySelector("button[type='submit']");
    placeOrderButton.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default form submission
      checkout(); // Call the checkout function
    });
    
  });
  
  