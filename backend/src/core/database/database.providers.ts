import { ConnectionOptions, createConnection } from 'typeorm';

export const typeOrmConfig = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number.parseInt(process.env.MYSQL_PORT, 10),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_USER_PASS,
    database: process.env.MYSQL_DB_NAME,
    entities: [ './src/**/*.entity.ts' ],
    synchronize: true,
    migrationsTableName: 'migrations',
    migrations: [ './migration/*.ts' ],
    cli: {
        migrationsDir: './migration'
    },
    logging: true,
};

export const databaseProviders = [
    {
        provide: 'DbConnectionToken',
        useFactory: async () => await createConnection(<ConnectionOptions>typeOrmConfig)
    },
];