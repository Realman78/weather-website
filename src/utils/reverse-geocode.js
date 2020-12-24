const request = require('request')

const reverseGeocode = (lat,lon, callback) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lat},${lon}.json?access_token=pk.eyJ1IjoicmVhbG1hbjc4IiwiYSI6ImNraG96cmR0ejA1dmcydHJzeW9pOWlpYngifQ.eEWbLjRmW826yt7XcSBIcw&limit=1`
    request({url, json: true}, (error, {body})=>{
        if (error){
            callback('Unable to connect', undefined)
        }else if (body.features.length === 0){
            callback('Couldnt find your location', undefined)
        }else{
            const place_name = body.features[0].place_name
            callback('undefined', place_name)
        }
    })
}

module.exports = reverseGeocode