import { IsEmail, IsIn, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {
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

  @ApiPropertyOptional({
    default: ["Employee"]
  })
  @IsOptional()
  @IsIn(["Admin", "Employee", "Manager"], { each: true })
  userRoles: string[];
}