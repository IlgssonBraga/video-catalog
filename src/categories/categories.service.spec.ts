import { ModelNotFoundExceptionFilter } from '../exeption-filters/model-not-found.exception-filter';
import {FakeCategoriesService} from './repositories/fakes/FakeCategoriesService'

describe('CategoriesService', () => {
  let categoriesService: FakeCategoriesService;

  beforeEach(async () => {
    categoriesService = new FakeCategoriesService()
  });

  it('should be able to create a category.', async () => {
    const category = await categoriesService.create({name: 'Nodejs', description: 'Nodejs description'})
    
    expect(category).toMatchObject({
      name: 'Nodejs',
      description: 'Nodejs description'
    });
    expect(category).toHaveProperty('id');
    expect(category).toHaveProperty('created_at');
    expect(category).toHaveProperty('updated_at');
  });

  it('should be able to list all categories.', async () => {
    const createCategory1 = await categoriesService.create({name: 'Nodejs', description: 'Nodejs description'})
    const createCategory2 =await categoriesService.create({name: 'ReactJS', description: 'ReactJS description'})
    const categories = await categoriesService.findAll()

    expect(categories.length).toEqual(2)
    expect(categories).toEqual([createCategory1,createCategory2]);
  });

  it('should be able to list one category.', async () => {
    const createCategory = await categoriesService.create({name: 'Nodejs', description: 'Nodejs description'})
    
    const category = await categoriesService.findOne(createCategory.id)

    expect(category).toMatchObject({
      name: 'Nodejs',
      description: 'Nodejs description'
    });


  });

  it('should not be able list a nonexistent category.', async () => {

    expect(await categoriesService.findOne(1)).toBeInstanceOf(ModelNotFoundExceptionFilter)

  });

  it('should be able update a category.', async () => {
    const createCategory = await categoriesService.create({name: 'Nodejs', description: 'Nodejs description'})

    await categoriesService.update(createCategory.id, {name: 'Nodejs Updated', description: 'Nodejs description Updated'})
    
    const category = await categoriesService.findOne(createCategory.id)

    expect(category).toMatchObject({name: 'Nodejs Updated', description: 'Nodejs description Updated'})

  });

  it('should not be able update a nonexistent category.', async () => {
    
    expect(await categoriesService.update(10, {name: 'Nodejs Updated', description: 'Nodejs description Updated'})).toBeInstanceOf(ModelNotFoundExceptionFilter)

  });

  it('should be able delete a category.', async () => {
    const createCategory = await categoriesService.create({name: 'Nodejs', description: 'Nodejs description'})

    await categoriesService.remove(createCategory.id)    
    
    expect(await categoriesService.remove(createCategory.id)).toBeInstanceOf(ModelNotFoundExceptionFilter)

  });

  it('should not be able delete a nonexistent category.', async () => {   
    
    expect(await categoriesService.remove(10)).toBeInstanceOf(ModelNotFoundExceptionFilter)

  });
});
