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
var ammoCount = 3;
var ammoSize = 3;
var ammo = [];
var justDelay = 0;




function drawLine(number){
    return spriteHeight * number; 

}

//enemy

function drawSquare() {

    if(squareState){
        ctx.beginPath();
        ctx.rect(startNodeX, drawLine(4), spriteWidth, spriteHeight);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();

        counter++;
        if(counter == 100){
            
            if(startNodeX < 0){
                startNodeX = canvas.width;

            }
            else{
                startNodeX = startNodeX - spriteWidth;

            }
            counter = 0;
        }

    }
    
    
}

function drawShot(){

    if(triggerPulled && squareState){
        ctx.beginPath();
        ctx.rect(startShotX, startShotY, spriteWidth, spriteHeight);
        ctx.fillStyle = shotColor;
        ctx.fill();
        ctx.closePath();

        shotDelay++;
        if(shotDelay == 50){
            
            if(startShotX > canvas.width - spriteWidth ){
                startShotX = 0;
                triggerPulled = false;

            }
            else{
                startShotX = startShotX + spriteWidth;

            }
            shotDelay = 0;
            
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

    
    //maybe set a for loop that draws all 3 shots constantly if criteria are met


    for(var c=0; c<ammoSize; c++) {
        
        //status will change until collission or reach end or reset
        if(ammo[c].status==1){

            //console.log("shotpath");


            // ammo[c].x = 0;
            // ammo[c].y = startShotY;


            ctx.beginPath();
            ctx.rect(ammo[c].x, ammo[c].y, spriteWidth, spriteHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();

            

            ammo[c].shotDelay++;
            if(ammo[c].shotDelay == 50){
                
                if(ammo[c].x > canvas.width - spriteWidth ){
                    ammo[c].x = 0;
                    triggerPulled = false;

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
    ctx.beginPath();
    ctx.rect(playerX, playerY, spriteWidth, spriteHeight);
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
    //drawShot();
    collissionDetection();
    drawScore();

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

     //below helps but we probably need something similar to other code where key was only pressed once.
    else if(shotPressed){
        //change ammo count here?
        // need to find a way to lock shots... after 3 need cooldown before resetting ammo count, 
        
        justDelay++;
       
        if(justDelay == 10){
            justDelay = 0;
            triggerPulled = true;
            ammo[ammoCount].status = 1;
            ammo[ammoCount].y = playerY;
            ammo[ammoCount].x = spriteWidth;
            ammoCount--;

            
            if(ammoCount == 0){
                ammoCount = 3;
            }

            console.log(ammoCount);
            //maybe switch statement here, each shot triggers a different state, different shot

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

    for(var r=0; r<ammo; r++) {
        var b = ammo[r];
        if(b.status == 1) {
            if(startNodeX > b.x && x < b.x+spriteWidth && startNodeY > b.y && drawLine(4) < b.y+spriteHeight) {
            //if(startShotX < startNodeX + spriteWidth && startShotX + spriteWidth > startNodeX && playerY < drawLine(4) + spriteHeight && playerY + spriteHeight > drawLine(4)){
                //dy = -dy;
                //b.status = 0;
                //score++;
                // if(score == brickRowCount*brickColumnCount) {
                //     alert("YOU WIN, CONGRATULATIONS!");
                //     document.location.reload();
                //     clearInterval(interval); // Needed for Chrome to end game
                // }
                console.log("Collission");
                //shotColor = "yellow";
                squareState = false;
                score = score + 10;
                b.x = "x";
            }

        }
            
    }
    // if(startShotX < startNodeX + spriteWidth && startShotX + spriteWidth > startNodeX && playerY < drawLine(4) + spriteHeight && playerY + spriteHeight > drawLine(4)){
    //     console.log("Collission");
    //     shotColor = "yellow";
    //     squareState = false;
    //     score = score + 10;
    //     startShotX = "x";
    // }
    // else{
    //     //shotColor = "green";
    // }
}
function drawScore(){
    ctx.fonz = "12px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 8, 20);
}







function init(){
      
    var interval = setInterval(draw, 10);

    resetAmmo();
}

window.onload = init;



