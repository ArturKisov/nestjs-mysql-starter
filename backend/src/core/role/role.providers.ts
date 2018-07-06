import { Connection } from 'typeorm';
import { Role } from './role.entity'

export const rolesProviders = [
  {
    provide: 'RolesRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Role),
    inject: [ 'DbConnectionToken' ],
  }
];
