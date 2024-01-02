import mongoose from "mongoose";
import colors from "colors"

const connectToDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Database connected successfully at ${conn.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`Error in connection to db ${error}`.bgRed.white)
    }
}

export default connectToDb