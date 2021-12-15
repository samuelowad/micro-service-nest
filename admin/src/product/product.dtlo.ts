import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  image: string;
}
