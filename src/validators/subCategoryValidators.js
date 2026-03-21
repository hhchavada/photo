import { body } from 'express-validator';

const nameMax = 120;
const descriptionMax = 2000;

export const createSubCategoryValidation = [
  body('categoryId').isMongoId().withMessage('Valid category ID is required'),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('SubCategory name is required')
    .isLength({ max: nameMax })
    .withMessage(`SubCategory name cannot exceed ${nameMax} characters`),
  body('description')
    .optional({ values: 'null' })
    .trim()
    .isLength({ max: descriptionMax })
    .withMessage(`Description cannot exceed ${descriptionMax} characters`),
  body('videoShow')
    .optional({ values: 'null' })
    .isIn([true, false, 'true', 'false'])
    .withMessage('videoShow must be true or false'),
];

export const updateSubCategoryValidation = [
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ max: nameMax })
    .withMessage(`Name cannot exceed ${nameMax} characters`),
  body('description')
    .optional({ values: 'null' })
    .trim()
    .isLength({ max: descriptionMax })
    .withMessage(`Description cannot exceed ${descriptionMax} characters`),
  body('videoShow')
    .optional({ values: 'null' })
    .isIn([true, false, 'true', 'false'])
    .withMessage('videoShow must be true or false'),
];
