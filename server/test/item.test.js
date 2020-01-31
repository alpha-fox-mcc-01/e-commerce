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
      before((done) => {
         User.create({
            name: `dummy`,
            email: `dummy@dummy.com`,
            password: `12345`,
            admin: true
         })
            .then(_ => {
               done()
            })
            .catch(err => {
               done(err)
            })
      })
      before((done) => {
         User.create({
            name: `dummy2`,
            email: `dummy2@dummy.com`,
            password: `12345`,
            admin: false
         })
            .then(_ => {
               done()
            })
            .catch(err => {
               done(err)
            })
      })
      after(function (done) {
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
      it(`should have status 201 and return new Item data (name, description, price, stock)`, (done) => {
         chai.request(app)
            .post('/users/login')
            .send({
               email: `dummy@dummy.com`,
               password: `12345`
            })
            .end((err, res) => {
               // console.log(res.body);
               const token = res.body.token
               chai.request(app)
                  .post('/items')
                  .send({
                     name: `sarung`,
                     description: `sarung ini bekas punya saya`,
                     price: 5000,
                     stock: 5
                  })
                  .set({ token: token })
                  .end((err, res) => {
                     // console.log(res.body);

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
      })
      // ============ FAILED ================
      it(`should have status 400 and return error validation if "name" field required to be filled`, (done) => {
         chai.request(app)
            .post('/users/login')
            .send({
               email: `dummy@dummy.com`,
               password: `12345`
            })
            .end((err, res) => {
               // console.log(res.body);
               const token = res.body.token
               chai.request(app)
                  .post('/items')
                  .send({
                     description: `sarung ini bekas punya saya`,
                     price: 5000,
                     stock: 5
                  })
                  .set({ token: token })
                  .end((err, res) => {
                     expect(err).to.be.null
                     expect(res).to.have.status(400)
                     expect(res.body).to.have.property('msg').to.equal('Validation Error')
                     expect(res.body).to.have.property('error').to.equal('Item validation failed: name: Path `name` is required.')
                     done()
                  })
            })
      })

      it(`should have status 400 and return error validation if 'price' field required to be filled`, (done) => {
         chai.request(app)
            .post('/users/login')
            .send({
               email: `dummy@dummy.com`,
               password: `12345`
            })
            .end((err, res) => {
               const token = res.body.token
               chai.request(app)
                  .post('/items')
                  .send({
                     name: `sarung`,
                     description: `sarung ini bekas punya saya`,

                     stock: 5
                  })
                  .set({ token: token })
                  .end((err, res) => {

                     expect(err).to.be.null
                     expect(res).to.have.status(400)
                     expect(res.body).to.have.property('msg').to.equal('Validation Error')
                     expect(res.body).to.have.property('error').to.equal('Item validation failed: price: Path `price` is required.')
                     done()
                  })
            })
      })

      it(`should have status 400 and return error validation if 'price' field required to be filled`, (done) => {
         chai.request(app)
            .post('/users/login')
            .send({
               email: `dummy@dummy.com`,
               password: `12345`
            })
            .end((err, res) => {
               // console.log(res.body);
               const token = res.body.token
               chai.request(app)
                  .post('/items')
                  .send({
                     name: `sarung`,
                     description: `sarung ini bekas punya saya`,
                     price: 5000,
                  })
                  .set({ token: token })
                  .end((err, res) => {

                     expect(err).to.be.null
                     expect(res).to.have.status(400)
                     expect(res.body).to.have.property('msg').to.equal('Validation Error')
                     expect(res.body).to.have.property('error').to.equal('Item validation failed: stock: Path `stock` is required.')
                     done()
                  })
            })
      })
      // ========================================================================
      // testing failed saat user bukan admin mencoba melakukan CRUD
      // ========================================================================
      it(`should have status 401 and return error validation if he's not authorized`, (done) => {
         chai.request(app)
            .post('/users/login')
            .send({
               email: `dummy2@dummy.com`,
               password: `12345`,
            })
            .end((err, res) => {
               const token = res.body.token
               chai.request(app)
                  .post('/items')
                  .send({
                     name: `sarung`,
                     description: `sarung ini bekas punya saya`,
                     price: 5000,
                     stock: 5
                  })
                  .set({ token: token })
                  .end((err, res) => {
                     // console.log(res.body);
                     expect(err).to.be.null
                     expect(res).to.have.status(401)
                     expect(res.body).to.have.property('msg').to.equal(`you're not authorized to make this request`)
                     done()
                  })
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

   describe(`read particular data`, () => {
      // ================== HOOKS =========================
      before((done) => {
         User.create({
            name: `dummy`,
            email: `dummy@dummy.com`,
            password: `12345`,
            admin: true
         })
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
            .post('/users/login')
            .send({
               email: `dummy@dummy.com`,
               password: `12345`
            })
            .end((err, res) => {
               // console.log(res.body);
               const token = res.body.token
               chai.request(app)
                  .post('/items')
                  .send({
                     name: `sarung`,
                     description: `sarung ini bekas punya saya`,
                     price: 5000,
                     stock: 5
                  })
                  .set({ token: token })
                  .end((err, res) => {
                     const id = res.body._id
                     chai.request(app)
                        .get(`/items/${id}`)
                        .end((err, res) => {
                           // console.log(res.body, `INIIIIIIIIIIIIIIIIIIIIIIIIIIIIII`);
                           expect(err).to.be.null
                           expect(res).to.have.status(200)
                           expect(res.body).to.have.property('_id').to.equal(id)
                           expect(res.body).to.have.property('name').to.equal(`sarung`)
                           expect(res.body).to.have.property('price').to.equal(5000)
                           expect(res.body).to.have.property('stock').to.equal(5)
                           done()
                        })
                  })
            })
      })
   })

   describe(`delete`, () => {
      // =======================HOOOKS===================
      before((done) => {
         User.create({
            name: `dummy`,
            email: `dummy@dummy.com`,
            password: `12345`,
            admin: true
         })
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

      it(`should have status 200 and should return something validation message and the deleted data`, (done) => {
         let token
         chai.request(app)
            .post('/users/login')
            .send({
               email: `dummy@dummy.com`,
               password: `12345`
            })
            .end((err, res) => {
               token = res.body.token

               chai.request(app)
                  .post('/items')
                  .send({
                     name: `sarung`,
                     description: `sarung ini bekas punya saya`,
                     price: 5000,
                     stock: 5
                  })
                  .set({ token: token })
                  .end((err, res) => {
                     const id = res.body._id

                     chai.request(app)
                        .delete(`/items/${id}`)
                        .set({ token: token })
                        .end((err, res) => {
                           expect(err).to.be.null
                           expect(res).to.have.status(200)
                           expect(res.body).to.have.property('msg').to.equal('deleted')
                           expect(res.body).to.have.property('data')
                           done()
                        })
                  })
            })
      })
   })

   describe('update', () => {
      // =======================HOOOKS===================
      before((done) => {
         User.create({
            name: `dummy`,
            email: `dummy@dummy.com`,
            password: `12345`,
            admin: true
         })
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

      it(`should have status 201 and should return something validation message and the updated data`, (done) => {
         let token
         chai.request(app)
            .post('/users/login')
            .send({
               email: `dummy@dummy.com`,
               password: `12345`
            })
            .end((err, res) => {
               token = res.body.token

               chai.request(app)
                  .post('/items')
                  .send({
                     name: `sarung`,
                     description: `sarung ini bekas punya saya`,
                     price: 5000,
                     stock: 5
                  })
                  .set({ token: token })
                  .end((err, res) => {
                     const id = res.body._id

                     chai.request(app)
                        .put(`/items/${id}`)
                        .send({
                           name: `sarung wadimor`,
                           description: `sarung istimewa`,
                           price: 5000000000,
                           stock: 1
                        })
                        .set({ token: token })
                        .end((err, res) => {
                           expect(err).to.be.null
                           expect(res).to.have.status(201)
                           expect(res.body).to.have.property('msg').to.equal(`updated`)
                           done()
                        })
                  })
            })
      })
   })
})