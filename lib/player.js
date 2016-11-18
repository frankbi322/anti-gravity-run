export default class Player {
  constructor(stage){
    this.stage = stage;
  }

  startPosition(){
    this.player = new createjs.Shape();
    this.player.graphics.beginFill("green").drawRect(100,20,30,30);
    this.player.x = 100;
    this.player.y = 20;
    this.player.width = 30;
    this.player.height = 30;
    this.stage.addChild(this.player);
  }

  move(gravity){
    this.player.y=this.player.y + 10 * gravity;
  }

  leaveBounds(){
    if (this.player.y+10 < 0 || this.player.y+45>600) {
      return true;
    } else {
      return false;
    }
  }
}
