let socket = io()

socket.on('message', (data)=>{
    console.log(data)
    socket.emit('msg', 'Hola Back, soy el cliente')
})
