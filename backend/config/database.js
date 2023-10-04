const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('s3948938_fwp_a2', 's3948938_fwp_a2', 'abc123', {
  host: 'rmit.australiaeast.cloudapp.azure.com',
  port: 3306,
  dialect: 'mysql'
});

module.exports = sequelize;
