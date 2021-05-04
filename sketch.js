/*
Pro-C-43: self Design Game Stage-1
planing the game
figuring out the game and its design
sketiching out the characters
naming all the characters 

pro-C-44: self Desing Game Stage-2
deciding on images of the game
adding them to our folder
making the required folders for the game
create the basic game structure
create basic structure of characters
function setup 

pro-C-45: self Design Game Stage-3
adding all the images to the sprites creatred 
making a form before the game starts so to store the players name
adding distance when up_Arrow is pressed 
making gamestates for starting and ending of the game 

*/

//variable declaration
var canvas;
var car1, car2, cars;
var road;
var roadImg, car1Img, car2Img, img;
var form;
var game, gameState;
var carsAtFinishLine;
var database;
var player, playerCount, allPlayers;
var distracter3Img, distracter1Img, distracter2Img,distracter4Img;
var distracter1, distracter2, distracter3, distracter4;
var leaderboardImg;


function preload() {
  car1Img = loadImage("images/car3.jfif");
  car2Img = loadImage("images/car4.jfif");
  roadImg = loadImage("images/track1.jpg");
  img = loadImage("images/image.jpg");
  distracter1Img = loadImage("images/distracter1.png");
  distracter2Img = loadImage("images/car1.png");
  distracter3Img = loadImage("images/car2.png");
  distracter4Img = loadImage("images/distracter2.jpg");
  leaderboardImg = loadImage("images/trophy.jpg");

}


function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight - 30);
  canvas.parent('game');

  database = firebase.database();
  carsAtFinishLine = 0;

  gameState = 0;
  game = new Game();
  game.getState();
  game.start();

}

function draw() {

  if (playerCount == 2 && gameState == 0) {
    game.updateState(1);
  }

  if (gameState == 1) {
    clear();
    game.play();
  }
  if (carsAtFinishLine == 2 && gameState == 1) {
    playerCount += 1;
    game.updateState(2);

  }
  if (gameState == 2) {
    clear();
    game.finish();
  }
}

function gotData(data) {

  //
  var scorelisting = selectAll('.scorelisting');

  //
  for (var i = 0; i < scorelisting.length; i++) {

    scorelisting[i].remove();
  }
  var names = data.val();
  var keys = Object.keys(names);
  for (var i = 0; i < keys.length; i++) {
    var ki = keys[i];
    var name = names[ki].name;
    var rank = names[ki].rank;
    var li = createElement("h1", name + ": " + rank);
    li.class('scorelisting')
    li.parent('scorelist');
  }
}

function errData(err) {
  console.log('Error!');
  console.log(err);

}

