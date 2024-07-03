const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;

const comicSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  original_title:{
    type: String,
    required: true
  },
  writers: [{
    type: String,
    required: true
  }],
  artists: [{
    type: String,
    required: true
  }],
  colorists: [{
    type: String
  }],
  publisher:{
    type: String,
    required: true,
  },
  published_date: {
    type: Date,
    required: true
  },
  genres: [{
    type: String
  }],
  cover: {
    type: String,
    required: true
  },
  synopsis: {
    type: String,
    required: true
  },
  pages: {
    type: Number,
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
  
  average_rating: {
    type: Number,
    default: 0
  },
  ratings: [{
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
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
  }
});

const Comic = mongoose.model('Comic', comicSchema);
module.exports = Comic;