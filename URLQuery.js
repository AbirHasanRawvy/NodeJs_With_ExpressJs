//Express js URL Query

const express = require("express");
const app = express();

app.get('/search', (req, res) => {
    let name = req.query.name;
    let age = req.query.age;

    res.send(`User name is: ${name}. And your age is: ${age}`)
});

app.listen(5000, () => {
    console.log("Server is running!");
});