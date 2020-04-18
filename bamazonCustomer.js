var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "TransRights_420",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    afterConnection()
});

var items = [];
var itemsInfo = [];
var itemIDsPricesAndStock = [];


function afterConnection(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;

        console.log("            Item ID        Product           Department       Price    Stock");
        console.log("----------------------------------------------------------------------------");

        
        for (var i = 0; i < res.length; i++) {
            var item = [];
            var itemID = res[i].item_id;
            item.push(itemID);
            itemIDsPricesAndStock.push(itemID)
            itemsInfo.push(itemID);
            var productName = res[i].product_name;
            item.push(productName);
            itemsInfo.push(productName);
            var departmentName = res[i].department_name;
            item.push(departmentName);
            itemsInfo.push(departmentName);
            var itemPrice = res[i].price;
            item.push(itemPrice);
            itemIDsPricesAndStock.push(itemPrice);
            itemsInfo.push(itemPrice);
            var itemQuantity = res[i].stock_quantity;
            item.push(itemQuantity);
            itemIDsPricesAndStock.push(itemQuantity)
            itemsInfo.push(itemQuantity);
            items.push(item);
        }
        console.table(items)
        inquire()
    })
}

function inquire(){

    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the ID of the Product you would like to purchase?",
                name: "itemChoice"
            },
            {
                type: "input",
                message: "How many would you like to purchase?",
                name: "purchaseNumber"
            }
        ])
        .then(function(inquirerResponse){

            var purchaseAmount = parseInt(inquirerResponse.purchaseNumber);
            var choice = parseInt(inquirerResponse.itemChoice);

            for (var i = 0; i < itemIDsPricesAndStock.length; i++){
                
                if (choice === itemIDsPricesAndStock[i]  && purchaseAmount <= itemIDsPricesAndStock[i+2]){


                    var choiceQuantity = itemIDsPricesAndStock[i+2]
                    
                    var productPrice = itemIDsPricesAndStock[i+1]
                    var productPriceInt = parseFloat(productPrice.substring(1))

                    var newQuantityOne = choiceQuantity - purchaseAmount;
                    var newQuantityTwo = parseInt(newQuantityOne);

                    var itemChosen = parseInt(choice);

                    var quantityBought = parseInt(purchaseAmount)

                    var customerCost = productPriceInt * quantityBought

                    updateProducts(newQuantityTwo, itemChosen, customerCost)
                } else {
                    console.log("Sorry, we currently don't have that many stocked, please select another item and/or quantity.")
                }
            }
        })
    }

function updateProducts(newStock, customerChoice, costOfPurchase){
    var updatedStock = newStock;
    var chosenItem = customerChoice
    var costToCustomer = costOfPurchase

    console.log("\nOne second, we're updating our inventory...\n")

    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: updatedStock
            },
            {
                item_id: chosenItem
            }
        ],
        function(err, res) {
            if (err) throw err;
            readUpdatedProduct(costToCustomer)
        },
    );

    
}

function readUpdatedProduct(customersCost){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;

        console.log("            Item ID        Product           Department       Price    Stock");
        console.log("----------------------------------------------------------------------------");

        var items = [];
        for (var i = 0; i < res.length; i++) {
            var item = [];
            var itemID = res[i].item_id;
            item.push(itemID);

            var productName = res[i].product_name;
            item.push(productName);

            var departmentName = res[i].department_name;
            item.push(departmentName);

            var itemPrice = res[i].price;
            item.push(itemPrice);

            var itemQuantity = res[i].stock_quantity;
            item.push(itemQuantity);

            items.push(item);
        }
        console.table(items)
        console.log("Your total price today is: " + customersCost)
        inquireAgain()
    })
}

function inquireAgain() {
    inquirer
        .prompt([
            {
                type: "confirm",
                name: "purchaseAgain",
                message: "Would you like to make another purchase?"
            }
        ])
        .then(function(inquirerResponse){
            var response = inquirerResponse.purchaseAgain

            if (response){
                inquire()
            } else {
                console.log("Thank you for shopping with Bamazon! Have a great day.")
            }
        })
}

