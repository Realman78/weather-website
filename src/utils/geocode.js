const request = require('request')

const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmVhbG1hbjc4IiwiYSI6ImNraG96cmR0ejA1dmcydHJzeW9pOWlpYngifQ.eEWbLjRmW826yt7XcSBIcw&limit=1'
    request({url: url, json:true}, (error, {body}) =>{
        if (error){
            callback('Unable to connect to location services', undefined)
        }else if (body.features.length === 0){
            callback('Couldnt find your location', undefined)
        }else{
            const place_name = body.features[0].place_name
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            callback(undefined, {
                place_name,
                latitude,
                longitude
            })
        }
    })
}

module.exports = geocode