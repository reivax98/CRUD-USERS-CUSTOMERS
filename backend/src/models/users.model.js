// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
  
    users_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    users_nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    users_apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    users_correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    users_contrasena: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },{
    timestamps: false
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return users;
};
