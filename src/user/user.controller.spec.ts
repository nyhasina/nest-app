import { Test } from '@nestjs/testing';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from './user.module';
import { UserController } from './user.controller';
import { User } from './user.model';
import { UserService } from './user.service';

describe('user', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        CoreModule,
        SharedModule,
        UserModule,
        AuthenticationModule
      ]
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });

  describe('Find all', function() {
    it('should return an array of users', async function() {
      const results: User[] = [{ id: 1, username: 'john.doe', password: 'password', email: 'john.doe@test.com' }];
      jest.spyOn(userService, 'find').mockImplementation(() => Promise.resolve(results));
      expect(await userController.findAll()).toBe(results);
    });
  });
});
