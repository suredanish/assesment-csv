async function getTable(files, isbn = "notAnIsbn") {
   let formData = new FormData();

   Object.keys(files).forEach( key => {
      formData.append(files.item(key).name, files.item(key))
   })
   
   formData.append('isbn', isbn);
   const result = await fetch('http://localhost:3000/upload_file', {
      method: 'POST',
      body: formData
   })
   const data = await result.json();
   
   document.querySelector("#tableDiv").innerHTML = data.tableMarkup;
   
}


document.body.addEventListener( 'submit', async function (e) {
   if( e.target.id == 'isbnFilterForm' || e.target.id == 'uploadForm' ) {
      e.preventDefault();
      let files = document.querySelector('#uploadFile').files;
      const isbn = document.querySelector('#isbnInput')?.value?.trim();
     await getTable(files, isbn)
   }
 } );
let divId = Math.floor(Math.random() * 1000000);
document.getElementById("addMoreBooks").addEventListener("click", (e) => {
   const html_to_insert = `
   <div style="margin-bottom: 20px;" id = ${`div-${divId}`}  >
   <input type = "text" class = "bookName" placeholder = "Enter Book Name..." style="display: inline-block" required />
   <input type = "text" class = "bookIsbn" placeholder = "Enter Book Isbn..." style="display: inline-block" required />
   <input type = "text" class = "bookAuthor" placeholder = "Enter Book Author..." style="display: inline-block" required />
   <input type = "text" class = "bookDesc" placeholder = "Enter Book Desc..." style="display: inline-block"/>
   <input type = "button" class = "deleteRow" delete-button-for = ${`div-${divId++}`} value = "x"/>
   <div>
   `
   document.getElementById('addBooksDiv').insertAdjacentHTML('beforeend', html_to_insert);

})

document.body.addEventListener("click", (e) => {
   
   if(e.target.getAttribute('delete-button-for')){
      const divId = e.target.getAttribute('delete-button-for');
      document.getElementById(divId).remove();
   }
})

document.getElementById("exportBooksButton").addEventListener("click", async (e) => {

   let names = Array.from(document.querySelectorAll(".bookName")).map(e => e.value);
   let isbns = Array.from(document.querySelectorAll(".bookIsbn")).map(e => e.value);
   let authors = Array.from(document.querySelectorAll(".bookAuthor")).map(e => e.value);
   let descs = Array.from(document.querySelectorAll(".bookDesc")).map(e => e.value);

   let objToExport = []
   for(let i=0; i<names.length; i++){
      let obj = {};
      obj.name = names[i];
      obj.isbn = isbns[i];
      obj.author = authors[i];
      obj.desc = descs[i];

      objToExport.push(obj)
   }


  fetch('http://localhost:3000/exporttocsv', {
   method: 'POST', 
   mode: 'cors', 
   cache: 'no-cache',
   credentials: 'same-origin', 
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify({books: objToExport})
})
.then(response => response.blob())
.then(blob => {
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = "filename.csv";
    document.body.appendChild(a);
    a.click();    
    a.remove();      
});
})
