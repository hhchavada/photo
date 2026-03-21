import { validationResult } from 'express-validator';

/**
 * Middleware that reads validation result and sends 400 with errors if any
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extracted = errors.array().map((err) => ({
    field: err.path,
    message: err.msg,
  }));
  return res.status(400).json({
    success: false,
    message: 'Validation failed',
    errors: extracted,
  });
};
