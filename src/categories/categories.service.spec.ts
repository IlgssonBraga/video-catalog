import { ModelNotFoundExceptionFilter } from '../exeption-filters/model-not-found.exception-filter';
import {FakeCategoriesService} from './repositories/fakes/FakeCategoriesService'

describe('CategoriesService', () => {
  let categoriesService: FakeCategoriesService;

  beforeEach(async () => {
    categoriesService = new FakeCategoriesService()
  });

  it('should be able to create a category', async () => {
    const category = await categoriesService.create({name: 'Nodejs', description: 'Nodejs description'})
    
    expect(category).toMatchObject({
      name: 'Nodejs',
      description: 'Nodejs description'
    });
    expect(category).toHaveProperty('id');
    expect(category).toHaveProperty('created_at');
    expect(category).toHaveProperty('updated_at');
  });

  it('should be able to list all categories', async () => {
    const createCategory1 = await categoriesService.create({name: 'Nodejs', description: 'Nodejs description'})
    const createCategory2 =await categoriesService.create({name: 'ReactJS', description: 'ReactJS description'})
    const categories = await categoriesService.findAll()

    expect(categories.length).toEqual(2)
    expect(categories).toEqual([createCategory1,createCategory2]);
  });

  it('should be able to list one category passing right id', async () => {
    const createCategory = await categoriesService.create({name: 'Nodejs', description: 'Nodejs description'})
    
    const category = await categoriesService.findOne(createCategory.id)

    expect(category).toMatchObject({
      name: 'Nodejs',
      description: 'Nodejs description'
    });


  });

  it('should be able return error passing wrong id when doing get by id', async () => {

    expect(await categoriesService.findOne(1)).toBeInstanceOf(ModelNotFoundExceptionFilter)

  });
});
