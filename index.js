///Root file;

//call express;
const express = require('express');
const app = express()

//Route set
app.get('/', (req, res) => {
    res.send("Hello Express!")
});

app.get('/about', (req, res) => {
    res.send("Hello Express about!")
});

//Start server/listen
app.listen(5000, ()=> {
    console.log("Server is running!");
});