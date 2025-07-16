import mongoose, { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  prompt: {
    type: String,
    required: true,
    trim: true,
  },
  reply: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: String, // You can later replace this with mongoose.Schema.Types.ObjectId if you have a User model
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Prompt = models.Prompt || model('Prompt', PromptSchema);
