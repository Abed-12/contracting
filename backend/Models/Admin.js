import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    adminName:{
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'admin',
    }
});

// AdminSchema.pre('save', async function(next) {
//     if (this.isModified('password')) {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//     }
//     next();
// });

const AdminModel = mongoose.model('admin', AdminSchema);

// const admin = new AdminModel({
//     email: "admin1@gmail.com",
//     password: "admin123",
//     adminName: "d7",
// }); 
// admin.save();

export default AdminModel;