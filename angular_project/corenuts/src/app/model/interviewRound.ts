import { Interviewer } from './Interviewer';
import { InterviewSkillRating } from './interviewSkillRating';
import { Student } from './student';

export interface InterviewRound {
  interviewRoundId: number;
  interviewRoundNumber: number;
  interviewRoundFeedback: string;
  interviewRoundResult: string;
  interviewRoundDate: Date;
  interviewer: Interviewer;
  student: Student;
  interviewSkillRatings: InterviewSkillRating[];
}
