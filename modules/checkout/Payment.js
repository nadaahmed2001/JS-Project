// //import depandencies ely 3malnalha install 
// // inistialis dotenv ,expresss ,ejs
// require('dotenv').config()
// const express =require('express')
// const app= express()
// const path = require('path');
// app.set('view engine','ejs')
// // Set the views directory
// app.set('views', path.join(__dirname, 'modules/checkout'));


// //create index rout like home rout 
// app.get('/',(req,res)=>
// {
//     res.render('Payment')
// })
// app.listen(3000,()=>console.log('Server Started on port 3000'))
// //3la el rout create .env file 4ofy da makano yb2a fen ba2a




function getPayPalToken() {
    const clientId = 'AQhWUQ2x88zdKIrrc3x5tGFyAyCWojlI8LcZwz1Pe8lT1ikEEIKsJVWZ9pJnDBRiivHLAoO-CihJAnj2';  // Replace with your Client ID
    const secretKey = 'ELd6MzHX6seUnliCgOkmIevovqlnK1iQvYSkVj2SR2rFHENimGCMNHP4IP0IZZEziHN4vfTZtVjJI36t';  // Replace with your Secret Key
    
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
            const accessToken = data.access_token;
        } else {
            console.error('Failed to get access token');
        }
    })
    .catch(error => console.error('Error getting OAuth token:', error));
}
