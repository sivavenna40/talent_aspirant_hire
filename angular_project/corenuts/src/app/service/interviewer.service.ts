import { Injectable } from '@angular/core';
import { RestDataSource } from './restdataSource';
import { Interviewer } from '../model/Interviewer';

@Injectable({
  providedIn: 'root',
})
export class InterviewerService {
  interviewers!: Interviewer[];

  constructor(private restData: RestDataSource) {
    restData.getInterviewers().subscribe({
      next: (data) => {
        this.interviewers = data;
      },
    });
  }

  getInterviewers() {
    return this.interviewers;
  }

  saveInterviewer(interviewer: Interviewer) {
    this.restData.saveInterviewer(interviewer).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }

  deletInterviewerById(interviewerId: number) {
    this.restData.deleteInterviewerById(interviewerId).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
