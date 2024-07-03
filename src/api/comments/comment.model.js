const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comic_id: {
      type: Schema.Types.ObjectId,
      ref: 'Comic',
      required: true
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    comment_text: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  });

  
  const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
