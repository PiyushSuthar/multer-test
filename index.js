const express = require('express')
const app = express()
const multer = require('multer')
const path = require('path')

app.use(express.json())
app.use("/api", require("./routes/upload"))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.listen(8000, () => console.log("Started Server"))