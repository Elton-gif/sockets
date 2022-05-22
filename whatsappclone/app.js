const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cors = require('cors')
const admin = require('firebase-admin');
var serviceAccount = require('./public/js/key/sockets-9c19a-firebase-adminsdk-78zlh-a6bf1f5a97.json')
const app = express();


admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
})
const firestore = admin.firestore();




const server = require('http').createServer(app); 
const io = require('socket.io')(server,{
    cors:{
        origin:'*'
    }
});

// firestore.collection('user').doc().set({
//     name:"Are we good"
// }).then((good)=>{
//     console.log('stored')
// })


app.use(express.static('public'));
app.set('view-engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));



app.get('/',(req,res)=>{
    res.render('index.ejs');
})
app.get('/contact',(req,res)=>{
    res.render('contacts.ejs');
})


server.listen(8800, console.log('messages 8800'))
