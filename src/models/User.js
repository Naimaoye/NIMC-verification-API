import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema =  new mongoose.Schema({
    email: { type: String, required: true, lowercase: true, unique: true},
    password: { type: String, required: true },
    token: { type: Number,  default: 0 },
    requestDate: { type: Date, default: Date.now },
    requestStatus: { type: String, default: 'failed' },
    numberOfRequests: { type: Number,  default: 0 },
    createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', function (next) {
    let user = this;
    if(!user.isModified('password')) return next();
    console.log(user.isModified);
    bcrypt.genSalt(10, (err, salt) => {
    if (err) console.error(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash
      next();
    })
  });
  });


const User = mongoose.model('User', userSchema);

export default User;