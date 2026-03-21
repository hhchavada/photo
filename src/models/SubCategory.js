import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category reference is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'SubCategory name is required'],
      trim: true,
      maxlength: [120, 'Name cannot exceed 120 characters'],
    },
    description: {
      type: String,
      default: '',
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    image: {
      type: String,
      default: '',
    },
    video: {
      type: String,
      default: '',
    },
    videoShow: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Compound index for listing by category
subCategorySchema.index({ categoryId: 1, createdAt: -1 });

export default mongoose.model('SubCategory', subCategorySchema);
