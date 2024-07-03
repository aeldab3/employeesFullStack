using Employee.API.Data;
using Employee.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Employee.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        public EmployeesController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        private readonly AppDbContext _dbContext;

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var employees = await _dbContext.Employees.ToListAsync();
            return Ok(employees);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetEmployee([FromRoute] Guid id)
        {
            var employee = await _dbContext.Employees.FirstOrDefaultAsync(x => x.Id == id);
            if (employee != null)
            {
                return Ok(employee);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employee.API.Models.Employee employeeRequest)
        {
            employeeRequest.Id = Guid.NewGuid();
            await _dbContext.Employees.AddAsync(employeeRequest);
            await _dbContext.SaveChangesAsync();
            return Ok(employeeRequest);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] Guid id, Employee.API.Models.Employee updateEmployeeRequest)
        {
            var employee = await _dbContext.Employees.FindAsync(id);
            if (employee != null)
            {
                employee.Name = updateEmployeeRequest.Name;
                employee.Email = updateEmployeeRequest.Email;
                employee.Phone = updateEmployeeRequest.Phone;
                employee.Salary = updateEmployeeRequest.Salary;
                employee.Department = updateEmployeeRequest.Department;
                await _dbContext.SaveChangesAsync();
                return Ok(employee);
            }
            return NotFound();
        }


        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute]Guid id)
        {
            var deleteEmployee = await _dbContext.Employees.FindAsync(id);
            if (deleteEmployee != null)
            {
                _dbContext.Employees.Remove(deleteEmployee);
                await _dbContext.SaveChangesAsync();
            }
            return Ok(deleteEmployee);
        }
    }
}
