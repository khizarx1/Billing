import mongoose, { mongo, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {     // ye database mein save krne se pehle password ko encrypt krta hai.when this is done pass to the next
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function (password) { // bcrypt check krta hai login krte waqt user ne jo password enter kia hai kia wo database mein saved hash password se match krta hai
    return await bcrypt.compare(password, this.password);
}


export const User = mongoose.model.User || mongoose.model('User', userSchema);