module.exports = (sequelize, Sequelize) => {
  const Biodata = sequelize.define('biodata', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    place_birth: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date_birth: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Biodata;
};
