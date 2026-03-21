/**
 * Wraps async route handlers to catch errors and pass to error middleware
 * @param {Function} fn - Async route handler
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
