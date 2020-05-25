const request = require('request')

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFodWxzaW5naDE1MjUiLCJhIjoiY2thZTU4bTluMDViODJ4dGVyN283eGNweiJ9.uyWK6E89oMK5fl4lBaI5fg'
    request({url, json: true},(error, {body})=>{
        if(error){
            callback('Unable  to  connect  to  given url !!',undefined)
        }
                else if(body.features.length === 0){
            callback('Unable to find location. Search another location',undefined)
        }
        else{
            const data = body.features[0]
            const latitude = data.center[1]
            const longitude = data.center[0]
            const location = data.place_name
            callback(undefined,{
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geocode