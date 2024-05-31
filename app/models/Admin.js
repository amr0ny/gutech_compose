const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db_instance');


const modelName = 'Admin';
const tableName = 'admins';
const AdminModel = sequelize.define(modelName, {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},{ tableName: tableName, timestamps: false, });


AdminModel.sync()
.then(() => {
    //debug version
    console.log(`Model ${modelName} is syncronized...`);
})
.catch((err) => {
    //debug version
    console.error('Error:', err);
});


module.exports = AdminModel;