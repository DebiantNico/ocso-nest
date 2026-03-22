import { Manager } from "src/managers/entities/manager.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Region } from "src/regions/entities/region.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  locationId: number;

  @Column('text')
  @ApiProperty({
    default: "OCSO Juriquilla"
  })
  locationName: string;

  @Column('text')
  @ApiProperty({
    default: "Avenida Tal, S/N, 76220"
  })
  locationAddress: string;

  @Column('simple-array')
  @ApiProperty({
    default: [12, 12]
  })
  locationLatLng: number[];

  @OneToOne(() => Manager,{
  eager: true,
})
  @JoinColumn({ 
    name: "managerId" 
  })
  
  manager: Manager;
  @ManyToOne(() => Region, (region) => region.locations)
  @JoinColumn({
    name: "regionId"
  })
  region: Region;

  @OneToMany(() => Employee, (employee) => employee.location)
  employees: Employee[];
}