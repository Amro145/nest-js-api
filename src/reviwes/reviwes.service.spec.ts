import { Test, TestingModule } from '@nestjs/testing';
import { ReviwesService } from './reviwes.service';

describe('ReviwesService', () => {
  let service: ReviwesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviwesService],
    }).compile();

    service = module.get<ReviwesService>(ReviwesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
