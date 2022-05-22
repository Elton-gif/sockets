const socket = io('localhost:9111');

const banner = document.getElementById('alert');
const  space = document.getElementsByClassName('room').value;
const name = document.getElementsByClassName('name').value;
const btn = document.getElementById('continue')
socket.on('connect',(client)=>{

    const alert ='You are online'
    banner.innerHTML =alert;

    socket.emit('details',{
        name:name,
        phone:room,
        socketid: 7,
    })
})

socket.on('disconnect',(end)=>{
    const alert =' Disconnected to the server ';
    banner.innerHTML =alert;




})

btn.addEventListener('click',)