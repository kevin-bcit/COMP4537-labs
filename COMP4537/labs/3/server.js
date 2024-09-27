'use strict';
const http = require('http');
const url = require('url');
const fs = require('fs');
const myUtils = require('./modules/utils');
const  { GREETING } = require('./lang/en/en');

const port = 8888
const filePath = 'file.txt';

http.createServer(function (req, res) {
    const cur_url = url.parse(req.url, true)
    if(cur_url.pathname === '/getDate/'){
        const cur_time = myUtils.getDate();
        const cur_name = cur_url.query.name;
        const cur_greet = GREETING.replace('%1', cur_name);

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`<h3 style="color:blue">${cur_greet}${cur_time}</h3>`);
        console.log(`server is successfully sent a GET message to client ${cur_name} at ${cur_time}`);
    
    }else if(cur_url.pathname === '/writeFile/'){
        const content = cur_url.query.text || "";

        fs.appendFile(filePath, content, (err) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.end('<h3 style="color:red">500 File write error</h3>');
                console.error('Error appending to file:', err);
            } else {
                res.writeHead(201, {'Content-Type': 'text/html'});
                res.end('<h3 style="color:blue">Successfully added content to file.txt!</h3>');
                console.log('Successfully appended to file.');
            }
        });
    
    }else if(cur_url.pathname.startsWith('/readFile/')){
        const readFilePath = cur_url.pathname.replace('/readFile/', '');

        fs.readFile(readFilePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(`<h3 style="color:red">404 File ${readFilePath} not found error</h3>`);
                console.error(err);
                return;
            }
            res.writeHead(201, {'Content-Type': 'text/html'});
                res.end(`<h3 style="color:blue">${data}</h3>`);
                console.log(`Successfully read content ${data} and sent to client.`);
        });

    }else{
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h3 style="color:red">404 Not Found</h3>');
        console.log('server is sending a 404 message to client');
    }
    
    
}
).listen(port);
console.log(`server is listening to port ${port} ...`);