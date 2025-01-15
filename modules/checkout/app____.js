
const params = new URLSearchParams(window.location.search);
const subtotal = decodeURIComponent(params.get("subtotal") || "$0.00").replace("$", "").trim();
const shipping = decodeURIComponent(params.get("shipping") || "0").trim();
const total = decodeURIComponent(params.get("total") || "$0.00").replace("$", "").trim();

const formattedSubtotal = parseFloat(subtotal);
const formattedShipping = parseFloat(shipping);
const formattedTotal = parseFloat(total);

document.getElementById("totalAmount").textContent = `$${formattedTotal.toFixed(2)}`;



window.paypal
  .Buttons({
    style: {
      shape: "rect",
      layout: "vertical",
      color: "gold",
      label: "paypal",
    },

    async createOrder() {
      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: [
              {
                id: "YOUR_PRODUCT_ID",
                quantity: "YOUR_PRODUCT_QUANTITY",
              },
            ],
            amount: formattedTotal, // Pass the dynamic total amount
          }),
        });

        const orderData = await response.json();
        if (orderData.id) return orderData.id;

        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      } catch (error) {
        console.error(error);
      }
    },

    async onApprove(data, actions) {
      try {
        const response = await fetch(`/api/orders/${data.orderID}/capture`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const orderData = await response.json();
        const transaction =
          orderData?.purchase_units?.[0]?.payments?.captures?.[0];

        if (transaction) {
          console.log(
            `Transaction ${transaction.status}: ${transaction.id}`,
            orderData
          );
          // Show success message or update the UI
        }
      } catch (error) {
        console.error(error);
      }
    },
  })
  .render("#paypal-button-container");