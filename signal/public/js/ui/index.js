const socket = io('http://localhost:9111');
var room ='';
var time = document.getElementById('time');

var pick = window.location.search.substring(1);//picks the room

socket.emit('room',{
    room:pick,

},(err)=>{
    if (err) 
    {
        alert(err)
        window.location.href='/';
    } else {
        alert('You have a room bitch')
    }
})
socket.on('connect',(client)=>{
   
    // alert(socket.id)
    time.innerHTML ='online'
    // console.log(client)
    room =socket.id;
    // socket.emit('noise',{name:"gpin"},45);
    // socket.on('back',(message,target)=>{
    //      sendmeso(message,target);

    // })
})
socket.on('sad',(m)=>{
    console.log(m);
})

socket.on('disconnect',(cut)=>{
    var date = new Date().toLocaleTimeString();
    time.innerHTML =date;

})

// creating noise to be listened by the serer



const send= document.getElementById('send');
const areachat = document.getElementById('chatarea');
const right = document.getElementById('right');
const left = document.getElementById('left');
const from = document.getElementById('from');
const my = document.getElementById('my');
const textchat = document.getElementById('textchat');

socket.on('all',(m)=>{
    sendmeso(m,"they");
 
})

socket.emit('call',{
    message:'This is a test for callbacks',
    blank:'blank'
},function (){
    console.log('Server got it')
    // The callback will be executed on the client or sender of the emitter
})

send.addEventListener('click',()=>{
    const message = textchat.value;
    const target = 'me';

    

    socket.emit('sending',{
        from:'Elton',
        text:message,
    });
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

// geolocation 

function locate(){
    // Check if the browser has location api
    if (!navigator.geolocation) {
      return  alert('Geolocation not supported by the browser');
    }
    //two functions first get the location the other is an error if location is not found
    navigator.geolocation.getCurrentPosition((position)=>{
        // console.log(position);
        socket.emit('loc',{
            lat:position.coords.latitude,
            long:position.coords.longitude,
        })
    },
    ()=>{
        alert('Unable to get your current position')
    })


}
locate();
//Listen for the maps 

// socket.on('map',(datas)=>{
   
//     var frame =`<div id="self">My fuckin Home</div>`;
//     // window.location.href= datas.url;
//     // document.getElementById('self').addEventlistener('click', alert('Bitchy'))
//     // function view()
//     // {
//     //     alert('Button')
//     // }

//     alert('we')
//     sendmeso(frame,'they');
// })

function scroll()
{
    var last =areachat.lastElementChild;
    last.scrollIntoView();
}


