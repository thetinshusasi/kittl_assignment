import * as express from "express";
import illustrationRouter from "./illustration";


const rootRouter = express.Router();

rootRouter.use("/illustrations", illustrationRouter)
export default rootRouter;
