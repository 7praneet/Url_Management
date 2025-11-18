import mongoose from 'mongoose';


const urlSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
longUrl: { type: String, required: true },
shortId: { type: String, required: true, unique: true },
alias: { type: String, sparse: true },
clicks: { type: Number, default: 0 },
clickHistory: [{ date: Date, count: Number }],
}, { timestamps: true });


export default mongoose.model('Url', urlSchema);