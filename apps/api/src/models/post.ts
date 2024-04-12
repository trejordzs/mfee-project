import mongoose, { Document, Schema } from 'mongoose';
import { CommentModel, IComment } from './comment';
import { ICategory } from './category';

export type PostModel = {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  comments: CommentModel[];
};

export interface IPost extends Document {
  title: string;
  image: string;
  description: string;
  category: ICategory['_id'];
  comments: IComment['_id'][];
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: [true, 'Title is required'] },
  image: { type: String, required: [true, 'Image is required'] },
  description: { type: String, required: [true, 'Description is required'] },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: [true, 'Category is required'] },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;
