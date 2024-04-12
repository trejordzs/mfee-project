import mongose, { Document, Schema } from 'mongoose';

export type CommentModel = {
  id: string;
  author: string;
  content: string;
};

export interface IComment extends Document {
  author: string;
  content: string;
}

const commentSchema = new Schema<IComment>({
  author: { type: String, required: [true, 'Author is required'] },
  content: { type: String, required: [true, 'Content is required'] }
});

const Comment = mongose.model<IComment>('Comment', commentSchema);

export default Comment;
