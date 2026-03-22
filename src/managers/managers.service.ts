import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager)
    private managerRepository: Repository<Manager>,
  ) {}

  create(createManagerDto: CreateManagerDto) {
    const manager = this.managerRepository.create(createManagerDto as any);
    return this.managerRepository.save(manager);
  }

  findAll() {
    return this.managerRepository.find();
  }

  async findOne(id: string) {
    const manager = await this.managerRepository.findOneBy({
      managerId: id,
    });
    if (!manager) throw new NotFoundException('Manager not found');
    return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const managerToUpdate = await this.managerRepository.preload({
      managerId: id,
      ...updateManagerDto as any,
    });
    if (!managerToUpdate) {throw new NotFoundException();
      
    }
    return this.managerRepository.save(managerToUpdate);
  }

  async remove(id: string) {
    await this.managerRepository.delete({
      managerId: id,
    });
    return {
      message: 'Manager deleted',
    };
  }
}