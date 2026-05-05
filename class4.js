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
            }else if(method === "GET" && pathname === "/files"){
                await this.listFiles(res);
            }else if(method === "GET" && pathname === "/file/"){
                const fileName = pathname.substring(6);
                await this.readFile(res, fileName);
            }else if(method === "POST" && pathname === "/file"){
                await this.createFile(req, res);
            }else if(method === "DELETE" && pathname.startsWith('/file/')){
                const fileName = pathname.substring(6);
                await this.deleteFile(res, fileName);
            }else{
                this.sendResponse(res, 404, {error: "Not Found"});
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
            const textFiles = files.filter(file => file.extname(file)===".txt")
            this.sendResponse(res, 200, textFiles);
        }catch(error){
            console.error(error);
            this.Response(res, 500, {
                error: "Server Error"
            })
        }
    } 

}

const server = new FileServer(3000)

///All the methods are developed;
