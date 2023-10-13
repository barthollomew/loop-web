import Sequelize from 'sequelize';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';

const sequelize = new Sequelize('s3948938_fwp_a2', 's3948938_fwp_a2', 'abc123', {
  host: 'rmit.australiaeast.cloudapp.azure.com',
  port: 3306,
  dialect: 'mysql'
});

const sessionStore = new MySQLStore({}, sequelize);

export { sequelize, sessionStore };
