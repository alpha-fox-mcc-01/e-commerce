const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const Item = require('../models/itemModel')
const User = require('../models/userModel')


chai.use(chaiHttp)

describe(`Item routing`, () => {

   describe(`create`, () => {
      // <================= dibawah ini adalah hooks =================>
      after(function (done) {
         Item.deleteMany()
            .then(_ => {
               done()
            })
            .catch(err => {
               done(err)
            })
      })
      // <=== dibawah ini adalah condition testing ===>
      // ============ SUCCESS ================
      it(`should have status 201 and return new Item data (name, description, price, stock)`, (done) => {
         chai.request(app)
            .post('/items')
            .send({
               name: `sarung`,
               description: `sarung ini bekas punya saya`,
               price: 5000,
               stock: 5
            })
            .end((err, res) => {

               expect(err).to.be.null
               expect(res).to.have.status(201)
               expect(res.body).to.have.property('_id')
               expect(res.body).to.have.property('name').to.equal(`sarung`)
               expect(res.body).to.have.property('description').to.equal(`sarung ini bekas punya saya`)
               expect(res.body).to.have.property('price').to.equal(5000)
               expect(res.body).to.have.property('stock').to.equal(5)
               done()
            })
      })
      // ============ FAILED ================
      it(`should have status 400 and return error validation if "name" field required to be filled`, (done) => {
         chai.request(app)
            .post('/items')
            .send({
               description: `sarung ini bekas punya saya`,
               price: 5000,
               stock: 5
            })
            .end((err, res) => {

               // console.log(res.body, `ini di tesssttttttttttttttttt`);

               expect(err).to.be.null
               expect(res).to.have.status(400)
               expect(res.body).to.have.property('msg').to.equal('Validation Error')
               expect(res.body).to.have.property('error').to.equal('Item validation failed: name: Path `name` is required.')
               done()
            })
      })

      it(`should have status 400 and return error validation if 'price' field required to be filled`, (done) => {
         chai.request(app)
            .post('/items')
            .send({
               name: `sarung`,
               description: `sarung ini bekas punya saya`,

               stock: 5
            })
            .end((err, res) => {
               // console.log(res.body, `ini di tesssttttttttttttttttt`);
               expect(err).to.be.null
               expect(res).to.have.status(400)
               expect(res.body).to.have.property('msg').to.equal('Validation Error')
               expect(res.body).to.have.property('error').to.equal('Item validation failed: price: Path `price` is required.')
               done()
            })
      })

      it(`should have status 400 and return error validation if 'price' field required to be filled`, (done) => {
         chai.request(app)
            .post('/items')
            .send({
               name: `sarung`,
               description: `sarung ini bekas punya saya`,
               price: 5000,

            })
            .end((err, res) => {

               // console.log(res.body, `ini di tesssttttttttttttttttt`);

               expect(err).to.be.null
               expect(res).to.have.status(400)
               expect(res.body).to.have.property('msg').to.equal('Validation Error')
               expect(res.body).to.have.property('error').to.equal('Item validation failed: stock: Path `stock` is required.')
               done()
            })
      })
   })

   describe(`read all data`, () => {
      // <================= dibawah ini <adala  hooks =================>
      before(function (done) {
         let newData = {
            name: `sarung`,
            description: `sarung ini bekas punya saya`,
            price: 5000,
            stock: 5
         }
         Item.create(newData)
            .then(_ => {
               done()
            })
            .catch(err => {
               done(err)
            })
      })

      after((done) => {
         Item.deleteMany()
            .then(_ => {
               done()
            })
            .catch(err => {
               done(err)
            })
      })
      // <=== dibawah ini adalah condition testing ===>
      // ============ SUCCESS ================
      it('should have status 200 and return array of data', (done) => {
         chai.request(app)
            .get('/items')
            .end((err, res) => {
               // console.log(res.body);           
               expect(err).to.be.null
               expect(res).to.have.status(200)
               expect(res.body).to.be.an('array')
               done()
            })
      })
   })

   describe.only(`read particular data`, () => {
      // ================== HOOKS =========================
      before((done) => {
         User.create({
            name : `dummy`,
            email : `dummy@dummy.com`,
            password : `12345`
         })
            .then (_ => {
               done()
            })
            .catch(err => {
               done(err)
            })
      }) 
      after((done) => {
         Item.deleteMany()
            .then(_ => {
               done()
            })
            .catch(err => {
               done(err)
            })
      })
      after((done) => {
         User.deleteMany()
            .then(_ => {
               done()
            })
            .catch(err => {
               done(err)
            })
      })
      // <=== dibawah ini adalah condition testing ===>
      // ============ SUCCESS ================
      it(`should have status 200 and should return particular item data`, (done) => {
         chai.request(app)
            .post(`/users/login`)
            .send({
               email: `dummy@dummy.com`,
               password: `12345`,
            })
            .end((err, res) => {
               console.log(res.body);
               // not done yet
               done()
            })
      })
   })

})