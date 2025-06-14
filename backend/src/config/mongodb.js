import mongoose from "mongoose";

const connectDB = async () => {
    
  mongoose.connection.on("connected", () => {
    console.log("connected to MongoDb");
  });

  await mongoose.connect(`${process.env.MONGODB_URI}/digitune`);
};

export default connectDB;
