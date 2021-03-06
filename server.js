const express = require('express');
const path = require('path');
const app = express();
var multer  = require('multer');
var upload = multer({ storage: multer.memoryStorage() });
var JSZip = require("jszip");
var zip = new JSZip();

app.use(express.static(path.join(__dirname, 'app', 'build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'app', 'build', 'index.html'));
});

app.post('/manifests', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    const csv = req.file.buffer.toString();
    const oldHeaders = 'Quantity,Retail_Price,Extended Retail,Model_Number,Item_Description,UPC,reason_name,Vendor_Name,Department,Sub-Cat,Shipping_Dim x,Shipping_Dim y,Shipping_Dim z,Shipping Weight,pallet_name,Pallet_ID#,Pallet Size,Product ID';
    const newHeaders = 'Quantity,Item Description,Retail Price,Department,Pallet ID';
    const validOldColNums = [0, 1, 4, 8, 15];
    let array = [];
    let split = csv.split('\n');
    const regex = /(?!\B"[^"]*),(?![^"]*"\B)/;
    let id = split[1].split(regex)[15];

    for(let i = 1; i < split.length; i++) {
        let newRow = [];
        let retail = null;
        let rows = split[i].split(regex);

        if(rows[15] !== id) {
            let arr = array.sort((a, b) => {
                let name1 = a.dept.toUpperCase();
                let name2 = b.dept.toUpperCase();
                if(name1 < name2) return -1;
                if(name1 > name2) return 1;
                return 0;
            });
            zip.file("pallet-manifest-" + id + ".csv", newHeaders + '\n' + arr.map(item => item.join(',')).join('\n'));
            array.length = 0;
            id = rows[15];
        }

        rows.forEach((item, idx) => {
            if(validOldColNums.includes(idx)) {
                if(idx === 1) {
                    retail = item;
                }
                else {
                    newRow.push(item);

                    if(idx === 8) {
                        newRow.dept = item || '';
                    }
                }
            }
        });

        newRow.splice(2, 0, retail);
        array.push(newRow);
    }

    zip.generateNodeStream({type:'nodebuffer', streamFiles:true}).pipe(res);
});

app.listen(process.env.PORT || 8080);