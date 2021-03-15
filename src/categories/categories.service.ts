import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelNotFoundExceptionFilter } from '../exeption-filters/model-not-found.exception-filter';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import {ICategoriesRepository} from './repositories/ICategoriesRepository'

@Injectable()
export class CategoriesService implements ICategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create({name, description}: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create({name, description})

    await this.categoryRepository.save(category)

    return category
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findOne(id: number): Promise<Category | ModelNotFoundExceptionFilter> {
    const category = await this.categoryRepository.findOneOrFail(id)
    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category | ModelNotFoundExceptionFilter> {
    await this.categoryRepository.findOneOrFail(id)

    await this.categoryRepository.update(id, updateCategoryDto)

    const categoryUpdated = await this.categoryRepository.findOneOrFail(id)

    return categoryUpdated
  }

  async remove(id: number): Promise<void | ModelNotFoundExceptionFilter> {
    await this.categoryRepository.findOneOrFail(id)
    this.categoryRepository.delete(id)
  }
}
