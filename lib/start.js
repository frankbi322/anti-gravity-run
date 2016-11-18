const Start = (play, stage) => {
  const image = new Image();
  image.src = "./assets/background.jpg";

  image.onload = function() {
    const bitmap = new createjs.Bitmap(image);
    bitmap.x = 0;
    bitmap.y = 0;
    bitmap.name = "background";
    stage.addChild(bitmap);
    addButton();
    stage.update();
  };

  const addButton = () => {
    const welcomeText = new createjs.Text("Get Ready!", "bold 36px Arial", "#fff");
    welcomeText.textAlign = "center";
    welcomeText.x = width / 2;
    welcomeText.y = 150;

    const background = new createjs.Shape();
    background.name = "background";
    background.graphics.beginFill("lightgray").drawRoundRect(0, 0, 150, 60, 10);

    const label = new createjs.Text("start", "50px Arial");
    label.name = "label";
    label.textAlign = "center";
    label.textBaseline = "middle";
    label.x = 150/2;
    label.y = 60/2;

    const button = new createjs.Container();
    button.name = "button";
    button.x = width/3;
    button.y = height/2;

    button.addChild(background, label);
    button.on("click", () => play());

    stage.addChild(button, welcomeText);
  };
};

export default Start;
