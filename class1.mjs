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


// const https =require("http");

// https.get("https://jsonplaceholder.typicode.com/todos", (res) => {
//     let data = "";
//     res.on("data", (d) => {
//         data += d;
//     })
//     res.on("end", () => {
//         console.log('Status', res.statusCode);
//         console.log("Body; ", JSON.stringify(data));
//     });
// })
// .on("error", (err) => {
//     console.error(err);
// });

///fetch;

// const res = await fetch("https://jsonplaceholder.typicode.com/todos");
// if (!res.ok) throw new Error(`HTTP ${res.status}`);
// const json = await res.json();
// console.log(json);


///URL Modulel:

// import {URL} from "node:url";

// const u = new URL("http://example.com:8080/path/to?x=1#top");

// console.log(u.protocol);
// console.log(u.hostname);
// console.log(u.port);
// console.log(u.pathname);
// console.log(u.search);
// console.log(u.hash);

// u.searchParams.set("page", "5");
// u.searchParams.append("x","2");

// console.log(u.toString());


//JSON read/write helper;

//read file;
export async function readJSON(path) {
    const txt = await readFile(path, "utf8");
    return JSON.parse(txt);
}

//write file;
export async function writeJSON(path, data) {

    await writeFile(path, JSON.stringify(data, null, 2), "utf8");
    
}

await writeJSON("data.json", {
    users: [
        {
            id: 1,
            name: "Abir",
        },
    ],
});

console.log(await readJSON("data.json"));


