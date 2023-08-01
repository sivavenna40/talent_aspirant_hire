import { Injectable } from '@angular/core';
import { RestDataSource } from './restdataSource';
import { InterviewRatingPoint } from '../model/interviewRatingPoint';

@Injectable({
  providedIn: 'root',
})
export class InterviewRatingPointService {
  interviewRatingPoints!: InterviewRatingPoint[];
  interviewRatingPoint!: InterviewRatingPoint;

  constructor(private restData: RestDataSource) {
    restData.getInterviewRatingPoints().subscribe({
      next: (data) => {
        this.interviewRatingPoints = data;
        
        console.log(this.interviewRatingPoints, 'rest');
      },
    });
  }

  getInterviewRatingPoints() {
    // console.log(this.interviewRatingPoints,"service")
    return this.interviewRatingPoints;
  }

  saveInterviewRatingPoint(interviwSkill: InterviewRatingPoint) {
    this.restData.saveInterviewRatingPoint(interviwSkill).subscribe({
      next: (res:any) => {
        this.interviewRatingPoints.push(res)
        console.log(res);
         console.log(this.interviewRatingPoints);
      },
      error: (err) => console.log(err),
    });
  }

  deleteInterviewRatingPointById(interviewRatingPointId: number) {
    this.restData.deleteInterviewRatingPointById(interviewRatingPointId).subscribe({
      next: (res) => {
        this.interviewRatingPoints.slice(interviewRatingPointId,1);
        console.log(res)
      },
      error: (err) => console.log(err),
    });
  }
}
