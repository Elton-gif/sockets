const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const http = require('http').createServer();

const app = express();
const io = require('socket.io')(http,{
    cors:{origin:"*"}
});

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}));

app.set('view-engine','ejs');

io.on('connection',(socket)=>{
    console.log('The user joined us');
    socket.on('message',(message)=>{
        console.log(message);
        io.emit('message',`${socket.id.substr(0,2)} said ${message}`)
    })
})

app.get("/",(req,res)=>{
    res.render('index.ejs')
})

io.listen(2020,console.log('2020'))
