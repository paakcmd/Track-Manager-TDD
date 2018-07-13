export const trackCalculate = function(numbers, target, goal = []) {
  var sum = 0;
  for (var i = 0; i < goal.length; i++) {
    sum += goal[i];
  }

  if (sum === target) {
    console.log(goal)
  }
  if (sum >= target) {
    return
  }

  for (var j = 0; j < numbers.length; j++) {
    var number = numbers[j];
    var remaining = numbers.slice(j+1, numbers.length+1);
    var newGoal = goal.slice(0,goal.length);
    newGoal.push(number)
    trackCalculate(remaining, target, newGoal);
  }
};
