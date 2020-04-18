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
    // console.log("connected as id " + connection.threadId);
    afterConnection()
});

var items = [];
var itemsInfo = [];
var itemIDs = [];

function afterConnection(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;

        console.log("            Item ID        Product           Department       Price    Stock");
        console.log("----------------------------------------------------------------------------");

        
        for (var i = 0; i < res.length; i++) {
            var item = [];
            var itemID = res[i].item_id;
            item.push(itemID);
            itemIDs.push(itemID)
            itemsInfo.push(itemID);
            var productName = res[i].product_name;
            item.push(productName);
            itemsInfo.push(productName);
            var departmentName = res[i].department_name;
            item.push(departmentName);
            itemsInfo.push(departmentName);
            var itemPrice = res[i].price;
            item.push(itemPrice);
            itemsInfo.push(itemPrice);
            var itemQuantity = res[i].stock_quantity;
            item.push(itemQuantity);
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

            // console.log(inquirerResponse)

            var purchaseAmount = parseInt(inquirerResponse.purchaseNumber);
            // console.log(inquirerResponse.purchaseNumber);
            var choice = parseInt(inquirerResponse.itemChoice);
            console.log(choice)

            // console.log(items)
            // console.log(storeProducts)

            console.log(itemIDs)

            for (var i = 0; i < itemIDs.length; i++){
                
                if (choice === itemIDs[i]){
                    // updateProducts()
                    console.log("working")
                }
            }
        })
    }

// function updateProducts(){
//     console.log("One second, we're updating our inventory...\n")
//     var query = connection.query(
//         "UPDATE products SET ? WHERE ?",
//         [
//             {
//                 stock_quantity: 
//             },
//             {
//                 item_id: choice
//             }
//         ]
//     )
// }
