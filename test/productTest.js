const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const Product = require('../models/product')

chai.use(chaiHttp)

describe('Product Routing', function () {

  // HOOKS AFTER TESTING
  after(function (done) {
    Product.deleteMany()
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  describe('/api/product', function () {
    // // HOOKS BEFORE EVERY SINGLE TESTING ==> beforeEach
    before(function (done) {
      Product.deleteMany()
        .then(() => {
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    it('Should return status 201 and new added product (name, description, category, price, stock)', function (done) {
      chai.request(app)
        .post('/api/product')
        .send({
          name: "Ini namanya barang",
          description: "Aku deskripsinya",
          category: "Kategorinya apa ya",
          price: "100000",
          stock: "10",
          imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71FX4921zZL._AC_SL1500_.jpg'
        })
        .end((err, res) => {

          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('description')
          expect(res.body).to.have.property('category')
          expect(res.body).to.have.property('price')
          expect(res.body).to.have.property('stock')
          expect(res.body).to.have.property('imageUrl')
          done()
        })
    })

    it('Should return status 200 and an array of product', function (done) {
      chai.request(app)
        .get('/api/product')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.have.property('_id')
          expect(res.body[0]).to.have.property('name')
          expect(res.body[0]).to.have.property('description')
          expect(res.body[0]).to.have.property('category')
          expect(res.body[0]).to.have.property('price')
          expect(res.body[0]).to.have.property('stock')
          expect(res.body[0]).to.have.property('imageUrl')
          done()
        })
    })

    it('Should return status 200 and a product object', function (done) {
      chai.request(app)
        .get('/api/product')
        .end((err, res) => {
          const id = res.body[0]._id
          chai.request(app)
            .get(`/api/product/${id}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('_id')
              expect(res.body).to.have.property('name')
              expect(res.body).to.have.property('description')
              expect(res.body).to.have.property('category')
              expect(res.body).to.have.property('price')
              expect(res.body).to.have.property('stock')
              expect(res.body).to.have.property('imageUrl')
              done()
            })
        })
    })

    it('Should return status 200 and a message about update success', function (done) {
      chai.request(app)
        .get('/api/product')
        .end((err, res) => {
          const id = res.body[0]._id
          chai.request(app)
            .put(`/api/product/${id}`)
            .send({
              name: "Ini namanya barang (baru loh)",
              description: "Aku deskripsinya",
              category: "Kategorinya apa ya",
              price: "100000",
              stock: "10",
              imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71FX4921zZL._AC_SL1500_.jpg'
            })
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.msg).to.equal('This product updated successfully')
              done()
            })
        })
    })

    it('Should return status 200 and a message about delete success', function (done) {
      chai.request(app)
        .get('/api/product')
        .end((err, res) => {
          const id = res.body[0]._id
          chai.request(app)
            .delete(`/api/product/${id}`)
            .end((err, res) => {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.msg).to.equal('This product deleted successfully')
              done()
            })
        })
    })

  })
})
