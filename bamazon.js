const mysql = require("mysql")
const inquirer = require("inquirer")

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err
    disProduct()
});

var disProduct = () => {
    //console.log("SQL Connection Established")
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            console.log(" - - - - - - - - - - - - - - - ")
            console.log("item number: " + res[i].item_id)
            console.log("item: " + res[i].product_name)
            console.log("price: $" + res[i].price)
        }
        purchase()
    })
};

// validateInput makes sure that the user is supplying only positive integers for their inputs
var validateInput = (value) => {
    var integer = Number.isInteger(parseFloat(value))
    var sign = Math.sign(value)

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole non-zero number.'
    }
}

// purchase function to prompt the customer for an item to purchase
var purchase = () => {
    inquirer.prompt([{
                type: "input",
                name: "item_id",
                message: "Select the item you would like to purchase by item number.",
                validate: validateInput,
                filter: Number
            },
            {
                type: "input",
                name: "quantity",
                message: "How many of this item would you like to purchase?",
                validate: validateInput,
                filter: Number
            }
        ])
        .then(function(purchase) {
            var item = purchase.item_id
            var quantity = purchase.quantity

            var queryStr = 'SELECT * FROM products WHERE ?';

            connection.query(queryStr, { item_id: item }, function(err, res) {
                if (err) throw err

                if (res.length === 0) {
                    console.log("ERROR: Invalid Item ID. Please select a valid Item ID.")
                    disProduct()
                } else {

                    // set the results to the variable of productInfo
                    var productInfo = res[0]

                    if (quantity <= productInfo.stock_quantity) {
                        console.log(productInfo.product_name + "in stock!")
                        console.log("\n")

                        // the updating query string
                        var updateStr = "UPDATE products SET stock_quantity = " + (productInfo.stock_quantity - quantity) + " WHERE item_id = " + item
                            // console.log('updateStr = ' + updateStr);

                        // Update the inventory
                        connection.query(updateStr, function(err, data) {
                            if (err) throw err;

                            console.log("Your order has been placed!");
                            console.log("Your total is $" + productInfo.price * quantity)
                            console.log("Thank you for shopping with bamazon!")
                            
                            console.log("\n")

                            // End the database connection and close the app
                            connection.end();
                        })
                    } else {
                        console.log("not enough " + productInfo.product_name + " in stock.")
                        console.log("Your order can not be placed .")
                        console.log("Please select another item.")
                        console.log("\n")

                        // After 3 seconds display the inventory again so that the customer can make a new selcetion.
                        setTimeout(function() { disProduct() }, 3000)
                    }


                }
            })


        })
}