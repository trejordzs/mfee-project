import { Request, Response } from 'express';
import { Category } from '../models';

const categories: Category[] = [];

export const getCategory = (id: string) => {
  return categories.find((c) => c.id === id);
};

const getCategoryIndex = (id: string) => {
  return categories.findIndex((c) => c.id === id);
};

const notFoundMessage = (res: Response) => res.status(404).json({ message: 'Category not found' });

const getCategories = (req: Request, res: Response) => {
  res.status(200).json(categories);
};

const getCategoryById = (req: Request, res: Response) => {
  const { id } = req.params;
  const category = getCategory(id);

  if (!category) {
    return notFoundMessage(res);
  }

  res.status(200).json(category);
};

const createCategory = (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  const newCategory = {
    id: Date.now().toString(),
    name
  };

  categories.push(newCategory);

  res.status(201).json(newCategory);
};

const updateCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const categoryIndex = getCategoryIndex(id);

  if (categoryIndex === -1) {
    return notFoundMessage(res);
  }

  const updatedCategory = { ...categories[categoryIndex] };
  const { name } = req.body;

  if (name) {
    updatedCategory.name = name;
  }

  categories[categoryIndex] = updatedCategory;

  res.status(200).json(updatedCategory);
};

const deleteCategory = (req: Request, res: Response) => {
  const { id } = req.params;
  const categoryIndex = getCategoryIndex(id);

  if (categoryIndex === -1) {
    return notFoundMessage(res);
  }

  categories.splice(categoryIndex, 1);

  res.status(204).send();
};

export default { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
