const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db_instance');

const modelName = 'Slide';
const tableName = 'slides';

 const SlideModel = sequelize.define(modelName, {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
      filepath: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      header: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
}, { tableName: tableName, timestamps: false, });

SlideModel.sync()
.then(() => {
    //debug version
    console.log(`Model ${modelName} is syncronized...`);
})
.catch((err) => {
    //debug version
    console.error('Error:', err);
});
module.exports = SlideModel;