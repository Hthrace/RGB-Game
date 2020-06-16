
let colors = [];
let difficulty = "hard";
let easy = "easy";
let hard = "hard";
let custom = "custom";
let lifes = 3;
let easyBTN = document.querySelector("#easy");
let hardBTN = document.querySelector("#hard");
let customBTN = document.querySelector("#custom");
let modeBTN = document.querySelector("#modeBTN");
let resetBTN = document.querySelector("#reset");
let startGameBTN = document.querySelector("#startGameBTN");
let customNum = document.querySelector("#customNum");
let customLifes = document.querySelector("#customLifes");
let rgbCode = document.querySelector("#rgbCode");
let squares = document.querySelectorAll(".square");
let menuStyle = document.querySelector(".menuStyle");
let menuNav = document.querySelector("#menuNav");
let overlayContent = document.querySelectorAll(".overlayContent");
let helpBTN = document.querySelector("#helpBTN");
let closeHelpBTN = document.querySelector("#closeHelpBTN");
let helpContainer = document.querySelectorAll(".helpContainer")
let imgWin = document.querySelector("#imgWin");
let imgLose = document.querySelector("#imgLose");
let imgPlayAgain = document.querySelector("#imgPlayAgain");
let inputStyle = document.querySelectorAll(".inputStyle");
let easyToggle = 0;
let hardToggle = 1;
let customToggle = 0;
let winLoseValue = 0;

init();

function init() {
  gameMode(6);
  createLifes(lifes);
  displayCustomInput();
  hardBTN.classList.toggle("currentMode");
  imgWin.classList.toggle("contentHide");
  imgPlayAgain.classList.toggle("contentHide");
  imgLose.classList.toggle("contentHide");
}

//Function generates new RGB values.
function newRGB() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  rgbValue = "rgb(" + r + ", " + g + ", " + b + ")";
  return rgbValue;
}

//Function pushes new RGB values into the colors array.
function pushRGB(num) {
  for (let i = 0; i < num; i++) {
    newValue = colors.push(newRGB());
  }
  return newValue;
}

//Function passes in the game settings from the game mode buttons.
function gameMode(num) {
  colors.splice(0, colors.length);
  pushRGB(num);
  squareSetup();
  promptRGB();
}

//Button sets game to easy mode.
easyBTN.addEventListener("click", function () {
  difficulty = easy;
  easyBTN.classList.toggle("currentMode");
  hardToggleCheck();
  customToggleCheck();
  easyToggle = 1;

});

//Button sets game to hard mode.
hardBTN.addEventListener("click", function () {
  difficulty = hard;
  hardBTN.classList.toggle("currentMode");
  easyToggleCheck();
  customToggleCheck();
  hardToggle = 1
});

//Button sets game to custom mode.
customBTN.addEventListener("click", function () {
  difficulty = custom;
  customBTN.classList.toggle("currentMode");
  displayCustomInput();
  easyToggleCheck();
  hardToggleCheck();
  customToggle = 1;
});

//Chooses array index number at random.
function promptRGB() {
  let colorsIndex = Math.floor(Math.random() * colors.length);
  rgbCode.textContent = colors[colorsIndex];
  pickedColor = colors[colorsIndex];
  return;
}

//Reset function
function resetGame() {
  if (difficulty === "hard") {
    clearPrevious();
    clearPreviousLifes();
    lifes = 3;
    createLifes(lifes);
    gameMode(6);
    menuStyle.style.backgroundColor = "#4d80bc";
    console.log(colors + " Hard mode!");
  } else if (difficulty === "easy") {
    clearPrevious();
    clearPreviousLifes();
    lifes = 4;
    createLifes(lifes);
    gameMode(3);
    menuStyle.style.backgroundColor = "#4d80bc";
    console.log(colors + " Easy mode!");
  } else if (difficulty === "custom") {
    clearPrevious();
    clearPreviousLifes();
    lifes = customLifes.value;
    createLifes(lifes);
    gameMode(customNum.value);
    menuStyle.style.backgroundColor = "#4d80bc";
    console.log(colors + " Custom mode!");
  } else {
    console.log("FRAK");
  }
}

//Button resets game using the reset function.
resetBTN.addEventListener("click", function () {
  clearPrevious();
  clearPreviousLifes();
  menuStyle.style.backgroundColor = "#4d80bc";
  return resetGame();
});

//Loops through colors array and creates divs based on colors array.
function squareSetup() {
  colors.forEach(function (colorsArry) {
    sqCreate = document.createElement("div");
    sqCreate.className = "square";
    document.querySelector("#containerColors").appendChild(sqCreate);
    sqCreate.style.backgroundColor = colorsArry;
    squares = document.querySelectorAll(".square");
    sqCreate.addEventListener("click", function () {
      let clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedColor) {
        return winner(clickedColor);
      } else {
        poorChoice();
        this.style.backgroundColor = "#232323";
      }
    });
  });
}

//If winning conditions met this excutes.
function winner(color) {
  squares.forEach(function (sq) {
    sq.style.backgroundColor = color;
  });
  menuStyle.style.backgroundColor = color;
  clearPrevious();
  clearPreviousLifes();
  imgPrep();
  imgWin.classList.toggle("contentHide");
  setTimeout(function () {
    modeMenu("100%");
  }, 500);
  return winLoseValue = 1;
}

//Clears all divs.
function clearPrevious() {
  let containerColors = document.querySelector("#containerColors");
  while (containerColors.firstChild) {
    containerColors.removeChild(containerColors.lastChild);
  }
}

//Function for game over.
function gameOver() {
  clearPrevious();
  clearPreviousLifes();
  imgPrep();
  imgLose.classList.toggle("contentHide");
  setTimeout(function () {
    modeMenu("100%");
  }, 250);
  return winLoseValue = 0;
}

//Function for subtracting lifes on wrong pick.
function poorChoice() {
  if (lifes > 1) {
    lifes--;
    clearPreviousLifes();
    createLifes(lifes);
    return;
  } else {
    gameOver();
  }
  return lifes;
}

//Event listener calls function to open game mode menu.
modeBTN.addEventListener("click", function () {
  helpContainer.forEach(function (content) {
    content.classList.toggle("contentHide");
  });
  setTimeout(function () {
    modeMenu("100%");
  }, 250);
});

//Event listener calls function to reset the game(also starts it if mode changed). The calls function to close menu.
startGameBTN.addEventListener("click", function () {
  modeMenu("0%");
  resetGame();
  setTimeout(function () {
    helpContainer.forEach(function (content) {
      content.classList.toggle("contentHide");
    });
  }, 250);
});

//Function to open and close game mode menu.
function modeMenu(num) {
  menuNav.style.height = num;
}

//Function to toggle and untoggle a menu option.
function easyToggleCheck() {
  if (easyToggle === 1) {
    easyBTN.classList.toggle("currentMode");
    easyToggle = 0;
  } else {
    return;
  }
}

//Function to toggle and untoggle a menu option.
function hardToggleCheck() {
  if (hardToggle === 1) {
    hardBTN.classList.toggle("currentMode");
    hardToggle = 0;
  } else {
    return;
  }
}

//Function to toggle and untoggle a menu option.
function customToggleCheck() {
  if (customToggle === 1) {
    customBTN.classList.toggle("currentMode");
    displayCustomInput();
    customToggle = 0;
  } else {
    return;
  }
}

//Button to open the help menu.
helpBTN.addEventListener("click", function () {
  overlayContent.forEach(function (content) {
    content.classList.toggle("contentHide");
  });
  startGameBTN.classList.toggle("contentHide");
  setTimeout(function () {
    modeMenu("100%");
  }, 250);
});

//Button to close the help menu.
closeHelpBTN.addEventListener("click", function () {
  modeMenu("0%");
  setTimeout(function () {
    overlayContent.forEach(function (content) {
      content.classList.toggle("contentHide");
    });
    startGameBTN.classList.toggle("contentHide");
  }, 290);
});

//Function to hide mode menu and help menu.
function imgPrep() {
  helpContainer.forEach(function (content) {
    content.classList.toggle("contentHide");
  });
  overlayContent.forEach(function (content) {
    content.classList.toggle("contentHide");
  });
  imgPlayAgain.classList.toggle("contentHide");
  startGameBTN.classList.toggle("contentHide");
}

//Button to play again after winning or losing.
imgPlayAgain.addEventListener("click", function () {
  resetGame();
  modeMenu("0%");
  setTimeout(function () {
    winLoseCheck();
    imgPrep();
  }, 300);
});

//Function to toggle the correct image for winning or losing.
function winLoseCheck() {
  if (winLoseValue === 1) {
    imgWin.classList.toggle("contentHide");
    winLoseValue = 0;
  } else {
    imgLose.classList.toggle("contentHide");
    return winLoseValue = 0;
  }
}

//Function generates img elements as need for amount of lifes per a game.
function createLifes(num) {
  for (let i = 0; i < num; i++) {
    lifeCreate = document.createElement("img");
    lifeCreate.className = "imgHeart";
    document.querySelector("#lifeContainer").appendChild(lifeCreate);
    lifeCreate.setAttribute("src", "img/life.png");
  }
}

//Function clears all img elements.
function clearPreviousLifes() {
  let lifeContainer = document.querySelector("#lifeContainer");
  while (lifeContainer.firstChild) {
    lifeContainer.removeChild(lifeContainer.lastChild);
  }
}

//Function hides custom input values till custom button calls for it.
function displayCustomInput(){
  inputStyle.forEach(function(content){
    content.classList.toggle("contentHide")
  });
}