const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const Product = require('../models/Product')

chai.use(chaiHttp)

describe('Product Routing', function () {
    // hooks buat menjalankan function sebelum / sesudah testing
    describe('post /product', function () {
      beforeEach(function(done) {
        Product.deleteMany()
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
      it('should have status 201 and return new Product data (_id, name, price, stock, description, featured_image)', function(done) {
        chai.request(app)
          .post('/product')
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
            console.log(res.body);
            
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

  })