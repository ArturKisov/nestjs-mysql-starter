import { Body, Controller, Get, HttpCode, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { AuthCredentDto } from "./dto/auth-credent.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post("signin")
    @HttpCode(202)
    async signIn(@Body() credent: AuthCredentDto): Promise<any> {
        return await this.authService.auth(credent);
    }

    @Post("signup")
    async signUp(@Body() user: CreateUserDto) {
        return await this.authService.register(user);
    }

    @Get("data")
    @UseGuards(AuthGuard("jwt"))
    findAll() {
        return {res: "data"};
    }
}
