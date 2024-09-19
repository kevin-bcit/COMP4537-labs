/*
COMP4537 Lab0
name: Oy Kwan Kevin Ng
bcit-id: A01341525
*/
const TITLE_MSG = "Lab0 | Kevin Ng - Sample memory game"
const WELCOME_EXPLAIN_MSG = "How many buttons to create (between 3 to 7)?"
const SUBMIT_BUTTON_MSG = "GO!"
const GAME_START = "Game Start!"
const PLAUER_WIN = "Excellent memory! Increase your difficulty!"
const PLAYER_LOSE = "Wrong order!Try again!"

const title_msg = document.getElementById('title_txt');
const header_msg = document.getElementById('header_txt');
const welcome_msg = document.getElementById('welcome_txt');
const submit_msg = document.getElementById('submit_btn');

//load the required language at start
header_msg.innerText = TITLE_MSG;
welcome_msg.innerHTML = WELCOME_EXPLAIN_MSG;
submit_msg.innerHTML = SUBMIT_BUTTON_MSG;
