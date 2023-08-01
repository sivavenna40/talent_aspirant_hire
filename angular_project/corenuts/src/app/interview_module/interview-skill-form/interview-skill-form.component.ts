import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InterviewSkillService } from 'src/app/service/interview-skill.service';
import { RestDataSource } from 'src/app/service/restdataSource';

@Component({
  selector: 'app-interview-skill-form',
  templateUrl: './interview-skill-form.component.html',
  styleUrls: ['./interview-skill-form.component.css'],
})
export class InterviewSkillFormComponent implements OnInit {
  public submitType: string = 'save';
  public interviewSkillForm!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<InterviewSkillFormComponent>,
    private router: Router,
    private restData: RestDataSource,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private interviewSkillData: any
  ) {}

  ngOnInit(): void {
    this.interviewSkillForm = this.fb.group({
      interviewSkillId: [''],
      interviewSkillName: ['', Validators.required],
    });

    if (this.interviewSkillData) {
      this.submitType = 'update';
      this.interviewSkillForm.setValue({
        interviewSkillId: this.interviewSkillData.interviewSkillId,
        interviewSkillName: this.interviewSkillData.interviewSkillName,
      });
    }
  }

  submitSkill() {
    if (this.interviewSkillForm.invalid) {
      return;
    }
    this.restData.saveInterviewSkill(this.interviewSkillForm.value).subscribe({
      next: (res) => {
        console.log(res, 'interviewSkill form');
        this.interviewSkillForm.reset();
        this.dialogRef.close();
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/home/interview-skill']);
          });
      },
    });
  }
}
