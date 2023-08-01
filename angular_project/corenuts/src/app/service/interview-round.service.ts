import { Injectable } from '@angular/core';
import { RestDataSource } from './restdataSource';
import { InterviewRound } from '../model/interviewRound';

@Injectable({
  providedIn: 'root',
})
export class InterviewRoundService {
  interviewRounds!: InterviewRound[];

  constructor(private restData: RestDataSource) {
    restData.getInterviewRounds().subscribe({
      next: (data) => {
        this.interviewRounds = data;
      },
    });
  }

  getInterviewRounds() {
    return this.interviewRounds;
  }

  saveInterviewRound(interviwSkill: InterviewRound) {
    this.restData.saveInterviewRound(interviwSkill).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }

  deletInterviewRoundById(interviewRoundId: number) {
    this.restData.deleteInterviewRoundById(interviewRoundId).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
