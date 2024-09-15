/*
COMP4537 Lab0
name: Oy Kwan Kevin Ng
bcit-id: A01341525

website: https://zealous-smoke-0d9c7f60f.5.azurestaticapps.net/COMP4537/labs/1/
*/
const TIME_PER_STORAGE = 2000;

class Reader {
    // a class of the writearea and remove button set. 
    constructor(id, text) {
        this.reader = `<div class="writer_box">
                            <textarea id=${id} class="writer_textarea" name="writer_input" required>${text}</textarea>
                        </div>`
    }

    createReader(){
        return this.reader;
    }

}

// main code
storage = new LocalStorage();

const reader_cluster = document.getElementById("reader_cluster");
const timer = document.getElementById('reader_time_txt');

//read the text from the storage and display for every TIME_PER_STORAGE seconds
const intervalId = setInterval(() => {
    reader_cluster.innerHTML = "";
    const textObj = storage.getAllValue();
    for (const key in textObj){
        reader_cluster.innerHTML += new Reader(key, textObj[key]).createReader();
    }
    timer.innerHTML = READER_UPDATED_TIME + " " + new Date().toLocaleTimeString();

}, TIME_PER_STORAGE);