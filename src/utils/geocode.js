const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + 
    encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXl1c2hkd2l2ZWRpIiwiYSI6ImNra25wM3F4MjNrMzgydnBha252YzY3eDYifQ.jY6T3fIjVp-xCy0CZYw_yQ&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Mapbox API.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode