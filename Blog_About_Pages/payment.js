//import depandencies ely 3malnalha install 
require('dotenv').config()
const express =require('express')
const app= express()
app.set('view engine','ejs')


//create index rout like home rout 
app.get('/',(req,res)=>
{
    res.render('Payment')
})
app.listen(3000,()=>console.log('Server Started on port 3000'))
//3la el rout create .env file 4ofy da makano yb2a fen ba2a