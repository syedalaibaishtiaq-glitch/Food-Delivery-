
// import express from "express"
// import cors from "cors"
// import "dotenv/config"
// import { connectDB } from "./config/db.js"
// import foodRouter from "./routes/foodRoute.js"
// import userRouter from "./routes/userRoute.js"
// import cartRouter from "./routes/cartRoute.js"
// import orderRouter from "./routes/orderRoute.js"
// import passport from "./config/passport.js"

// // app config
// const app = express()
// const port = process.env.PORT || 4000

// // middleware
// app.use(express.json())
// app.use(cors())
// app.use(passport.initialize())

// // image serving
// app.use("/images", express.static("uploads"))

// // db connection
// let dbConnected = false;
// app.use(async (req, res, next) => {
//   if (!dbConnected) {
//     await connectDB();
//     dbConnected = true;
//   }
//   next();
// });


// // api endpoints
// app.use("/api/food", foodRouter)
// app.use("/api/user", userRouter)
// app.use("/api/cart", cartRouter)
// app.use("/api/order", orderRouter)

// // test route
// app.get("/", (req, res) => {
//   res.send("API Working")
// })

// app.listen(port, () => {
//   console.log(`Server started on http://localhost:${port}`)
// })

// app.listen(port, () => {
//   console.log(`Server started on http://localhost:${port}`)
// })

// export default app

// import express from "express"
// import cors from "cors"
// import "dotenv/config"
// import { connectDB } from "./config/db.js"
// import foodRouter from "./routes/foodRoute.js"
// import userRouter from "./routes/userRoute.js"
// import cartRouter from "./routes/cartRoute.js"
// import orderRouter from "./routes/orderRoute.js"
// import passport from "./config/passport.js"
// import path from "path"
// import { fileURLToPath } from "url"

// // app config
// const app = express()
// const port = process.env.PORT || 4000

// // __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// // middleware
// app.use(express.json())
// app.use(cors())
// app.use(passport.initialize())

// // image serving
// app.use("/images", express.static(path.join(__dirname, "uploads")))

// // db connection
// let dbConnected = false

// app.use(async (req, res, next) => {
//   try {
//     if (!dbConnected) {
//       await connectDB()
//       dbConnected = true
//     }
//     next()
//   } catch (error) {
//     next(error)
//   }
// })

// // api endpoints
// app.use("/api/food", foodRouter)
// app.use("/api/user", userRouter)
// app.use("/api/cart", cartRouter)
// app.use("/api/order", orderRouter)

// // test route
// app.get("/", (req, res) => {
//   res.send("API Working")
// })

// // Only listen locally
// if (process.env.NODE_ENV !== "production") {
//   app.listen(port, () => {
//     console.log(`Server started on http://localhost:${port}`)
//   })
// }

// export default app


import express from "express"
import cors from "cors"
import "dotenv/config"
import path from "path"
import { fileURLToPath } from "url"

import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import passport from "./config/passport.js"

// app config
const app = express()
const port = process.env.PORT || 4000

// Get current file directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// middleware
app.use(express.json())
app.use(cors())
app.use(passport.initialize())

// Serve images from uploads folder
app.get("/images/:filename", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.filename)

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({
        success: false,
        message: "Image not found"
      })
    }
  })
})

// database connection
let dbConnected = false

app.use(async (req, res, next) => {
  try {
    if (!dbConnected) {
      await connectDB()
      dbConnected = true
    }

    next()
  } catch (error) {
    console.log("Database connection error:", error)
    res.status(500).json({
      success: false,
      message: "Database connection failed"
    })
  }
})

// API endpoints
app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

// test route
app.get("/", (req, res) => {
  res.send("API Working")
})

// Run server locally only
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
  })
}

// Export app for Vercel
export default app