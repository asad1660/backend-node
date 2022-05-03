const  Sequelize  = require('sequelize');
module.exports = sequelize.define('User', {
    // Model attributes are defined here
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey:true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    profile_picture: {
        type: Sequelize.STRING
        // allowNull defaults to true
      },
    age: {
        type: Sequelize.STRING
        // allowNull defaults to true
      },

  }, {
    // Other model options go here
    timestamps:false,
    tableName: 'users'
  });
 