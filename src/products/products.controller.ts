import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

interface Product {
  id: number;
  name: string;
  price: number;
}

@Controller('products')
export class ProductsController {
  private products: Product[] = []; 

  @Get()
  getAllProducts() {
    return this.products;
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    const product = this.products.find(p => p.id === +id);
    return product || `No product found with ID: ${id}`;
  }

  @Post()
  createProduct(@Body() productData: Omit<Product, 'id'>) {
    const newProduct: Product = { id: this.products.length + 1, ...productData };
    this.products.push(newProduct);
    return {
      message: 'Product created successfully',
      data: newProduct
    };
  }

  @Put(':id')
updateProduct(
  @Param('id') id: string,
  @Body() productData: Omit<Product, 'id'>
) {
  const productId = Number(id);

  if (isNaN(productId)) {
    return { message: `Invalid product ID: ${id}` };
  }

  const index = this.products.findIndex(p => p.id === productId);

  if (index === -1) {
    return { message: `Product with ID ${id} not found` };
  }

  this.products[index] = { id: productId, ...productData };

  return {
    message: `Product with ID ${id} updated successfully`,
    updatedData: this.products[index]
  };
}


  @Delete(':id')
deleteProduct(@Param('id') id: string) {
  const productId = Number(id);

  if (isNaN(productId)) {
    return { message: `Invalid product ID: ${id}` };
  }

  const index = this.products.findIndex(p => p.id === productId);

  if (index === -1) {
    return { message: `Product with ID ${id} not found` };
  }

  const deletedProduct = this.products.splice(index, 1)[0]; // remove product

  return {
    message: `Product with ID ${id} deleted successfully`,
    deletedData: deletedProduct
  };
}
}
