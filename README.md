# e-commerce

**Title**
----
registration


* **URL**

  /users/register

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 201 <br />
    **Content:** `{ 
        "data": {
            name: data.name,
            email: data.email,
            _id: data._id,
            admin: data.admin,
            cart: data.cart
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

  /users/login

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
            name: data.name,
            email: data.email,
            _id: data._id,
            admin: data.admin,
            cart: data.cart
        } 
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`
    

**Title**
----
  add to user's cart

* **URL**

  /users/addcart

* **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
   `headers: token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 201 <br />
    **Content:** `{ 
        "data"
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`
    

**Title**
----
  delete item in cart

* **URL**

  /users/delete/:cartId

  * **Method:**

  `delete`
  
*  **URL Params**


   **Required:**
 
   `headers: token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        "data": { n: 1, ndeleted: 1, ok: 1 }
    }`
 
* **Code:** 401 user unautorizhed <br />
    **Content:** `{ 
       msg : you're not authorized to make this request
        }`


**Title**
----
  get user cart

* **URL**

  /users/getcart

  * **Method:**

  `get`
  
*  **URL Params**


   **Required:**
 
   `headers: token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
          data
   }`
 
* **Code:** 400 user unautorizhed <br />
    **Content:** `{ 
       msg : unauthorized
        }`


**Title**
----
  get items

* **URL**

  /items/

  * **Method:**

  `get`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        data
    }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`

**Title**
----
  get product detail

* **URL**

  /items/:itemId

  * **Method:**

  `get`
  
*  **URL Params**


   **Required:**
 
   `none`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        data
   }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`


**Title**
----
  add items

* **URL**

  /items/

  * **Method:**

  `POST`
  
*  **URL Params**


   **Required:**
 
    `headers: token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{ 
        data
   }`
 
* **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ 
       msg : err.message 
        }`



**Title**
----
  delete item

* **URL**

  /items/delete/:itemId

  * **Method:**

  `delete`
  
*  **URL Params**


   **Required:**
 
   `headers: token`

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
       msg : you're not authorized to make this request
        }`


**Title**
----
  update an item

* **URL**

  /items/:itemId

  * **Method:**

  `put`
  
*  **URL Params**


   **Required:**
 
   `headers: token`

   **Optional:**
 
   `none`

* **Data Params**


* **Success Response:**
  

  * **Code:** 201 <br />
    **Content:** `{ 
        "data": { n: 1, nmodified: 1, ok: 1 }
    }`
 
* **Code:** 400 user unautorizhed <br />
    **Content:** `{ 
       msg : you're not authorized to make this request
        }`