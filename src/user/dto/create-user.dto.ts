import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'exemplo@email.com', description: 'Endereço de e-mail do usuário' })
    @IsString()
    email: string;

    @ApiProperty({ example: 'João Silva', description: 'Nome do usuário' })
    @IsString()
    name: string;
}
