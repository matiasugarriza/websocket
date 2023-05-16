const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const routesProducts = require('./routes/products')
const routesCarts = require('./routes/carts')
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded())

app.use(express.static(__dirname+'/public'))


app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')


io.on('connection', (socket)=>{
    console.log('User conectado')
    socket.emit('message', 'Hola Cliente, soy el back')
    socket.on('msg', (data)=>{
     console.log(data)
    })
 })

app.use('/products', routesProducts)
app.use('/carts', routesCarts)


server.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})