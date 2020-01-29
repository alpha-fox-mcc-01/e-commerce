# e-commerce

**Register User**
----
  Returns json data about a single user (_id, name, email).

* **URL**

  /user/register

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Required:**
  **Content:** `{ name : "Michael Bloom", email: "michael@bloom.com", password: "12345678" }`

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ _id : 5e255fbf3ba93441da825e5d, name : "Michael Bloom" , email: michael@bloom.com}`
 
* **Error Response:**

  * **Code:** 400 MONGO ERROR <br />
    **Content:** `{ msg : "Email is already used" }`

  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ msg : "Validation Error", errors : [ "Please fill a valid email address", "Password minimum length is 8", "Name is required", "Email address is required", "Password is required" ] }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ msg : "Internal Server Error" }`

* **Sample Call:**

  ```javascript
  axios({
    method: 'POST',
    url: 'http://localhost:3000/user/register',
    data: {
      name,
      email,
      password,
    },
  });
  ```


**Login User**
----
  Returns json data {access_token}.

* **URL**

  /user/login

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Required:**
  **Content:** `{ email: "michael@bloom.com", password: "12345678" }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ access_token }`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ msg : "Email or password is wrong" }`
    **Content:** `{ msg : "Email address and password is required" }`


* **Sample Call:**

  ```javascript
  axios({
    method: 'POST',
    url: 'http://localhost:3000/user/login',
    data: {
      email,
      password,
    },
  });
  ```


  **Get User**
----
  Returns user data.

* **URL**

  /user

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Headers**

  access_token

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `user with cart`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ msg : "Internal Server Error" }`


* **Sample Call:**

  ```javascript
  axios({
    method: 'GET',
    url: 'http://localhost:3000/user',
    headers: {
      access_token: localStorage.getItem('access_token'),
    },
  })
  ```


  **Add to Cart**
----
  Add product to cart field in user.

* **URL**

  /user/add/:id

* **Method:**

  `POST`
  
*  **URL Params**

   None

* **Data Params**

  **Required:**
  **Content:** `{ quantity: this.quantity }`

* **Headers**

  access_token

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `user with cart`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ msg : "Internal Server Error" }`


* **Sample Call:**

  ```javascript
  axios({
    method: 'POST',
    url: `http://localhost:3000/user/add/${this.$route.params.id}`,
    data: {
      quantity: this.quantity,
    },
    headers: {
      access_token: accessToken,
    },
  })
  ```


  **Delete in cart**
----
  Delete product in cart field in user.

* **URL**

  /user/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Headers**

  access_token

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `None`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ msg : "Internal Server Error" }`


* **Sample Call:**

  ```javascript
  axios({
    method: 'DELETE',
    url: `http://localhost:3000/user/${id}`,
    headers: {
      access_token: localStorage.getItem('access_token'),
    },
  })
  ```



  **Show All Product**
----
  Show all products.

* **URL**

  /product

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Headers**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `Products data`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ msg : "Internal Server Error" }`


* **Sample Call:**

  ```javascript
  axios({
    method: 'GET',
    url: 'http://localhost:3000/product',
  })
  ```


    **Show 12 Product**
----
  Show 12 products for home page.

* **URL**

  /product/starter

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

  None

* **Headers**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `12 products data`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ msg : "Internal Server Error" }`


* **Sample Call:**

  ```javascript
  axios({
    method: 'GET',
    url: 'http://localhost:3000/product/starter',
  })
  ```