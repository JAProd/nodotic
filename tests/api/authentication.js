"use strict";
let User = require('../../app/models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Authentication', () => {
    describe('POST /register', () => {
        before((done) => {
            User.remove({}, function () { done(); });
        });
        it('should return an error with an empty body', (done) => {
            chai.request(server).post('/register').end((err, res) => {
                res.should.have.status(409);
                done();
            });
        });
        it('should return a validation error with non valid user infos', (done) => {
            chai.request(server).post('/register').send({ 'name': 'a', 'email': 'test@test.local', 'password': 'abcde' }).end((err, res) => {
                res.status.should.be.equal(409);
                //faulty name
                res.body.should.have.deep.property('errors.name.kind', 'minlength');
                //faulty email
                res.body.should.have.deep.property('errors.email.kind', 'regexp');
                //faulty password
                res.body.should.have.deep.property('errors.password.kind', 'minlength');
                done();
            });
        });
        it('should return the user infos on a success', (done) => {
            chai.request(server).post('/register').send({ 'name': 'test', 'email': 'test@test.loc', 'password': 'abcde123' }).end((err, res) => {
                res.status.should.be.equal(201);
                res.body.should.not.have.property('passwordHash');
                res.body.should.not.have.property('salt');
                res.body.should.have.property('email');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                res.body.email.should.equal('test@test.loc');
                res.body.name.should.equal('test');
                res.body._id.should.not.be.empty;
                done();
            });
        });
        it('should return a validation error with an already taken email', (done) => {
            chai.request(server).post('/register').send({ 'name': 'test', 'email': 'test@test.loc', 'password': 'abcde123' }).end((err, res) => {
                res.status.should.be.equal(409);
                res.body.should.have.deep.property('errors.email.kind', 'unique');
                done();
            });
        });
    });
    describe("POST /login", () => {
        before((done) => {
            User.remove({}, function () { done(); });
        });
        it('should not give a token to an unknown user', (done) => {
            chai.request(server).post('/login').send({ 'email': 'unknown@user.loc', 'password': 'abcde123' }).end((err, res) => {
                res.status.should.be.equal(401);
                res.body.should.not.have.property('token');
                done();
            });
        });
        it('should not give a token with a wrong password', (done) => {
            chai.request(server).post('/register').send({ 'name': 'test', 'email': 'test@test.loc', 'password': 'abcde123' }).end((err, res) => {
                res.status.should.be.equal(201);
                chai.request(server).post('/login').send({ 'email': 'test@test.loc', 'password': 'abcde124' }).end((err, res) => {
                    res.status.should.be.equal(401);
                    res.body.should.not.have.property('token');
                    done();
                });
            });
        });
        it('should give a token with the right password', (done) => {
            chai.request(server).post('/login').send({ 'email': 'test@test.loc', 'password': 'abcde123' }).end((err, res) => {
                res.status.should.be.equal(200);
                res.body.should.have.property('token');
                done();
            });
        });
    });
});
