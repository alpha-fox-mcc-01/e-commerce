# e-commerce

Base url : **http://localhost:3000**

## Home
Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/` | GET | `none` | `200` OK | Show `Welcome to e-commerce server. For further information, please contact Us at nafies1` in a JSON format

  Show `Welcome to e-commerce server. For further information, please contact Us at nafies1` in a JSON format

* **URL**

   /

* **Method:**

  GET

* **Headers:**

  None

* **Body**

  None

* **Success Response :**    
  Code : 200    
  Content : 
  ```javascript
  {
    "status": 200,
    "message": "Welcome to e-commerce server. For further information, please contact Us at nafies1"
  }           
  ```
* **Error Response :**    
  Code : 500  
  Message : `Internal Server Error`

-----

## User :

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/user/register` | POST | **Body**<br>name: `String`<br>email: `String`<br>password: `String` | **Success**<br>`201` Created<br>**Error**<br>`500` Internal Server Error | Create a user
`/user/login` | POST | **Body**<br>email: `String`<br>password: `String` | **Success**<br>`200` OK<br>**Error**<br>`400` Bad Request | Sign a user in
`/user/google-sign` | POST | **Headers**<br>token: `String` | **Success**<br>`200` OK<br>**Error**<br>`400` Bad Request | Sign a user in using Google account
`/user` | GET | `none` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Get all users
`/user/:id` | GET | **Headers**<br>`None` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Get one user
`/user/:id` | PUT | **Headers**<br>token: `String`<br>**Body**<br>name: `String`<br>email: `String`<br>password: `String` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Update one user
`/user/:id` | PATCH | **Headers**<br>token: `String`<br>**Body**<br>password: `String` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Change Password
`/user/:id` | DELETE | **Headers**<br>token: `String` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Delete a user

## Register :

  Create User in database

* **URL**

   /user/register

* **Method:**

  POST

* **Headers:**

  None

* **Body**

  name: 'nafies'        
  email: 'naf@nafies.id'        
  password: 'password'      
  admin: true 

* **Success Response :**    
  Code : 201    
  Content : 
  ```javascript
  {
    "status": 201,
    "message": "Register with email naf@nafies.id success",
    "token": "abjkaskjcvsdnclk21j324io3rjtio5tj95jgi"
  }           
  ```
* **Error Response :**    
  status : 400        
  message : `Register failed`

-----

## Login :

  Login into System

* **URL**

   /user/login

* **Method:**

  POST

* **Headers:**

  None

* **Body**

  email: 'naf@nafies.id'        
  password: 'password'      

* **Success Response :**    
  Code : 200    
  Content : 
  ```javascript
  {
    "status": 201,
    "message": "Login user nafies success",
    "token": "abjkaskjcvsdnclk21j324io3rjtio5tj95jgi"
  }           
  ```
* **Error Response :**    
  status : 400    
  message : `Username / Password Error`

-----

## Google SignIn :

  Login into System using Google Account

* **URL**

   /user/google-sign

* **Method:**

  POST

* **Headers:**

  token: "hkvjdvhnidugnvhjhni8yi5v8yiveuevynrjhkdgj"

* **Body**

    None

* **Success Response :**    
  Code : 200    
  Content : 
  ```javascript
  {
    "status": 200,
    "message": "Login using google account success",
    "token": "abjkaskjcvsdnclk21j324io3rjtio5tj95jgi"
  }           
  ```
* **Error Response :**    
  status : 400
  message : `Invalid google token`

-----

## Product :

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/product` | POST | **Headers**<br>token: `String`<br>**Body**<br>title: `String`<br>content: `String`<br>featured_image: `File` | **Success**<br>`201` Created<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Create a product
`/product` | GET | **Headers**<br>`None` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Get all products
`/product/:id` | GET | **Headers**<br>token: `String` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Get one product
`/product/:id` | PUT | **Headers**<br>token: `String`<br>**Body**<br>title: `String`<br>content: `String`<br>featured_image: `File` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Update a product
`/product/:id` | PATCH | **Headers**<br>token: `String`<br>**Body**<br>published: `Boolean` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Publish or unpublish an products
`/product/:id` | DELETE | **Headers**<br>token: `String` | **Success**<br>`200` OK<br>**Error**<br>`401` Authorization Error<br>`500` Internal Server Error | Delete a product


### Undefined Route :

Route | Method | Request(s) | Response(s) | Description
---|---|---|---|---
`/*` | any | any | **Error**<br>`404` <br>Route not found | Show result if route not found