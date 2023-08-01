import { group } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InterviewSchedule } from 'src/app/model/interviewSchedule';
import { InterviewScheduleService } from 'src/app/service/interview-schedule.service';
import { InterviewerService } from 'src/app/service/interviewer.service';
import { OrganisationService } from 'src/app/service/organisation.service';
import { RestDataSource } from 'src/app/service/restdataSource';

@Component({
  selector: 'app-interview-schedule-form',
  templateUrl: './interview-schedule-form.component.html',
  styleUrls: ['./interview-schedule-form.component.css'],
})
export class InterviewScheduleFormComponent implements OnInit {
  interviewScheduleForm!: FormGroup;
  public submitType: string = 'save';
  public selectedDate!: any;
  constructor(
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<InterviewScheduleFormComponent>,
    private formBuilder: FormBuilder,
    private restData: RestDataSource,
    private router: Router,
    private interviewScheduleService: InterviewScheduleService,
    private organisationService: OrganisationService,
    private interviewerService: InterviewerService,
    @Inject(MAT_DIALOG_DATA) private interviewScheduleData: InterviewSchedule
  ) {}

  ngOnInit() {
    this.interviewScheduleForm = this.formBuilder.group({
      interviewScheduleId: [''],
      interviewScheduleDate: [this.selectedDate, Validators.required],
      organisation: this.formBuilder.group({
        organisationId: ['', Validators.required],
      }),
      interviewers: this.formBuilder.array([]),
      interviewerIds: [[], Validators.required],
    });
    if (this.interviewScheduleData) {
      this.selectedDate = this.interviewScheduleData.interviewScheduleDate;
      this.submitType = 'update';
      console.log(this.interviewScheduleData);
      this.interviewScheduleForm.patchValue({
        interviewScheduleId: this.interviewScheduleData.interviewScheduleId,
        organisation: {
          organisationId:
            this.interviewScheduleData.organisation.organisationId,
        },
        interviewerIds: this.getInterviewerIds(),
      });
    }
  }

  getInterviewerIds() {
    return this.interviewScheduleData.interviewers.map(
      (interviewer) => interviewer.interviewerId
    );
  }

  setInterviewInterviewers() {
    const selectedInterviewerIds =
      this.interviewScheduleForm.get('interviewerIds')?.value;
    console.log(selectedInterviewerIds);
    const selectedInterviewers = selectedInterviewerIds?.map(
      (interviewerId: number) => ({
        interviewerId: interviewerId,
      })
    );
    const updatedInterviewSchedule = {
      ...this.interviewScheduleForm.value,
      interviewers: selectedInterviewers,
    };
    return updatedInterviewSchedule;
  }

  submitInterviewSchedule(): void {
    let formattedDate = this.datePipe.transform(
      this.selectedDate,
      'yyyy-MM-dd'
    );

    console.log(this.selectedDate);
    this.interviewScheduleForm.patchValue({
      interviewScheduleDate: formattedDate,
    });

    let updatedInterviewSchedule = this.setInterviewInterviewers();
    console.log(updatedInterviewSchedule);
    if (this.interviewScheduleForm.invalid) {
      return;
    }
    this.restData.saveInterviewSchedule(updatedInterviewSchedule).subscribe({
      next: (res) => {
        console.log(res);
        this.dialogRef.close();
        this.interviewScheduleForm.reset();
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/home/schedule']);
          });
      },
    });
  }

  getInterviewers() {
    return this.interviewerService.getInterviewers();
  }

  getOrganisations() {
    return this.organisationService.getOrganisations();
  }
}
