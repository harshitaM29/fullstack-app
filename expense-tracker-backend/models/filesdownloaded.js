const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const FilesDownloaded = sequelize.define('filesdownloaded' , {
    id: {
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey: true
    },
    fileURL: {
        type:Sequelize.STRING,
        allowNull: false,
    },

    filename: {
        type:Sequelize.STRING,
       
       
    },
});

module.exports = FilesDownloaded;