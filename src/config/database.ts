import mongoose from 'mongoose';
//
// const connectDB = async (defaultURI:string) => {
//     try {
//         const mongoURI = process.env.MONGO_URI || defaultURI;  // MongoDB connection URI
//         await mongoose.connect(mongoURI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB connected successfully');
//     } catch (error: any) {
//         console.error('MongoDB connection failed:', (error as Error).message);
//         process.exit(1); // Exit the process with failure
//     }
// };

// export default connectDB;
