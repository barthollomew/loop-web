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
    });
  
    Showtime.associate = (models) => {
      Showtime.belongsTo(models.Movie, {
        foreignKey: 'movieId',
        onDelete: 'CASCADE'
      });
    };
  
    return Showtime;
  };
  