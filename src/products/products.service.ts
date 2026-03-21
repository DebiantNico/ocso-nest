import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

create(createProductDto: CreateProductDto) {
    const { provider, ...createData } = createProductDto;
    const product = this.productRepository.create({
      ...createData,
      ...(provider && { provider: { providerId: provider } }),
    });
    return this.productRepository.save(product); 
  }


  findAll() {
    return this.productRepository.find({
      loadEagerRelations: true,
      relations: {
        provider: true,
      },
    });
  }

async findOne(id: string) {
    const product = await this.productRepository.findOneBy({
      productId: id,
    });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  findByProvider(id: string) {
    return this.productRepository.findBy({
      provider: {
        providerId: id,
      }
    })
  }

async update(id: string, updateProductDto: UpdateProductDto) {
  const product = await this.findOne(id);  
  Object.assign(product, updateProductDto);
  return this.productRepository.save(product);
}

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.delete(id);
    return product;
  }
}