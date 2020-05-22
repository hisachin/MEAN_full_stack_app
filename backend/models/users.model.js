import mongoose from 'mongoose';

let Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  mobile: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  salt: {
    type: String,
    trim: true,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Users', UserSchema);