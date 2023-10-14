module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    "Account",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      // explicitly specify table name
      tableName: "accounts",
      // disable automatic timestamp fields (createdAt and updatedAt)
      timestamps: false,
    }
  );

  Account.associate = (models) => {
    Account.hasMany(models.Review, {
      foreignKey: "accountId",
      as: "reviews",
    });
  };

  return Account;
};
