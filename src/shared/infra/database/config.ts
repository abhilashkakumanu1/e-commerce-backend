import mongoose from "mongoose";

import { DB_CREDENTIALS } from "../../../../config";

// Create connection string
const { host, port, db, user, password } = DB_CREDENTIALS;
const mongoUrl = `mongodb://${user}:${password}@${host}:${port}/${db}?retryWrites=true`;

export const connectToDb = async () => {
    return new Promise(async (resolve, reject) => {
        // Set up database connection with MongoDB
        // and wait for the connection
        const db = mongoose.connection;
        const timeout = 2000;

        db.on("error", function (error) {
            console.error("Error in MongoDb connection: " + error);
            mongoose.disconnect();
        });
        db.on("connected", function () {
            console.log("Database connected.");
            resolve(null);
        });
        db.on("reconnected", function () {
            console.log("MongoDB reconnected!");
        });
        db.on("disconnected", function () {
            console.log("MongoDB disconnected!");
            setTimeout(async () => await mongoose.connect(mongoUrl), timeout);
        });
        await mongoose.connect(mongoUrl);
    });
};
