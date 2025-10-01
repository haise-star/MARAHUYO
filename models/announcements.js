import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { type: String, required: true },
  content: { type: String, required: true }
}, {
  timestamps: { createdAt: 'created_at' }
});

export default mongoose.model('Announcement', announcementSchema);