import express from "express"
import { loginUser, registerUser, googleCallback } from "../controllers/userController.js"
import passport from "../config/passport.js"

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)

// google oauth
userRouter.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"], session: false }))
userRouter.get("/auth/google/callback", passport.authenticate("google", { session: false, failureRedirect: "/" }), googleCallback)

export default userRouter