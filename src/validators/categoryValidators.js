import { body } from 'express-validator';

const nameMax = 120;

export const createCategoryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ max: nameMax })
    .withMessage(`Category name cannot exceed ${nameMax} characters`),
];

export const updateCategoryValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ max: nameMax })
    .withMessage(`Category name cannot exceed ${nameMax} characters`),
];
