import mongoose from 'mongoose';

const serviceProfileSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  first_name: String,
  middle_name: String,
  last_name: String,
  suffix: String,
  phone_number: String,
  province: String,
  city: String,
  brgy: String,
  street_address: String,
  birthday: Date
}, {
  timestamps: true
});

export default mongoose.model('ServiceProfile', serviceProfileSchema);