import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  event_date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending"
  },
  notes: String,
  address: {
    province: String,
    city: String,
    barangay: String,
    street_address: String
  },
  payment: {
    method: { type: String, enum: ["gcash", "bank", "cash"] },
    status: { type: String, enum: ["pending", "paid", "refunded", "declined"] },
    amount: Number,
    paid_at: Date,
    proof_of_payment: String
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model('Booking', bookingSchema);