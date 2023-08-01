import { Injectable } from '@angular/core';
import { RestDataSource } from './restdataSource';
import { InterviewerSkill } from '../model/interviewerSkill';

@Injectable({
  providedIn: 'root',
})
export class InterviewerSkillService {
  interviewerSkills!: InterviewerSkill[];
  interviewerSkill!: InterviewerSkill;

  constructor(private restData: RestDataSource) {
    restData.getInterviewerSkills().subscribe({
      next: (data) => {
        this.interviewerSkills = data;
      },
    });
  }

  getInterviewerSkills() {
    return this.interviewerSkills;
  }

  saveInterviewerSkill(interviewerSkill: InterviewerSkill) {
    this.restData.saveInterviewerSkill(interviewerSkill).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }

  deletInterviewerSkillById(interviewerSkillId: number) {
    this.restData.deleteInterviewerSkillById(interviewerSkillId).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
