const request = require('request')

const forecast = (longitude, latitude, callback) => {    
    const url = 'https://api.darksky.net/forecast/' + process.env.DS_KEY + '/' + latitude + ',' + longitude;
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + `It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability * 100}% chance of rain.`)
        }
    })
}

module.exports = forecast;