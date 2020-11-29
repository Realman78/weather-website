const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { query } = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Marin Dedic'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About page',
        name: 'Marin big D About'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        msg: 'you came to the HELP page',
        title: 'Help',
        name: 'Marin D helper'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, place_name} = {}) => {
        if (error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (f_error, forecast_data) => {
            if(f_error){
                return res.send({f_error})
            }
            res.send({
                forecast: forecast_data,
                location: place_name
            })
    })
    })
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            Error: 'Bruh search 4 sumthin '
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res) =>{
    res.render('error',{
        title: '404',
        error_msg: 'NO fukcing nothing after help'
    })
})

app.get('*',(req, res) =>{
    res.render('error',{
        title: '404',
        error_msg: 'THe fock did you search for? '
    })
})

app.listen(3000,() =>{
    console.log('Server is up and running on port 3000!')
})

