# Software Design Document

Version 1.0

Prepared by NewGroup01

Date created: 07-06-2024

## Table of Contents

- [Table of Contents](#table-of-contents)
- [1. Introduction](#1-introduction)
    - [1.1. Purpose](#11-purpose)
    - [1.2. Project Scope](#12-project-scope)
    - [1.3. Requirement Analysis](#13-requirement-analysis)
    - [1.4. Intended Audience and Reading Suggestions](#14-intended-audience-and-reading-suggestions)
- [2. Software Design](#2-software-design)
    - [2.1. Architecture Design](#21-architecture-design)
    - [2.2. Graphical User Interface Design](#22-graphical-user-interface-design)
- [3. Application Demonstration](#3-application-demonstration)
    - [3.1. Library and Tools](#31-library-and-tools)
    - [3.2. Resulting Application](#32-resulting-application)
    - [3.3. Graphical User Interface Demonstration](#33-graphical-user-interface-demonstration)
- [4. User Manual](#4-user-manual)
    - [4.1. Installation instruction](#41-installation-instruction)
    - [4.2. Users and scope of use](#42-users-and-scope-of-use)
- [5. Testing](#5-testing)

## 1. Introduction

### 1.1. Purpose

The purpose of this document is to build a digital flashcard system to improve the process of learning and teaching new words, 
replace the old system using paper.

### 1.2. Project Scope

The purpose of the flashcard system is to ease the management of flashcards, allow adding and removing new cards quickly and 
simultaneously, provide an easy-to-use application for students and teachers, improve the process of learning and teaching 
new words by showing difficult words more frequently. This is achieved by having a central database for the flashcards and 
analyzing the study process.

### 1.3. Requirement Analysis

#### 1.3.1 Requirement description

The client want to develop an flashcard application that can operate in multiple kindergatens. A flashcard is esentially a two-sided card with image on the front and the english word for that image on the back. The application will includes two main functionality:
- Management of the flashcards, which includes creat, store, remove  flashcards.
- View each students result and adjust the frequency of the appearance of the falshcards accordingly.
The application should be accessible on devices commonly used in kindergartens, such as tablets or dedicated learning stations through a web browser with internet access. 

#### 1.3.2 Define and list the final requirements
The application must have a user identification system to diferentiate between three main user classes: 
"Manager", "Teacher" and "Student". 
- **Manager:** manages the overall application, creating new flashcards and managing user accounts.
- **Teacher:** Views student result, organized lesson and test/quiz base on a flashcards grouping system (deck, assignment ...) and identifies words that students find difficult as well as words that are
  easy to memorize.
- **Student (End User):** Uses the application to learn new words through flashcards.

System feature:
- Login System.
- Manage Flashcards System.
- Flashcard Decks and Lessons/Tests Management System.
- Result Analysis System.
- Account Management System.
- External Interface Requirements.
  
#### 1.3.3 Modeling
Identify the features and use cases of the application.
![UseCase DiagramFC](https://github.com/minhvn1433/flashcard-application/assets/126134607/93aa512e-feb8-42c9-913f-b5255805ec3a)

### 1.4. Intended Audience and Reading Suggestions
This document is intended for developers, project manager as well as the client's representative.

## 2. Software Design

### 2.1. Architecture Design
Model design diagram:
![my_project_visualized](https://github.com/minhvn1433/flashcard-application/assets/126134607/fae808cd-a389-4be9-92c0-56a5f9d8ae13)

### 2.2 Graphical User Interface Design
Transition graph between interfaces:
![Untitled Diagram drawio](https://github.com/minhvn1433/flashcard-application/assets/126134607/0635bd28-5956-47ff-b2d5-e07f4be11854)


## 3. Application Demonstration

### 3.1. Library and Tools
Programing languages: \
    - JavaScript (36.3%) \
    - Python (32.4%) 
    
Stylesheet language: \
    - CSS (13.1%)
    
Markup language: \
    - HTML (18.2%)
    
FrameWork: \
    - Django

### 3.2. Resulting Application
The resulting application is approximately 750kb in size (sample data included).

### 3.3. Graphical User Interface Demonstration
Login screen:
![image](https://github.com/minhvn1433/flashcard-application/assets/126134607/2e64252c-12cb-4a99-996c-68cae744fa35)

Student's home page:
![image](https://github.com/minhvn1433/flashcard-application/assets/126134607/c24d6cdc-5be5-4c37-8e68-738ffd263f2e)

Multiple choice test:
![image](https://github.com/minhvn1433/flashcard-application/assets/126134607/4db4261e-be38-4007-80ad-97c4590ce051)

Result screen:
![image](https://github.com/minhvn1433/flashcard-application/assets/126134607/aac2e378-c981-441a-8140-29fc8d1adf43)

Teacher's home page:
![image](https://github.com/minhvn1433/flashcard-application/assets/126134607/c28061d9-3370-407b-a128-5e8d089ef6a4)

Teacher's search page:
![image](https://github.com/minhvn1433/flashcard-application/assets/126134607/60f3408f-83da-4e11-9d34-a9acf6f601b7)

Teacher's student page:
![image](https://github.com/minhvn1433/flashcard-application/assets/126134607/e5bebb44-9096-444e-9367-f2c9ce6f951c)

Teacher's decks page:
![image](https://github.com/minhvn1433/flashcard-application/assets/126134607/6a8837b6-f2b0-4ed4-9c73-5ad7ecd9112f)

## 4. User manual
### 4.1. Installation instruction

### 4.2. Users and scope of use
Users: Educational institute managers, teachers, students.
Scope of use: Kindergartens or personal use.
## 5. Testing

## 5.1. Testing implemented features
We use white box testing method for each types of user.
- Student:
    - Login: 

        | Input  | Output  | Result |
        |:------------- |:---------------:|:-------------:|
        |Registered student Username and Password    | Students view          | OK|
    - Logout:

        | Input  | Output  | Result |
        |:------------- |:---------------:|:-------------:|
        |Press the logout button on the home view| Logout and return to login screen| OK|
    - Multiple choice:
      - Select a correct/wrong answer:

        | Input  | Output  | Result |
        |:------------- |:---------------:|:-------------:|
        |Click on a correct/wrong answer| Display result and the right answer| OK|
    
    - Recording result:
        Deck of 8 flashcards, the test answer is:

        |Test number| ball | cat | jeans | fish | dog    | egg | apple | hust | Output: | Result: |
        |:---------:|:---:|:---:|:-----:|:----:|:-------:|:---:|:-----:|:----:|:--------|:-------:|
        |1          | XXO  | XXXO|O      |      | XXXXO  |O    |O      |XO    |NC: 1; SL: 3; AD: 4; M: 0| OK |
        |2          | O    | XXXO|XXXO   | O    | O      |OO   |XO     |      |NC: 0; SL: 2; AD: 4; M: 2| Not OK ("egg" appeared twwice eventhough mastered) | 
        |3          | O    |O    |O      | O    |O       |XO   |       |O     |NC: 0; SL: 0; AD: 2; M: 6| OK |
        |4          | O    |XXO  |O      | O    |O       |O    |XXXO   |XXO   |NC: 0; SL: 1; AD: 2; M: 5| OK |

* Deck of less than 4 flashcards show "undefined" as multiple choice answer.
    
    - View  result:

        | Input  | Output  | Result |
        |:------------- |:---------------:|:-------------:|
        |Press the home button | Return to home and show current progress| OK|

- Teacher:
    - Login:

        | Input  | Output  | Result |
        |:------------- |:---------------:|:-------------:|
        |Registered teacher Username and Password    | Teachers view          | OK|
    
    - Logout:

        | Input  | Output  | Result |
        |:------------- |:---------------:|:-------------:|
        |Press the logout button on the home view| Logout and return to login screen| OK|
    
    - Assignment:
        - Remove a flashcards from assignment:

            | Input  | Output  | Result |
            |:------------- |:---------------:|:-------------:|
            |Deselect a flashcard| Remove flashcard from assigment| OK|
        - Add a flashcards from assignment:

            | Input  | Output  | Result |
            |:------------- |:---------------:|:-------------:|
            |Search a flashcard and press "Add"| Add flashcard to assigment| OK|

    - Search:
        - Search by All/Flashcards/Students/Decks:

            | Input  | Output  | Result |
            |:------------- |:---------------:|:-------------:|
            |Select an option and type the keyword| Show related search result| OK|

    - Students:
        - View list of student and progress:
            | Input  | Output  | Result |
            |:------------- |:---------------:|:-------------:|
            |Press "View Progress" button| Show corresponding student's progress| OK|
        - Remove a student:

            | Input  | Output  | Result |
            |:------------- |:---------------:|:-------------:|
            |Deselect a student| Remove student from the list| OK|

    - Decks view and edit:

      | Input  | Output  | Result |
      |:------------- |:---------------:|:-------------:|
      |Add or remove a flashcard from a deck| Remove flashcard from deck| OK|

      | Input  | Output  | Result |
      |:------------- |:---------------:|:-------------:|
      |Delete a deck| Remove deck from the deck list| OK|

      | Input  | Output  | Result |
      |:------------- |:---------------:|:-------------:|
      |Type the deck name and svae| Rename the deck | OK|


      
          
          
