import ProductManager from "./ProductManager.js"

const productManager = new ProductManager("./products.txt")



const execute = async () => {

    console.log(await productManager.getProducts())


    await productManager.addProduct({
        title: 'Lavarropa Automatico Whirpool',
        description: '10 años de uso, funciona todo',
        price: 5000,
        thumbnail: null, 
        code: '1',
        stock: 2
    })


    await productManager.addProduct({
        title: 'Bicicleta para niños',
        description: 'Tomaselli, 1 año de uso',
        price: 8500,
        thumbnail: null,
        code: '2',
        stock: 3
    })


    console.log(await productManager.getProducts())


     console.log(await productManager.getProductById(2))


    await productManager.deleteProduct(1)


    console.log(await productManager.getProducts())


    await productManager.updateProduct(2,{
        price: 9700,
        stock: 1
    })


    console.log(await productManager.getProducts())


    await productManager.deleteAllProducts()


    console.log(await productManager.getProducts())
}

execute()
