import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { ModelNotFoundExceptionFilter } from '../exeption-filters/model-not-found.exception-filter';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() {name, description}: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create({name, description});
  }

  @Get()
  findAll(): Promise<Category[]>  {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category | ModelNotFoundExceptionFilter> {
    return this.categoriesService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category | ModelNotFoundExceptionFilter> {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string): Promise<void | ModelNotFoundExceptionFilter> {
    return this.categoriesService.remove(+id);
  }
}
