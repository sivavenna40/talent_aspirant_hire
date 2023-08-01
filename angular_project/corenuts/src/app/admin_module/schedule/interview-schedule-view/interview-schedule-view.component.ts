import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InterviewSchedule } from 'src/app/model/interviewSchedule';
import { InterviewScheduleService } from 'src/app/service/interview-schedule.service';
import { RestDataSource } from 'src/app/service/restdataSource';
import { InterviewScheduleFormComponent } from '../interview-schedule-form/interview-schedule-form.component';

@Component({
  selector: 'app-interview-schedule-view',
  templateUrl: './interview-schedule-view.component.html',
  styleUrls: ['./interview-schedule-view.component.css'],
})
export class InterviewScheduleViewComponent implements OnInit, AfterViewInit {
  interviewSchedules!: InterviewSchedule[];
  displayedColumns: string[] = [
    'interviewScheduleId',
    'interviewScheduleDate',
    'interviewers',
    'organisation',
    'action',
  ];
  dataSource!: MatTableDataSource<InterviewSchedule>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private interviewScheduleService: InterviewScheduleService,
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
    this.restData.getInterviewSchedules().subscribe({
      next: (resp) => {
        console.log(resp);
        this.interviewSchedules = resp;
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
  getInterviewSchedules() {
    return this.interviewScheduleService.getInterviewSchedules();
  }

  addInterviewSchdule() {
    this.dialog.open(InterviewScheduleFormComponent);
  }

  deleteInterviewSchdule(interviewSchedule: InterviewSchedule) {
    this.restData
      .deleteInterviewScheduleById(interviewSchedule.interviewScheduleId)
      .subscribe({
        next: (res) => {
          this.setDataSource();
        },
      });
  }

  editInterviewSchdule(interviewSchedule: InterviewSchedule) {
    console.log(interviewSchedule);
    this.dialog.open(InterviewScheduleFormComponent, {
      data: interviewSchedule,
    });
  }
}
