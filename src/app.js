const geocode = require('../utils/geocode.js')
const forecast = require('../utils/forecast.js')
const path = require('path')
const express =  require('express')
const hbs = require('hbs')

const pubdir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath  = path.join(__dirname,'../templates/partials')
const app = express()

const port = process.env.PORT || 3000

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(pubdir))


app.get('',(req,res) =>{
    res.render('index',{
        title: "Weather App",
        name: "Rahul Singh"
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title: "About Me",
        name: "Rahul Singh"
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        message: "How can I help You &&",
        title: "Help Page",
        name: "Rahul Singh"       
    })
})
app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({
            error: "Please provide the adress"
        })
    }
    const address = req.query.address
    console.log(address)
    geocode(address,(error,{latitude,longitude} = {}) =>{
        if(error){
            return res.send({
                error: "Unable to find the latitude and longitude of the given location"
            })
        }
        console.log(latitude, longitude)
        forecast(latitude,longitude,(error,data) =>{
            if(error){
                return res.send({
                    error: "Unable to find the weather forecase"
                })
            }
            const{temperature,rain} = data
            console.log(temperature,' ', rain)
            res.send({
                forecast : "The temperature is " + temperature + " degrees out. There is " + rain +"% chance of rain"
            })
        })        
    })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Noida',
    //     address : req.query.address
    // })
})

app.get('/products', (req,res) =>{
    if(!req.query.search){
        return res.send({
                error: "You must provide a search item"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) =>{
    res.render('404', {
        title: 'Error',
        message : 'Help article not found',
        name: 'Rahul Singh'
    })
})

app.get('/what',(req,res) =>{
    res.render('404',{
        title: 'Error',
        message: "Page not found",
        name: 'Rahul Singh'
    })
})
app.get('*',(req,res) =>{
    res.render('404',{
        title: 'Error',
        message: "Page not found",
        name: 'Rahul Singh'
    })
})
//app.com
//app.com/help
//app.com/about

app.listen(port,() =>{
    console.log("server is up on port :" + port)
})

