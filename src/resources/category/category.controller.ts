import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryVm } from 'src/commons/viewmodels/category.vm';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const product = await this.categoryService.create(createCategoryDto);

    return new CategoryVm(product);
  }

  @Get()
  async findAll() {
    const products = await this.categoryService.findAll();

    return products.map(product => new CategoryVm(product))
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.categoryService.findOne(+id);

    return new CategoryVm(product)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const product = await this.categoryService.update(+id, updateCategoryDto);

    return new CategoryVm(product);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(+id);

    throw new HttpException("La catégorie a été supprimée", HttpStatus.NO_CONTENT)
  }
}
