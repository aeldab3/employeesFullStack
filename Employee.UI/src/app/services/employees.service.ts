import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../employee/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  getAllEmployees() : Observable<Employee[]>{
    return this.http.get<Employee[]>("https://localhost:7054/api/Employees");
  }

  addEmployee(addEmployeeRequest: Employee) : Observable<Employee> {
    return this.http.post<Employee>('https://localhost:7054/api/Employees', addEmployeeRequest)
  }
  getEmployee(id: string) : Observable<Employee> {
    return this.http.get<Employee>(`https://localhost:7054/api/Employees/${id}`)
  }
  updateEmployee(id:string, updateEmployeeRequest : Employee) : Observable<Employee>{
    return this.http.put<Employee>(`https://localhost:7054/api/Employees/${id}`, updateEmployeeRequest)
  }
  deleteEmployee(id:string) : Observable<Employee>{
    return this.http.delete<Employee>(`https://localhost:7054/api/Employees/${id}`)
  }
}
