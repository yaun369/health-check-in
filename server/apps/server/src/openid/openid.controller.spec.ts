import { Test, TestingModule } from '@nestjs/testing';
import { OpenidController } from './openid.controller';

describe('Openid Controller', () => {
  let controller: OpenidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenidController],
    }).compile();

    controller = module.get<OpenidController>(OpenidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
