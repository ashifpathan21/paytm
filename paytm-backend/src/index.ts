import { config } from "dotenv";
config();
import express, { type Request, type Response } from "express";
import { connectDB } from "./utils/db.js";
import UserRoutes from "./routes/userRoutes.js"

const PORT = process.env.PORT || 4000
connectDB();
const app = express();

app.use("/api/v1/user", UserRoutes);


app.get('/health', (req: Request, res: Response) => res.send("Server is healthy"))

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})