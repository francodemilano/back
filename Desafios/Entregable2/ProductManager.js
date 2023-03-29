
import fs from 'fs'


export default class ProductManager {


    constructor(path) {
        this.path = path
    }


    generateId = async () => {
        try {
            const products = await this.getProducts()
            return products.length + 1
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    //Eliminar prod
    deleteProduct = async id => {
        const products = await this.getProducts()
        const newArray = products.filter(product => product.id !== id)
        await this.writeFile(newArray)
    }

    //Actualizar prod
    updateProduct = async (id, obj) => {
        const products = await this.getProducts()
        const product = await this.getProductById(id)
        const newProduct = { ...product, ...obj }
        products.splice(products.indexOf(product), 1, newProduct)
        await this.writeFile(products)
    }

    
    writeFile = async data => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(data))
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    //Add prod
    addProduct = async product => {
        const products = await this.getProducts()
        try {
            let newProduct = { id: await this.generateId(), ...product }
            products.push(newProduct)
            await this.writeFile(products)
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }


    getProducts = async () => {
        try {
            const products = await fs.promises.readFile(this.path, 'utf-8')
              if(!products) return []
            return JSON.parse(products)
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }


    getProductById = async id => {
        try {
            const products = await this.getProducts()
            let productFounded = products.find(p => p.id === id)
            return productFounded ? productFounded : null
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    //Clear prod
    deleteAllProducts = async () => {
        await this.writeFile([])
    }
}



