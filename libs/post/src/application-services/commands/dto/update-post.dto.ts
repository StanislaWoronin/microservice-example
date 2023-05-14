import { IPost } from '@libs/post';

export type UpdatePostDto = Partial<Pick<IPost, 'title' | 'message'>> &
  Pick<IPost, 'id' | 'authorId'>;
