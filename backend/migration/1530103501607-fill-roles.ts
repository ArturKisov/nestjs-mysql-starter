import { In, MigrationInterface, QueryRunner } from 'typeorm';
import { RolesData } from '../src/core/role/data/role.data';
import { Role } from '../src/core/role/role.entity';
import { plainToClass } from 'class-transformer';

export class fillRoles1530103501607 implements MigrationInterface {
  private generateData(): any[] {
    return [
      {name: RolesData.Admin},
      {name: RolesData.Manager},
      {name: RolesData.Developer}
    ]
  }


  public async up(queryRunner: QueryRunner): Promise<any> {
    const manager = queryRunner.manager;
    let rolesData = this.generateData();
    let roles: Role[] = plainToClass(Role, rolesData);
    return await manager.save(Role, roles);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const manager = queryRunner.manager;
    let rolesData = this.generateData();
    return await manager.delete(Role, {name: In(rolesData.map(item => item.name))});
  }

}
