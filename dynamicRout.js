///Express js Dynamic Routing.: Its too important topic;
const express = require("express");
const app = express();

app.get("/user/:id", (req, res) => {
    let userId = req.params.id;

    console.log(userId);

    res.status(200).send(userId);
});

app.listen(5000, () => {
    console.log("Server is running");
});