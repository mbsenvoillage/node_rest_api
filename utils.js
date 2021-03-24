const fs = require('fs');
const path = require('path');

function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', err => {
        if(err) console.log(err);
        console.log("File has been written to.");
    });
}

function getPostData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            })
            req.on('end', () => {
                resolve(body)
            })
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    writeDataToFile,
    getPostData
}
