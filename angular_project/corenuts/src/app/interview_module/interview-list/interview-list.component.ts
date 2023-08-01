import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/model/student';
import { CommonService } from 'src/app/service/common.service';
import { RestDataSource } from 'src/app/service/restdataSource';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.css'],
})
export class InterviewListComponent {
  students!: Student[];
  currentInterviewRoundLevel!: number;
  public role!: string;
  displayedColumns: string[] = [
    'studentId',
    'studentName',
    'completedInterviewRounds',
    'studentAadharNumber',
    'organisation',
  ];
  dataSource!: MatTableDataSource<Student>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private studentService: StudentService,
    private restData: RestDataSource,
    private commonService: CommonService
  ) {
    this.dataSource = new MatTableDataSource();
    this.restData.getStudentsByPendingInterviews().subscribe({
      next: (resp) => {
        console.log(resp);
        resp.forEach((student) => {
          this.restData
            .getInterviewRoundsByStudentId(student.studentId)
            .subscribe({
              next: (interviewRounds) => {
                const interviewRoundNumbers = interviewRounds.map(
                  (interviewRound) => interviewRound.interviewRoundNumber
                );
                if (interviewRoundNumbers.length != 0) {
                  student.completedInterviewRounds = Math.max.apply(
                    Math,
                    interviewRoundNumbers
                  );
                  console.log(this.currentInterviewRoundLevel);
                } else {
                  student.completedInterviewRounds = 0;
                }
              },
            });
        });
        this.students = resp;
        this.dataSource.data = resp;
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.role = this.commonService.getrole();
    if (this.isInterviewer()) {
      this.displayedColumns.push('action');
    }
  }

  getCurrentInterviewRound(studentId: number) {
    this.restData.getInterviewRoundsByStudentId(studentId).subscribe({
      next: (interviewRounds) => {
        const interviewRoundNumbers = interviewRounds.map(
          (interviewRound) => interviewRound.interviewRoundNumber
        );
        if (interviewRoundNumbers.length != 0) {
          this.currentInterviewRoundLevel = Math.max.apply(
            Math,
            interviewRoundNumbers
          );
          console.log(this.currentInterviewRoundLevel);
        } else {
          this.currentInterviewRoundLevel = 0;
        }
      },
    });
    return this.currentInterviewRoundLevel;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getStudents() {
    return this.studentService.getStudents();
  }

  isInterviewer() {
    return this.role === 'Interviewer';
  }
}
