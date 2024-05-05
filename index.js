const http = require("http")
const url = require("url")
const fs = require("fs")

http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true)
    let fileName = "."
    console.log("URL: ", parsedUrl)

    switch(parsedUrl.pathname){
        case "/":
            fileName += "/index"
            break;
        case "/about":
        case "/contact-me":
            fileName += parsedUrl.pathname
            break;
        default:
            fileName += "/404"
    }

    fileName += ".html"

    console.log("FileName: ", fileName)

    fs.readFile(fileName, (err, data) => {
        if(err){
            res.writeHead(404, {'Content-type': 'text/html'})
            return res.end("404 Not Found")
        }
        res.writeHead(200, {'Content-type': 'text/html'});
        res.write(data)
        return res.end()
    })
}).listen(8080)