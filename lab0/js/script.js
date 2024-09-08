/*
COMP4537 Lab0
name: Oy Kwan Kevin Ng
bcit-id: A01341525

url: https://ongweb.z9.web.core.windows.net/
*/

const COLOR = ['red', 'lightgreen', 'yellow', 'orange', 'magenta', 'pink', 'brown', 'beige', 'salmon', 'greenyellow', 'turquoise', 'orchid', 'cyan', 'peru', 'deeppink']; // a selection of lighter colors for readibility
const BUTTON_HEIGHT = '5'; // the height of the button in em
const BUTTON_WEIGHT = '10'; // the width of the button in em
const INITIAL_TOP = '25'; // the initial top position of the button in em
const INITIAL_LEFT_SPACING = '3'; // the initial left spacing of the button in em
const TOP_SPACING = '10'; // the space between the buttons in em
const MEASUREMENT = 'em'; // the unit
const CANVAS_HEIGHT_ADJUSTMENT = 100;   // the adjustment of height is to prevent the button from going off the screen during movement
const CANVAS_WIDTH_ADJUSTMENT = 10;    // the adjustment of width is to prevent the button from going off the screen during movement
const TIME_BETWEEN_SHUFFLE = 2000;  // the time between each shuffle in ms
const showMessage = document.getElementById('message');
let inputSequence  // the sequence of the button that the user click to determine the user progress

class Button {
    // This is the creation of clickable box after the user click submit. 
    constructor(color, width, height, top, left, order){
        this.order = order;
        this.btn = document.createElement('button');
        this.btn.style.backgroundColor = color;
        this.btn.style.width = width;
        this.btn.style.height = height;
        this.btn.style.top = top;
        this.btn.style.left = left;
        this.btn.style.position = 'absolute';
        this.btn.classList.add('boxTransition')

    }

    setLocation(top, left){
        this.btn.style.top = top;
        this.btn.style.left = left;
    }

    draw(elementId){
        elementId.appendChild(this.btn);
    }

    showText(){
        this.btn.innerText = this.order;
    }

    hideText(){
        this.btn.innerText = '';
    }

    clickable(arrLength, callback){
        this.btn.addEventListener('click', () => {
            if (this.order === inputSequence + 1){
                inputSequence++;
                this.showText();
                if (inputSequence == arrLength){
                    // user win
                    callback(true);
                }
            } else {
                // user lose
                callback(false);
            }
            
        });
    }
}

class Scramble {
    // This is a class to handle the suffle of the buttons
    constructor(arrayBtn, canvas){
        this.buttons = arrayBtn;
        this.canvas = canvas;
    }

    run(){
        let pxValueFromEm = parseFloat(getComputedStyle(document.getElementsByTagName('div')[0]).fontSize)  //convert em to pixel to prevent decimal values
        let minTop = INITIAL_TOP*pxValueFromEm - BUTTON_HEIGHT*pxValueFromEm;
        
        this.buttons.forEach(button => {
            let top = Math.floor(Math.random() * ((window.innerHeight - CANVAS_HEIGHT_ADJUSTMENT) - minTop) + minTop);
            let left = Math.floor(Math.random() * ((window.innerWidth - CANVAS_WIDTH_ADJUSTMENT) - BUTTON_WEIGHT*pxValueFromEm));
            button.setLocation(top, left);
        });
            
    }
}


class Game {
    // this is the start of the game. Call after the user click submit.
    constructor(numBtn){
        this.arrayBtn = [];
        const colors = new Set();
        if (numBtn === ""){
            numBtn = 3;
        }
        while (colors.size < numBtn){
        // randomly pick a color from the color array without dupilcation
            let colorIndex = Math.floor(Math.random() * COLOR.length);
            if (!colors.has(COLOR[colorIndex])){
                colors.add(COLOR[colorIndex]);
            }
            
        }

        let orderIdx = 1;

        let curLeftPosition = 0;
        let curTopPosition = parseInt(INITIAL_TOP);
        
        // calculate the current window width from em to px. Align the boxes in case the user change the window size
        const curWindowWidth = window.innerWidth / parseFloat(getComputedStyle(document.getElementsByTagName('div')[0]).fontSize);
        colors.forEach((color) => {
            let curTop = parseInt(curTopPosition)
            let curLeft = parseInt(INITIAL_LEFT_SPACING)*(curLeftPosition + 1) + parseInt(BUTTON_WEIGHT)*curLeftPosition
            
            if (curLeft > curWindowWidth - parseInt(BUTTON_WEIGHT)){
                // move to next line if the button is off the screen, update and store the new top & left position
                curLeftPosition = 0;
                curTopPosition += parseInt(TOP_SPACING);

                //update the current button position
                curTop = parseInt(curTopPosition)
                curLeft = parseInt(INITIAL_LEFT_SPACING)*(curLeftPosition + 1) + parseInt(BUTTON_WEIGHT)*curLeftPosition
            }
            curLeftPosition++;

            //add a button to the array
            this.arrayBtn.push(new Button(
                color, 
                `${BUTTON_WEIGHT}${MEASUREMENT}`, 
                `${BUTTON_HEIGHT}${MEASUREMENT}`, 
                `${curTop}${MEASUREMENT}`, 
                `${curLeft}${MEASUREMENT}`, 
                orderIdx++));
            
        })

    }

    start(){
        // trigger after user click the submit button and start the shuffle and game play
        showMessage.innerText = GAME_START;
        const canvas = document.getElementById("canvas");
        canvas.textContent = '';    // Remove any previous buttons if any
        inputSequence = 0;  // initialize the input sequence
        this.arrayBtn.forEach(button => {
            button.draw(canvas);
            button.showText();
        });

        // scramble the buttons
        let scramble = new Scramble(this.arrayBtn, canvas);
        
        let round = this.arrayBtn.length;
        let delay = round*1000

        // Custom countdown message
        let countDown = round;
        showMessage.innerText = `${GAME_START} ${countDown--}`;
        const clearCountDown = setInterval(() => {
            showMessage.innerText = `${GAME_START} ${countDown--}`;
            if (countDown < 0){
                showMessage.innerText = GAME_START
                clearInterval(clearCountDown);
            }
        }, 1000)


        const intervalID = setInterval(() => {

            if (round !== this.arrayBtn.length){
                // default delay time between shuffle
                delay = TIME_BETWEEN_SHUFFLE;
            }
            
            scramble.run();

            
            if(--round <= 0){
                // scramble stop and start the memory game
                clearInterval(intervalID);
                this.arrayBtn.forEach(button => {
                    button.hideText();
                    button.clickable(this.arrayBtn.length, result=>{
                        if (result === false){
                            // user lose
                            showMessage.innerText = PLAYER_LOSE;
                        } else {
                            // user win
                            showMessage.innerText = PLAUER_WIN;
                        }
                        this.end()
                    });
                }); 
            }
        }, delay);
        
        
    }
    end(){
        // game is over. Show the order and resume the submit button for next game
        this.arrayBtn.forEach(button => {
            button.showText();
        })
        document.getElementById('submit_btn').style.visibility = 'visible';
    }


}


// load game after the user click submit
const submit = document.getElementById('submit_btn');
submit.addEventListener('click', (e) => {
    e.preventDefault();
    submit.style.visibility = 'hidden';
    const numBtn = document.getElementById('num_ipt').value;
    let game = new Game(numBtn);
    game.start();
});