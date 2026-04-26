///Request-Response Model (HTTP Server);

import http from "node:http"

const server = http.createServer((req, res) => {
    const {method, url, headers} = req;
    if(method === "GET" && url === "/") {

        res.writeHead(200, {"Content-type": "text/plain" });
        res.end("Hello from Node HTTP Server\n");

    }else if(method === "POST" && url === "/echo"){

        let body = "";
        res.on('data', (chunk) => (body += chunk));
        res.on("end", () => {
          res.writeHead(201, { "content-type": "application/json" });
          res.end(JSON.stringifyf({ youSent: body}));  
        });

    }else{

        res.writeHead(404, {"Content-type": "text/plain" });
        res.end("Not Found\n");
    }
});

server.listen(5000, () => console.log('Server on 5000 port.'));

///Something new;