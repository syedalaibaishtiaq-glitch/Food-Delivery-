import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/user/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value
        const name = profile.displayName

        let user = await userModel.findOne({ email })

        if (!user) {
          const randomPassword = Math.random().toString(36).slice(-12)
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(randomPassword, salt)

          user = new userModel({ name, email, password: hashedPassword })
          await user.save()
        }

        return done(null, user)
      } catch (error) {
        return done(error, null)
      }
    }
  )
)

export default passport