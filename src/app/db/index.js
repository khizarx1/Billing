import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js'

const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
    throw new Error('Please define MONGODB_URL in .env')
}

let isConnected = false;

const connectDB = async () => {

    if (isConnected) {
        console.log('MongoDB already connected');
        return;
    }

    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        isConnected = connectionInstance.connections[0].readyState === 1;
        console.log(`\n MongoDB connected !! DB Host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log('MONGODB connection failed in db/index.js:', error);
    }
}

export default connectDB