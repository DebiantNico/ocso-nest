import { IsEmail, IsOptional, IsString, MaxLength, IsObject } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateEmployeeDto {
    @ApiProperty()
    @IsString()
    @MaxLength(50)
    employeeName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(70)
    employeeLastName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(15)
    employeePhoneNumber: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    employeeEmail: string;

    @ApiPropertyOptional()
    @IsString() 
    @IsOptional() 
    employeePhoto?: string;

    // Ya solo usa ApiPropertyOptional normal
    @ApiPropertyOptional()
    @IsObject()
    @IsOptional()
    location: any;

    @ApiPropertyOptional()
    @IsObject()
    @IsOptional()
    user: any; 
}