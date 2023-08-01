import {
  Component,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InterviewSkill } from 'src/app/model/interviewSkill';
import { InterviewSkillService } from 'src/app/service/interview-skill.service';
import { InterviewSkillFormComponent } from '../interview-skill-form/interview-skill-form.component';
import { RestDataSource } from 'src/app/service/restdataSource';

@Component({
  selector: 'app-interview-skill',
  templateUrl: './interview-skill.component.html',
  styleUrls: ['./interview-skill.component.css'],
})
export class InterviewSkillComponent
  implements OnInit, AfterViewInit, OnChanges
{
  interviewSkills!: InterviewSkill[];
  displayedColumns: string[] = [
    'interviewSkillId',
    'interviewSkillName',
    'action',
  ];
  dataSource!: MatTableDataSource<InterviewSkill>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private interviewSkillService: InterviewSkillService,
    private dialog: MatDialog,
    private restData: RestDataSource
  ) {
    this.dataSource = new MatTableDataSource();
    this.setDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.data = this.interviewSkillService.getInterviewSkills();
  }
  ngOnChanges() {
    this.dataSource.data = this.interviewSkillService.getInterviewSkills();
  }

  ngOnInit(): void {
    this.dataSource.data = this.interviewSkillService.getInterviewSkills();
  }

  setDataSource() {
    this.restData.getInterviewSkills().subscribe({
      next: (resp) => {
        console.log(resp);
        this.interviewSkills = resp;
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

  addSkill() {
    this.dialog.open(InterviewSkillFormComponent);
  }

  deleteSkill(interviewSkill: InterviewSkill) {
    console.log('inside delete skill :' + interviewSkill.interviewSkillId);
    this.restData
      .deleteInterviewSkillById(interviewSkill.interviewSkillId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.setDataSource();
        },
      });
  }

  editSkill(interviewSkill: InterviewSkill) {
    console.log(interviewSkill);
    this.dialog.open(InterviewSkillFormComponent, {
      data: interviewSkill,
    });
  }
}
