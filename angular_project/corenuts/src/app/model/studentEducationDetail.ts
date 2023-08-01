import { InterviewerSkill } from './interviewerSkill';

export interface StudentEducationDetail {
  studentEducationDetailId: number;
  degree: string;
  degreeStream: string;
  tenthAggregate: number;
  twelthAggregate: number;
  diplomaAggregate: number;
  degreeAggregate: number;
  mastersAggregate: number;
  yearOfPassout: Date;
  primarySkill: InterviewerSkill;
  secondarySkill: InterviewerSkill;
  otherSkills: string;
}
