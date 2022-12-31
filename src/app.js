const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./parts/geocode')
const forecast = require('./parts/forecast') 

const app = express()
let publicDirectoryPath = path.join(__dirname, '../public')
const viewDirectory = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewDirectory); //express knows 'views' folder as default. To customize this folder, I used viewDirectory variable.
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        comp_name: 'Mercedes-Benz AMG',
        nameCode : 'CKAYGUS'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide the address data. '
        })
    }


geoCode(req.query.address, (error, data) => {
    if(error){
        console.log(error)
    }else {
        console.log(data.temp)
            forecast(data.lat, data.lon, (error, data) => {  //
                if(error){
                    console.log(error)
                };
                if(data){
                    console.log('Data', data)
                };
            })
            
    };
    if(data){
        console.log('Data', data)
        global.coordinates = data;
    };
    
    
})




}) 
                                                              
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather App',
        comp_name: 'Mercedes-Benz AMG'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page For Weather App',
        comp_name: 'Mercedes-Benz AMG'
    })
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'Please provide query..' 
        })
    }
    console.log(req.query.search);
    res.send({
        products : []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.'
    })
})


app.listen(3000, () => {
    console.log('Server is running at port 3000');
});