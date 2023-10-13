module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    Review.associate = (models) => {
      Review.belongsTo(models.Account, {
        foreignKey: 'accountId',
        onDelete: 'CASCADE'
      });
      Review.belongsTo(models.Movie, {
        foreignKey: 'movieId',
        onDelete: 'CASCADE'
      });
    };
  
    return Review;
  };
  