///
const { promises } = require("dns");
const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const url = require("url");


class FileServer {

    constructor(port){
        this.port = port;
        this.server = null;
    }

    async handleRequest(req, res){
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;
        const method = parsedUrl.method;

        //cors for frontend;
        res.setHeader("Access-Control-Allow-Origin");
        res.setHeader("Access-Control-Allow-Method", "GET,PUT,POST,DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if(method === "OPTIONS"){
            res.writeHead(200);
            return res.end();
        }

        try{

            if(method === "GET" && pathname === "/"){
                const html = await fs.readFile("index.html", "utf-8");
                res.writeHead(200, {"Content-Type": "text/html"});
                res.end(html);
            }

        }catch(error){
            console.error(res, 500, {
                error: "Server Error."
            })
        }

    }

    async listFiles(res) {
        try{
            const files = await fs.readdir("./");
        }
    } 
}

const server = new FileServer(3000)
