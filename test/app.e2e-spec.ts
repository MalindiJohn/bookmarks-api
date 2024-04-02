import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import * as pactum from 'pactum';
import { AuthDto } from 'src/auth/dto';

describe('App e2e', () => {

  let app: INestApplication;

  let prisma: PrismaService;

  beforeAll(async () => {

    const moduleRef = await Test.createTestingModule({

      imports: [AppModule]

    }).compile();

    //initialize nest app
    app = moduleRef.createNestApplication();

    //include global pipes
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );


    await app.init();

    await app.listen(3000);

    prisma = app.get(PrismaService);

    await prisma.cleanDb();

    //set base url
    pactum.request.setBaseUrl('http://localhost:3000');

  });

  //when all the test are done
  //close the app
  afterAll(() => {
    app.close();
  })

  // it.todo('should pass');

  //tests for Auth module
  describe('Auth', () => {

    //the body
    const dto: AuthDto = {
      email: 'malindi@gmail.com',
      password: 'password'
    }

    //sign up
    describe('Signup', () => {

      //should throw an exception if email empty
      it("Should throw error when email is empty", async () => {

        return pactum.spec().post('/auth/signup')
          .withBody({ ...dto, email: '' }).expectStatus(400)
      })

      //should throw an exception if password empty
      it("Should throw error when password is empty", async () => {

        return pactum.spec().post('/auth/signup')
          .withBody({ ...dto, password: '' }).expectStatus(400)
      })

      //should throw an exception if no body
      it("Should throw error when no body provided", async () => {

        return pactum.spec().post('/auth/signup').expectStatus(400)
      })


      it('Should sign up a user with valid credentials', () => {

        return pactum.spec().
          post('/auth/signup').
          withBody(dto).expectStatus(201);
      });
    })

    //sign in
    describe('Signin', () => {

      //should throw an exception if email empty
      it("Should throw error when email is empty", async () => {

        return pactum.spec().post('/auth/login')
          .withBody({ ...dto, email: '' }).expectStatus(400)
      })

      //should throw an exception if password empty
      it("Should throw error when password is empty", async () => {

        return pactum.spec().post('/auth/login')
          .withBody({ ...dto, password: '' }).expectStatus(400)
      })

      //should throw an exception if no body
      it("Should throw error when no body provided", async () => {

        return pactum.spec().post('/auth/login').expectStatus(400)
      })

      it('Should return an access token if user signs in correctly', () => {

        return pactum.spec().post('/auth/login')
          .withBody(dto).expectStatus(200).stores('userAt', 'access_token');
      });
    })
  });

  //tests for user module
  describe('User', () => {

    //get user
    describe('Get user', () => {

      it('Should get the logged-in user info', () => {

        return pactum.spec().get('/users/profile')
          .withHeaders({ Authorization: `Bearer $S{userAt}`, })
          .expectStatus(200)
      })
    })

    //edit user
    describe('Edit user', () => {

    })
  })

  //tests for bookmarks module
  describe("Bookmarks", () => {

    //create bookmark
    describe('Create bookmark', () => {

    })

    //get bookmarks
    describe('Get bookmarks', () => {

    })

    //get bookmark by id
    describe('Get bookmark by id', () => {

    })

    //edit bookmark
    describe('Edit bookmark by id', () => {

    })

    //create bookmark
    describe('Delete bookmark by id', () => {

    })

  })

});