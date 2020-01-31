const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/userModel')

chai.use(chaiHttp)

describe(`User routing`, () => {

   describe(`register`, () => {
      // <================= dibawah ini <adala  hooks =================>
      after(function (done) {
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
      it(`should have status 201 and return new User Data (name, email, _id)`, (done) => {
         chai.request(app)
            .post('/users/register')
            .send({
               name: `dummy`,
               email: `dummy@dummy.com`,
               password: `12345`,
               admin: true
            })
            .end((err, res) => {
               console.log(res.body, `haloooooooooooooooooooooo`);
               
               expect(err).to.be.null
               expect(res).to.have.status(201)
               expect(res.body).to.have.property('name').to.equal(`dummy`)
               expect(res.body).to.have.property('email').to.equal('dummy@dummy.com')
               expect(res.body).to.have.property('_id')
               done()
            })
      })
      // =========== FAILED ================
      it(`should have status 400 and return error validation if email is already used`, (done) => {
         chai.request(app)
            .post('/users/register')
            .send({
               name: `dummy`,
               email: `dummy@dummy.com`,
               password: `12345`,
               admin: true
            })
            .end((err, res) => {
               expect(err).to.be.null
               expect(res).to.have.status(400)
               expect(res.body).to.have.property('msg').to.equal(`Email already used`)
               done()
            })
      })
      it(`should have status 400 and return error validation if email is invalid`, (done) => {
         chai.request(app)
            .post('/users/register')
            .send({
               name: `dummy`,
               email: 'dummy.com',
               password: '12345'
            })
            .end((err, res) => {
               expect(err).to.be.null
               expect(res).to.have.status(400)
               expect(res.body).to.have.own.property('msg').to.equal('Validation Error')
               expect(res.body).to.have.property('error').to.equal('User validation failed: email: Invalid Email Format')
               done()
            })
      })
      it(`should have status 400 and return error validation if password length < 5`, (done) => {
         chai.request(app)
            .post('/users/register')
            .send({
               name: `dummy`,
               email: 'dumdum@dummy.com',
               password: '1'
            })
            .end((err, res) => {
               expect(err).to.be.null
               expect(res).to.have.status(400)
               expect(res.body).to.have.property('msg').to.equal('Validation Error')
               expect(res.body).to.have.property('error').to.equal('User validation failed: password: password minimum is 5')
               done()
            })
      })
   })


   describe(`login`, () => {
      // <================= dibawah ini adalah  hooks =================>
      before(function (done) {
         let newData = {
            name: `dummy`,
            email: `dummy@dummy.com`,
            password: `12345`
         }
         User.create(newData)
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
      it(`should have status 200 and return new User Data (name, email, token, _id)`, (done) => {
         chai.request(app)
            .post('/users/login')
            .send({
               email: `dummy@dummy.com`,
               password: `12345`,
            })
            .end((err, res) => {
               expect(err).to.be.null
               expect(res).to.have.status(200)
               expect(res.body).to.have.property('name').to.equal(`dummy`)
               expect(res.body).to.have.property('email').to.equal('dummy@dummy.com')
               expect(res.body).to.have.property('userId')
               expect(res.body).to.have.property('token')
               done()
            })
      })

      // ============ FAILED ================
      it(`should have status 404 and return validation that his email / password is wrong`, (done) => {
         chai.request(app)
            .post('/users/login')
            .send({
               email: `dummy@`,
               password: `12345`,
            })
            .end((err, res) => {
               // console.log(err);
               expect(err).to.be.null
               expect(res).to.have.status(404)
               expect(res.body).to.have.property('msg').to.equal('email / password wrong')
               done()
            })
      })

      it(`should have status 404 and return validation that his email / password is wrong`, (done) => {
         chai.request(app)
            .post('/users/login')
            .send({
               email: `dummy@dummy.com`,
               password: `15`,
            })
            .end((err, res) => {
               // console.log(err);
               expect(err).to.be.null
               expect(res).to.have.status(404)
               expect(res.body).to.have.property('msg').to.equal('email / password wrong')
               done()
            })
      })
   })

   describe(`update cart`, () => {
      // ===================HOOKS==================================
   })
})