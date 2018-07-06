import * as bcrypt from 'bcryptjs';
import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity, ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { Role } from '../role/role.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true
    })
    username: string;

    @Column({
        select: false
    })
    password: string;

    @Column({
        nullable: true
    })
    fullname: string;

    @ManyToOne(type => Role)
    role: Role;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async passwordToHash() {
        this.password = await bcrypt.hash(this.password, 10)
    }
}