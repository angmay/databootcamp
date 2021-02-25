--note: Date values are saved as variable due to some dates exceeding date format limit (1753)

--List the following details of each employee: employee number, last name, first name, sex, 
--and salary.

SELECT "Employee_data".emp_no as "Employee Number", 
	last_name as "Last Name", 
	first_name as "First Name", 
	sex as "Sex", 
	"Salary_data".salary as "Salary" 
	FROM "Employee_data"
	JOIN "Salary_data"
	ON "Employee_data".emp_no = "Salary_data".emp_no;
	
--List first name, last name, and hire date for employees who were hired in 1986.

SELECT first_name, last_name, hire_date FROM "Employee_data"
	WHERE hire_date LIKE '%1986';

--List the manager of each department with the following information: department number, department 
--name, the manager's employee number, last name, first name.

SELECT "Department_manager".dept_no as "Department Number", 
	"Department_id".dept_name as "Department Name",
	"Department_manager".manager_no as "Employee Number", 
	"Employee_data".first_name as "Manager First Name", 
	"Employee_data".last_name as "Manager Last Name"
	FROM "Department_manager"
	JOIN "Employee_data" ON "Department_manager".manager_no = "Employee_data".emp_no 
	JOIN "Department_id" ON "Department_manager".dept_no = "Department_id".dept_no ;

--List the department of each employee with the following information: employee number, last name, 
--first name, and department name.

SELECT "Department_emp".emp_no as "Employee Number",
	"Employee_data".last_name as "Last Name",
	"Employee_data".first_name as "First Name",
	"Department_id".dept_name as "Department Name"
	FROM "Department_emp"
	JOIN "Employee_data" ON "Employee_data".emp_no = "Department_emp".emp_no
	JOIN "Department_id" ON  "Department_id".dept_no = "Department_emp".dept_no;

--List first name, last name, and sex for employees whose first name is "Hercules" and last names 
--begin with "B."

SELECT first_name as "First Name", 
	last_name as "Last Name", 
	sex as "Sex"
	FROM "Employee_data"
	WHERE first_name = 'Hercules'
	AND last_name LIKE 'B%';

--List all employees in the Sales department, including their employee number, last name, 
--first name, and department name. d006 is Sales

SELECT "Department_emp".emp_no as "Employee Number",
	"Employee_data".last_name as "Last Name",
	"Employee_data".first_name as "First Name",
	"Department_id".dept_name as "Department Name"
	FROM "Department_emp"
	JOIN "Employee_data" ON "Employee_data".emp_no = "Department_emp".emp_no 
	JOIN "Department_id" ON "Department_id".dept_no = "Department_emp".dept_no
	WHERE "Department_id".dept_name = 'Sales' ;

--List all employees in the Sales and Development departments, including their employee number, 
--last name, first name, and department name.

SELECT "Department_emp".emp_no as "Employee Number",
	"Employee_data".last_name as "Last Name",
	"Employee_data".first_name as "First Name",
	"Department_id".dept_name as "Department Name"
	FROM "Department_emp"
	JOIN "Employee_data" ON "Employee_data".emp_no = "Department_emp".emp_no 
	JOIN "Department_id" ON "Department_id".dept_no = "Department_emp".dept_no
	WHERE "Department_id".dept_name = 'Sales'
	OR "Department_id".dept_name = 'Development' ;

--In descending order, list the frequency count of employee last names, i.e., how many employees 
--share each last name

SELECT last_name as "Last Name", 
	count(emp_no) as "Number of Employees"
	FROM "Employee_data"
	GROUP BY last_name 
	ORDER BY "Number of Employees" DESC; 

