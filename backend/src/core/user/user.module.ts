import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';
import { usersProviders } from './user.providers';

@Module({
  imports: [ DatabaseModule ],
  controllers: [ UserController ],
  providers: [ UserService, ...usersProviders ],
  exports: [ UserService ]
})
export class UserModule {
}
