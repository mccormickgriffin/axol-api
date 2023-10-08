const axios = require("axios");

module.exports = {
  getTokens: async function (code, next) {
    const requestBody = new URLSearchParams({
      code: code,
      grant_type: "authorization_code",
      redirect_uri: process.env.REDIRECT_URI,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    });
    console.log(requestBody.toString());
    return axios
      .post("https://accounts.spotify.com/api/token", requestBody.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((result) => result.data)
      .catch((error) => console.log("Error: ", error));
  },
};
