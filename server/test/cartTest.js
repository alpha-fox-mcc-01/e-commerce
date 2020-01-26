const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const Cart = require('../models/cart')

chai.use(chaiHttp)

describe('Cart Routing', function () {

  // HOOKS AFTER TESTING
  after(function (done) {
    Cart.deleteMany()
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  describe('/cart', function () {
    // // HOOKS BEFORE EVERY SINGLE TESTING ==> beforeEach
    before(function (done) {
      let UserId = ''
      let ProductId = ''
      let access_token = ''
      chai.request(app)
        .post('/login')
        .send({
          email: 'ahmad@ahmad.com',
          password: 'ahmadahmad'
        })
        .end((err, res) => {
          this.UserId = res.body.userId
          this.access_token = res.body.access_token
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
            .set('access_token', this.access_token)
            .end((err, res) => {
              this.ProductId = res.body._id
              done()
            })
        })
    })

    it('Should return status 201 and new created item in cart (_id, UserId, ProductId, quantity)', function (done) {
      chai.request(app)
        .post('/cart')
        .send({
          UserId: this.UserId,
          ProductId: this.ProductId,
          quantity: 10
        })
        .set('access_token', this.access_token)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property('UserId')
          expect(res.body).to.have.property('ProductId')
          expect(res.body).to.have.property('quantity')
          done()
        })
    })

    it('Should return status 200 and a message that product has been deleted)', function (done) {
      chai.request(app)
        .get('/cart/' + this.UserId)
        .set('access_token', this.access_token)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body[0]).to.have.property('UserId')
          expect(res.body[0]).to.have.property('quantity')
          expect(res.body[0]).to.have.property('ProductId').with.property('_id')
          expect(res.body[0]).to.have.property('ProductId').with.property('name')
          expect(res.body[0]).to.have.property('ProductId').with.property('description')
          expect(res.body[0]).to.have.property('ProductId').with.property('category')
          expect(res.body[0]).to.have.property('ProductId').with.property('price')
          expect(res.body[0]).to.have.property('ProductId').with.property('stock')
          expect(res.body[0]).to.have.property('ProductId').with.property('imageUrl')
          done()
        })
    })

    it('Should return status 200 and a message that product has been deleted)', function (done) {
      chai.request(app)
        .delete('/cart/' + this.ProductId)
        .set('access_token', this.access_token)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('msg').to.equal('This product deleted successfully')
          done()
        })
    })
  })
})
