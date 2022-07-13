require("express-async-errors");
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
// const morgan = require('morgan');
const postRouter = require('./routers/post');
const cors = require("cors");


const app = express();

const connectDatabase = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
};
connectDatabase();

app.use(express.json());
app.use(cors());
// app.use(morgan('dev'));
app.use('/api/post', postRouter);

app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('Port is listening on ' + PORT)
})