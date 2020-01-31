# e-commerce
Url : **http://e-commerce.nafies.tech/**

Base API url : **http://api-e-commerce.nafies.tech/**

## Home
Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/` | GET | `none` | `200` OK | Show `Welcome to e-commerce server. For further information, please contact Us at nafies1` in a JSON format



## User :

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/user/register` | POST | **Body**<br>name: `String`<br>email: `String`<br>password: `String` | **Success**<br>`201` Created<br>**Error**<br>`500` Internal Server Error | Create a user
`/user/login` | POST | **Body**<br>email: `String`<br>password: `String` | **Success**<br>`200` OK<br>**Error**<br>`400` Bad Request | Sign a user in


## Product :

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/product` | POST | **Headers**<br>token: `String`<br>**Body**<br>title: `String`<br>content: `String`<br>File: `File` | **Success**<br>`201` Created<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Create a product
`/product` | GET | **Headers**<br>`None` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Get all products
`/product/:id` | GET | **Headers**<br>token: `String` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Get one product
`/product/:id` | PUT | **Headers**<br>token: `String`<br>**Body**<br>title: `String`<br>content: `String`<br>file: `File` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Update a product
`/product/:id` | PATCH | **Headers**<br>token: `String`<br>**Body**<br>published: `Boolean` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Update Stock
`/product/:id` | DELETE | **Headers**<br>token: `String` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Delete a product


### Undefined Route :

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/*` | any | any | **Error**<br>`404` <br>Route not found | Show result if route not found
