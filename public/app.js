const inquirer = require('inquirer');
const consoleTable = require('console.table');
const db = require('./db');

const mainMenu = async () => {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
      ]
    }
  ]);

  switch (action) {
    case 'View all departments':
      return viewDepartments();
    case 'View all roles':
      return viewRoles();
    case 'View all employees':
      return viewEmployees();
    case 'Add a department':
      return addDepartment();
    case 'Add a role':
      return addRole();
    case 'Add an employee':
      return addEmployee();
    case 'Update an employee role':
      return updateEmployeeRole();
    default:
      console.log('Goodbye!');
      process.exit();
  }
};

const viewDepartments = async () => {
  const departments = await db.viewDepartments();
  console.table(departments);
  mainMenu();
};

const viewRoles = async () => {
  const roles = await db.viewRoles();
  console.table(roles);
  mainMenu();
};

const viewEmployees = async () => {
  const employees = await db.viewEmployees();
  console.table(employees);
  mainMenu();
};

const addDepartment = async () => {
  const { departmentName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the name of the department?'
    }
  ]);

  await db.addDepartment(departmentName);
  console.log(`Added ${departmentName} to the database`);
  mainMenu();
};

const addRole = async () => {
  const departments = await db.viewDepartments();
  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { title, salary, departmentId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the role?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the role?'
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Which department does the role belong to?',
      choices: departmentChoices
    }
  ]);

  await db.addRole(title, salary, departmentId);
  console.log(`Added ${title} role to the database`);
  mainMenu();
};

const addEmployee = async () => {
  const roles = await db.viewRoles();
  const employees = await db.viewEmployees();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  managerChoices.unshift({ name: 'None', value: null });

  const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is the first name of the employee?'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is the last name of the employee?'
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'What is the role of the employee?',
      choices: roleChoices
    },
    {
      type: 'list',
      name: 'managerId',
      message: 'Who is the manager of the employee?',
      choices: managerChoices
    }
  ]);

  await db.addEmployee(firstName, lastName, roleId, managerId);
  console.log(`Added ${firstName} ${lastName} to the database`);
  mainMenu();
};

const updateEmployeeRole = async () => {
  const employees = await db.viewEmployees();
  const roles = await db.viewRoles();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { employeeId, roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Which employee\'s role do you want to update?',
      choices: employeeChoices
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Which role do you want to assign to the selected employee?',
      choices: roleChoices
    }
  ]);

  await db.updateEmployeeRole(employeeId, roleId);
  console.log(`Updated employee's role in the database`);
  mainMenu();
};

mainMenu();
