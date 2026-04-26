///Request-Response Model (HTTP Server);

// const http =require("http");

// const server = http.createServer((req, res) => {
//     const {method, url} = req;
//     if(method === "GET" && url === "/") {

//         res.writeHead(200, {"Content-type": "text/plain" });
//         res.end("Hello from Node HTTP Server\n");

//     } else if(method === "POST" && url === "/echo"){

//         let body = "";
//         req.on("data", (chunk) => {
//             console.log("Chunk Data ", chunk.toString());
//             body += chunk});
//         req.on("end", () => {
//           console.log("Recieved Data: ", body);
//           res.writeHead(201, { "content-type": "application/json" });
//           res.end(JSON.stringify({ youSent: body }));  
//         });

//     } else {

//         res.writeHead(404, {"Content-type": "text/plain" });
//         res.end("Not Found\n");
//     }
// });

// server.listen(5000, () => console.log('Server on 5000 port.'));

///Something new;


///HTTP Client;
const https =require("http");

https.get("https://jsonplaceholder.typicode.com/todos", (res) => {
    let data = "";
    res.on("data", (d) => {
        data += d;
    })
    res.on("end", () => {
        console.log('Status', res.statusCode);
        console.log("Body; ", JSON.stringify(data));
    });
})
.on("error", (err) => {
    console.error(err);
});

