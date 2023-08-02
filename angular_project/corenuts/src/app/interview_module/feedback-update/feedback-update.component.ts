import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InterviewRound } from 'src/app/model/interviewRound';
import { Student } from 'src/app/model/student';
import { InterviewRoundService } from 'src/app/service/interview-round.service';
import { ReloadService } from 'src/app/service/reloadService';
import { RestDataSource } from 'src/app/service/restdataSource';
import { StudentExamMarkService } from 'src/app/service/studen-exam-mark.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-feedback-update',
  templateUrl: './feedback-update.component.html',
  styleUrls: ['./feedback-update.component.css'],
})
export class FeedbackUpdateComponent implements OnInit {
  interviewRound: InterviewRound;
  finalResult!: string;
  interviewRoundForm!: FormGroup;
  reInterviewValue = null;
  points = [1, 2, 3, 4, 5];
  student!: Student;
  studentFinalResultForm!: FormGroup;
  studentExamMarkForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) private round: InterviewRound,
    private fb: FormBuilder,
    private restData: RestDataSource,
    private router: Router,
    private studentService: StudentService,
    private studentExamMarkService: StudentExamMarkService,
    private dialogRef: MatDialogRef<FeedbackUpdateComponent>
  ) {
    this.interviewRound = round;
    this.student = round.student;
  }
  ngOnInit(): void {
    this.createInterviewRoundForm();
    this.createStudentFinalResultForm();
    this.createStudentExamMarkForm();
  }

  createStudentExamMarkForm() {
    this.studentExamMarkForm = this.fb.group({
      studentExamMarkId: [this.student.studentExamMark.studentExamMarkId],
      studentAchievedMarks: [
        this.student.studentExamMark.studentAchievedMarks,
        Validators.required,
      ],
      student: this.fb.group({
        studentId: [this.student.studentId],
      }),
    });
  }

  createStudentFinalResultForm() {
    this.studentFinalResultForm = this.fb.group({
      studentId: [this.student.studentId],
      interviewFinalResult: [
        this.student.interviewFinalResult,
        Validators.required,
      ],
    });
  }
  createInterviewRoundForm(): void {
    this.interviewRoundForm = this.fb.group({
      interviewRoundId: [this.interviewRound.interviewRoundId],
      interviewRoundResult: [this.interviewRound.interviewRoundResult],
      interviewRoundFeedback: [this.interviewRound.interviewRoundFeedback],
      interviewSkillRatings: this.fb.array(
        this.interviewRound.interviewSkillRatings.map((rating) =>
          this.fb.group({
            interviewSkill: this.fb.group({
              interviewSkillId: [
                rating.interviewSkill.interviewSkillId,
                Validators.required,
              ],
              interviewSkillName: [
                rating.interviewSkill.interviewSkillName,
                Validators.required,
              ],
            }),
            interviewSkillFeedback: [
              rating.interviewSkillFeedback,
              Validators.required,
            ],
            interviewSkillRatingAchieved: [
              rating.interviewSkillRatingAchieved,
              Validators.required,
            ],
          })
        )
      ),
      interviewer: this.fb.group({
        interviewerId: [this.interviewRound.interviewer.interviewerId],
      }),
      interviewRoundNumber: [this.interviewRound.interviewRoundNumber],
      student: this.fb.group({
        studentId: [this.interviewRound.student.studentId],
      }),
    });
  }

  updateInterviewRound() {
    if (
      this.interviewRoundForm.get('interviewRoundResult')?.value === 'Rejected'
    ) {
      this.finalResult = 'Rejected';
    } else if (
      this.interviewRoundForm.get('interviewRoundResult')?.value === 'On Hold'
    ) {
      this.finalResult = 'On Hold';
    } else if (
      this.interviewRoundForm.get('interviewRoundResult')?.value ===
        'Selected' &&
      this.studentFinalResultForm.get('interviewFinalResult')?.value !=
        'Selected'
    ) {
      this.finalResult = 'In Progress';
    } else {
      this.finalResult = 'Selected';
    }
    this.studentFinalResultForm.patchValue({
      interviewFinalResult: this.finalResult,
      // Add more fields and their values if needed
    });
    if (this.studentExamMarkForm.valid) {
      this.studentExamMarkService.saveStudentExamMark(
        this.studentExamMarkForm.value
      );
      // if (this.studentFinalResultForm.valid) {
      //   this.studentService.updateStudent(this.studentFinalResultForm.value);
      // }
      this.studentService.updateStudent(this.studentFinalResultForm.value);
    }

    this.restData.saveInterviewRound(this.interviewRoundForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.interviewRoundForm.reset();
        this.dialogRef.close();
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([
              '/home/feedback-detail',
              this.student.studentId,
            ]);
          });
      },
    });
  }
}
