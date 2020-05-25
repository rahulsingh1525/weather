const request = require('request')

const forecast = (lat,long,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=7178b93e87539b3f51556c30a45c2cd6&query=' + lat + ',' + long + '&units=m'
    request({url, json: true},(error,{ body }) =>{
        console.log(body.current.temperature)
        if(error){
            callback("Unable to connect to weather service !!",undefined)
        }
        else if(body.error){
            console.log(body)
            callback('unable to find location ', undefined)
        }
        else{
            const temperature = body.current.temperature
            const cloudcover = body.current.cloudcover
            const name = body.location.name  
            console.log("from forecast code: " , name)
            callback(undefined,{temperature,cloudcover,name})
        }
    })
}

module.exports = forecast