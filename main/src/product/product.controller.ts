import { Controller, Get, Param, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async all() {
    return this.productService.all();
  }

  @EventPattern('product_created')
  async createProduct(product: any) {
    // console.log(typeof product);

    await this.productService.create({
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes,
    });
  }

  @EventPattern('product_updated')
  async productUpdate(product: any) {
    // console.log(typeof product);

    await this.productService.update(product.id, {
      id: product.id,
      title: product.title,
      image: product.image,
      likes: product.likes,
    });
  }

  @EventPattern('product_deleted')
  async productDelete(id: number) {
    // console.log(typeof product);

    await this.productService.delete(id);
  }

  @Post('/:id/like')
  async like(@Param('id') id: number) {
    const product = await this.productService.findOne(id);

    return this.productService.update(id, { likes: product.likes + 1 });
  }
}
