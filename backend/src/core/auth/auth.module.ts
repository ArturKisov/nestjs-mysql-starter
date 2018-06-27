import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";

@Module({
    controllers: [ AuthController ],
    imports: [ UserModule ],
    providers: [ AuthService, JwtStrategy ]
})
export class AuthModule {
}
