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

function afterConnection(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        // console.log(res)

        var items = [];
        var itemsInfo = [];
        var itemIDs = [];

        console.log("            Item ID        Product           Department       Price    Stock");
        console.log("----------------------------------------------------------------------------")
        
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
            items.push(item)
        }
        console.table(items)
        inquire()

        function inquire(){
            inquirer
                .prompt([
                    {
                        type: "input",
                        message: "What is the ID of the Product you would like to purchase?",
                        name: "itemChoice"
                    },
                    {
                        type: "number",
                        message: "How many would you like to purchase?",
                        name: "purchaseNumber"
                    }
                ])
                .then(function(inquirerResponse){
                    for (var i = 0; i < items.length; i++){
                        if (inquirerResponse.itemChoice = items[i] && inquirerResponse.purchaseNumber < items[i].slice(4)) {
                            // updateProduct()
                        } else {
                            console.log("Sorry, there's currently not that many items stocked. Please enter a lower amount.")
                            inquire()
                        }
                    }
                })
            }
    })
}