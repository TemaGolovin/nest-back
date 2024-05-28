import { ReviewService } from './review.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Types } from 'mongoose';

describe('ReviewService', () => {
  let service: ReviewService;

  const exec = {exec: jest.fn()}
  const reviewRepositoryFactory = () => ({
    find: () => exec
   })

  beforeEach(async  () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          useFactory: reviewRepositoryFactory,
          provide: getModelToken("ReviewModel")
        }
      ]
    }).compile()

    service = module.get(ReviewService);
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('findByProduct', async () => {
    const id = new Types.ObjectId().toHexString()
    reviewRepositoryFactory().find().exec.mockResolvedValueOnce([{productId: id}]);
    const res = await service.getAllByProductId(id);
    expect(res[0].productId).toBe(id)
  })
})
