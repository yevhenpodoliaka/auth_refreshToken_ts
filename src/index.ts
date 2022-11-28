import express, { Express, Request, Response,NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import logger from "morgan"
import mongoose from "mongoose"
import { IRequestError } from "./interfaces"
import authRouter from "./routes/auth"

dotenv.config();

const app: Express = express();
const { PORT = 3003, DB_HOST = "" } = process.env;

app.use(cors());
app.use(logger("dev"))
app.use(express.json());

app.use("/api/auth",authRouter)

app.use((req:Request, res:Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error: IRequestError, req: Request, res: Response, next: NextFunction): void => {
    const {status = 500, message = "Server error"} = error;
    res.status(status).json({
        message,
    })
});


mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    })
  )
  .catch((error: Error): void => {
        console.log(error.message);
        process.exit(1);
    })