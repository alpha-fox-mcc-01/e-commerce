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

* **Sample Call:**

  ```javascript
  ```


**Login User**
----
  Returns json data {access_token}.

* **URL**

  /users/login

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
    
  ```