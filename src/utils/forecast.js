const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/" +
    process.env.DS_KEY +
    "/" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          ` It is currently ${Math.round(body.currently.temperature)} 
            degrees outside with a ${body.currently.precipProbability *
              100}% chance of rain today. The high temperature for the day 
            is expected to be ${Math.round(
              body.daily.data[0].temperatureHigh
            )} with a low of ${Math.round(body.daily.data[0].temperatureLow)}.`
      );
    }
  });
};

module.exports = forecast;
