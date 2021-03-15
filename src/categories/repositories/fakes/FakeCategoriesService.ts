import { ModelNotFoundExceptionFilter } from "../../../exeption-filters/model-not-found.exception-filter";
import { CreateCategoryDto } from "../../dto/create-category.dto";
import { UpdateCategoryDto } from "../../dto/update-category.dto";
import { Category } from "../../entities/category.entity";
import { ICategoriesRepository } from "../ICategoriesRepository";

export class FakeCategoriesService implements ICategoriesRepository {
    private categories: Category[] = [];
    async findAll(): Promise<Category[]> {
        return this.categories
    }

    async create({name, description}: CreateCategoryDto): Promise<Category>{
        const category: Category = {
            id: this.categories.length + 1,
            name,
            description,
            created_at: new Date(),
            is_active: false,
            updated_at: new Date()
        }

        this.categories.push(category)

        return category
    }

    async findOne(id: number): Promise<Category> {
        const category = this.categories.find(category => category.id === id)

        if(!category){
            new ModelNotFoundExceptionFilter()
        }

        return category
    }

    async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const category = this.categories.find(category => category.id === id)

        if(!category){
            new ModelNotFoundExceptionFilter()
        }

        const indexCategory = this.categories.indexOf(category)

        Object.assign(this.categories[indexCategory], updateCategoryDto)

        const categoryUpdated = this.categories.find(category => category.id === id)

        if(!categoryUpdated){
            new ModelNotFoundExceptionFilter()
        }

        return categoryUpdated
    }

    async remove(id: number): Promise<void> {
        const category = this.categories.find(category => category.id === id)

        if(!category){
            new ModelNotFoundExceptionFilter()
        }

        this.categories = this.categories.filter(category => category.id !== id)
    }
}