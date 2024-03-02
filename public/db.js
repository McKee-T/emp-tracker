const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'employee_tracker'
}).promise();

const viewDepartments = async () => {
  const [rows] = await connection.query('SELECT * FROM department');
  return rows;
};

const viewRoles = async () => {
  const [rows] = await connection.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id');
  return rows;
};

const viewEmployees = async () => {
  const [rows] = await connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, \' \', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id');
  return rows;
};

const addDepartment = async (name) => {
  const [rows] = await connection.query('INSERT INTO department (name) VALUES (?)', [name]);
  return rows;
};

const addRole = async (title, salary, departmentId) => {
  const [rows] = await connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
  return rows;
};

const addEmployee = async (firstName, lastName, roleId, managerId) => {
  const [rows] = await connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
  return rows;
};

const updateEmployeeRole = async (employeeId, roleId) => {
  const [rows] = await connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
  return rows;
};

module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};
