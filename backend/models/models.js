import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

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

export default Movie;
