const params = new URLSearchParams(window.location.search);
const subtotal = params.get("subtotal") || "$0.00";
const shipping = params.get("shipping") || "Free Shipping";
const total = params.get("total") || "$0.00";

// Remove the dollar sign from the total and convert to a number
const formattedTotal = parseFloat(total.replace('$', ''));
console.log(formattedTotal)
// Debugging logs
console.log('Subtotal:', subtotal);
console.log('Shipping:', shipping);
console.log('Total:', total);
console.log('Formatted Total:', formattedTotal);

// Display the total amount on the page
document.getElementById("totalAmount").textContent = total;


////////////////////////////////////////////////


function getPayPalToken() {
    const clientId = 'AQhWUQ2x88zdKIrrc3x5tGFyAyCWojlI8LcZwz1Pe8lT1ikEEIKsJVWZ9pJnDBRiivHLAoO-CihJAnj2';  // Replace with your Client ID
    const secretKey = 'ELd6MzHX6seUnliCgOkmIevovqlnK1iQvYSkVj2SR2rFHENimGCMNHP4IP0IZZEziHN4vfTZtVjJI36t';  // Replace with your Secret Key
    const accessToken ='A21AAJdyXCWvg75qktfB2uIDJ9KO7aWIBsyhR-m8r1CUK7cHvnuQbzMRahdZ48LNQPpZVbI-3slv-wSwx5ZBBXCjjWjyLOkfQ'
    // Create the Basic Authentication header (base64 encoding of clientId:secretKey)
    const encodedCredentials = btoa(clientId + ':' + secretKey);

    // Make a request to get the OAuth token
    fetch('https://api.sandbox.paypal.com/v1/oauth2/token', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${encodedCredentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'  // Use client_credentials grant type
    })
    .then(response => response.json())
    .then(data => {
        if (data.access_token) {
            console.log('Access Token:', data.access_token);
            // Save the access token to use for API requests
            accessToken = data.access_token;
        } else {
            console.error('Failed to get access token');
        }
    })
    .catch(error => console.error('Error getting OAuth token:', error));
}




console.log('Access Token:', accessToken );






// Sample function to create an order with PayPal API

function createOrder() {
    // Make an API call to PayPal to create an order
    fetch('https://api.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN' // Get the OAuth token
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: '100.00' // Example order total
          }
        }]
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.id) {
        console.log('Order Created with ID:', data.id);
        // Save the order ID for later (for capturing the payment)
      } else {
        throw new Error('Order creation failed');
      }
    })
    .catch(error => console.error('Error creating order:', error));
  }



// Function to capture the payment for a PayPal order
function capturePayment(orderID) {
    fetch(`https://api.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': 'A21AAJdyXCWvg75qktfB2uIDJ9KO7aWIBsyhR-m8r1CUK7cHvnuQbzMRahdZ48LNQPpZVbI-3slv-wSwx5ZBBXCjjWjyLOkfQ',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'COMPLETED') {
        console.log('Payment successfully captured');
      } else {
        console.error('Payment capture failed');
      }
    })
    .catch(error => console.error('Error capturing payment:', error));
  }

























// Initialize PayPal Buttons
paypal.Buttons({
    createOrder: function(data, actions) {
        console.log('Creating Order with Total:', formattedTotal.toFixed(2));
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: formattedTotal.toFixed(2) // Amount to deduct from customer
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        console.log('Order approved. Data:', data);
        return actions.order.capture().then(function(details) {
            console.log('Transaction completed:', details);
            alert('Transaction completed by ' + details.payer.name.given_name);
        });
    },
    onError: function(err) {
        console.error('PayPal Checkout Error:', err);
       //alert('An error occurred: ' + JSON.stringify(err));
    }
}).render('#paypal-button-container');


