function displayStudentProgress() {
    // Send a GET request to get student progress data
    fetch(studentDataUrl)
        .then(response => response.json())
        .then(data => {
            let newCards = data.new_cards;
            let stillLearning = data.still_learning;
            let almostDone = data.almost_done;
            let mastered = data.mastered;
            let total = newCards + stillLearning + almostDone + mastered;
            total = Math.max(total, 1);

            // Calculate width
            let containerWidth = document.querySelector('.progress-container').offsetWidth;
            let fixedWidth = 120;
            let newCardsWidth = (newCards / total) * containerWidth * 0.7 + fixedWidth;
            let stillLearningWidth = (stillLearning / total) * containerWidth * 0.7 + fixedWidth;
            let almostDoneWidth = (almostDone / total) * containerWidth * 0.7 + fixedWidth;
            let masteredWidth = (mastered / total) * containerWidth * 0.7 + fixedWidth;

            // Apply width
            document.querySelector('#new-cards').style.width = `${newCardsWidth}px`;
            document.querySelector('#still-learning').style.width = `${stillLearningWidth}px`;
            document.querySelector('#almost-done').style.width = `${almostDoneWidth}px`;
            document.querySelector('#mastered').style.width = `${masteredWidth}px`;
        });
}

document.addEventListener('DOMContentLoaded', () => {
    // Set background color
    document.body.style.backgroundColor = "#f9f9f9";

    // Display student progress
    let studyingProgress = document.querySelector('#studying-progress');
    if (studyingProgress) {
        displayStudentProgress();
    }
});