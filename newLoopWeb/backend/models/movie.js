module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.TEXT,
      image_url: DataTypes.STRING
    }, {
      // explicitly specify table name
      tableName: 'movies',
      // disable automatic timestamp fields (createdAt and updatedAt)
      timestamps: false
    });
  
    Movie.associate = (models) => {
      Movie.hasMany(models.Review, {
        foreignKey: 'movie_id',
        as: 'reviews'
      });
      Movie.hasMany(models.Showtime, {
        foreignKey: 'movie_id',
        as: 'showtimes'
      });
    };
  
    return Movie;
};
