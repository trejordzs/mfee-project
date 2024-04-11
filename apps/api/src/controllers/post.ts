import { RequestHandler } from 'express';
import { PostModel } from '../models';
import { getCategory } from './category';
import { customErrorFn } from '../utils/customErrorFn';

const posts: PostModel[] = [];

const getPost = (id: string) => {
  return posts.find((p) => p.id === id);
};

const getPostIndex = (id: string) => {
  return posts.findIndex((p) => p.id === id);
};

const postNotFound = () => {
  throw customErrorFn({ statusCode: 404, message: 'Post not found' });
};

const getPosts: RequestHandler = (req, res) => {
  res.status(200).json(posts);
};

const getPostsByCategory: RequestHandler = (req, res) => {
  const { category } = req.params;

  if (!category) {
    throw customErrorFn({ statusCode: 400, message: 'Category is required' });
  }

  const postsByCategory = posts.filter((p) => p.category === category);

  res.status(200).json(postsByCategory);
};

const getPostById: RequestHandler = (req, res) => {
  const { id } = req.params;
  const post = getPost(id);

  if (!post) {
    postNotFound();
  }

  const { category } = post;
  const categoryInfo = getCategory(category);

  const payloadResponse = {
    ...post,
    category: categoryInfo
  };

  res.status(200).json(payloadResponse);
};

const createPost: RequestHandler = (req, res) => {
  const { title } = req.body;

  if (!title) {
    throw customErrorFn({ statusCode: 400, message: 'Title is required' });
  }

  const newPost = {
    id: Date.now().toString(),
    ...req.body,
    comments: []
  };

  posts.push(newPost);

  res.status(201).json(newPost);
};

const addComment: RequestHandler = (req, res) => {
  const { id } = req.params;
  const postIndex = getPostIndex(id);

  if (postIndex === -1) {
    postNotFound();
  }

  const { author, content } = req.body;

  if (!author || !content) {
    throw customErrorFn({ statusCode: 400, message: 'Author and Content are required' });
  }

  const newComment = {
    id: Date.now().toString(),
    ...req.body
  };

  posts[postIndex].comments.push(newComment);

  res.status(201).json(newComment);
};

const updatePost: RequestHandler = (req, res) => {
  const { id } = req.params;
  const postIndex = getPostIndex(id);

  if (postIndex === -1) {
    postNotFound();
  }

  const updatedPost = { ...posts[postIndex] };
  const { title, image, description, category } = req.body;

  if (title) {
    updatedPost.title = title;
  }

  if (image) {
    updatedPost.title = image;
  }

  if (description) {
    updatedPost.description = description;
  }

  if (category) {
    updatedPost.category = category;
  }

  posts[postIndex] = updatedPost;

  res.status(200).json(updatedPost);
};

const deletePost: RequestHandler = (req, res) => {
  const { id } = req.params;
  const postIndex = getPostIndex(id);

  if (postIndex === -1) {
    postNotFound();
  }

  posts.splice(postIndex, 1);

  res.status(204).send();
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
