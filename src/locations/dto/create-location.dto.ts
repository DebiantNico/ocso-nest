import { ArrayNotEmpty, IsArray, IsString, MaxLength } from "class-validator";
import { Location } from '../entities/location.entity';

export class CreateLocationDto{
    @IsString()
    @MaxLength(50)
    locationName: string;
    @IsString()
    @MaxLength(100)
    locationAddress: string;
    @IsArray()
    @ArrayNotEmpty()
    locationLatLang: number[];
}
