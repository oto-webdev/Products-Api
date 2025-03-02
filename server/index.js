import express from 'express';
import cors from 'cors';    
import { config } from 'dotenv';
import connectDB from './config/connect.db.js';
import productRoute from './routes/product.route.js';

config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoute);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})