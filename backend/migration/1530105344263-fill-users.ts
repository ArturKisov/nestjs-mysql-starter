import { EntityManager, In, MigrationInterface, QueryRunner } from 'typeorm';
import { Role } from '../src/core/role/role.entity';
import { RolesData } from '../src/core/role/data/role.data';
import { plainToClass } from 'class-transformer';
import { User } from '../src/core/user/user.entity';

export class fillUsers1530105344263 implements MigrationInterface {

    private async getRole(manager: EntityManager, name: string): Promise<Role> {
        return await manager.findOne(Role, {name});
    }

    private async generateData(manager: EntityManager): Promise<any[]> {
        return await [
            {
                username: 'admin',
                password: 'admin',
                role: await this.getRole(manager, RolesData.Admin)
            },
            {
                username: 'developer',
                password: 'developer',
                role: await this.getRole(manager, RolesData.Developer)
            },
            {
                username: 'manager',
                password: 'manager',
                role: await this.getRole(manager, RolesData.Manager)
            }
        ]
    }

    public async up(queryRunner: QueryRunner): Promise<any> {
        const manager = queryRunner.manager;
        let usersData = await this.generateData(manager);
        let users = plainToClass(User, usersData);
        return await manager.save(User, users);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.manager.delete(User, {username: In([ 'admin', 'manager', 'developer' ])});
    }

}
