import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
  Delete,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductDto } from './product.dtlo';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(
    private productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}
  @Get()
  all() {
    return this.productService.all();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() productDto: ProductDto) {
    // console.log(productDto);

    const prod = await this.productService.create(productDto);
    this.client.emit('product_created', prod);

    return prod;
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.productService.getOne(id);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  async update(@Param('id') id: number, @Body() productDto: ProductDto) {
    await this.productService.update(id, productDto);
    const prod = await this.productService.getOne(id);
    this.client.emit('product_updated', prod);
    return prod;
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    await this.productService.delete(id);
    this.client.emit('product_deleted', id);
    return;
  }
}
