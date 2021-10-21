import { Test, TestingModule } from '@nestjs/testing';
import { MaplifyController } from './maplify.controller';
import { MaplifyService } from './maplify.service';

describe('MaplifyController', () => {
  let controller: MaplifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaplifyController],
      providers: [MaplifyService],
    }).compile();

    controller = module.get<MaplifyController>(MaplifyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
