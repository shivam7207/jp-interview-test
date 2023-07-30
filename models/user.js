const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  phone: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  vote: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate'
  }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('User', userSchema)
module.exports = User