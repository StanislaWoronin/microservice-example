import { IPost } from '@libs/post';

export type CreatePostDto = Pick<IPost, 'title' | 'message' | 'authorId'>;
