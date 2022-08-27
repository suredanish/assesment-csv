
function makeTableMarkup(data, reqIsbn = 'notanISBN') {

    return`
        <style>
        table, th, td {
          border:1px solid black;
        }
        </style>
        
        <table style="width:100%">
          <tr>
            ${Object.keys(data[0]).map(col => `<th> ${col} </th> `).join(' ')}
          </tr>


          ${
            data.map( row => {

              const isbnFound = row?.isbn?.replace(/-|\s/g, "") == reqIsbn.replace(/-|\s/g, "")
              

               const rowMarkup =  Object.values(row).map(e => `<td>${e}</td>`).join(' ')

               return `<tr ${isbnFound? `style="background-color: yellow;"` : ``}>${rowMarkup}</tr>`

            }). join(" ")
          }
         
        </table>

        `

};

const isbnFilterMarkup = `
<br></br>
<form class="isbnFilterForm" id = "isbnFilterForm" style="display: flex; justify-content: center;">
<div>
<input type="text" id = "isbnInput" name="isbnInput" placeholder = "Find by isbn" style="display: inline-block" />

<input  style="display: inline-block"  type="submit" />
</div>
</form>
`

module.exports = {isbnFilterMarkup,makeTableMarkup}