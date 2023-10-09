// models/review.js

import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Review = sequelize.define('Review', {
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'movies', // Should match the table name if using Sequelize sync
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
    // Add other fields as needed
});

export { Review };
