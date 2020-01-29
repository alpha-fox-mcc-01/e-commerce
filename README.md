# e-commerce API Documentation

## URL
```
http://localhost:3000/
```

## Routes

# Product

## Create Product

1. Method
    ```
    POST
    ```
2. Params : 

      None
    
3. Data :
  ```
  {
    name : String,
    Description : String,
    Price : Number,
    Stock : Number
  }
  ```
4. Response
  * **Success**
    1. Status : 200
    2. Response : 

        ```
        {
          _id : ObjectId
          name : String,
          Description : String,
          Price : Number,
          Stock : Number
        }    
        ```
  * **Failed**
    
    1. 