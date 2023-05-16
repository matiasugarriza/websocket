const fs = require('fs')
class ProductManager {
  constructor(path) {
    this.path = path
    this.id = 0
  }
  async getProducts() {
    let readFile = await fs.promises.readFile(this.path, "utf-8")
    return readFile
  }
  async addProduct(title, description, price, thumbnail, code, stock, status, category) {
    try {
      let readFile = await fs.promises.readFile(this.path, "utf-8")
      let products = JSON.parse(readFile)
      let id = products.length + 1
      if(products.find((product)=> product.id == id)){
        id++
      }
      //Se agrega un nuevo producto
      const newProduct = {
        id: id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category
      };
      const existingProduct = products.find((product) => product.code === code)
      if (existingProduct) {
        let extProductError = `Error: Ya existe un producto con el código ${code}`
        return extProductError;
      } else {
        if (!title || !description || !price || !thumbnail || !code || !stock || !status || !category) {
          let validationProduct = "Error: Todos los campos son obligatorios."
          return validationProduct
        } else {
          products.push(newProduct)
          fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
          return newProduct
        }
      }
    } catch(err) {
      console.log(err)
      let errorNewProduct = 'Error al guardar el producto'
      return errorNewProduct
    }
  }
  async getProductById(id) {
    try {
      let getId = parseInt(id)
      if (getId > 0) {
        let readFile = await fs.promises.readFile(this.path, "utf-8")
        let products = JSON.parse(readFile)
        let productById = products.find((product) => product.id == id)
        if (productById) {
          return productById
        } else {
          let menssageId = `No se encuentra ningún producto con el ID: ${id}`
          return menssageId
        }
      } else {
        let errorId = 'El ID debe ser un número positivo'
        return errorId
      }

    } catch (err) {
      let serverError = `Hubo un problema al leer el archivo ${this.path}`
      console.error(serverError)
      console.error(err)
      return serverError
    }
  }
  async updateProduct(id, title, description, price, thumbnail, code, stock, status, category) {
    try {
      let readFile = await fs.promises.readFile(this.path, "utf-8")
      let products = JSON.parse(readFile)
      const idProduct = products.find((product) => product.id == id)
      if (!idProduct) {
        let notId = `No existe ningún producto con el ID: ${id}`
        return await notId
      } else {
        const indexProduct = products.indexOf(idProduct)
        const editedProduct = { id, title, description, price, thumbnail, code, stock, status, category }
        if (indexProduct > -1) {
          products.splice(indexProduct, 1, editedProduct)
          fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
          return await editedProduct
        }
      }
    } catch (err) {
      console.log(err)
      let updateError = 'Error al actualizar el producto.'
      return updateError
    }

  }
  async deleteProduct(id) {
    try{
      let readFile = await fs.promises.readFile(this.path, "utf-8")
      let products = JSON.parse(readFile)
      const idProduct = products.find((product) => product.id == id)
      const indexProduct = products.indexOf(idProduct)
      if (indexProduct > 0) {
        products.splice(indexProduct, 1)
        fs.promises.writeFile(this.path, JSON.stringify(products, null, 2))
        let sucessMenssage = 'Producto eliminado con éxito'
        return await sucessMenssage
      }
    }catch(err){
      console.log(err)
      let errorDelete = 'No existe ningún producto con ese ID'
      return await errorDelete
    }
  }
}
module.exports = ProductManager
