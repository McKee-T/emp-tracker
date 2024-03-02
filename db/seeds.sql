INSERT INTO department (name) VALUES 
('Finance'),
('Legal'),
('Engineering'),
('Sales');

INSERT INTO role (title, salary, department_id) VALUES 
('Account Manager', 160000, 1),
('Accountant', 125000, 1),
('Legal Team Lead', 250000, 2),
('Lawyer', 180000, 2),
('Lead Engineer', 150000, 3),
('Software Engineer', 120000, 3),
('Sales Lead', 100000, 4),
('Salesperson', 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),  -- Account Manager
('Jane', 'Smith', 2, 1),   -- Accountant
('Alice', 'Johnson', 3, NULL), -- Legal Team Lead
('Bob', 'Williams', 4, 3), -- Lawyer
('Mike', 'Brown', 5, NULL), -- Lead Engineer
('Linda', 'Davis', 6, 5),  -- Software Engineer
('Chris', 'Miller', 7, NULL), -- Sales Lead
('Patricia', 'Wilson', 8, 7); -- Salesperson
