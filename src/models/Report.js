import mongoose from 'mongoose';

const userSchema =  new mongoose.Schema({
    numberOfRequests: {type: Number, default: 0},
    requests: { type : Array , default : [] },
    userId: { type: String }
});


const Report = mongoose.model('Report', userSchema);

export default Report;