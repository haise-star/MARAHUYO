import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  first_name: String,
  last_name: String,
  phone: String
}, {
  timestamps: true
});

export default mongoose.model('UserProfile', userProfileSchema);