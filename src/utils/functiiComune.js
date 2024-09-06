/* eslint-disable linebreak-style */
export  const dataFormatRO=(timestamp)=>{
  var data= new Date(Date.parse(timestamp)*1)
  return data.toLocaleString('ro-RO')
}

export const dynamicSort=(property)=> {
  var sortOrder = 1;
  if(property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a,b) {
    /* next line works with strings and numbers, 
       * and you may want to customize it to your needs
       */
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}

export function dynamicMultipleSort() {
  /*
    * salvează obiectul arguments deoarece va fi suprascris
    * trebuie menționat că obiectul arguments este un obiect asemănător unui array
    * format din numele proprietăților după care se sortează
    */
  var props = arguments;
  return function (obj1, obj2) {
      var i = 0, result = 0, numberOfProperties = props.length;
      /* încearcă să obții un rezultat diferit de 0 (egal)
       * atâta timp cât avem proprietăți suplimentare de comparat
       */
      while(result === 0 && i < numberOfProperties) {
          result = dynamicSort(props[i])(obj1, obj2);
          i++;
      }
      return result;
  }
}