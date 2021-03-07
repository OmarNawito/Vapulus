import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class CreateRoleDto {
    @IsString()
    @MinLength(3)
    @MaxLength(10)
    @IsNotEmpty()
    roleName: string;
}
