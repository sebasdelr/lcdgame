var view = {
    displayMessage: function(msg) {
        var message = document.getElementById('messageArea');
        message.innerHTML = msg;
    },
    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class","hit");

    },
    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss"); 
    },
    displayNothing: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", ""); 
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
 
            
            var x = 5;
            var intervalID = window.setInterval(function () {

                switch(newIndex) {
                    case 3:
                        playerShot1.moveUp(x, currentShot);
                        break;
                    case 2:
                        playerShot2.moveUp(x, currentShot);
                        break;
                    case 1:
                        playerShot3.moveUp(x, currentShot);

                    default:
                      // code block
                  }

                x--;
            
                if (x === -2) {

                    window.clearInterval(intervalID);
                
                }
            }, 300);
            if(controller.ammo.length == 0){
                controller.reset();
                

            }

        }

    },

    fireShot: function() {

        setInterval(function () {

            if(triggerPulled){


                model.shoot(controller.playerMarker.toString());
                triggerPulled = false;

            }
        
        }, 40);

    },
    
    
    
};

function playerShot(){
    this.shotMarker = "x";
    this.moveUp = function(current, column){
  
        this.shotMarker = current + column;
        previousMarkerUp = (current + 1) + column;

    
        if(current == 5){
    
            view.displayMiss(this.shotMarker);
    
        }
        else if(current == -1){
    
            view.displayNothing(previousMarkerUp);
    
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


enemyShip.prototype.moveDown = function(current, column){

    this.shipMarker = current + column;
    this.nextShipMarker = current + (column + 1);
    this.previousShipMarker = current + (column + 1);

    console.log(this.shipMarker);

    // this.shipMarker = column + current;
    // this.nextShipMarker = column + (current + 1);
    // this.previousShipMarker = column + (current - 1);
    

    if(column == 7){

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

enemyShip.prototype.colission = function() {

    if(this.shipMarker == ""){
        //this.enemyState = true;

    }
    else{

        if(playerShot3.shotMarker.toString() == this.nextShipMarker.toString() || playerShot2.shotMarker.toString() == this.nextShipMarker.toString() || playerShot1.shotMarker.toString() == this.nextShipMarker.toString()){
            console.log(this.enemyName + " shot");    
            this.enemyState = false;
        }
        //this.enemyState = true;
    }

};

enemyShip.prototype.enemyMove = function(startPoint, interval){
    this.enemyState = true;
    var self = this;

    setInterval(function(){
        
        var x = 7;

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

            self.moveDown(startPoint, x);

            x--;


            if (x === 0 || !self.enemyState) {
                
                window.clearInterval(intervalID);
                if(!self.enemyState){
                    score++;
                    view.displayMessage(score);
                    window.clearInterval(intervalID);
                    self.enemyState = true;

                }

            }
        }, 900);

    }, interval);
    
};

var moveLeft = function(){

    if(controller.playerMarker == 0){

    }
    else{
        previousMarker = controller.playerMarker;
        controller.playerMarker = controller.playerMarker -1;

        view.displayNothing("6" + previousMarker);
        view.displayMiss("6"+ controller.playerMarker);

    }
}

var moveRight = function(){

    if(controller.playerMarker == 6){

    }
    else{
        previousMarker = controller.playerMarker;
        controller.playerMarker = controller.playerMarker +1;


        view.displayNothing("6" + previousMarker);
        view.displayMiss("6"+ controller.playerMarker);

    }
    

}

function handleKeyPress(e) {

    if (e.keyCode === 37) {

        moveLeft();
    }
    else if(e.keyCode === 39){

        moveRight();

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
    

    view.displayMiss("73");

    document.addEventListener("keydown", handleKeyPress);

}

window.onload = init;

