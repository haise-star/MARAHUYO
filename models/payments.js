import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  booking_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Booking', 
    required: true 
  },
  amount: { type: Number, required: true },
  method: { 
    type: String, 
    enum: ["gcash", "bank", "cash"],
    required: true 
  },
  status: { 
    type: String, 
    enum: ["pending", "paid", "refunded", "declined"],
    default: "pending"
  },
  paid_at: Date,
  proof_of_payment: String, // URL or file path
  reference_number: String // for gcash/bank transactions
}, {
  timestamps: { createdAt: 'created_at' }
});

export default mongoose.model('Payment', paymentSchema);