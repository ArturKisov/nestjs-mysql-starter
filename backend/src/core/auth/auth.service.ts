import * as jwt from 'jsonwebtoken';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { JwtPayload } from './interafaces/jwt-payload.interface';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthCredentDto } from './dto/auth-credent.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {
    }

    async register(userData: CreateUserDto) {
        return await this.userService.create(userData).then(user => {
            const token = this.createToken(user);
            return {
                Token: token,
                User: user
            }
        })
    }

    async auth(cred: AuthCredentDto) {
        return await this.userService.findOneByUsername(cred.username, true).then(async (user) => {
            let match = await bcrypt.compare(cred.password, user.password)
            if (match) {
                return {
                    Token: this.createToken(user),
                    User: await this.userService.findById(user.id),
                }
            } else {
                throw new HttpException('Password or username is not validate', HttpStatus.FORBIDDEN);
            }
        })
    }

    createToken(payload: JwtPayload) {
        const expiresIn = 3600;
        const createTokenDate = new Date().getTime();
        const expiresTokenDate = createTokenDate + expiresIn;
        const accessToken = jwt.sign({username: payload.username}, process.env.SECRET_KEY, {expiresIn: expiresIn});
        return {
            createTokenDate,
            expiresTokenDate,
            accessToken
        };
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.userService.findOneByUsername(payload.username, false, true);
    }
}
