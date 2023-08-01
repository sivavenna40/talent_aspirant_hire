import { Injectable } from '@angular/core';
import { RestDataSource } from './restdataSource';
import { StudentExamMark } from '../model/studentExamMark';

@Injectable({
  providedIn: 'root',
})
export class StudentExamMarkService {
  studentExamMarks!: StudentExamMark[];

  constructor(private restData: RestDataSource) {
    restData.getStudentExamMarks().subscribe({
      next: (data) => {
        this.studentExamMarks = data;
      },
    });
  }

  getStudentExamMarks() {
    return this.studentExamMarks;
  }

  saveStudentExamMark(interviwSkill: StudentExamMark) {
    this.restData.saveStudentExamMark(interviwSkill).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }

  deletStudentExamMarkById(studentExamMarkId: number) {
    this.restData.deleteStudentExamMarkById(studentExamMarkId).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
