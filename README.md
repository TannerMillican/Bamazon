OVERVIEW:

Upon running this app, a user will be displayed a tableof items, their item IDs, their departments, their prices, and their quantities.
The user will also be prompted to input which product they would like to purchase.

The user is then prompted to input the quantity of the product they would like to purchase. The app then looks for the item by its id as provided by the user, as well as comparing the available stock to the quantity the user input. If both of these cases are met without any error, the table of products is updated, the user is given the cost of their purchase, as well as asked if they would like to make another purchase.

If the user inputs a quantity that is higher than what bamazon has stocked, then the user will be given a message explaining so, as well as be prompted to choose another item/quantity.

Otherwise, if the user wishes to make another purchase, they can do so after confirming.

If not, the user is given a thank you message and the connection to the MySQL server is ended.


EXAMPLES:
User initializing app:



User inputs for item and quantity, quantity is good:



User's quantity input is too high:



User making another purchase:



User not making any more purchases: