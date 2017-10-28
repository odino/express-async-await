const supertest = require('supertest');
const assert = require('assert');

const aa = require('../index');

function getExpressNoCache() {
  delete require.cache[require.resolve('express')];
  delete require.cache[require.resolve('express/lib/express')];
  delete require.cache[require.resolve('express/lib/application')];
  delete require.cache[require.resolve('express/lib/router')];

  delete require.cache[require.resolve('../index')];

  return require('express');
}

describe('async routes', () => {
  const originalRouterRoute = getExpressNoCache().Router().route;

  it('should return the app passed in', async () => {
    const express = getExpressNoCache();
    const app = express();
    const asyncApp = aa(app);

    assert.strictEqual(asyncApp, app);
    assert.equal(express.Router().route.toString(), originalRouterRoute.toString());
  });

  it('should monkey patch the original express if nothing is passed in', async () => {
    const express = getExpressNoCache();
    require('../index')();

    assert.notEqual(express.Router().route.toString(), originalRouterRoute.toString());
  });
});
