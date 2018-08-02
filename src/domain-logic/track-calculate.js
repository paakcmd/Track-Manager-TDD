// Calculate schedule combination using recursive
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

//modify schedule and add lunch and network time to object
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
      if (sum + time[j].time <= 240) {
        sum = sum + time[j].time;
        schedule.push(time[j]);
      }
    }
  }
  schedule.push({ id: 'Network Event', time: 60 });
  return schedule;
}

//Sum up time
export function timeSum(previousTime, minutes) {
  return previousTime + minutes;
}

//modify schedule to display
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

export function calculateFreeActivities(allActivities, usedActivities) {
  var ids = new Set(usedActivities.map(({ id }) => id));
  var freeActivities = allActivities.filter(({ id }) => !ids.has(id));
  return freeActivities;
}

export function sumAllTrackTime(track) {
  var totalTime = 0;
  for (var i = 0; i < track.length; i++) {
    totalTime += track[i].time;
  }
  return totalTime;
}

export function removeLunchAndNetwork(track) {
  track = track.filter(({ id }) => !(typeof id === 'string'));
  return track;
}

export function setNetworkTimeToLatest(allTracks, networkTime) {
  networkTime = networkTime - 60; //remove time set to network event by default
  var hr = (Math.floor(networkTime / 60) + 9).toString();
  var min = (networkTime % 60).toString();
  if (parseInt(hr, 10) < 16) {
    hr = '16';
    min = '00';
  } // check if network time is before 4pm
  if (min === '0') {
    min = '00';
  } // incase min = 0 change to 00 for a nice display
  var formattedNetworkTime = hr.concat('.').concat(min);
  var newAllTracks = [];
  allTracks.forEach(function(track) {
    track[track.length - 1].time = formattedNetworkTime;
    newAllTracks.push(track);
  });
  return newAllTracks;
}
