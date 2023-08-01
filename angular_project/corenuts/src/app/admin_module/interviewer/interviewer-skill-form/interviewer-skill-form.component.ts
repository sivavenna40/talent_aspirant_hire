import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InterviewerSkillService } from 'src/app/service/interviewer-skill.service';
import { RestDataSource } from 'src/app/service/restdataSource';

@Component({
  selector: 'app-interviewer-skill-form',
  templateUrl: './interviewer-skill-form.component.html',
  styleUrls: ['./interviewer-skill-form.component.css'],
})
export class InterviewerSkillFormComponent implements OnInit {
  public submitType: string = 'save';
  public interviewerSkillForm!: FormGroup;
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<InterviewerSkillFormComponent>,
    private interviewerSkillService: InterviewerSkillService,
    private fb: FormBuilder,
    private restData: RestDataSource,
    @Inject(MAT_DIALOG_DATA) private interviewerSkillData: any
  ) {}

  ngOnInit(): void {
    this.interviewerSkillForm = this.fb.group({
      interviewerSkillId: [''],
      interviewerSkillName: ['', Validators.required],
    });

    if (this.interviewerSkillData) {
      this.submitType = 'update';
      this.interviewerSkillForm.setValue({
        interviewerSkillId: this.interviewerSkillData.interviewerSkillId,
        interviewerSkillName: this.interviewerSkillData.interviewerSkillName,
      });
    }
  }

  submitSkill() {
    if (this.interviewerSkillForm.invalid) {
      return;
    }
    console.log(this.interviewerSkillForm.value);
    this.restData
      .saveInterviewerSkill(this.interviewerSkillForm.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.interviewerSkillForm.reset();
          this.dialogRef.close();
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/home/interviewer-skill']);
            });
        },
      });
  }
}
