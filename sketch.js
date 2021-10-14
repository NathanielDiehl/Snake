var WIDTH;
var HEIGHT;

const NUM_FOOD = 10;
const PIXEL_WIDTH = 10;
const START_LENGTH = 6;
const FRAME_RATE = 5;

var foods = {};
var snake;
var direction = [10,0];

class cell{
  constructor(x,y, next){
    this.x = x;
    this.y = y;
    this.next = next;
  }
}

class body{
  constructor(x,y){
    this.head = null;
    this.tail = null;
    this.count = 0;
  }
  addToBody(x,y){
    if(this.count < 0){
      console.log("Out of Bounds")
      return;
    }

    var newCell = new cell(x,y,null);

    if(this.count == 0) {
      this.head = newCell;
      this.tail = newCell;
    } else {
      this.tail.next = newCell;
      this.tail = newCell;
    }
  this.count++;
  }

  removeFromBody(){
    if(this.count <= 0){
      console.log("Out of Bounds")
      return;
    }

    this.head =this.head.next;
    this.count--;
  }

  getLength(){
    var p=this.head;
    var l = 1;
    while(p.next != null){
      p = p.next;
      l++;
    }
    return l;
  }

}

class food{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}

function placeFood(){
  return new food(int(random(WIDTH)/PIXEL_WIDTH)*PIXEL_WIDTH, int(random(HEIGHT)/PIXEL_WIDTH)*PIXEL_WIDTH);

}

function placeFoods(f){
  for(var i = 0; i < NUM_FOOD; i++){
    f[i] = placeFood();
  }
}

function drawFoods(f){
  fill(200,200, 0);
    
  for(var i = 0; i < NUM_FOOD; i++){
    ellipse(f[i].x, f[i].y, PIXEL_WIDTH, PIXEL_WIDTH);
  }
}

function eatFood(s, f){
  for(var i = 0; i < NUM_FOOD; i++){
    if(s.tail.x == f[i].x && s.tail.y == f[i].y){
      s.addToBody(s.tail.x + direction[0], s.tail.y + direction[1]);
      f[i] = placeFood();
      return;
    }
  }
}


function drawSnake(b){
  var ptr = b.head;

  fill(250);
  while(ptr!=null){
    ellipse(ptr.x, ptr.y, 10, 10);
    ptr=ptr.next;
  }
  fill(0, 250, 0);
  ellipse(b.tail.x, b.tail.y, 11, 11);
}

function move(s){
  s.addToBody(s.tail.x +direction[0], s.tail.y +direction[1]);
  s.removeFromBody();
}

function gameOver(s){
  if(s.tail.x > WIDTH)
    return true;
  if(s.tail.x < 0)
    return true;
  if(s.tail.y > HEIGHT)
    return true;
  if(s.tail.y < 0)
    return true;

  var ptr = s.head;

  while(ptr.next != null){
    if(s.tail.x == ptr.x && s.tail.y == ptr.y)
      return true;
    ptr = ptr.next;
  }
  return false;
}

function makeSnake(){
  snake = new body(200, 200);
  for(var i = 1; i <= START_LENGTH; i++){
    snake.addToBody(200 + i*direction[0], 200 + i*direction[1]);
  }
}

function setup() {
  WIDTH = windowWidth;
  HEIGHT = windowHeight;
  createCanvas(WIDTH, HEIGHT);
  frameRate(FRAME_RATE);

  makeSnake();
  placeFoods(foods);
}

function draw() {
  
  if(!gameOver(snake)){
    background(0);
    drawFoods(foods);
    drawSnake(snake);
    move(snake);
    eatFood(snake, foods);
  }else{
    background(250,0,0);
    direction = [10,0];
    alert("Game Over" + "\nScore: " + (snake.getLength() - START_LENGTH));
    background(0);
    makeSnake();
  }
}

function keyPressed() {
  if (keyIsDown(LEFT_ARROW) && direction[0] != 10) {
    direction[0] = -10;
    direction[1] = 0;
  }
  if (keyIsDown(RIGHT_ARROW) && direction[0] != -10) {
    direction[0] = 10;
    direction[1] = 0;
  }

  if (keyIsDown(UP_ARROW) && direction[1] != 10) {
    direction[1] = -10;
    direction[0] = 0;
  }

  if (keyIsDown(DOWN_ARROW) && direction[1] != -10) {
    direction[1] = 10;
    direction[0] = 0;
  }
}