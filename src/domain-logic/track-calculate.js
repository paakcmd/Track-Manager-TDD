export function* trackCalculate(numbers = [], target, goal = []) {
  var sum = 0;
  for (var i = 0; i < goal.length; i++) {
    sum += goal[i].time;
  }

  if (sum === target) {
    yield goal;
  }
  if (sum > target) {
    return;
  }

  for (var j = 0; j < numbers.length; j++) {
    var number = numbers[j];
    var remaining = numbers.slice(j + 1, numbers.length);
    var newGoal = goal.slice(0, goal.length);
    newGoal.push(number);
    yield* trackCalculate(remaining, target, newGoal);
  }
}


export function scheduleMaker(time, track) {
  var listOfTrackIndex = [];
  var schedule = [];
  var sum = 0;

  for (var i = 0; i < track.length; i++) {
    listOfTrackIndex.push(track[i].id);
    schedule.push(track[i]);
  }
  schedule.push({ id: 'Lunch', time: 60 });
  for (var j = 0; j < time.length; j++) {
    if (listOfTrackIndex.indexOf(time[j].id) === -1) {
      if(sum + time[j].time <= 240){
        sum = sum + time[j].time;
        schedule.push(time[j]);
      }
    }
  }
  schedule.push({ id: 'Network Event', time: 60 });
  return schedule;
}


export function timeSum(previousTime, minutes) {
  return previousTime + minutes;
}


export function trackDisplay(schedule, text) {
  text = text.split('\n');
  var previousTime = 540;
  var displaySchedule = [];
  for (var i = 0; i < schedule.length; i++) {
    var track = {};
    var minuteRemainder = String(previousTime % 60);
    if (minuteRemainder.length === 1) {
      minuteRemainder = '0' + minuteRemainder;
    }
    var timeInHrAndMinute =
      String(Math.floor(previousTime / 60)) + '.' + minuteRemainder;
    track.time = timeInHrAndMinute;
    if (text[schedule[i].id]) {
      track.event = text[schedule[i].id];
    } else {
      track.event = schedule[i].id;
    }
    previousTime = timeSum(previousTime, schedule[i].time);
    displaySchedule.push(track);
  }
  return displaySchedule;
}
