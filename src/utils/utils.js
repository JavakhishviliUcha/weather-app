const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidWNoYSIsImEiOiJjazhvbGV3MzQwOHZ2M2x0MjEzMTJkejBlIn0.8WHJUpvDebcP6LqBbELsgw&limit=1`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Something went wrong...");
    } else if (response.body.features.length === 0) {
      callback("Unable to find location...");
    } else {
      const data = {
        lat: response.body.features[0].center[1],
        long: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      };
      callback(null, data);
    }
  });
};

const forecast = (data, callback) => {
  const url = `https://api.darksky.net/forecast/5471d98818edae39b868a81932e0fb66/${data.lat},${data.long}?units=si`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Something went wrong...");
    } else if (response.body.error) {
      callback("Unable to find location...");
    } else {
      callback(null, response.body.currently);
    }
  });
};

module.exports = {
  geocode,
  forecast,
};
