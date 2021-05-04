class Game {
    constructor() {

    }

    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        });
    }

    updateState(state) {
        database.ref('/').update({
            gameState: state
        });
    }

    async start() {
        if (gameState == 0) {
            player = new Player();

            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();

            }

            background(img);
            form = new Form();
            form.display();
        }

        car1 = createSprite(100, 200);
        car1.addImage("car1Img", car1Img);
        
        car2 = createSprite(100, 400);
        car2.addImage("car2Img", car2Img);
        car2.scale = 0.8;

            distracter1 = createSprite(1000, -800);
            distracter1.scale = 0.5;
            //distracter1.lifetime = 100;
            distracter1.addImage("distracter1Img", distracter1Img);
            distracter2 = createSprite(500, 500);
            //distracter2.lifetime = 100;
            distracter2.addImage("distracter2Img", distracter2Img);
            distracter2.scale = 0.5;

            distracter3 = createSprite(900, -4000);
            distracter3.addImage("distracter3Img", distracter3Img);
            distracter3.scale = 0.5;

            distracter4 = createSprite(1300, -6000);
            distracter4.addImage("distracter4Img", distracter4Img);
            distracter4.scale = 0.25;
        cars = [car1, car2];
    }
    play() {
        form.hide();

        Player.getPlayerInfo();
        player.getCarsAtFinish();

        if (allPlayers !== undefined) {

            background("green");
            image(roadImg, 0, - displayHeight * 8.7, displayWidth, displayHeight * 10);

            var index = 0;
            var x = 100;
            var y;


            for (var plr in allPlayers) {

                index = index + 1;
                var a = x + player.side;
                x =  700 - allPlayers[plr].side ;

                y = displayHeight - allPlayers[plr].distance;


                cars[index - 1].x = x;
                cars[index - 1].y = y;
               
                if (index === player.index) {
                    stroke(10);
                    fill("yellow");
                    ellipse(x, y, 120, 190);
                    cars[index - 1].shapeColor = "red";
                    camera.position.x = displayWidth / 2;
                    camera.position.y = cars[index - 1].y;
                } else {
                    cars[index - 1].shapeColor = "black";
                }

            }
        }

        if (keyIsDown(UP_ARROW) && player.index !== null) {
            player.distance += 50;
            player.updatePlayerRecord();
        }

        if (keyIsDown(DOWN_ARROW) && player.index !== null) {
            player.distance -= 25;
            player.updatePlayerRecord();
        }

        if (keyIsDown(LEFT_ARROW) && player.index !== null) {
            player.side += 10;
            player.updatePlayerRecord();
        }

        if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
            player.side -= 10;
            player.updatePlayerRecord();
        }

        if (player.side <= -700) {
            player.side += 10;
            player.updatePlayerRecord();
        }
        if (player.side >= 210) {
            player.side -= 10;
            player.updatePlayerRecord();
        }


        if (player.distance >= 10200 && player.distance <= 10210) {
            player.rank += 1;
            Player.updateCarsAtFinish(player.rank);
            player.updatePlayerRecord();
        }
        if (player.side >= 100 && player.distance >= 350 && player.distance <= 700){
            player.distance -= 30;
            player.updatePlayerRecord();

        }

        if (player.side >= -410 && player.side <= -180 && player.distance >=1660 && player.distance <=2110 ){//&& player.distance >= 1660 && player.distance >= -180 && player.distance <= 2110 ){
            player.distance -= 500;
            player.updatePlayerRecord();

        }

        if (player.side >= -280 && player.side <= -120 && player.distance >=4900 && player.distance <=5275 ){//&& player.distance >= 1660 && player.distance >= -180 && player.distance <= 2110 ){
            player.distance -= 500;
            player.updatePlayerRecord();

        }

        if (player.side >= -690 && player.side <= -510 && player.distance >=6800 && player.distance <=7300 ){//&& player.distance >= 1660 && player.distance >= -180 && player.distance <= 2110 ){
            player.distance -= 500;
            player.updatePlayerRecord();

        }

        drawSprites();
    }

    finish() {

        form.hide();
        Player.getPlayerInfo();
        background("yellow");
        image(leaderboardImg,0,0,displayWidth ,displayHeight + 200 );
        textSize(50);
        fill("red");
        text('LEADERBOARD', 760, 120);
        fill("orange");
        text("GAME END",820,250)
        textSize(30);
        fill("green");
        text("name of the player:   ",50,1000);
        text("rank ",320,1000);


        var ref = database.ref('players');
        ref.on('value', gotData, errData);


    }
}