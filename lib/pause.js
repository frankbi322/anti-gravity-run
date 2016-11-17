const Pause = (pause) => {

  const addButton = () => {
    const background = new createjs.Shape();
    background.name = "background";
    background.graphics.beginFill("lightgray").drawRoundRect(0, 0, 90, 35, 10);

    const label = new createjs.Text("pause", "bold 20px Arial", "#fff");
    label.name = "label";
    label.textAlign = "center";
    label.textBaseline = "middle";
    label.x = 90/2;
    label.y = 30/2;

    const button = new createjs.Container();
    button.name = "button";
    button.x = 10;
    button.y = 10;
    button.addChild(background, label);
    button.on('click', () => pause());

    stage.addChild(button);
  };

  addButton();
  stage.update();
};

export default Pause;
