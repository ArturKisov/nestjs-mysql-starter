import { Connection, createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number.parseInt(process.env.MYSQL_PORT, 10),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_USER_PASS,
      database: process.env.MYSQL_DB_NAME,
      entities: [ __dirname + '/../../../src/**/*.entity.ts' ],
      synchronize: true,
      logging: true,
    })
  },
];