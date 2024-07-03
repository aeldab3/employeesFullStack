import { Employee } from 'src/app/employee/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})



export class EditEmployeeComponent implements OnInit {

  employeeDetails : Employee = {
    id:'00000000-0000-0000-0000-000000000000',
  name:'',
  email:'',
  phone:'',
  salary:0,
  department:'',
  }

  constructor(private route : ActivatedRoute , private employeesService: EmployeesService, private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe({ //The paramMap observable emits a ParamMap object, which contains the route parameters.
      next: (params) => {
        const id = params.get('id');
        if(id){
          this.employeesService.getEmployee(id)
          .subscribe({
            next: (response) => {
              this.employeeDetails = response;
            }
          })
        }
      }
    })
  }

  updateEmployee(){
    this.employeesService.updateEmployee(this.employeeDetails.id, this.employeeDetails)
    .subscribe({
      next: (response) => {
        this.router.navigate(['employees']);
      }
    })
  }
deleteEmployee(id : string){
  this.employeesService.deleteEmployee(id)
  .subscribe({
    next: (response) => {
      this.router.navigate(['employees']);
    }
  })
}
}
