import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import * as productsService from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: productsService.ProductsService) {}

  @Get()
  getAllProducts(): productsService.Product[] {
    return this.productsService.findAll();
  }

  @Get(':id')
  getProductById(@Param('id') id: string): productsService.Product {
    return this.productsService.findOne(+id);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    // Let the service handle the ID
    const createdProduct = this.productsService.create(createProductDto);

    // Return custom message with product info
    return {
      message: 'Product created successfully',
      id: createdProduct.id,
      name: createdProduct.name,
      price: createdProduct.price,
    };
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): productsService.Product {
    const existingProduct = this.productsService.findOne(+id);
    const updatedProduct: Omit<productsService.Product, 'id'> = {
      ...existingProduct,
      ...updateProductDto,
    };
    return this.productsService.update(+id, updatedProduct);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    this.productsService.remove(+id);
    return { message: `Product ${id} deleted successfully` };
  }
}
