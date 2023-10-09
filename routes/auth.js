const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const spotify = require('../lib/spotify');
const User = require('../database/models/user');

async function login(request, response, next) {
    const data = await spotify.getTokens(request.body.code, next);
    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;
    const profile = await spotify.getProfile(accessToken, next);
    const token = jwt.sign({ userId: profile.id }, process.env.JWT_SECRET);
    User.findOrCreate({
        where: { id: profile.id },
        defaults: { refreshToken: refreshToken }
    }).then(() => response.json({ token: token })
    ).catch(error => next(error));
}

router.post('/login', login);

module.exports = router;