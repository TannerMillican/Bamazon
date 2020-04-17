var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "TransRights_420",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection()
});

function afterConnection(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        console.log(res)

        var items = [];

        console.log("            Item ID        Product           Department       Price    Stock");
        console.log("----------------------------------------------------------------------------")
        
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
            items.push(item)
        }
        console.table(items)

    })
}