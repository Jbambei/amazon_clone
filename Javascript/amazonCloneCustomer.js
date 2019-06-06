const mysql = require('mysql')
const inquirer = require('inquirer')


//mySQL connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    //mysql username
    user: "root",

    //mysql password
    password: "J4801787582",

    database: "amazon_db"
});

connection.connect(function (error) {
    if (error) throw error
    //console.log("Connected as:" + connection.threadId)
    displayProducts()
})

function displayProducts() {
    connection.query("SELECT * FROM products", function (error, response){
        if (error) throw error
        for (let i = 0; i < response.length; i++) {
            console.log(`Product Name: ${response[i].product_name}`) 
            console.log(`Product ID: ${response[i].product_id}`) 
            console.log('Price:' + parseFloat(response[i].price).toFixed(2))
            console.log(`In Stock: ${response[i].stock_quantity}`)
            console.log('                                                 ')
        }
    })
    purchaseProduct()
}

function purchaseProduct() {
    inquirer.prompt([
        {
            name: "productIdInput",
            type: "input",
            message: "Enter the Product ID of the item you want. \n"
        },
        {
            name: "productQuantityInput",
            type: "input",
            message: "How many do you want to purchase?"
        }
    ])
        .then(function (answer) {
            connection.query("SELECT * FROM products WHERE product_id=?", answer.productIdInput, function (error, response){
                if (error) throw error

            //checking if the product is in stock and if the quantity wanted is less than the total stock
            if (response.length === 0) {
                console.log("\n That product is not in stock currently" + "\n")
                purchaseProduct()
            }
            for (let i = 0; i < response.length; i++) {
                if (answer.productQuantityInput > response[i].stock_quantity) {
                    console.log(`We don't have enough to complete your order. There is ${response[i].stock_quantity} available.`)
                    purchaseProduct()
                }

            //Display a successful purchase to the user and update the database    
            else {
                console.log("Successful purchase!")
                console.log("                    ")
                console.log("                    ")
                console.log("                    ")
                console.log("                    ")

                //updating database
                var newStockQuantity = response[i].stock_quantity - answer.productQuantityInput
                connection.query("UPDATE products SET stock_quantity=? WHERE product_id=?", [newStockQuantity, answer.productIdInput], function (error, response){
                    if (error) throw error
                })
            displayProducts()
            }
            }
            })
        })
}


