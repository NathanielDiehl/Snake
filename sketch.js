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
  if(s.tail.x > windowWidth)
    return true;
  if(s.tail.x < 0)
    return true;
  if(s.tail.y > windowHeight)
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
  snake.addToBody(210, 200);
  snake.addToBody(220, 200);
  snake.addToBody(230, 200);
  snake.addToBody(240, 200);
  snake.addToBody(250, 200);
  snake.addToBody(260, 200);
  snake.addToBody(270, 200);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(5);

  makeSnake();
}

function draw() {
  
  if(!gameOver(snake)){
    background(0);
    drawSnake(snake);
    move(snake);
  }else{
    background(250,0,0);
    direction = [10,0];
    alert("Game Over");
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