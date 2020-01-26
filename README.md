# mini-wp


* **e-commerce.hylrd.site**

  
**Title**
----
registration


* **URL**

  /user/registrasi

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": {
            token: "2kb4khb24bgk4h2bkhf2bofhb2odbbsojnomdkvnofv",
            name: username
        } 
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`
    

**Title**
----
  login

* **URL**

  /user/login

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": {
            token: "2kb4khb24bgk4h2bkhf2bofhb2odbbsojnomdkvnofv",
            name: username
        } 
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`
    

**Title**
----
  googleSignIn

* **URL**

  /user/googlesingin

  * **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": {
            token: "2kb4khb24bgk4h2bkhf2bofhb2odbbsojnomdkvnofv",
            name: username
        } 
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`

**Title**
----
  add to cart

* **URL**

  /user/add

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
   `headers: access_token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": { _id: 5e24e6d51958d53112bc7da3,
        name: 'adadd`',
        desc: 'dqdwqd',
        stock: { name: 'eq' },
        price: '<p>wawd</p>',
        img: 'google.cloud.storage',
        __v: 0 },
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`
    

**Title**
----
  delete item in cart

* **URL**

  /user/delete/:id

  * **Method:**

  `delete`
  
*  **URL Params**


   **Required:**
 
   `headers: access_token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": { n: 1, ndeleted: 1, ok: 1 }
    }`
 
* **Code:** 400 user unautorizhed <br />
    **Content:** `{ 
       msg : unauthorized
        }`


**Title**
----
  get cart

* **URL**

  /user/cart

  * **Method:**

  `get`
  
*  **URL Params**


   **Required:**
 
   `headers: access_token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
          "admin": false,
        "_id": "5e2d27627ed4982e1996e6ef",
        "name": "eq",
        "email": "qqq@mail.com",
        "password": "$2a$10$Rq/zB6OWwmFKkwWqvrMnSeJ0hot2dxDPipJf2XBn6rmQQALFn/b2O",
        "cart": [
            {
                "_id": "5e2d452c2c14045618001af4",
                "product": {
                    "_id": "5e27aa2315497236f5ea76ac",
                    "name": "tikus",
                    "stock": 5,
                    "desc": "sabun makan tikus",
                    "price": 2000,
                    "__v": 0,
                    "img": null
                },
                "jumlah": 3
            },
    }`
 
* **Code:** 400 user unautorizhed <br />
    **Content:** `{ 
       msg : unauthorized
        }`


**Title**
----
  get product

* **URL**

  /article/

  * **Method:**

  `get`
  
*  **URL Params**


   **Required:**
 
   `headers: access_token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": [list of products]
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`

**Title**
----
  get product detail

* **URL**

  /product/:id

  * **Method:**

  `get`
  
*  **URL Params**


   **Required:**
 
   `headers: access_token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "_id": "5e2d45ca2c14045618001af5",
                "product": {
                    "_id": "5e27aa2815497236f5ea76ad",
                    "name": "sirup abc",
                    "stock": 5,
                    "desc": "tikus makan sabun",
                    "price": 2000,
                    "__v": 0
                },
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`


**Title**
----
  add product

* **URL**

  /product/add

  * **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
    `headers: access_token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "_id": "5e2d45ca2c14045618001af5",
                "product": {
                    "_id": "5e27aa2815497236f5ea76ad",
                    "name": "sirup abc",
                    "stock": 5,
                    "desc": "tikus makan sabun",
                    "price": 2000,
                    "__v": 0
                },
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`



**Title**
----
  delete one product

* **URL**

  /product/delete/:id

  * **Method:**

  `delete`
  
*  **URL Params**


   **Required:**
 
   `headers: access_token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": { n: 1, ndeleted: 1, ok: 1 }
    }`
 
* **Code:** 400 user unautorizhed <br />
    **Content:** `{ 
       msg : unauthorized
        }`


**Title**
----
  update a product

* **URL**

  /article/update/:id

  * **Method:**

  `put`
  
*  **URL Params**


   **Required:**
 
   `headers: access_token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": { n: 1, nmodified: 1, ok: 1 }
    }`
 
* **Code:** 400 user unautorizhed <br />
    **Content:** `{ 
       msg : unauthorized
        }`
