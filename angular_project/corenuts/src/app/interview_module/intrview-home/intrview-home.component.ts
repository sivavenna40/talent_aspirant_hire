import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/model/student';
import { RestDataSource } from 'src/app/service/restdataSource';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-intrview-home',
  templateUrl: './intrview-home.component.html',
  styleUrls: ['./intrview-home.component.css'],
})
export class IntrviewHomeComponent {
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
    private restData: RestDataSource
  ) {
    this.dataSource = new MatTableDataSource();
    this.restData.getStudents().subscribe({
      next: (resp) => {
        console.log(resp);
        this.students = resp;
        this.dataSource.data = resp;
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {}

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
}
