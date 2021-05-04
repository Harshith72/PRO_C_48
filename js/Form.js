class Form {
  constructor() {
      this.heading = createElement("h1");
      this.greeting = createElement("h2");
      this.box = createInput("Name");
      this.button = createButton("play");
      this.instructions = createElement("h2");
      this.directions1 = createElement("h2");
      this.directions2 = createElement("h2");
      this.penalty = createElement("h2");
      this.refresh = createElement("h2");
     
  }

  hide() {
      this.heading.hide();
      this.greeting.hide();
      this.box.hide();
      this.button.hide();
      this.directions1.hide();
      this.directions2.hide();
      this.penalty.hide();
      this.refresh.hide();
      this.instructions.hide();
  }


  display() {
     // background(img);

      this.heading.html("Road Rush");
      this.heading.position(displayWidth / 2, 0);
      this.instructions.html("instructions");
      this.directions1.html("press 'UP' and 'DOWN' arrow keys to move forward and backward");
      this.directions2.html("press 'LEFT' and 'RIGHT' arrow keys to move sideways");
      this.penalty.html("when u hit a car car on the road u are given a penalty to move back some distance or to slow down your vehicle");
      this.refresh.html("refresh the page after the end of the game");

      this.box.position(displayWidth / 2 - 40, displayHeight / 2 - 200);
      this.button.position(displayWidth / 2 + 30, displayHeight / 2 - 100);

      this.button.mousePressed(() => {
          this.box.hide();
          this.button.hide();

          player.name = this.box.value();
          playerCount += 1;

          player.index = playerCount;

          player.updatePlayerRecord();

          player.updateCount(playerCount);

          this.greeting.html("Greetings, " + player.name);
          this.greeting.position(displayWidth / 2 - 70, displayHeight / 4)

      })

  }
}