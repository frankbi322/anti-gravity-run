// import Start from './start';
import Pause from './pause';
import Obstacle from './obstacle';
import Player from './player';
import View from './view';
// import Background from './background';

export default class Game {
  constructor(canvas, stage) {
    this.gravity = 1;
    this.play=true;
    this.score=0;
    this.displayScore=new createjs.Text(`Score:  ${this.score}`,"30px Arial","blue");
    this.displayScore.x = 650;
    this.displayScore.y = 30;
    stage.addChild(this.displayScore);
    this.speed=0;
    window.stage = stage;
    window.height = canvas.height;
    window.width = canvas.width;
    // const img = new Image();
    // img.src = "assets/background.jpg";
    // img.onload = function () {
    //   const bitmap = new createjs.Bitmap(img);
    //   bitmap.x = 0;
    //   bitmap.y = 0;
    //   bitmap.name = "background";
    //   stage.addChild(bitmap);
    //   stage.update();
    // };
    this.player = new Player(stage);
    this.player.startPosition();
    this.obstacle = new Obstacle(stage);
    this.obstacle.populateObstacles();


    createjs.Ticker.setFPS(30);
    createjs.Ticker.on("tick",()=>this.handleTick());
    this.pause = this.pause.bind(this);
    setInterval(this.updateScore.bind(this),500);

    document.addEventListener("keydown",this.keyDown.bind(this));
    document.addEventListener("keyup",this.keyUp.bind(this));
    Pause(() => this.pause());
    // Start(() => this.play(), stage);
    this.isPlaying = true;
  }

  handleTick(e) {

    if (this.play==true)
    if (!createjs.Ticker.getPaused()) {
      this.player.move(this.gravity);
      this.obstacle.move();
      if (this.player.leaveBounds()) {
        this.gameOver();
      }
      if (this.collidesWith()){
        this.gameOver();
      }
      stage.update();
    }
  }

  restartGame(){
    window.location.reload();
  }

  updateScore(){
    if (this.play){
    stage.removeChild(this.displayScore);
    this.score+=1;
    let nextScore = new createjs.Text(`Score:  ${this.score}`,"30px Arial","blue");
    this.displayScore=nextScore;
    nextScore.x = 650;
    nextScore.y = 30;
    stage.addChild(nextScore);
    stage.update();
    }
  }

  updateSpeed(){
    this.speed+=1;
  }

  // play() {
  //   stage.removeAllChildren();
  //   Pause(() => this.pause());
  //   this.player.startPosition();
  //   this.obstacle.populateObstacles();
  //   createjs.Ticker.setFPS(60);
  //   createjs.Ticker.on("tick", e => this.handleTick(e));
  // }

  pause() {
    let paused = !createjs.Ticker.getPaused();
    createjs.Ticker.setPaused(paused);
    debugger
  }

  keyDown(e){
    let keycode = e.which || window.event.keycode;
    if (keycode == 32) {
      e.preventDefault();
      this.gravity = -this.gravity;
    }
    if (keycode == "A".charCodeAt(0)) {
      e.preventDefault();
      this.pause();
    }

  }

  keyUp(e){
    let keycode = e.which || window.event.keycode;

  }

  gameOver(){
    this.play=false;
    const lose = new createjs.Text("Game Over!\n\n","40px Arial","red");
    lose.text+=`You scored ${this.score} points!\n\n`;
    lose.textAlign = "center";
    lose.x = 400;
    lose.y = 200;
    stage.addChild(lose);
    stage.update();
    let replay = document.getElementById("replay");
    replay.className="replay";
    replay.addEventListener("click",this.restartGame);



  }

  collidesWith(){
    let xOffset;
    // let collides = false;
    let obstacles = this.obstacle.obstacles.children;
    for (let i = 0; i < obstacles.length; i++) {
      if (i == 0){
        xOffset = 400;
      } else if (i == 1) {
        xOffset = 700;
      } else if (i == 2) {
        xOffset = 1000;
      }

      if ( this.player.player.localToGlobal(0,0).x >= obstacles[i].localToGlobal(0,0).x + obstacles[i].width +xOffset||
           this.player.player.localToGlobal(0,0).x + this.player.player.width <= obstacles[i].localToGlobal(0,0).x +xOffset ||
           this.player.player.localToGlobal(0,0).y >= (obstacles[i].localToGlobal(0,0).y*2 + obstacles[i].height-20) ||
           this.player.player.localToGlobal(0,0).y + this.player.player.height <= (obstacles[i].localToGlobal(0,0).y*2)) {
          // console.log(xOffset);
          // collides = false;
        } else {
          // console.log("player x,y: ", this.player.player.localToGlobal(0,0).x, this.player.player.localToGlobal(0,0).y);
          // console.log("obstacle x,y: ", obstacles[i].localToGlobal(0,0).x, obstacles[i].localToGlobal(0,0).y, obstacles[i].height);
          return true;
        }





    // if ( this.player.player.x >= this.obstacle.obstacles.x + this.obstacle.obstacles.children[0].width -110||
    //      this.player.player.x + this.player.player.width <= this.obstacle.obstacles.x -110 ||
    //      this.player.player.y >= this.obstacle.obstacles.y + this.obstacle.obstacles.children[0].height -18 ||
    //      this.player.player.y + this.player.player.height <= this.obstacle.obstacles.y -20) {
    //     return false;
    //   }
    //     console.log("player x,y: ", this.player.player.x, this.player.player.y);
    //     console.log("obstacle x,y: ", this.obstacle.obstacles.x, this.obstacle.obstacles.y);
    //     return true;
      }
    }
}

// let obstacles = stage.getChildbyName("obstacles").children;
// for (let i = 0; i<obstacles.length; i++)
