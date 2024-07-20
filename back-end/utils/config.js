require('dotenv').config();

const PORT =process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const API_KEY = process.env.API_KEY;


module.exports = {
    MONGODB_URI,
    PORT,
    JWT_SECRET,
    API_KEY
};