import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, trim: true, lowercase: true },
        password: { type: String, required: true, select: false },
        lastLoginAt: { type: Date },
    },
    { timestamps: true },
);

adminSchema.pre('save', async function hashPassword() {
    if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.checkPassword = function checkPassword(plain) {
    return bcrypt.compare(plain, this.password);
};

adminSchema.methods.toSafe = function toSafe() {
    return { id: this._id, name: this.name, email: this.email, lastLoginAt: this.lastLoginAt };
};

export default mongoose.model('Admin', adminSchema);
