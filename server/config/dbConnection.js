
import mongoose from "mongoose";
 
export const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
    console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

