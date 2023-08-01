import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/service/student.service';
import { StudentFormComponent } from '../student-form/student-form.component';
import { RestDataSource } from 'src/app/service/restdataSource';
import { Student } from 'src/app/model/student';

@Component({
  selector: 'app-student',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css'],
})
export class StudentViewComponent implements OnInit, AfterViewInit {
  students!: Student[];
  displayedColumns: string[] = [
    'studentId',
    'studentName',
    'studentDob',
    'studentGender',
    'studentMobileNumber',
    'studentEmail',
    'studentAadharNumber',
    'organisation',
    'action',
  ];
  dataSource!: MatTableDataSource<Student>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private studentService: StudentService,
    private dialog: MatDialog,
    private restData: RestDataSource
  ) {
    this.dataSource = new MatTableDataSource();
    this.setDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {}

  setDataSource() {
    this.restData.getStudents().subscribe({
      next: (resp) => {
        console.log(resp);
        this.students = resp;
        this.dataSource.data = resp;
      },
    });
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

  addSkill() {
    this.dialog.open(StudentFormComponent);
  }

  deleteSkill(student: Student) {
    console.log('inside delete skill :' + student.studentId);
    this.restData.deleteStudentById(student.studentId).subscribe({
      next: (res) => {
        console.log(res);
        this.setDataSource();
      },
    });
  }

  editSkill(student: Student) {
    console.log(student);
    this.dialog.open(StudentFormComponent, {
      data: student,
    });
  }
}
