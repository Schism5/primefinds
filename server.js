const express = require('express');
const path = require('path');
const app = express();
var multer  = require('multer');
var upload = multer({ storage: multer.memoryStorage() });

//app.use(express.static(path.join(__dirname, 'app', 'build')));

app.get('/', function(req, res) {
  //res.sendFile(path.join(__dirname, 'app', 'build', 'index.html'));
  res.sendFile(path.join(__dirname, 'src', 'index.js'));
});

app.post('/upload/lol', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    let id = null;
    const csv = req.file.buffer.toString();
    const headers = 'Quantity,Retail_Price,Extended Retail,Item_Description,Department,Pallet_ID#';
    let array = [];
    let split = csv.split('\n');
    for(let i = 0; i < split.length; i++) {
        if(id === null) {
            id = i;
        }
    }
    res.status(200).send();
});

app.listen(process.env.PORT || 8080);