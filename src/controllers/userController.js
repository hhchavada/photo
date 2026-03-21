import Category from '../models/Category.js';
import SubCategory from '../models/SubCategory.js';

export const getAllCategories = async (req, res) => {
  const categories = await Category.find()
    .sort({ createdAt: -1 })
    .populate({
      path: 'subCategories',
      options: { sort: { createdAt: -1 } },
    })
    .lean();
  res.json({ success: true, data: categories });
};

export const getCategoryById = async (req, res) => {
  const category = await Category.findById(req.params.id).populate({
    path: 'subCategories',
    options: { sort: { createdAt: -1 } },
  });
  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }
  res.json({ success: true, data: category });
};

export const getAllSubCategories = async (req, res) => {
  const { categoryId, videoShow } = req.query;
  const filter = {};
  if (categoryId) filter.categoryId = categoryId;
  if (videoShow !== undefined) filter.videoShow = videoShow === 'true' || videoShow === true;
  const subCategories = await SubCategory.find(filter)
    .populate('categoryId', 'name')
    .sort({ createdAt: -1 })
    .lean();
  res.json({ success: true, data: subCategories });
};

export const getSubCategoryById = async (req, res) => {
  const subCategory = await SubCategory.findById(req.params.id).populate('categoryId', 'name');
  if (!subCategory) {
    return res.status(404).json({ success: false, message: 'SubCategory not found' });
  }
  res.json({ success: true, data: subCategory });
};
