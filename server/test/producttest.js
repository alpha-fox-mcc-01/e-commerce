const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI5NDBmYjM0NzkwNzNjNThjMTBiOGMiLCJpYXQiOjE1Nzk3NjE5MTV9.M4EKxlchCk-B-cBakwF4tycGmCpojMiFB4uLCA8pAjY'

describe('product routing', function(){
    describe('/product', function(){

        it('has to have status of 400 and return error access_token not found', function(done){
            chai.request(app)
              .post('/product/add')
              .send({
                  name: 'sabun',
                  stock: 5,
                  desc:'tikus makan sabun',
                  price:200
              })
              .end((err, res)=>{
  
                  console.log(res.body, 'masuk kesini');
                  
                expect(res).to.have.status(400)
                expect(res.body).to.have.own.property('msg').to.equal('Access token not found')
                done()
              })
          })

        it('has to have status of 200 and return new product data(_id, name, stock, desc)', function(done){
          chai.request(app)
            .post('/product/add')
            .send({
                name: 'sabun',
                stock: 5,
                desc:'tikus makan sabun',
                price:2000
            })
            .set('access_token', 'token')
            .end((err, res)=>{

                console.log(res.body, '{}{}{}}{}');
                
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.own.property('name')
                expect(res.body).to.have.own.property('stock')
                expect(res.body).to.have.own.property('desc')
                expect(res.body).to.have.own.property('price')
                done()
            })
        })

        it('has to have status of 400 and return error price is less than minimum price', function(done){
            chai.request(app)
              .post('/product/add')
              .send({
                  name: 'sabun',
                  stock: 5,
                  desc:'tikus makan sabun',
                  price:200
              })
              .end((err, res)=>{
  
                  console.log(res.body, 'check price');
                  
                expect(res).to.have.status(400)
                expect(res.body).to.have.own.property('errors').to.be.an('array')
                expect(res.body.errors[0]).to.equal('price is less than 1000' )
                expect(res.body).to.have.own.property('msg').to.equal('Validation Error')
                done()
              })
          })

          it('has to have status of 400 and return error stock is less than minimum price', function(done){
            chai.request(app)
              .post('/product/add')
              .send({
                  name: 'sabun',
                  stock: 0,
                  desc:'tikus makan sabun',
                  price:2000
              })
              .end((err, res)=>{
  
                  console.log(res.body, 'check stock');
                  
                expect(res).to.have.status(400)
                expect(res.body).to.have.own.property('errors').to.be.an('array')
                expect(res.body.errors[0]).to.equal('stock is less than 1' )
                expect(res.body).to.have.own.property('msg').to.equal('Validation Error')
                done()
              })
          })

          it('has to have status of 400 and return error name cannot be empty', function(done){
            chai.request(app)
              .post('/product/add')
              .send({
                  name: '',
                  stock: 0,
                  desc:'tikus makan sabun',
                  price:2000
              })
              .end((err, res)=>{
  
                  console.log(res.body, 'check name');
                  
                expect(res).to.have.status(400)
                expect(res.body).to.have.own.property('errors').to.be.an('array')
                expect(res.body.errors[0]).to.equal('name cannot be empty' )
                expect(res.body).to.have.own.property('msg').to.equal('Validation Error')
                done()
              })
          })

          

    })

    describe('/product/delete/:id', function(){
        it('has to have status of 200 and return object with property deletedcount: 1', function(done){
            chai.request(app)
              .delete('/product/delete/5e269109b307d11389ac55cb')
              .end((err, res)=>{
  
                  console.log(res.body, 'delete');
                  
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object').to.have.own.property('deletedCount')
                done()
              })
          })

          it('has to have status of 404 and item not found', function(done){
            chai.request(app)
              .delete('/product/delete/55cbasgegsgsegsfa')
              .end((err, res)=>{
  
                  console.log(res.body, 'delete');
                  
                expect(err).to.be.null;
                expect(res).to.have.status(404);
                expect(res.body).to.have.own.property('msg').to.equal('item not found')
                done()
              })
          })
    })
})