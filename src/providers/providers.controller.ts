import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { UserData } from '../auth/decorators/user.decorator';
import { User } from '../auth/entities/user.entity';
import { Auth } from '../auth/decorators/auth.decorator';
import { ROLES } from '../auth/constants/roles.constants';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Auth(ROLES.MANAGER)
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get()
  findAll(@UserData() user: User) {
    return this.providersService.findAll();
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get('/name/:name')
  findByName(@Param('name') name: string) {
    return this.providersService.findOneByName(name);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.providersService.findOne(id);
  }

  @Auth(ROLES.MANAGER)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateProviderDto: UpdateProviderDto
  ) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.providersService.remove(id);
  }
}