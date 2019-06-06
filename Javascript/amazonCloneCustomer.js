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

    database: "bamazon_db"
});

connection.connect(function (error) {
    if (error) throw error
    console.log("Connected as:" + connection.threadId)
    displayProducts()
})

function displayProducts() {
    connection.query("SELECT * FROM products", function (error, response){
        if (error) throw error
        for (let i = 0; i < response.length; i++) {
            console.log(`Product ID: ${response[i].product_id} +
                        \ Product Name: ${response[i].product_name} +
                        \ Price:` + parseFloat(response[i].price).toFixed(2) + `
                        \ In Stock: ${response[i].stock_quantity}`)
        }
    })
}