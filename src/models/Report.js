import mongoose from 'mongoose';

const userSchema =  new mongoose.Schema({
    numberOfRequests: { type: String, lowercase: true },
    requestDate: { type: String },
    requestStatus: { type: String, default: 'failed' },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
});


const Report = mongoose.model('Report', userSchema);

export default Report;