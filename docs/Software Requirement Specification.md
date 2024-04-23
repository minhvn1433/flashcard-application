# Software Requirements Specification

Version 1.0

Prepared by NewGroup01

Date created: 23-04-2024

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Revision History](#revision-history)
- [1. Introduction](#1-introduction)
    - [1.1. Purpose](#11-purpose)
    - [1.2. Document Conventions](#12-document-conventions)
    - [1.3. Intended Audience and Reading Suggestions](#13-intended-audience-and-reading-suggestions)
    - [1.4. Project Scope](#14-project-scope)
- [2. Overall Description](#2-overall-description)
    - [2.1. Product Perspective](#21-product-perspective)
    - [2.2. Product Features](#22-product-features)
    - [2.3. User Classes and Characteristics](#23-user-classes-and-characteristics)
    - [2.4. Operating Environment](#24-operating-environment)
    - [2.5. Design and Implementation Constraints](#25-design-and-implementation-constraints)
    - [2.6. User Documentation](#26-user-documentation)
    - [2.7. Assumptions and Dependencies](#27-assumptions-and-dependencies)
- [3. System Features](#3-system-features)
    - [3.1. Login System](#31-login-system)
    - [3.2. Manage Flashcards System](#32-manage-flashcards-system)
    - [3.3. Flashcard Decks and Lessons/Tests Management System](#33-flashcard-decks-and-lessonstests-management-system)
    - [3.4. Result Analysis System](#34-result-analysis-system)
    - [3.5. Account Management System](#35-account-management-system)
- [4. External Interface Requirements](#4-external-interface-requirements)
    - [4.1. User Interfaces](#41-user-interfaces)
    - [4.2. Hardware Interfaces](#42-hardware-interfaces)
    - [4.3. Software Interfaces](#43-software-interfaces)
    - [4.4. Communication Interfaces](#44-communication-interfaces)
- [5. Other Nonfunctional Requirements](#5-other-nonfunctional-requirements)
    - [5.1. Performance Requirements](#51-performance-requirements)
    - [5.2. Safety Requirements](#52-safety-requirements)
    - [5.3. Security Requirements](#53-security-requirements)
    - [5.4. Software Quality Attributes](#54-software-quality-attributes)

## Revision History

| Date | Reason For Changes | Version |
|-|-|-|
| 23-04-2024 | - First requirement doc | 1.0 |

## 1. Introduction

### 1.1. Purpose

The purpose of this document is to build a digital flashcard system to improve the process of learning and teaching new words, replace the old system using paper.

### 1.2. Document Conventions

Priorities for higher-level requirements are assumed to be inherited by detailed requirements.

### 1.3. Intended Audience and Reading Suggestions

This document is intended for developers, project manager as well as the client's representative.

### 1.4. Project Scope

The purpose of the flashcard system is to ease the management of flashcards, allow adding and removing new cards quickly and simultaneously, provide an easy-to-use application for students and teachers, improve the process of learning and teaching new words by showing difficult words more frequently. This is achieved by having a central database for the flashcards and analyzing the study process.

## 2. Overall Description

### 2.1. Product Perspective

This self-contained product is a web application designed to run on an education system server.

### 2.2. Product Features

The application allows the manager to create flashcards using words and images. The students can then study this flashcards on the application. The results will be stored and made visible to the teacher. In addition, the application analyze the results and repeat 
the words that the kids could not remember.  

### 2.3. User Classes and Characteristics

Three main user classes are: "Manager", "Teacher" and "Student". 
- **Manager:** manages the overall application, creating new flashcards and managing user accounts.
- **Teacher:** Views student result and identifies words that students find difficult as well as words that are easy to memorize.
- **Student (End User):** Uses the application to learn new words through flashcards.

### 2.4. Operating Environment

The application should be accessible on devices commonly used in kindergartens, such as tablets or dedicated learning stations through a web browser with internet access. 

**Web browsers**: Google Chrome, Mozilla Firefox, Safari, Microsoft Edges.

### 2.5. Design and Implementation Constraints

- Flashcard application requires a connection for full functionality of the application. If a connection is lost during an active session the outcome may result in viewing only the data the application has currently downloaded on the physical device. Full functionality of the application will resume upon reconnection.
- Interface design needs to be simple and user-friendly for young children, potentially limiting some interaction complexity.
- Project budget might affect or limit the functionalities of the application.
- Time constraints might limit the number of features of the application.
### 2.6. User Documentation

- A PPTX file demonstrating basic usages of the application 
- A PDF document listing the system requirements, dependencies and features 
of the application.

### 2.7. Assumptions and Dependencies

- **Assumptions:**
    - Users are assumed to have basic technical literacy to navigate the application interface.
    - The application's effectiveness relies on student engagement and voluntarily.
    - The manager takes all responsibility for security and permission of the used images.

- **Dependencies:**
    - The application relies on a user management system to differentiate between manager, teacher, and student roles.
    - The application requires a secure data storage solution to maintain user information, student progress, and flashcard data.
    - The application depends on digital devices (tablets/computers) with internet access (if web-based) for students and teachers.

## 3. System Features

### 3.1. Login System

#### 3.1.1. Description and Priority

- **Description:** A security measure that requires users to provide their credentials to authenticate and authorize individuals, ensuring only authorized users can access the system.
- **Priority level:** High

#### 3.1.2. Stimulus/Response Sequences

- **User Action:** The user navigates to the login page.
- **System Response:** The system presents the login form asking for username and password.
- **User Action:** The user enters their username and password and submits the form.
- **System Response:** The system validates the entered credentials.

#### 3.1.3. Functional Requirements

- **Database Systems:** These are used to store and manage data.
- **Password Encryption Methods:** Should be hashed using strong algorithms to resist attacks.
- **Front-End Frameworks/Libraries:** To help build the user interface of the system.
- **Authentication:** Tools for managing user authentication

If the credentials are incorrect, the system shows an error message. If the credentials are correct, the system authenticates the user and initiates a session.

### 3.2. Manage Flashcards System

#### 3.2.1. Description and Priority

- **Description:** Manage flashcards is a feature that allows managers to create and add new flashcards or edit/remove existing flashcards to the study set. 
- **Priority level:** High.

#### 3.2.2. Stimulus/Response Sequences

- **User Action:** User navigates to the “Manage Flashcards” section.
- **System Response:** Displays the existing flashcards in the collection.
- **User Action:** User selects the "Add New Flashcard" or "Edit Flashcards" or "Delete Flashcards" option.
- **System Response:** Presents a form for the user to input the picture/image and its corresponding meaning for the new flashcard or the existing flashcard, or remove the flashcard temporarily.
- **User Action:** User makes changes and confirms.
- **System Response:** Validates the input and adds/updates/removes the flashcard to/from the collection.

#### 3.2.3. Functional Requirements

- **Database Systems:** These are used to store and manage data.
- **Front-End Frameworks/Libraries:** To help build the user interface of the system.

### 3.3. Flashcard Decks and Lessons/Tests Management System

#### 3.3.1. Description and Priority

- **Description:** This is a feature that allows teachers to create or edit structured flashcard decks by search, grouping related flashcards to a deck and create lessons or tests from the existing decks.
- **Priority level:** High.

#### 3.3.2. Stimulus/Response Sequences

- **User Action:** Teacher navigates to the “Decks” section.
- **System Response:** Displays an interface for the user to create a new deck or edit an existing one.
- **User Action:** Teacher create a new deck / selects a existing deck.
- **System Response:** Presents a list of the deck’s flashcards for selection.
- **User Action:** Teacher adds or removes a selected flashcards from the deck.
- **System Response:** Adds or removes the selected flashcards from the deck.
- **User Action:** Teacher selects the “Save” option.
- **System Response:** Save the configured deck.
- **User Action:** Teacher selects an existing deck as lesson / test.
- **System Response:** Loads the selected deck to a lesson / test with its associated flashcards.
- **User Action:** Student navigates to the “Start lesson”/“Take Test” section.
- **System Response:** Generates a lesson/test based on the flashcards in the deck.

#### 3.3.3. Functional Requirements

- **Database Systems:** These are used to store and manage data.
- **Front-End Frameworks/Libraries:** To help build the user interface of the system.
- **Cookie Management:** To handle and save user preferences.

### 3.4. Result Analysis System

#### 3.4.1. Description and Priority

- **Description:** This is a feature that allows teachers to view students result, words that are hard to remember as well as words that 
students can remember quickly.
- **Priority level:** High.

#### 3.4.2. Stimulus/Response Sequences

- **User Action:** Teacher navigates to the "Result" section.
- **System Response:** Displays the words students have learned, group by difficulty.
- **User Action:** Teacher select a particular student on the student list.
- **System Response:** Loads and displays the progress and result of that student.

#### 3.4.3. Functional Requirements

- **Database Systems:** These are used to store and manage data.
- **Front-End Frameworks/Libraries:** To help build the user interface of the system.

### 3.5. Account Management System

#### 3.5.1. Description and Priority

- **Description:** This is a feature that allows managers to create or remove student/teacher accounts.
- **Priority level:** High.

#### 3.5.2. Stimulus/Response Sequences

- **User Action:** Manager navigates to the "Account Management" section.
- **System Response:** Loads and displays existing teacher/student accounts.
- **User Action:** Manager selects the "Edit" option.
- **System Response:** Displays the account remove button and new account input box.
- **User Action:** Manager remove an account by select the "Remove" option or input new account information to the new 
account input box.
- **System Response:** Update the database with the new account information or remove a account from the database.

#### 3.5.3. Functional Requirements

- **Database Systems:** These are used to store and manage data.
- **Front-End Frameworks/Libraries:** To help build the user interface of the system.
- **Password Encryption Methods:** Should be hashed using strong algorithms to resist attacks.

## 4. External Interface Requirements

### 4.1. User Interfaces

- **For students:**
    - **Login Page:** Provides required fields to log in.
    - **Homepage:** Allows students to select game modes for flashcard practice.
    - **Gameplay:** Testing students with gamified experiences. The algorithm will show difficult card more often.
    - **Settings:** Allows to modify settings.
- **For teachers:**
    - **Login Page:** Provides required fields to log in.
    - **Search Bar:** Allows to search flashcards, students, decks.
    - **Today Page:** List of flashcards assigned to students, reset everyday.
    - **Plan Page:** Assignments history.
    - **Student Profiles:** Shows multiple student profiles. Allow to view results, add and remove students.
    - **Decks List:** A list of flashcard decks created.
- **For managers:**
    - **Manage accounts:** Allows to create, delete accounts.
    - **Manage flashcards:** Allows to create, modify, delete flashcards.


### 4.2. Hardware Interfaces

The application is designed to run on any device with a web browser, including desktop computers, laptops, tablets, and smartphones.

### 4.3. Software Interfaces

- **Web Browser Compatibility:** The application is compatible with major web browsers such as Google Chrome, Mozilla Firefox, Safari, Microsoft Edges.
- **Database Integration:** The application interfaces with a database system to store user account information, flashcard decks, user progress and other relevant data.

### 4.4. Communication Interfaces

- **Data Transfer:** : Uses HTTPS for secure communication between the clients and servers.
- **User Authentication:** Implements simple login functionality for secure access to user accounts.

## 5. Other Nonfunctional Requirements

### 5.1. Performance Requirements

The product shall take initial load time based on internet connection strength and hardware components of the users.

### 5.2. Safety Requirements

During the usage of the software, students may mishandle and the device. Parental supervision is recommended.

### 5.3. Security Requirements

Access to the database shall be granted to students, teachers and managers only. Users are identified by their accounts, which use student ID for students and shortened names for teachers and managers as usernames.

### 5.4. Software Quality Attributes

- **Correctness**: The system should correctly link two sides of a flashcard.

- **Portability**: The system should be easily transfered to other servers.

- **Usability**: The system should have a uniform look and feel across different browsers.
