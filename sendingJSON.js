///Sending JSON Responses;
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    
    res.json({

        name: "Abir Hasan",
        age: 25,
        profession: "Full Stack Developer",
    });
});

app.listen(4000, () => {
    console.log("Server is running!");
});