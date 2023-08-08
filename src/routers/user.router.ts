import { Router } from "express"

const userRouter = Router()

const users: any[] = []

userRouter.get("/", (req, res, next) => {
  res.send("User route reached")
  next()
})

userRouter.post("/register", (req, res) => {
  // Sanitize input
  // Hash password
  // Store user in db
  // return a JWT
  const email = req.body.email
  const password = req.body.password
  users.push({email, password})
  res.send({email, password})
})

userRouter.post("/login", (req, res) => {
  // Authenticate the login credentials
  // return a JWT 
})

userRouter.get("/logout", (req, res) => {
  // Expire the token
  // Redirect to home page
})

userRouter.get("/me", (req, res) => {
  // Get profile info
})

userRouter.put("/me", (req, res) => {
  // Update profile info
})

userRouter.put("/me/password", (req, res) => {
  // (( Ask for unique code ))
  // Hash new password
  // Store new password
})

export default userRouter