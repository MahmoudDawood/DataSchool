import { Router } from "express"

const userRouter = Router()

const users: any[] = []

userRouter.get("/", (req, res, next) => {
  res.send("User route reached")
  next()
})

userRouter.post("/register", (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  users.push({email, password})
  console.log(users)
  res.send({email, password})
  next()
})

export default userRouter