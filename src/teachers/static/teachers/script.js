function updateAssignment(checkbox) {
    let flashcardId = checkbox.dataset.flashcardId;
    let action = checkbox.checked ? 'add' : 'remove';

    // Send POST request to update assignment flashcards
    fetch(assignmentFlashcardsUrl, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'flashcard_id': flashcardId,
                'action': action
            })
        })
        .then(response => response.json())
        .then(data => {
            // Get the container for assignment flashcards
            let assignmentFlashcards = document.querySelector('#assignment-flashcards');
            if (assignmentFlashcards) {
                // Remove all flashcards from assignment
                assignmentFlashcards.innerHTML = '';

                // Add each flashcard from the response data to assignment
                data.flashcards.forEach(flashcard => {
                    let row = assignmentFlashcards.insertRow();
                    let imageCell = row.insertCell();
                    imageCell.className = 'image';
                    let frontCell = row.insertCell();
                    frontCell.className = 'front';
                    let backCell = row.insertCell();
                    backCell.className = 'back';
                    let checkboxCell = row.insertCell();
                    checkboxCell.className = 'checkbox';

                    if (flashcard.image_url) {
                        imageCell.innerHTML = `<img src="${flashcard.image_url}" alt="Flashcard Image">`;
                    }
                    frontCell.textContent = flashcard.front;
                    backCell.textContent = flashcard.back;
                    checkboxCell.innerHTML = `<input type="checkbox" class="flashcard-checkbox" data-flashcard-id="${flashcard.id}" checked>`;
                });
            }

            // Add event listeners to checkboxes
            handleCheckboxes();
        });
}

function updateStudents(checkbox) {
    let studentId = checkbox.dataset.studentId;
    let action = checkbox.checked ? 'add' : 'remove';

    // Send POST request to update class students
    fetch(studentsStudentUrl, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'student_id': studentId,
                'action': action
            })
        })
        .then(response => response.json())
        .then(data => {
            // Get the container for class students
            let studentsStudent = document.querySelector('#students-student');
            if (studentsStudent) {
                // Remove all students from class
                studentsStudent.innerHTML = '';

                // Add each student from the response data to class
                data.students.forEach(student => {
                    let row = studentsStudent.insertRow();
                    let nameCell = row.insertCell();
                    nameCell.className = 'name';
                    let scoreCell = row.insertCell();
                    scoreCell.className = 'score';
                    let viewProgressCell = row.insertCell();
                    viewProgressCell.className = 'view-progress';
                    let checkboxCell = row.insertCell();
                    checkboxCell.className = 'checkbox';

                    nameCell.textContent = student.user__username;
                    scoreCell.innerHTML = `
                        <div class="
                            ${student.score !== undefined ? (
                                student.score < 25 ? 'score-low' :
                                student.score < 75 ? 'score-medium' :
                                student.score < 100 ? 'score-high' :
                                'score-perfect'
                            ) : 'score-low'}">
                            ${student.score !== undefined ? student.score + '%' : '0%'}
                        </div>`;
                    viewProgressCell.innerHTML = `<a href="${student.url}">View Progress</a>`;
                    checkboxCell.innerHTML = `<input type="checkbox" class="student-checkbox" data-student-id="${student.user__id}" checked>`;
                });
            }

            // Add event listeners to checkboxes
            handleCheckboxes();
        });
}

function updateDeck(checkbox) {
    let flashcardId = checkbox.dataset.flashcardId;
    let action = checkbox.checked ? 'add' : 'remove';
    let deckFlashcardsList = [];
    let assignmentFlashcardIds = [];

    // Send POST request to update deck flashcards and a GET request to get assignment flashcards
    Promise.all([
        fetch(deckFlashcardsUrl, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'flashcard_id': flashcardId,
                'action': action
            })
        })
        .then(response => response.json())
        .then(data => {
            deckFlashcardsList = data.flashcards;
        }),

        fetch(`${assignmentFlashcardsUrl}`)
        .then(response => response.json())
        .then(data => {
            assignmentFlashcardIds = data.flashcards.map(flashcard => flashcard.id);
        }),
    ]).then(() => {
        // Get the container for deck flashcards
        let deckFlashcards = document.querySelector('#deck-flashcards');
        if (deckFlashcards) {
            // Remove all flashcards from deck
            deckFlashcards.innerHTML = '';

            // Add each flashcard from the response data to deck
            deckFlashcardsList.forEach(flashcard => {
                let row = deckFlashcards.insertRow();
                let imageCell = row.insertCell();
                imageCell.className = 'image';
                let frontCell = row.insertCell();
                frontCell.className = 'front';
                let backCell = row.insertCell();
                backCell.className = 'back';
                let checkboxCell = row.insertCell();
                checkboxCell.className = 'checkbox';
                let buttonCell = row.insertCell();
                buttonCell.className = 'button';

                if (flashcard.image_url) {
                    imageCell.innerHTML = `<img src="${flashcard.image_url}" alt="Flashcard Image">`;
                }
                frontCell.textContent = flashcard.front;
                backCell.textContent = flashcard.back;
                let isChecked = assignmentFlashcardIds.includes(flashcard.id) ? 'checked' : '';
                checkboxCell.innerHTML = `<input type="checkbox" class="flashcard-checkbox" data-flashcard-id="${flashcard.id}" ${isChecked}>`;
                buttonCell.innerHTML = `<button class="remove-button" data-flashcard-id="${flashcard.id}"><img src="${closeOutlineSvg}" alt="Close Outline"></button>`
            });
        }

        // Add event listeners to checkboxes
        handleCheckboxes();

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-button').forEach(button => {
            button.onclick = () => {
                let flashcardId = button.dataset.flashcardId;

                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.dataset.flashcardId = flashcardId;
                checkbox.checked = false;

                updateDeck(checkbox);
            }
        });
    });
}

function assignmentSearch(event) {
    // Send a GET request with the search query
    fetch(`${searchFlashcardsUrl}?query=${event.target.value}`)
        .then(response => response.json())
        .then(data => {
            // Get the container for search results
            let searchResults = document.querySelector('#search-results');

            // Remove all existing search results
            searchResults.innerHTML = '';

            // Add each flashcard from the response data to search results
            data.flashcards.forEach(flashcard => {
                let row = searchResults.insertRow();
                let imageCell = row.insertCell();
                imageCell.className = 'image';
                let frontCell = row.insertCell();
                frontCell.className = 'front';
                let backCell = row.insertCell();
                backCell.className = 'back';
                let buttonCell = row.insertCell();
                buttonCell.className = 'button';

                if (flashcard.image_url) {
                    imageCell.innerHTML = `<img src="${flashcard.image_url}" alt="Flashcard Image">`;
                }
                frontCell.textContent = flashcard.front;
                backCell.textContent = flashcard.back;
                buttonCell.innerHTML = `<button class="add-button" data-flashcard-id="${flashcard.id}">Add</button>`;
            });

            // Add event listeners to add buttons
            document.querySelectorAll('.add-button').forEach(button => {
                button.onclick = () => {
                    let flashcardId = button.dataset.flashcardId;

                    let checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.dataset.flashcardId = flashcardId;
                    checkbox.checked = true;

                    updateAssignment(checkbox);
                }
            });
        });
}

function globalSearch(event) {
    let searchResults = {
        flashcards: [],
        students: [],
        decks: []
    };
    let assignmentFlashcardIds = [];
    let studentsStudentIds = [];

    // Fetch search results for flashcards, students, decks. Also fetch assignment flashcards and class students
    Promise.all([
        fetch(`${searchFlashcardsUrl}?query=${event.target.value}`)
        .then(response => response.json())
        .then(data => {
            searchResults.flashcards = data.flashcards;
        }),

        fetch(`${searchStudentsUrl}?query=${event.target.value}`)
        .then(response => response.json())
        .then(data => {
            searchResults.students = data.students;
        }),

        fetch(`${searchDecksUrl}?query=${event.target.value}`)
        .then(response => response.json())
        .then(data => {
            searchResults.decks = data.decks;
        }),

        fetch(`${assignmentFlashcardsUrl}`)
        .then(response => response.json())
        .then(data => {
            assignmentFlashcardIds = data.flashcards.map(flashcard => flashcard.id);
        }),

        fetch(`${studentsStudentUrl}`)
        .then(response => response.json())
        .then(data => {
            studentsStudentIds = data.students.map(student => student.user__id);
        })
    ]).then(() => {
        // Update search results with the fetched data
        document.querySelectorAll('.results').forEach(result => {
            // Remove all existing search results
            result.innerHTML = '';


            // Add each item from the search results to the container
            let currentCategory = result.dataset.category;
            searchResults[currentCategory].forEach(item => {
                let row = result.insertRow();
                row.classList.add('search-item');
                let isChecked;

                switch (currentCategory) {
                    case 'flashcards':
                        isChecked = assignmentFlashcardIds.includes(item.id) ? 'checked' : '';
                        let imageCell = row.insertCell();
                        imageCell.className = 'image';
                        let frontCell = row.insertCell();
                        frontCell.className = 'front';
                        let backCell = row.insertCell();
                        backCell.className = 'back';
                        let checkboxCell = row.insertCell();
                        checkboxCell.className = 'checkbox';

                        if (item.image_url) {
                            imageCell.innerHTML = `<img src="${item.image_url}" alt="Flashcard Image">`;
                        }
                        frontCell.textContent = item.front;
                        backCell.textContent = item.back;
                        checkboxCell.innerHTML = `<input type="checkbox" class="flashcard-checkbox" data-flashcard-id="${item.id}" ${isChecked}>`;
                        break;
                    case 'students':
                        isChecked = studentsStudentIds.includes(item.user__id) ? 'checked' : '';
                        let nameCell = row.insertCell();
                        nameCell.className = 'name';
                        let scoreCell = row.insertCell();
                        scoreCell.className = 'score';
                        let viewProgressCell = row.insertCell();
                        viewProgressCell.className = 'view-progress';
                        let checkboxCellStudents = row.insertCell();
                        checkboxCellStudents.className = 'checkbox';

                        nameCell.textContent = item.user__username;
                        scoreCell.innerHTML = `
                            <div class="
                                ${item.score !== undefined ? (
                                    item.score < 25 ? 'score-low' :
                                    item.score < 75 ? 'score-medium' :
                                    item.score < 100 ? 'score-high' :
                                    'score-perfect'
                                ) : 'score-low'}">
                                ${item.score !== undefined ? item.score + '%' : '0%'}
                            </div>`;
                        viewProgressCell.innerHTML = `<a href="${item.url}">View Progress</a>`;
                        checkboxCellStudents.innerHTML = `<input type="checkbox" class="student-checkbox" data-student-id="${item.user__id}" ${isChecked}>`;
                        break;
                    case 'decks':
                        let deckNameCell = row.insertCell();
                        deckNameCell.className = 'deck-name';
                        let deckUserCell = row.insertCell();
                        deckUserCell.className = 'deck-user';
                        let viewDeckCell = row.insertCell();
                        viewDeckCell.className = 'view-deck';

                        deckNameCell.textContent = item.name;
                        deckUserCell.textContent = item.teacher__user__username;
                        viewDeckCell.innerHTML = `<a href="${item.url}">View Deck</a>`;
                        break;
                }
            });
        })

        // Add event listeners to checkboxes
        handleCheckboxes();

        // Display search results for the active tab
        let activeTab = document.querySelector('.tab.active').dataset.tab;
        displayResults(activeTab);
    });
}

function displayResults(category) {
    // Hide all search items
    document.querySelectorAll('.search-item').forEach(item => item.classList.remove('active'));

    // If the category is 'all', display the first 5 search items for each category
    if (category === 'all') {
        ['flashcards', 'students', 'decks'].forEach(category => {
            let currentTable = document.querySelector(`#search-results-${category}`);
            currentTable.style.display = '';
            let results = document.querySelector(`#search-results-${category} tbody`).children;
            for (let i = 0; i < 5 && i < results.length; i++) {
                results[i].classList.add('active');
            }
        });
    } else {
        // Hide other categories
        ['flashcards', 'students', 'decks'].forEach(otherCategory => {
            if (otherCategory !== category) {
                let otherTable = document.querySelector(`#search-results-${otherCategory}`);
                otherTable.style.display = 'none';
            }
        });
        
        // Display current category and it's search items
        let currentTable = document.querySelector(`#search-results-${category}`);
        currentTable.style.display = '';
        let results = document.querySelector(`#search-results-${category} tbody`).children;
        for (let i = 0; i < results.length; i++) {
            results[i].classList.add('active');
        }
    }
}

function studentsSearch(event) {
    // Send a GET request with the search query
    fetch(`${searchStudentsUrl}?query=${event.target.value}`)
        .then(response => response.json())
        .then(data => {
            // Get the container for search results
            let searchResults = document.querySelector('#search-results');

            // Remove all existing search results
            searchResults.innerHTML = '';

            // Add each flashcard from the response data to search results
            data.students.forEach(student => {
                let row = searchResults.insertRow();
                let nameCell = row.insertCell();
                nameCell.className = 'name';
                let scoreCell = row.insertCell();
                scoreCell.className = 'score';
                let viewProgressCell = row.insertCell();
                viewProgressCell.className = 'view-progress';
                let buttonCell = row.insertCell();
                buttonCell.className = 'button';

                nameCell.textContent = student.user__username;
                scoreCell.innerHTML = `
                    <div class="
                        ${student.score !== undefined ? (
                            student.score < 25 ? 'score-low' :
                            student.score < 75 ? 'score-medium' :
                            student.score < 100 ? 'score-high' :
                            'score-perfect'
                        ) : 'score-low'}">
                        ${student.score !== undefined ? student.score + '%' : '0%'}
                    </div>`;
                viewProgressCell.innerHTML = `<a href="${student.url}">View Progress</a>`;
                buttonCell.innerHTML = `<button class="add-button" data-student-id="${student.user__id}">Add</button>`;
            });

            // Add event listeners to add buttons
            document.querySelectorAll('.add-button').forEach(button => {
                button.onclick = () => {
                    let studentId = button.dataset.studentId;

                    let checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.dataset.studentId = studentId;
                    checkbox.checked = true;

                    updateStudents(checkbox);
                }
            });
        });
}

function deckSearch(event) {
    // Send a GET request with the search query
    fetch(`${searchFlashcardsUrl}?query=${event.target.value}`)
        .then(response => response.json())
        .then(data => {
            // Get the container for search results
            let searchResults = document.querySelector('#search-results');

            // Remove all existing search results
            searchResults.innerHTML = '';

            // Add each flashcard from the response data to search results
            data.flashcards.forEach(flashcard => {
                let row = searchResults.insertRow();
                let imageCell = row.insertCell();
                imageCell.className = 'image';
                let frontCell = row.insertCell();
                frontCell.className = 'front';
                let backCell = row.insertCell();
                backCell.className = 'back';
                let buttonCell = row.insertCell();
                buttonCell.className = 'button';

                if (flashcard.image_url) {
                    imageCell.innerHTML = `<img src="${flashcard.image_url}" alt="Flashcard Image">`;
                }
                frontCell.textContent = flashcard.front;
                backCell.textContent = flashcard.back;
                buttonCell.innerHTML = `<button class="add-button" data-flashcard-id="${flashcard.id}">Add</button>`;
            });

            // Add event listeners to add buttons
            document.querySelectorAll('.add-button').forEach(button => {
                button.onclick = () => {
                    let flashcardId = button.dataset.flashcardId;

                    let checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.dataset.flashcardId = flashcardId;
                    checkbox.checked = true;

                    updateDeck(checkbox);
                }
            });
        });
}

function handleCheckboxes() {
    // Update the assignment flashcards based on the checkbox state
    document.querySelectorAll('.flashcard-checkbox').forEach(checkbox => {
        checkbox.onchange = () => {
            updateAssignment(checkbox);
            if (checkbox.checked) {
                checkbox.setAttribute('checked', '');
            } else {
                checkbox.removeAttribute('checked');
            }
        }
    });

    // Update the class students based on the checkbox state
    document.querySelectorAll('.student-checkbox').forEach(checkbox => {
        checkbox.onchange = () => {
            updateStudents(checkbox);
            if (checkbox.checked) {
                checkbox.setAttribute('checked', '');
            } else {
                checkbox.removeAttribute('checked');
            }
        }
    });
}

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
    // Highlight the active link in the sidebar
    const path = window.location.pathname;
    document.querySelectorAll('.sidebar a').forEach(link => {
        let deckId = link.getAttribute('data-deck-id');
        let linkPath = link.getAttribute('href');

        link.classList.remove('active');
        if ((deckId && path.endsWith(`/${deckId}`)) || (linkPath && path === linkPath)) {
            link.classList.add('active');
        }
    });

    // Add event listeners to checkboxes
    handleCheckboxes();

    // Add event listeners to remove buttons in deck flashcards
    document.querySelectorAll('.remove-button').forEach(button => {
        button.onclick = () => {
            let flashcardId = button.dataset.flashcardId;

            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.dataset.flashcardId = flashcardId;
            checkbox.checked = false;

            updateDeck(checkbox);
        }
    });

    // Add event listeners to search boxes in assignment page
    let assignmentSearchBox = document.querySelector('#assignment-search');
    if (assignmentSearchBox) {
        assignmentSearchBox.oninput = assignmentSearch;
    }

    // Add event listeners to search boxes in search page
    let globalSearchBox = document.querySelector('#global-search');
    if (globalSearchBox) {
        globalSearchBox.oninput = globalSearch;
    }

    // Add event listeners to tabs in search page
    document.querySelectorAll('.tab').forEach(button => {
        button.onclick = () => {
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            button.classList.add('active');
            let category = button.dataset.tab;
            displayResults(category);
        }
    })

    // Add event listeners to search boxes in students page
    let studentsSearchBox = document.querySelector('#students-search');
    if (studentsSearchBox) {
        studentsSearchBox.oninput = studentsSearch;
    }

    // Add event listeners to search boxes in decks page
    let deckSearchBox = document.querySelector('#deck-search');
    if (deckSearchBox) {
        deckSearchBox.oninput = deckSearch;
    }

    // Display student progress
    let studyingProgress = document.querySelector('#studying-progress');
    if (studyingProgress) {
        displayStudentProgress();
    }
});
