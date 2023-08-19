import mongoose from 'mongoose';

const Schema = mongoose.Schema

const appUserDataSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    sheet_url:{
        type: String,
        required: true
    }

}, {timestamps: true})

export default mongoose.model('appUserData', appUserDataSchema)