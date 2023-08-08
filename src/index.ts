import express, { Express } from "express"
import userRouter from "./routers/user.router"

const app: Express = express()
const port = process.env.PORT ?? 3000

app.use(express.json())
app.get("/", (_, res) => {
  res.send("Hello world")
})

app.use("/users", userRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})