import Game from './lib/game';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const stage = new createjs.Stage(canvas);

  //
  // let newGame = document.getElementById("newGame");
  // newGame.addEventListener("click",new Game(canvas, stage));

  new Game(canvas, stage);
});
