import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { last } from 'rxjs';
import e from 'express';

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[] = [{
    id: 1,
    name: 'John Doe',
    lastName: 'Doe',
    phoneNumber: '1234567890',
  },
{
    id: 2,
    name: 'Jane Smith',
    lastName: 'Smith',
    phoneNumber: '0987654321',
}
]
create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length + 1;  
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees.filter((employee) => employee.id === id)[0];
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
  let employeeToUpdate = this.findOne(id);
  employeeToUpdate = {
    ...employeeToUpdate, 
    ...updateEmployeeDto
  };
  this.employees = this.employees.map((employee) => {
    if (employee.id === id) {
      employee = employee;
    }
    return employee;
  })
  return employeeToUpdate ;
  }

  remove(id: number) { 
    this.employees.filter((employee) => employee.id !== id);
    return this.employees;
  }
}
