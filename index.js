const methods = require('http').METHODS;

const express = require('express');

const wrapVerbs = (app) => {
  methods.forEach(m => {
    let original = app[m.toLowerCase()];

    app[m.toLowerCase()] = function(...args) {
      const wrappedArgs = args.map(arg => {
        if (isAsync(arg)) {
          return wrapAsync(arg);
        }

        return arg;
      });

      return original.call(app, ...wrappedArgs);
    };
  });
};

module.exports = function(app) {
  if(app) {
    wrapVerbs(app);
    return app;
  } else {
    wrapVerbs(express);

    let originalRoute = express.route;
    express.route = function(...args) {
      let retRoute = originalRoute.call(express, ...args);

      wrapVerbs(retRoute);

      return retRoute;
    };

    let originalRouter = express.Router.route;
    express.Router.route = function(...args) {
      let retRoute = originalRouter.call(this, ...args);

      wrapVerbs(retRoute);

      return retRoute;
    };
  }
}

function isAsync(fn) {
  const type = Object.toString.call(fn.constructor);
  return type.indexOf('AsyncFunction') !== -1;
}

const wrapAsync = fn => (...args) => {
  return Promise.resolve(fn(...args)).catch(args[2])
}
