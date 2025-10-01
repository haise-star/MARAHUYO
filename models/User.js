import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },        // fullname
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
  verificationToken: String,
  verificationTokenExpires: Date,
  verified_at: Date,
  verification_status: { 
    type: String, 
    enum: ["pending", "verified", "rescripted"],
    default: "pending"
  },
  otp: String,
  otpExpires: Date,
  two_factor_code: String,
  two_factor_expires_at: Date,
  role: { 
    type: String, 
    enum: ["super_admin", "admin", "user"],
    default: "user"
  },
  status: { 
    type: String, 
    enum: ["active", "inactive"],
    default: "active"
  },
  remember_token: String
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default mongoose.model('User', userSchema);