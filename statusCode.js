///Response Status Code;
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello!");
});

app.listen(5000, () => {
    console.log("Server is running.");
});

//200 -> OK;
//201 -> Creted;
//400 -> Bad Request;
//401 -> Unauthorized;
//403 -> Forbidden;
//404 -> Not Found;
//500 -> Internal Server Error;
