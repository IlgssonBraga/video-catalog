import { ModelNotFoundExceptionFilter } from '../../exeption-filters/model-not-found.exception-filter';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import {Category} from '../entities/category.entity'

export interface ICategoriesRepository {
    create(createCategoryDto: CreateCategoryDto): Promise<Category>,
    findAll(): Promise<Category[]>
    findOne(id: number): Promise<Category | ModelNotFoundExceptionFilter>
    update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category | ModelNotFoundExceptionFilter>,
    remove(id: number): Promise<void | ModelNotFoundExceptionFilter>
}