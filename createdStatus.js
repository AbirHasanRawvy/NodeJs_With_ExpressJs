///Created Status;
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.status(201).send("User Created");
});

app.listen(5000, () => {

    console.log("Server is running.");
});