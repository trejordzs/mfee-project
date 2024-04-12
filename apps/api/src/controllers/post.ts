import { RequestHandler } from 'express';
import { customErrorFn } from '../utils/customErrorFn';
import Post, { IPost } from '../models/post';
import Comment from '../models/comment';

const postNotFound = () => {
  throw customErrorFn({ statusCode: 404, message: 'Post not found' });
};

const getPosts: RequestHandler = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('category');
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getPostsByCategory: RequestHandler = async (req, res, next) => {
  const { category } = req.params;
  try {
    const postsByCategory = await Post.find({ category }).populate('category').populate('comments');
    if (!postsByCategory) {
      postNotFound();
    }
    res.status(200).json(postsByCategory);
  } catch (error) {
    next(error);
  }
};

const getPostById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate('category').populate('comments');
    if (!post) {
      postNotFound();
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const createPost: RequestHandler = async (req, res, next) => {
  try {
    const newPost = await Post.create({ ...req.body, commemts: [] });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

const addComment: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const comment = await Comment.create(req.body);
    const post = await Post.findByIdAndUpdate(id, { $push: { comments: comment._id } }, { new: true });

    if (!post) {
      postNotFound();
    }

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

const updatePost: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const { title, image, description, category } = req.body;
  try {
    const updatedFields: Partial<IPost> = {};
    if (title) updatedFields.title = title;
    if (image) updatedFields.image = image;
    if (description) updatedFields.description = description;
    if (category) updatedFields.category = category;

    const post = await Post.findByIdAndUpdate(id, updatedFields, { new: true }).populate('comments');

    if (!post) {
      postNotFound();
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const deletePost: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate('comments');

    if (!post) {
      postNotFound();
    }

    await Comment.deleteMany({ _id: { $in: post.comments } });
    await post.deleteOne();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default {
  getPosts,
  getPostsByCategory,
  getPostById,
  createPost,
  addComment,
  updatePost,
  deletePost
};
