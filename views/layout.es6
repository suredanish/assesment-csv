const Layout  = require("es6views").Layout
 
class MyLayout extends Layout {
 
    parse() {
        let markup = `<head>
            <title>${this._data.title}</title>
        </head>
        <body>`
        
        markup += [this.header(), this.content(), this.footer()].join("")
          
        markup += `</body>`
        
        this._markup = markup
    }
    

    
}
 
module.exports = MyLayout;