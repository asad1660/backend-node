//const  Sequelize  = require('sequelize');
// const sequelize = new Sequelize('Profilepage', 'postgres', 'root', {
//     host: 'localhost',
//     dialect: 'postgres'
//   });
const Sequelize = require('sequelize');
sequelize = new Sequelize("postgres://kiqqnfjjwoywsa:3e6203d547276109af3a6af2504f2cc1eaf7275f9c2c676afdc1caa2e9669822@ec2-35-168-194-15.compute-1.amazonaws.com:5432/da03eh9cgfah9v", {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
global.sequelize = sequelize;