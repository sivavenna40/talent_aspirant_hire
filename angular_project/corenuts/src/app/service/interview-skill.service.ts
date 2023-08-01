import { Injectable } from '@angular/core';
import { RestDataSource } from './restdataSource';
import { InterviewSkill } from '../model/interviewSkill';

@Injectable({
  providedIn: 'root',
})
export class InterviewSkillService {
  interviewSkills!: InterviewSkill[];
  interviewSkill!: InterviewSkill;

  constructor(private restData: RestDataSource) {
    restData.getInterviewSkills().subscribe({
      next: (data) => {
        this.interviewSkills = data;
        
        console.log(this.interviewSkills, 'rest');
      },
    });
  }

  getInterviewSkills() {
    // console.log(this.interviewSkills,"service")
    return this.interviewSkills;
  }

  saveInterviewSkill(interviwSkill: InterviewSkill) {
    this.restData.saveInterviewSkill(interviwSkill).subscribe({
      next: (res:any) => {
        this.interviewSkills.push(res)
        console.log(res);
         console.log(this.interviewSkills);
      },
      error: (err) => console.log(err),
    });
  }

  deletInterviewSkillById(interviewSkillId: number) {
    this.restData.deleteInterviewSkillById(interviewSkillId).subscribe({
      next: (res) => {
        this.interviewSkills.slice(interviewSkillId,1);
        console.log(res)
      },
      error: (err) => console.log(err),
    });
  }
}
