import { Column, Entity, ManyToOne, IsNull, PrimaryGeneratedColumn } from 'typeorm';
import { Provider } from 'src/providers/entities/provider.entity';

@Entity()
export class Product {
@PrimaryGeneratedColumn('uuid')
productId: string;
@Column("text")
productName: string;
@Column( "float")
price: number;
@Column("int")
countSeal: number;
@ManyToOne(() => Provider, (provider) => provider.products, {
        eager: true
    })
provider: Provider;
}
