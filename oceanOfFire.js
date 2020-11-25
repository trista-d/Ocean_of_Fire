/***************************************************************************
* Name:        The Ocean of Fire
* Authors:     Elias and Trista
* Date:        June 14, 2019
* Purpose:     A game where the player avoids obstacles to complete levels
****************************************************************************/

var bgId; // id "background"
var w = 1080; // width of background div
var positionLeft = 0; // background left position
var pos; // horse's y position
var elem; // id "horse"
var obstacles = []; // array of random obstacles
var found = []; // boolean array of if an obstacle has been collided with
var life = 3; // number of lives player starts with
var background; // background interval 
var endHorse; // source of horse player chooses
var collision; // collision detection interval
var checking = false; // tracks if collisions are currently being checked
var container; // main menu div
var desertMusic; // gameplay soundtrack
var horseName; // name of horse chosen by user
    
// display game screens based on number input    
function changeScreen(num) {
    container = document.getElementById("container");
    
	switch(num) {
        case 1: document.getElementById("selection").style.display = "block";
                container.style.display = "none";
        break;
        case 2: container.style.display = "none";
                document.getElementById("instructionsScreen").style.display = "block";
        break;
        case 3: container.style.display = "none";
                document.getElementById("creditScreen").style.display = "block";
    } // switch
} // changeScreen

// goes back to menu when back arrow clicked
function backButton(num) {
	container.style.display = "block";
	
	switch(num) {
		case 1: document.getElementById("instructionsScreen").style.display = "none";
		break;
		case 2: document.getElementById("creditScreen").style.display = "none";
		break;
		case 3: document.getElementById("selection").style.display = "none";
    } // switch
    
} // backButton

// processes which horse avatar is chosen
function chooseAvatar(avatarNum) {
    var avatar = document.getElementById("player");
    var win = document.getElementById("winScreen");
    var winners = document.getElementById("winners");
    
    switch(avatarNum) {
        case 0: avatar.src = "images/brownHorse.gif";
                endHorse = "images/brownSad.png";
                win.style.backgroundImage = "url('images/winBrown.png')";
                winners.innerHTML += "Epona are now world renowned racers!";       
        break;
        case 1: avatar.src = "images/blackHorse.gif";
                endHorse = "images/blackSad.png";
                win.style.backgroundImage = "url('images/winBlack.png')";
                winners.innerHTML += "Black Caviar are now world renowned racers!";
        break;
        case 2: avatar.src = "images/grayHorse.gif";
                endHorse = "images/graySad.png";
                win.style.backgroundImage = "url('images/winGray.png')";
                winners.innerHTML += "Subzero are now world renowned racers!";
        break;
        case 3: avatar.src = "images/goldenHorse.gif";
                endHorse = "images/goldenSad.png";
                win.style.backgroundImage = "url('images/winGolden.png')";
                winners.innerHTML += "Hidalgo are now world renowned racers!";
    } // switch
    
    setUpPlay();
} // chooseAvatar

// display horse name when hovered over during selection
function displayNames(num) {
    switch(num) {
        case 0: document.getElementById("brownH3").style.display = "inline";
        break;
        case 1: document.getElementById("blackH3").style.display = "inline";
        break;
        case 2: document.getElementById("grayH3").style.display = "inline";
        break;
        case 3: document.getElementById("goldenH3").style.display = "inline";
    } // switch
} // displayNames

// hide horse name when not hovered over
function hideNames(num) {
    switch(num) {
        case 0: document.getElementById("brownH3").style.display = "none";
        break;
        case 1: document.getElementById("blackH3").style.display = "none";
        break;
        case 2: document.getElementById("grayH3").style.display = "none";
        break;
        case 3: document.getElementById("goldenH3").style.display = "none";
    } // switch
} // hideNames

// begins gameplay
function setUpPlay() {
    pos = 0; // horse's y position
	var count = 0; // checks if 'space' has been pressed yet
    
	// hide menu, display level 1
    document.getElementById("selection").style.display = "none";
    container.style.display = "none";
    document.getElementById("background").style.display = "block";
	document.getElementById("shield").style.display = "block";
	
    // respond to space bar and arrow key input
	window.addEventListener('keydown', function (e) {
		var c = String.fromCharCode(e.keyCode);
        elem = document.getElementById("horse");
        desertMusic = document.getElementById("desertMusic");
        
        // start level and move horse
		if (e.keyCode == 32 && count == 0) {
            generateObstacles(11, 540, 0);
            desertMusic.play();
            desertMusic.loop = true;
            document.getElementById("lvlText").style.display = "none";
            background = setInterval(backgroundScroll, 25);
            elem.style.display = "inline";
            
			count++;
            setTimeout(lvl2, 30000);
		} else if (e.keyCode == 38 && pos > 10) {
            pos -= 15; 
            elem.style.top = pos + "px";
		} else if (e.keyCode == 40 && pos < 575) {
            pos += 15; 
            elem.style.top = pos + "px";	
        } // if
	}, false);
} // setUpPlay

// sets up level 2 at medium difficulty
function lvl2() {
    var title; // div holding level title
    var titleText; // text to display at start of level
    var h1Elem; // h1 to put titleText in
    
    clearInterval(background);
    
    // remove and reset obstacles and collisions
    for (var k = 0; k < obstacles.length; k++) {
    bgId.removeChild(obstacles[k]);
    } // for
    obstacles.length = 0;
    found.length = 0;
    
    // display scrolling level title
    title = document.createElement("DIV");
    title.setAttribute("id", "lvl_2");
    h1Elem = document.createElement("H1");
    titleText = document.createTextNode("LEVEL TWO");
    h1Elem.appendChild(titleText);
    title.appendChild(h1Elem);
    document.getElementById("background").appendChild(title);
    
    generateObstacles(44, 300, 6000);
    background = setInterval(backgroundScroll, 12.5);
    desertMusic.currentTime = 0;
    desertMusic.playbackRate = 1.5;
    
    // set length of level 2
    setTimeout(lvl3, 30000);
} // lvl2

// sets up level 3 at hard difficulty
function lvl3() {
    var title; // div holding level title
    var titleText; // text to display at start of level
    var h1Elem; // h1 to put titleText in
    
    clearInterval(background);
    
    // display scrolling level title
    title = document.createElement("DIV");
    title.setAttribute("id", "lvl_3");
    h1Elem = document.createElement("H1");
    titleText = document.createTextNode("LEVEL THREE");
    h1Elem.appendChild(titleText);
    title.appendChild(h1Elem);
    document.getElementById("background").appendChild(title);
    
    
    // remove and reset obstacles and collisions
    for (var k = 0; k < obstacles.length; k++) {
        bgId.removeChild(obstacles[k]);
    } // for
    
	obstacles.length = 0;
    found.length = 0;
    
    generateObstacles(170, 200, 19000);
    background = setInterval(backgroundScroll, 6.25);
    desertMusic.currentTime = 0;
    desertMusic.playbackRate = 1.85;
    
    // set length of level 3
    setTimeout(endGame, 30000);
} // lvl3

// randomly generates obstacles
function generateObstacles(obstacleNum, distance, startPoint) {
    var jString; // string of variable "j"
    var imageNum; // randomly generated number to choose image name
    var imageName = []; // array of image names
    
    // randomly generate what each type of obstacle is
    for (var k = 0; k < obstacleNum; k++) {
        imageNum = Math.round(Math.random() * 4);
    
        switch(imageNum) {
            case 0: imageName.push("cactus0.png");
            break;
            case 1: imageName.push("cactus1.png");
            break;
            case 2: imageName.push("cactus2.png");
            break;
            case 3: imageName.push("cactus3.png");
            break;
            case 4: imageName.push("scorpion.png");
        } // switch
    } // for
    
    // create obstacles and add them to HTML
    for (var j = 0; j < obstacleNum; j++) {
        jString = "obstacle_" + j.toString();
        obstacles.push(document.createElement("IMG")); // add to obstacles array
        obstacles[j].setAttribute("id", jString);
        obstacles[j].setAttribute("src", "images/" + imageName[j]);
        obstacles[j].style.top = Math.floor(Math.random() * 625 + 50) + "px"; // randomly generate y position
        obstacles[j].style.left = ((j + 1) * distance + startPoint) + "px"; // set x position
        obstacles[j].style.position = "absolute";
        obstacles[j].style.zIndex = "5";
        document.getElementById("background").appendChild(obstacles[j]); 
        found.push(false); // put in array that obstacle has not been collided with
    } // for
} // generateObstacles

// Code from Dakota's Adventure game to make background scroll
function backgroundScroll() {
	bgId = document.getElementById("background");
    
	bgId.style.left = (positionLeft - 5) + 'px';  // move path

    bgId.style.width = (w + 5) + 'px';           // add to div width

    w += 5;                                   // add to stored div width

    positionLeft -= 5;                         // add to stored position

    checkCollision();                            // check if there's a collision
    
} // backgroundScroll

// checks if horse collides with obstacle
function checkCollision() {
	var cactusRect; // going to store coordinates of obstacles
    var horseRect = document.getElementById("player").getBoundingClientRect(); // get coordinates of horse
    
    // check collisions if they aren't still being checked from a previous call
    if (checking == false) { 
        checking = true;
        
		// check each obstacle
		for (var j = 0; j < obstacles.length; j++) {
            cactusRect = document.getElementById("obstacle_" + j.toString()).getBoundingClientRect(); // get coordinates of current obstacle
            if ((cactusRect.right >= horseRect.left && cactusRect.left <= horseRect.right - 50) && ((cactusRect.bottom >= (horseRect.top + 50) && cactusRect.bottom <= horseRect.bottom)|| cactusRect.top >= (horseRect.top + 50) && cactusRect.top <= horseRect.bottom)) {
                
                // check if obstacle has already been collided with, change number of lives, and make horse blink
                if (found[j] == false) {
                    life--;
                    showHearts();
                    found[j] = true;
                    blink();
                    if (life == 0) {
                        clearInterval(background);
                        clearInterval(collision);
                        gameOver();   
                    } // if
                } // if
            } // if
        } // for
    } // if
    
	checking = false;
} // checkCollision

// changes how many "lives" player has
function showHearts() {
	switch(life) {
		case 2: document.getElementById("heart3").src = "images/emptyHearts.png";
		break;
	    case 1: document.getElementById("heart3").src = "images/emptyHearts.png";
				document.getElementById("heart2").src = "images/emptyHearts.png";
		break;
	    case 0: document.getElementById("heart3").src = "images/emptyHearts.png";
				document.getElementById("heart2").src = "images/emptyHearts.png";
				document.getElementById("heart1").src = "images/emptyHearts.png";	
	} // life
} // showHearts

// shown when game is won
function endGame() {  
    clearInterval(background);
    desertMusic.pause();
    bgId.style.display = "none";
    document.getElementById("shield").style.display = "none";
	document.getElementById("winScreen").style.display = "block";
} // endGame

// shown if game is lost
function gameOver() {
	var sadHorse; // image on game over screen
    
    sadHorse = document.createElement("IMG");
    sadHorse.setAttribute("id", "sadHorse");
    sadHorse.src = endHorse;
    document.getElementById("gameOver").appendChild(sadHorse);
    sadHorse.style.position = "relative";
    sadHorse.style.top = "50px";
    sadHorse.style.left = "430px";
    desertMusic.pause();
    document.getElementById("gameOver").style.display = "block";
	document.getElementById("player").style.display = "none";
} // gameOver

// one of two functions to change visibility to make it seem like horse is blinking
function blink() {
    document.getElementById("horse").style.display = "none";
    setTimeout(showHorse, 200);
} // blink

// one of two functions to change visibility to make it seem like horse is blinking
function showHorse() {
    document.getElementById("horse").style.display = "inline";
} // showHorse

// resets game and goes to menu
function home() {
    location.reload();
} // home