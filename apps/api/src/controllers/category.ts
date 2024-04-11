import { RequestHandler } from 'express';
import { Category } from '../models';
import { customErrorFn } from '../utils/customErrorFn';

const categories: Category[] = [];

export const getCategory = (id: string) => {
  return categories.find((c) => c.id === id);
};

const getCategoryIndex = (id: string) => {
  return categories.findIndex((c) => c.id === id);
};

const categoryNotFound = () => {
  throw customErrorFn({ statusCode: 404, message: 'Category not found' });
};

const getCategories: RequestHandler = (req, res) => {
  res.status(200).json(categories);
};

const getCategoryById: RequestHandler = (req, res) => {
  const { id } = req.params;
  const category = getCategory(id);

  if (!category) {
    categoryNotFound();
  }

  res.status(200).json(category);
};

const createCategory: RequestHandler = (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw customErrorFn({ statusCode: 400, message: 'Name is required' });
  }

  const newCategory = {
    id: Date.now().toString(),
    name
  };

  categories.push(newCategory);

  res.status(201).json(newCategory);
};

const updateCategory: RequestHandler = (req, res) => {
  const { id } = req.params;
  const categoryIndex = getCategoryIndex(id);

  if (categoryIndex === -1) {
    return categoryNotFound();
  }

  const updatedCategory = { ...categories[categoryIndex] };
  const { name } = req.body;

  if (name) {
    updatedCategory.name = name;
  }

  categories[categoryIndex] = updatedCategory;

  res.status(200).json(updatedCategory);
};

const deleteCategory: RequestHandler = (req, res) => {
  const { id } = req.params;
  const categoryIndex = getCategoryIndex(id);

  if (categoryIndex === -1) {
    return categoryNotFound();
  }

  categories.splice(categoryIndex, 1);

  res.status(204).send();
};

export default { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
