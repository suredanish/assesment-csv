var bodyParser = require('body-parser');
var express = require('express');
const fileUpload = require('express-fileupload')
var app = express();
const path = require('path');
const csvToObj = require('./helper/csvToObj');
const makeCommonObj = require('./helper/makeCommonObj');
const {makeTableMarkup, isbnFilterMarkup} = require('./helper/markups')
const os = require('os');
const fs = require('fs');

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extend:true, extended: true}));
const viewEngine = (new require("es6views").viewEngine)(app)
app.set('view engine', 'es6');
app.use(express.static(path.join(__dirname, 'public')));


app.set('views', __dirname + '/views');

app.get('/', function(req, res){

    

    let locals = Object.assign({}, res.locals, {
        data: [],
        title: "new Page"
    })
    res.render("index", locals);;
});

app.post('/upload_file', fileUpload({createParentPath: true}),async (req,res) => {
    const isbn = req.body.isbn;
    const objs = Object.keys(req.files).map(key => csvToObj(req.files[key].data.toString("utf8").trim()))





    let obj = makeCommonObj(objs);

    obj.sort( (a,b) => {return a.title > b.title ? 1 : -1;})
    let tableMarkup = makeTableMarkup(obj, isbn);

    

    if(obj[0].isbn) tableMarkup += isbnFilterMarkup;



    res.send({tableMarkup: tableMarkup})

});


app.get("/add", (req,res) => {
    res.render("add");
})

app.post('/exporttocsv', async(req,res) => {

    
    const convertToCSV = (arr) => {
        const array = [Object.keys(arr[0])].concat(arr)
      
        return array.map(it => {
          return Object.values(it).join(",")
        }).join('\n')
      }


        return res.send(convertToCSV(req.body.books));

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

