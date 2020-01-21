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

### **List of User Routes** ###
| Route                  |  HTTP  |  Header(s)   | Body                                                    |   Params   | Description                     |
| ---------------------- | :----: | :----------: | ------------------------------------------------------- | :--------: | ------------------------------- |
| /user/signup           |  POST  |     none     | **Type: String (Req)**<br>username<br>email<br>password |            | Sign up with new user info      |
| /user/signin           |  POST  |     none     | **Type: String (Req)**<br>username<br>email<br>password |            | Sign in and get an access token |
| /user/:id/cart         |  GET   | access_token |                                                         |     id     | Show user own cart              |
| /user/:id/cart/:itemId | DELETE | access_token |                                                         | id, itemId | Delete an item from user cart   |

---
<br>

**REST API TODOS**
----

* **URL**
  [heroku](https://todos-api-ahmad.herokuapp.com/api/todos) | `localhost:3000/api/todos`

* **Method:**
  `GET` | `POST` | `PUT` | `PATCH` | `DELETE`
  

<br>

**Show Todos**
----
  Get all the todos info.

* **URL**

    [heroku](https://todos-api-ahmad.herokuapp.com/api/todos) | `localhost:3000/api/todos`

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ todos }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg : "Database is empty" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ msg: "Sorry, you're not authorized" }`

<br>

**Add Todo**
----
  Create a todo.

* **URL**

  [heroku](https://todos-api-ahmad.herokuapp.com/api/todos) | `localhost:3000/api/todos`

* **Method:**

  `POST`

* **Data Params**

    * **title** : string
    * **description** : string

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ msg: 'Todo created successfully' }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ msg: "Sorry, you're not authorized" }`

<br>

**Show Todo by ID**
----
  Get a single todo info.

* **URL**

    [heroku](https://todos-api-ahmad.herokuapp.com/api/todos) | `localhost:3000/api/todos`

* **Method:**

  `GET`

* **Params**
  
  **Required:**
 
      id (integer)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ todo by id }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: 'Not found' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ msg: "Sorry, you're not authorized" }`

<br>

**EDIT Todo by ID**
----
  Update a todo with new info.

* **URL**

    [heroku](https://todos-api-ahmad.herokuapp.com/api/todos) | `localhost:3000/api/todos`

* **Method:**

  `PUT` | `PATCH`

* **Params**
  
  **Required:**
 
      id (integer)

* **Data Params**

  * **title** : string
  * **description** : string

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg : 'Todo updated' }`
 
* **Error Response:**

  * **PUT**
    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** `{ msg: 'Failed to update Todo' }`

      OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:** `{ msg: "Sorry, you're not authorized" }`

  * **PATCH**
    * **Code:** 403 FORBIDDEN <br />
    * **Content:** `{ msg: 'Update failed, please use put method instead' }`

      OR

    * **Code:** 500 INTERNAL SERVER ERROR <br />
      **Content:** `{ msg: 'Failed to update Todo' }`

      OR

    * **Code:** 401 UNAUTHORIZED <br />
      **Content:** `{ msg: "Sorry, you're not authorized" }`


<br>

**Delete Todo by ID**
----
  Delete a todo.

* **URL**

    [heroku](https://todos-api-ahmad.herokuapp.com/api/todos) | `localhost:3000/api/todos`

* **Method:**

  `DELETE`

* **Params**
  
  **Required:**
 
      id (integer)

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** `{ msg: 'Todo deleted successfully' }`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: 'Not found' }`

    OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg : err.message }`

    OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ msg: "Sorry, you're not authorized" }`