const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;

const ConnectDB = async () => {
    try {
        const Conn = await mongoose.connect(DB_URL, {
            // Remove deprecated options
        });
        console.log(`MongoDB connected : ${Conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

module.exports = ConnectDB;
