let userAnswers1 = ["", "", "", "", "", "", ""]; // Array to store answers for 7 boxes (Top row)
let userAnswers2 = ["", "", "", "", "", "", "", "", ""]; // Array to store answers for 9 boxes (Bottom row)
let feedbacks1 = ["", "", "", "", "", "", ""]; // Feedback for top row
let feedbacks2 = ["", "", "", "", "", "", "", "", ""]; // Feedback for bottom row

let questions1 = [
  ["0", "1", "1", "0"], // Top row questions
  ["0", "0", "0", "1"],
  ["0", "0", "0", "1"],
  ["1", "0", "1", "0"],
  ["0", "0", "0", "1"],
  ["1", "1", "1", "0"],
  ["1", "0", "0", "1"],
];

let questions2 = [
  ["1", "0", "0", "0"], // Bottom row questions
  ["0", "0", "0", "0"],
  ["1", "1", "1", "0"],
  ["1", "0", "1", "0"],
  ["1", "1", "0", "0"],
  ["0", "1", "1", "0"],
  ["0", "0", "0", "0"],
  ["1", "1", "0", "0"],
  ["1", "1", "1", "0"]
];

let currentBox = 0; // To track the currently selected box
let startTime; // Variable to track the starting time

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(24);

  startTime = millis(); // Initialize the starting time
  loop(); // Ensure the draw function loops continuously

  // Create link reference
  let link = createA('https://coordinates-converter.com/', 'Visit Coordinates Converter');
  link.position(width / 2 - 100, height - 150); // Position at the bottom center
  link.style('font-size', '18px');
  link.style('color', '#007BFF'); // Link color
  link.attribute('target', '_blank'); // Open in a new tab
}

function draw() {
  background(240);

  // Display the top row of input boxes
  for (let i = 0; i < 7; i++) {
    fill(255);
    rect(width / 2 - 375 + i * 120, height / 2 - 130, 100, 30); // Top row boxes
    fill(0);
    textSize(20);
    text(userAnswers1[i], width / 2 - 325 + i * 120, height / 2 - 110);
    text(feedbacks1[i], width / 2 - 325 + i * 120, height / 2 - 50);
    text(questions1[i].join(" "), width / 2 - 320 + i * 120, height / 2 - 80);

    if (i === 0) {
      textSize(32);
      text(",", width / 2 - 265 + i * 120, height / 2 - 110); // Comma for top row
    }
  }

  // Add minus symbol before the first box (top row)
  textSize(32);
  text("-", width / 2 - 385, height / 2 - 115);
  textSize(20);

  // Display the bottom row of input boxes
  for (let i = 0; i < 9; i++) {
    fill(255);
    rect(width / 2 - 445 + i * 110, height / 2 + 20, 90, 30); // Bottom row boxes
    fill(0);
    textSize(20);
    text(userAnswers2[i], width / 2 - 400 + i * 110, height / 2 + 38);
    text(feedbacks2[i], width / 2 - 400 + i * 110, height / 2 + 100);
    text(questions2[i].join(" "), width / 2 - 400 + i * 110, height / 2 + 70);

    if (i === 2) {
      textSize(32);
      text(",", width / 2 - 345 + i * 110, height / 2 + 40); // Comma for bottom row
      textSize(20);
    }
  }
}

function keyPressed() {
  if (keyCode === BACKSPACE) {
    if (currentBox < 7) {
      userAnswers1[currentBox] = userAnswers1[currentBox].slice(0, -1); // Top row
    } else {
      userAnswers2[currentBox - 7] = userAnswers2[currentBox - 7].slice(0, -1); // Bottom row
    }
  } else if (keyCode === ENTER) {
    if (currentBox < 7) {
      if (checkAnswer1(currentBox)) {
        feedbacks1[currentBox] = "Correct!";
        currentBox++;
      } else {
        feedbacks1[currentBox] = "Incorrect!";
      }
    } else {
      let boxIndex = currentBox - 7;
      if (checkAnswer2(boxIndex)) {
        feedbacks2[boxIndex] = "Correct!";
        currentBox++;
      } else {
        feedbacks2[boxIndex] = "Incorrect!";
      }
    }
  } else if (key.length === 1) {
    if (currentBox < 7) {
      userAnswers1[currentBox] += key; // Top row input
    } else {
      userAnswers2[currentBox - 7] += key; // Bottom row input
    }
  }
  redraw();
}

function checkAnswer1(boxIndex) {
  let correctAnswers1 = ["6", "8", "8", "5", "8", "7", "9"]; // Correct answers for top row
  return userAnswers1[boxIndex] === correctAnswers1[boxIndex];
}

function checkAnswer2(boxIndex) {
  let correctAnswers2 = ["1", "0", "7", "5", "3", "6", "0", "3", "7"]; // Correct answers for bottom row
  return userAnswers2[boxIndex] === correctAnswers2[boxIndex];
}
