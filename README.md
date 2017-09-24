# express-async-await

Use async/await in your routes without
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
```

Now `app.$method` support async functions out of the box!

## Installation

```
npm i express-async-await

npm add express-async-await
```
