const dotenv = require('dotenv');
dotenv.config();

var config = {
    production: {
        mode: 'production',
        logFile: process.env.LOG_FILE || 'gutech.log',
        logLevel: process.env.LOG_LEVEL || 'info',
        port: process.env.PORT || 3000,
        sequelize: {
            database: process.env.DB_NAME || 'gutech',
            username: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'gb9Xd2WAJ',
            host: process.env.DB_HOST || 'gutechh.ru',
            dialect: 'postgres'
        },
        server: {
            host: process.env.SERVER_HOST || '127.0.0.1',
            port: process.env.SERVER_PORT || 1111
        }
    }
};

module.exports = function(mode) {
    return config[mode || process.argv[2] || 'production'] || config.production;
};
