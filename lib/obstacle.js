export default class Obstacle {
  constructor(stage) {
    this.stage = stage;
  }

  populateObstacles() {
    this.obstacles = new createjs.Container();
    this.obstacles.name = "obstacles";
    this.obstacles.x = 0;
    this.obstacles.y = 0;
    this.createObstacle(500);
    this.createObstacle(800);
    this.createObstacle(1100);

    this.stage.addChild(this.obstacles);
  }

    move(speed){
      this.obstacles.x = this.obstacles.x-speed;

      let obstacles = this.obstacles.children;

      if (this.obstacles.x + 2500 < 0) {
        this.reset();
      }
    }

    reset(){
        this.stage.removeChild(this.obstacles);
        this.populateObstacles();
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

  // createObstacle(x){
  //
  //   const img = new Image();
  //   img.src = "assets/obstacle.jpg";
  //   img.onload = (event) => {
  //     let obstacle = new createjs.Shape(img);
  //     obstacle.x = x;
  //     obstacle.y = Math.ceil(Math.random() * 300);
  //     // obstacle.scaleX = (Math.ceil(Math.random() * 3) * 100)/img.width;
  //     // obstacle.scaleY = (Math.ceil(Math.random() * 4) * 100)/img.height;
  //     let m = new createjs.Matrix2D();
  //     m.translate(obstacle.x,obstacle.y);
  //     m.scale(obstacle.width,obstacle.height);
  //     obstacle.graphics.beginBitmapFill(img,"no-repeat",m).drawRect(obstacle.x,obstacle.y,obstacle.width,obstacle.height);
  //     this.obstacles.addChild(obstacle);
  //   };
  // }
}
