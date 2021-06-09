import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log(
      `MongoDB connected. Host: ${connection.connection.host}`.underline.cyan
    );
  } catch (error) {
    console.error(`Error ${error.message}`.underline.red);
    process.exit(1);
  }
};

export default connectDB;
