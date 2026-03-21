import { IsEmail, IsString, MinLength, IsOptional, IsArray, IsEnum } from "class-validator";
import { User } from "../entities/user.entity";
export class CreateUserDto {
  @IsEmail()
  userEmail: string;

  @IsString()
  @MinLength(8)
  userPassword: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  userRoles: string[];
} 