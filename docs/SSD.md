# Software Design Document

Version 1.0

Prepared by NewGroup01

Date created: 07-06-2024

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Revision History](#revision-history)
- [1. Introduction](#1-introduction)
    - [1.1. Purpose](#11-purpose)
    - [1.2. Project Scope](#12-project-scope)
    - [1.3. Requirement Analysis](#13-requirement-analysis)
    - [1.4. Intended Audience and Reading Suggestions](#14-intended-audience-and-reading-suggestions)
- [2. Software Design](#2-software-design)
    - [2.1. Architecture Design](#21-architecture-design)
    - [2.2. Database Design](#22-database-design)
    - [2.3. Feature Design](#23-feature-design)
    - [2.4. Class Design](#24-class-design)
    - [2.5. Graphical User Interface Design](#25-graphical-user-interface-design)
- [3. Application Demonstration](#2-application-demonstration)
    - [3.1. Library and Tools](#31-library-and-tools)
    - [3.2. Resulting Application](#32-resulting-application)
    - [3.3. Graphical User Interface Demonstration](#33-graphical-user-interface-demonstration)
- [4. User Manual](#4-user-manual)
    - [4.1. Installation instruction](#41-installation-instruction)
    - [4.2. Objects and scope of use](#42-Objects-and-scope-of-use)
    - [4.3. Usage](#43-usage)
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

#### 1.3.1 Analysis the requirement 
_Identify and establish the functionality by consultation with client, customers, and users. 
(ROugh and verbal description of the requirement)_

The client want to develop an flashcard application that includes two main functionality:
- Management of the flashcards, which includes creat, store, remove  flashcards.
- View each students result and adjust the frequency of the appearance of the falshcards accordingly.
The application should be accessible on devices commonly used in kindergartens, such as tablets or dedicated learning stations
through a web browser with internet access. 

#### 1.3.2 Define and list the final requirements
_Describe the functions that the system must perform. (List the description in a more technical way)_

Three main user classes are: "Manager", "Teacher" and "Student". 
- **Manager:** manages the overall application, creating new flashcards and managing user accounts.
- **Teacher:** Views student result and identifies words that students find difficult as well as words that are
  easy to memorize.
- **Student (End User):** Uses the application to learn new words through flashcards.

System feature:
- Login System
- Manage Flashcards System
- Flashcard Decks and Lessons/Tests Management System
- Result Analysis System
- Account Management System
- External Interface Requirements
  
#### 1.3.3 Modeling
_Organize the requirements in a systematic and comprehensible manner (Use case diagram)_

### 1.4. Intended Audience and Reading Suggestions

## 2. Software Design

### 2.1. Architecture Design

### 2.2 Database Design
_- Short description of the database_
_insert sql table relation image_

### 2.3 Class design
_detailed design of each class_

### 2.4 Graphical User Interface Design
_describe the interface_

## 3. Application Demonstration
### 3.1. Library and Tools

### 3.2. Resulting Application
_Information of the application (numbers of pakage, files, size, line of code ....)_




# 5. Testing

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


      
          
          
