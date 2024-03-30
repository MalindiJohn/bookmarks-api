/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';


describe('App e2e', () => {

  let app: INestApplication;

  beforeAll(async () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const moduleRef = await  Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    
    app = moduleRef.createNestApplication();

    //global pipe for validations
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, //remove not defined fields in dto
      }),
    );

    await app.init();
    
  });

  afterAll(() => {
    app.close();
  });

  it.todo('should pass')
});