import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { DatabaseService } from '../database/database.service';

import { Prisma, Product, Availability } from '@prisma/client';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productService: ProductsService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, DatabaseService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    databaseService = module.get<DatabaseService>(DatabaseService);
    productService = module.get<ProductsService>(ProductsService);
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const createProductDto: Prisma.ProductCreateInput = {
        name: 'Sample Product',
        price: 29.99,
        sale: false,
        availability: Availability.IN_STORE,
        // Add other fields as needed based on your schema
      };

      const mockCreatedProduct: Product = {
        id: 1,
        name: 'Sample Product',
        price: 29.99,
        sale: false,
        availability: Availability.IN_STORE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(productService, 'create').mockImplementation(async () => {
        return mockCreatedProduct;
      });

      const result = await controller.create(createProductDto);

      expect(result).toEqual(mockCreatedProduct);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Sample Product 1',
          price: 19.99,
          sale: false,
          availability: Availability.ONLINE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more mock products as needed
      ];

      jest.spyOn(productService, 'findAll').mockImplementation(async () => {
        return mockProducts;
      });

      const result = await controller.findAll();

      expect(result).toEqual(mockProducts);
    });
  });

  // Similar test cases for findOne, update, and remove methods...

  afterEach(() => {
    jest.clearAllMocks();
  });
});
