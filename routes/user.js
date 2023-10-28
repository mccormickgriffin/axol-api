const express = require("express");
const router = express.Router();
const db = require("../database/database");
const spotify = require("../lib/spotify");

async function getProfile(request, response, next) {
  const userId = request.auth.userId;
  const refreshToken = await db.getRefreshToken(userId, next);
  const accessToken = await spotify.getAccessToken(refreshToken, next);
  const profile = await spotify.getProfile(accessToken, next);
  response.json({
    displayName: profile.displayName,
    imageUrl: profile.imageUrl,
  });
}

router.get("/profile", getProfile);

module.exports = router;
