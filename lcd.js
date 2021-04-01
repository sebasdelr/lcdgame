var view = {
    displayMessage: function(msg) {
        var message = document.getElementById('messageArea');
        message.innerHTML = msg;
    },
    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class","enemyship");

    },
    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "shot"); 
    },
    displayPlayer: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "playership"); 
    },
    displayNothing: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", ""); 
    },
    displayDigit: function(location, num){
        var cell0 = document.getElementById("d" + location);
        cell0.setAttribute("class", "n" + num);

    }
};

//board starts 00 ends 66

var model = {
    boardSize : 7,
    score: 0,
    //create list of markers for shots - 3 maybe
    markerDown: "0",
    markerUp: "0",
    shot: "0",


    markerTrail: "",

    
    handleAmmo: function(){

    },

    
    shoot: function(column){

        newIndex = controller.ammo.length;
       
        if(newIndex > 0){
            var currentShot = controller.ammo.pop();
            var currentShot = column;
            //console.log(newIndex);
 
            
            var x = 1;
            var shotIntervalID = window.setInterval(function(){

                switch(newIndex) {
                    case 3:
                        playerShot1.moveRight(currentShot, x);
                        break;
                    case 2:
                        playerShot2.moveRight(currentShot, x);
                        break;
                    case 1:
                        playerShot3.moveRight(currentShot, x);

                    default:
                      // code block
                  }

                x++;
            
                if (x === 11) {

                    window.clearInterval(shotIntervalID);
                
                }
            }, 300);
            if(newIndex == 1){
                controller.reset();
                

            }

        }

    },

    scoreTranslator: function(num){
        
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
        

    },

    fireShot: function() {

        setInterval(function(){

            if(triggerPulled){


                model.shoot(controller.playerMarker.toString());
                triggerPulled = false;

            }
        
        }, 40);

    },
    resetAll: function(){
        view.displayDigit("4", "0");
    }
    
    
    
};

function playerShot(){
    this.shotMarker = "x";
    this.resetShot = function(){
        this.shotMarker = "x";
    }
    this.moveRight = function(current, column){
  
        this.shotMarker = current + column;
        previousMarkerUp = current + (column - 1);

    
        if(column == 1){
    
            view.displayMiss(this.shotMarker);
    
        }
        else if(column == 10){
    
            view.displayNothing(previousMarkerUp);
            this.resetShot();
            //need to reset shot marker here... or enemy will get stuck here
    
        }
        else{
            
            view.displayNothing(previousMarkerUp);
            view.displayMiss(this.shotMarker);
    
        }

    }
}



var controller = {

    playerMarker : 3,
    shot1: "",
    shot2: "",
    shot3: "",

    
    ammo: [this.shot1, this.shot2, this.shot3],
    shotsFired: [],
    reset: function(){
        console.log("reset");
        this.shot1 = "x1";
        this.shot2 = "x2";
        this.shot3 = "x3";
        this.ammo = [this.shot1, this.shot2, this.shot3];
    },

    
};

function enemyShip(shipName){
    this.shipMarker = "x";
    this.previousShipMarker = "x";
    this.nextShiptMarker = "xS";
    this.enemyName = shipName;
    this.enemyState = true;

}


enemyShip.prototype.moveLeft = function(current, column){

    this.shipMarker = current + column;
    this.nextShipMarker = current + (column - 1);
    this.previousShipMarker = current + (column + 1);



    // this.shipMarker = column + current;
    // this.nextShipMarker = column + (current + 1);
    // this.previousShipMarker = column + (current - 1);
    

    if(column == 10){

        view.displayHit(this.shipMarker);

    }
    else if(column == 0){

        view.displayNothing(this.previousShipMarker);
        

    }
    else{
                 
        view.displayNothing(this.previousShipMarker);
        view.displayHit(this.shipMarker);

    }
};

//maybe need to pass this to the shot instead
enemyShip.prototype.colission = function() {

    if(this.shipMarker == ""){
        //this.enemyState = true;

    }
    else{
        if(playerShot3.shotMarker.toString() == this.shipMarker.toString() || playerShot2.shotMarker.toString() == this.shipMarker.toString() || playerShot1.shotMarker.toString() == this.shipMarker.toString()){
        //if(playerShot3.shotMarker.toString() == this.nextShipMarker.toString() || playerShot2.shotMarker.toString() == this.nextShipMarker.toString() || playerShot1.shotMarker.toString() == this.nextShipMarker.toString()){
            console.log(this.enemyName + " shot");  
              
            this.enemyState = false;
        }
        //this.enemyState = true;
    }

};

enemyShip.prototype.enemyMove = function(startPoint, interval){
    
    var self = this;

    setInterval(function(){
        //self.enemyState = true;        
        var x = 10;

        //maybe set interval id's to different variables to prevent freezing

        var intervalID = window.setInterval(function () {
        
            
            var y = 0;

                var innerIntervalID = window.setInterval(function() {                   
                    self.colission();
                    y++

                    if(y == 40 || !self.enemyState){
                        window.clearInterval(innerIntervalID);
                        
    
                    }

                }, 40);

            self.moveLeft(startPoint, x);



            if (x === 0 || !self.enemyState) {
                
                window.clearInterval(intervalID);
                if(!self.enemyState){
                    score++;
                    //view.displayMessage(score);
                    model.scoreTranslator(score);
                    window.clearInterval(intervalID);
                    self.enemyState = true;

                }

            }

            x--;
        }, 900);

    }, interval);
    
};

var movePlayerUp = function(){

    if(controller.playerMarker == 0){

    }
    else{
        previousMarker = controller.playerMarker;
        controller.playerMarker = controller.playerMarker -1;

        view.displayNothing(previousMarker + "0");
        view.displayPlayer(controller.playerMarker + "0");

    }
}

var movePlayerDown = function(){

    if(controller.playerMarker == 6){

    }
    else{
        previousMarker = controller.playerMarker;
        controller.playerMarker = controller.playerMarker +1;


        view.displayNothing(previousMarker + "0");
        view.displayPlayer(controller.playerMarker + "0");

    }
    

}

function handleKeyPress(e) {

    if (e.keyCode === 38) {

        movePlayerUp();
    }
    else if(e.keyCode === 40){

        movePlayerDown();

    }
    else if(e.keyCode === 65) {

        triggerPulled = true;

    }
}


function init() {

    //markerUpBox = "";
    markerDown = "";
    markerUp = "0";
    previousMarkerDown = "";
    previousMarkerUp = "0";
    score = 0;
    triggerPulled = false;
    controller.reset();

    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.rect(20, 40, 50, 50);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(240, 160, 20, 0, Math.PI*2, false);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();

    //model.resetCounter();
    view.displayDigit("4", "0");

    model.fireShot();

    playerShot1 = new playerShot();
    playerShot2 = new playerShot();
    playerShot3 = new playerShot();


    var enemy1 = new enemyShip("ship1");
    var enemy2 = new enemyShip("ship2");


    //enemyState = true;

    //enemyMove();
    enemy2.enemyMove("4", 7000);
    enemy1.enemyMove("3", 7000);
    

    view.displayPlayer("30");

    document.addEventListener("keydown", handleKeyPress);

}

window.onload = init;

