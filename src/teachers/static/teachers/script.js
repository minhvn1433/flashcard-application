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
                while (assignmentFlashcards.firstChild) {
                    assignmentFlashcards.removeChild(assignmentFlashcards.firstChild);
                }
                
                // Add each flashcard from the response data to assignment
                data.flashcards.forEach(flashcard => {
                    let listItem = document.createElement('li');
                    listItem.innerHTML = `<a href="${flashcard.url}">${flashcard.front} | ${flashcard.back}</a>
                                      <input type="checkbox" data-flashcard-id="${flashcard.id}" class="flashcard-checkbox" checked>`;
                    assignmentFlashcards.appendChild(listItem);
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
                while (studentsStudent.firstChild) {
                    studentsStudent.removeChild(studentsStudent.firstChild);
                }
                
                // Add each student from the response data to class
                data.students.forEach(student => {
                    let listItem = document.createElement('li');
                    listItem.innerHTML = `<a href="${student.url}">${student.user__username}</a>
                                      <input type="checkbox" data-student-id="${student.user__id}" class="student-checkbox" checked>`;
                    studentsStudent.appendChild(listItem);
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
            while (deckFlashcards.firstChild) {
                deckFlashcards.removeChild(deckFlashcards.firstChild);
            }

            // Add each flashcard from the response data to deck
            deckFlashcardsList.forEach(flashcard => {
                let listItem = document.createElement('li');
                let isChecked = assignmentFlashcardIds.includes(flashcard.id) ? 'checked' : '';
                listItem.innerHTML = `<a href="${flashcard.url}">${flashcard.front} | ${flashcard.back}</a>
                                  <input type="checkbox" data-flashcard-id="${flashcard.id}" class="flashcard-checkbox" ${isChecked}>
                                  <button data-flashcard-id="${flashcard.id}" class="remove-button">Remove</button>`;
                deckFlashcards.appendChild(listItem);
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
            while (searchResults.firstChild) {
                searchResults.removeChild(searchResults.firstChild);
            }

            // Add each flashcard from the response data to search results
            data.flashcards.forEach(flashcard => {
                let listItem = document.createElement('li');
                listItem.innerHTML = `<a href="${flashcard.url}">${flashcard.front} | ${flashcard.back}</a>
                                  <button data-flashcard-id="${flashcard.id}" class="add-button">Add</button>`;
                searchResults.appendChild(listItem);
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
            while(result.firstChild) {
                result.removeChild(result.firstChild);
            }
            
            // Add each item from the search results to the container
            let currentCategory = result.dataset.category;
            searchResults[currentCategory].forEach(item => {
                let listItem = document.createElement('li');
                listItem.classList.add('search-item');
                let isChecked;
                switch (currentCategory) {
                    case 'flashcards':
                        isChecked = assignmentFlashcardIds.includes(item.id) ? 'checked' : '';
                        listItem.innerHTML = `<a href="${item.url}">${item.front} | ${item.back}</a>
                                        <input type="checkbox" data-flashcard-id="${item.id}" class="flashcard-checkbox" ${isChecked}>`;
                        break;
                    case 'students':
                        isChecked = studentsStudentIds.includes(item.user__id) ? 'checked' : '';
                        listItem.innerHTML = `<a href="${item.url}">${item.user__username}</a>
                                        <input type="checkbox" data-student-id="${item.user__id}" class="student-checkbox" ${isChecked}>`;
                        break;
                    case 'decks':
                        listItem.innerHTML = `<a href="${item.url}">${item.name}</a>`;
                        break;
                }
                result.appendChild(listItem);
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
            let results = document.querySelector(`#search-results-${category}`).children;
            for (let i = 0; i < 5 && i < results.length; i++) {
                results[i].classList.add('active');
            }
        });
    } else {
        // Display all search items for the selected category
        let results = document.querySelector(`#search-results-${category}`).children;
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
            while (searchResults.firstChild) {
                searchResults.removeChild(searchResults.firstChild);
            }

            // Add each student from the response data to search results
            data.students.forEach(student => {
                let listItem = document.createElement('li');
                listItem.innerHTML = `<a href="${student.url}">${student.user__username}</a>
                                  <button data-student-id="${student.user__id}" class="add-button">Add</button>`;
                searchResults.appendChild(listItem);
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
            while (searchResults.firstChild) {
                searchResults.removeChild(searchResults.firstChild);
            }

            // Add each flashcard from the response data to search results
            data.flashcards.forEach(flashcard => {
                let listItem = document.createElement('li');
                listItem.innerHTML = `<a href="${flashcard.url}">${flashcard.front} | ${flashcard.back}</a>
                                  <button data-flashcard-id="${flashcard.id}" class="add-button">Add</button>`;
                searchResults.appendChild(listItem);
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

document.addEventListener('DOMContentLoaded', () => {
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
});
