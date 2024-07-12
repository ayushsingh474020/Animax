import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

//routes
import authRoutes from './routes/auth.js';
import animesRoutes from './routes/anime.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();

/** Middlewares */

const corsConfig = {
    credentials: true,
    origin: "http://localhost:3000",
};
app.use(cors(corsConfig));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const port = process.env.PORT || 8700;

const connect = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('MongoDB connected');
    }).catch((err) => {
        console.log(err);
    });
};


app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/animes", animesRoutes)
app.use("/api/user", userRoutes)


app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(port, () => {
    console.log(`Connected on ${port}`)
    connect();
})
