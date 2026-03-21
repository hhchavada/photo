import { Router } from 'express';
import {
  getAllCategories,
  getCategoryById,
  getAllSubCategories,
  getSubCategoryById,
} from '../controllers/userController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { validate } from '../middleware/validate.js';
import {
  validateMongoIdParam,
  validateCategoryIdQuery,
  validateVideoShowQuery,
} from '../validators/commonValidators.js';

const router = Router();

router.get('/categories', asyncHandler(getAllCategories));
router.get(
  '/categories/:id',
  validateMongoIdParam('id'),
  validate,
  asyncHandler(getCategoryById)
);
router.get(
  '/subcategories',
  validateCategoryIdQuery(),
  validateVideoShowQuery(),
  validate,
  asyncHandler(getAllSubCategories)
);
router.get(
  '/subcategories/:id',
  validateMongoIdParam('id'),
  validate,
  asyncHandler(getSubCategoryById)
);

export default router;
