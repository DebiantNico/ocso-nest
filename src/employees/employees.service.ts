import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    const employee = this.employeeRepository.create(createEmployeeDto as any);
    return this.employeeRepository.save(employee);
  }

  findAll() {
    return this.employeeRepository.find({
      relations: ['location', 'user']
    });
  }

  findByLocation(id: number) {
    return this.employeeRepository.findBy({
        location: {
          locationId: id,
        },
    })
  }


  async findOne(id: string) {
    const employee = await this.employeeRepository.findOneBy({
      employeeId: id,
    });
    if (!employee) throw new NotFoundException();
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto as any,
    });
    if (!employeeToUpdate){
      throw new NotFoundException();
    }
    return this.employeeRepository.save(employeeToUpdate);
  }

  async remove(id: string) {
    await this.employeeRepository.delete({
      employeeId: id
    })
    return {
      message: "Employee deleted"
    };
  }
}
