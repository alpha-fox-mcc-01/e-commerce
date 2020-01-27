# e-commerce

**REGISTER USER**
----
  

* **URL**

  /users/register

* **Method:**
  
  <_The request type_>

`POST` 
  

* **Data Params**

  username: String
  email: String
  password: String
  role : String (Default Customer)

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** `{ message:  'Registration Successful!'}`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

  OR

  * **Code:** 403 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**
 axios.post('users/register', {
     username: '',
     password: '',
     email: ''
 })

**LOGIN USER**
----


* **URL**

  /users/login

* **Method:**
  
  `POST` 
  
* **Data Params**

  email : String
  password: String

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: 'Login successful!'}`
 
* **Error Response:**


  * **Code:** 400  <br />
    **Content:** `{ error : "Email/password wrong" }`

  OR

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**

  axios.post('users/login', {
      data: {
           password: '',
            email: ''
      }
  })

**CREATE PRODUCT**
----


* **URL**

  /products

* **Method:**
  
  <_The request type_>

  `POST`

* **Data Params**

  {
      name: String,
      category: String,
      stock: Integer,
      price : Integer,
      description: String,
      image: String
  }

* **Success Response:**
  

  * **Code:** 201 <br />
    **Content:** `{message: 'Product successfully created!'}`
 
* **Error Response:**


  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are not authorized to do this action" }`

  OR

  * **Code:** 500  <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**

  axios.post('/products', {data : 
    {
      name: String,
      category: String,
      stock: Integer,
      price : Integer,
      description: String,
      image: String
  }
}, {headers: {
    access_token : ''
}})


**SEE ALL PRODUCTS**
----

* **URL**

  /products

* **Method:**
  
  <_The request type_>

  `GET`


* **Success Response:**
  
  * **Code:** 200 <br />
    **Content:** `[
        {
            _id: 1,
            name: sticker,
            stock: 10,
            category: Station
            price: 10000
            description: 
        }
    ]`
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**

  axios.get('/products')


**SEE SPECIFIC PRODUCT**
----

* **URL**

  /products/:id

* **Method:**
  `GET``
  
*  **URL Params**

    /:id

   **Required:**
 
   `product id=[integer]`

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** `{
            _id: 1,
            name: sticker,
            stock: 10,
            category: Station
            price: 10000
            description: 
        }`
 
* **Error Response:**

  * **Code:** 500 UNAUTHORIZED <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**

    axios.get('/products/:id') 

**EDIT PRODUCT**
----

* **URL**

  /products/:id

* **Method:**
  
  <_The request type_>

  `PUT`
  
*  **URL Params**

   /:id

   **Required:**
 
   `product id=[integer]`

* **Data Params**

  {
      name: String,
      category: String,
      stock: Integer,
      price : Integer,
      description: String,
      image: String
  }

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message: 'Product successfully updated'}`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You are not allowed to do this action" }`

  OR

  * **Code:**  500 <br />
    **Content:** `{ error : "Internal Server Error }`

* **Sample Call:**

axios.put('/products/:id', {
     name: String,
      category: String,
      stock: Integer,
      price : Integer,
      description: String,
      image: String
})

**DELETE PRODUCT**
----

* **URL**
  /products/:id

* **Method:**
  
  <_The request type_>

   `DELETE`
  
*  **URL Params**
   /:id

   **Required:**
 
   `product id=[integer]`

* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `{ message : 'Delete successful'}`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 500 <br />
    **Content:** `{ error : "Internal Server Error" }`

   * **Code:** 401 <br />
    **Content:** `{ error : "You are not authorized to do this action" }`   

* **Sample Call:**

 axios.delete('/products/:id')


 **LOG OUT AND REMOVE CART**
----
* **URL**

 /cart

* **Method:**
  `DELETE` 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ id : 12 }`
 
* **Error Response:**

  * **Code:** 500  <br />
    **Content:** `{ error : "Internal Server Error" }`

* **Sample Call:**
    axios.delete('/users/logout', { headers: { access_token: localStorage.getItem('access_token') }
    })

**FETCH CART**
----

* **URL**

/users/cart

* **Method:**
  `GET` 


* **Success Response:**
  * **Code:** 200 <br />
    **Content:** `{ cart : [{
        product: 
        quantity: 
    }]
     }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "You have to be logged in" }`


* **Sample Call:**
   
   axios.get('/users/cart', { headers: { access_token: localStorage.getItem('access_token') }
      })

**ADD TO CART**
----

* **URL**
 /POST

* **Method:**
  
  <_The request type_>

  `POST`
  

* **Data Params**

  {product: productId}

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ message : 'Product successfully added }`
 
* **Sample Call:**
 axios.post('http://35.240.238.247/users/cart', {
        product: payload
      }, { headers: {
        access_token: localStorage.getItem('access_token')
      } })

