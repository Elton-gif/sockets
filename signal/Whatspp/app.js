const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const ejs = require('ejs');
const admin = require('firebase-admin')
const app = express();
const server = require('http').createServer(app);

var serviceaccount = require('')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const io = require('socket.io')(server,{
    cors:{
        origin:"*",
    }
})

// const server = require('http').createServer(app);
// const io = require('socket.io')(server,{
//    cors:{
//        origin:"*",
//     //    origin:['http://localhost:6061']
//    }
// });



app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view-engine','ejs');
var clients =[];
io.on('connection',(socket)=>{
    clients.push(socket.id);
    console.log(clients);

//    We receive the message from the client and broadcast to all online people;
    socket.on('sending',(message,target,room)=>{
        console.log(message,target,room);
        // io.emit('back',message,"they");to everyone also you

        if (room =='') {
        socket.broadcast.emit('back',message,"they");//Broadcast the message to everyone except me;
            
        } else {
         socket.to(clients[1]).emit('back',message,"they")  
        }

        
    })
})


app.get('/',(req,res)=>{

    res.render('home.ejs')
})

server.listen(6061,console.log(6061,"..."))

