import { Injectable } from '@angular/core';
import { RestDataSource } from './restdataSource';
import { InterviewSchedule } from '../model/interviewSchedule';

@Injectable({
  providedIn: 'root',
})
export class InterviewScheduleService {
  interviewSchedules!: InterviewSchedule[];

  constructor(private restData: RestDataSource) {
    restData.getInterviewSchedules().subscribe({
      next: (data) => {
        this.interviewSchedules = data;
      },
    });
  }

  getInterviewSchedules() {
    return this.interviewSchedules;
  }

  saveInterviewSchedule(interviwSkill: InterviewSchedule) {
    this.restData.saveInterviewSchedule(interviwSkill).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }

  deletInterviewScheduleById(interviewScheduleId: number) {
    this.restData.deleteInterviewScheduleById(interviewScheduleId).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
