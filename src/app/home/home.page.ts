import { Student } from './../models/student';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { StudentService } from '../services/student.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public students: Student[];
  constructor(private studentService:StudentService,private router:Router) {
    this.studentService.getStudents().subscribe(res => {
      this.students = res;
    });
  }
  public getStudentById(id: string){
    this.router.navigate(['/view-student'], {
      queryParams: { id: id }
    });
  }
  public removeStudent(id: string){

  }
  public updateStudent(id: string){
    this.router.navigate(['/update-student'], {
      queryParams: { id: id }
    });
  }
  public newStudent(){
    this.router.navigate(['/new-student'], {
    });
  }

}
