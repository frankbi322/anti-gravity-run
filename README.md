# JS Gravity

[Live]( https://frankbi322.github.io/anti-gravity-run/)

![gravity](https://raw.githubusercontent.com/frankbi322/anti-gravity-run/master/assets/screenshot.png)

##Background

Gravity is an infinite side scrolling game in which the player dodges obstacles by hitting the spacebar to change the direction of gravity, allowing him to fall downwards and upwards.

*The player loses when he either leaves the bounds of the screen or hits an obstacle.
*The game speeds up every 5 seconds.

##Technologies and Languages Used

*JavaScript(ES6)
*EaselJS
*CSS3

##Implementation Details

There were two primary challenges to building this project. The first was to dynamically generate new obstacles for the player to dodge.

To do this, I utilized EaselJS's container module to generate a container holding three randomly generated obstacles at a time. The container itself moves, and by extension all of its children, the individual obstacles, move as well. Once the last obstacle passes the left side of the screen, the game destroys the container and creates a new one, sending another three obstacles toward the player. This creates an experience where the user thinks obstacles are constantly being generated.

Code is below:

```javascript

    populateObstacles() {
    this.obstacles = new createjs.Container();
    this.obstacles.name = "obstacles";
    this.obstacles.x = 0;
    this.obstacles.y = 0;
    this.createObstacle(500);
    this.createObstacle(800);
    this.createObstacle(1100);
    this.stage.addChild(this.obstacles);}

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

```

The second challenge was to calculate collision detection; the game must detect whether the player hits an obstacle head-on or from the top or bottom.

To do this, I calculated a set of parameters in which the player will never be hitting an obstacle. For example, if the player's left edge is further than an obstacle's right edge, he will never be hitting it, and if the player's top edge is below the obstacle's bottom edge, he will also never be hitting it. Only in situations where all parameters are not true will the player be hitting the obstacle.

##Future Features

 - [  ] Sounds
 - [  ] PowerUps such as invincibility, extra score
 - [  ] Additional, more complex obstacles
