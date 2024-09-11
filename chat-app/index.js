const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app) // here app is used for request listner
const path = require('path')
const socketio = require('socket.io')
const io = socketio(server) // io is an object


const users = {}

app.use('/', express.static(path.join(__dirname , 'public'))); // whenever are server loads it get open ined.html at root route

io.on('connection' ,(socket)=>{ // setting the connection betweeen user and server by socket = io() // but connection is a inbuitl event
    console.log(`connection established at ${socket.id}`)

    socket.on('send-msg' , (data)=>{ // listen to some "event" send by socket.emit()
        //    console.log(data);
       // socket.emit('received-msg' , {// ab server bhej raha hai data to user
         io.emit('received-msg' , {  //now we are using io to show the message everyone not the individual
            msg: data.msg,
            id: socket.id,
            username : users[socket.id]
        })
    })
    
    socket.on('login' , (data)=>{
        // console.log(data)
        users[socket.id] = data.username // maping the socket_id with username
    })
})

const port =process.env.PORT || 3000

server.listen(port , ()=>{
    console.log(`server connected at port ${port}`)
})