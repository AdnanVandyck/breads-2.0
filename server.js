// DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')


// CONFIGURATION
require('dotenv').config()
const app = express();
const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
  )

// mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
// console.log('connected to mongo: ', process.env.MONGO_URI);


// MIDDLEWARE
app.use(express.urlencoded({extended: true}))

app.use(express.static('public'))
app.use(methodOverride('_method'))


//MIDDLEWARE
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())



// Breads
const breadsController = require('./controllers/breads_controller.js');

app.use('/breads', breadsController)

// ROUTES

//HOMEPAGE
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads!')
})

// 404 Page
app.get('*', (req, res) => {
    res.render('error404')
})


app.listen(PORT, () => {
    console.log('listening on port', PORT);
})