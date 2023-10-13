module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    });
  
    Account.associate = (models) => {
      Account.hasMany(models.Review, {
        foreignKey: 'accountId',
        as: 'reviews'
      });
    };
  
    return Account;
  };
  