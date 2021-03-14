import { Test, TestingModule } from '@nestjs/testing';
import { getRepository } from 'typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    categoriesService = new CategoriesService(getRepository(Category));
    categoriesController = new CategoriesController(categoriesService)
  });

  it('should return all categories', async () => {
    const result: Category[] = [new Category(), new Category()]
      jest.spyOn(categoriesService, 'findAll').mockImplementation(async () => result);

      expect(await categoriesController.findAll()).toBe(result);
  });
});
