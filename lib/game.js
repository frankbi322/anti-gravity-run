import Start from './start';
import Pause from './pause';
import Obstacle from './obstacle';
import Player from './player';
import View from './view';
// import Snow from './snow';

export default class Game {
  constructor(canvas, stage) {
    this.gravity = 1;
    this.play=true;
    window.stage = stage;
    window.height = canvas.height;
    window.width = canvas.width;
    this.player = new Player(stage);
    this.player.startPosition();
    this.obstacle = new Obstacle(stage);
    this.obstacle.populateObstacles();
    createjs.Ticker.setFPS(30);
    createjs.Ticker.on("tick",()=>this.handleTick());
    document.addEventListener("keydown",this.keyDown.bind(this));
    document.addEventListener("keyup",this.keyUp.bind(this));

    Start(() => this.play(), stage);
    this.isPlaying = true;
  }

  handleTick(e) {
    if (this.play==true)
    if (!createjs.Ticker.getPaused()) {
      this.player.move(this.gravity);
      this.obstacle.move();
      // debugger
      if (this.player.leaveBounds()) {
        // debugger;
        this.gameOver();
      }
      if (this.collidesWith()){
        // debugger
        this.gameOver();
      }
      stage.update();
    }
  }

  play() {
    stage.removeAllChildren();
    Pause(() => this.pause());
    this.player.startPosition();
    this.obstacle.populateObstacles();
    createjs.Ticker.setFPS(60);
    createjs.Ticker.on("tick", e => this.handleTick(e));
  }

  pause() {
    let paused = !createjs.Ticker.getPaused();
    createjs.Ticker.setPaused(paused);
  }

  keyDown(e){
    let keycode = e.which || window.event.keycode;

    if (keycode == 32) {
      e.preventDefault();
      this.gravity = -this.gravity;

    }

  }

  keyUp(e){
    let keycode = e.which || window.event.keycode;

  }

  gameOver(){
    this.play=false;
    stage.update();
  }

  collidesWith(){
    // let obstacles = stage.getChildByName("obstacles").children;
    //   // debugger;
    // for (let i = 0; i<obstacles.length; i++) {
    if ( this.player.player.x >= this.obstacle.obstacles.x + this.obstacle.obstacles.children[0].width -110||
         this.player.player.x + this.player.player.width <= this.obstacle.obstacles.x -110 ||
         this.player.player.y >= this.obstacle.obstacles.y + this.obstacle.obstacles.children[0].height -18 ||
         this.player.player.y + this.player.player.height <= this.obstacle.obstacles.y -20) {
        return false;
      }
        console.log("player x,y: ", this.player.player.x, this.player.player.y);
        console.log("obstacle x,y: ", this.obstacle.obstacles.x, this.obstacle.obstacles.y);
        return true;
      // }
    }
}

// let obstacles = stage.getChildbyName("obstacles").children;
// for (let i = 0; i<obstacles.length; i++)
