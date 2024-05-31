const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db_instance');

const modelName = 'Partner';
const tableName = 'partners';

const PartnerModel = sequelize.define(modelName, {
  id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
  },
    filepath: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
}, { tableName: tableName, timestamps: false, });

PartnerModel.sync()
.then(() => {
    //debug version
    console.log(`Model ${modelName} is syncronized...`);
})
.catch((err) => {
    //debug version
    console.error('Error:', err);
});

module.exports = PartnerModel;