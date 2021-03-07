import { IsEmail, IsMongoId, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Role } from "src/roles/schemas/role.schema";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    lastName: string;

    @IsMongoId()
    @IsNotEmpty()
    role: Role
}