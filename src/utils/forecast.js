const request = require("request");

const forecast = (lng, lat, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=8cdd4c239252ca20b46fbaeeeb995c87&query=${lat},${lng}`;

  // destructured response to body
  request({ url, json: true }, (error, { body }) => {
    if (!error && !body.error) {
      const { temperature } = body.current;
      const { feelslike } = body.current;
      const description = body.current.weather_descriptions[0];
      callback(
        undefined,
        `${description}🌡 Currently there is: ${temperature}°C 🙃 Feels like: ${feelslike}°C.`
      );
    } else callback(`Unable to get data 😬 ${error}`, undefined);
  });
};

module.exports = forecast;
