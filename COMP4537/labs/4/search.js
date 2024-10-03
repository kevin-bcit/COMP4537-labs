class SearchDefinition {
  constructor() {
    this.form = document.getElementById("search-form");
    this.result = document.getElementById("result");
    this.wordInput = document.getElementById("word");

    this.form.addEventListener("submit", (event) => this.handleSubmit(event));
  }

  handleSubmit(event) {
    event.preventDefault();
    const word = this.wordInput.value.trim();

    if (word && isNaN(word)) {
      this.sendRequest(word);
    } else {
      this.result.textContent = "Invalid input!";
    }
  }

  sendRequest(word) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `http://localhost:3000/api/definitions?word=${word}`, true);

    xhr.onload = () => {
      const response = JSON.parse(xhr.responseText);
      this.result.textContent =
        xhr.status === 200
          ? response.definition
            ? `${response.word}: ${response.definition}`
            : response.message
          : "Error fetching the definition!";
    };

    xhr.onerror = () => {
      this.result.textContent = "Error fetching the definition!";
    };

    xhr.send();
  }
}

new SearchDefinition();