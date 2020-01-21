const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');
const { User } = require('../models');

chai.use(chaiHttp);

describe.only('User Routing', function() {
  describe('/user/register', function() {
    after(function(done) {
      User.deleteMany()
        .then(_ => {
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    // Case Success Register
    it('should have status 201 and return new User data (_id, name, email)', function(done) {
      chai.request(app)
        .post('/user/register')
        .send({
          name: 'test',
          email: 'test@test.com',
          password: '12345678'
        })
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('email');
          done();
        })
    })

    // Case email is not unique
    it('should have status 400 and return error message if email is already used', function(done) {
      chai.request(app)
        .post('/user/register')
        .send({
          name: 'test',
          email: 'test@test.com',
          password: '12345678'
        })
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.own.property('msg').to.equal('Email is already used');
          done();
        })
    })

    // Case wrong email format
    it('should have status 400 and return error validation if email is invalid', function(done) {
      chai.request(app)
        .post('/user/register')
        .send({
          name: 'test',
          email: 'test.com',
          password: '12345678'
        })
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.own.property('msg').to.equal('Validation Error');
          expect(res.body).to.have.own.property('errors').to.be.an('array');
          expect(res.body.errors[0]).to.equal('Please fill a valid email address');
          done();
        })
    })

    // Case password below minimum length
    it('should have status 400 and return error validation if password length < 8', function (done) {
      chai.request(app)
        .post('/user/register')
        .send({
          name: 'test',
          email: 'test@mail.com',
          password: '1'
        })
        .end((err, res) => {
          console.log(res.body)
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.own.property('msg').to.equal('Validation Error');
          expect(res.body).to.have.own.property('errors').to.be.an('array');
          expect(res.body.errors[0]).to.equal('Password minimum length is 8');
          done()
        })
    })

    // Case name is required but no input
    it('should have status 400 and return error validation if name is required', function (done) {
      chai.request(app)
        .post('/user/register')
        .send({
          name: '',
          email: 'test@mail.com',
          password: '12345678'
        })
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.own.property('msg').to.equal('Validation Error');
          expect(res.body).to.have.own.property('errors').to.be.an('array');
          expect(res.body.errors[0]).to.equal('Name is required');
          done();
        })
    })

    // Case email is required but no input
    it('should have status 400 and return error validation if email is required', function (done) {
      chai.request(app)
        .post('/user/register')
        .send({
          name: 'test',
          email: '',
          password: '12345678'
        })
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.own.property('msg').to.equal('Validation Error');
          expect(res.body).to.have.own.property('errors').to.be.an('array');
          expect(res.body.errors[0]).to.equal('Email address is required');
          done();
        })
    })

    // Case password is required but no input
    it('should have status 400 and return error validation if password is required', function (done) {
      chai.request(app)
        .post('/user/register')
        .send({
          name: 'test',
          email: 'test@password.com',
          password: ''
        })
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.own.property('msg').to.equal('Validation Error');
          expect(res.body).to.have.own.property('errors').to.be.an('array');
          expect(res.body.errors[0]).to.equal('Password is required');
          done();
        })
    })
  })

  describe('/user/login', function() {
    before(() => {
      User.create({
        name: 'test',
        email: 'test@test.com',
        password: '12345678'
      })
        .then(user => {
          console.log(user, 'create user for login')
        })
        .catch(err => {
          console.log(err, 'before login error')
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

    // Case login return access_token
    it('should have status 200 and return access_token', function(done) {
      chai.request(app)
        .post('/user/login')
        .send({
          email: 'test@mail.com',
          password: '12345678'
        })
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('access_token').to.be.a('string');
          done();
        })
    })

    // Case wrong email
    it('should have status 400 and return error bad request if email is wrong', function(done) {
      chai.request(app)
        .post('/user/login')
        .send({
          email: 'test@mail.com',
          password: '12345678'
        })
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('msg').to.equal('Email or password is wrong');
          done();
        })
    })

    // Case wrong password
    it('should have status 400 and return error bad request if email is wrong', function(done) {
      chai.request(app)
        .post('/user/login')
        .send({
          email: 'test@test.com',
          password: '12345679'
        })
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('msg').to.equal('Email or password is wrong');
          done();
        })
    })

    // Case email is required but no input
    it('should have status 400 and return error bad request if email is wrong', function(done) {
      chai.request(app)
        .post('/user/login')
        .send({
          email: '',
          password: '12345679'
        })
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('msg').to.equal('Email address and password is required');
          done();
        })
    })

    // Case password is required but no input
    it('should have status 400 and return error bad request if email is wrong', function(done) {
      chai.request(app)
        .post('/user/login')
        .send({
          email: 'test@test.com',
          password: ''
        })
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('msg').to.equal('Email address and password is required');
          done();
        })
    })
  })
})