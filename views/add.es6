const MyLayout = require('./layout.es6')
const Layout  = require("es6views").Layout
const {makeTableMarkup, isbnFilterMarkup} = require('../helper/markups')
 
class Posts extends Layout {
    parse() {
        let markup = `
        <head>
            <title>Add Books</title>
        </head>
        <body>`
        

        markup += `
        <div id = "panel">
        <div id ="addBooksDiv" >
        <div style="margin-bottom: 20px;">
        <input type = "text" class = "bookName" placeholder = "Enter Book Name..." style="display: inline-block" required />
        <input type = "text" class = "bookIsbn" placeholder = "Enter Book Isbn..." style="display: inline-block" required />
        <input type = "text" class = "bookAuthor" placeholder = "Enter Book Author..." style="display: inline-block" required />
        <input type = "text" class = "bookDesc" placeholder = "Enter Book Desc..." style="display: inline-block"/>
        </div>
        </div>
        
        <div id = "addBookBtns">
        <input type = "button" id = "addMoreBooks" style="display: inline-block" value = "Add More"/>
        <input type = "button" id = "exportBooksButton" style="display: inline-block" value = "Export To CSV"/>

        </div>
        `
        markup += `<script type="module" src="../public/js/main.js"></script> </body>`


        
        this._markup = markup;
    }

}
 
module.exports = Posts