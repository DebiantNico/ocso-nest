import { IsNumber, IsArray, IsString, MaxLength, ArrayNotEmpty, IsObject, IsOptional } from "class-validator";
import { Location } from '../entities/location.entity';
import { Region } from 'src/regions/entities/region.entity';

export class CreateLocationDto{
    @IsString()
    @MaxLength(50)
    locationName: string;
    @IsString()
    @MaxLength(100)
    locationAddress: string;
    @IsArray()
    @ArrayNotEmpty()
    locationLatLng: number[];
    @IsObject()
    @IsOptional()
    region: Region;
}
