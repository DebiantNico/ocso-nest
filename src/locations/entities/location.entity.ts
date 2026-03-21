import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: string;
    @Column('text')
    locationName: string;
    @Column('text')
    locationAddress: string;
    @Column('array')
    locationLatLang: number[];
}
