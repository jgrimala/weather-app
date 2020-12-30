const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000 // for heroku

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') //to get handlebars set up
app.set('views', viewsPath) //point express to 
hbs.registerPartials(partialsPath)

// Setup directories to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    //render for hbs
    res.render('index', {
        title: 'Weather page',
        name: 'Julie Grimala',
    })
})

app.get('/about', (req, res) => {
    //render for hbs
    res.render('about', {
        title: 'About Me',
        name: 'Julie Grimala',
    })
})

app.get('/help', (req, res) => {
    //render for hbs
    res.render('help', {
        title: 'Help',
        name: 'Julie Grimala',
        helpText: 'This is a message for you'
    })
})

app.get('/weather', (req, res) => { 
    if (!req.query.address) { 
        return res.send({ 
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })       
    })

})

// playground
/* app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
}) */

app.get('/about/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Julie Grimala',
        errorMessage: 'About article not found'
    })
})

app.get('/weather/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Julie Grimala',
        errorMessage: 'Weather article not found'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Julie Grimala',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => { 
    res.render('404', {
        title: '404',
        name: 'Julie Grimala',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
