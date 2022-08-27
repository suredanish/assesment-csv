module.exports = function makeCommonObj(data) {
    let keys = [];
    data.forEach( e => {
      keys.push( new Set(Object.keys(e[0])));
    });
  
    let commonKeys = [...keys [0]];
  
    keys.forEach(s => {
      commonKeys = commonKeys.filter(x => s.has(x));
    })
  
    console.log(commonKeys);
  
    let obj = [];
  
      data.forEach(ary => {obj = [...obj, ...ary]})
      const commonKeysSet = new Set(commonKeys);
      let ary = [];
      obj.forEach(e => {
        let t = {}
        Object.keys(e).map( key => {if(commonKeysSet.has(key)) t[key]= e[key]})
        ary.push(t)
      })

      return ary;
};