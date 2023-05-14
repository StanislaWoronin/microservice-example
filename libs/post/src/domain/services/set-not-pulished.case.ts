import { IPost } from '@libs/post';

export interface ISetNotPublished {
  setNotPublished(): void;
}

export const SET_NOT_PUBLISHED = async function (this: IPost) {
  this.isPublished = false;
};
