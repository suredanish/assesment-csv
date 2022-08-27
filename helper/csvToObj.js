module.exports = function csvToObj(file) {
    let finalAry = []
    let head = file.substring(0, file.indexOf("\n")). split(";");
    let data = file.substring(file.indexOf("\n") + 1).split("\n").map( datarow => datarow.split(";"));
    data.forEach(row=> {
        let t = {}
        for( let i = 0; i< row.length; i++){
            t[head[i]] = row[i];
        }
        finalAry.push(t);
    });
    return finalAry;
};