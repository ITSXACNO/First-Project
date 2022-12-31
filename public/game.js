var started = false;

var level = 0;

var allColours = ["red", "blue", "yellow", "green"]

var gamePattern = [];

var userPattern = [];

$(document).keypress(function() {
    if (!started){
        started = true;
        nextSequence();
    }
})

$(".btn").click(function() {
    var clickedColour = this.id;

    console.log(this.id);

    userPattern.push(clickedColour);

    playSound(clickedColour);

    Animate(clickedColour);

    check(userPattern.length-1);
})

function nextSequence(){

    $("#title").text("Level "+level);

    level += 1;

    userPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);

    var randomColour = allColours[randomNumber];

    gamePattern.push(randomColour);

    $("#"+randomColour).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);

    playSound(randomColour);

    Animate(randomColour);

}

function playSound(whichOne){
    var audio = new Audio("simonSound/"+whichOne+".mp3");
    audio.play();
}

function Animate(colour){
    $("#"+colour).addClass("pressed");

    setTimeout(function() {
        $("#"+colour).removeClass("pressed");
    },50)

}

function check(index){
    if (userPattern[index] === gamePattern[index]){

        if (userPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            },1000)
        }
    }
    else{

        $("#title").text("Game Over ! Try Again Pressing Any Key ")
        
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },100)

        var wrong = new Audio("simonSound/wrong.mp3");
        wrong.play();

        gameOver();

    }
}

function gameOver(){
    started = false;

    level = 0;

    gamePattern = [];

    userPattern = [];
}