module.exports = (sequelize, DataTypes) => {
  const Showtime = sequelize.define('Showtime', {
    cinemaLocation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    showingTime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    // explicitly specify table name
    tableName: 'showtimes',
    // disable automatic timestamp fields (createdAt and updatedAt)
    timestamps: false
  });

  Showtime.associate = (models) => {
    Showtime.belongsTo(models.Movie, {
      foreignKey: 'movie_id',
      onDelete: 'CASCADE'
    });
  };

  return Showtime;
};
