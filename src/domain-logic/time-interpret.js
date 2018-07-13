export const timeInterpret = text => {
  var time = {}
  text = text.split('\n');
  for(var i = 0;i < text.length-1 ;i++){
    text[i] = text[i].replace('lightning','5min');
    var index = text[i].indexOf('min');
    time[i] = text[i].substring(index-2,index);
  }
  return time
}
