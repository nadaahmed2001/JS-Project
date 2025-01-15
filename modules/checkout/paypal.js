const axios = require('axios');
const { response, application } = require('express');

// Create access token request
async function generateAccessToken() {
    try {
        const response = await axios({
            url: process.env.PAYPAL_BASE_URL + '/v1/oauth2/token',
            method: 'post',
            data: 'grant_type=client_credentials',
            // Send client id and secret
            auth: {
                username: process.env.PAYPAL_CLIENT_ID,
                password: process.env.PAYPAL_SECRET
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        // Log the response data to the console
        // console.log(ersponse.data);
        return response.data.access_token;
    } catch (error) {
        // Catch and log any errors
        console.error('Error generating access token:', error.response?.data || error.message);
    }
}

// generateAccessToken();
console.log('Client ID:', process.env.PAYPAL_CLIENT_ID);
console.log('Secret:', process.env.PAYPAL_SECRET);



// //kda fe product 
// exports.createOrder= async () =>{
//     const accessToken =await generateAccessToken();

//     //grap accsses token
//     const response = await axios ({
//         url:process.env.PAYPAL_BASE_URL +'/v2/checkout/orders',
//         method : 'post',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization':  `Bearer ${accessToken}`
//             },
//             data: JSON.stringify({
//                 intent: 'CAPTURE',
//                 purchase_units: [
//                      {
//                       items: [
//                          //hena bnb3at el product 
//                            {
//                             //kda item1
//                          name: 'e-comerce1',
//                          description: 'ayhaga',
//                          quantity: 2,
//                          unit_amount: {
//                          currency_code: 'USD',
//                          value: '100.00'
//                           }
//                         },
//                         {
//                             // kda item2
//                             name: 'e-comerce 2',
//                             description: 'ayhaga',
//                             quantity: 2,
//                             unit_amount: {
//                             currency_code: 'USD',
//                             value: '100.00'
//                              }
//                            }
//                          ],
//                         amount: {
//                            currency_code: 'USD',
//                            value: '100.00',
//                            breakdown: {
//                              item_total: {
//                               currency_code: 'USD',
//                               value: '100.00'
//                         }
//                     }
                    
//                 }
//              }
//             ],
//             // customise the buyer
//             application_context:{
//                 //da kda el url ely el buyer hyro7 3aleh lma el payment y5las
//                 return_url: process.env.BASE_URL + '/complete-order',
//                 //lma y cancel hyroh fen
//                 cancel_url:process.env.BASE_URL +'/cancel-order'
//             }
            



//             })

//     })
//     console.log(response.data)

// }

// this.createOrder()
exports.createOrder = async () => {
    try {
        const accessToken = await generateAccessToken();

        // Send request to PayPal API
        const response = await axios({
            url: process.env.PAYPAL_BASE_URL + '/v2/checkout/orders',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        items: [
                            {
                                name: 'T-shirt ',
                                description: 'Description for item 1',
                                quantity: 1,
                                unit_amount: {
                                    currency_code: 'USD',
                                    value: '150.00'
                                }
                            },
                            {
                                name: 'Hoodie ',
                                description: 'Description for item 2',
                                quantity: 2,
                                unit_amount: {
                                    currency_code: 'USD',
                                    value: '125.00'
                                }
                            }
                        ],
                        amount: {
                            currency_code: 'USD',
                            value: '400.00', // Update to match the sum of items
                            breakdown: {
                                item_total: {
                                    currency_code: 'USD',
                                    value: '400.00' // Update to match the sum of items
                                }
                            }
                        }
                    }
                ],
                application_context: {
                    return_url: process.env.BASE_URL + '/complete-order',
                    cancel_url: process.env.BASE_URL + '/cancel-order',
                    user_action :'PAY_NOW',
                    brand_name:'Evara Store'
                }
            })
        });

      //  console.log(response.data);
      return response.data.links.find(link =>link.rel === 'approve').href
    } catch (error) {
        console.error('Error creating order:', error.response ? error.response.data : error.message);
    }
};


//this.createOrder().then(result => console.log(result))


///// el links ely tal3at hydirect el customer l wa7ed mn el links de 


// exports.CapturePayment = async (orderId)=>
// {
//     const accessToken = await generateAccessToken();
//     const response = await axios({
//        url:process.env.PAYPAL_BASE_URL+`/v2/checkout/orders/${orderId}/capture`,
//        method:'post',
//        headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`
//     }
//     })
//     return response.data
// }

exports.CapturePayment = async (orderId) => {
    try {
        const accessToken = await generateAccessToken();
        const response = await axios({
            url: `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error capturing payment:', error.response ? error.response.data : error.message);
        throw error; // Re-throw to handle in the calling code
    }
};