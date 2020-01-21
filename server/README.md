# e-commerce

# REST API DOCUMENTATION
Root URL: http://localhost:3000

**Obtain One user information(Username, email, isAdmin, cart)**


* **URL**

  users/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

  None

* **Header Params**

  access_token=[string]

* **Success Response Example:**

  * **Code:** 200 <br />
    **Content:**  
```javascript

    {  
        "_id": "sadaodkwd2d2dj"
        "username": "johndoe",  
        "email": "johndoe@gmail.com",  
        "isAdmin": false,  
        "cart": [  
            {  
                "productId": "asdk20wd29wdsj0aas",  
                "quantity": 5,  
                "subtotal": 250000
            },
            {  
                "productId": "asdasdisadsdma0aas",  
                "quantity": 2,  
                "subtotal": 150000
            }
        ]  
    }  
 ```

 ```javascript

    {  
        "_id": "sadaodkwd2d2dj"
        "username": "johndoe",  
        "email": "johndoe@gmail.com",  
        "isAdmin": false,  
        "cart": [  
            "asdk20wd29wdsj0aas",  
            "asdasdisadsdma0aas",  
        ]  
    }  
 ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: "User is no longer valid" }`

  OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg: "Login Required" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg: "Internal Server Error" }`
* **Sample Call:**

  ```javascript
    axios({
        method: 'GET',
        url : 'http://localhost:3000/users/sadoaskdpkadkp',
        headers: {
            access_token : token
        }
    });
  ```

-------------------------------------------

**Create new user**


* **URL**

  users/

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

```javascript
{
    "username": String,
    "email": String,
    "password": String.
}
```

* **Header Params**

  None

* **Success Response Example:**

  * **Code:** 201 <br />
    **Content:**  
```javascript

    {  
        "_id": "sadiamodij902dj0dwj"
        "username": "johndoe",  
        "email": "johndoe@gmail.com",  
        "isAdmin": false,  
        "cart": []  
    }  
 ```
 
* **Error Response:**
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg: "Internal Server Error" }`
* **Sample Call:**

  ```javascript
    axios({
        method: 'POST',
        url : 'http://localhost:3000/users/',
        data: {
            username,
            email,
            password
        }
    });
  ```

-------------------------------------------

**Create new product**


* **URL**

  products/

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

```javascript
{
    "name": String,
    "description": String,
    "category": String,
    "stocks": Number,
    "price": Number,
    "featured_image": String
}
```

* **Header Params**

  access_token: [string]

* **Success Response Example:**

  * **Code:** 201 <br />
    **Content:**  
```javascript

    {  
        "name": "Miyako Rice Cooker",  
        "category": "Appliance",  
        "stocks": 12,  
        "price": 700000 
    }  
 ```
 
* **Error Response:**
  * **Code:** 401 UNAUTHORIZED<br />
    **Content:** `{ msg: "You are not authorized to perform that action" }`

  OR
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: "User is no longer valid" }`

  OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg: "Login Required" }`

  OR
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg: "Internal Server Error" }`
* **Sample Call:**

  ```javascript
    axios({
        method: 'POST',
        url : 'http://localhost:3000/products/',
        data: {
            name,
            description,
            category,
            stocks,
            price,
            featured_image
        }
    });
  ```

-------------------------------------------

**Edit an existing product**


* **URL**

  products/:id

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

```javascript
{
    "name": String,
    "description": String,
    "category": String,
    "stocks": Number,
    "price": Number,
    "featured_image": String
}
```

* **Header Params**

  access_token: [string]

* **Success Response Example:**

  * **Code:** 200 <br />
    **Content:**  
```javascript

    {  
        "name": "Miyako Rice Cooker",  
        "description": "High Quality and Affordable",
        "category": "Appliance",  
        "stocks": 12,  
        "price": 750000,
        "featured_image": "http://aaoskdw.images.com"
    }  
 ```
 
* **Error Response:**
  * **Code:** 401 UNAUTHORIZED<br />
    **Content:** `{ msg: "You are not authorized to perform that action" }`

  OR
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: "User is no longer valid" }`

  OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg: "Login Required" }`

  OR
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg: "Internal Server Error" }`
* **Sample Call:**

  ```javascript
    axios({
        method: 'PUT',
        url : 'http://localhost:3000/products/asdsj0dj9sd2d',
        data: {
            name,
            description,
            category,
            stocks,
            price,
            featured_image
        }
    });
  ```

-------------------------------------------

**Obtain a product**


* **URL**

  products/:id

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

```javascript
{
    "name": String,
    "description": String,
    "category": String,
    "stocks": Number,
    "price": Number
    "featured_image": String
}
```

* **Header Params**

  access_token: [string]

* **Success Response Example:**

  * **Code:** 200 <br />
    **Content:**  
```javascript

    {  
        "name": "Miyako Rice Cooker",  
        "category": "Appliance",  
        "stocks": 12,  
        "price": 700000 
    }  
 ```
 
* **Error Response:**
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg: "Internal Server Error" }`
* **Sample Call:**

  ```javascript
    axios({
        method: 'GET',
        url : 'http://localhost:3000/products/asda0sdk3ada0dad',
    });
  ```

-------------------------------------------


**Delete a product**


* **URL**

  products/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**

   id: [string]

* **Data Params**

* **Header Params**

  access_token: [string]

* **Success Response Example:**

  * **Code:** 200 <br />
    **Content:**  
```javascript

    {  
        "status": "Delete Successful"
    }  
 ```
 
* **Error Response:**
  * **Code:** 401 UNAUTHORIZED<br />
    **Content:** `{ msg: "You are not authorized to perform that action" }`

  OR
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ msg: "User is no longer valid" }`

  OR

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ msg: "Login Required" }`

  OR
  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ msg: "Internal Server Error" }`
* **Sample Call:**

  ```javascript
    axios({
        method: 'DELETE',
        url : 'http://localhost:3000/products/asda0sdk3ada0dad',
        headers: {
            access_token: "sasda9d0aj90wd3"
        }
    });
  ```

-------------------------------------------