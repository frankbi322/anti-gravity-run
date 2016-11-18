/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _game = __webpack_require__(1);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementById("canvas");
	  var stage = new createjs.Stage(canvas);
	
	  //
	  // let newGame = document.getElementById("newGame");
	  // newGame.addEventListener("click",new Game(canvas, stage));
	
	  new _game2.default(canvas, stage);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // import Start from './start';
	
	
	var _pause = __webpack_require__(2);
	
	var _pause2 = _interopRequireDefault(_pause);
	
	var _obstacle = __webpack_require__(3);
	
	var _obstacle2 = _interopRequireDefault(_obstacle);
	
	var _player = __webpack_require__(4);
	
	var _player2 = _interopRequireDefault(_player);
	
	var _view = __webpack_require__(5);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _start = __webpack_require__(6);
	
	var _start2 = _interopRequireDefault(_start);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// import Background from './background';
	
	var Game = function () {
	  function Game(canvas, stage) {
	    var _this = this;
	
	    _classCallCheck(this, Game);
	
	    this.gravity = 1;
	    this.playing = false;
	    this.score = 0;
	    this.displayScore = new createjs.Text('Score:  ' + this.score, "30px Arial", "white");
	    this.displayScore.x = 625;
	    this.displayScore.y = 30;
	    stage.addChild(this.displayScore);
	    this.speed = 10;
	    window.stage = stage;
	    window.height = canvas.height;
	    window.width = canvas.width;
	    this.player = new _player2.default(stage);
	    this.obstacle = new _obstacle2.default(stage);
	    (0, _start2.default)(function () {
	      return _this.play();
	    }, stage);
	    // this.player.startPosition();
	    // this.obstacle.populateObstacles();
	
	
	    // createjs.Ticker.setFPS(30);
	    // createjs.Ticker.on("tick",()=>this.handleTick());
	    this.pause = this.pause.bind(this);
	    setInterval(this.updateScore.bind(this), 500);
	    setInterval(this.updateSpeed.bind(this), 5000);
	    document.addEventListener("keydown", this.keyDown.bind(this));
	    document.addEventListener("keyup", this.keyUp.bind(this));
	    (0, _pause2.default)(function () {
	      return _this.pause();
	    });
	    // Start(() => this.play(), stage);
	    this.isPlaying = true;
	  }
	
	  _createClass(Game, [{
	    key: 'handleTick',
	    value: function handleTick(e) {
	
	      if (this.playing == true) if (!createjs.Ticker.getPaused()) {
	        this.player.move(this.gravity);
	        this.obstacle.move(this.speed);
	        console.log(this.player.player.y);
	        if (this.player.leaveBounds()) {
	          this.gameOver();
	        }
	        if (this.collidesWith()) {
	          // debugger
	          this.gameOver();
	        }
	        stage.update();
	      }
	    }
	  }, {
	    key: 'restartGame',
	    value: function restartGame() {
	      window.location.reload();
	    }
	  }, {
	    key: 'updateScore',
	    value: function updateScore() {
	      if (this.playing) {
	        stage.removeChild(this.displayScore);
	        this.score += this.speed;
	        var nextScore = new createjs.Text('Score:  ' + this.score, "30px Arial", "white");
	        this.displayScore = nextScore;
	        nextScore.x = 625;
	        nextScore.y = 30;
	        stage.addChild(nextScore);
	        stage.update();
	      }
	    }
	  }, {
	    key: 'updateSpeed',
	    value: function updateSpeed() {
	      if (this.playing) {
	        this.speed += 2;
	      }
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      var _this2 = this;
	
	      stage.removeAllChildren();
	      (0, _pause2.default)(function () {
	        return _this2.pause();
	      });
	      this.player.startPosition();
	      this.obstacle.populateObstacles();
	      this.playing = true;
	      createjs.Ticker.setFPS(30);
	      createjs.Ticker.on("tick", function (e) {
	        return _this2.handleTick(e);
	      });
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      var paused = !createjs.Ticker.getPaused();
	      createjs.Ticker.setPaused(paused);
	      debugger;
	      if (this.playing === true) {
	        this.playing = false;
	      } else {
	        this.playing = true;
	      }
	    }
	  }, {
	    key: 'keyDown',
	    value: function keyDown(e) {
	      var keycode = e.which || window.event.keycode;
	      if (keycode == 32) {
	        e.preventDefault();
	        this.gravity = -this.gravity;
	        this.player.player.rotation += 180;
	        if (this.gravity === -1) {
	          this.player.player.y += 96;
	        } else if (this.gravity === 1) {
	          this.player.player.y -= 96;
	        }
	        this.player.player.scaleX = -this.player.player.scaleX;
	      }
	      // if (keycode == "A".charCodeAt(0)) {
	      //   e.preventDefault();
	      //   this.pause();
	      // }
	    }
	  }, {
	    key: 'keyUp',
	    value: function keyUp(e) {
	      var keycode = e.which || window.event.keycode;
	    }
	  }, {
	    key: 'gameOver',
	    value: function gameOver() {
	      this.playing = false;
	      var lose = new createjs.Text("Game Over!\n\n", "40px Arial", "white");
	      lose.text += 'You scored ' + this.score + ' points!\n\n';
	      lose.textAlign = "center";
	      lose.x = 400;
	      lose.y = 200;
	      stage.addChild(lose);
	      stage.update();
	      var replay = document.getElementById("replay");
	      replay.className = "replay";
	      replay.addEventListener("click", this.restartGame);
	    }
	  }, {
	    key: 'collidesWith',
	    value: function collidesWith() {
	      var xOffset = void 0;
	      // let collides = false;
	      var obstacles = this.obstacle.obstacles.children;
	      for (var i = 0; i < obstacles.length; i++) {
	        if (i == 0) {
	          xOffset = 480;
	        } else if (i == 1) {
	          xOffset = 780;
	        } else if (i == 2) {
	          xOffset = 1080;
	        }
	
	        if (this.player.player.localToGlobal(0, 0).x >= obstacles[i].localToGlobal(0, 0).x + obstacles[i].width + xOffset || this.player.player.localToGlobal(0, 0).x + this.player.player.image.width <= obstacles[i].localToGlobal(0, 0).x + xOffset || this.player.player.localToGlobal(0, 0).y >= obstacles[i].localToGlobal(0, 0).y * 2 + obstacles[i].height - 20 || this.player.player.localToGlobal(0, 0).y + this.player.player.image.height - 48 <= obstacles[i].localToGlobal(0, 0).y * 2) {} else {
	
	          return true;
	        }
	      }
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Pause = function Pause(pause) {
	
	  var addButton = function addButton() {
	    var background = new createjs.Shape();
	    background.name = "background";
	    background.graphics.beginFill("lightgray").drawRoundRect(0, 0, 90, 35, 10);
	
	    var label = new createjs.Text("pause", "bold 20px Arial", "#fff");
	    label.name = "label";
	    label.textAlign = "center";
	    label.textBaseline = "middle";
	    label.x = 90 / 2;
	    label.y = 30 / 2;
	
	    var button = new createjs.Container();
	    button.name = "button";
	    button.x = 10;
	    button.y = 10;
	    button.addChild(background, label);
	    button.on('click', function () {
	      return pause();
	    });
	
	    stage.addChild(button);
	  };
	
	  addButton();
	  stage.update();
	};
	
	exports.default = Pause;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Obstacle = function () {
	  function Obstacle(stage) {
	    _classCallCheck(this, Obstacle);
	
	    this.stage = stage;
	  }
	
	  _createClass(Obstacle, [{
	    key: "populateObstacles",
	    value: function populateObstacles() {
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
	  }, {
	    key: "reset",
	    value: function reset() {
	      this.stage.removeChild(this.obstacles);
	      this.populateObstacles();
	    }
	  }, {
	    key: "move",
	    value: function move(speed) {
	      this.obstacles.x = this.obstacles.x - speed;
	
	      var obstacles = this.obstacles.children;
	
	      if (this.obstacles.x + 2500 < 0) {
	        this.reset();
	      }
	    }
	  }, {
	    key: "createObstacle",
	    value: function createObstacle(x) {
	      var obstacle = new createjs.Shape();
	      obstacle.x = x;
	      obstacle.y = Math.ceil(Math.random() * 300);
	      obstacle.width = Math.ceil(Math.random() * 3) * 100;
	      obstacle.height = Math.ceil(Math.random() * 4) * 100;
	      obstacle.graphics.beginFill("gray").drawRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
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
	
	  }]);
	
	  return Obstacle;
	}();
	
	exports.default = Obstacle;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Player = function () {
	  function Player(stage) {
	    _classCallCheck(this, Player);
	
	    this.stage = stage;
	  }
	
	  _createClass(Player, [{
	    key: "startPosition",
	    value: function startPosition() {
	      var _this = this;
	
	      var img = new Image();
	      img.src = "assets/player.png";
	      img.onload = function (event) {
	        _this.player = new createjs.Bitmap('assets/player.png');
	        _this.player.x = 100;
	        _this.player.y = 100;
	        _this.player.name = "player";
	        _this.stage.addChild(_this.player);
	      };
	    }
	
	    // startPosition(){
	    //   this.player = new createjs.Shape();
	    //   this.player.graphics.beginFill("green").drawRect(100,20,30,30);
	    //   this.player.x = 100;
	    //   this.player.y = 20;
	    //   this.player.width = 30;
	    //   this.player.height = 30;
	    //   this.stage.addChild(this.player);
	    // }
	
	  }, {
	    key: "move",
	    value: function move(gravity) {
	      this.player.y = this.player.y + 10 * gravity;
	    }
	  }, {
	    key: "leaveBounds",
	    value: function leaveBounds() {
	      if (this.player.y + 10 < 0 || this.player.y + 45 > 600) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }]);
	
	  return Player;
	}();
	
	exports.default = Player;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var View = function View(stage) {
	  _classCallCheck(this, View);
	
	  this.stage = stage;
	};
	
	exports.default = View;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Start = function Start(play, stage) {
	  var image = new Image();
	  image.src = "./assets/space.png";
	
	  image.onload = function () {
	    var bitmap = new createjs.Bitmap(image);
	    bitmap.x = 0;
	    bitmap.y = 0;
	    bitmap.name = "background";
	    stage.addChild(bitmap);
	    addButton();
	    stage.update();
	  };
	
	  var addButton = function addButton() {
	    var welcomeText = new createjs.Text("Get Ready!\n\n", "bold 36px Arial", "#fff");
	    welcomeText.text += "Use the Spacebar to flip gravity\n\n";
	    welcomeText.text += "Dodge the incoming obstacles!";
	    welcomeText.textAlign = "center";
	    welcomeText.x = 400;
	    welcomeText.y = 150;
	
	    var background = new createjs.Shape();
	    background.name = "background";
	    background.graphics.beginFill("lightgray").drawRoundRect(0, 0, 150, 60, 10);
	
	    var label = new createjs.Text("start", "50px Arial");
	    label.name = "label";
	    label.textAlign = "center";
	    label.textBaseline = "middle";
	    label.x = 150 / 2;
	    label.y = 60 / 2;
	
	    var button = new createjs.Container();
	    button.name = "button";
	    button.x = 325;
	    button.y = 400;
	
	    button.addChild(background, label);
	    button.on("click", function () {
	      return play();
	    });
	
	    stage.addChild(button, welcomeText);
	  };
	};
	
	exports.default = Start;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map