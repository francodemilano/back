const socket = io()

const productList = document.getElementById("products-list")

function deleteProduct(id) {
    fetch(`/api/products/${id}`, {
        method: 'DELETE'
    })
}

socket.on('updateProducts', ({ products }) => {
    let productsInHtml = ""
    products.forEach(element => {
        productsInHtml += `
                <div>
                    <h2>${element.title}</h2>
                    <p>${element.description}</p>
                    <span>${element.price}</span>
                    <div>
                    <button class='delete-button btn btn-danger' onclick="deleteProduct({{this.id}})" id={{this.id}}> -
                    </button>
                    </div>
                </div>`
    });
    productList.innerHTML = productsInHtml
})