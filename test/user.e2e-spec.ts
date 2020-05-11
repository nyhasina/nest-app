import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthenticationModule } from '../src/authentication/authentication.module';
import { JwtAuthGuard } from '../src/authentication/guards/jwt-auth.guard';
import { CoreModule } from '../src/core/core.module';
import { ResponseInterceptor } from '../src/core/interceptors/response.interceptor';
import { SharedModule } from '../src/shared/shared.module';
import { UserModule } from '../src/user/user.module';
import { UserService } from '../src/user/user.service';

export class JwtMockGuard {
}

describe('User', () => {
  let app: INestApplication;
  const userService = {
    find: () => [{
      id: 1,
      username: 'john.doe',
      email: 'john.doe@test.com',
      password: 'password',
    }],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CoreModule, SharedModule, UserModule, AuthenticationModule],
    })
                                .overrideProvider(UserService)
                                .useValue(userService)
                                .overrideGuard(JwtAuthGuard)
                                .useClass(JwtMockGuard)
                                .compile();
    app = moduleRef.createNestApplication();
    app.useGlobalInterceptors(new ResponseInterceptor());
    await app.init();
  });

  it('GET /user', function() {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
      .expect({ statusCode: 200, data: userService.find() });
  });

  afterAll(async () => {
    await app.close();
  });
});
