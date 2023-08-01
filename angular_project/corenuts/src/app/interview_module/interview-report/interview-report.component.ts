import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InterviewRound } from 'src/app/model/interviewRound';

@Component({
  selector: 'app-interview-report',
  templateUrl: './interview-report.component.html',
  styleUrls: ['./interview-report.component.css'],
})
export class InterviewReportComponent {
  interviewRoundData: InterviewRound;
  constructor(@Inject(MAT_DIALOG_DATA) private interviewRound: any) {
    this.interviewRoundData = interviewRound;
    console.log(interviewRound);
  }
}
