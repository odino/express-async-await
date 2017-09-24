const wrapAsync = fn => (...args) => {
  return Promise.resolve(fn(...args)).catch(args[2])
}
const methods = require('http').METHODS;

module.exports = function(app) {
  methods.forEach(m => {
    let original = app[m.toLowerCase()]

    app[m.toLowerCase()] = function(...args) {
      if (typeof args[1] === 'function') {
        args[1] =  wrapAsync(args[1])
      }

      return original.call(app, ...args)
    }
  })

  return app
}
