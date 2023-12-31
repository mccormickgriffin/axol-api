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
    return axios
      .post("https://accounts.spotify.com/api/token", requestBody.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((result) => result.data)
      .catch((error) => next(error));
  },

  getAccessToken: async function (refresh_token, next) {
    const requestBody = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    });
    return axios
      .post("https://accounts.spotify.com/api/token", requestBody.toString())
      .then((response) => response.data.access_token)
      .catch((error) => next(error));
  },

  getProfile: async function (access_token, next) {
    return axios
      .get("https://api.spotify.com/v1/me", {
        headers: createHeaders(access_token),
      })
      .then((response) => {
        return {
          id: response.data.id,
          displayName: response.data.display_name,
          imageUrl: response.data.images.length
            ? response.data.images[0].url
            : null,
        };
      })
      .catch((error) => next(error));
  },
};

function createHeaders(access_token) {
  return {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
}
