const express = require('express');
const router = express.Router();
const { db } = require("../models");

// DONE:
// 1. Remove all employees from the tenth department    [router === /remove]
// 2. Find the employee with the highest salary range (max_salary) and minimum (min_salary)  [router === /find]  
// 3. Output information from the database about the employee with the role of "President" [ router === /output]
// 4. Get all the employees who are in London [router === /london]


router.get('/remove', (request, response) => {
  // 1. Remove all employees from the tenth department
  db.query(`DELETE FROM employees WHERE department_id = '10' `, (error, results) => {
    if (error) {
      throw error
    }
    console.log('Delete successful');
  })

});

router.get('/find', (request, response) => {
  //2. Find the employee with the highest salary range (max_salary) and minimum (min_salary)
  db.query(`SELECT employee_id,(max_salary - min_salary) AS Salary_Range 
            from "jobs"
            join "employees" ON "jobs"."job_id" = "employees"."job_id"
                        ORDER BY Salary_Range DESC LIMIT 1`, (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows);
    response.status(200).json(results.rows);
  })

});

router.get('/london', (request, response) => {
  //4. Get all the employees who are in London
  db.query(`SELECT * 
            FROM "employees" 
            JOIN "departments" ON "departments"."department_id" = "employees"."department_id" AND "departments"."location_id" = 2400`, (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows);
    response.status(200).json(results.rows);
  })
});

router.get('/output', (request, response) => {
 
  //3. Output information from the database about the employee with the role of "President"
  db.query(`SELECT * 
            FROM "employees"
            JOIN "jobs" ON "employees"."job_id" = "jobs"."job_id"
            JOIN "departments" on "departments"."department_id" = "employees"."department_id"
            JOIN "locations" on "departments"."location_id" = "locations"."location_id"
            JOIN "countries" on "countries"."country_id"="locations"."country_id"
            JOIN "regions" on "regions"."region_id" = "countries"."region_id"
            JOIN "dependents" on "employees"."employee_id" = "dependents"."employee_id"
            WHERE "jobs"."job_id" = '4'`, (error, results) => {
    if (error) {
      throw error
    }
    console.log(results.rows);
    response.status(200).json(results.rows);
  })

});


module.exports = router;
