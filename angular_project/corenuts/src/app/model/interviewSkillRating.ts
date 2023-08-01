import { Address } from './address';
import { InterviewSkill } from './interviewSkill';

export interface InterviewSkillRating {
  interviewSkillRatingId: number;
  interviewSkillRatingAchieved: number;
  interviewSkillFeedback: string;
  interviewSkill: InterviewSkill;
}
