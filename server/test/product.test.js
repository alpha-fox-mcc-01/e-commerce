const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');
const { Product } = require('../models');

chai.use(chaiHttp);

describe.only('Product Routing', function() {
  describe('/product', function() {

    // Case add product
    it.only('should have status 201 and return new Product data (_id, name, description, image, price, stock)', function(done) {
      chai.request(app)
        .post('/product')
        .set({
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI1Y2JlMTg5NjJiOTRmNWNiOTNkNGUiLCJpYXQiOjE1Nzk1MzU1ODh9.rlKG4YHuTe6M4xjq_VSurj26TxoUcO0YhpVbm8aihKg'
        })
        .send({
          name: 'jam tangan',
          description: 'Barang untuk menunjukan waktu',
          image: 'https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg',
          price: 10000,
          stock: 1
        })
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('description');
          expect(res.body).to.have.property('image');
          expect(res.body).to.have.property('price');
          expect(res.body).to.have.property('stock');
          done();
        })
    })

    // Case stock below 1
    it('should have status 400 and return error validation if stock < 1', function(done) {
      chai.request(app)
        .post('/product')
        .send({
          name: 'jam tangan',
          description: 'Barang untuk menunjukan waktu',
          image: 'https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg',
          price: 10000,
          stock: -1
        })
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.own.property('msg').to.equal('Validation Error');
          expect(res.body).to.have.own.property('errors').to.be.an('array');
          expect(res.body.errors[0]).to.equal('Minimum stock is 1');
          done();
        })
    })

    // Case price below 1000
    it('should have status 400 and return error validation if stock < 1', function(done) {
      chai.request(app)
        .post('/product')
        .send({
          name: 'jam tangan',
          description: 'Barang untuk menunjukan waktu',
          image: 'https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg',
          price: 500,
          stock: 1
        })
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.own.property('msg').to.equal('Validation Error');
          expect(res.body).to.have.own.property('errors').to.be.an('array');
          expect(res.body.errors[0]).to.equal('Minimum price is 1.000');
          done();
        })
    })

    it('should have status 400 and return error validation if required field left empty', function(done) {
      chai.request(app)
        .post('/product')
        .send({
          name: '',
          description: '',
          image: 'https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg',
          price: null,
          stock: null
        })
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.own.property('msg').to.equal('Validation Error');
          expect(res.body).to.have.own.property('errors').to.be.an('array');
          expect(res.body.errors).to.include('Product name is required');
          expect(res.body.errors).to.include('Description is required');
          expect(res.body.errors).to.include('Product price is required');
          expect(res.body.errors).to.include('Product stock is required');
          done();
        })
    })

    it('should have status 200 and return all Products data', function(done) {
      chai.request(app)
        .get('/product')
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.be.an('object');
          done();
        })
    })

    
  })

  describe('/product/:id', function() {

    // Case update a product successfully
    it('should have status 201 and return message product updated successfully', function(done) {
      chai.request(app)
      .put('/product/5e25ab717bae654bcb59864e')
      .send({
        name: 'jam dinding',
        description: 'Barang untuk menunjukan waktu di dinding',
        image: 'https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg',
        price: 20000,
        stock: 5
      })
      .end((err, res) => {
        console.log(res.body);
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body.msg).to.equal('Product updated successfully');
        done();
      })
    })

    // Case delete a product successfully
    it('should have status 200 and return message product deleted successfully', function(done) {
      chai.request(app)
        .delete('/product/5e25c6fc062fe04d56446694')
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.msg).to.equal('Product deleted successfully');
          done();
        })
    })

    // Case delete product that doesn't exist
    it.only('should have status 400 and return error bad request if product does not exist', function(done) {
      chai.request(app)
        .delete('/product/5e25c6fc062fe04d56446694')
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.own.property('msg').to.equal("Product doesn't exist");
          done();
        })
    })
  })
  
    
  
})