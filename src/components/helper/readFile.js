export const readFile = file => {
  var reader = new FileReader();
  reader.onload = function(progressEvent){
    return this.result;
  };
  reader.readAsText(file);
}
