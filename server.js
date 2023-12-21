const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Laxchick512!",
    database: "employee_db",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("You are succesfully connected.");
    tracker();
});

function tracker() {
    inquirer
        .prompt ({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "Quit",
            ],
        })

        .then((answer) => {
            switch (answer.action) {
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Quit":
                    connection.end();
                    break;
                default:
                    console.log("Invalid, try again.");
                    tracker();
            }
        });
}

function viewAllEmployees() {
    connection.query(
        'SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employees AS manager ON employees.manager_id = manager.id',
        (err, res) => {
            if (err) throw err;
            console.table(res);
            tracker();
        }
    );
}

function addEmployee() {
    connection.query("SELECT * FROM roles", (err, roles) => {
        if (err) throw err;
        connection.query("SELECT * FROM employees", (err, employees) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "firstName",
                        type: "input",
                        message: "Enter first name of employee:",
                    },
                    {
                        name: "lastName",
                        type: "input",
                        message: "Enter last name of employee:",
                    },
                    {
                        name: "role",
                        type: "list",
                        message: "Select role of employee:",
                        choices: roles.map((role) => role.title),
                    },
                    {
                        name: "manager",
                        type: "list",
                        message: "Select employee's manager:",
                        choices: [
                            "None",
                            ...employees.map(
                                (employees) => `${employees.first_name} ${employees.last_name}`
                            ),
                        ],
                    },
                ])
                .then((answer) => {
                    const selectedRole = roles.find(
                        (roles) => roles.title === answer.role
                    );
                    let managerId = null;
                    if (answer.manager !== "None") {
                        const selectedManager = employees.find(
                            (employees) =>
                                `${employees.first_name} ${employees.last_name}` ===
                                answer.manager
                        );
                        managerId = selectedManager.id;
                    }
                    connection.query(
                        "INSERT INTO employees SET ?",
                        {
                            first_name: answer.firstName,
                            last_name: answer.lastName,
                            role_id: selectedRole.id,
                            manager_id: managerId,
                        },
                        (err) => {
                            if (err) throw err;
                            console.log ("New employee added!");
                            tracker();
                        }
                    );
                });
        });
    });
}

function updateEmployeeRole() {
    connection.query("SELECT * FROM employees", (err, employees) => {
        if (err) throw err;
        connection.query("SELECT * FROM roles", (err, roles) => {
            inquirer
                .prompt([
                    {
                        name: "employee",
                        type: "list",
                        message: "Select employee to update:",
                        choices: employees.map(
                            (employees) => `${employees.first_name} ${employees.last_name}`
                        ),
                    },
                    {
                        name: "role",
                        type: "list",
                        message: "Select role of employee:",
                        choices: roles.map((role) => role.title),
                    },
                ])
                .then((answer) => {
                    const selectedEmployees = employees.find(
                        (employees) =>
                            `${employees.first_name} ${employees.last_name}` ===
                            answer.employees
                    );
                    const selectedRole = roles.find(
                        (role) => role.title === answer.role
                    );

                    connection.query(
                        "UPDATE employees SET role_id = ? WHERE id = ?",
                        [selectedRole.id, selectedEmployees.id],
                        (err) => {
                            if (err) throw err;
                            console.log("Employee role is updated!");
                            tracker();
                        }
                    );
                });
        });
    })
}

function viewAllRoles() {
    connection.query(
        "SELECT roles.id, roles.title, roles.salary, department.name AS department FROM roles INNER JOIN department ON roles.department_id = department.id",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            tracker();
        }
    );
}

function addRole() {
    connection.query("SELECT * FROM department", (err, departments) => {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "title",
                    type: "input",
                    message: "Enter name of role:",
                },
                {
                    name: "salary",
                    type: "input",
                    message: "Enter salary of role:",
                },
                {
                    name: "department",
                    type: "list",
                    message: "Select department of role:",
                    choices: departments.map((department) => department.name),
                },
            ])
            .then((answer) => {
                const selectedDepartment = departments.find(
                    (department) => department.name === answer.department
                );
                connection.query(
                    "INSERT INTO roles SET ?",
                    {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: selectedDepartment.id,
                    },
                    (err) => {
                        if (err) throw err;
                        console.log("Role has been added!");
                        tracker();
                    }
                );
            });
    });
}

function viewAllDepartments() {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        tracker();
    });
}

function addDepartment() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "Enter department name:",
        })
        .then((answer) => {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.department,
                },
                (err) => {
                    if (err) throw err;
                    console.log("Department has been added!");
                    tracker();
                }
            );
        });
}