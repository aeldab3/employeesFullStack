import { EmployeesService } from 'src/app/services/employees.service';
import { Component, OnInit, enableProdMode } from '@angular/core';
import { Employee } from 'src/app/employee/employee.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {
addEmployeeRequest : Employee = {
id:'00000000-0000-0000-0000-000000000000',
name:'',
email:'',
phone:'',
salary:0,
department:'',
}

constructor(private employeesService: EmployeesService, private router: Router){}

  ngOnInit(): void {
  }
  addEmployee(){
    this.employeesService.addEmployee(this.addEmployeeRequest)
    .subscribe({
      next:() => {
        this.router.navigate(['employees']);
      },
    })
  }

}
