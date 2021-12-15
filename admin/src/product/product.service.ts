import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './product.dtlo';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async create(productDto: ProductDto): Promise<Product> {
    // console.log(productDto);

    return this.productRepository.save(productDto);
  }

  async getOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ id });
  }

  async update(id: number, productDto: ProductDto): Promise<any> {
    return this.productRepository.update(id, productDto);
  }

  async delete(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`product with id ${id} not found`);
    }
  }
}
