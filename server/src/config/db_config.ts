import mongoose, { ConnectOptions } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const mongoDB = {
    async connect() {
        const options: ConnectOptions = {}

        try {
            await mongoose.connect(process.env.MONGO_URI as string, options);
            console.log(`MongoDB successfully connected`);
        } catch (error) {
            console.log(`MongoDB Error to connect: ${error}`);
        }
    },
    async disconnect() {
        await mongoose.disconnect();
        console.log(`MongoDB disconnected`);
    }
}