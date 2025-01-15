// paypal.Buttons({
//     createOrder: function (data, actions) {
//         // Set up the transaction details
//         return actions.order.create({
//             purchase_units: [{
//                 amount: {
//                     value: '10.00' // Replace with the total amount
//                 }
//             }]
//         });
//     },
//     onApprove: function (data, actions) {
//         // Capture the funds from the transaction
//         return actions.order.capture().then(function (details) {
//             alert('Transaction completed by ' + details.payer.name.given_name);
//         });
//     },
//     onError: function (err) {
//         console.error('PayPal Checkout Error:', err);
//     }
// }).render('#paypal-button-container');












// // Extract query parameters from the URL
// const params = new URLSearchParams(window.location.search);
// const subtotal = params.get("subtotal") || "$0.00";
// const shipping = params.get("shipping") || "Free Shipping";
// const total = params.get("total") || "$0.00";

// /// Remove the dollar sign from the total and convert to a number
// const formattedTotal = parseFloat(total.replace('$', ''));

// // Display the total amount on the page
// document.getElementById("totalAmount").textContent = total;

// // Initialize PayPal Buttons
// paypal.Buttons({
//     createOrder: function(data, actions) {
//         // Set up the order details
//         return actions.order.create({
//             purchase_units: [{
//                 amount: {
//                     value: formattedTotal.toFixed(2)  // Amount to deduct from customer
//                 }
//             }]
//         });
//     },
//     onApprove: function(data, actions) {
//         // Capture funds after approval
//         return actions.order.capture().then(function(details) {
//             console.log('Transaction completed:', details);
//             alert('Transaction completed by ' + details.payer.name.given_name);
//         });
//     },
//     onError: function(err) {
//         console.error('PayPal Checkout Error:', err);
//         alert('An error occurred. Please try again.');
//     }
// }).render('#paypal-button-container');



const params = new URLSearchParams(window.location.search);
const subtotal = decodeURIComponent(params.get("subtotal") || "$0.00").replace("$", "").trim();
const shipping = decodeURIComponent(params.get("shipping") || "0").trim();
const total = decodeURIComponent(params.get("total") || "$0.00").replace("$", "").trim();

// Convert string values to numbers
const formattedSubtotal = parseFloat(subtotal);
const formattedShipping = parseFloat(shipping);
const formattedTotal = parseFloat(total);

// Debug logs to verify the values
console.log("Decoded Subtotal:", formattedSubtotal);
console.log("Decoded Shipping:", formattedShipping);
console.log("Decoded Total:", formattedTotal);

// Display the total amount on the page
document.getElementById("totalAmount").textContent = `$${formattedTotal.toFixed(2)}`;

// // Initialize PayPal Buttons
// paypal.Buttons({
//     createOrder: function(data, actions) {
//         return actions.order.create({
//             purchase_units: [{
//                 amount: {
//                     value: formattedTotal // Amount to deduct from the customer
//                 }
//             }]
//         });
//     },
//     onApprove: function(data, actions) {
//         return actions.order.capture().then(function(details) {
//             console.log('Transaction completed:', details);
//             alert('Transaction completed by ' + details.payer.name.given_name);
//         });
//     },
    
//     onError: function(err) {
//         console.error('PayPal Checkout Error:', err);
//         alert('An error occurred. Please try again.');
//     }

// }).render('#paypal-button-container');
// console.log('Formatted Total:', formattedTotal);
// console.log('Order created:', data);
// console.log('Order approved:', details);

paypal.Buttons({
    createOrder: function (actions) {
      
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: formattedTotal.toFixed(2) // Ensure value is correct
                }
            }]
        });
    },
    onApprove: function (actions) {
       
        return actions.order.capture().then(function (details) {
            console.log('Transaction completed:', details); // Log transaction details
            alert('Transaction completed by ' + details.payer.name.given_name);
        }).catch(function (err) {
            console.error('Capture Error:', err); // Log capture errors
            alert('An error occurred during transaction capture.');
        });
    },
    onError: function (err) {
        console.error('PayPal Checkout Error:', err); // Log error details
        alert('An error occurred. Please try again.');
    }
}).render('#paypal-button-container');



console.log('Formatted Total:', formattedTotal);

