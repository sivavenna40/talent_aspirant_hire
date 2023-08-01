import { Injectable } from '@angular/core';
import { RestDataSource } from './restdataSource';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  students!: Student[];

  constructor(private restData: RestDataSource) {
    restData.getStudents().subscribe({
      next: (data) => {
        this.students = data;
      },
    });
  }

  getStudents() {
    return this.students;
  }

  saveStudent(student: Student) {
    this.restData.saveStudent(student).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }

  deletStudentById(studentId: number) {
    this.restData.deleteStudentById(studentId).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }

  updateStudent(student: Student) {
    this.restData.updateStudent(student).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
