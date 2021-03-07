const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoia2FqaWN6ZWNoIiwiYSI6ImNrbHc4bTRxeDBvZmIyb3BsZzM3ZnhqczgifQ.kE5jPz2kVpOBP2lrab6Q_A&limit=1`;

  // destructured response to body
  request({ url, json: true }, (error, { body }) => {
    if (!error && body.features.length > 0) {
      callback(undefined, {
        lng: body.features[0].center[0],
        lat: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    } else callback(`Unable to get data 🙄 ${error ? error : ""}`, undefined);
  });
};

module.exports = geocode;
