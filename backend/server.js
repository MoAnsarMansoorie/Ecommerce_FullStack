import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import colors from "colors"
import connectToDb from "./config/db.js"

// configure dotenv
dotenv.config()

// config database
connectToDb()

// rest object
const app = express()

// middleware
app.use(express.json())
app.use(morgan("dev"))

const PORT = process.env.PORT || 8080

// Rest API
app.get("/", (req, res) => {
    res.send({
        message: "Welcome to Ecommerce App!"
    })
})

// listen server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`.bgCyan.red);
})