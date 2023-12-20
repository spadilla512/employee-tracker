# employee-tracker

## Description

Developers frequently have to create interfaces that allow non-developers to easily view and intext with information stored in databases. These interfaces are called content management systems (CMS). The application can be accessed by entering in "npm start" in the command line.

## User Story

As a business owner, I want to be able to view and manage the departments, roles, and employees in my company so that I can organize and plan my business.

## Acceptance Criteria

Given a command-line application that accepts user input when I start the application, then I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role. When I choose to view all departments then I am presented with a formatted table showing department names and department ids. When I choose to view all roles then I am presented with the job title, role id, the department that role belongs to, and the salary for that role. When I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to. When I choose to add a department then I am prompted to enter the name of the department and that department is added to the database. When I choose to add a role then I am prompted to enter the name, salary, and department for the role and that role is added to the database. When I choose to add an employee then I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database. When I choose to update an employee role then I am prompted to select an employee to update and their new role and this information is updated in the database.

## Installation

To install inquirer, please use 'npm i inquirer@8.2.4' in terminal.
To install mysql2, use 'npm i mysql2' in terminal.

## Images



## Link to Video Walkthrough

**Video:** [Link]

## Credits

The structure of the functions for each question in the server.js file was based off of a repository named "EmployBase" which can be accessed through the following link: https://github.com/cynthiamory/EmployBase.git

## License

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)