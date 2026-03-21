import Category from '../models/Category.js';
import SubCategory from '../models/SubCategory.js';

// -------- Category CRUD --------

export const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name: name.trim() });
  res.status(201).json({ success: true, data: category });
};

export const getAllCategoriesAdmin = async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: categories });
};

export const getCategoryByIdAdmin = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }
  res.json({ success: true, data: category });
};

export const updateCategory = async (req, res) => {
  const { name } = req.body;
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: name.trim() },
    { new: true, runValidators: true }
  );
  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }
  res.json({ success: true, data: category });
};

export const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }
  await SubCategory.deleteMany({ categoryId: category._id });
  res.json({ success: true, message: 'Category and its subcategories deleted' });
};

// -------- SubCategory CRUD --------

const getBaseUrl = (req) => {
  const protocol = req.get('x-forwarded-proto') || req.protocol;
  const host = req.get('host');
  return `${protocol}://${host}`;
};

export const createSubCategory = async (req, res) => {
  const { categoryId, name, description, videoShow } = req.body;
  const category = await Category.findById(categoryId);
  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }
  const baseUrl = getBaseUrl(req);
  const payload = {
    categoryId,
    name: name.trim(),
    description: (description || '').trim(),
    videoShow: videoShow === true || videoShow === 'true',
    image: req.files?.image?.[0] ? `${baseUrl}/uploads/images/${req.files.image[0].filename}` : '',
    video: req.files?.video?.[0] ? `${baseUrl}/uploads/videos/${req.files.video[0].filename}` : '',
  };
  const subCategory = await SubCategory.create(payload);
  res.status(201).json({ success: true, data: subCategory });
};

export const getAllSubCategoriesAdmin = async (req, res) => {
  const { categoryId } = req.query;
  const filter = categoryId ? { categoryId } : {};
  const subCategories = await SubCategory.find(filter).populate('categoryId', 'name').sort({ createdAt: -1 }).lean();
  res.json({ success: true, data: subCategories });
};

export const getSubCategoryByIdAdmin = async (req, res) => {
  const subCategory = await SubCategory.findById(req.params.id).populate('categoryId', 'name');
  if (!subCategory) {
    return res.status(404).json({ success: false, message: 'SubCategory not found' });
  }
  res.json({ success: true, data: subCategory });
};

export const updateSubCategory = async (req, res) => {
  const { name, description, videoShow } = req.body;
  const sub = await SubCategory.findById(req.params.id);
  if (!sub) {
    return res.status(404).json({ success: false, message: 'SubCategory not found' });
  }
  const baseUrl = getBaseUrl(req);
  const updates = {};
  if (name !== undefined) updates.name = name.trim();
  if (description !== undefined) updates.description = description.trim();
  if (videoShow !== undefined) updates.videoShow = videoShow === true || videoShow === 'true';
  if (req.files?.image?.[0]) updates.image = `${baseUrl}/uploads/images/${req.files.image[0].filename}`;
  if (req.files?.video?.[0]) updates.video = `${baseUrl}/uploads/videos/${req.files.video[0].filename}`;
  const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
  res.json({ success: true, data: subCategory });
};

export const deleteSubCategory = async (req, res) => {
  const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
  if (!subCategory) {
    return res.status(404).json({ success: false, message: 'SubCategory not found' });
  }
  res.json({ success: true, message: 'SubCategory deleted' });
};
