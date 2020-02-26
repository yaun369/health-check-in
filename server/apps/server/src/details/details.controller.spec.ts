import { Test, TestingModule } from '@nestjs/testing';
import { DetailsController } from './details.controller';

describe('Details Controller', () => {
  let controller: DetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetailsController],
    }).compile();

    controller = module.get<DetailsController>(DetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
