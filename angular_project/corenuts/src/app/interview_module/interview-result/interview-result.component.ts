import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/model/student';
import { InterviewScheduleService } from 'src/app/service/interview-schedule.service';
import { OrganisationService } from 'src/app/service/organisation.service';
import { RestDataSource } from 'src/app/service/restdataSource';
import { StateArrayService } from 'src/app/service/state-array.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-interview-result',
  templateUrl: './interview-result.component.html',
  styleUrls: ['./interview-result.component.css'],
})
export class InterviewResultComponent implements OnInit, AfterViewInit {
  students!: Student[];
  currentInterviewRoundLevel!: number;
  selectedOption: string = 'All';
  selectedOrganisationId: number = 0;
  totalStudentsAttended: number = 0;
  interviewSchedules: any;
  selectionInformation: any;
  selectedScheduledDate: any = 'All';
  organisations: any;
  displayedColumns: string[] = [
    'studentId',
    'studentName',
    'completedInterviewRounds',
    'studentAadharNumber',
    'interviewResult',
    'action',
  ];
  dataSource!: MatTableDataSource<Student>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private restData: RestDataSource,
    private studentService: StudentService,
    private organisationService: OrganisationService,
    private utilService: StateArrayService,
    private scheduleService: InterviewScheduleService
  ) {
    // this.getStudents();
    this.dataSource = new MatTableDataSource(this.students);
  }

  ngOnInit(): void {
    // this.getStudentsInterviewResults();
    this.getOrganisations();
    this.getStudents();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllStudentsInterviewDetails() {
    this.restData.getStudents().subscribe({
      next: (resp) => {
        this.setInterviewLevel(resp);
        this.dataSource.data = resp;
      },
    });
  }

  getStudentInterviewResultsByOrgIdAndFinalResultDateAndSelection() {
    this.restData
      .getStudentInterviewResultsByOrgIdAndFinalResultDateAndSelection(
        this.selectedOrganisationId,
        this.selectedScheduledDate,
        this.selectedOption
      )
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.setInterviewLevel(resp);
          console.log(resp), (this.students = resp);
          this.dataSource.data = resp;
        },
      });
  }
  getStudentInterviewResultsByOrgIdAndFinalResultSelection() {
    this.restData
      .getStudentInterviewResultsByOrgIdAndFinalResultSelection(
        this.selectedOrganisationId,
        this.selectedOption
      )
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.setInterviewLevel(resp);
          console.log(resp), (this.students = resp);
          this.dataSource.data = resp;
        },
      });
  }
  getStudentInterviewResultsByOrgIdAndFinalResultDate() {
    this.restData
      .getStudentInterviewResultsByOrgIdAndFinalResultDate(
        this.selectedOrganisationId,
        this.selectedScheduledDate
      )
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.setInterviewLevel(resp);
          console.log(resp), (this.students = resp);
          this.dataSource.data = resp;
        },
      });
  }
  getStudentInterviewResultsByOrgId() {
    this.restData
      .getStudentInterviewResultsByOrgId(this.selectedOrganisationId)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.setInterviewLevel(resp);
          console.log(resp), (this.students = resp);
          this.dataSource.data = resp;
        },
      });
  }

  getStudentInterviewResultsByFinalResultDateAndSelection() {
    this.restData
      .getStudentInterviewResultsByFinalResultDateAndSelection(
        this.selectedScheduledDate,
        this.selectedOption
      )
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.setInterviewLevel(resp);
          console.log(resp), (this.students = resp);
          this.dataSource.data = resp;
        },
      });
  }

  getStudentInterviewResultsByFinalResultDate() {
    this.restData
      .getStudentInterviewResultsByFinalResultDate(this.selectedScheduledDate)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.setInterviewLevel(resp);
          console.log(resp), (this.students = resp);
          this.dataSource.data = resp;
        },
      });
  }

  getStudentInterviewResultsByFinalResultSelection() {
    this.restData
      .getStudentInterviewResultsByFinalResultSelection(this.selectedOption)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.setInterviewLevel(resp);
          console.log(resp), (this.students = resp);
          this.dataSource.data = resp;
        },
      });
  }

  getStudentInterviewResults() {
    this.restData.getStudents().subscribe({
      next: (resp) => {
        console.log(resp);
        this.setInterviewLevel(resp);
        console.log(resp), (this.students = resp);
        this.dataSource.data = resp;
      },
    });
  }
  getStudents() {
    console.log(this.selectedOrganisationId);
    console.log(
      this.selectedOrganisationId
      // this.selectedScheduledDate == 'All' &&
      // this.selectedOption == 'All'
    );
    console.log(this.selectedOrganisationId);
    if (
      this.selectedOrganisationId &&
      this.selectedScheduledDate == 'All' &&
      this.selectedOption == 'All'
    ) {
      console.log('p,a,a');
      this.getStudentInterviewResultsByOrgId();
      this.setStudentsCountByOrgId();
    }
    console.log(this.selectedOrganisationId);
    if (
      !this.selectedOrganisationId &&
      this.selectedScheduledDate == 'All' &&
      this.selectedOption == 'All'
    ) {
      this.getStudentInterviewResults();
      this.setStudentsCount();
    } else if (
      this.selectedOrganisationId &&
      this.selectedScheduledDate != 'All' &&
      this.selectedOption != 'All'
    ) {
      this.getStudentInterviewResultsByOrgIdAndFinalResultDateAndSelection();
      this.setStudentsCountByOrgIdAndInterviewFinalResultDate();
    } else if (
      this.selectedOrganisationId  &&
      this.selectedScheduledDate != 'All' &&
      this.selectedOption == 'All'
    ) {
      this.getStudentInterviewResultsByOrgIdAndFinalResultDate();
      this.setStudentsCountByOrgIdAndInterviewFinalResultDate();
    } else if (
      this.selectedOrganisationId &&
      this.selectedScheduledDate == 'All' &&
      this.selectedOption != 'All'
    ) {
      this.getStudentInterviewResultsByOrgIdAndFinalResultSelection();
      this.setStudentsCountByOrgId();
    } else if (
      !this.selectedOrganisationId &&
      this.selectedScheduledDate != 'All' &&
      this.selectedOption != 'All'
    ) {
      this.getStudentInterviewResultsByFinalResultDateAndSelection();
      this.setStudentsCountByInterviewFinalResultDate();
    } else if (
      !this.selectedOrganisationId  &&
      this.selectedScheduledDate != 'All' &&
      this.selectedOption == 'All'
    ) {
      this.getStudentInterviewResultsByFinalResultDate();
      this.setStudentsCountByInterviewFinalResultDate();
    } else if (
      !this.selectedOrganisationId &&
      this.selectedScheduledDate == 'All' &&
      this.selectedOption != 'All'
    ) {
      this.setStudentsCount();
      this.getStudentInterviewResultsByFinalResultSelection();
    }
    console.log(this.selectedOrganisationId);
  }

  setInterviewLevel(resp: Student[]) {
    resp.forEach((student) => {
      this.restData.getInterviewRoundsByStudentId(student.studentId).subscribe({
        next: (interviewRounds) => {
          const interviewRoundNumbers = interviewRounds.map(
            (interviewRound) => interviewRound.interviewRoundNumber
          );
          if (interviewRoundNumbers.length != 0) {
            student.completedInterviewRounds = Math.max.apply(
              Math,
              interviewRoundNumbers
            );
          } else {
            student.completedInterviewRounds = 0;
          }
        },
      });
    });
  }

  setStudentsCountByOrgIdAndInterviewFinalResultDate() {
    this.restData
      .getStudentsCountByOrgIdAndInterviewFinalResultDate(
        this.selectedOrganisationId,
        this.selectedScheduledDate
      )
      .subscribe({
        next: (resp) => {
          let sum = 0;
          resp.forEach((element: any) => {
            sum += element[1];
          });
          this.totalStudentsAttended = sum;
          this.selectionInformation = resp;
        },
      });
  }
  setStudentsCountByInterviewFinalResultDate() {
    this.restData
      .getStudentsCountByInterviewFinalResultDate(this.selectedScheduledDate)
      .subscribe({
        next: (resp) => {
          let sum = 0;
          resp.forEach((element: any) => {
            sum += element[1];
          });
          this.totalStudentsAttended = sum;
          this.selectionInformation = resp;
        },
      });
  }

  setStudentsCountByOrgId() {
    this.restData
      .getStudentsCountByOrgId(this.selectedOrganisationId)
      .subscribe({
        next: (resp) => {
          let sum = 0;
          resp.forEach((element: any) => {
            sum += element[1];
          });
          this.totalStudentsAttended = sum;
          this.selectionInformation = resp;
        },
      });
  }

  setStudentsCount() {
    this.restData.getStudentsCount().subscribe({
      next: (resp) => {
        let sum = 0;
        resp.forEach((element: any) => {
          sum += element[1];
        });
        this.totalStudentsAttended = sum;
        this.selectionInformation = resp;
      },
    });
  }

  getOrganisations() {
    console.log('organisations called');
    return this.restData.getOrganisations().subscribe({
      next: (resp) => {
        this.organisations = resp;
      },
    });
  }

  getInterviewStages() {
    return this.utilService.getInterviewStages();
  }
  getInterviewSchedulesByOrganisationId() {
    this.restData
      .getInterviewScheduleDatesByOrgId(this.selectedOrganisationId)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.interviewSchedules = resp;
        },
      });
  }

  getStyle(option: string) {
    return option == 'Selected'
      ? { 'background-color': 'green' }
      : option == 'Rejected'
      ? { 'background-color': 'red' }
      : option == 'On Hold'
      ? { 'background-color': 'orange' }
      : option == 'Not Attended'
      ? { 'background-color': 'black' }
      : {
          'font-weight': 'bold',
          'background-color': 'rgb(227 215 214 / 87%)',
          color: 'black',
        };
  }
}
