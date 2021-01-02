const request = require('postman-request')

const forecast = (long, lat, callback) => {
    const weatherstackApiKey = process.env.WEATHERSTACK_API_KEY
    const url = 'http://api.weatherstack.com/current?access_key='+ weatherstackApiKey +'&query=' + lat + ',' + long + '&units=m'

    request({
        url,
        json: true
        }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to API service!', undefined)
            } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees!. The current humidity is " + body.current.humidity + "%.")

        }
    })
}
module.exports = forecast