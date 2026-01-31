const config = require('../config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config.db.database,config.db.user,config.db.password,
  {
    dialect:"mysql",
    host:config.db.host,
    define:{
      timestamps: false
    },
    storage: "./session.mysql"

  }

); 

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('myslq bağlantısı sağlandı.');
  }
  catch (error) {
    console.error('bağlantı hatası', error);
  }
}

connect();

module.exports = sequelize;