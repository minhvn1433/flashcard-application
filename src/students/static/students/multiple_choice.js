let newCards = [];
let stillLearning = [];
let almostDone = [];
let mastered = [];

let questions = [];
let previousQuestion = null;

function createQuestions() {
    let categories = [newCards, stillLearning, almostDone, mastered];
    let allFlashcards = [...newCards, ...stillLearning, ...almostDone, ...mastered];

    // Select 7 flashcards. Priority: New Cards > Still Learning > Almost Done > Mastered
    let numQuestions = 7;
    let selectedFlashcards = [];
    for (let category of categories) {
        if (selectedFlashcards.length >= numQuestions) break;
        if (category.length <= numQuestions - selectedFlashcards.length) {
            selectedFlashcards.push(...category);
            category.length = 0;
        } else {
            while (selectedFlashcards.length < numQuestions) {
                let randomIndex = Math.floor(Math.random() * category.length);
                selectedFlashcards.push(category[randomIndex]);
                category.splice(randomIndex, 1);
            }
        }
    }

    // Create questions from selected flashcards
    selectedFlashcards.forEach(flashcard => {
        let correctAnswer = flashcard.flashcard__back;
        let otherFlashcards = allFlashcards.filter(f => f.flashcard__back !== correctAnswer);
        let incorrectAnswers = otherFlashcards.map(f => f.flashcard__back).sort(() => Math.random() - 0.5).slice(0, 3);
        questions.push({
            flashcard: flashcard,
            answers: [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5),
            numAttempts: 0
        });
    });
}

function displayQuestion() {
    // Show success if all questions are answered
    if (questions.length === 0) {
        displaySuccess();
        return;
    }

    // Select a random question different from previous question. Increase number of attempts for the selected question
    let question;
    do {
        let randomIndex = Math.floor(Math.random() * questions.length);
        question = questions[randomIndex];
    } while (question === previousQuestion && questions.length > 1);
    question.numAttempts++;

    // Display the question
    document.querySelector('#question').innerText = question.flashcard.flashcard__front;
    document.querySelector('img').src = question.flashcard.flashcard__image;
    for (let i = 0; i < 4; i++) {
        document.querySelector("#answer" + (i + 1)).innerText = question.answers[i];
    }

    // Reset all answer buttons
    document.querySelectorAll('.answer').forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = '';
    });

    // Add event listener to each answer button
    document.querySelectorAll('.answer').forEach((button, i) => {
        button.onclick = () => {
            // Disable all answer buttons
            document.querySelectorAll('.answer').forEach(button => {
                button.disabled = true;
            });

            let answer = question.answers[i];
            if (answer === question.flashcard.flashcard__back) {
                // If answer is correct, change color to green, increase progress bar
                button.style.backgroundColor = 'green';
                questions = questions.filter(q => q.flashcard.flashcard__id !== question.flashcard.flashcard__id);
                let progressBar = document.querySelector('#progressBar');
                progressBar.value += 1;

                // Algorithm to update flashcard state, similar to Leitner system
                switch (question.flashcard.state) {
                    case 'New Cards':
                        if (question.numAttempts === 1 || question.numAttempts === 2) {
                            question.flashcard.state = 'Almost Done';
                            almostDone.push(question.flashcard);
                        } else {
                            question.flashcard.state = 'Still Learning';
                            stillLearning.push(question.flashcard);
                        }
                        break;
                    case 'Still Learning':
                        if (question.numAttempts === 1 || question.numAttempts === 2) {
                            question.flashcard.state = 'Almost Done';
                            almostDone.push(question.flashcard);
                        } else {
                            question.flashcard.state = 'Still Learning';
                            stillLearning.push(question.flashcard);
                        }
                        break;
                    case 'Almost Done':
                        if (question.numAttempts === 1 || question.numAttempts === 2) {
                            question.flashcard.state = 'Mastered';
                            mastered.push(question.flashcard);
                        } else if (question.numAttempts === 3) {
                            question.flashcard.state = 'Almost Done';
                            almostDone.push(question.flashcard);
                        } else {
                            question.flashcard.state = 'Still Learning';
                            stillLearning.push(question.flashcard);
                        }
                        break;
                    case 'Mastered':
                        if (question.numAttempts === 1 || question.numAttempts === 2) {
                            question.flashcard.state = 'Mastered';
                            mastered.push(question.flashcard);
                        } else if (question.numAttempts === 3) {
                            question.flashcard.state = 'Almost Done';
                            almostDone.push(question.flashcard);
                        } else {
                            question.flashcard.state = 'Still Learning';
                            stillLearning.push(question.flashcard);
                        }
                        break;
                }
            } else {
                // If answer is incorrect, change color to red
                button.style.backgroundColor = 'red';
                let correctAnswerIndex = question.answers.indexOf(question.flashcard.flashcard__back);
                document.querySelector("#answer" + (correctAnswerIndex + 1)).style.backgroundColor = 'green';
            }
            
            // Show next question
            previousQuestion = question;
            setTimeout(displayQuestion, 2000);
        };
    });
}

function displaySuccess() {
    // Send POST request to update student results
    let allFlashcards = [...newCards, ...stillLearning, ...almostDone, ...mastered];
    fetch(updateResultsUrl, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'flashcards': allFlashcards,
            })
        })

    // Hide the main element
    let main = document.querySelector('main');
    main.style.display = 'none';

    // Create a new main element for the success screen
    let successMain = document.createElement('main');

    let congratsMessage = document.createElement('div');
    congratsMessage.innerText = "Success! You've answered all questions.";
    successMain.appendChild(congratsMessage);

    let score = (stillLearning.length / allFlashcards.length) * 25 + (almostDone.length / allFlashcards.length) * 75 + (mastered.length / allFlashcards.length) * 100;

    let studyingProgressDiv = document.createElement('div');
    studyingProgressDiv.innerText = `Studying Progress ${Math.floor(score)}%`;
    successMain.appendChild(studyingProgressDiv);

    let newCardsDiv = document.createElement('div');
    newCardsDiv.innerText = `New Cards: ${newCards.length}`;
    successMain.appendChild(newCardsDiv);

    let stillLearningDiv = document.createElement('div');
    stillLearningDiv.innerText = `Still Learning: ${stillLearning.length}`;
    successMain.appendChild(stillLearningDiv);

    let almostDoneDiv = document.createElement('div');
    almostDoneDiv.innerText = `Almost Done: ${almostDone.length}`;
    successMain.appendChild(almostDoneDiv);

    let masteredDiv = document.createElement('div');
    masteredDiv.innerText = `Mastered: ${mastered.length}`;
    successMain.appendChild(masteredDiv);

    let homeButton = document.createElement('a');
    homeButton.href = indexUrl;
    homeButton.innerText = "Home";
    successMain.appendChild(homeButton);

    document.body.appendChild(successMain);
    return;
}

document.addEventListener('DOMContentLoaded', () => {
    // Send GET request to get student flashcards
    fetch(getFlashcardsUrl)
        .then(response => response.json())
        .then(data => {
            data.flashcards.forEach(flashcard => {
                switch (flashcard.state) {
                    case 'New Cards':
                        newCards.push(flashcard);
                        break;
                    case 'Still Learning':
                        stillLearning.push(flashcard);
                        break;
                    case 'Almost Done':
                        almostDone.push(flashcard);
                        break;
                    case 'Mastered':
                        mastered.push(flashcard);
                        break;
                }
            });

            createQuestions();
            displayQuestion();
        });
});
