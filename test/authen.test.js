'use strict'

const app = require('../server')
const chai = require('chai')
const request = require('supertest')
const expect = chai.expect

const userService= request('http://localhost:3001')
const token='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QwNCIsImVtYWlsIjoidGVzdDA0QHRlc3QuY29tIiwiaWF0IjoxNTQ0MDcxNDI2LCJleHAiOjE1NDUyODEwMjZ9.JrYbOrh0tjN2GEOy4m-kXy3en7JiYpnzK_NERcmwuwI'
const membertoken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QwNSIsImVtYWlsIjoidGVzdDVAdGVzdHQuY29tIiwiaWF0IjoxNTQ0NjA2Mzg0LCJleHAiOjE1NDU4MTU5ODR9.zVp11W0E-lhAoXoM2uNMaeSBeHUMrgXM0WyxthP1w5g'
describe('Authen API Tests', function() {

  describe('Create account ', function() { 
    it('check username and Email', function(done) { 
      let account = {
        "username": "test04",
        "email": "test04@test.com",
        "password": "abc1234"
      }
      request(app) .post('/account') .send(account) .end(function(err, res) { 
        expect(res.statusCode).to.equal(500)
        
       // console.log(res.body)
        //console.log(res.body.username.length)
        expect(res.body.message).to.equal('accounts validation failed username is already taken., email is already taken.')
        done(); 
      }); 
    }); 

    it('check username', function(done) { 
      let account = {
        "username": "test04",
        "email": "test087@test.com",
        "password": "abc1234"
      }
      request(app) .post('/account') .send(account) .end(function(err, res) { 
        expect(res.statusCode).to.equal(500)
        expect(res.body.message).to.equal('accounts validation failed username is already taken.')
        done(); 
      }); 
    }); 

    it('check Email', function(done) { 
      let account = {
        "username": "test08",
        "email": "test04@test.com",
        "password": "abc1234"
      }
      request(app) .post('/account') .send(account) .end(function(err, res) { 
        expect(res.statusCode).to.equal(500)
        expect(res.body.message).to.equal('accounts validation failed email is already taken.')
        done(); 
      }); 
    }); 

    it('check Email format', function(done) { 
      let account = {
        "username": "test08",
        "email": "test04test.com",
        "password": "abc1234"
      }
      request(app) .post('/account') .send(account) .end(function(err, res) { 
        expect(res.statusCode).to.equal(500)
        expect(res.body.message).to.equal('accounts validation failed email is invalid')
        done(); 
      }); 
    }); 

    // it('create success', function(done) { 
    //   let account = {
    //     "username": "test06",
    //     "email": "test06@test.com",
    //     "password": "abc1234"
    //   }
    //   request(app) .post('/account') .send(account) .end(function(err, res) { 
    //     expect(res.statusCode).to.equal(200)
    //     // expect(res.body.username).to.equal('test06')
    //     // expect(res.body.email).to.equal('test06@test.com')
    //     //expect(res.body.message).to.equal('accounts validation failed username is already taken., email is already taken.')
    //     done(); 
    //   }); 
    // }); 



  });

  describe('Login', function() {

    it('check wrong user', function(done) { 
      let account = {
        "username": "test08",
        "password": "abc1234"
      }
      request(app) .post('/session') .send(account) .end(function(err, res) { 
        expect(res.statusCode).to.equal(403)
        // expect(res.body.token_type).to.equal('bearer')
        // expect(res.body.access_token).to.equal(res.body.access_token)
        expect(res.body.message).to.equal('Username not found')
        done();
      }); 
    }); 

    it('check wrong password', function(done) { 
      let account = {
        "username": "test06",
        "password": "abc12345"
      }
      request(app) .post('/session') .send(account) .end(function(err, res) { 
        expect(res.statusCode).to.equal(401)
        // expect(res.body.token_type).to.equal('bearer')
        // expect(res.body.access_token).to.equal(res.body.access_token)
        expect(res.body.message).to.equal('Bad credentails')
        done();
      }); 
    });  


    it('should logged in success', function(done) { 
      let account = {
        "username": "Test06",
        "password": "abc1234"
      }
      request(app) .post('/session') .send(account) .end(function(err, res) { 
        expect(res.statusCode).to.equal(200)
        expect(res.body.token_type).to.equal('bearer')
        expect(res.body.access_token).to.equal(res.body.access_token)
        console.log(res.body.access_token)
        done();
      }); 
    }); 


  }); 
});
