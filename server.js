// DEPENDENCIES
const express = require('express')
const methodOverride = require('method-override')

// CONFIGURATION
require('dotenv').config()
const app = express();
const PORT = process.env.PORT

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