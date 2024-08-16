import { NotFoundException } from '@nestjs/common';
import { GetUserUsecase } from './usecase/get.usecase';
import { UpdateUserUsecase } from './usecase/update.usecase';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;
  let updateUsecase: UpdateUserUsecase;
  let getUsecase: GetUserUsecase;

  beforeEach(() => {
    updateUsecase = new UpdateUserUsecase();
    getUsecase = new GetUserUsecase();
    userController = new UserController(updateUsecase, getUsecase);
  });

  describe('Get User Data', () => {
    it('should return an user object', async () => {
      const result = {
        id: 1,
        username: 'username',
        password: 'password',
        name: 'name',
      };
      jest
        .spyOn(getUsecase, 'execute')
        .mockImplementation(() => Promise.resolve(result));

      expect(
        await getUsecase.execute({
          id: 1,
          username: 'username',
          password: 'password',
          name: 'name',
        }),
      ).toBe(result);
    });
  });

  describe('Get Not Exist User Data', () => {
    it('should throw NotFoundException', async () => {
      jest
        .spyOn(getUsecase, 'execute')
        .mockImplementation(() =>
          Promise.reject(new NotFoundException('User not found')),
        );

      await expect(
        getUsecase.execute({
          id: 9999,
          username: 'username',
          password: 'password',
          name: 'name',
        }),
      ).rejects.toThrow(new NotFoundException('User not found'));
    });
  });

  describe('Update user data success', () => {
    it('should return update user object', async () => {
      const result = {
        id: 1,
        username: 'username',
        password: 'password',
        name: 'nameupdate',
      };
      jest
        .spyOn(updateUsecase, 'execute')
        .mockImplementation(() => Promise.resolve(result));

      expect(
        await updateUsecase.execute(
          {
            name: 'nameupdate',
            password: 'password',
          },
          {
            id: 1,
            username: 'username',
            password: 'password',
            name: 'name',
          },
        ),
      ).toBe(result);
    });
  });
});
