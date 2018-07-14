export const timeInterpret = text => {
  var time = [];
  text = text + '\n';
  text = text.split('\n');
  console.log('after:', text)
  for (var i = 0; i < text.length ; i++) {
    text[i] = text[i].replace('lightning', ' 5min');
    var patt = /\d+min/g;
    var word = String(text[i].match(patt));
    var timeSlot = {};
    timeSlot.id = i;
    timeSlot.time = parseInt(word.replace('min', ''),10);
    if(timeSlot.time) {
      time.push(timeSlot);
    }
  }
  return time;
};
