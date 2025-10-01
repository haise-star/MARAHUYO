import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ["booking", "payment", "message", "announcement"],
    required: true 
  },
  content: { type: String, required: true },
  is_read: { type: Boolean, default: false },
  related_id: mongoose.Schema.Types.ObjectId
}, {
  timestamps: { createdAt: 'created_at' }
});

export default mongoose.model('Notification', notificationSchema);