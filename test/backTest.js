process.env.NODE_ENV = 'test';
const mongoose = require('mongoose'),
      Todo = require('../models/todo.js'),
      chai = require('chai'),
      chaiHttp = require('chai-http'),
      server = require('../app.js'),
      should = chai.should();//analogous to expect()

chai.use(chaiHttp);

describe('Testing all RESTFULL routes for CRUD on to-dos', () => {

  Todo.deleteMany({}, err =>{});

  let createdTodoId;

  describe('Testing POST method on /todos', () => {
      it('it should not POST a to-do with missing fields', (done) => {
          let todo = {
              completed: false
          };
          chai.request(server).post('/todos').send(todo).end((err, res) => {
              res.should.have.status(333);
              done();
          });
      });

      it('it should POST a to-do ', (done) => {
          let todo = {
              text: "Create tests for the api",
              completed: false,
              added: Date.now().toString(),
          }
          chai.request(server).post('/todos').send(todo).end((err, res) => {

              res.should.have.status(200);
              res.body.should.be.a('array');
              createdTodoId = res.body[0]._id;
              done();
          });
      });
  });
  describe('Testing GET method on route /todos and /todos/id', () => {
      it('it should fetch all to-dos', (done) => {
        chai.request(server).get('/todos').end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
        });
      });
      it('it should fetch a specific to-do ', (done) => {
          chai.request(server).get('/todos/'+createdTodoId).end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('text');
              res.body.should.have.property('completed');
              res.body.should.have.property('added');
              done();
          });
      });
  });
  describe('Testing PUT method on route todos/id', () => {
    it('it should update a to-do', (done) => {
        let todo = {
            text: 'done with old to-do',
            completed: true,
        }

        chai.request(server).put('/todos/'+createdTodoId).send(todo).end((err, res) => {
            res.should.have.status(200);
            res.body[0].text.should.equal('done with old to-do');
            res.body[0].should.have.property('completed');
            res.body[0].should.have.property('added');
            done();
        });
    });
    it('it should not update a to-do with missing fields', (done) => {
        let todo = {
            completed: true,
        }
        chai.request(server).put('/todos/'+createdTodoId).send(todo).end((err, res) => {
            res.should.have.status(333);
            done();
        });
    });
  });
  describe('Testing DELETE method on route /todos/id', () => {
    it('it should remove a specific to-do', (done) => {
        let todo = {
            text: 'done with old to-do',
            completed: true,
        }
        chai.request(server).delete('/todos/'+createdTodoId).end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
        });
    });
  });


});
