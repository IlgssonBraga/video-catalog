import { CreateCategoryDto } from "../../dto/create-category.dto";
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
}