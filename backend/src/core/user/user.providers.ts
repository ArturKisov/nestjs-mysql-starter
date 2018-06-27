import { Connection } from 'typeorm';
import { User } from './user.entity'

export const usersProviders = [
    {
        provide: 'UsersRepositoryToken',
        useFactory: (connection: Connection) => connection.getRepository(User),
        inject: [ 'DbConnectionToken' ],
    }
];
