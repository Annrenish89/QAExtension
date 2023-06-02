function readScreenAndAnswer() {
  // Get all question elements.
  var questions = document.getElementsByClassName("question");

  // For each question, try to answer it automatically.
  for (var i = 0; i < questions.length; i++) {
    var questionText = questions[i].textContent.trim();

    // Send a request to the server-side script to generate an answer.
    fetch('https://your-heroku-app.herokuapp.com/generate-answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: questionText }),
    })
      .then(response => response.text())
      .then(answer => {
        // Write the answer in the associated text box.
        var associatedAnswerBox = document.getElementsByClassName("answer")[i];
        associatedAnswerBox.value = answer;
      })
      .catch(err => console.error(err));
  }
}

chrome.webNavigation.onCommitted.addListener(function(details) {
  // If the current page is a quiz, read the screen and try to answer the questions.
  if (details.url.match(/quiz\.html/)) {
    readScreenAndAnswer();
  }
});
