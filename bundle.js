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
	  new _game2.default(canvas, stage);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _start = __webpack_require__(2);
	
	var _start2 = _interopRequireDefault(_start);
	
	var _pause = __webpack_require__(3);
	
	var _pause2 = _interopRequireDefault(_pause);
	
	var _obstacle = __webpack_require__(4);
	
	var _obstacle2 = _interopRequireDefault(_obstacle);
	
	var _player = __webpack_require__(5);
	
	var _player2 = _interopRequireDefault(_player);
	
	var _view = __webpack_require__(6);
	
	var _view2 = _interopRequireDefault(_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// import Snow from './snow';
	
	var Game = function () {
	  function Game(canvas, stage) {
	    var _this = this;
	
	    _classCallCheck(this, Game);
	
	    this.gravity = 1;
	    this.play = true;
	    window.stage = stage;
	    window.height = canvas.height;
	    window.width = canvas.width;
	    this.player = new _player2.default(stage);
	    this.player.startPosition();
	    this.obstacle = new _obstacle2.default(stage);
	    this.obstacle.populateObstacles();
	    createjs.Ticker.setFPS(30);
	    createjs.Ticker.on("tick", function () {
	      return _this.handleTick();
	    });
	    document.addEventListener("keydown", this.keyDown.bind(this));
	    document.addEventListener("keyup", this.keyUp.bind(this));
	
	    (0, _start2.default)(function () {
	      return _this.play();
	    }, stage);
	    this.isPlaying = true;
	  }
	
	  _createClass(Game, [{
	    key: 'handleTick',
	    value: function handleTick(e) {
	      if (this.play == true) if (!createjs.Ticker.getPaused()) {
	        this.player.move(this.gravity);
	        this.obstacle.move();
	        // debugger
	        if (this.player.leaveBounds()) {
	          // debugger;
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
	    key: 'play',
	    value: function play() {
	      var _this2 = this;
	
	      stage.removeAllChildren();
	      (0, _pause2.default)(function () {
	        return _this2.pause();
	      });
	      this.player.startPosition();
	      this.obstacle.populateObstacles();
	      createjs.Ticker.setFPS(60);
	      createjs.Ticker.on("tick", function (e) {
	        return _this2.handleTick(e);
	      });
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      var paused = !createjs.Ticker.getPaused();
	      createjs.Ticker.setPaused(paused);
	    }
	  }, {
	    key: 'keyDown',
	    value: function keyDown(e) {
	      var keycode = e.which || window.event.keycode;
	
	      if (keycode == 32) {
	        e.preventDefault();
	        this.gravity = -this.gravity;
	      }
	    }
	  }, {
	    key: 'keyUp',
	    value: function keyUp(e) {
	      var keycode = e.which || window.event.keycode;
	    }
	  }, {
	    key: 'gameOver',
	    value: function gameOver() {
	      this.play = false;
	      stage.update();
	    }
	  }, {
	    key: 'collidesWith',
	    value: function collidesWith() {
	      // let obstacles = stage.getChildByName("obstacles").children;
	      //   // debugger;
	      // for (let i = 0; i<obstacles.length; i++) {
	      if (this.player.player.x >= this.obstacle.obstacles.x + this.obstacle.obstacles.children[0].width - 110 || this.player.player.x + this.player.player.width <= this.obstacle.obstacles.x - 110 || this.player.player.y >= this.obstacle.obstacles.y + this.obstacle.obstacles.children[0].height - 18 || this.player.player.y + this.player.player.height <= this.obstacle.obstacles.y - 20) {
	        return false;
	      }
	      console.log("player x,y: ", this.player.player.x, this.player.player.y);
	      console.log("obstacle x,y: ", this.obstacle.obstacles.x, this.obstacle.obstacles.y);
	      return true;
	      // }
	    }
	  }]);
	
	  return Game;
	}();
	
	// let obstacles = stage.getChildbyName("obstacles").children;
	// for (let i = 0; i<obstacles.length; i++)
	
	
	exports.default = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Start = function Start(play, stage) {
	  // const image = new Image();
	  // image.src = "./assets/images/background.png";
	  //
	  // image.onload = function() {
	  //   const bitmap = new createjs.Bitmap(image);
	  //   bitmap.x = 0;
	  //   bitmap.y = 0;
	  //   bitmap.name = "background";
	  //   stage.addChild(bitmap);
	  //   addButton();
	  //   stage.update();
	  // };
	
	  var addButton = function addButton() {
	    var welcomeText = new createjs.Text("Get Ready!", "bold 36px Arial", "#fff");
	    welcomeText.textAlign = "center";
	    welcomeText.x = width / 2;
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
	    button.x = width / 3;
	    button.y = height / 2;
	
	    button.addChild(background, label);
	    button.on("click", function () {
	      return play();
	    });
	
	    stage.addChild(button, welcomeText);
	  };
	};
	
	exports.default = Start;

/***/ },
/* 3 */
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
/* 4 */
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
	      this.obstacles.x = 800;
	      this.obstacles.y = Math.random() * 4 * 100;
	      // this.createObstacle();
	      var obstacle = new createjs.Shape();
	      obstacle.x = 0;
	      obstacle.y = 0;
	      obstacle.width = 100;
	      obstacle.height = Math.random() * 4 * 100;
	      obstacle.graphics.beginFill("black").drawRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
	      // debugger
	      this.obstacles.addChild(obstacle);
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
	    value: function move() {
	      this.obstacles.x = this.obstacles.x - 10;
	
	      var obstacles = this.obstacles.children;
	
	      if (this.obstacles.x < 0) {
	        this.reset();
	      }
	    }
	  }, {
	    key: "createObstacle",
	    value: function createObstacle() {
	      var obstacle = new createjs.Shape();
	      obstacle.x = 0;
	      obstacle.y = Math.random() * 3 * 100;
	      obstacle.width = 50;
	      obstacle.height = Math.random() * 4 * 100;
	      obstacle.graphics.beginFill("black").drawRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
	      this.obstacles.addChild(obstacle);
	    }
	  }]);
	
	  return Obstacle;
	}();
	
	exports.default = Obstacle;

/***/ },
/* 5 */
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
	      this.player = new createjs.Shape();
	      this.player.graphics.beginFill("green").drawRect(100, 20, 30, 30);
	      this.player.x = 100;
	      this.player.y = 20;
	      this.player.width = 30;
	      this.player.height = 30;
	      this.stage.addChild(this.player);
	    }
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
/* 6 */
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

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map