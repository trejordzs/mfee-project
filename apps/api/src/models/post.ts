import { CommentModel } from './comment';

export type PostModel = {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  comments: CommentModel[];
};
