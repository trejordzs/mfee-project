import express, { Response } from 'express';

const router = express.Router();
const categories = [];

export const getCategory = (id: string) => {
  return categories.find((c) => c.id === id);
};

const getCategoryIndex = (id: string) => {
  return categories.findIndex((c) => c.id === id);
};

const notFoundMessage = (res: Response) => res.status(404).json({ message: 'Category not found' });

router.get('/', (req, res) => {
  res.status(200).json(categories);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const category = getCategory(id);

  if (!category) {
    return notFoundMessage(res);
  }

  res.status(200).json(category);
});

router.post('/', (req, res) => {
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
});

router.patch('/:id', (req, res) => {
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
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const categoryIndex = getCategoryIndex(id);

  if (categoryIndex === -1) {
    return notFoundMessage(res);
  }

  categories.splice(categoryIndex, 1);

  res.status(204).send();
});

export default router;
