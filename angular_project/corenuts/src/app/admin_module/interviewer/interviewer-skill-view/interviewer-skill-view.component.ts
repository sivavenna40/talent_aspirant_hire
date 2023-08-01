import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InterviewerSkill } from 'src/app/model/interviewerSkill';
import { InterviewerSkillService } from 'src/app/service/interviewer-skill.service';
import { RestDataSource } from 'src/app/service/restdataSource';
import { InterviewerSkillFormComponent } from '../interviewer-skill-form/interviewer-skill-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interviewer-skill-view',
  templateUrl: './interviewer-skill-view.component.html',
  styleUrls: ['./interviewer-skill-view.component.css'],
})
export class InterviewerSkillViewComponent implements OnInit, AfterViewInit {
  interviewerSkills!: InterviewerSkill[];
  displayedColumns: string[] = [
    'interviewerSkillId',
    'interviewerSkillName',
    'action',
  ];
  dataSource!: MatTableDataSource<InterviewerSkill>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private interviewerSkillService: InterviewerSkillService,
    private dialog: MatDialog,
    private restData: RestDataSource
  ) {
    this.dataSource = new MatTableDataSource();
    this.getInterviewerSkills();
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
  getInterviewerSkills() {
    this.restData.getInterviewerSkills().subscribe({
      next: (resp) => {
        console.log(resp);
        this.interviewerSkills = resp;
        this.dataSource.data = resp;
      },
    });
  }

  addSkill() {
    this.dialog.open(InterviewerSkillFormComponent);
  }

  deleteSkill(interviewerSkill: InterviewerSkill) {
    this.restData
      .deleteInterviewerSkillById(interviewerSkill.interviewerSkillId)
      .subscribe({
        next: (res) => {
          this.getInterviewerSkills();
        },
        error: (err) => console.log(err),
      });
  }

  editSkill(interviewerSkill: InterviewerSkill) {
    console.log(interviewerSkill);
    this.dialog.open(InterviewerSkillFormComponent, {
      data: interviewerSkill,
    });
  }
}
