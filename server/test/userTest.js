const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/user')

chai.use(chaiHttp)

describe('User Routing', function () {

  // HOOKS AFTER  <<= di nonaktifin dulu supaya bisa ngetes produk
  // after(function (done) {
  //   User.deleteMany()
  //     .then(() => {
  //       done()
  //     })
  //     .catch(err => {
  //       done(err)
  //     })
  // })

  describe('/register', function () {
    // HOOKS BEFORE EVERY SINGLE TESTING ==> beforeEach
    before(function (done) {
      User.deleteMany()
        .then(() => {
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    it('Should return status 201 and new user data (_id, username, email)', function (done) {
      chai.request(app)
        .post('/register')
        .send({
          username: 'ahmadahmad',
          email: 'ahmad@ahmad.com',
          password: 'ahmadahmad',
          role: 'admin'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('email').to.equal('ahmad@ahmad.com')
          expect(res.body).to.have.property('_id')
          done()
        })
    })

    it('Should return status 400 and error validation on invalid email format', function (done) {
      chai.request(app)
        .post('/register')
        .send({
          username: 'ahmadahmad',
          email: 'ahmad@google',
          password: 'ahmadahmad'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.own.property('errors').to.be.an('array');
          expect(res.body.errors[0]).to.equal('Invalid Email Format');
          expect(res.body).to.have.own.property('msg').to.equal('Validation Error');
          done()
        })
    })

    it('Should return status 400 and error validation if length of password < 10', function (done) {
      chai.request(app)
        .post('/register')
        .send({
          username: 'ahmadahmad',
          email: 'ahmad@ahmad.com',
          password: 'ahmad'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.own.property('msg').to.equal('Validation Error');
          expect(res.body).to.have.own.property('errors').to.be.an('array');
          expect(res.body.errors[0]).to.equal('Minimum length of password is 10');
          done();
        })
    })

    it('Should return status 400 and error validation if length of username < 10', function (done) {
      chai.request(app)
        .post('/register')
        .send({
          username: 'ahmad',
          email: 'ahmad@ahmad.com',
          password: 'ahmadahmad'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.own.property('msg').to.equal('Validation Error');
          expect(res.body).to.have.own.property('errors').to.be.an('array');
          expect(res.body.errors[0]).to.equal('Minimum length of username is 10');
          done();
        })
    })

    it('Should return status 400 and error message if username is null', function (done) {
      chai.request(app)
        .post('/register')
        .send({
          username: '',
          email: 'ahmad@ahmad.com',
          password: 'ahmadahmad'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.own.property('msg').to.equal('Validation Error');
          expect(res.body).to.have.own.property('errors').to.be.an('array');
          expect(res.body.errors[0]).to.equal('Please enter your username');
          done();
        })
    })

    it('Should return status 400 and error message if password is null', function (done) {
      chai.request(app)
        .post('/register')
        .send({
          username: 'ahmadahmad',
          email: 'ahmad@ahmad.com',
          password: ''
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.own.property('msg').to.equal('Validation Error');
          expect(res.body).to.have.own.property('errors').to.be.an('array');
          expect(res.body.errors[0]).to.equal('This field is absolutely required');
          done();
        })
    })

    it('Should return status 400 and error message if email is null', function (done) {
      chai.request(app)
        .post('/register')
        .send({
          username: 'ahmadahmad',
          email: '',
          password: 'ahmadahmad'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.own.property('msg').to.equal('Validation Error');
          expect(res.body).to.have.own.property('errors').to.be.an('array');
          expect(res.body.errors[0]).to.equal('Please enter your email address');
          done();
        })
    })
  })

  describe('/login', function () {
    // it.only('Should return status 200 and user token if user logged in successfully', function (done) {
    it('Should return status 200 if user logged in successfully', function (done) {
      chai.request(app)
        .post('/login')
        .send({
          email: 'ahmad@ahmad.com',
          password: 'ahmadahmad'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          // expect(res.body).to.have.own.property('token')
          expect(res.body).to.have.own.property('msg').to.equal('Login success');
          done()
        })
    })

    it('Should return status 404 and error message if email isn\'t registered', function (done) {
      chai.request(app)
        .post('/login')
        .send({
          email: 'ahmad@ahmad.co',
          password: 'ahmadahmad'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body).to.have.own.property('msg').to.equal('Email isn\'t registered');
          done()
        })
    })

    it('Should return status 403 and error message if password is incorrect', function (done) {
      chai.request(app)
        .post('/login')
        .send({
          email: 'ahmad@ahmad.com',
          password: 'ahmad'
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(403);
          expect(res.body).to.have.own.property('msg').to.equal('Invalid password');
          done()
        })
    })

    it('Should return status 403 and error message if email or password is null', function (done) {
      chai.request(app)
        .post('/login')
        .send({
          email: 'ahmad@ahmad.com',
          password: ''
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(403);
          expect(res.body).to.have.own.property('msg').to.equal('Fill the blank, please..');
          done()
        })
    })
  })
})
