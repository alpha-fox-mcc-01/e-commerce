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
    describe('post /cart/:id', function () {
      let token
      let idProduct
      let idUser
      before(function(done) {
        User.create({
          name: 'nafies',
          email: 'nafies@nafies.id',
          password: 'mantapjiwa',
          cartLists : [],
          adminRole: true
        })
          .then(user => {
            idUser = user._id
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

      it('should have status 200 and return message Add product to cart success', function(done) {
        chai.request(app)
          .post(`/cart/${idUser}`)
          .set('token', token)
          .send({
            productId: idProduct,
            quantity: 9
          })
          .end((err, res) => {
            console.log(res.body)
            expect(err).to.be.null
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('msg').to.equal(`Add product to cart success`)
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
          .post(`/cart/${idUser}`)
          .set('token', token1)
          .send({
            productId: idProduct,
            quantity: 10
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

    })

    describe('delete /cart/:id', function () {
      let token
      let idProduct
      let idUser
      before(function(done) {
        User.create({
          name: 'nafies',
          email: 'nafies@nafies.id',
          password: 'mantapjiwa',
          cartLists : [],
          adminRole: true
        })
          .then(user => {
            idUser = user._id
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
            return User.findByIdAndUpdate(idUser, {
                      $push: {
                        cartLists: {
                          productId: idProduct,
                          quantity: 10
                        }
                      }
                    })
          })
          .then(_ => {
            console.log('Initial add to cart success');
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

      it('should have status 200 and return message Delete product from cart success', function(done) {
        chai.request(app)
          .delete(`/cart/${idUser}`)
          .set('token', token)
          .send({
            productId: idProduct
          })
          .end((err, res) => {
            console.log(res.body)
            expect(err).to.be.null
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('msg').to.equal(`Delete product from cart success`)
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
          .post(`/cart/${idUser}`)
          .set('token', token1)
          .send({
            productId: idProduct
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
    })

  })