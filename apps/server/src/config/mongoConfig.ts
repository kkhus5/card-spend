import mongoose from "mongoose";

import { mongoUri } from "./index.js";

export const connectMongoose = async () => {
    try {
        await mongoose.connect(mongoUri);
    } catch (error) {
        console.error("Error connecting to MongoDB.", { error });
        process.exit(1);
    }
};
