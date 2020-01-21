const chai = require('chai')
const expect = chai.expect  
const chaiHttp = require('chai-http')
const app = require('../app')
chai.use(chaiHttp)
const User = require('../models/usermodel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
let access_token
let access_token_dummy

describe('Product Routes', function() {
    describe('/products', function(){
        let email, password
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

        before(function(done) {
            User.findOne({email : 'baby@gmail.com'}) 
            .then(user => {
                if (user) {
                    var checkPassword = bcrypt.compareSync('12345678', user.password)
                    if (checkPassword) {
                        var access_tokenFake = jwt.sign({ _id: user._id}, process.env.SECRET)
                        access_token_dummy = access_tokenFake
                        done()
                    } else {
                        console.log('password mismatched2')
                        done()
                    }
                }  else {
                    console.log('user does not exist')
                    done()
                }
            })
            .catch(err => {
                done(err)
            })

        })
        

        it ('should have status 201 and return new Product data(_id, )', function(done){
            chai.request(app)
                .post('/products')
                .set('access_token', `${access_token}`)
                .send({
                    name: 'Sticker',
                    category: 'Stationery',
                    stock: 1,
                    price: 1000,
                    description: 'nice sticker, sticks forever'
                })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('result')
                    done()
                })
        })

        it ('should have status 400 and message Validation Error: Price must be a number', function(done) {
            chai.request(app)
            .post('/products')
            .set('access_token', `${access_token}`)
            .send({
                name: 'Sticker',
                category: 'Stationery',
                stock: 1,
                price: 'p',
                description: 'nice sticker, sticks forever'
            })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res.body).to.have.own.property('errors').to.be.an('array')
                done()
            })
        })

        it ('should have status 400 and message Validation Error price is required', function(done) {
            chai.request(app)
            .post('/products')
            .set('access_token', `${access_token}`)
            .send({
                name: 'Sticker',
                category: 'Stationery',
                stock: 1,
                description: 'nice sticker, sticks forever'
            })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res.body).to.have.own.property('errors').to.be.an('array')
                done()
            })
        })

        it ('should have status 400 and message validation error stock > 0', function(done){
            chai.request(app)
            .post('/products')
            .set('access_token', `${access_token}`)
            .send({
                name: 'Sticker',
                category: 'Stationery',
                stock: -1,
                price: 1000,
                description: 'nice sticker, sticks forever'
            })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res.body).to.have.own.property('errors').to.be.an('array')
                done()
            })
        })
        it ('should have status 400 and message validation error price must be >1000', function(done) {
            chai.request(app)
            .post('/products')
            .set('access_token', `${access_token}`)
            .send({
                name: 'Sticker',
                category: 'Stationery',
                stock: 1,
                price: 100,
                description: 'nice sticker, sticks forever'
            })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res.body).to.have.own.property('errors').to.be.an('array')
                done()
            })
        })
        it ('should have status 400 and return message description length < 100', function(done) {
            chai.request(app)
            .post('/products')
            .set('access_token', `${access_token}`)
            .send({
                name: 'Sticker',
                category: 'Stationery',
                stock: 1,
                price: 1000,
                description: 'GitHub is home to over 40 million developers working together to host and review code, manage projects, and build software together. ... nvm nodejs node node-js version-manager posix posix-compliant bash zsh shell nvmrc lts install. ... [Refactor] extract “get default packages” logic'
            })
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(400)
                expect(res.body).to.have.own.property('errors').to.be.an('array')
                done()
            })
        })

        it ('should have status 401 with error message You are not authorized', function(done) {
            chai.request(app)
                .post('/products')
                .set('access_token', `${access_token_dummy}`)
                .send({
                    name: 'Sticker',
                    category: 'Stationery',
                    stock: 1,
                    price: 1000,
                    description: 'nice sticker, sticks forever'
                })
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(401)
                    console.log(res.body, '<><<>')
                    expect(res.body).to.have.own.property('error').to.equal('You are not authorized to do this action')
                    done()
                })
        })

        it ('should have status 200 and return array of products', function(done) {
          chai.request(app)
              .get('/products')
              .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.own.property('result')
                done()
              })
        })

        it ('should have status 200 and return objectproduct data', function(done) {
          chai.request(app)
              .get('/products/5e265fd6b1b0e31c79f8ffb9')
              .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.own.property('result')
                done()
              })
        })

        it ('should have status 500 and return error', function(done) {
          chai.request(app)
              .get('/products/5e265fd6b1b0e31c79f')
              .end((err, res) => {
                expect(res).to.have.status(500)
                expect(res.body).to.have.own.property('msg').to.equal('Internal Server Error')
                done()
              })
        })

        
        it ('should have status 200 and return message product successully updated', function(done) {
          chai.request(app)
              .put('/products/5e265fd6b1b0e31c79f8ffb9')
              .set('access_token', `${access_token}`)
              .send({
                name: 'Mouse',
                category: 'Hardware',
                stock: 10,
                price: 10000,
                description: 'nice mouse, glides smoothly'
            })
              .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.body).to.have.own.property('message')
                done()
              })
        })

        it ('should have status 400 and return error please input stock', function(done) {
          chai.request(app)
              .put('/products/5e265fd6b1b0e31c79f8ffb9')
              .set('access_token', `${access_token}`)
              .send({
                name: 'Mouse',
                category: 'Hardware',
                price: 10000,
                description: 'nice mouse, glides smoothly'
            })
              .end((err, res) => {
                expect(res).to.have.status(400)
                expect(res.body).to.have.own.property('errors')
                done()
              })
        })

        it ('should have status 200 and return message Delete Successful', function(done) {
          chai.request(app)
              .delete('/products/5e2696b9ae7b563688da5d2d')
              .set('access_token', `${access_token}`)
              .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.own.property('message').to.equal('Delete successful')
                done()
              })
        })


    })
})