import { Test, TestingModule } from '@nestjs/testing';
import { AdministrativeService } from './administrative.service';

describe('AdministrativeService', () => {
  let service: AdministrativeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdministrativeService],
    }).compile();

    service = module.get<AdministrativeService>(AdministrativeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
