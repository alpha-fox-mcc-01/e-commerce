const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)

describe('User Routing', function () {
    // hooks buat menjalankan function sebelum / sesudah testing
    describe('/user/register', function () {
      beforeEach(function(done) {
        User.deleteMany()
          .then(_ => {
            done()
          })
          .catch(err => {
            done(err)
          })
      })
  
      after(function(done) {
        User.deleteMany()
          .then(_ => {
            done()
          })
          .catch(err => {
            done(err)
          })
      })
      it('should have status 201 and return new User data (_id, email)', function(done) {
        chai.request(app)
          .post('/user/register')
          .send({
            name: 'd',
            email: 'd@mail.com',
            password: '123456789'
          })
          .end((err, res) => {

            console.log(res.body)
            expect(err).to.be.null;
            expect(res).to.have.status(200)
            expect(res.body).to.have.own.property('token')
            done()
          })
      })
  
      it('should have status 400 and return error validation if email is invalid', function(done) {
        chai.request(app)
          .post('/user/register')
          .send({
            email: 'dmail.com',
            password: '12345678'
          })
          .end((err, res) => {
            expect(err).to.be.null
            console.log(res.status);
            
            expect(res).to.have.status(400)
            expect(res.body).to.have.own.property('errors').to.be.an('array')
            expect(res.body.errors[0]).to.equal('Invalid Email Format')
            expect(res.body).to.have.own.property('msg').to.equal('Validation Error')
            done()
          })
      })
  
      it('should have status 400 and return error validation if password length < 8', function (done) {
        chai.request(app)
          .post('/user/register')
          .send({
            email: 'z@mail.com',
            password: '1'
          })
          .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.have.own.property('msg').to.equal('Validation Error')
            expect(res.body).to.have.own.property('errors').to.be.an('array')
            expect(res.body.errors[0]).to.equal('Password minimum length is 8')
            done()
          })
      })

      it('has to have status 400 and return error email has taken', function (done) {
        chai.request(app)
          .post('/user/register')
          .send({
            email: 'd@mail.com',
            password: '123456789'
          })
          .end((err, res) => {
             console.log(res.body, '');
             

            expect(err).to.be.null
            expect(res).to.have.status(400)
            expect(res.body).to.have.own.property('msg').to.equal('email has taken')
            // expect(res.body).to.have.own.property('errors').to.be.an('array')
            // expect(res.body.errors[0]).to.equal('Validation Error')
            done()
          })
      })

      it('should have status 200 and return jwt token', function (done) {
        chai.request(app)
          .post('/user/login')
          .send({
            email: 'd@mail.com',
            password: '123456789'
          })
          .end((err, res) => {
            console.log(res.body);
            

            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.have.own.property('token')
            done()
          })
      })

  
      it('should have status 400 and return email/password wrong', function (done) {
        chai.request(app)
          .post('/user/login')
          .send({
            email: 'd@mail.com',
            password: '12345679'
          })
          .end((err, res) => {
            console.log(res.body, 'BODY');
            

            expect(err).to.be.null
            expect(res).to.have.status(404)
            expect(res.body).to.have.own.property('msg').to.equal('email/password wrong')

            done()
          })
      })



    })
  
  })




//   product harga, title and everything required, stock