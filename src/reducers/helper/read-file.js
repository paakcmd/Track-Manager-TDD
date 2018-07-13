export const readFile = file => {
  var reader = new FileReader();
  reader.readAsText(file);
  return new Promise(function(resolve, reject) {
    reader.onload = function(e) {
      resolve(e.target.result);
    };
  });
};
