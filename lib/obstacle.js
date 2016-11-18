export default class Obstacle {
  constructor(stage) {
    this.stage = stage;
  }

  populateObstacles() {
    // let obstacle = new createjs.Shape();
    // let randomY = Math.random() * 4 * 100;
    // let randomHeight = Math.random() * 4 * 100;
    // obstacle.graphics.beginFill("black").drawRect(800,randomY,50,randomHeight);
    // obstacle.x = 800;
    // obstacle.y = randomY;
    // obstacle.width = 50;
    // obstacle.height = randomHeight;
    // // debugger
    // this.stage.addChild(obstacle);




    this.obstacles = new createjs.Container();
    this.obstacles.name = "obstacles";
    this.obstacles.x = 0;
    this.obstacles.y = 0;
    this.createObstacle(500);
    this.createObstacle(800);
    this.createObstacle(1100);
    // let obstacle = new createjs.Shape();
    // obstacle.x = 0;
    // obstacle.y = 0;
    // obstacle.width = 100;
    // obstacle.height = Math.random() * 4 * 100;
    // obstacle.graphics.beginFill("black").drawRect(obstacle.x,obstacle.y,obstacle.width,obstacle.height);
    // debugger
    // this.obstacles.addChild(obstacle);
    this.stage.addChild(this.obstacles);
  }


    reset(){
        this.stage.removeChild(this.obstacles);
        this.populateObstacles();
    }

    move(speed){
      this.obstacles.x = this.obstacles.x-speed;

      let obstacles = this.obstacles.children;

      if (this.obstacles.x + 2500 < 0) {
        this.reset();
      }
    }

    createObstacle(x){
      let obstacle = new createjs.Shape();
      obstacle.x = x;
      obstacle.y = Math.ceil(Math.random() * 300);
      obstacle.width = Math.ceil(Math.random() * 3) * 100;
      obstacle.height = Math.ceil(Math.random() * 4) * 100;
      obstacle.graphics.beginFill("gray").drawRect(obstacle.x,obstacle.y,obstacle.width,obstacle.height);
      this.obstacles.addChild(obstacle);
    }
}
