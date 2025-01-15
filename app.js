require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const paypal = require('./modules/checkout/paypal');



// Set up EJS and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'modules/checkout'));
app.use(express.static(path.join(__dirname, 'assets')));

// Home route
app.get('/', (req, res) => {
    const subtotal = req.query.subtotal;
    const shipping = req.query.shipping;
    const total = req.query.total;
    res.render('Payment', { total });
});


app.post('/pay', async(req, res) => {
    try {
    const url = await paypal.createOrder()
    res.redirect(url)
    } catch (error) {
    res.send('Error: ' + error)
    }
    })
    app.get('/complete-order', async (req, res) =>{
    //res.send('Complete Order')
      try {

       await paypal.CapturePayment(req.query.token);
       res.json({ success: true, message: "Your transaction was successfully completed." });
      }catch (error){
        res.send('Error:'+error)
      }
    })
    app.get('/cancel-order', (req, res) => {
    res.redirect('/')
    })







// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
