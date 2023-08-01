import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Interviewer } from 'src/app/model/Interviewer';
import { InterviewerSkillService } from 'src/app/service/interviewer-skill.service';
import { InterviewerService } from 'src/app/service/interviewer.service';
import { RestDataSource } from 'src/app/service/restdataSource';
import { StateArrayService } from 'src/app/service/state-array.service';

@Component({
  selector: 'app-interviewer-form',
  templateUrl: './interviewer-form.component.html',
  styleUrls: ['./interviewer-form.component.css'],
})
export class InterviewerFormComponent implements OnInit {
  interviewerForm!: FormGroup;
  public submitType: string = 'save';
  states!: string[];
  constructor(
    private dialogRef: MatDialogRef<InterviewerFormComponent>,
    private formBuilder: FormBuilder,
    private restData: RestDataSource,
    private router: Router,
    private stateArrayService: StateArrayService,
    private interviewerSkillService: InterviewerSkillService,
    @Inject(MAT_DIALOG_DATA) private interviewerData: Interviewer
  ) {
    this.states = stateArrayService.getStates();
  }

  ngOnInit() {
    this.interviewerForm = this.formBuilder.group({
      interviewerId: [''],
      interviewerName: ['', Validators.required],
      interviewerAge: ['', Validators.required],
      interviewerGender: ['', Validators.required],
      interviewerMobileNumber: ['', Validators.required],
      interviewerEmail: ['', [Validators.required, Validators.email]],
      address: this.formBuilder.group({
        addressId: [''],
        street: ['', Validators.required],
        locality: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pincode: ['', Validators.required],
      }),
      interviewerSkills: this.formBuilder.array([]),
      interviewerSkillIds: [[], Validators.required],
    });
    if (this.interviewerData) {
      this.submitType = 'update';
      console.log(this.interviewerData);
      this.interviewerForm.patchValue({
        interviewerId: this.interviewerData.interviewerId,
        interviewerName: this.interviewerData.interviewerName,
        interviewerAge: this.interviewerData.interviewerAge,
        interviewerGender: this.interviewerData.interviewerGender,
        interviewerMobileNumber: this.interviewerData.interviewerMobileNumber,
        interviewerEmail: this.interviewerData.interviewerEmail,
        address: {
          addressId: this.interviewerData.address.addressId,
          street: this.interviewerData.address.street,
          city: this.interviewerData.address.city,
          pincode: this.interviewerData.address.pincode,
          locality: this.interviewerData.address.locality,
          state: this.interviewerData.address.state,
        },
        interviewerSkillIds: this.getInterviewSkillIds(),
      });
    }
  }

  getInterviewSkillIds() {
    return this.interviewerData.interviewerSkills.map(
      (interviewerSkill) => interviewerSkill.interviewerSkillId
    );
  }

  setInterviewSkills() {
    const selectedSkillIds = this.interviewerForm.get(
      'interviewerSkillIds'
    )?.value;
    const selectedSkills = selectedSkillIds.map((skillId: number) => ({
      interviewerSkillId: skillId,
    }));
    const updatedInterviewer = {
      ...this.interviewerForm.value,
      interviewerSkills: selectedSkills,
    };
    return updatedInterviewer;
  }

  submitInterviewer(): void {
    let updatedInterviewer = this.setInterviewSkills();
    console.log(updatedInterviewer);

    if (this.interviewerForm.invalid) {
      return;
    }

    this.restData.saveInterviewer(updatedInterviewer).subscribe({
      next: (res) => {
        console.log(res);
        this.dialogRef.close();
        this.interviewerForm.reset();
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/home/interviewer']);
          });
      },
    });
  }

  getInterviewerSkills() {
    return this.interviewerSkillService.getInterviewerSkills();
  }
}
