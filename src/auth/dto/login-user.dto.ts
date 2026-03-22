import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({
    default: "user@gmail.com"
  })
  @IsEmail()
  userEmail: string;

  @ApiProperty({
    default: "232131fe4231"
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  userPassword: string;
}