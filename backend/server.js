const express = require("express")
const colors = require("colors")

const app = express()

PORT = 8000

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