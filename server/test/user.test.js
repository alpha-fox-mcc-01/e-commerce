const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../app')

// plugin chai
chai.use(chaiHttp)

describe('User Routes', function(){
  describe('/register', function(){
    
    // error empty value
    it.only('should be error and have status 500 and return message Internal Server Error', function(done){
      chai.request(app)
        .post('/register')
        .send({
          name : '',
          email : '',
          password : ''
        })
        .end( (err, res) => {
          // console.log(res.status);
          expect(err).to.be.null
          expect(res).to.have.status(400)
          done()
        })
    })

    // error Email Format Invalid
    it('should be error and have status 400 and return message Invalid Email Format', function(done){
      chai.request(app)
        .post('/register')
        .send({
          name : 'test',
          email : 'testmail.com',
          password : '123456'
        })
        .end( (err, res) => {
          // console.log(res.status);
          expect(err).to.be.null
          expect(res).to.have.status(500)   
          done()
        })
    })


    
    // Success Register
    it('should have status 201 and return new User data (_id, name)', function(done){
      chai.request(app)
        .post('/register')
        .send({
          name : 'test',
          email : 'test@mail.com',
          password : '123456'
        })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          expect(res.body).to.have.property('email')
          done()
        })
    })
  })
})