import { Schema, model, models } from 'mongoose';

const SellerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  storeDescription: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Seller = models.Seller || model('Seller', SellerSchema);
