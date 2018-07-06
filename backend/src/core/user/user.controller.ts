import { UserService } from './user.service';
import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { RolesGuard } from '../role/guards/role.guard';
import { Roles } from '../role/decorators/role.decorator';
import { RolesData } from '../role/data/role.data';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post()
    @Roles(RolesData.Admin, RolesData.Manager)
    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Get()
    @Roles(RolesData.Manager)
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}