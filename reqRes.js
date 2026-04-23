///Understanding Request and Response Objects.
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    // console.log(req.url);
    // console.log(req.method);
    // console.log(req.headers);
    // console.log(req.body);

    // res.send("Hello Express!");
    res.json({name:"Alex"});
});

app.get("/about", (req, res) => {
    res.send("Hello Express about!");
});

app.listen(3000, () => {
    console.log("Server is running");
});