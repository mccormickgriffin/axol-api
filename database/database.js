const User = require('./models/user');

module.exports = {
    getRefreshToken: async function (userId, next) {
        return User.findOne({
            where: { id: userId },
            attributes: ['refreshToken']
        }).then(user => user.dataValues.refreshToken
        ).catch(error => next(error));
    },
}
