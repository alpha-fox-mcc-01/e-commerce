const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const Product = require('../models/Product')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

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

      it.only('should have status 201 and return new Product data (_id, name, price, stock, description, featured_image)', function(done) {
        chai.request(app)
          .post('/product')
          .set('token', token)
          .send({
            name: 'sepatu',
            price: 200000,
            stock: 10,
            description: 'Sepatu lari',
            featured_image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
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
            expect(res.body).to.have.property('featured_image')
            done()
          })
      })
  
      it('should have status 400 and return error validation if stock is less than 0', function(done) {
        chai.request(app)
          .post('/product')
          .send({
            name: 'sepatu',
            price: 20000,
            stock: -10,
            description: 'Sepatu lari',
            featured_image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
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
          .send({
            name: 'sepatu',
            price: '20000m',
            stock: '10m',
            description: 'Sepatu lari',
            featured_image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
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
          .send({
            name: '',
            price: 20000,
            stock: 10,
            description: 'Sepatu lari',
            featured_image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
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
          .send({
            name: 'sepatu',
            price: null,
            stock: 10,
            description: 'Sepatu lari',
            featured_image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
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
          .send({
            name: 'sepatu',
            price: 200000,
            stock: null,
            description: 'Sepatu lari',
            featured_image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
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
          featured_image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
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
      it('should have status 200 and return Product data (_id, name, price, stock, description, featured_image)', function(done) {
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
            expect(res.body[0]).to.have.property('featured_image')
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
          featured_image: 'https://pbs.twimg.com/profile_images/725275730267926528/dGPyaQZ6_400x400.jpg'
        })
          .then( product => {
            id = product._id
            done()
          })
          .catch(err => {
            done(err)
          })
      })

      it('should have status 200 and return Product data (_id, name, price, stock, description, featured_image)', function(done) {
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
            expect(res.body).to.have.property('featured_image')
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
  })