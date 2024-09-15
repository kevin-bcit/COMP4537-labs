/*
COMP4537 Lab0
name: Oy Kwan Kevin Ng
bcit-id: A01341525

website: https://zealous-smoke-0d9c7f60f.5.azurestaticapps.net/COMP4537/labs/1/
*/
const TIME_PER_STORAGE = 2000;

class Writer {
    // a class of the writearea and remove button set. 
    constructor(id="") {
        if(id === ""){
            this.id = (Math.random() + 1).toString(36).substring(2)
        }else{
            this.id = id;
        }
        
        this.writer = `<div class="writer_box">
                            <textarea id=${this.id} class="writer_textarea" name="writer_input" required></textarea>
                            <button class="writer_rmv_btn" onclick="removeWriter('${this.id}')" >${WRITER_RMV_MSG}</button>
                        </div>`
    }

    createWriter(text=""){
        return this.writer.replace("required>", `required>${text}`);
    }

}

class TextObject {
    // a class of the text object
    constructor() {
        this.textObject = {};
    }

    get(id){
        return this.textObject[id];
    }

    getAllValue(){
        return this.textObject;
    }

    add(id, text){
        this.textObject[id] = text;
        
    }

    remove(id){
        delete this.textObject[id];
    }

}


// main code
storage = new LocalStorage();
textObj = new TextObject();

const writer_cluster = document.getElementById("writer_cluster");
const writerAddBtn = document.getElementById('writer_add_btn');
const timer = document.getElementById('writer_time_txt');

//adding the Writer when load
if (Object.entries(storage.getAllValue()).length === 0) {
    const writer_box = new Writer()
    writer_cluster.innerHTML += writer_box.createWriter();
}else{
    tempObj = storage.getAllValue();
    for(const key in tempObj){
        textObj.add(key, tempObj[key]);
        const writer_box = new Writer(key)
        writer_cluster.innerHTML += writer_box.createWriter(tempObj[key]);
    }

}

// Add button action
writerAddBtn.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById("writer_cluster").innerHTML = "";
    for(const key in textObj.getAllValue()){
        const writer_box = new Writer(key)
        writer_cluster.innerHTML += writer_box.createWriter(textObj.get(key));
    }
    const writer_box = new Writer()
    document.getElementById("writer_cluster").innerHTML += writer_box.createWriter();
    
});

// store the text in text area into tempArr
const intervalId = setInterval(() => {

    const writerAreas = document.getElementsByClassName('writer_textarea');
    for (let i = 0; i < writerAreas.length; i++) {
        textObj.add(writerAreas[i].id, writerAreas[i].value);
        storage.add(writerAreas[i].id ,textObj.get(writerAreas[i].id));
    }
    timer.innerHTML = WRITER_STORED_TIME + " " + new Date().toLocaleTimeString();

}, TIME_PER_STORAGE);

// remove text area function
const removeWriter = (id) => {
    storage.remove(id);
    textObj.remove(id);
    document.getElementById(id).parentNode.remove();
}
