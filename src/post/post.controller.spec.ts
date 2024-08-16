import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PostController } from './post.controller';
import { UpdatePostUsecase } from './usecase/update.usecase';
import { CreatePostUsecase } from './usecase/create.usecase';
import { GetPostUsecase } from './usecase/get.usecase';
import { DeletePostUsecase } from './usecase/delete.usecase';

describe('PostController', () => {
  let postController: PostController;
  let updateUsecase: UpdatePostUsecase;
  let createUsecase: CreatePostUsecase;
  let getUsecase: GetPostUsecase;
  let deleteUsecase: DeletePostUsecase;

  beforeEach(() => {
    updateUsecase = new UpdatePostUsecase();
    createUsecase = new CreatePostUsecase();
    getUsecase = new GetPostUsecase();
    deleteUsecase = new DeletePostUsecase();
    postController = new PostController(
      createUsecase,
      updateUsecase,
      getUsecase,
      deleteUsecase,
    );
  });

  describe('Create Post', () => {
    it('should return an user object', async () => {
      const result = {
        id: 111, // any id
        title: 'title',
        content: 'content',
        userId: 1,
      };

      jest
        .spyOn(createUsecase, 'execute')
        .mockImplementation(() =>
          Promise.resolve(result),
        );


      expect(
        await createUsecase.execute(
          {
            title: 'title',
            content: 'content',
          },
          {
            id: 1,
            username: 'username',
            password: 'password',
            name: 'name',
          },
        ),
      ).toEqual(
        expect.objectContaining({
          title: 'title',
          content: 'content',
          userId: 1,
        }),
      );
    });
  });

  describe('Create Post By Not Exist User', () => {
    it('should throw NotFoundException', async () => {
      jest
        .spyOn(createUsecase, 'execute')
        .mockImplementation(() =>
          Promise.reject(new NotFoundException('User not found')),
        );

      await expect(
        createUsecase.execute(
          {
            title: 'title',
            content: 'content',
          },
          {
            id: 9999,
            username: 'username',
            password: 'password',
            name: 'name',
          },
        ),
      ).rejects.toThrow(new NotFoundException('User not found'));
    });
  });

  describe('Delete Post', () => {
    it('should return an post object at delete', async () => {
      const result = {
        id: 1, // any id
        title: 'title',
        content: 'content',
        userId: 1,
      };

      jest
        .spyOn(deleteUsecase, 'execute')
        .mockImplementation(() =>
          Promise.resolve(result),
        );


      expect(
        await deleteUsecase.execute(
          "1",
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

  describe('Delete Post By Not Exist User', () => {
    it('should throw NotFoundException', async () => {
      jest
        .spyOn(deleteUsecase, 'execute')
        .mockImplementation(() =>
          Promise.reject(new NotFoundException('Post not found')),
        );

      await expect(
        deleteUsecase.execute(
          "1",
          {
            id: 9999,
            username: 'username',
            password: 'password',
            name: 'name',
          },
        ),
      ).rejects.toThrow(new NotFoundException('Post not found'));
    });
  });

  describe('Delete Post That Not Exist', () => {
    it('should throw NotFoundException', async () => {
      jest
        .spyOn(deleteUsecase, 'execute')
        .mockImplementation(() =>
          Promise.reject(new NotFoundException('Post not found')),
        );

      await expect(
        deleteUsecase.execute(
          "12222",
          {
            id: 1,
            username: 'username',
            password: 'password',
            name: 'name',
          },
        ),
      ).rejects.toThrow(new NotFoundException('Post not found'));
    });
  });

  describe('Delete Post Wrong Request', () => {
    it('should throw BadRequestException', async () => {
      jest
        .spyOn(deleteUsecase, 'execute')
        .mockImplementation(() =>
          Promise.reject(new BadRequestException("Something was wrong to update")),
        );

      await expect(
        deleteUsecase.execute(
          "esss",
          {
            id: 1,
            username: 'username',
            password: 'password',
            name: 'name',
          },
        ),
      ).rejects.toThrow(new BadRequestException("Something was wrong to update"));
    });
  });

  describe('Update Post', () => {
    it('should return an update post object', async () => {
      const result = {
        id: 1, // any id
        title: 'title1',
        content: 'content1',
        userId: 1,
      };

      jest
        .spyOn(updateUsecase, 'execute')
        .mockImplementation(() => Promise.resolve(result));

      expect(
        await updateUsecase.execute(
          {
            title: 'title1',
            content: 'content1',
          },
          {
            id: 1,
            username: 'username',
            password: 'password',
            name: 'name',
          },
          "1",
        ),
      ).toBe(result);
    });
  });

  describe('Update Post By Not Own', () => {
    it('should throw NotFoundException', async () => {
      jest
        .spyOn(updateUsecase, 'execute')
        .mockImplementation(() =>
          Promise.reject(new NotFoundException('Post not found')),
        );

      await expect(
        updateUsecase.execute(
          {
            title: 'title1',
            content: 'content1',
          },
          {
            id: 9999,
            username: 'username',
            password: 'password',
            name: 'name',
          },
          "1"
        ),
      ).rejects.toThrow(new NotFoundException('Post not found'));
    });
  });

  describe('Update Post Not Exist', () => {
    it('should throw BadRequestException', async () => {
      jest
        .spyOn(updateUsecase, 'execute')
        .mockImplementation(() =>
          Promise.reject(new BadRequestException("Something was wrong to update")),
        );

      await expect(
        updateUsecase.execute(
          {
            title: 'title1',
            content: 'content1',
          },
          {
            id: 9999,
            username: 'username',
            password: 'password',
            name: 'name',
          },
          "dsafds113"
        ),
      ).rejects.toThrow(new BadRequestException("Something was wrong to update"));
    });
  });

  describe('Get Post', () => {
    it('should return all posts', async () => {
      const result = [{
        id: 1, // any id
        title: 'title1',
        content: 'content1',
        userId: 1,
      }];

      expect(
        await getUsecase.execute(),
      ).toEqual(
        expect.arrayContaining([
            expect.objectContaining({
                id: expect.anything(),
                title: expect.anything(),
                content: expect.anything(),
                userId: expect.anything()
            })
        ])
      );
    });
  });

});
