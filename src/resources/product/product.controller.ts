import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductVm } from 'src/commons/viewmodels/product.vm';

@Controller('productS')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create(createProductDto);

    return new ProductVm(product);
  }

  @Get()
  async findAll() {
    const products = await this.productService.findAll();

    return products.map(product => new ProductVm(product))
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(+id);

    return new ProductVm(product)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productService.update(+id, updateProductDto);

    return new ProductVm(product);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productService.remove(+id);

    throw new HttpException("Le produit a été supprimé", HttpStatus.NO_CONTENT)
  }
}
