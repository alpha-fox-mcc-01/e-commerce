const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const Product = require('../models/Product')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const fs = require('fs')

chai.use(chaiHttp)

describe('Product Routing', function () {
    // hooks buat menjalankan function sebelum / sesudah testing
    describe('post /product', function () {
      let token
      before(function(done) {
        User.create({
          name: 'nafies',
          email: 'nafies@nafies.id',
          password: 'mantapjiwa',
          cartLists : [],
          adminRole: true
        })
          .then(user => {
            token = jwt.sign({ id: user._id }, 'Kucinglucu');
            return Product.deleteMany()
          })
          .then(_ => {
            console.log('Initial delete product success')
            done()
          })
          .catch(err => {
            done(err)
          })
      })

      after(function(done) {
        Product.deleteMany()
          .then(_ => {
            return User.deleteMany()
          })
          .then(_ => {
            done()
          })
          .catch(err => {
            done(err)
          })
      })

      it('should have status 201 and return new Product data (_id, name, price, stock, description, image)', function(done) {
        chai.request(app)
          .post('/product')
          .set('token', token)
          .send({
            name: 'sepatu',
            price: 200000,
            stock: 10,
            description: 'Sepatu lari',
            image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
          })
          .end((err, res) => {
            console.log(res.body)
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('name').to.equal('sepatu')
            expect(res.body).to.have.property('price').to.be.a('Number'), //.to.equal(200000),
            expect(res.body).to.have.property('stock').to.equal(10)
            expect(res.body).to.have.property('description').to.equal('Sepatu lari')
            expect(res.body).to.have.property('_id')
            expect(res.body).to.have.property('image')
            done()
          })
      })

      it('should have status 401 and return error Not Authorized', function(done) {
        let token1
        User.create({
          name: 'nafies',
          email: 'nafies@nafies.id',
          password: 'mantapjiwa',
          cartLists : []
        })
        .then(user => {
          token1 = jwt.sign({ id: user._id }, 'Kucinglucu')
          chai.request(app)
          .post('/product')
          .set('token', token1)
          .send({
            name: 'sepatu',
            price: 200000,
            stock: 10,
            description: 'Sepatu lari',
            image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
          })
          .end((err, res) => {
            console.log(res.body)
            expect(err).to.be.null;
            expect(res).to.have.status(401)
            expect(res.body).to.have.property('error').to.equal('Not Authorized')
            expect(res.body).to.have.property('msg')
            done()
          })
        })
        .catch(err => {
          console.log(err)
        })
      })
  
      it('should have status 400 and return error validation if stock is less than 0', function(done) {
        chai.request(app)
          .post('/product')
          .set('token', token)
          .send({
            name: 'sepatu',
            price: 20000,
            stock: -10,
            description: 'Sepatu lari',
            image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
          })
          .end((err, res) => {
            console.log(res.body);
            
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.have.own.property('errors').to.be.an('array')
            expect(res.body.errors[0]).to.equal('Minimal stock is 0')
            expect(res.body).to.have.own.property('msg').to.equal('Validation Error')
            done()
          })
      })

      it('should have status 400 and return error validation if price or stock entered is not a number', function(done) {
        chai.request(app)
          .post('/product')
          .set('token', token)
          .send({
            name: 'sepatu',
            price: '20000m',
            stock: '10m',
            description: 'Sepatu lari',
            image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
          })
          .end((err, res) => {
            console.log(res.body);
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.have.own.property('errors').to.be.an('array')
            expect(res.body.errors[0]).to.have.string('Cast to Number failed')
            expect(res.body).to.have.own.property('msg').to.equal('Validation Error')
            done()
          })
      })

      it('should have status 400 and return error validation if name is empty', function(done) {
        chai.request(app)
          .post('/product')
          .set('token', token)
          .send({
            name: '',
            price: 20000,
            stock: 10,
            description: 'Sepatu lari',
            image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
          })
          .end((err, res) => {
            console.log(res.body);
            
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.have.own.property('errors').to.be.an('array')
            expect(res.body.errors[0]).to.have.string('Name is required')
            expect(res.body).to.have.own.property('msg').to.equal('Validation Error')
            done()
          })
      })

      it('should have status 400 and return error validation if price is empty', function(done) {
        chai.request(app)
          .post('/product')
          .set('token', token)
          .send({
            name: 'sepatu',
            price: null,
            stock: 10,
            description: 'Sepatu lari',
            image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
          })
          .end((err, res) => {
            console.log(res.body)
            
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.have.own.property('errors').to.be.an('array')
            expect(res.body.errors[0]).to.have.string('Price is required')
            expect(res.body).to.have.own.property('msg').to.equal('Validation Error')
            done()
          })
      })

      it('should have status 400 and return error validation if stock is empty', function(done) {
        chai.request(app)
          .post('/product')
          .set('token', token)
          .send({
            name: 'sepatu',
            price: 200000,
            stock: null,
            description: 'Sepatu lari',
            image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
          })
          .end((err, res) => {
            console.log(res.body);
            
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.have.own.property('errors').to.be.an('array')
            expect(res.body.errors[0]).to.have.string('Stock is required')
            expect(res.body).to.have.own.property('msg').to.equal('Validation Error')
            done()
          })
      })

    })

    describe('get /product', function () {
      beforeEach(function(done) {
        Product.create({
          name: 'sepatu',
          price: 200000,
          stock: 10,
          description: 'Sepatu lari',
          image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
        })
          .then(_ => {
            done()
          })
          .catch(err => {
            done(err)
          })
      })
  
      after(function(done) {
        Product.deleteMany()
          .then(_ => {
            done()
          })
          .catch(err => {
            done(err)
          })
      })
      it('should have status 200 and return Product data (_id, name, price, stock, description, image)', function(done) {
        chai.request(app)
          .get('/product')
          .end((err, res) => {
            console.log(res.body)
            expect(err).to.be.null;
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('Array').to.have.length(1)
            expect(res.body[0]).to.have.property('name').to.equal('sepatu')
            expect(res.body[0]).to.have.property('price').to.be.a('Number'), //.to.equal(200000),
            expect(res.body[0]).to.have.property('stock').to.equal(10)
            expect(res.body[0]).to.have.property('description').to.equal('Sepatu lari')
            expect(res.body[0]).to.have.property('_id')
            expect(res.body[0]).to.have.property('image')
            done()
          })
      })
    })

    describe('get /product/:id', function () {
      let id
      before(function(done) {
        Product.create({
          name: 'sepatu',
          price: 200000,
          stock: 10,
          description: 'Sepatu lari',
          image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
        })
          .then( product => {
            id = product._id
            done()
          })
          .catch(err => {
            done(err)
          })
      })

      it('should have status 200 and return Product data (_id, name, price, stock, description, image)', function(done) {
        chai.request(app)
          .get(`/product/${id}`)
          .end((err, res) => {
            console.log(res.body)
            expect(err).to.be.null;
            expect(res).to.have.status(200)
            expect(res.body).to.have.property('name').to.equal('sepatu')
            expect(res.body).to.have.property('price').to.be.a('Number'),
            expect(res.body).to.have.property('stock').to.equal(10)
            expect(res.body).to.have.property('description').to.equal('Sepatu lari')
            expect(res.body).to.have.property('_id')
            expect(res.body).to.have.property('image')
            done()
          })
      })

      it('should have status 200 and return null', function(done) {
        chai.request(app)
          .get(`/product/5e29288fe840d71ba4c82e02`)
          .end((err, res) => {
            console.log(res.body)
            expect(err).to.be.null
            expect(res.body).to.be.null
            done()
          })
      })

      it('should have status 400 and return invalid id product', function(done) {
        chai.request(app)
          .get(`/product/osdjnfknsdcklwldc`)
          .end((err, res) => {
            console.log(res.body)
            expect(err).to.be.null
            expect(res.body).to.have.property('msg').to.equal('Id is invalid')
            done()
          })
      })

    })

    describe('update /product/:id', function () {
      let token
      let idProduct
      before(function(done) {
        User.create({
          name: 'nafies',
          email: 'nafies@nafies.id',
          password: 'mantapjiwa',
          cartLists : [],
          adminRole: true
        })
          .then(user => {
            token = jwt.sign({ id: user._id }, 'Kucinglucu');
            return Product.deleteMany()
          })
          .then(_ => {
            console.log('Initial delete product success')
            return Product.create({
              name: 'sandal',
              price: 23000,
              stock: 20,
              description: 'sendal lari',
              image: 'https://pbs.twimg'
            })
          })
          .then(product => {
            idProduct = product._id
            console.log(idProduct, 'initial product create success')
            done()
          })
          .catch(err => {
            done(err)
          })
      })

      after(function(done) {
        Product.deleteMany()
          .then(_ => {
            return User.deleteMany()
          })
          .then(_ => {
            done()
          })
          .catch(err => {
            done(err)
          })
      })

      it('should have status 200 and return message product updated successfully', function(done) {
        chai.request(app)
          .put(`/product/${idProduct}`)
          .set('token', token)
          .send({
            name: 'sepatu',
            price: 200000,
            stock: 10,
            description: 'Sepatu lari',
            image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
          })
          .end((err, res) => {
            console.log(res.body)
            expect(err).to.be.null
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('msg').to.equal(`Product with id ${idProduct} updated successfully`)
            done()
          })
      })

      it('should have status 401 and return error Not Authorized', function(done) {
        User.create({
          name: 'nafies1',
          email: 'nafies1@nafies.id',
          password: 'mantapjiwa',
          cartLists : []
        })
        .then(user => {
          token1 = jwt.sign({ id: user._id }, 'Kucinglucu')
          chai.request(app)
          .put(`/product/${idProduct}`)
          .set('token', token1)
          .send({
            name: 'sepatu',
            price: 200000,
            stock: 10,
            description: 'Sepatu lari',
            image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
          })
          .end((err, res) => {
            console.log(res.body)
            expect(err).to.be.null;
            expect(res).to.have.status(401)
            expect(res.body).to.have.property('error').to.equal('Not Authorized')
            expect(res.body).to.have.property('msg')
            done()
          })
        })
        .catch(err => {
          console.log(err)
        })
      })
  
      it('should have status 400 and return error validation if price or stock entered is not a number', function(done) {
        chai.request(app)
          .put(`/product/${idProduct}`)
          .set('token', token)
          .send({
            name: 'sepatu',
            price: '20000m',
            stock: '10m',
            description: 'Sepatu lari',
            image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
          })
          .end((err, res) => {
            console.log(res.body);
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.have.own.property('err')
            expect(res.body.err.message).to.have.string('Cast to number failed')
            expect(res.body).to.have.own.property('msg').to.equal('Failed to read string as a number')
            done()
          })
      })

      it('should have status 400 and return invalid id product', function(done) {
        chai.request(app)
          .put(`/product/osdjnfknsdcklwldc`)
          .set('token', token)
          .send({
            name: 'sepatu',
            price: 200000,
            stock: 10,
            description: 'Sepatu lari',
            image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
          })
          .end((err, res) => {
            console.log(res.body)
            expect(err).to.be.null
            expect(res.body).to.have.property('msg').to.equal('Id is invalid')
            done()
          })
      })

    })

    describe('updateStock /product/:id', function () {
      let token
      let idProduct
      before(function(done) {
        User.create({
          name: 'nafies',
          email: 'nafies@nafies.id',
          password: 'mantapjiwa',
          cartLists : [],
          adminRole: true
        })
          .then(user => {
            token = jwt.sign({ id: user._id }, 'Kucinglucu');
            return Product.deleteMany()
          })
          .then(_ => {
            console.log('Initial delete product success')
            return Product.create({
              name: 'sandal',
              price: 23000,
              stock: 20,
              description: 'sendal lari',
              image: 'https://pbs.twimg'
            })
          })
          .then(product => {
            idProduct = product._id
            console.log(idProduct, 'initial product create success')
            done()
          })
          .catch(err => {
            done(err)
          })
      })

      after(function(done) {
        Product.deleteMany()
          .then(_ => {
            return User.deleteMany()
          })
          .then(_ => {
            done()
          })
          .catch(err => {
            done(err)
          })
      })

      it('should have status 200 and return message product stock updated successfully', function(done) {
        chai.request(app)
          .patch(`/product/${idProduct}`)
          .set('token', token)
          .send({
            stock: 9
          })
          .end((err, res) => {
            console.log(res.body)
            expect(err).to.be.null
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('msg').to.equal(`Product Stock with id ${idProduct} updated successfully`)
            done()
          })
      })

      it('should have status 401 and return error Not Authorized', function(done) {
        User.create({
          name: 'nafies1',
          email: 'nafies1@nafies.id',
          password: 'mantapjiwa',
          cartLists : []
        })
        .then(user => {
          token1 = jwt.sign({ id: user._id }, 'Kucinglucu')
          chai.request(app)
          .patch(`/product/${idProduct}`)
          .set('token', token1)
          .send({
            stock: 10
           })
          .end((err, res) => {
            console.log(res.body)
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body).to.have.property('error').to.equal('Not Authorized')
            expect(res.body).to.have.property('msg')
            done()
          })
        })
        .catch(err => {
          console.log(err)
        })
      })

      it('should have status 400 and return invalid id product', function(done) {
        chai.request(app)
          .patch(`/product/osdjnfknsdcklwldc`)
          .set('token', token)
          .send({
            stock: 9
          })
          .end((err, res) => {
            console.log(res.body)
            expect(err).to.be.null
            expect(res.body).to.have.property('msg').to.equal('Id is invalid')
            done()
          })
      })

    })

    describe('delete /product/:id', function () {
      let token
      let idProduct
      before(function(done) {
        User.create({
          name: 'nafies',
          email: 'nafies@nafies.id',
          password: 'mantapjiwa',
          cartLists : [],
          adminRole: true
        })
          .then(user => {
            token = jwt.sign({ id: user._id }, 'Kucinglucu');
            return Product.deleteMany()
          })
          .then(_ => {
            console.log('Initial delete product success')
            return Product.create({
              name: 'sandal',
              price: 23000,
              stock: 20,
              description: 'sendal lari',
              image: 'https://pbs.twimg'
            })
          })
          .then(product => {
            idProduct = product._id
            console.log(idProduct, 'initial product create success')
            done()
          })
          .catch(err => {
            done(err)
          })
      })

      after(function(done) {
        Product.deleteMany()
          .then(_ => {
            return User.deleteMany()
          })
          .then(_ => {
            done()
          })
          .catch(err => {
            done(err)
          })
      })

      it('should have status 200 and return message product deleted successfully', function(done) {
        chai.request(app)
          .delete(`/product/${idProduct}`)
          .set('token', token)
          .end((err, res) => {
            console.log(res.body)
            expect(err).to.be.null
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('msg').to.equal(`Product with id ${idProduct} deleted successfully`)
            done()
          })
      })

      it('should have status 401 and return error Not Authorized', function(done) {
        User.create({
          name: 'nafies1',
          email: 'nafies1@nafies.id',
          password: 'mantapjiwa',
          cartLists : []
        })
        .then(user => {
          token1 = jwt.sign({ id: user._id }, 'Kucinglucu')
          chai.request(app)
          .delete(`/product/${idProduct}`)
          .set('token', token1)
          .end((err, res) => {
            console.log(res.body)
            expect(err).to.be.null
            expect(res).to.have.status(401)
            expect(res.body).to.have.property('error').to.equal('Not Authorized')
            expect(res.body).to.have.property('msg')
            done()
          })
        })
        .catch(err => {
          console.log(err)
        })
      })

      it('should have status 400 and return invalid id product', function(done) {
        chai.request(app)
          .delete(`/product/osdjnfknsdcklwldc`)
          .set('token', token)
          .end((err, res) => {
            console.log(res.body)
            expect(err).to.be.null
            expect(res.body).to.have.property('msg').to.equal('Id is invalid')
            done()
          })
      })

    })

    describe('upload /product/upload', function () {
      let token
      it('should have status 200 and return link of uploaded file', function(done) {
        chai.request(app)
          .post('/product/upload')
          .attach('file', fs.readFileSync('img-test/mini.png'), 'mini.png')
          .end((err, res) => {
            console.log(res.body)
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').to.equal('Your file is successfully uploaded'),
            expect(res.body).to.have.property('link')
            done()
          })
      })
    })

  })