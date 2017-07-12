const server = require('../server/server')
const request = require('supertest');
const PORT = 3000;
const HOST = 'http://localhost:3000';
const expect = require('chai').expect;
const assert = require('chai').assert;


console.log('DB TO USE: ' ,process.env.NODE_ENV);


before(function(){
  //wipes the test DB.
  server.mongoose.connection.once('open', () => {
      server.mongoose.connection.db.dropCollection('forms', (err, result) => {
        if (err) console.log(err);
            //test uid 59669064445780750cdd4a3a
      });
  });
});

// after(function(done){
//   //doesn't work
//   server.mongoose.disconnect();
//   server.server.close(done);
//   done();
// });


describe('Route functionality', () => {

  describe('routes to static files', () => {
    describe(' GET / - initial route', () => {
      it('responds with 200 status and text/html content type', done => {
        request(HOST)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200, done);
      });
    });

    describe('GET /static/styles.css', ()=> {
      it('responds with 200 status and text/css content type', done => {
        request(HOST)
          .get('/static/styles.css')
          .expect('Content-Type', /text\/css/)
          .expect(200, done);
      });
    });

    describe('GET /build/bundle.js', ()=> {
      it('responds with 200 status and application/javascript content type', done => {
        request(HOST)
          .get('/build/bundle.js')
          .expect('Content-Type', /application\/javascript/)
          .expect(200, done);
      });
    });
  });

  describe('bad routes', ()=> {
    describe('GET', ()=> {
      it('responds with a 404 status and page to GET routes that do not exist', done => {
        request(HOST)
          .get('/badroute')
          .expect('Content-Type', /text\/html/)
          .expect(404, done);
      });
    });

    describe('POST', ()=> {
      it('responds with a 404 status and page to POST routes that do not exist', done => {
        request(HOST)
          .post('/badroute')
          .set('Content-Type', 'application/json')
          .send({})
          .expect('Content-Type', /text\/html/)
          .expect(404, done);
      });
    });
  });
});

describe('Authentication', () => {
  describe('sign in control', () => {
    it('should prevent a user from accessing /app without ssid and return a 200 status code', done => {
      request(HOST)
        .get('/api')
        .expect(200, done);
    });
    describe('cookie based access', () => {
      it('should allow a user to access /app with ssid and return status 200', done => {
        request(HOST)
          .get('/api')
          .set('Cookie', ['ssid=9669064445780750cdd4a3a'])
          .expect(200, done)
      });
    });

  });




});

describe('Database calls', ()=> {
  describe('GET', ()=> {
    it('should respond with status code 200 and an empty JSON array', done => {
      request(HOST)
        .get('/api')
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .expect((res)=> {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.equal(0)
        }).end(done);
    });
  });

  describe('POST', ()=> {
    it('should fail to post things that do not meet the mongoose schema, and send the correct status code 418', done => {
        request(HOST)
          .post('/post')
          .set('Content-Type', 'application/json')
          .send({garbage: 'data'})
          .expect(418)
          .expect((res)=> {
            expect(res.body).to.be.an('object')
            expect(Object.keys(res.body).length).to.equal(1)
          }).end(done);
    });

    it('should post things to the database when they are formatted correctly, and return a status 200 as well as the item posted', done => {
        request(HOST)
          .post('/post')
          .set('Content-Type', 'application/json')
          .set('Cookie', ['ssid=59669064445780750cdd4a3a'])
          .send({
            title: 'supertest',
            description: 'a test job',
            address: 'codesmith',
            pay: 17200
          })
          .expect(200)
          .expect((res) => {
            expect(res.body).to.be.an('object')
            expect(res.body.title).to.equal('supertest')
            expect(Object.keys(res.body).length).to.equal(8)
          }).end(done);
    });
  });

  describe('GET', ()=> {
    it('should respond with status code 200 and a JSON array containing a job object', done => {
      request(HOST)
        .get('/api')
        .expect('Content-Type', /application\/json/)
        .expect(200)
        .expect((res)=> {
          expect(res.body).to.be.an('array')
          expect(res.body.length).to.equal(1)
          expect(res.body[0]).to.be.an('object')
          expect(res.body[0].title).to.equal('supertest')
        }).end(done);
    });
  });
});

  describe('TDD - CRUD', () => {
    describe('updating items in the database', () => {
      it('should allow a user to update the price, description or address of job and return a status 200 and the updated job', done =>{
        request(HOST)
        .put('/updatejob')
        .set('Content-Type', 'application/json')
        .set('Cookie', ['ssid=59669064445780750cdd4a3a'])
        .send({
          title: 'supertest',
          description: 'an updated test job',
          address: 'hack reactor',
          pay: 17855
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).to.be.an('object')
          expect(res.body.title).to.equal('supertest')
          expect(res.body.address).to.equal('hack reactor')
          expect(Object.keys(res.body).length).to.equal(5)
        }).end(done);
      });
    });

    describe('claiming a job', () => {
      it('should allow a user to claim a job, update the document to note his username, and return status 200 and the updated document', done =>{
        request(HOST)
        .put('/updatejob')
        .set('Content-Type', 'application/json')
        .set('Cookie', ['ssid=59669064445780750cdd4a3a'])
        .send({
          title: 'supertest',
          description: 'an updated test job',
          address: 'hack reactor',
          pay: 17855,
          claimant: 'testUser'
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).to.be.an('object')
          expect(res.body.title).to.equal('supertest')
          expect(res.body.claimant).to.equal('testUser')
          expect(Object.keys(res.body).length).to.equal(6)
        }).end(done);
      });
    });

    describe('blocking a job claim', () => {
      it('should allow a user to block a claim to a job, update the DB to reflect that and return status code 200 as well as the updated job', done =>{
        request(HOST)
        .put('/updatejob')
        .set('Content-Type', 'application/json')
        .set('Cookie', ['ssid=59669064445780750cdd4a3a'])
        .send({
          title: 'supertest',
          userID: 'testIDabcdefg',
          description: 'an updated test job',
          address: 'hack reactor',
          pay: 17855,
          claimant: 'none'
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).to.be.an('object')
          expect(res.body.title).to.equal('supertest')
          expect(res.body.claimant).to.equal('none')
          expect(Object.keys(res.body).length).to.equal(6)
        }).end(done);
      });
    });

    describe('deleting items from the database', () => {
      it('should allow a user to delete his job from the database, and return status 200 and the deleted job.', done => {
        request(HOST)
        .del('/deletejob')
        .set('Content-Type', 'application/json')
        .set('Cookie', ['ssid=59669064445780750cdd4a3a'])
        .send({
          title: 'supertest',
          description: 'a test job',
          address: 'codesmith',
          pay: 17200
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).to.be.an('object')
          expect(res.body.title).to.equal('supertest')
          expect(Object.keys(res.body).length).to.equal(5)
        }).end(done);
      });
    });



    // describe('signing up as a new user', ()=>{
    //   it('should add a user to the database when it recieves a token from gitHub, and respond with status 200 and the username and userID (ssid) on a cookie', done =>{
    //     request(HOST)
    //
    //   })
    // })
  });



// to add :

/*
CRUD:

DONE route test to destroy an item
 PENDING route test to sign up
 PENDING route test to sign in
 DONE route test to update an item
PENDING UNTIL USEFULNESS IS WORKED OUT route test to return specific items
DONE route test to claim a job
DONE route test to block a claim

*/
