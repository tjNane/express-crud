const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')

const app = express()

app.engine('html', require('express-art-template'))
app.use('/public', express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(router)

app.listen(5566, () => {
  console.log('running at port 5566 ~')
})
