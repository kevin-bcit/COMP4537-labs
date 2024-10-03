class StoreDefinition {
  constructor() {
    this.form = document.getElementById("store-form");
    this.feedback = document.getElementById("feedback");
    this.wordInput = document.getElementById("word");
    this.definitionInput = document.getElementById("definition");

    this.form.addEventListener("submit", (event) => this.handleSubmit(event));
  }

  handleSubmit(event) {
    event.preventDefault();
    const word = this.wordInput.value.trim();
    const definition = this.definitionInput.value.trim();

    if (word && definition && isNaN(word)) {
      this.sendRequest(word, definition);
    } else {
      this.feedback.textContent = "Invalid input!";
    }
  }

  sendRequest(word, definition) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${SERVER}/api/definitions`, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    console.log(`sending {POST request to server: ${SERVER}/api/definitions`);

    xhr.onload = () => {
      this.feedback.textContent =
        xhr.status === 200
          ? JSON.parse(xhr.responseText).message
          : "Error submitting the entry!";
    };

    xhr.onerror = () => {
      this.feedback.textContent = "Error submitting the entry!";
    };

    xhr.send(JSON.stringify({ word, definition }));
  }
}

new StoreDefinition();