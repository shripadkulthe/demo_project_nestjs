import { Injectable, NotFoundException } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private nextId = 1; 

  // Get all products
  findAll(): Product[] {
    return this.products;
  }

  // Get one product
  findOne(id: number): Product {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

 // Create product
create(productData: Omit<Product, 'id'>): Product {
  if (typeof productData.price !== 'number' || isNaN(productData.price)) {
    throw new Error('Price must be a valid number');
  }
  
  const newProduct: Product = {
      id: this.nextId++, // assign sequential ID
      ...productData,
    };

    this.products.push(newProduct);
    return newProduct;
  }

// Update product
update(id: number, updatedProduct: Omit<Product, 'id'>): Product {
  if (typeof updatedProduct.price !== 'number' || isNaN(updatedProduct.price)) {
    throw new Error('Price must be a valid number');
  }
  const index = this.products.findIndex(p => p.id === id);
  if (index === -1) {
    throw new NotFoundException(`Product with ID ${id} not found`);
  }

  // Merge old product data with new data, keeping original id
  this.products[index] = { ...this.products[index], ...updatedProduct };
  return this.products[index];
}



  // Delete product
  remove(id: number): void {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    this.products.splice(index, 1);
  }
}
