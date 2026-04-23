///Not Found Status;
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.status(404).send("Not Found Status");
});

app.listen(3000, () => {

    console.log("Server is running.");
});