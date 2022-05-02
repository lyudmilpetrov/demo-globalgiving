export const isObjectEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};
export const convertToCSV = (objArray) => {
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  var str = "";
  for (var i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line !== "") line += ",";

      line += array[i][index];
    }

    str += line + "\r\n";
  }
  return str;
};
export const exportCSVFile = (items, fileTitle) => {
  let headerObj = {};
  if (items.length > 0) {
    let keys = Object.keys(items[0]);
    keys.map((x) => {
      headerObj[x] = x;
    });
  }
  items.unshift(headerObj);
  items.map((x) => {
    let keys = Object.keys(x);
    keys.map((y) => {
      if (Object.prototype.toString.call(x[y]) !== "[object Object]") {
        if (x[y].toString().includes(",")) {
          x[y] = x[y].toString().replaceAll(",", "");
        }
      } else {
        if (typeof x[y]?.id !== "undefined") {
          if (x[y]?.id.toString().includes(",")) {
            x[y] = x[y]?.id.toString().replaceAll(",", "");
          } else {
            x[y] = x[y]?.id;
          }
        } else {
          x[y] = "";
        }
      }
    });
  });
  var jsonObject = JSON.stringify(items);
  var csv = convertToCSV(jsonObject);
  var exportedFilenmae = fileTitle + ".csv" || "export.csv";
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};
