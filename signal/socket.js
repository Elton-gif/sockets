const express = require('express');
const app = express();
const server = require('http').createServer(app);
const ejs = require('ejs');
const cors = require('cors')
const bodyParser = require('body-parser');

const io = require('socket.io')(server,{
    cors:{
        origin:"*",
    }
})

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view-engine','ejs');

var store = [];
var db ={
    name:'',
    phone:'',
    socketid:'',
    message:'',
}



//when a client connects to the api 
io.on('connection',(socket)=>{
    console.log('connected...');
    socket.on('sending',(message)=>{
        console.log('sending',message);
        // socket.emit('sad',sendmeso(message,they));
        socket.broadcast.emit('all',message.text);
        //When emiiting the 3 arguments, The first argument is the Event name the second one is the event data and the third is a callback function;


    });
     
    socket.on()


    socket.on('disconnect',()=>{
        // console.log(socket);
        console.log('User disconnected');
    });

    //acknoledgement (callbacks)
    socket.on('call',(data,cb)=>{
        console.log(data);
        cb();


    })//Data is the event data amd the second argument is the event callback


    //Geolocation coordinates here

    socket.on('loc',(cods)=>{
        console.log(cods);

        socket.broadcast.emit('map',{
            url:`google.com/maps?q=${cods.lat},${cods.long}`
        })
    })
    //room
     var sendto = '';
    socket.on('room',(data,cb)=>{
        if (data.room == '') {
            cb('There is blank space ')
        } 
        socket.join(data.room);
        sendto = data.room;
        cb()
    })

   
})



app.get('/',(req,res)=>{
    res.render('profile.ejs')
})

app.route('/chats')
.get((req,res)=>{
    res.render('home.ejs')
})
.post((req,res)=>{
    const {name ,room} =req.body;


    var nospace  = room.replace(' ','s')
    
    res.redirect(`/chats?${nospace}`);
})

server.listen(9111,console.log('Meesaage us bitch'))