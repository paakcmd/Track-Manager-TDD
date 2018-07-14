export function * trackCalculate(numbers = [],target, goal = []) {
  var sum = 0;
  for (var i = 0; i < goal.length; i++) {
    sum += goal[i].time;
  }

  if (sum === target) {
    yield goal
  }
  if (sum > target) {
    return
  }

  for (var j = 0; j < numbers.length; j++) {
    var number = numbers[j];
    var remaining = numbers.slice(j+1, numbers.length);
    var newGoal = goal.slice(0,goal.length);
    newGoal.push(number);
    yield * trackCalculate(remaining,target ,newGoal);
  }

}
