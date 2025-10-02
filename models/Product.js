import mongoose from 'mongoose';

// Define the schema for a Product
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Price cannot be negative
  },
  image: [{ 
    type: String,
    required: true,
  }],
  category: {
    type: String,
    required: true,
    trim: true,
  },
  subCategory: {
    type: String,
    trim: true,
  },
  size: [{ 
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  }],
  bestseller: {
    type: Boolean,
    default: false, 
  },
  date: { 
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true 
});

// Create the Mongoose Model.
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;