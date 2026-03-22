import { Column, Entity, PrimaryGeneratedColumn, OneToOne} from "typeorm";
import { Manager } from "src/managers/entities/manager.entity";
import { Employee } from "src/employees/entities/employee.entity";

@Entity()
export class User {
@PrimaryGeneratedColumn('uuid')
userId: string;
@Column('text', { 
    unique: true })
userEmail: string;
@Column('text')
userPassword: string;
@Column('simple-array', { 
default: ['Employee'] 
})
userRoles: string[];
@OneToOne(() => Manager)
manager: Manager;
@OneToOne(() => Employee)
employee: Employee;
}