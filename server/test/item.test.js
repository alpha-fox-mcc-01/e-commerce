const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const Item = require('../models/itemModel')


chai.use(chaiHttp)

describe(`Item routing`, () => {

   describe(`create`, () => {
      // <================= dibawah ini <adala  hooks =================>
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
      it (`should have status 201 and return new Item data (name, description, price, stock)`, (done) => {
         chai.request(app)
            .post('/items')
            .send({
               name : `sarung`,
               description : `sarung ini bekas punya saya`,
               price : 5000,
               stock : 5
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
   })
})