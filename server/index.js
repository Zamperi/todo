import express from "express";
import cors from "cors";
import "dotenv/config";

import todoRouter from "./routes/todoRouter.js";
import userRouter from "./routes/userRouter.js";
import { validateEnv } from "./helper/envTest.js";

try {
    validateEnv();
} catch (error) {
    console.log(error);
    process.exit(1);
}

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(`/`, todoRouter);
app.use(`/user`, userRouter);

app.use((req, res, next)=>{
    next({status: 404, message: "Not found"});
});

app.use((err, req, res, next)=>{
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        error: {
            message: err.message,
            status: statusCode
        }
    });
});

app.listen(port, ()=> {
    console.log(`Server running at port ${port}`);
});