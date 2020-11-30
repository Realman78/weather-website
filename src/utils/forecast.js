const request = require('request')

const forecast = (lat, lon, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=25eab441d9666034a41630cb5753f42a&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(lon)
    request({url, json:true}, (error, {body}) => {
        if (error){
            callback('Cant connect to service', undefined)
        }else if (body.error) {
            console.log('Unable to find location. Try another search.')
        }else{
            callback(undefined, 'It is currently '+ body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + '. Humidity is: ' + body.current.humidity + '%')
        }
    })
}

module.exports = forecast