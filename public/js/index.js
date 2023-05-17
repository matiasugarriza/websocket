let socket = io()

socket.on('message', (data) => {
    console.log(data)
    socket.emit('msg', 'Websocket activo!')
    
})

socket.on('realTimeProducts', (response)=>{
    render(response)
})

function render(products) {
    const html = products.map(elem => {
        return (`
            <div>
                <strong>${elem.title}</strong>
                <p>$${elem.price}</p>
            </div >
        `)
    }).join(' ')
    document.getElementById('productos').innerHTML = html
}

function getData(e){
    const data = {
        title: document.getElementById('title').value, 
        description: document.getElementById('description').value, 
        price: document.getElementById('price').value, 
        thumbnail: document.getElementById('thumbnail').value, 
        code: document.getElementById('code').value, 
        stock: document.getElementById('stock').value, 
        status: document.getElementById('status').value, 
        category: document.getElementById('category').value
    }
    console.log('Se ha agregado un nuevo producto')
    socket.emit('newProduct', data)
    return false
}

