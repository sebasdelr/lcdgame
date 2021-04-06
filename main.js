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
var ammoCount = 2;
var ammoSize = 3;
var ammo = [];
var enemySpeed = 100;

var startGame = false;

var justDelay = 0;
var life = 3;

var enemyNumber = 8;

var enemies = [];

var view = {
    
    displayDigit: function(location, num){
        var cell0 = document.getElementById("d" + location);
        cell0.setAttribute("class", "n" + num);

    },
    displayLessLife: function(location){
        var cell0 = document.getElementById("l" + location);
        cell0.setAttribute("class", "");
    },
    displayGameOver: function(){
        var cell0 = document.getElementById("gameOver");
        cell0.setAttribute("class", "gameOver");
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
        enemies[c] = { x: canvas.width - spriteWidth, y: 0, squareState: 0, counter: 0, enemySpeed: 0};
        // }
    }

}

function enemyGoAhead(){
    var startInterval = 100;
    var startIndex = 0;
    justDelay++;

    if(justDelay == startInterval){
        startIndex = getRandomInt(enemyNumber); 
        console.log(startIndex);
        enemies[startIndex].squareState = 1;
        justDelay = 0;
    }


}



function drawEnemies() {

    for(var c=0; c<enemyNumber; c++){
        
        if(enemies[c].squareState == 1){
            enemies[c].counter++;
            ctx.beginPath();
            switch(c) {
                case 0:
                    var img1 = new Image();
                    img1.src = "rock.png";
                    ctx.drawImage(img1, enemies[c].x, drawLine(c), spriteWidth, spriteHeight);
                    enemies[c].enemySpeed = 300;
                  // code block
                    break;
                case 1:
                    var img2 = new Image();
                    img2.src = "ship2.png";
                    ctx.drawImage(img2, enemies[c].x, drawLine(c), spriteWidth, spriteHeight);
                    enemies[c].enemySpeed = 100;
                  // code block
                    break;
                case 4:
                    var img3 = new Image();
                    img3.src = "ship3.png";
                    ctx.drawImage(img3, enemies[c].x, drawLine(c), spriteWidth, spriteHeight);
                    enemies[c].enemySpeed = 100;
                    
                    break;
                case 5:
                    var img4 = new Image();
                    img4.src = "ship4.png";
                    ctx.drawImage(img4, enemies[c].x, drawLine(c), spriteWidth, spriteHeight);
                    enemies[c].enemySpeed = 20;                    
                    break;
                case 6:
                    var img5 = new Image();
                    img5.src = "rock.png";
                    ctx.drawImage(img5, enemies[c].x, drawLine(c), spriteWidth, spriteHeight);
                    enemies[c].enemySpeed = 300;
                    break;
                default:
                    var img = new Image();
                    img.src = "enemyship.png";
                    ctx.drawImage(img, enemies[c].x, drawLine(c), spriteWidth, spriteHeight);
                    enemies[c].enemySpeed = 100;
                    
                  // code block
            }
            

            
            //ctx.rect(startNodeX, drawLine(4), spriteWidth, spriteHeight);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();

            if(enemies[c].counter == enemies[c].enemySpeed){
                
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



function resetAmmo(){
    console.log("start");
    for(var c=0; c<=ammoSize; c++) {
        ammo[c] = { x: 0, y: 0, shotDelay: 0, status: 0 };
    }
    //console.log(ammo);

}

function drawBullet(){

    var img = new Image();
    img.src = "shot.png";
    
    for(var c=0; c<ammoSize; c++) {
        
        //status will change until collission or reach end or reset
        if(ammo[c].status==1){

            ctx.beginPath();
            ctx.drawImage(img, ammo[c].x, ammo[c].y);
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
                    if(ammoCount == -1){
                        ammoCount = 2;
                    }
                    console.log(ammoCount);

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
    img.src = "playership.png";

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

    if(startGame){
        
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

            if(ammoCount >= 0){
                ammo[ammoCount].status = 1;
                ammo[ammoCount].y = playerY;
                ammo[ammoCount].x = spriteWidth;
                ammoCount--;


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

    //startNodeX < spriteWidth
    for(var i = 0; i < enemyNumber; i++){
        if(enemies[i].x < playerX + spriteWidth && enemies[i].x + spriteWidth > playerX && playerY < drawLine(i) + spriteHeight && playerY + spriteHeight > drawLine(i)){
            console.log("collided");
            enemies[i].squareState = 0;
            enemies[i].x = canvas.width - spriteWidth;
            life--;
            if(life == 0){
                view.displayGameOver();
                //alert("GAME OVER!");
                document.location.reload();
                clearInterval(interval); // Needed for Chrome to end game
                startGame = false;
            }
            //enemies[i].squareState = 1;
        }
    
        for(var r=0; r<ammoSize; r++) {
            var b = ammo[r];
            if(b.status == 1) {
                //if(b > b.x && x < b.x+spriteWidth && startNodeY > b.y && drawLine(4) < b.y+spriteHeight) {
                if(b.x < enemies[i].x + spriteWidth && b.x + spriteWidth > enemies[i].x && b.y < drawLine(i) + spriteHeight && b.y + spriteHeight > drawLine(i)){

                //if(b.x > enemies[i].x && b.x < enemies[i].x+spriteWidth && b.y > drawLine(i) && b.y < drawLine(i)+spriteHeight){
                //if(startShotX < startNodeX + spriteWidth && startShotX + spriteWidth > startNodeX && playerY < drawLine(4) + spriteHeight && playerY + spriteHeight > drawLine(4)){
                    //dy = -dy;
                    b.status = 0;
                    //score++;
    
                    console.log("Collission");
                    //shotColor = "yellow";
                    enemies[i].squareState = 0;
                    score = score + 10;
                    scoreTranslator(score);
                    b.x = "x";
                    enemies[i].x = canvas.width - spriteWidth;
                    //enemies[i].squareState = 1;
    
                    if(ammoCount == -1){
                        ammoCount = 2;
                    }
    
                }
                
    
            }
                
        }

    }
    
    // if(startShotX < startNodeX + spriteWidth && startShotX + spriteWidth > startNodeX && playerY < drawLine(4) + spriteHeight && playerY + spriteHeight > drawLine(4)){

}
function drawLife(){
    // ctx.fonz = "12px Arial";
    // ctx.fillStyle = "black";
    // ctx.fillText("Life: " + life, 8, 20);
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
        }
        else if(x >= 10000){
            //numArray.push(x / 10000);
            digit = Math.trunc(x / 10000);
            view.displayDigit("0", digit.toString());
            x = x % 10000;

        }
        else if(x >= 1000){
            //numArray.push(x / 1000);
            digit = Math.trunc(x / 1000);
            view.displayDigit("1", digit.toString());
            x = x % 1000;

        }
        else if(x >= 100){
            //numArray.push(x / 100);
            digit = Math.trunc(x / 100);
            view.displayDigit("2", digit.toString());
            x = x % 100;

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



