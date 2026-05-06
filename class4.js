///
const { promises } = require("dns");
const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const url = require("url");


class FileServer {

    constructor(port = 3000){
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

    async readFile(res, fileName){
        try{
            const data = await fs.readFile(fileName, "utf8");
            res.writeHead(200, {"Content": "text/plain"});
            res.end(data);
        }catch(error){
            this.sendResponse(res, 404, {error:"File not found"});
        }
    } 

    async createFile(req, res){
        try{
             let body = ' ';
             req.on('data', chunk => body = body + chunk);
             req.on('end', async () =>{
                try{
                    const {fileName, Content} = JSON.parse(body);
                    await fs.writeFile(fileName, Content || "", "utf8");
                    this.sendResponse(res, 201, {message: "File created successfully"})
                }catch(error){
                    this.sendResponse(res, 500, {error: "Error creting file."})
                }
             })
        }catch(error){
             this.sendResponse(res, 404, {error:"File not found"});
        }
    }

    async deleteFile(res, fileName) {
        try{
            await fs.unlink(fileName);
             this.sendResponse(res, 200, {message: "File delete successfully"})
        }catch(error){
            this.sendResponse(res, 500, {error: "Error dleting file"})
        }
    }

    sendResponse(res, statusCode, data) {
        res.writeHead(statusCode, {"Content-Type": "application/json"});
        res.end(JSON.stringify(data));
    }

    start(){
        this.server = http.createServer((req, res) => this.handleRequest(req, res));
        this.server.listen(this.port, () =>{
            console.log(`Server is running on port ${this.port}`)
        })
    }

}

const server = new FileServer(3000)

server.start();

///All the methods are developed;
