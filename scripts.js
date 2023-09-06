var stage1fired = false
var stage2fired = false
var stage3fired = false
var stage4fired = false
var stage5fired = false
var stage6fired = false
var stage7fired = false
var gameContainer = document.getElementById("game-container");
var monsters = [];
var maxHealth = 100;
var damageMultiplier = 2;
var killCounter = 0;
var killCounterElement = document.getElementById("kill-counter");
var particleCanvas = document.getElementById("particle-canvas");
var particleContext = particleCanvas.getContext("2d");
var particles = [];
var particleCount = 30;
var particleSize = 4;
var particleColor = "rgba(255, 0, 0, 0.5)";
var particlesEnabled = false;
var stageColors = ["red", "darkred", "cyan", "darkred", "purple", "yellow", "black"];
var currentStage = 0;
var istouchenabled = false;
var outputkeys = '';
var keyStates = {};

particleCanvas.width = window.innerWidth;
particleCanvas.height = window.innerHeight;

var stick = new JoyStick("joyDiv")
var damageEvent = new Event("DamageEvent")

document.addEventListener("DamageEvent", function (damageamount) {

})

// Function to handle the left punch action
function handleLeftPunch() {
  // Check if monster is in range of the left punch
  for (var i = 0; i < monsters.length; i++) {
    var monsterRect = monsters[i].monster.getBoundingClientRect();

    var punchRect = document.getElementById("cursor-hand-l-detector").getBoundingClientRect();

    if (
      punchRect.left < monsterRect.right &&
      punchRect.right > monsterRect.left &&
      punchRect.top < monsterRect.bottom &&
      punchRect.bottom > monsterRect.top
    ) {
      // Apply damage to the monster
      monsters[i].health -= Math.floor(10 * damageMultiplier);

      if (monsters[i].health <= 0) {
        // Monster defeated
        monsters[i].monster.remove();
        monsters.splice(i, 1);
        killCounter++;
        updateKillCounter();
        checkStageCompletion();
        spawnMonsterWithIncreasedHealth();
      } else {
        // Update monster's health bar
        var remainingWidth = (monsters[i].health / maxHealth) * 100;
        monsters[i].healthBarFill.style.width = remainingWidth + "%";
      }
    }
  }
}

// Function to handle the right punch action
function handleRightPunch() {
  // Check if monster is in range of the right punch
  for (var i = 0; i < monsters.length; i++) {
    var monsterRect = monsters[i].monster.getBoundingClientRect();

    var punchRect = document.getElementById("cursor-hand-r-detector").getBoundingClientRect();

    if (
      punchRect.left < monsterRect.right &&
      punchRect.right > monsterRect.left &&
      punchRect.top < monsterRect.bottom &&
      punchRect.bottom > monsterRect.top
    ) {
      // Apply damage to the monster
      monsters[i].health -= Math.floor(10 * damageMultiplier);

      if (monsters[i].health <= 0) {
        // Monster defeated
        monsters[i].monster.remove();
        monsters.splice(i, 1);
        killCounter++;
        updateKillCounter();
        checkStageCompletion();
        spawnMonsterWithIncreasedHealth();
      } else {
        // Update monster's health bar
        var remainingWidth = (monsters[i].health / maxHealth) * 100;
        monsters[i].healthBarFill.style.width = remainingWidth + "%";
      }
    }
  }
}

//var cursor = document.getElementById("cursor");
var cursorCollisionBox = document.getElementById("cursor-collision-box");
var cursorX = window.innerWidth / 2;
var cursorY = window.innerHeight / 2;
var cursorX1 = window.innerWidth / 2;
var cursorY1 = window.innerHeight / 2;
var stepSize = 1;
var diagonalStepSize = Math.sqrt(Math.pow(stepSize, 2) / 2); // Calculate diagonal step size

var db4lefthand = true;
var db4righthand = true;

function handleKeyboardInput() {
  // Set key state to true when key is pressed
  document.addEventListener("keydown", function (event) {
    var key = event.key.toLowerCase();
    keyStates[key] = true;
  });

  // Set key state to false when key is released
  document.addEventListener("keyup", function (event) {
    var key = event.key.toLowerCase();
    keyStates[key] = false;
  });
  // Handle cursor movement based on keyboard input
  function handleKeyboardCursorMovement() {
    var newX = cursorX;
    var newY = cursorY;
    var isMoving = false;
    var rotation = 0; // Initial rotation angle
    var foundkeycombo = false;

    // Diagonal Movement
    if (keyStates["a"] && keyStates["s"]) {
      newX -= diagonalStepSize;
      newY += diagonalStepSize;
      isMoving = true;
      rotation = -135; // Rotate cursor diagonally upwards leftwards
      foundkeycombo = true;
    }
    if (keyStates["a"] && keyStates["w"]) {
      newX -= diagonalStepSize;
      newY -= diagonalStepSize;
      isMoving = true;
      rotation = -45; // Rotate cursor diagonally upwards rightwards
      foundkeycombo = true;
    }
    if (keyStates["d"] && keyStates["w"]) {
      newX += diagonalStepSize;
      newY -= diagonalStepSize;
      isMoving = true;
      rotation = 45; // Rotate cursor diagonally downwards leftwards
      foundkeycombo = true;
    }
    if (keyStates["d"] && keyStates["s"]) {
      newX += diagonalStepSize;
      newY += diagonalStepSize;
      isMoving = true;
      rotation = 135; // Rotate cursor diagonally downwards rightwards
      foundkeycombo = true;
    }
    if (!foundkeycombo) {
      if (keyStates["w"]) {
        newY -= stepSize;
        isMoving = true;
        rotation = 0; // Rotate cursor upwards
      }
      if (keyStates["a"]) {
        newX -= stepSize;
        isMoving = true;
        rotation = -90; // Rotate cursor leftwards
      }
      if (keyStates["s"]) {
        newY += stepSize;
        isMoving = true;
        rotation = 180; // Rotate cursor downwards
      }
      if (keyStates["d"]) {
        newX += stepSize;
        isMoving = true;
        rotation = 90; // Rotate cursor rightwards
      }
    }

    // Punch actions
    if (db4lefthand == true && keyStates["q"]) {
      db4lefthand = false;
      var lefthand = document.getElementById("cursor-hand-l");
      lefthand.style.animation = "punch 0.4s";
      handleLeftPunch()
      setTimeout(function () {
        db4lefthand = true;
        lefthand.style.animation = "none";
      }, 400);
    }

    if (db4righthand == true && keyStates["e"]) {
      db4righthand = false;
      var righthand = document.getElementById("cursor-hand-r");
      righthand.style.animation = "punch 0.4s";
      handleRightPunch()
      setTimeout(function () {
        db4righthand = true;
        righthand.style.animation = "none";
      }, 400);
    }

    // Check boundaries
    newX = Math.max(0, Math.min(newX, window.innerWidth));
    newY = Math.max(0, Math.min(newY, window.innerHeight));

    if (isMoving) {
      // Check collision with monsters for all possible next moves
      var cursorRect = cursor.getBoundingClientRect();
      var cursorCollisionRect = cursorCollisionBox.getBoundingClientRect();
      var canMove = true;

      for (var i = 0; i < monsters.length; i++) {
        var monsterRect = monsters[i].monster.getBoundingClientRect();

        var nextCursorRect = {
          left: newX,
          top: newY,
          right: newX + cursorCollisionRect.width,
          bottom: newY + cursorCollisionRect.height,
        };
        if (
          nextCursorRect.left < monsterRect.right &&
          nextCursorRect.right > monsterRect.left &&
          nextCursorRect.top < monsterRect.bottom &&
          nextCursorRect.bottom > monsterRect.top
        ) {
          canMove = false;
          break;
        }
      }

      if (canMove) {
        cursorX = newX;
        cursorY = newY;

        // Update the position of the cursor and collision box
        cursor.style.transform = `rotate(${rotation}deg)`;
        cursorCollisionBox.style.transform = `translate(${cursorX}px, ${cursorY}px) `; // Center the collision box
      }
    }

    requestAnimationFrame(handleKeyboardCursorMovement);
  }
  handleKeyboardCursorMovement()
}

function handleMobileInput() {


  // Set joystick input for cursor movement
  function handleJoystickInput() {
    var newX = cursorX1;
    var newY = cursorY1;
    var isMoving = false;
    var rotation = 0; // Initial rotation angle
    var foundkeycombo = false;
    var joystickdir = stick.GetDir()

    // Diagonal Movement
    if (joystickdir == "SW") {
      newX -= diagonalStepSize;
      newY += diagonalStepSize;
      isMoving = true;
      rotation = -135; // Rotate cursor diagonally upwards leftwards
      foundkeycombo = true;
    }
    if (joystickdir == "NW") {
      newX -= diagonalStepSize;
      newY -= diagonalStepSize;
      isMoving = true;
      rotation = -45; // Rotate cursor diagonally upwards rightwards
      foundkeycombo = true;
    }
    if (joystickdir == "NE") {
      newX += diagonalStepSize;
      newY -= diagonalStepSize;
      isMoving = true;
      rotation = 45; // Rotate cursor diagonally downwards leftwards
      foundkeycombo = true;
    }
    if (joystickdir == "SE") {
      newX += diagonalStepSize;
      newY += diagonalStepSize;
      isMoving = true;
      rotation = 135; // Rotate cursor diagonally downwards rightwards
      foundkeycombo = true;
    }
    if (!foundkeycombo) {
      if (joystickdir == "N") {
        newY -= stepSize;
        isMoving = true;
        rotation = 0; // Rotate cursor upwards
      }
      if (joystickdir == "W") {
        newX -= stepSize;
        isMoving = true;
        rotation = -90; // Rotate cursor leftwards
      }
      if (joystickdir == "S") {
        newY += stepSize;
        isMoving = true;
        rotation = 180; // Rotate cursor downwards
      }
      if (joystickdir == "E") {
        newX += stepSize;
        isMoving = true;
        rotation = 90; // Rotate cursor rightwards
      }
    }

    // Punch actions
    //if (db4lefthand == true && joystick.buttonLeft()) {
    //  db4lefthand = false;
    //  var lefthand = document.getElementById("cursor-hand-l");
    //  lefthand.style.animation = "punch 0.4s";
    // setTimeout(function () {
    //    db4lefthand = true;
    //    lefthand.style.animation = "none";
    //  }, 400);
    // }
    //if (db4righthand == true && joystick.buttonRight()) {
    //  db4righthand = false;
    //  var righthand = document.getElementById("cursor-hand-r");
    //  righthand.style.animation = "punch 0.4s";
    //  setTimeout(function () {
    //    db4righthand = true;
    //    righthand.style.animation = "none";
    //  }, 400);
    // }

    // Check boundaries
    newX = Math.max(0, Math.min(newX, window.innerWidth));
    newY = Math.max(0, Math.min(newY, window.innerHeight));

    if (isMoving) {
      // Check collision with monsters for all possible next moves
      var cursorRect = cursor.getBoundingClientRect();
      var cursorCollisionRect = cursorCollisionBox.getBoundingClientRect();
      var canMove = true;

      for (var i = 0; i < monsters.length; i++) {
        var monsterRect = monsters[i].monster.getBoundingClientRect();

        var nextCursorRect = {
          left: newX,
          top: newY,
          right: newX + cursorCollisionRect.width,
          bottom: newY + cursorCollisionRect.height,
        };

        if (
          nextCursorRect.left < monsterRect.right &&
          nextCursorRect.right > monsterRect.left &&
          nextCursorRect.top < monsterRect.bottom &&
          nextCursorRect.bottom > monsterRect.top
        ) {
          canMove = false;
          break;
        }
      }

      if (canMove) {
        cursorX1 = newX;
        cursorY1 = newY;

        // Update the position of the cursor and collision box
        cursor.style.transform = `rotate(${rotation}deg)`;
        cursorCollisionBox.style.transform = `translate(${cursorX1}px, ${cursorY1}px) `; // Center the collision box
      }
    }

    requestAnimationFrame(handleJoystickInput);
  }

  // Start the joystick input loop
  handleJoystickInput()
}

handleMobileInput();

// Check the device type and apply the appropriate controls
if ('ontouchstart' in window) {
  istouchenabled = true
  setInterval(function () {
    if (particlesEnabled) {
      var x = cursorX1;
      var y = cursorY1;
      var dotTrail = document.createElement("div");
      dotTrail.classList.add("dot-trail");
      dotTrail.style.left = (x) + Math.floor(Math.random() * 50) + "px";
      dotTrail.style.top = (y) + Math.floor(Math.random() * 50) + "px";
      dotTrail.style.backgroundColor = stageColors[currentStage];

      // Append the dot trail element to the game container
      gameContainer.appendChild(dotTrail);

      // Remove dot trail after a certain delay
      setTimeout(function () {
        dotTrail.remove();
      }, 2000);
    }
  }, 20);
  handleMobileInput();
} else {
  setInterval(function () {
    if (particlesEnabled) {
      var x = cursorX;
      var y = cursorY;
      var dotTrail = document.createElement("div");
      dotTrail.classList.add("dot-trail");
      dotTrail.style.left = (x) + Math.floor(Math.random() * 50) + "px";
      dotTrail.style.top = (y) + Math.floor(Math.random() * 50) + "px";
      dotTrail.style.backgroundColor = stageColors[currentStage];

      // Append the dot trail element to the game container
      gameContainer.appendChild(dotTrail);

      // Remove dot trail after a certain delay
      setTimeout(function () {
        dotTrail.remove();
      }, 2000);
    }
  }, 20);
  document.getElementById("joyDiv").style.visibility = "hidden"
  // Non-mobile device: Use keyboard controls
  handleKeyboardInput();
}

function generateRandomSpawnPosition() {
  var spawnX = Math.floor(Math.random() * window.innerWidth);
  var spawnY = Math.floor(Math.random() * window.innerHeight);

  // Get the cursor's position and dimensions
  var cursorRect = cursorCollisionBox.getBoundingClientRect();
  var cursorLeft = cursorRect.left;
  var cursorRight = cursorRect.right;
  var cursorTop = cursorRect.top;
  var cursorBottom = cursorRect.bottom;

  // Calculate the dimensions of the spawn area
  var spawnAreaWidth = spawnX + 100;
  var spawnAreaHeight = spawnY + 100;

  // Check if the spawn area overlaps with the cursor area
  if (
    spawnAreaWidth > cursorLeft &&
    spawnX < cursorRight &&
    spawnAreaHeight > cursorTop &&
    spawnY < cursorBottom
  ) {
    // If there's overlap, generate a new spawn position
    console.warn("RETRYING")
    return generateRandomSpawnPosition();
  }

  return { x: spawnX, y: spawnY };
}


function startGame() {
  gameContainer.innerHTML = "";
  monsters = [];
  killCounter = 0;
  updateKillCounter();
  spawnMonster();
}

function spawnMonster() {
  var monster = document.createElement("div");
  monster.className = "monster";
  var spawnPosition = generateRandomSpawnPosition();
  var y = spawnPosition.y

  monster.style.left = spawnPosition.x + "px";
  monster.style.top = spawnPosition.y + "px";

  var healthBar = document.createElement("div");
  healthBar.className = "health-bar";

  var healthBarFill = document.createElement("div");
  healthBarFill.className = "health-bar-fill";

  healthBar.appendChild(healthBarFill);
  monster.appendChild(healthBar);
  gameContainer.appendChild(monster);
  monsters.push({ monster: monster, healthBarFill: healthBarFill, health: maxHealth });

}

// Function to check for collision between two rectangles
function checkCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}


function pulseRedThreeTimes() {
  var pulseCount = 0;
  var interval = setInterval(function () {
    document.body.style.animation = "pulse-red 2s";
    pulseCount++;
    if (pulseCount === 4) {
      clearInterval(interval);
      document.body.style.animation = "none";
      document.body.style.backgroundcolor = "white"
    }
  }, 3000); // Delay between each pulse (3 seconds)

  document.body.style.animation = "pulse-red 2s";
}




function spawnMonsterWithIncreasedHealth() {
  maxHealth += Math.floor(2 * damageMultiplier);

  setTimeout(function () {
    spawnMonster();
  }, 1000);
}

function updateKillCounter() {
  killCounterElement.innerText = "Kills: " + killCounter;

  // Cursor Effect - Change Color Based on Kill Count
  var cursor = document.getElementById("cursor");

  if (killCounter >= 250 && stage7fired == false) {
    stage7fired = true
    damageMultiplier = 100
    document.getElementById("Stage6Music").pause()
    document.getElementById("Stage7Music").play()
    killCounterElement.style.backgroundColor = "black"
    stepSize = 7
    diagonalStepSize = Math.sqrt(Math.pow(stepSize, 2) / 2)
    currentStage = 6;
  } else if (killCounter >= 100 && killCounter < 250 && stage6fired == false) {
    stage6fired = true
    damageMultiplier = 75
    document.getElementById("Stage5Music").pause()
    document.getElementById("Stage6Music").play()
    killCounterElement.style.backgroundColor = "yellow"
    stepSize = 7
    diagonalStepSize = Math.sqrt(Math.pow(stepSize, 2) / 2)
    currentStage = 5;
  } else if (killCounter >= 75 && killCounter < 100 && stage5fired == false) {
    stage5fired = true
    damageMultiplier = 50
    document.getElementById("Stage4Music").pause()
    document.getElementById("Stage5Music").play()
    killCounterElement.style.backgroundColor = "purple"
    currentStage = 4;
    stepSize = 6
    diagonalStepSize = Math.sqrt(Math.pow(stepSize, 2) / 2)
    document.body.style.animation = "fadepurple 3s";
    setTimeout(function () {
      document.body.style.backgroundColor = "white"
      document.body.style.animation = "none";
    }, 3000)
  } else if (killCounter >= 50 && killCounter < 75 && stage4fired == false) {
    stage4fired = true
    damageMultiplier = 25
    document.getElementById("Stage3Music").pause()
    document.getElementById("Stage4Music").play()
    currentStage = 3;
    document.body.style.animation = "fadered 10s";
    killCounterElement.style.backgroundColor = "red"
    killCounterElement.style.backgroundImage = "none"
    stepSize = 5
    diagonalStepSize = Math.sqrt(Math.pow(stepSize, 2) / 2)
    setTimeout(function () {
      document.body.style.backgroundColor = "darkred"
      document.body.style.animation = "none";
    }, 10000)
  } else if (killCounter >= 25 && killCounter < 50 && stage3fired == false) {
    stage3fired = true
    damageMultiplier = 10
    document.getElementById("Stage2Music").pause()
    document.getElementById("Stage3Music").play()
    currentStage = 2;
    killCounterElement.style.backgroundImage = "linear-gradient(to right,black,cyan)"
    document.body.style.animation = "fadecyan 3s";
    stepSize = 4
    diagonalStepSize = Math.sqrt(Math.pow(stepSize, 2) / 2)
    setTimeout(function () {
      document.body.style.backgroundColor = "white"
      document.body.style.animation = "none";
    }, 6000)
  } else if (killCounter >= 10 && killCounter < 25 && stage2fired == false) {
    stage2fired = true
    document.getElementById("Stage1Music").pause()
    document.getElementById("Stage2Music").play()
    pulseRedThreeTimes()
    killCounterElement.style.backgroundColor = "darkred"
    stepSize = 3
    diagonalStepSize = Math.sqrt(Math.pow(stepSize, 2) / 2)
    currentStage = 1;
  } else if (killCounter >= 5 && killCounter < 10 && stage1fired == false) {
    stage1fired = true
    killCounterElement.style.backgroundColor = "red"
    particlesEnabled = true
    stepSize = 2
    diagonalStepSize = Math.sqrt(Math.pow(stepSize, 2) / 2)
    document.getElementById("Stage1Music").play()
    currentStage = 0;
  }

  cursor.style.backgroundColor = stageColors[currentStage];
}

function checkStageCompletion() {
  var stages = [5, 10, 25, 50, 75, 100, 250];
  var nextStageIndex = stages.findIndex(function (stage) {
    return killCounter >= stage;
  });

  if (nextStageIndex !== -1 && nextStageIndex > currentStage) {
    currentStage = nextStageIndex;
    playStageMusic(currentStage);
  }
}

function createParticles(x, y) {
  for (var i = 0; i < particleCount; i++) {
    var particle = {
      x: x,
      y: y,
      size: particleSize,
      color: stageColors[currentStage],
      dx: (Math.random() - 0.5) * 10,
      dy: (Math.random() - 0.5) * 10,
      life: Math.random() * 60 + 30
    };
    particles.push(particle);
  }
}

function createtrailParticles(x, y) {
  for (var i = 0; i < particleCount; i++) {
    var particle = {
      x: x,
      y: y,
      size: particleSize,
      color: stageColors[currentStage],
      dx: (Math.random() - 0.5) * 5,
      dy: (Math.random() - 0.5) * 5,
      life: Math.random() * 60 + 30
    };
  }
}
function updateParticles() {
  particleContext.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

  for (var i = particles.length - 1; i >= 0; i--) {
    var particle = particles[i];

    particle.x += particle.dx;
    particle.y += particle.dy;
    particle.life--;

    particleContext.fillStyle = particle.color;
    particleContext.fillRect(particle.x, particle.y, particle.size, particle.size);

    if (particle.life <= 0) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(updateParticles);
}

function toggleParticles() {
  particlesEnabled = !particlesEnabled;
}



updateParticles();
