import mongoose from 'mongoose';

export const ENQUIRY_STATUSES = ['new', 'contacted', 'qualified', 'closed', 'spam'];

// Mirrors the Contact page form (src/pages/ContactPage.jsx) field for field.
const enquirySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, maxlength: 120 },
        organisation: { type: String, required: true, trim: true, maxlength: 160 },
        email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
        phone: { type: String, required: true, trim: true, maxlength: 18 },
        orgType: { type: String, trim: true, default: '' },
        interest: { type: String, trim: true, default: '' },
        message: { type: String, required: true, trim: true, maxlength: 4000 },

        status: { type: String, enum: ENQUIRY_STATUSES, default: 'new', index: true },
        notes: { type: String, trim: true, default: '', maxlength: 4000 },

        source: { type: String, default: '/contact' },
        ip: { type: String, default: '' },
        userAgent: { type: String, default: '' },
    },
    { timestamps: true },
);

enquirySchema.index({ createdAt: -1 });

export default mongoose.model('Enquiry', enquirySchema);
