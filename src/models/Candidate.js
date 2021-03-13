import mongoose from 'mongoose';

const userSchema =  new mongoose.Schema({
    fullName: { type: String, lowercase: true },
    nin: { type: String },
    phoneNumber: { type: String, unique: true },
    homeAddress: { type: String },
    createdAt: { type: Date, default: Date.now }
});



const Candidate = mongoose.model('Candidate', userSchema);

export default Candidate;