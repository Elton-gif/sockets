const socket = io('http://localhost:6061');
var room ='';
socket.on('connect',(client)=>{
   
    // alert(socket.id)
    
    room =socket.id;
    socket.emit('noise',{name:"gpin"},45);
    socket.on('back',(message,target)=>{
         sendmeso(message,target);

    })
})

// creating noise to be listened by the serer



const send= document.getElementById('send');
const areachat = document.getElementById('chatarea');
const right = document.getElementById('right');
const left = document.getElementById('left');
const from = document.getElementById('from');
const my = document.getElementById('my');
const textchat = document.getElementById('textchat');


send.addEventListener('click',()=>{
    const message = textchat.value;
    const target = 'me';

    socket.emit('sending',message,target,room);
    // areachat.innerHTML ='before'
    // areachat.innerHTML ='aftter'
    sendmeso(message,target);
    // recievesms(message);
    textchat.value ='';
})
var now = new Date();
var ts =  now.toDateString();
var received = '';
var content ='';

function sendmeso(message,target)
{
    //  my.innerHTML = message;
    if (target == 'me') {
        received =`
        <div id="left">
        <div id="from">
        ${message}
        </div>
        <h6 id="times">${ts}</h6>
    </div>
    `   
    $("#chatarea").append(received);

    } 
    if (target =='they') {
        content =`
        <div id="right">
        <div id="my">
        ${message}
        </div>
        <h6 id="times">${ts}</h6>
    </div>
    `
    $("#chatarea").append(content);

    
        
    }
   
   

}


