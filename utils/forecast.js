const request = require('request')

const forecast = (lat,long,callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=7178b93e87539b3f51556c30a45c2cd6&query=' + lat + ',' + long + '&units=m'
    request({url, json: true},(error,{ body }) =>{
        console.log(body.current.temperature)
        if(error){
            callback("Unable to connect to url !!")
        }
        else if(body.error){
            console.log(body)
            callback( body.error )
        }
        else{
            const {temperature,cloudcover} = body.current
            callback(undefined,{
                temperature,
                rain: cloudcover
            })
        }
    })
}

module.exports = forecast