const request = require("request");

const weather = (lat, lon, callback) => {
  const weatherUrl = `http://api.weatherstack.com/current?access_key=821a66a6a79be430bca7e6bb86b6848f&query=${lat},${lon}&units=m`;

  request(
    {
      url: weatherUrl,
      json: true,
    },
    (error, { body }) => {
      if (error) {
        callback(error, undefined);
      } else if (body.error) {
        callback("unable to find place", undefined);
      } else {
        callback(undefined, {
          temprature: body.current.temperature,
          description: body.current.weather_descriptions[0],
        });
      }
    }
  );
};

module.exports = weather;
