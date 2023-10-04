// models/movie.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Movie = sequelize.define('Movie', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imgSrc: {
        type: DataTypes.STRING,
        allowNull: true
    }
    // Add other fields as needed
});

module.exports = Movie;
