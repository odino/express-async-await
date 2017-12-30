# express-async-await

Use [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) in your routes without
polluting / [wrapping](https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016) them.

## Usage

Pass the app to the library and we'll monkey-patch it
for you:

``` js
const aa = require('express-async-await')
const app = aa(express())

app.get('/ok', async function(req, res, next) {
  res.json({hello: 'world'})
})

app.get('/no', async function(req, res) {
  res.notSomethingICanRun({hello: 'world'})
})

app.use((err, req, res, next) => {
  console.error(err)

  res.status(500).send("Ouch!")
})
```

Now `app.$method(route, fn)` support async functions out of the box!

(have a look at the [example app](https://github.com/odino/express-async-await/blob/master/example.js))

To run the example:
```
npm i
npm run example
```

### Usage with the express router ("^4")
As the express router is an express app itself, pass the router to the library and we'll monkey-patch it for you:

```js
const aa = require('express-async-await')
const router = aa(express.Router())
const app = express()

router.get('/ok', async function(req, res, next) {
  res.json({hello: 'world'})
})

router.get('/no', async function(req, res) {
  res.notSomethingICanRun({hello: 'world'})
})

app.use(router)

app.use((err, req, res, next) => {
  console.error(err)

  res.status(500).send("Ouch!")
})
```

Now `router.$method(route, fn)` support async functions out of the box!

(have a look at the [example-router app](https://github.com/odino/express-async-await/blob/master/example-router.js))

To run the example-router:
```
npm i
npm run example-router
```

## Installation

```
npm i express-async-await

npm add express-async-await
```
