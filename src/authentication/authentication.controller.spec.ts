import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { RegisterUsecase } from './usecase/register.usecase';
import { LoginUsecase } from './usecase/login.usecase';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let authenticationController: AuthenticationController;
  let registerUsecase: RegisterUsecase;
  let loginUsecase: LoginUsecase;
  let jwtService: JwtService;

  beforeEach(() => {
    registerUsecase = new RegisterUsecase();
    jwtService = new JwtService();
    loginUsecase = new LoginUsecase(jwtService);
    authenticationController = new AuthenticationController(
      registerUsecase,
      loginUsecase,
    );
  });

  describe('Create User ', () => {
    it('should return an user object', async () => {
      const result = {
        id: 4,
        username: 'user12345',
        password: 'password',
        name: 'name',
      };
      jest
        .spyOn(registerUsecase, 'execute')
        .mockImplementation(() => Promise.resolve(result));

      expect(
        await registerUsecase.execute({
          username: 'user12345',
          password: 'password',
          name: 'name',
        }),
      ).toEqual(
        expect.objectContaining({
          username: 'user12345',
          password: 'password',
          name: 'name',
        }),
      );
    });
  });

  describe('Create User Same Username', () => {
    it('should throw BadRequestException', async () => {
      jest
        .spyOn(registerUsecase, 'execute')
        .mockImplementation(() =>
          Promise.reject(new BadRequestException('username is already exist')),
        );

      await expect(
        registerUsecase.execute({
          username: 'username',
          password: 'password',
          name: 'name',
        }),
      ).rejects.toThrow(new BadRequestException('username is already exist'));
    });
  });

  describe('Create Invalid username', () => {
    it('should throw BadRequestException', async () => {
      jest
        .spyOn(registerUsecase, 'execute')
        .mockImplementation(() =>
          Promise.reject(
            new BadRequestException('Invalid username or password'),
          ),
        );

      await expect(
        registerUsecase.execute({
          username: '',
          password: 'password',
          name: 'name',
        }),
      ).rejects.toThrow(
        new BadRequestException('Invalid username or password'),
      );
    });
  });

  describe('Create Invalid password', () => {
    it('should throw BadRequestException', async () => {
      jest
        .spyOn(registerUsecase, 'execute')
        .mockImplementation(() =>
          Promise.reject(
            new BadRequestException('Invalid username or password'),
          ),
        );

      await expect(
        registerUsecase.execute({
          username: 'user1132432',
          password: '',
          name: 'name',
        }),
      ).rejects.toThrow(
        new BadRequestException('Invalid username or password'),
      );
    });
  });

  describe('Create Invalid username and password', () => {
    it('should throw BadRequestException', async () => {
      jest
        .spyOn(registerUsecase, 'execute')
        .mockImplementation(() =>
          Promise.reject(
            new BadRequestException('Invalid username or password'),
          ),
        );

      await expect(
        registerUsecase.execute({
          username: '',
          password: '',
          name: 'name',
        }),
      ).rejects.toThrow(
        new BadRequestException('Invalid username or password'),
      );
    });
  });

  describe('Login', () => {
    it('should return accesstoken', async () => {
      const result = {
        accessToken: 'Edasfqo91f',
        payload: { id: 1 },
      };
      jest
        .spyOn(loginUsecase, 'execute')
        .mockImplementation(() => Promise.resolve(result));

      expect(
        await loginUsecase.execute({
          username: 'username',
          password: 'password',
        }),
      ).toEqual(
        expect.objectContaining({
          accessToken: expect.anything(),
          payload: {
            id: 1,
          },
        }),
      );
    });
  });

  describe('Login invalid username', () => {
    it('should throw NotFoundException', async () => {
        jest
          .spyOn(loginUsecase, 'execute')
          .mockImplementation(() =>
            Promise.reject(
              new NotFoundException('Invalid username or password'),
            ),
          );
  
        await expect(
          loginUsecase.execute({
            username: '',
            password: 'password',
          }),
        ).rejects.toThrow(
          new NotFoundException('Invalid username or password'),
        );
      });
  });

  describe('Login invalid password', () => {
    it('should throw NotFoundException', async () => {
        jest
          .spyOn(loginUsecase, 'execute')
          .mockImplementation(() =>
            Promise.reject(
              new NotFoundException('Invalid username or password'),
            ),
          );
  
        await expect(
          loginUsecase.execute({
            username: 'username',
            password: 'passwaaord',
          }),
        ).rejects.toThrow(
          new NotFoundException('Invalid username or password'),
        );
      });
  });
});
