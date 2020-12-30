const request = require('postman-request')

const forecast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4909a78f5a57e0a1563fa49dd9086b14&query=' + lat + ',' + long + '&units=m'

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