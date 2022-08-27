const MyLayout = require('./layout.es6')
const Layout  = require("es6views").Layout
const {makeTableMarkup, isbnFilterMarkup} = require('../helper/markups')
 
class Posts extends Layout {
    parse() {
        let markup = `
        <head>
            <title>Page</title>
        </head>
        <body>`
        

        markup += `
        <form class="upload" id = "uploadForm" style="display: flex; justify-content: center;">
            <div>
            <input type="file" name="uploadFile" id="uploadFile" multiple style="display: inline-block" required />
            
            <input  style="display: inline-block"  type="submit" />
            </div>
        </form>

        <div id = "tableDiv" > </div>
        `
        markup += `<script type="module" src="../public/js/main.js"></script> </body>`


        
        this._markup = markup;
    }

}
 
module.exports = Posts