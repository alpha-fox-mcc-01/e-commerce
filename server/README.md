# E_COMMERCE #
---

### **List of Product Routes** ###
| Route             |  HTTP  | Headers | Body                                                                | Params | Description               |
| ----------------- | :----: | :-----: | ------------------------------------------------------------------- | :----: | ------------------------- |
| /api/product      |  GET   |         | none                                                                |        | Get all products          |
| /api/product      |  POST  |         | **String** : name, description, category. **Number** : price, stock |        | Create a new product      |
| /api/product/:cat |  GET   |         |                                                                     |  cat   | Get product detail by cat |
| /api/product/:id  |  GET   |         | none                                                                |   id   | Get product detail by id  |
| /api/product/:id  |  PUT   |         | **String** : name, description, category. **Number** : price, stock |   id   | Edit product detail by id |
| /api/product/:id  | DELETE |         |                                                                     |   id   | Delete product by id      |
---
<br>

### **List of User Routes** ###
| Route                  |  HTTP  |  Header(s)   | Body                                                    |   Params   | Description                     |
| ---------------------- | :----: | :----------: | ------------------------------------------------------- | :--------: | ------------------------------- |
| /user/signup           |  POST  |     none     | **Type: String (Req)**<br>username<br>email<br>password |            | Sign up with new user info      |
| /user/signin           |  POST  |     none     | **Type: String (Req)**<br>username<br>email<br>password |            | Sign in and get an access token |
| /user/:id/cart         |  GET   | access_token |                                                         |     id     | Show user own cart              |
| /user/:id/cart/:itemId | DELETE | access_token |                                                         | id, itemId | Delete an item from user cart   |

---
<br>

### **List of Cart Routes** ###
| Route     |  HTTP  |  Header(s)   | Body                                                       |  Params   | Description                      |
| --------- | :----: | :----------: | ---------------------------------------------------------- | :-------: | -------------------------------- |
| /cart/    |  POST  | access_token | name, description, category, price, stock, imageUrl (file) |           | Add new entry to user cart       |
| /cart/:id |  GET   | access_token | **Type: String (Req)**<br>username<br>email<br>password    |  UserId   | Get list of product in user cart |
| /cart/:id | DELETE | access_token |                                                            | ProductId | Delete one product from the cart |