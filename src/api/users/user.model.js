const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  logged:{
    type: Boolean,
    default: false,
    required: true
  },
  email: {
    type: String,
    required: false,
    unique: true
  },
  password: {
    type: String,
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  rated_comics: [{
    comic_id: {
      type: Schema.Types.ObjectId,
      ref: 'Comic'
    },
    rating: {
      type: Number,
      min: 0,
      max: 10
    }
  }],
comments_count: {
    type: Number,
    default: 0
  },
  last_commented_at: {
    type: Date
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
