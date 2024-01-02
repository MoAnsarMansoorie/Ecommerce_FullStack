import express from "express"
import dotenv from "dotenv"
import colors from "colors"

// configure dotenv
dotenv.config()

// rest object
const app = express()

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