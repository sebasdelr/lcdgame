var img = new Image();
img.src = "bitmap.png";
var canvas = document.getElementById("myCanvas");
var x = canvas.width/2;
var y = canvas.height-30;
var ctx = canvas.getContext("2d");
var spriteHeight = 93;
var spriteWidth = 93;
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
var justDelay = 0;
var life = 3;

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
};


function drawLine(number){
    return spriteHeight * number; 

}

//enemy
function drawSquare() {
    var img = new Image();
    img.src = "enemyship.png";

    if(squareState){
        ctx.beginPath();

        ctx.drawImage(img, startNodeX, drawLine(4));
        //ctx.rect(startNodeX, drawLine(4), spriteWidth, spriteHeight);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();

        counter++;
        if(counter == 100){
            
            if(startNodeX < spriteWidth){
                startNodeX = canvas.width - spriteWidth;

            }
            else{
                startNodeX = startNodeX - spriteWidth;

            }
            counter = 0;
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

    ctx.drawImage(img, playerX,playerY);
    //ctx.rect(playerX, playerY, spriteWidth, spriteHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0,0);
    
    drawSquare();
    drawPlayer();
    drawBullet();
    collissionDetection();
    drawLife();

    if(downPressed) {
        downDelay++;
        upDelay = 0;
        if(downDelay == 10){
            playerY += spriteHeight;
            downDelay = 0;

        }
        
        if (playerY + spriteHeight > canvas.height - spriteHeight){
            playerY = canvas.height - (spriteHeight * 2);
        }
    }
    else if(upPressed) {
        downDelay = 0;
        upDelay++;
        if(upDelay == 10){
            upDelay = 0;
            playerY -= spriteHeight;
        }
        
        if (playerY < spriteHeight){
            playerY = spriteHeight;
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
}
//need different nodes for shots and enemies
function collissionDetection(){
    //for loop to check enemy vs all shots

    //startNodeX < spriteWidth
    if(startNodeX < playerX + spriteWidth && playerY < drawLine(4) + spriteHeight && playerY + spriteHeight > drawLine(4)){
        console.log("collided");
        squareState = false;
        startNodeX = canvas.width - spriteWidth;
        life--;
        if(life == 0){
            view.displayGameOver();
            //alert("GAME OVER!");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
        squareState = true;
    }

    for(var r=0; r<ammoSize; r++) {
        var b = ammo[r];
        if(b.status == 1) {
            //if(b > b.x && x < b.x+spriteWidth && startNodeY > b.y && drawLine(4) < b.y+spriteHeight) {
            if(b.x < startNodeX + spriteWidth && b.x + spriteWidth > startNodeX && b.y < drawLine(4) + spriteHeight && b.y + spriteHeight > drawLine(4)){
            //if(startShotX < startNodeX + spriteWidth && startShotX + spriteWidth > startNodeX && playerY < drawLine(4) + spriteHeight && playerY + spriteHeight > drawLine(4)){
                //dy = -dy;
                b.status = 0;
                //score++;

                console.log("Collission");
                //shotColor = "yellow";
                squareState = false;
                score = score + 10;
                scoreTranslator(score);
                b.x = "x";
                startNodeX = canvas.width - spriteWidth;
                squareState = true;

                if(ammoCount == -1){
                    ammoCount = 2;
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

    resetAmmo();
}

window.onload = init;



