import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Location } from "src/locations/entities/location.entity";
import { User } from "src/auth/entities/user.entity";

@Entity()
export class Employee {
    @PrimaryGeneratedColumn('uuid')
    employeeId: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @Column({ type: 'text' })
    employeeName: string;

    @Column({ type: 'text' })
    employeeLastName: string;

    @Column({ type: 'text' })
    employeePhoneNumber: string;

    @Column({ type: 'text', unique: true })
    employeeEmail: string;

    @Column({ type: 'text', nullable: true })
    employeePhoto: string;

    @ManyToOne(() => Location, (location) => location.employees)
    @JoinColumn({
    name: "locationId"
})
location: Location;

}
