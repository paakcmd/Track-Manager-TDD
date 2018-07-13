
export const trackCalculate = function(numbers, target=15, goal=[]) {
    var sum;
    if(goal.length>0) {
      sum = goal.reduce(function(a, b) { return a + b; });
    }
    else {
      sum = 0;
    }
    if(sum === target) {
      console.log(goal);
    }
    if( sum >= target) {
      return
    }
    console.log(sum)

    for(var i = 0; i < numbers.length; i++) {
      var number = numbers[i]
      var remaining = numbers.slice(i+1,numbers.length)

      goal.push(number);
      console.log(remaining)
      console.log(goal);
      trackCalculate(remaining, target, goal);
    }
}
