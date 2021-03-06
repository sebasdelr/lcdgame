var img = new Image();
img.src = "bitmap.png";
var canvas = document.getElementById("myCanvas");
var x = canvas.width/2;
var y = canvas.height-30;
var ctx = canvas.getContext("2d");
var spriteHeight = 94;
var spriteWidth = 94;
var startNodeX = canvas.width - spriteWidth;
var startShotX = 0;
var startShotY = 0;
var counter = 0;
var playerY = spriteHeight * 4;
var playerX = 0;
var downPressed = false;
var upPressed = false;
var shotPressed = false;
var downDelay = 0;
var upDelay = 0;
var triggerPulled = false;
var shotDelay = 0;
var startY = 0;
var shotColor = "green";
var squareState = "true";
var score = 0;
var ammoCount = 9;
var ammoSize = 10;
var ammo = [];
var enemySpeed = 100;
var speedLevel = 0;

var startGame = false;

var justDelay = 0;
var life = 3;

var enemyNumber = 8;

var enemies = [];
var playerHit = false;
var stateCounter = 0;


var view = {
    
    displayDigit: function(location, num){
        var cell0 = document.getElementById("d" + location);
        cell0.setAttribute("class", "n" + num);

    },
    displayLessLife: function(location){
        var cell0 = document.getElementById("l" + location);
        cell0.setAttribute("class", "");
    },
    displayGameOver: function(string){
        var cell0 = document.getElementById("gameOver");
        cell0.setAttribute("class", string);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function drawLine(number){
    return spriteHeight * number; 

}

function resetEnemies(){
    for(var c=0; c<enemyNumber; c++) {
        // bricks[c] = [];
        // for(var r=0; r<brickRowCount; r++) {
        enemies[c] = { x: canvas.width - spriteWidth, y: 0, squareState: 0, hitState: 0, counter: 0, enemySpeed: 0, enemyImage: new Image(), enemyImageName: ""};
        // }
    }

}

function enemyGoAhead(){
    var startInterval = 100;
    var startIndex = 0;
    justDelay++;

    if(justDelay == (startInterval - speedLevel)){
        startIndex = getRandomInt(enemyNumber); 
        console.log(startIndex);
        enemies[startIndex].squareState = 1;
        justDelay = 0;
    }


}



function drawEnemies() {

    for(var c=0; c<enemyNumber; c++){
        
        if(enemies[c].squareState == 1){
            //hitstate is only for that frame where explosion sprite is displayed, after which enemies state is changed to 0
            if(enemies[c].hitState == 1){
                enemies[c].counter++;
                ctx.beginPath();
                switch(c) {
                    case 0:
                        enemies[c].enemyImageName = "rockexplosion";
                        enemies[c].enemySpeed = 300;
                        break;
                    case 2:
                        enemies[c].enemyImageName = "alienexplosion";
                        enemies[c].enemySpeed = 100;
                        
                        break;
                    case 4:
                        enemies[c].enemyImageName = "alienexplosion";
                        enemies[c].enemySpeed = 50;                    
                        break;
                    case 6:
                        enemies[c].enemyImageName = "rockexplosion";
                        enemies[c].enemySpeed = 300;
                        break;
                    default:
                        enemies[c].enemyImageName = "enemy1explosion";
                        enemies[c].enemySpeed = 100;
                        
                      // code block
                }
                
                enemies[c].enemyImage.src = enemies[c].enemyImageName + ".png";
    
                ctx.drawImage(enemies[c].enemyImage, enemies[c].x, drawLine(c), spriteWidth, spriteHeight);
                //ctx.rect(startNodeX, drawLine(4), spriteWidth, spriteHeight);
                ctx.fillStyle = "red";
                ctx.fill();
                ctx.closePath();
    
                if(enemies[c].counter == enemies[c].enemySpeed){
                    

                        enemies[c].x = canvas.width - spriteWidth;
                        enemies[c].squareState = 0;
                        enemies[c].hitState = 0;


    
                        enemies[c].counter = 0;
    
                }
            }
            else{
                enemies[c].counter++;
                ctx.beginPath();
                switch(c) {
                    case 0:
                        enemies[c].enemyImageName = "rock";
                        enemies[c].enemySpeed = 300;
                        break;
                    case 2:
                        enemies[c].enemyImageName = "alien";
                        enemies[c].enemySpeed = 100;
                        
                        break;
                    case 4:
                        enemies[c].enemyImageName = "alien";
                        enemies[c].enemySpeed = 50;                    
                        break;
                    case 6:
                        enemies[c].enemyImageName = "rock";
                        enemies[c].enemySpeed = 300;
                        break;
                    default:
                        enemies[c].enemyImageName = "enemy1";
                        enemies[c].enemySpeed = 100;
                        
                    // code block
                }
                
                enemies[c].enemyImage.src = enemies[c].enemyImageName + ".png";

                ctx.drawImage(enemies[c].enemyImage, enemies[c].x, drawLine(c), spriteWidth, spriteHeight);
                //ctx.rect(startNodeX, drawLine(4), spriteWidth, spriteHeight);
                ctx.fillStyle = "red";
                ctx.fill();
                ctx.closePath();

                if(enemies[c].counter == (enemies[c].enemySpeed -speedLevel)){
                    
                    if(enemies[c].x < spriteWidth){
                        enemies[c].x = canvas.width - spriteWidth;

                    }
                    else{
                        enemies[c].x = enemies[c].x - spriteWidth;

                    }

                    enemies[c].counter = 0;

                }

            }
            
        }
        
    }
    
}



function resetAmmo(){
    console.log("start");
    for(var c=0; c<=ammoSize; c++) {
        ammo[c] = { x: 0, y: 0, shotDelay: 0, status: 0, image: new Image(), imageName: "" };
    }
    //console.log(ammo);

}

function drawBullet(){

    //var img = new Image();
    //img.src = "shot.png";
    
    for(var c=0; c<ammoSize; c++) {

        switch(ammo[c].y){
            case drawLine(0):
                ammo[c].image.src = "rockshot.png";
                break;
            case drawLine(2):
                ammo[c].image.src = "rockshot.png";
                break;
            case drawLine(4):
                ammo[c].image.src = "rockshot.png";
                console.log("alien");
                break;
            case drawLine(6):
                ammo[c].image.src = "rockshot.png";
                break;
            default:
                ammo[c].image.src = "rockshot.png";

        }

        
        
        //status will change until collission or reach end or reset
        if(ammo[c].status==1){

            ctx.beginPath();
            ctx.drawImage(ammo[c].image, ammo[c].x, ammo[c].y);
            //ctx.rect(ammo[c].x, ammo[c].y, spriteWidth, spriteHeight);

            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();

            ammo[c].shotDelay++;
            if(ammo[c].shotDelay == 50){
                
                if(ammo[c].x > canvas.width - spriteWidth ){
                    ammo[c].x = spriteWidth;
                    //triggerPulled = false;
                    ammo[c].status = 0;
                    // if(ammoCount == -1){
                    //     ammoCount = 2;
                    // }
                    // console.log(ammoCount);

                }
                else{
                    ammo[c].x = ammo[c].x + spriteWidth;

                }
                ammo[c].shotDelay = 0;
                
            }

        }

    }

}

function drawPlayer() {

    var img = new Image();

    if(!playerHit){
        img.src = "ship.png";
    }
    else{
        img.src = "shipandexplosion.png";
    }

    stateCounter++;
    if(stateCounter == 50){
        playerHit = false;
        stateCounter = 0;
    }
    

    ctx.beginPath();

    ctx.drawImage(img, playerX,playerY, spriteWidth, spriteHeight);
    //ctx.rect(playerX, playerY, spriteWidth, spriteHeight);
    ctx.fillStyle = "";
    ctx.fill();
    ctx.closePath();
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0,0);
    view.displayGameOver("gameOver");

    if(startGame){
        view.displayGameOver("");
        
        enemyGoAhead();
        
        drawPlayer();
        drawBullet();
        collissionDetection();
        drawLife();
        drawEnemies();

        if(downPressed) {
            
            downPressed = false;
            playerY += spriteHeight;
            
            if (playerY + spriteHeight > canvas.height){
                playerY = canvas.height - spriteHeight;
            }
        }
        else if(upPressed) {
            
            upPressed = false;        
            playerY -= spriteHeight;

            
            if (playerY < 0){
                playerY = 0;
            }
        }

        else if(shotPressed){


            ammo[ammoCount].status = 1;
            ammo[ammoCount].y = playerY;
            ammo[ammoCount].x = spriteWidth;
            ammoCount--;

            if(ammoCount == 0){
                ammoCount = 9;
            }
            
            shotPressed = false;
            console.log(ammoCount);

        }

    }
    
   
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "A" || e.keyCode == 65) {

        shotPressed = true;
        triggerPulled = true;

    }
    else if(e.key == "Enter" || e.keyCode == 13) {

        startGame = true;



    }
}


function keyUpHandler(e) {
    if(e.key == "Down" || e.key == "ArrowDown") {
        downPressed = false;
    }
    else if(e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key == "A" || e.keyCode == 65) {
        shotPressed = false;
    }
    // else if(e.key == "Enter" || e.keyCode == 13) {

    //     startGame = false;



    // }
}
//need different nodes for shots and enemies
function collissionDetection(){
    //for loop to check enemy vs all shots

    for(var i = 0; i < enemyNumber; i++){

        //player collission
        if(enemies[i].x < playerX + spriteWidth && enemies[i].x + spriteWidth > playerX && playerY < drawLine(i) + spriteHeight && playerY + spriteHeight > drawLine(i)){
            playerHit = true;
            enemies[i].squareState = 0;
            enemies[i].x = canvas.width - spriteWidth;
            stateCounter = 0;

            life--;
            if(life == 0){
                //view.displayGameOver("gameOver");
                //alert("GAME OVER!");
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
                startGame = false;
            }
            //enemies[i].squareState = 1;
        }

        //enemy collission
    
        for(var r=0; r<ammoSize; r++) {
            var b = ammo[r];
            if(b.status == 1) {
                if(b.x < enemies[i].x + spriteWidth && b.x + spriteWidth > enemies[i].x && b.y < drawLine(i) + spriteHeight && b.y + spriteHeight > drawLine(i)){

                    b.status = 0;
                    //score++;
    
                    console.log("Collission");
                    //shotColor = "yellow";
                    enemies[i].hitState = 1;
                    score = score + 10;
                    scoreTranslator(score);
                    b.x = "x";
                    //enemies[i].squareState = 1;

                    if((score % 100) == 0){
                        speedLevel = speedLevel + 5;
                    }
    
    
                }
                
    
            }
                
        }

    }

}
function drawLife(){

    if(life < 3){
        view.displayLessLife(life);
    }
}

function scoreTranslator(num){
        
    numArray = [];
    x = num;

    
    while(x >= 0){
        if(x >= 100000){
            //gameover
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
            startGame = false;
        }
        else if(x >= 10000){
            //numArray.push(x / 10000);
            digit = Math.trunc(x / 10000);
            view.displayDigit("0", digit.toString());
            x = x % 10000;
            if(x == 0){
                view.displayDigit("1", "0");
                view.displayDigit("2", "0");
                view.displayDigit("3", "0");
            }

        }
        else if(x >= 1000){
            //numArray.push(x / 1000);
            digit = Math.trunc(x / 1000);
            view.displayDigit("1", digit.toString());
            x = x % 1000;
            if(x == 0){
                view.displayDigit("2", "0");
                view.displayDigit("3", "0");
            }

        }
        else if(x >= 100){
            //numArray.push(x / 100);
            digit = Math.trunc(x / 100);
            view.displayDigit("2", digit.toString());
            x = x % 100;
            if(x == 0){
                view.displayDigit("3", "0");
            }

        }
        else if(x >= 10){
            //numArray.push(x / 10);
            digit = Math.trunc(x / 10);
            view.displayDigit("3", digit.toString());
            x = x % 10;

        }
        else{
            digit = x;
            view.displayDigit("4", digit.toString());
            x = -1;       
        }


    }
    

}


function init(){
      
    var interval = setInterval(draw, 10);
    console.log("start");

    resetEnemies();
    resetAmmo();
}

window.onload = init;



