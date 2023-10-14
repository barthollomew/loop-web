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
  }, {
    // explicitly specify table name
    tableName: 'reviews',
    // disable automatic timestamp fields (createdAt and updatedAt)
    timestamps: false
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Account, {
      foreignKey: 'account_id',
      onDelete: 'CASCADE'
    });
    Review.belongsTo(models.Movie, {
      foreignKey: 'movie_id',
      onDelete: 'CASCADE'
    });
  };

  return Review;
};
