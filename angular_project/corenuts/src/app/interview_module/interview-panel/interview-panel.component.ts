import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/model/student';
import { RestDataSource } from 'src/app/service/restdataSource';
import { StudentFullViewComponent } from '../student/student-full-view/student-full-view.component';
import { InterviewSkill } from 'src/app/model/interviewSkill';
import { InterviewRoundService } from 'src/app/service/interview-round.service';
import { StudentExamMark } from 'src/app/model/studentExamMark';
import { InterviewRound } from 'src/app/model/interviewRound';
import { InterviewReportComponent } from '../interview-report/interview-report.component';
import { StudentExamMarkService } from 'src/app/service/studen-exam-mark.service';
import { StudentService } from 'src/app/service/student.service';
import { InterviewRatingPoint } from 'src/app/model/interviewRatingPoint';
import { InterviewRatingPointService } from 'src/app/service/interview-rating-point';
import { CommonService } from 'src/app/service/common.service';
import { Interviewer } from 'src/app/model/Interviewer';

@Component({
  selector: 'app-interview-panel',
  templateUrl: './interview-panel.component.html',
  styleUrls: ['./interview-panel.component.css'],
})
export class InterviewPanelComponent implements OnInit {
  studentId: any;
  finalResult!: string;
  isChecked!: boolean;
  studentExamMark!: StudentExamMark;
  interviewRoundForm!: FormGroup;
  studentExamMarkForm!: FormGroup;
  studentAchievedMarks!: number;
  studentInterviewRounds!: InterviewRound[];
  student!: Student;
  studentFinalResultForm!: FormGroup;
  currentInterviewRoundLevel: number = 1;
  interviewSkills!: InterviewSkill[];
  points = [1, 2, 3, 4, 5];
  public interviewer!: Interviewer;
  public role: any;
  public userEmail: any;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private repo: RestDataSource,
    private formBuilder: FormBuilder,
    private studentExamMarkService: StudentExamMarkService,
    private interviewRatingPointService: InterviewRatingPointService,
    private studentService: StudentService,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.studentId = paramMap.get('studentId');
      console.log(this.studentId);
    });
    this.userEmail = this.commonService.getcurrentuser();
    this.role = this.commonService.getrole();
    console.log(this.role + ':' + this.userEmail);
    if (this.role === 'Interviewer') {
      this.repo.getInterviewerByInterviewerEmail(this.userEmail).subscribe({
        next: (data) => {
          console.log(data);
          this.interviewer = data;
        },
      });
    }
    this.createStudentExamMarkForm();

    this.repo.getInterviewRoundsByStudentId(this.studentId).subscribe({
      next: (interviewRounds) => {
        const interviewRoundNumbers = interviewRounds.map(
          (interviewRound) => interviewRound.interviewRoundNumber
        );
        if (interviewRoundNumbers.length != 0) {
          this.currentInterviewRoundLevel =
            Math.max.apply(Math, interviewRoundNumbers) + 1;
          this.studentInterviewRounds = interviewRounds;
          console.log(interviewRounds);
        }
      },
    });

    this.repo.getInterviewSkills().subscribe((skills) => {
      this.interviewSkills = skills;
      this.createInterviewRoundForm();
    });

    this.repo.getStudentById(this.studentId)?.subscribe((data) => {
      this.student = data;
    });
    this.repo.getExamMarkByStudentId(this.studentId).subscribe({
      next: (examMarks) => {
        console.log(examMarks);
        this.studentExamMark = examMarks;
        this.studentAchievedMarks = this.studentExamMark?.studentAchievedMarks;
      },
    });
    this.studentFinalResultForm = this.formBuilder.group({
      studentId: [this.studentId],
      interviewFinalResult: ['', Validators.required],
    });
  }

  createStudentExamMarkForm() {
    this.studentExamMarkForm = this.formBuilder.group({
      studentExamMarkId: [''],
      studentAchievedMarks: ['', Validators.required],
      student: this.formBuilder.group({
        studentId: [this.studentId],
      }),
    });
  }

  createInterviewRoundForm(): void {
    this.interviewRoundForm = this.formBuilder.group({
      interviewRoundResult: [''],
      interviewRoundFeedback: [''],
      interviewSkillRatings: this.formBuilder.array(
        this.interviewSkills.map((skill) =>
          this.formBuilder.group({
            interviewSkill: this.formBuilder.group({
              interviewSkillId: [skill.interviewSkillId, Validators.required],
              interviewSkillName: [
                skill.interviewSkillName,
                Validators.required,
              ],
            }),
            interviewSkillFeedback: ['', Validators.required],
            interviewSkillRatingAchieved: ['0', Validators.required],
          })
        )
      ),
      interviewRoundId: [''],
      interviewer: this.formBuilder.group({
        interviewerId: [this.interviewer.interviewerId],
      }),
      interviewRoundNumber: [this.currentInterviewRoundLevel],
      student: this.formBuilder.group({
        studentId: [this.studentId],
      }),
    });
  }

  submitInterviewRound(): void {
    if (this.studentExamMarkForm.valid) {
      this.studentExamMarkService.saveStudentExamMark(
        this.studentExamMarkForm.value
      );
    }
    this.setFianlResult();
    if (this.studentFinalResultForm.valid) {
      this.studentService.updateStudent(this.studentFinalResultForm.value);
    }
    this.repo.saveInterviewRound(this.interviewRoundForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.interviewRoundForm.reset();
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/home/interview-list']);
          });
      },
    });
  }

  setFianlResult() {
    if (this.isChecked) {
      this.finalResult = 'Selected';
    } else if (
      this.interviewRoundForm.get('interviewRoundResult')?.value === 'Rejected'
    ) {
      this.finalResult = 'Rejected';
    } else if (
      this.interviewRoundForm.get('interviewRoundResult')?.value === 'On Hold'
    ) {
      this.finalResult = 'On Hold';
    } else if (
      this.interviewRoundForm.get('interviewRoundResult')?.value === 'Selected'
    ) {
      this.finalResult = 'In Progress';
    }
    this.studentFinalResultForm.patchValue({
      interviewFinalResult: this.finalResult,
      // Add more fields and their values if needed
    });
  }

  openStudentDetails(studentId: number) {
    this.dialog.open(StudentFullViewComponent, {
      data: studentId,
    });
  }

  openLevelDetails(round: any) {
    console.log(round);
    this.dialog.open(InterviewReportComponent, {
      data: round,
    });
  }

  getInterviewRatingPoints() {
    return this.interviewRatingPointService.getInterviewRatingPoints();
  }
}
