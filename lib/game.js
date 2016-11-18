// import Start from './start';
import Pause from './pause';
import Obstacle from './obstacle';
import Player from './player';
import View from './view';
import Start from './start';
// import Background from './background';

export default class Game {
  constructor(canvas, stage) {
    this.gravity = 1;
    this.playing=false;
    this.score=0;
    this.displayScore=new createjs.Text(`Score:  ${this.score}`,"30px Arial","white");
    this.displayScore.x = 625;
    this.displayScore.y = 30;
    stage.addChild(this.displayScore);
    this.speed=10;
    window.stage = stage;
    window.height = canvas.height;
    window.width = canvas.width;
    this.player = new Player(stage);
    this.obstacle = new Obstacle(stage);
    Start(() => this.play(), stage);
    // this.player.startPosition();
    // this.obstacle.populateObstacles();


    // createjs.Ticker.setFPS(30);
    // createjs.Ticker.on("tick",()=>this.handleTick());
    this.pause = this.pause.bind(this);
    setInterval(this.updateScore.bind(this),500);
    setInterval(this.updateSpeed.bind(this),5000);
    document.addEventListener("keydown",this.keyDown.bind(this));
    document.addEventListener("keyup",this.keyUp.bind(this));
    Pause(() => this.pause());
    // Start(() => this.play(), stage);
    this.isPlaying = true;
  }

  handleTick(e) {

    if (this.playing==true)
    if (!createjs.Ticker.getPaused()) {
      this.player.move(this.gravity);
      this.obstacle.move(this.speed);
      // console.log(this.player.player.y);
      if (this.player.leaveBounds()) {
        this.gameOver();
      }
      if (this.collidesWith()){
        // debugger
        this.gameOver();
      }
      stage.update();
    }
  }

  restartGame(){
    window.location.reload();
  }

  updateScore(){
    if (this.playing){
    stage.removeChild(this.displayScore);
    this.score+=this.speed;
    let nextScore = new createjs.Text(`Score:  ${this.score}`,"30px Arial","white");
    this.displayScore=nextScore;
    nextScore.x = 625;
    nextScore.y = 30;
    stage.addChild(nextScore);
    stage.update();
    }
  }

  updateSpeed(){
    if (this.playing){
    this.speed+=2;
    }
  }

  play() {
    stage.removeAllChildren();
    Pause(() => this.pause());
    this.player.startPosition();
    this.obstacle.populateObstacles();
    this.playing=true;
    createjs.Ticker.setFPS(30);
    createjs.Ticker.on("tick", e => this.handleTick(e));
  }

  pause() {
    let paused = !createjs.Ticker.getPaused();
    createjs.Ticker.setPaused(paused);
    debugger;
    if (this.playing===true) {
      this.playing=false;
    } else {
      this.playing=true;
    }
  }

  keyDown(e){
    let keycode = e.which || window.event.keycode;
    if (keycode == 32) {
      e.preventDefault();
      this.gravity = -this.gravity;
      this.player.player.rotation += 180;
      if (this.gravity === -1) {
        this.player.player.y += 96;
      } else if (this.gravity === 1) {
        this.player.player.y -= 96;
      }
      this.player.player.scaleX=-this.player.player.scaleX;
    }
    // if (keycode == "A".charCodeAt(0)) {
    //   e.preventDefault();
    //   this.pause();
    // }

  }

  keyUp(e){
    let keycode = e.which || window.event.keycode;

  }

  gameOver(){
    this.playing=false;
    const lose = new createjs.Text("Game Over!\n\n","40px Arial","white");
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
        xOffset = 480;
      } else if (i == 1) {
        xOffset = 780;
      } else if (i == 2) {
        xOffset = 1080;
      }

      if ( this.player.player.localToGlobal(0,0).x >= obstacles[i].localToGlobal(0,0).x + obstacles[i].width +xOffset||
           this.player.player.localToGlobal(0,0).x + this.player.player.image.width <= obstacles[i].localToGlobal(0,0).x +xOffset ||
           this.player.player.localToGlobal(0,0).y >= (obstacles[i].localToGlobal(0,0).y*2 + obstacles[i].height-20) ||
           this.player.player.localToGlobal(0,0).y + this.player.player.image.height -48 <= (obstacles[i].localToGlobal(0,0).y*2)) {

        } else {

          return true;
        }
      }
    }
}
