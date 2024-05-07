import { Test, TestingModule } from '@nestjs/testing';
import { AdministrativeController } from './administrative.controller';
import { AdministrativeService } from './administrative.service';

describe('AdministrativeController', () => {
  let controller: AdministrativeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministrativeController],
      providers: [AdministrativeService],
    }).compile();

    controller = module.get<AdministrativeController>(AdministrativeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
