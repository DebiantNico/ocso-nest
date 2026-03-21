import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  create(createProviderDto: CreateProviderDto) {
    const provider = this.providerRepository.create(createProviderDto);
    return this.providerRepository.save(provider);
  }

  findAll() {
    return this.providerRepository.find();
  }

  async findOne(id: string) {
    const provider = await this.providerRepository.findOneBy({
      providerId: id,
    });
    
    if (!provider) {
      throw new NotFoundException();
    }
    
    return provider;
  }

  findOneByName(name: string) {
    const provider = this.providerRepository.findBy({
      providerName: Like(`%${name}%`),
    });
    if (!provider) throw new NotFoundException(`Proveedor con nombre ${name} no encontrado`);
    return provider;
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const providerToUpdate = await this.providerRepository.preload({
      providerId: id,
      ...updateProviderDto,
    });

    if (!providerToUpdate) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado para actualizar`);
    }

    return this.providerRepository.save(providerToUpdate);
  }

  async remove(id: string) {
    const provider = await this.findOne(id);
    await this.providerRepository.delete(id);
    return {
      message: "Proveedor eliminado correctamente",
      provider
    };
  }
}