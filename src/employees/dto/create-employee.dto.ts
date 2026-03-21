import { IsEmail, IsOptional, IsString, MaxLength, IsInt } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    @MaxLength(50)
    name: string;

    @IsString()
    @MaxLength(70)
    lastName: string;

    @IsString()
    @MaxLength(15)
    phoneNumber: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString() 
    @IsOptional() 
    photoUrl?: string;

    @IsInt() 
    locationId: number; 
    
    @IsString() 
    userId: string;
}