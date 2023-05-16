const express = require('express')
const { Router } = express
const router = new Router()
const CartManager = require("../scripts/CartManager")

router.get('/', (req, res) => {
    let manager = new CartManager("./carts.json")
    const carts = manager.getCarts()
    carts.then(cart => {
        let response = JSON.parse(cart)
        res.send({ menssage: "Carritos", data: response })
    }).catch(err => {
        console.log(err)
    })
})

router.get('/:id', (req, res) => {
    let manager = new CartManager("./carts.json")
    let id = req.params.id
    let productRes = manager.getCartById(id)
    productRes.then(cart => {
        let response = cart
        res.send({ menssage: "Carritos:", data: response })
    }).catch(err => {
        console.log(err)
    })
})
router.post('/', (req, res) => {
    let manager = new CartManager("./carts.json")
    let cartRes = manager.addCart()
    cartRes.then(cart => {
        let response = cart
        res.send({ data: response })
    }).catch(err => {
        console.log(err)
    })
})

router.delete('/:id', (req, res) => {
    let manager = new CartManager("./carts.json")
    let CartRes = manager.deleteCart(req.params.id)
    CartRes.then(cart => {
        let response = cart
        res.send({ data: response })
    }).catch(err => {
        console.log(err)
    })
})

router.delete('/:cid/product/:pid', (req, res) => {
    let manager = new CartManager("./carts.json")
    let cartRes = manager.deleteProduct(req.params['cid'], req.params['pid'])
    cartRes.then(cart => {
        let response = cart
        res.send({ data: response, message: 'Carrito Actualizado' })
    }).catch(err => {
        console.log(err)
    })
})
module.exports = router
router.put('/:cid/product/:pid', (req, res) => {
    let manager = new CartManager("./carts.json")
    let cartRes = manager.updateCart(req.params['cid'], req.params['pid'])
    cartRes.then(cart => {
        let response = cart
        res.send({ data: response, message: 'Carrito Actualizado' })
    }).catch(err => {
        console.log(err)
    })
})
module.exports = router


