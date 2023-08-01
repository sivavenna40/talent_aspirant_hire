import { Address } from './address';
import { InterviewerSkill } from './interviewerSkill';

export interface Interviewer {
  interviewerId: number;
  interviewerName: string;
  interviewerGender: string;
  interviewerAge: string;
  interviewerEmail: string;
  interviewerMobileNumber: number;
  interviewerSkills: InterviewerSkill[];
  address: Address;
}
