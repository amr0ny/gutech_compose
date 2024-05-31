var config = {
    local: {
        mode: 'local',
        port: 3000,
        logFile: 'gutech.log',
        logLevel: 'debug',
        sequelize: {
            database: 'gutech',
            username: 'alexalexdidit',
            password: 'gb9Xd2WAJ',
            host: '127.0.0.1',
            dialect: 'postgres'
        },
        server: {
            host: '127.0.0.1',
            port: 1111
        }
    },
    staging: {
        mode: 'staging',
        logFile: 'gutech.log',
        logLevel: 'debug',
        port: 3000,
        sequelize: {
            database: 'gutech',
            username: 'postgres',
            password: 'gb9Xd2WAJ',
            host: '127.0.0.1',
            dialect: 'postgres'
        },
        server: {
            host: '127.0.0.1',
            port: 1111
        }
    },
    production: {
        mode: 'production',
        logFile: 'gutech.log',
        logLevel: 'info', 
        port: 3000,
        sequelize: {
            database: 'gutech',
            username: 'postgres',
            password: 'gb9Xd2WAJ',
            host: 'gutechh.ru',
            dialect: 'postgres'
        },
        server: {
            host: '127.0.0.1',
            port: 1111
        }
    }
}
module.exports = function(mode) {
    return config[mode || process.argv[2] || 'local'] || config.local;
}
