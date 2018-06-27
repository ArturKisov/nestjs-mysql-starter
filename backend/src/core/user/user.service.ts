import { Injectable, Inject } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { Repository } from 'typeorm';
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { plainToClass } from "class-transformer";

@Injectable()
export class UserService {
    constructor(@Inject("UsersRepositoryToken") private readonly usersRepository: Repository<User>) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = plainToClass(User, createUserDto);
        return await this.usersRepository.save(user).then((user) => {
            return this.findOneByUsername(user.username);
        });
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find({relations: [ "role" ]});
    }

    async findById(id: string): Promise<User> {
        return await this.usersRepository.findOne(id);
    }

    async findOneByUsername(username: string, withPassword: boolean = false, withPermission: boolean = false) {
        let options: FindOneOptions<User> = {
            relations: [ "role" ]
        };
        if (withPassword) {
            options.select = [ "password" ]
        }
        return await this.usersRepository.findOne({
            username: username
        }, options).then((user) => {
            return user;
        })
    }
}
