const mongoose = require('mongoose');
const User = require('./user');

const candidateSchema = new mongoose.Schema(
  {
    name: String,
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
