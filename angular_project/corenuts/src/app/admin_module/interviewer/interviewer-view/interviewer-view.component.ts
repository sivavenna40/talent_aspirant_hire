import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Interviewer } from 'src/app/model/Interviewer';
import { InterviewerService } from 'src/app/service/interviewer.service';
import { InterviewerFormComponent } from '../interviewer-form/interviewer-form.component';
import { RestDataSource } from 'src/app/service/restdataSource';

@Component({
  selector: 'app-interviewer',
  templateUrl: './interviewer-view.component.html',
  styleUrls: ['./interviewer-view.component.css'],
})
export class InterviewerViewComponent implements OnInit, AfterViewInit {
  interviewers!: Interviewer[];
  displayedColumns: string[] = [
    'interviewerId',
    'interviewerName',
    'interviewerAge',
    'interviewerGender',
    'interviewerMobileNumber',
    'interviewerEmail',
    'interviewerSkills',
    'action',
  ];
  dataSource!: MatTableDataSource<Interviewer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private interviewerService: InterviewerService,
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
    this.restData.getInterviewers().subscribe({
      next: (resp) => {
        console.log(resp);
        this.interviewers = resp;
        this.dataSource.data = resp;
        console.log(this.dataSource);
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
  getInterviewers() {
    return this.interviewerService.getInterviewers();
  }

  addInterviewer() {
    this.dialog.open(InterviewerFormComponent);
  }

  deleteInterviewer(interviewer: Interviewer) {
    this.restData.deleteInterviewerById(interviewer.interviewerId).subscribe({
      next: (res) => {
        console.log(res, 'deleted');
        this.setDataSource();
      },
    });
  }

  editInterviewer(interviewer: Interviewer) {
    console.log(interviewer);
    this.dialog.open(InterviewerFormComponent, {
      data: interviewer,
    });
  }
}
