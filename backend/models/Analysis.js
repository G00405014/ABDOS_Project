const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  image: {
    type: String, // base64 encoded image
    required: true
  },
  result: {
    type: {
      type: String,
      required: true
    },
    confidence: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    recommendations: [{
      type: String
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Analysis = mongoose.model('Analysis', analysisSchema);

module.exports = Analysis; 