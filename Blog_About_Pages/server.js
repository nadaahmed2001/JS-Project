// const paypal = require('@paypal/checkout-server-sdk');

// const environment = new paypal.core.SandboxEnvironment(
//   'YOUR_SANDBOX_CLIENT_ID',
//   'YOUR_SANDBOX_CLIENT_SECRET'
// );
// const client = new paypal.core.PayPalHttpClient(environment);

// app.post('/capture-payment', async (req, res) => {
//   const orderID = req.body.orderID;

//   const request = new paypal.orders.OrdersCaptureRequest(orderID);
//   request.requestBody({});

//   try {
//     const capture = await client.execute(request);
//     res.json({ status: 'success', details: capture });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });
