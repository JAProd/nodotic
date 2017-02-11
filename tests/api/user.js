"use strict";
let User = require('../../app/models/user');
let UserService = require('../../app/services/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);

describe('User', () => {
    var testUser;
    var token;
    before((done) => {
        //on vide les comptes utilisateur, on crée le user de test et on le connecte
        User.remove({}, function () { 
            UserService.create({'name' : 'testUser', 'email' : 'test@user.lan', 'password' : 'abcd1234'}).then(user => {
                testUser = user;
                chai.request(server).post('/login').send({ 'email': testUser.email, 'password': 'abcd1234' }).end((err, res) => {
                     var result = JSON.parse(res.text);
                     token = result.token;
                    done();
                })
            });
        });
    });
    describe('GET /user/:id', () => {
        
        it('should return the current user with the id "me"', (done) => {
            chai.request(server).get('/user/me').set('Authorization', 'Bearer ' + token).end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("_id", testUser._id.toString());
                res.body.should.have.property("email", testUser.email);
                res.body.should.have.property("name", testUser.name);
                done();
            });
        });
        it('should return the correct user with its id', (done) => {
           chai.request(server).get('/user/' + testUser._id).set('Authorization', 'Bearer ' + token).end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("_id", testUser._id.toString());
                res.body.should.have.property("email", testUser.email);
                res.body.should.have.property("name", testUser.name);
                done();
            });
        });
    });
});
