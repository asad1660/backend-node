const  Sequelize  = require('sequelize');
module.exports = sequelize.define('Experience', {
    // Model attributes are defined here
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey:true,
      autoIncrement: true,
    },
    start_date: {
      type: Sequelize.DATE
      // allowNull defaults to true
    },
    end_date: {
        type: Sequelize.DATE
        // allowNull defaults to true
      },
    job_title: {
        type: Sequelize.STRING
        // allowNull defaults to true
      },
    company: {
        type: Sequelize.STRING
        // allowNull defaults to true
      },
    company_log: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    public_id:{
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    img_url:{
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    job_description: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    user_id :{
        type : Sequelize.BIGINT,
        
    }

  }, {
    // Other model options go here
    timestamps:false,
    tableName: 'experiences'
  });
 