import { IsDefined, IsString, MaxLength, MinLength, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomMatchPasswords } from '../validator/custom-match-passwords.validator';

export class ResetPasswordDto {
    @IsString()
    @IsDefined()
    @MinLength(6)
    @MaxLength(50)
    @ApiProperty()
    readonly newPassword: string;

    @IsString()
    @IsDefined()
    @MinLength(6)
    @MaxLength(50)
    @Validate(CustomMatchPasswords, ['newPassword'])
    @ApiProperty()
    readonly confirmPassword: string;

    @IsString()
    @IsDefined()
    @ApiProperty()
    readonly token: string;
}