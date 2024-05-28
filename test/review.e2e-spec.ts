import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { ReviewModel } from '../src/review/models';
import { disconnect, Types } from 'mongoose';
import * as request from 'supertest';

const productId = new Types.ObjectId();

const createTestReviewDto: ReviewModel = {
  name: "Test Review",
  description: "Test Review Description",
  rating: 4,
  title: "Test Review Title",
  productId
}

describe("AppController (e2e)", () => {
  let app: INestApplication;
  let createdTestId: string;

  beforeAll( async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();


  })

  it("/review/create (POST)", () => {
    return request(app.getHttpServer())
      .post("/review/create")
      .send(createTestReviewDto)
      .expect(201)
      .then(({body}: request.Response) => {
        createdTestId = body._id;
        expect(createdTestId).toBeDefined();
      })
  })

  it("/review/byProduct:productId (GET)", () => {
    return request(app.getHttpServer())
      .get(`/review/byProduct/${createTestReviewDto.productId}`)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
        expect(body[0]._id).toBe(createdTestId);
      })
  })

  it("/review/:id (delete)", () => {
    return request(app.getHttpServer())
      .delete("/review/" + createdTestId)
      .expect(200)
  })

  afterAll(() => {
    disconnect();
  })
})
