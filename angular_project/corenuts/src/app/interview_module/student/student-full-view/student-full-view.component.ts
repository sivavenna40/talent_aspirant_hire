import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/model/student';
import { RestDataSource } from 'src/app/service/restdataSource';
import { StateArrayService } from 'src/app/service/state-array.service';

@Component({
  selector: 'app-student-full-view',
  templateUrl: './student-full-view.component.html',
  styleUrls: ['./student-full-view.component.css'],
})
export class StudentFullViewComponent implements OnInit {
  student!: Student;
  constructor(
    private restData: RestDataSource,
    private route: ActivatedRoute,
    
    @Inject(MAT_DIALOG_DATA) private studentId: any
  ) {}

  ngOnInit(): void {
    // this.route.paramMap.subscribe((paramMap) => {
    //   this.studentId = paramMap.get('studentId');
    //   console.log(this.studentId);
    // });
    this.restData.getStudentById(this.studentId).subscribe({
      next: (data) => {
        console.log(data);
        this.student = data;
      },
    });
  }

}
