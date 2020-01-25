const chai = require('chai')
const expect = chai.expect  
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/usermodel')
chai.use(chaiHttp)
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

describe('User Routes', function () {
    describe('/users/register', function() {
        // after(function(done) {
        //     User.deleteMany()
        //       .then(_ => {
        //         done()
        //       })
        //       .catch(err => {
        //         done(err)
        //       })
        // })
        // it ("should have status 201 and return message:  'Registration Successful!'",  function(done){
        //     chai.request(app)
        //         .post('/users/register')
        //         .send({
        //             username: 'baby',
        //             email: 'baby@gmail.com',
        //             password: '12345678'
        //         })
        //         .end((err,res) => {
        //             expect(err).to.be.null
        //             expect(res).to.have.status(201)
        //             expect(res.body).to.have.property('message').to.equal('Registration Successful!')
        //             done()
        //         })
        // })

        it('should have status 400 and return error validation if email is invalid', function(done) {
            chai.request(app)
              .post('/users/register')
              .send({
                email: 'gmail.com',
                password: '11111111'
              })
              .end((err, res) => {
                expect(res).to.have.status(400)
                expect(res.body).to.have.own.property('errors').to.be.an('array')
                expect(res.body.errors[0]).to.equal('Invalid Email Format')
                expect(res.body).to.have.own.property('msg').to.equal('Validation Error')
                done()
                })
        })

        it('should have status 400 and return error validation if email is not filled', function(done) {
            chai.request(app)
              .post('/users/register')
              .send({
                password: '11111111'
              })
              .end((err, res) => {
                expect(res).to.have.status(400)
                expect(res.body).to.have.own.property('errors').to.be.an('array')
                expect(res.body.errors[0]).to.equal('Email address is required')
                expect(res.body).to.have.own.property('msg').to.equal('Validation Error')
                done()
                })
        })
        it('should have status 400 and return error validation if password length < 8', function(done) {
            chai.request(app)
              .post('/users/register')
              .send({
                email: 'vaniairnanda@gmail.com',
                password: '111'
              })
              .end((err, res) => {
                expect(res).to.have.status(400)
                expect(res.body).to.have.own.property('errors').to.be.an('array')
                expect(res.body.errors[0]).to.equal('Password minimum length is 8')
                expect(res.body).to.have.own.property('msg').to.equal('Validation Error')
                done()
                })
        })
        it('should have status 400 and return error validation email is a duplicate', function(done) {
            chai.request(app)
              .post('/users/register')
              .send({
                email: 'vaniairnanda@gmail.com',
                password: '11111111'
              })
              .end((err, res) => {
                expect(res).to.have.status(400)
                expect(res.body).to.have.own.property('errors').to.be.an('array')
                expect(res.body.errors[0]).to.equal('Validator failed for path `email` with value `vaniairnanda@gmail.com`')
                expect(res.body).to.have.own.property('msg').to.equal('Validation Error')
                done()
                })
        })
    })


    describe('/users/login', function(){
        it ('should return object access_token', function(done){
            chai.request(app)
                .post('/users/login')   
                .send({
                    email: 'newbaby@gmail.com',
                    password: '12345678'

                })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res.body).to.have.own.property('access_token')
                    expect(res).to.have.status(200)
                    done()
                })

        })
        it ('should return 400 message: Username/Password wrong', function(done){
            chai.request(app)
                .post('/users/login')   
                .send({
                    email: 'newbaby@gmail.com',
                    password: '12678'

                })
                .end((err, res) => {
                    console.log(res.body)
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.own.property('error').to.equal('Username/password wrong')
                    done()
                })

        })
        it ('should return 400 message: Username/Password wrong', function(done){
            chai.request(app)
                .post('/users/login')   
                .send({
                    email: 'newbaby@gmail.com',
                    password: '12678'

                })
                .end((err, res) => {
                    console.log(res.body)
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.own.property('error').to.equal('Username/password wrong')
                    done()
                })

        })
    })

    describe('/users/addCart', function () {
      let access_token
      before(function(done) {
        User.findOne({email : 'newbaby@gmail.com'}) 
        .then(user => {
            if (user) {
                var checkPassword = bcrypt.compareSync('12345678', user.password)
                if (checkPassword) {
                    var access_tokenOld = jwt.sign({ _id: user._id}, process.env.SECRET)
                    access_token = access_tokenOld
                    done()
                } else {
                    console.log('password mismatched1')
                    done()
                }
            } else {
                console.log('user does not exist')
                done()
            }
        })
        .catch(err => {
            done(err)
        })
      })
      it ('should return status 200 and message `Product successfully added`', function(done) {
        chai.request(app)
            .post('/users/cart')
            .set('access_token', `${access_token}`)
            .send({
              product: '5e265fd6b1b0e31c79f8ffb9'
            })
            .end((err, res) => {
              expect(err).to.be.null
              expect(res).to.have.status(200)
              expect(res.body).to.have.property('message')
              done()
          })
      })

      it ('should return status 401 and message `You are not authenticated, please log in`', function(done) {
        chai.request(app)
            .post('/users/cart')
            .send({
              product: '5e265fd6b1b0e31c79f8ffb9'
            })
            .end((err, res) => {
              expect(res).to.have.status(401)
              console.log(res.body)
              expect(res.body).to.have.property('message').to.equal('You are not authenticated, please log in')
              done()
          })
      })
    })
})