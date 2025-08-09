require("dotenv").config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false,
        /**
         * For creating SequelizeMetaSeeders table inside database
         */
        seederStorage: 'sequelize',
        seederStorageTableName: 'SequelizeMetaSeeders',
    },
    staging: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false,
        /**
         * For creating SequelizeMetaSeeders table inside database
         */
        seederStorage: 'sequelize',
        seederStorageTableName: 'SequelizeMetaSeeders',
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false,
        /**
         * For creating SequelizeMetaSeeders table inside database
         */
        seederStorage: 'sequelize',
        seederStorageTableName: 'SequelizeMetaSeeders',
    },
};
