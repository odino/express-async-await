let expressaa = require('./index.js')
let express = require('express')
let router = expressaa(express.Router())
let app = express()

console.log(app.get('env'))
app.set('env', 'some')
console.log(app.get('env'))

router.get('/ok', async function(req, res, next) {
  res.json({hello: 'world'})
})

router.get('/no', async function(req, res) {
  res.notSomethingICanRun({hello: 'world'})
})

router.get('/no2', async function(req, res) {
  throw new Error('123')
})

router.get('/no3', function(req, res, next) {
  next(new Error('errora'))
})

router.get('/no4', function(req, res) {
  throw new Error('123')
})

router.get('/ok-middleware', function(req, res, next) {
  next();
}, async function(req, res, next) {
  res.json({hello: 'world'})
})

router.get('/no-middleware', function(req, res, next) {
  next();
}, async function(req, res, next) {
  throw new Error('123');
})

app.use(router);

app.use((err, req, res, next) => {
  console.error(err)

  res.status(500).send("Ouch!")
})

app.listen(8080)
