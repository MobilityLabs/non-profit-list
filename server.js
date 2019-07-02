require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const api = require('./routes/api')

if (typeof(window) == 'undefined'){
    global.window = {
      location: {
        origin: process.env.BASE_URL
      }
    }
}

const app = express()

if (process.env.NODE_ENV === 'production') {
  console.log('PRODUCTION ENVIRONMENT')
  app.use(express.static('build', {maxAge: 600000}))
}

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

// My routes
app.use('/api', api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
