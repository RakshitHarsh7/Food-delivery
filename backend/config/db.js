import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://rakshitharsh7:HcQe1FEBDdMg4aNZ@cluster0.lgvga.mongodb.net/food-del').then(() => console.log("DB connected"));
}