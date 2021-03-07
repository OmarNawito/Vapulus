import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateRoomDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsBoolean()
    isUser: boolean;

    @IsBoolean()
    isPrivate: boolean;
}
