import {FakeCategoriesService} from './repositories/fakes/FakeCategoriesService'

describe('CategoriesService', () => {
  let categoriesService: FakeCategoriesService;

  beforeEach(async () => {
    categoriesService = new FakeCategoriesService()
  });

  it('should be able to list all categories', async () => {
    const createCategory1 = await categoriesService.create({name: 'Nodejs', description: 'Nodejs description'})
    const createCategory2 =await categoriesService.create({name: 'ReactJS', description: 'ReactJS description'})
    const categories = await categoriesService.findAll()

    expect(categories.length).toEqual(2)
    expect(categories).toEqual([createCategory1,createCategory2]);
  });
});
