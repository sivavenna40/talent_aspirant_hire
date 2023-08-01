import { Interviewer } from './Interviewer';
import { Organisation } from './organisation';

export interface InterviewSchedule {
  interviewScheduleId: number;
  interviewScheduleDate: Date;
  organisation: Organisation;
  interviewers: Interviewer[];
}
