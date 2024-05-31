const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db_instance');

const modelName = 'Video';
const tableName = 'videos';
const VideoModel = sequelize.define(modelName, {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING(255),
    },
  }, { tableName: tableName, timestamps: false, });

VideoModel.sync()
.then(() => {
    //debug version
    console.log(`Model ${modelName} is syncronized...`);
})
.catch((err) => {
    //debug version
    console.error('Error:', err);
});


module.exports = VideoModel;