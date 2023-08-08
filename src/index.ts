import express, { Express, NextFunction, Request, Response } from "express";
import { database } from "./datastore/index";
import userRouter from "./routers/user.router";

require("dotenv").config()
const app: Express = express()

const port = process.env.PORT ?? 3000

const requestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.method, req.path, "- body: ", req.body)
  next()
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use("/users", userRouter)

app.get("/courses", (req: Request, res: Response) => {
  res.send(database.getCourses.length)
})

app.get("/", (req, res) => {
  res.send("Hello world")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})