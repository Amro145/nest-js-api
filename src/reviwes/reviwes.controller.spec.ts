import { Test, TestingModule } from '@nestjs/testing';
import { ReviwesController } from './reviwes.controller';
import { ReviwesService } from './reviwes.service';

describe('ReviwesController', () => {
  let controller: ReviwesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviwesController],
      providers: [ReviwesService],
    }).compile();

    controller = module.get<ReviwesController>(ReviwesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
