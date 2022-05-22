// const text = require("body-parser/lib/types/text");
// import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io('ws://localhost:2020');

socket.on('message',text=>{
    const list = document.querySelector('ul');
    const line = document.querySelector('li');

    line.innerHTML = text;
    list.appendChild(line)
});

document.querySelector('button').onclick=(e)=>{
   
    const text = document.querySelector('input').value;
    socket.emit('message',text);
    // alert('nkt')
}