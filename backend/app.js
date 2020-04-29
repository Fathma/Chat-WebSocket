

const port = process.env.PORT || 3000
const io = require('socket.io')(port)

const users = {}

io.on ('connection', socket =>{
    socket.on('new-user', name =>{
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })

    socket.on('disconnect', name =>{
        socket.broadcast.emit('user-disconnect', users[socket.id])
        delete users[socket.id]
    })

    socket.on('send-chat-message', message=>{
            socket.broadcast.emit('chat-message', {message , name: users[socket.id]})
    })
})