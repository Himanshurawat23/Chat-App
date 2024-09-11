

const socket = io()

$('#chat-box').hide()

$('#send-btn').on('click', ()=>{
    const msgText = $('#inp').val()
    // console.log(msgText)
    if(!msgText){
        return 
    }
    else{
        socket.emit('send-msg' , {    // socket.emit() accepts the "event" here event is send-msg and send the data to the server  
            msg: msgText               // the send-msg event which we have write is user defined not inbuilt remember this thing
        })
    }
    $('#inp').val('')
})

socket.on('received-msg' , (data)=>{  // now we receiving the message from the server 
    console.log(data);
    $('#chat').append(`<li class="border mt-2 p-2 rounded-pill"><span class="fw-bold">${data.username}: </span> -> ${data.msg}</li> `)
})

$('#login-btn').on('click', ()=>{
    const username = $('#username').val()
    
    socket.emit('login' , {
        username: username
    })

    $('#login-btn').hide()
    $('#chat-box').show()
    
    $('#username').val('')
    $('#username').hide();
})