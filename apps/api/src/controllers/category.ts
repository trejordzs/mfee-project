import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import Category from '../models/category';
import { customErrorFn } from '../utils/customErrorFn';

const categoryNotFound = () => {
  throw customErrorFn({ statusCode: 404, message: 'Category not found' });
};

const getCategories: RequestHandler = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const getCategoryById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw customErrorFn({ statusCode: 404, message: 'Category "id" invalid' });
    }

    const category = await Category.findById(id);

    if (!category) {
      categoryNotFound();
    }

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

const createCategory: RequestHandler = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

const updateCategory: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndUpdate(id, req.body, { new: true });

    if (!category) categoryNotFound();

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

const deleteCategory: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) categoryNotFound();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export default { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
