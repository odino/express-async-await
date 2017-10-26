const supertest = require('supertest');
const assert = require('assert');

const express = require('express');
require('../index')();

describe('async routes', () => {

  const err = new Error('Bad');

  it('should catch errors thrown in async routes created by express.Router()', async () => {
    const app = getTestApp();
    const router = express.Router();

    router.get('/error', async function(){
      throw err;
    });

    app.use(router);

    await supertest(app)
      .get('/error')
      .expect(500);
  });

  it('should catch errors thrown in async routes created by app.route()', async () => {
    const app = getTestApp();

    app.route('/error').get(async function(){
      throw err;
    });

    await supertest(app)
      .get('/error')
      .expect(500);
  });

  it('should catch errors thrown in async routes created by Router.route()', async () => {
    const app = getTestApp();
    const router = express.Router();

    router.route('/error').get(async function(){
      throw err;
    });

    app.use(router);

    await supertest(app)
      .get('/error')
      .expect(500);
  });

  it('should catch errors next()\'d', async () => {
    const app = getTestApp();
    const router = express.Router();

    router.get('/error', function(req, res, next){
       next(err);
    });

    app.use(router);

    await supertest(app)
      .get('/error')
      .expect(500);
  });

  it('should work with just normal responses', async () => {
    const app = getTestApp();
    const router = express.Router();

    app.use(router);

    await supertest(app)
      .get('/test')
      .expect(200);
  });

  it('should wait for the returned promise to resolve', async () => {
    const app = getTestApp();
    const router = express.Router();

    let reject;
    const prom = new Promise((res, rej) => {
      reject = rej;
    });

    router.get('/error', async function(req, res){
      return prom;
    });

    app.use(router);

    let done = false;
    let test = supertest(app)
      .get('/error')
      .expect(500).then(() => {
        done = true
      });

    assert(!done);
    reject(err);
    await test;
    assert(done);
  });
});

function getTestApp() {
  const app = express();

  app.get('/test', function(req, res){
    res.status(200).end();
  });

  app.use(function(req, res, next, err) {
    if(err) {
      res.status(500).send("Error");
    }
  });

  return app;
}

