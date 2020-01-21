const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')
const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


chai.use(chaiHttp)
let access_token_normal = null
let access_token_admin = null
describe('product routing', function() {
    describe('/products', function() {
        before(function(done) { // ADMIN
            User.findOne({email: 'agung@mail.com'})
                .then(data => {
                    if (data) {
                        if(bcrypt.compareSync('qwerty12345', data.password)) {
                            access_token_admin = jwt.sign({_id: data._id}, process.env.JWT_SECRET)
                            done()
                        } else {
                            console.log('Password is wrong')
                            done()
                        } 
                    } else {
                        done()
                    }
                })
                .catch(err => {
                    console.log(err)
                    done(err)
                })
        })
        before(function(done) { // NON-ADMIN
            User.findOne({email: 'leroy@mail.com'})
                .then(data => {
                    if (data) {
                        if(bcrypt.compareSync('qwerty12345', data.password)) {
                            access_token_normal = jwt.sign({_id: data._id}, process.env.JWT_SECRET)
                            done()
                        } else {
                            console.log('Password is wrong')
                            done()
                        } 
                    } else {
                        done()
                    }
                })
                .catch(err => {
                    console.log(err)
                    done(err)
                })
        })
        it('should have status 200 if user everything is valid and returns product data', function(done) {
            chai.request(app)
                .post('/products')
                .send({
                    name: "Panasonic AC",
                    description: "good and cheap",
                    category: "Electronics",
                    price: 2500000,
                    featured_image: null,
                    stocks: 40
                })
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message').to.equal('jwt must be provided')
                    done()
                })
        })
        it('should have status 400 if user has not logged in yet', function(done) {
            chai.request(app)
                .post('/products')
                .send({
                    name: "Panasonic AC",
                    description: "good and cheap",
                    category: "Electronics",
                    price: 2500000,
                    featured_image: null,
                    stocks: 40
                })
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res.body).to.have.property('message').to.equal('jwt must be provided')
                    done()
                })
        })
        it('should have status 401 if user is not admin', function(done) {
            chai.request(app)
                .post('/products')
                .set('access_token', access_token_normal)
                .send({
                    name: "Panasonic AC",
                    description: "good and cheap",
                    category: "Electronics",
                    price: 2500000,
                    featured_image: null,
                    stocks: 40
                })
                .end((err, res) => {
                    expect(res).to.have.status(401)
                    expect(res.body).to.have.property('message').to.equal("User is not authorized to perform that action")
                    done()
                })
        })
        it('should have status 201 and return new product data (_id, name, description, price, featured_image, stocks) if user is Admin', function(done) {
            chai.request(app)
                .post('/products/')
                .set('access_token', access_token_admin)
                .send({
                    name: "Panasonic AC",
                    description: "good and cheap",
                    price: 2500000,
                    category: "Electronics",
                    featured_image: null,
                    stocks: 40
                })
                .end((err, res) => {
                    expect(res).to.have.status(201)
                    expect(res.body).to.have.property('name').to.equal('Panasonic AC')
                    expect(res.body).to.have.property('description').to.equal('good and cheap')
                    expect(res.body).to.have.property('price').to.equal(2500000)
                    expect(res.body).to.have.property('featured_image').to.equal('http://cdn.onlinewebfonts.com/svg/img_519534.png')
                    expect(res.body).to.have.property('stocks').to.equal(40)
                    done()
                })
        })
        it('should have status 400 and return validation error if either name, description, price or stocks is empty', function(done) {
            chai.request(app)
                .post('/products')
                .set('access_token', access_token_admin)
                .send({
                    name: "",
                    description: "good and cheap",
                    price: 2500000,
                    category: "Electronics",
                    featured_image: null,
                    stocks: 40
                })
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res.body.errors).to.be.an('array')
                    expect(res.body.message).to.equal('Validation Error')
                    done()
                })
        })
        it('should have status 400 and return validation error if either stocks or price fo not fulfill minimum value', function(done) {
            chai.request(app)
                .post('/products')
                .set('access_token', access_token_admin)
                .send({
                    name: "Panasonic AC",
                    description: "good and cheap",
                    price: 2,
                    featured_image: null,
                    category: "Electronics",
                    stocks: 40
                })
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res.body.errors).to.be.an('array')
                    expect(res.body.message).to.equal('Validation Error')
                    done()
                })
        })
        it('should have status 400 and return validation error if a greater amount of the product is bought than its available stocks', function(done) {
            chai.request(app)
                .put('/products/5e26958fc15fc34098cd9173')
                .set('access_token', access_token_admin)
                .send({
                    name: "Panasonic AC",
                    description: "good but not cheap",
                    price: 2500000,
                    featured_image: null,
                    category: "Electronics",
                    stocks: -1
                })
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res.body.errors).to.be.an('array')
                    expect(res.body.message).to.equal('Validation Error')
                    done()
                })
        })
        it('should have status 200 when update process is valid, returning pre-update values', function(done) {
            chai.request(app)
                .put('/products/5e267fbb2a441f07a049e5c2')
                .set('access_token', access_token_admin)
                .send({
                    name: "Panasonic AC",
                    description: "good but not cheap",
                    price: 2500000,
                    category: "Electronics",
                    featured_image: null,
                    stocks: 10
                })
                .end((err, res) => {
                    console.log(res.body)
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    done()
                })
        })
        it('should have status 200 and return array of products', function(done) {
            chai.request(app)
                .get('/products')
                .set('access_token', access_token_normal)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('array')
                    done()
                })
        })
        it('should have status 200 on valid & successful deletion and return deleted object', function(done) {
            chai.request(app)
                .delete('/products/5e267fbb2a441f07a049e5c2')
                .set('access_token', access_token_admin)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('name').to.equal('Panasonic AC')
                    expect(res.body).to.have.property('description').to.equal('good but not cheap')
                    expect(res.body).to.have.property('price').to.equal(2500000)
                    expect(res.body).to.have.property('featured_image').to.equal('http://cdn.onlinewebfonts.com/svg/img_519534.png')
                    expect(res.body).to.have.property('stocks').to.equal(10)
                    done()
                })
        })
    })
})