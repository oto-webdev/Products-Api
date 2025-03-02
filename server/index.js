import express from 'express';
import cors from 'cors';    
import { config } from 'dotenv';
import connectDB from './config/connect.db.js';
import productRoute from './routes/product.route.js';
import path from 'path';

config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoute);

if(process.env.NODE_ENV === "production") { 
    app.use(express.static(path.join(__dirname, "client/dist"))); 
    app.get("*", (req, res) => { 
        res.sendFile(path.join(__dirname, "client/dist/index.html")); 
    }); 
}

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})