import { Address } from './address';
import { InterviewRound } from './interviewRound';
import { Organisation } from './organisation';
import { StudentEducationDetail } from './studentEducationDetail';
import { StudentExamMark } from './studentExamMark';

export interface Student {
  studentId: number;
  studentName: string;
  studentGender: string;
  studentAge: string;
  studentDob: string;
  studentEmail: string;
  studentMobileNumber: number;
  studentAadharNumber: number;
  interviewFinalResult: string;
  interviewFinalResultDate: Date;
  address: Address;
  organisation: Organisation;
  interviewRounds: InterviewRound[];
  studentEducationDetail: StudentEducationDetail;
  studentExamMark: StudentExamMark;
  completedInterviewRounds: number;
}
