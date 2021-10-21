import { Test, TestingModule } from '@nestjs/testing';
import { MaplifyService } from './maplify.service';

describe('MaplifyService', () => {
  let service: MaplifyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaplifyService],
    }).compile();

    service = module.get<MaplifyService>(MaplifyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
