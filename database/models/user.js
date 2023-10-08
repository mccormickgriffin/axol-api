const { DataTypes } = require('sequelize');
const connection = require('../connection');

const User = connection.define('user', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

User.sync();

module.exports = User;