-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Salary_data" (
    "emp_no" varchar(10)   NOT NULL,
    "salary" varchar(50)   NOT NULL,
    CONSTRAINT "pk_Salary_data" PRIMARY KEY (
        "emp_no"
     )
);

CREATE TABLE "Employee_data" (
    "emp_no" varchar(10)   NOT NULL,
    "title_no" varchar(10)   NOT NULL,
    "birth_date" varchar(20)   NOT NULL,
    "first_name" varchar(255)   NOT NULL,
    "last_name" varchar(255)   NOT NULL,
    "sex" varchar(10)   NOT NULL,
    "hire_date" varchar(20)   NOT NULL,
    CONSTRAINT "pk_Employee_data" PRIMARY KEY (
        "emp_no"
     )
);

CREATE TABLE "Department_id" (
    "dept_no" varchar(50)   NOT NULL,
    "dept_name" varchar(255)   NOT NULL,
    CONSTRAINT "pk_Department_id" PRIMARY KEY (
        "dept_no"
     )
);

CREATE TABLE "Department_emp" (
    "composite" varchar(20)   NOT NULL,
    "emp_no" varchar(10)   NOT NULL,
    "dept_no" varchar(10)   NOT NULL,
    CONSTRAINT "pk_Department_emp" PRIMARY KEY (
        "composite"
     )
);

CREATE TABLE "Title_id" (
    "title_no" varchar(10)   NOT NULL,
    "title" varchar(50)   NOT NULL,
    CONSTRAINT "pk_Title_id" PRIMARY KEY (
        "title_no"
     )
);

CREATE TABLE "Department_manager" (
    "composite" varchar(20)   NOT NULL,
    "dept_no" varchar(10)   NOT NULL,
    "manager_no" varchar(10)   NOT NULL,
    CONSTRAINT "pk_Department_manager" PRIMARY KEY (
        "composite"
     )
);

ALTER TABLE "Salary_data" ADD CONSTRAINT "fk_Salary_data_emp_no" FOREIGN KEY("emp_no")
REFERENCES "Employee_data" ("emp_no");

ALTER TABLE "Employee_data" ADD CONSTRAINT "fk_Employee_data_title_no" FOREIGN KEY("title_no")
REFERENCES "Title_id" ("title_no");

ALTER TABLE "Department_emp" ADD CONSTRAINT "fk_Department_emp_emp_no" FOREIGN KEY("emp_no")
REFERENCES "Employee_data" ("emp_no");

ALTER TABLE "Department_emp" ADD CONSTRAINT "fk_Department_emp_dept_no" FOREIGN KEY("dept_no")
REFERENCES "Department_id" ("dept_no");

ALTER TABLE "Department_manager" ADD CONSTRAINT "fk_Department_manager_dept_no" FOREIGN KEY("dept_no")
REFERENCES "Department_id" ("dept_no");

ALTER TABLE "Department_manager" ADD CONSTRAINT "fk_Department_manager_manager_no" FOREIGN KEY("manager_no")
REFERENCES "Employee_data" ("emp_no");

