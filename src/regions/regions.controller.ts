import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Auth } from 'srs/auth/decorators/auth.decorator';
import { ROLES } from 'srs/auth/constants/roles.constants';
import { Employee } from '../employees/entities/employee.entity';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Auth
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionsService.create(createRegionDto);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get()
  findAll() {
    return this.regionsService.findAll();
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(+id);
  }

  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(+id, updateRegionDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionsService.remove(+id);
  }
}
