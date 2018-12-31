let x_vals = [];
let y_vals = [];

let b, m;
const learningRate = 0.5;

function setup(){
  createCanvas(400,400);

  //Starts with randomized parameters between 0 and 1
  b = Math.random();
  m = Math.random();
}

function draw(){
  //So long as there are points to be fitted to
  if(x_vals.length > 0){
    //The algorithm continuously improves itself with each frame drawn
    gradientDescent();
  }

  background(0);

  stroke(255);
  strokeWeight(8);
  //Prints each point currently recorded from the user, mapped from cartesian
  for(let i = 0; i < x_vals.length; i++){
    let px = map(x_vals[i], 0, 1, 0, width);
    let py = map(y_vals[i], 0, 1, height, 0);
    point(px, py);
  }

  //The cartesian extremes of the line
  const lineX = [0, 1];
  const lineY = [predict(lineX[0]), predict(lineX[1])];

  //The cartesian x values are mapped to the canvas
  let x1 = map(lineX[0], 0, 1, 0, width);
  let x2 = map(lineX[1], 0, 1, 0, width);

  //The cartesian y values are mapped to the canvas
  let y1 = map(lineY[0], 0, 1, height, 0);
  let y2 = map(lineY[1], 0, 1, height, 0);

  //Line of best fit is drawn
  strokeWeight(2);
  line(x1, y1, x2, y2);
}

function mousePressed(){
  // let x = map(mouseX, 0, width, 0, 1);
  // let y = map(mouseY, 0, height, 1, 0);
  // x_vals.push(x);
  // y_vals.push(y);
}

function mouseDragged(){
  let x = map(mouseX, 0, width, 0, 1);
  let y = map(mouseY, 0, height, 1, 0);
  x_vals.push(x);
  y_vals.push(y);
}

function predict(x){
  //Y-intercept + slope * x
  return b + m * x;
}

function gradientDescent(){
//Linear Regression with Gradient Descent:
//  repeat until convergence{
//    theta_0 = theta_0 - alpha * avgsum(hypothesis(x_i) - actual(x_i))
//    theta_1 = theta_1 - alpha * avgsum((hypothesis(x_i) - actual(x_i)) * x_i)
//  }
//
  let totalB = 0;
  let totalM = 0;

  for(let i = 0; i < x_vals.length; i++){
    totalB += (predict(x_vals[i]) - y_vals[i]);
    totalM += (predict(x_vals[i]) - y_vals[i]) * x_vals[i];
  }

  b = b - (totalB / x_vals.length * learningRate);
  m = m - (totalM / x_vals.length * learningRate);
}
