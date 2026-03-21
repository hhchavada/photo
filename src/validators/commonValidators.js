import { param, query } from 'express-validator';

const mongoIdMessage = 'Valid MongoDB ID required';

export const validateMongoIdParam = (paramName = 'id') => [
  param(paramName).isMongoId().withMessage(mongoIdMessage),
];

export const validateCategoryIdQuery = () => [
  query('categoryId').optional().isMongoId().withMessage(mongoIdMessage),
];

export const validateVideoShowQuery = () => [
  query('videoShow').optional().isIn(['true', 'false']).withMessage('videoShow must be true or false'),
];
