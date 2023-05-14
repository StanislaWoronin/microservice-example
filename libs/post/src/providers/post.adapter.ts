import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PostEntity } from '@libs/entities';
import { PostRepository } from '@libs/post/providers/post.repository';
import { PaginationDto } from '@libs/shared/dto';
import { IPost, PostAggregate } from '@libs/post';

@Injectable()
export class PostAdapter implements PostRepository {
  private readonly logger = new Logger(PostAdapter.name);
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}
  async delete(id: string): Promise<boolean> {
    const result = await this.postRepository.delete({ id }).catch((err) => {
      this.logger.error(err);
      return false;
    });
    return !!result;
  }

  async findAll(pagination: PaginationDto): Promise<[PostAggregate[], number]> {
    const { limit: take, offset: skip } = plainToInstance(
      PaginationDto,
      pagination,
    );
    const options: FindManyOptions<PostEntity> = {
      where: {
        isPublished: true,
      },
      take,
      skip,
      order: {
        createdAt: 'DESC',
      },
    };
    const [data, count] = await this.postRepository
      .findAndCount(options)
      .catch((err) => {
        this.logger.error(err);
        return [[], 0] as [PostEntity[], number];
      });
    return [data.map((post) => PostAggregate.create(post)), count];
  }

  async findOne(id: string): Promise<PostAggregate> {
    const existPost = await this.postRepository
      .findOneBy({ id })
      .catch((err) => {
        this.logger.error(err);
        return null;
      });
    if (!existPost) {
      return null;
    }
    return PostAggregate.create(existPost);
  }

  async save(post: IPost): Promise<PostAggregate> {
    const existPost = await this.findOne(post.id);
    if (existPost) {
      const { id, ...toUpdate } = post;
      await this.postRepository.update({ id }, toUpdate);
      return await this.findOne(post.id);
    }
    const savedPost = await this.postRepository.save(post); // метод save перед сохранением делает проверку на существование
    return PostAggregate.create(savedPost);
  }
}