// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const customers = sequelizeClient.define('customers', {

    customers_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    customers_nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customers_apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customers_correo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customers_telefono: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customers_direccion: {
      type: DataTypes.STRING,
      allowNull: false
    }
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
  customers.associate = function (models) {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
  };

  return customers;
};
