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
    document.querySelector('.multiple-choice-question').innerText = question.flashcard.flashcard__front;
    document.querySelector('img').src = question.flashcard.flashcard__image;
    for (let i = 0; i < 4; i++) {
        document.querySelector("#answer" + (i + 1)).innerText = question.answers[i];
    }

    // Reset all answer buttons and label text
    document.querySelectorAll('.answer').forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = '';
        button.style.color = '';
        button.style.border = '';
    });
    document.querySelector('.multiple-choice-label').innerText = 'Select the matching term';
    document.querySelector('.multiple-choice-label').style.color = '';

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
                button.style.backgroundColor = '#eef8f6';
                button.style.color = '#59d4c5';
                button.style.border = '2px solid #59d4c5';

                questions = questions.filter(q => q.flashcard.flashcard__id !== question.flashcard.flashcard__id);
                let progressBar = document.querySelector('.progress-bar');
                progressBar.value += 1;

                let multipleChoiceLabel = document.querySelector('.multiple-choice-label');
                multipleChoiceLabel.innerText = "Nice work! That's some impressive stuff! 🎉";
                multipleChoiceLabel.style.color = '#59d4c5';

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
                button.style.backgroundColor = '#f8efef';
                button.style.color = '#fb9e9e';
                button.style.border = '2px solid #fb9e9e';

                let correctAnswerIndex = question.answers.indexOf(question.flashcard.flashcard__back);
                let correctAnswerButton = document.querySelector("#answer" + (correctAnswerIndex + 1));
                correctAnswerButton.style.backgroundColor = '#eef8f6';
                correctAnswerButton.style.color = '#59d4c5';
                correctAnswerButton.style.border = '2px solid #59d4c5';

                let multipleChoiceLabel = document.querySelector('.multiple-choice-label');
                multipleChoiceLabel.innerText = "No worries, you're still learning.";
                multipleChoiceLabel.style.color = '#fb9e9e';
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
    let score = (stillLearning.length / allFlashcards.length) * 25 + (almostDone.length / allFlashcards.length) * 75 + (mastered.length / allFlashcards.length) * 100;
    let scoreClass = score ? (score < 25 ? 'score-low' : (score < 75 ? 'score-medium' : (score < 100 ? 'score-high' : 'score-perfect'))) : 'score-low';
    let progressHTML = `
        <ul class="progress-container">
            <li>
                <div id="studying-progress">You're doing great, keep going!</div>
                <div id="studying-progress-score" class="${scoreClass}">${Math.floor(score)}%</div>
            </li>
            <li id="new-cards" class="score-low">
                <div>New Cards</div>
                <div>${newCards.length}</div>
            </li>
            <li id="still-learning" class="score-medium">
                <div>Still Learning</div>
                <div>${stillLearning.length}</div>
            </li>
            <li id="almost-done" class="score-high">
                <div>Almost Done</div>
                <div>${almostDone.length}</div>
            </li>
            <li id="mastered" class="score-perfect">
                <div>Mastered</div>
                <div>${mastered.length}</div>
            </li>
        </ul>
        <a href="${multipleChoiceUrl}" class="continue-button">Continue</a>
        <a href="${indexUrl}" class="continue-button">Home</a>
    `;
    progressHTML += 
    successMain.innerHTML = progressHTML;
    document.body.appendChild(successMain);

    // Calculate width
    let containerWidth = document.querySelector('.progress-container').offsetWidth;
    let fixedWidth = 120;
    let newCardsWidth = newCards.length / allFlashcards.length * containerWidth * 0.7 + fixedWidth;
    let stillLearningWidth = stillLearning.length / allFlashcards.length * containerWidth * 0.7 + fixedWidth;
    let almostDoneWidth = almostDone.length / allFlashcards.length * containerWidth * 0.7 + fixedWidth;
    let masteredWidth = mastered.length / allFlashcards.length * containerWidth * 0.7 + fixedWidth;
    
    // Apply width
    document.querySelector('#new-cards').style.width = `${newCardsWidth}px`;
    document.querySelector('#still-learning').style.width = `${stillLearningWidth}px`;
    document.querySelector('#almost-done').style.width = `${almostDoneWidth}px`;
    document.querySelector('#mastered').style.width = `${masteredWidth}px`;
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
