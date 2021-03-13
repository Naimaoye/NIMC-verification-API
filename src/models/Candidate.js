import mongoose from 'mongoose';

const userSchema =  new mongoose.Schema({
    fullName: { type: String, lowercase: true },
    nin: { type: String },
    phoneNumber: { type: String, unique: true },
    homeAddress: { type: String },
    createdAt: { type: Date, default: Date.now }
});



const User = mongoose.model('User', userSchema);

export default User;