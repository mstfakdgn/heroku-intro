const request = require("request");

const geoCode = (address, callback) => {
  const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibGV1dGVuYW50IiwiYSI6ImNrb2loaTJ6NTAyeHMybm1ramRsZnZyNWMifQ.gCrwYfLdbv6EO7eTWluaJg&limit=1`;

  request(
    {
      url: geoUrl,
      json: true,
    },
    (error, {body}) => {
      if (error) {
        callback("Unable to connect location services!", undefined);
      } else if (body.features.length == 0) {
        callback("unable to find location", undefined);
      } else {
        callback(undefined, {
          longitute: body.features[0].center[0],
          latitute: body.features[0].center[1],
          place: body.features[0].place_name,
        });
      }
    }
  );
};

module.exports = geoCode;
