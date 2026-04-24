///Handling HTTP Methods- GET POST  PUT  DELETE

//Get -> When client want to see data from server->create;
//POST ->  When client send data for his end->read;
//PUT -> When client update or change his data->update;
//DELETE -> When client delete or erase some data->delete;
//[GET-POST-PUT-DELETE]->CRUD Operation;



///
const express = require("express");
const app = express();

app.use(express.json());//permision for took jason data;

//GET Method;
app.get("/products", (req, res) => {
    res.send("All products are showing here.");
});


//POST Method: read;
app.post("/products", (req, res) => {
    const newProduct = req.body;

    console.log(newProduct);

    res.send(`New Product Added: ${JSON.stringify(newProduct)}`);
});

//PUT: update;
app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    const updatedProduct = req.body;
    res.send(`Product(ID: ${id}) Updated: ${JSON.stringify(updatedProduct)}`);
});

//Delete: Erase something;
app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    res.send(`Product(ID: ${id}) deleted.`);
});



app.listen(5000, () => {
    console.log("Server is running!");
});