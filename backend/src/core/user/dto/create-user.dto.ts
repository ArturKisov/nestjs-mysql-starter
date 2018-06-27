export class CreateUserDto {
    readonly username: string;
    readonly password: string;
    readonly fullname?: string;
}
