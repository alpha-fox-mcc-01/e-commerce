const chai = require('chai')
const expect = chai.expect  
const chaiHttp = require('chai-http')
const app = require('../app')
const User = require('../models/usermodel')
chai.use(chaiHttp)

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
})