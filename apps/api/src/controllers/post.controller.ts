import { Request, Response } from 'express';
import { PostModel } from '../models';
import { getCategory } from '../controllers/category.controller';

const posts: PostModel[] = [];

const getPost = (id: string) => {
  return posts.find((p) => p.id === id);
};

const getPostIndex = (id: string) => {
  return posts.findIndex((p) => p.id === id);
};

const getPosts = (req: Request, res: Response) => {
  res.status(200).json(posts);
};

const getPostsByCategory = (req: Request, res: Response) => {
  const { category } = req.params;

  if (!category) {
    return res.status(400).json({ message: 'Category is required' });
  }

  const postsByCategory = posts.filter((p) => p.category === category);

  res.status(200).json(postsByCategory);
};

const getPostById = (req: Request, res: Response) => {
  const { id } = req.params;
  const post = getPost(id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const { category } = post;
  const categoryInfo = getCategory(category);

  const payloadResponse = {
    ...post,
    category: categoryInfo
  };

  res.status(200).json(payloadResponse);
};

const createPost = (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newPost = {
    id: Date.now().toString(),
    ...req.body,
    comments: []
  };

  posts.push(newPost);

  res.status(201).json(newPost);
};

const addComment = (req: Request, res: Response) => {
  const { id } = req.params;
  const postIndex = getPostIndex(id);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const { author, content } = req.body;

  if (!author || !content) {
    return res.status(400).json({ message: 'Author and Content are required' });
  }

  const newComment = {
    id: Date.now().toString(),
    ...req.body
  };

  posts[postIndex].comments.push(newComment);

  res.status(201).json(newComment);
};

const updatePost = (req: Request, res: Response) => {
  const { id } = req.params;
  const postIndex = getPostIndex(id);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
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

const deletePost = (req: Request, res: Response) => {
  const { id } = req.params;
  const postIndex = getPostIndex(id);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
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
