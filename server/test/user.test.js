const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/User')

chai.use(chaiHttp)

describe('User Routing', function () {
  // hooks buat menjalankan function sebelum / sesudah testing
  describe('/register', function () {
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
    it('should have status 201 and return new User data (_id, name, email, cartLists)', function(done) {
      chai.request(app)
        .post('/user/register')
        .send({
          name: 'master',
          email: 'd@mail.com',
          password: '123456789'
        })
        .end((err, res) => {
          console.log(res.body)
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('email').to.equal('d@mail.com')
          expect(res.body).to.have.property('name').to.equal('master')
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property('cartLists')
          expect(res.body).to.have.property('token')
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
          expect(res).to.have.status(400)
          expect(res.body).to.have.own.property('errors').to.be.an('array')
          expect(res.body.errors[0]).to.equal('Invalid Email Format')
          expect(res.body).to.have.own.property('msg').to.equal('Validation Error')
          done()
        })
    })

    it('should have status 400 and return error validation if password length < 7', function (done) {
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
          expect(res.body.errors[0]).to.equal('Password minimum length is 7')
          done()
        })
    })

  })

  describe('/login', function() {
    beforeEach(function(done) {
      User.create({
        name: 'master',
        email: 'naf@naf.id',
        password: 'mantapjiwa123'
      })
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

    it('should have status 200 and return User data (_id, name, email, cartLists)', function(done) {
      chai.request(app)
        .post('/user/login')
        .send({
          email: 'naf@naf.id',
          password: 'mantapjiwa123'
        })
        .end((err, res) => {
          console.log(res.body)
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('email').to.equal('naf@naf.id')
          expect(res.body).to.have.property('name').to.equal('master')
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property('cartLists')
          expect(res.body).to.have.property('token')
          done()
        })
    })

    it('should have status 400 and return error if email is wrong', function(done) {
      chai.request(app)
        .post('/user/login')
        .send({
          email: 'naf@dmail.com',
          password: 'mantapjiwa123'
        })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body.error).to.equal('Username / Password is wrong')
          expect(res.body).to.have.own.property('msg').to.equal('Input Wrong')
          done()
        })
    })

    it('should have status 400 and return error if password is wrong', function(done) {
      chai.request(app)
        .post('/user/login')
        .send({
          email: 'naf@naf.id',
          password: 'mantapjiwa12'
        })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(400)
          expect(res.body.error).to.equal('Username / Password is wrong')
          expect(res.body).to.have.own.property('msg').to.equal('Input Wrong')
          done()
        })
    })
  })
})


