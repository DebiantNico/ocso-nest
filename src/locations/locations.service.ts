import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>
  ) {}
  async create(createLocationDto: CreateLocationDto) {
    const location = this.locationRepository.create(createLocationDto);
    return this.locationRepository.save(location);
  }

  findAll() {
    return this.locationRepository.find()
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOneBy({
      locationId: id,
    })
    if (!location) throw new NotFoundException(`Location not found`);
    return location;
  }
 
 async update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto,
    })
    if (!location) throw new NotFoundException(`Location not found`);
    return this.locationRepository.save(location);
  }

  remove(id: number) {
    return this.locationRepository.delete({
      locationId: id,
    })
  }
}
