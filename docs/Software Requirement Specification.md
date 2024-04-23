# Software Requirements Specification

Version

Prepared by author

organization

date created

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
    - [3.1. System Feature 1](#31-system-feature-1)
    - [3.2. System Feature 2](#32-system-feature-2)
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

| Name | Date | Reason For Changes | Version |
|-|-|-|-|
| Name | dd-mm-yy | - Reason 1<br>- Reason 2<br>- Reason 3 | x.x.x |
| Name | dd-mm-yy | Reason | x.x.x |

## 1. Introduction

### 1.1. Purpose

*Identify the product whose software requirements are specified in this document, including the revision or release number. Describe the scope of the product that is covered by this SRS, particularly if this SRS describes only part of the system or a single subsystem.*

The purpose of this document is to build a digital flashcard system to improve the process of learning and teaching new words, replace the old system using paper.

### 1.2. Document Conventions

*Describe any standards or typographical conventions that were followed when writing this SRS, such as fonts or highlighting that have special significance. For example, state whether priorities  for higher-level requirements are assumed to be inherited by detailed requirements, or whether every requirement statement is to have its own priority.*

Priorities for higher-level requirements are assumed to be inherited by detailed requirements.

### 1.3. Intended Audience and Reading Suggestions

*Describe the different types of reader that the document is intended for, such as developers, project managers, marketing staff, users, testers, and documentation writers. Describe what the rest of this SRS contains and how it is organized. Suggest a sequence for reading the document, beginning with the overview sections and proceeding through the sections that are most pertinent to each reader type.*

This document is intended for developers, project manager as well as the client's representative.

### 1.4. Project Scope

*Provide a short description of the software being specified and its purpose, including relevant benefits, objectives, and goals. Relate the software to corporate goals or business strategies. If a separate vision and scope document is available, refer to it rather than duplicating its contents here. An SRS that specifies the next release of an evolving product should contain its own scope statement as a subset of the long-term strategic product vision.*

The purpose of the flashcard system is to ease the management of flashcards, allow adding and removing new cards quickly and simultaneously, provide an easy-to-use application for students and teachers, improve the process of learning and teaching new words by showing difficult words more frequently. This is achieved by having a central database for the flashcards and analyzing the study process.

## 2. Overall Description

### 2.1. Product Perspective

*Describe the context and origin of the product being specified in this SRS. For example, state whether this product is a follow-on member of a product family, a replacement for certain existing systems, or a new, self-contained product. If the SRS defines a component of a larger system, relate the requirements of the larger system to the functionality of this software and identify interfaces between the two. A simple diagram that shows the major components of the overall system, subsystem interconnections, and external interfaces can be helpful.*

This self-contained product is a web application designed to run on an education system server.
### 2.2. Product Features

*Summarize the major features the product contains or the significant functions that it performs or lets the user perform. Details will be provided in Section 3, so only a high level summary  is needed here. Organize the functions to make them understandable to any reader of the SRS. A picture of the major groups of related requirements and how they relate, such as a top level data flow diagram or a class diagram, is often effective.*

The application allows the manager to create flashcards using words and images. The students can then study this flashcards on the application. The results will be stored and made visible to the teacher. In addition, the application analyze the results and repeat 
the words that the kids could not remember.  
### 2.3. User Classes and Characteristics

*Identify the various user classes that you anticipate will use this product. User classes may be differentiated based on frequency of use, subset of product functions used, technical expertise, security or privilege levels, educational level, or experience. Describe the pertinent characteristics of each user class. Certain requirements may pertain only to certain user classes. Distinguish the favored user classes from those who are less important to satisfy.*

Three main user classes are: "Manager", "Teacher" and "Student". 
- **Manager:** manages the overall application, creating new flashcards and managing user accounts.
- **Teacher:** Views student result and identifies words that students find difficult as well as words that are easy to memorize.
- **Student (End User):** Uses the application to learn new words through flashcards.
### 2.4. Operating Environment

*Describe the environment in which the software will operate, including the hardware platform, operating system and versions, and any other software components or applications with which it must peacefully coexist.*
The application should be accessible on devices commonly used in kindergartens, such as tablets or dedicated learning stations through a web browser with internet access. 

**Web browsers**: Google Chrome, Mozilla Firefox, Safari, Microsoft Edges.
### 2.5. Design and Implementation Constraints

*Describe any items or issues that will limit the options available to the developers. These might include: corporate or regulatory policies; hardware limitations (timing requirements, memory requirements); interfaces to other applications; specific technologies, tools, and databases to be used; parallel operations; language requirements; communications protocols; security considerations; design conventions or programming standards (for example, if the customer’s organization will be responsible for maintaining the delivered software).*
- Flashcard application requires a connection for full functionality of the application. If a connection is lost during an active session the outcome may result in viewing only the data the application has currently downloaded on the physical device. Full functionality of the application will resume upon reconnection.
- Interface design needs to be simple and user-friendly for young children, potentially limiting some interaction complexity.
- Project budget might affect or limit the functionalities of the application.
- Time constraints might limit the number of features of the application.
### 2.6. User Documentation

*List the user documentation components (such as user manuals, on-line help, and tutorials) that will be delivered along with the software. Identify any known user documentation delivery formats or standards.*

- A PPTX file demonstrating basic usages of the application 
- A PDF document listing the system requirements, dependencies and features 
of the application.
### 2.7. Assumptions and Dependencies

*List any assumed factors (as opposed to known facts) that could affect the requirements stated in the SRS. These could include third-party or commercial components that you plan to use, issues around the development or operating environment, or constraints. The project could be affected if these assumptions are incorrect, are not shared, or change. Also identify any dependencies the project has on external factors, such as software components that you intend to reuse from another project, unless they are already documented elsewhere (for example, in the vision and scope document or the project plan).*

- **Assumptions:**
    - Users are assumed to have basic technical literacy to navigate the application interface.
    - The application's effectiveness relies on student engagement and voluntarily.
    - The manager takes all responsibility for security and permission of the used images.

- **Dependencies:**
    - The application relies on a user management system to differentiate between manager, teacher, and student roles.
    - The application requires a secure data storage solution to maintain user information, student progress, and flashcard data.
    - The application depends on digital devices (tablets/computers) with internet access (if web-based) for students and teachers.
## 3. System Features

*This template illustrates organizing the functional requirements for the product by system features, the major services provided by the product. You may prefer to organize this section by use case, mode of operation, user class, object class, functional hierarchy, or combinations of these, whatever makes the most logical sense for your product.*

### 3.1. Login system

#### 3.1.1. Description and Priority

*Provide a short description of the feature and indicate whether it is of High, Medium, or Low priority. You could also include specific priority component ratings, such as benefit, penalty, cost, and risk (each rated on a relative scale from a low of 1 to a high of 9).*

Description: A security measure that requires users to provide their credentials to authenticate and authorize individuals, ensuring only authorized users can access the system.

Priority level: High

#### 3.1.2. Stimulus/Response Sequences

*List the sequences of user actions and system responses that stimulate the behavior defined for this feature. These will correspond to the dialog elements associated with use cases.*

User Action: The user navigates to the login page.

System Response: The system presents the login form asking for username and password.

User Action: The user enters their username and password and submits the form.

System Response: The system validates the entered credentials.

#### 3.1.3. Functional Requirements

*Itemize the detailed functional requirements associated with this feature. These are the software capabilities that must be present in order for the user to carry out the services provided by the feature, or to execute the use case. Include how the product should respond to anticipated error conditions or invalid inputs. Requirements should be concise, complete, unambiguous, verifiable, and necessary. Use “TBD” as a placeholder to indicate when necessary information is not yet available.*

*Each requirement should be uniquely identified with a sequence number or a meaningful tag of some kind.*

- *REQ-1:* Database Systems: These are used to store and manage data.
- *REQ-2:* Password Encryption Methods: Should be hashed using strong algorithms to resist attacks.
- *REQ-3:* Front-End Frameworks/Libraries: To help build the user interface of the system.
- *REQ-4:* Authentication: Tools for managing user authentication

If the credentials are incorrect, the system shows an error message. If the credentials are correct, the system authenticates the user and initiates a session.

### 3.2. Manage flashcards system

#### 3.2.1. Description and Priority

Description: Manage flashcards is a feature that allows managers to create and add new flashcards or edit/remove existing flashcards to the study set. 

Priority level: High.

#### 3.2.2. Stimulus/Response Sequences

User Action: User navigates to the “Manage Flashcards” section.

System Response: Displays the existing flashcards in the collection.

User Action: User selects the "Add New Flashcard" or "Edit Flashcards" or "Delete Flashcards" option.

System Response: Presents a form for the user to input the picture/image and its corresponding meaning for the new flashcard or the existing flashcard, or remove the flashcard temporarily.

User Action: User makes changes and confirms.

System Response: Validates the input and adds/updates/removes the flashcard to/from the collection.

#### 3.2.3. Functional Requirements

- *REQ-1:* Database Systems: These are used to store and manage data.
- *REQ-2:* Front-End Frameworks/Libraries: To help build the user interface of the system.

### 3.3. Flashcard decks and lessons / tests management system

#### 3.3.1. Description and Priority

Description: This is a feature that allows teachers to create or edit structured flashcard decks by search, grouping related flashcards to a deck and create lessons or tests from the existing decks.

Priority level: High.

#### 3.3.2. Stimulus/Response Sequences

User Action: Teacher navigates to the “Decks” section.

System Response: Displays an interface for the user to create a new deck or edit an existing one.

User Action: Teacher create a new deck / selects a existing deck.

System Response: Presents a list of the deck’s flashcards for selection.

User Action: Teacher adds or removes a selected flashcards from the deck.

System Response: Adds or removes the selected flashcards from the deck.

User Action: Teacher selects the “Save” option.

System Response: Save the configured deck.

User Action: Teacher selects an existing deck as lesson / test.

System Response: Loads the selected deck to a lesson / test with its associated flashcards.

User Action: Student navigates to the “Start lesson”/“Take Test” section.

System Response: Generates a lesson/test based on the flashcards in the deck.

#### 3.3.3. Functional Requirements

- *REQ-1:* Database Systems: These are used to store and manage data.
- *REQ-2:* Front-End Frameworks/Libraries: To help build the user interface of the system.
- *REQ-3:* Cookie Management: To handle and save user preferences.

### 3.4. Result analysis system

#### 3.4.1. Description and Priority

Description: This is a feature that allows teachers to view students result, words that are hard to remember as well as words that 
students can remember quickly.

Priority level: High.

#### 3.4.2. Stimulus/Response Sequences

User Action: Teacher navigates to the "Result" section.

System Response: Displays the words students have learned, group by difficulty.

User Action: Teacher select a particular student on the student list.

System Response: Loads and displays the progress and result of that student.

#### 3.4.3. Functional Requirements

- *REQ-1:* Database Systems: These are used to store and manage data.
- *REQ-2:* Front-End Frameworks/Libraries: To help build the user interface of the system.

### 3.5. Account management system.

#### 3.5.1. Description and Priority

Description: This is a feature that allows managers to create or remove student/teacher accounts.

Priority level: High.

#### 3.5.2. Stimulus/Response Sequences

User Action: Manager navigates to the "Account Management" section.

System Response: Loads and displays existing teacher/student accounts.

User Action: Manager selects the "Edit" option.

System Response: Displays the account remove button and new account input box.

User Action: Manager remove an account by select the "Remove" option or input new account information to the new 
account input box.

System Response: Update the database with the new account information or remove a account from the database.

#### 3.5.3. Functional Requirements

- *REQ-1:* Database Systems: These are used to store and manage data.
- *REQ-2:* Front-End Frameworks/Libraries: To help build the user interface of the system.
- *REQ-3:* Password Encryption Methods: Should be hashed using strong algorithms to resist attacks.

## 4. External Interface Requirements

### 4.1. User Interfaces

*Describe the logical characteristics of each interface between the software product and the users. This may include sample screen images, any GUI standards or product family style guides that are to be followed, screen layout constraints, standard buttons and functions (e.g., help) that will appear on every screen, keyboard shortcuts, error message display standards, and so on. Define the software components for which a user interface is needed. Details of the user interface design should be documented in a separate user interface specification.*

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

*Describe the logical and physical characteristics of each interface between the software product and the hardware components of the system. This may include the supported device types, the nature of the data and control interactions between the software and the hardware, and communication protocols to be used.*

The application is designed to run on any device with a web browser, including desktop computers, laptops, tablets, and smartphones.

### 4.3. Software Interfaces

*Describe the connections between this product and other specific software components (name and version), including databases, operating systems, tools, libraries, and integrated commercial components. Identify the data items or messages coming into the system and going out and describe the purpose of each. Describe the services needed and the nature of communications. Refer to documents that describe detailed application programming interface protocols. Identify data that will be shared across software components. If the data sharing mechanism must be implemented in a specific way (for example, use of a global data area in a multitasking operating system), specify this as an implementation constraint.*

- **Web Browser Compatibility:** The application is compatible with major web browsers such as Google Chrome, Mozilla Firefox, Safari, Microsoft Edges.
- **Database Integration:** The application interfaces with a database system to store user account information, flashcard decks, user progress and other relevant data.

### 4.4. Communication Interfaces

*Describe the requirements associated with any communications functions required by this product, including e-mail, web browser, network server communications protocols, electronic forms, and so on. Define any pertinent message formatting. Identify any communication standards that will be used, such as FTP or HTTP. Specify any communication security or encryption issues, data transfer rates, and synchronization mechanisms.*

- **Data Transfer:** : Uses HTTPS for secure communication between the clients and servers.
- **User Authentication:** Implements simple login functionality for secure access to user accounts.

## 5. Other Nonfunctional Requirements

### 5.1. Performance Requirements

*If there are performance requirements for the product under various circumstances, state them here and explain their rationale, to help the developers understand the intent and make suitable design choices. Specify the timing relationships for real time systems. Make such requirements as specific as possible. You may need to state performance requirements for individual functional requirements or features.*

The product shall take initial load time based on internet connection strength and hardware components of the users.

### 5.2. Safety Requirements

*Specify those requirements that are concerned with possible loss, damage, or harm that could result from the use of the product. Define any safeguards or actions that must be taken, as well as actions that must be prevented. Refer to any external policies or regulations that state safety issues that affect the product’s design or use. Define any safety certifications that must be satisfied.*

During the usage of the software, students may mishandle and the device. Parental supervision is recommended.

### 5.3. Security Requirements

*Specify any requirements regarding security or privacy issues surrounding use of the product or protection of the data used or created by the product. Define any user identity authentication requirements. Refer to any external policies or regulations containing security issues that affect the product. Define any security or privacy certifications that must be satisfied.*

Access to the database shall be granted to students, teachers and managers only. Users are identified by their accounts, which use student ID for students and shortened names for teachers and managers as usernames.

### 5.4. Software Quality Attributes

*Specify any additional quality characteristics for the product that will be important to either the customers or the developers. Some to consider are: adaptability, availability, correctness, flexibility, interoperability, maintainability, portability, reliability, reusability, robustness, testability, and usability. Write these to be specific, quantitative, and verifiable when possible. At the least, clarify the relative preferences for various attributes, such as ease of use over ease of learning.*

- **Correctness**: The system should correctly link two sides of a flashcard.

- **Portability**: The system should be easily transfered to other servers.

- **Usability**: The system should have a uniform look and feel across different browsers.
