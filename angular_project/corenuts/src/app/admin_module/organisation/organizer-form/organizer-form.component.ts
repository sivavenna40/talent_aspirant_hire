import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Organizer } from 'src/app/model/organizer';
import { OrganisationService } from 'src/app/service/organisation.service';
import { OrganizerService } from 'src/app/service/organizer.service';
import { RestDataSource } from 'src/app/service/restdataSource';

@Component({
  selector: 'app-organizer-form',
  templateUrl: './organizer-form.component.html',
  styleUrls: ['./organizer-form.component.css'],
})
export class OrganizerFormComponent implements OnInit {
  organizerForm!: FormGroup;
  public submitType: string = 'save';

  constructor(
    private dialogRef: MatDialogRef<OrganizerFormComponent>,
    private formBuilder: FormBuilder,
    private router: Router,
    private restData: RestDataSource,
    private organizerService: OrganizerService,
    private organisatonService: OrganisationService,
    @Inject(MAT_DIALOG_DATA) private organizerData: Organizer
  ) {}

  ngOnInit() {
    this.organizerForm = this.formBuilder.group({
      organizerId: [''],
      organizerName: ['', Validators.required],
      organizerMobileNumber: ['', Validators.required],
      organizerGender: ['', Validators.required],
      organizerEmail: ['', [Validators.required, Validators.email]],
      organisation: this.formBuilder.group({
        organisationId: ['', Validators.required],
      }),
    });
    if (this.organizerData) {
      this.submitType = 'update';
      console.log(this.organizerData);
      this.organizerForm.patchValue({
        organizerId: this.organizerData.organizerId,
        organizerName: this.organizerData.organizerName,
        organizerMobileNumber: this.organizerData.organizerMobileNumber,
        organizerEmail: this.organizerData.organizerEmail,
        organizerGender: this.organizerData.organizerGender,
        organisation: {
          organisationId: this.organizerData.organisation.organisationId,
        },
      });
    }
  }

  submitOrganizer(): void {
    console.log(this.organizerForm.value);
    if (this.organizerForm.invalid) {
      return;
    }

    this.restData.saveOrganizer(this.organizerForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.dialogRef.close();
        this.organizerForm.reset();
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/home/organizer']);
          });
      },
    });
  }
  getOrganisations() {
    return this.organisatonService.getOrganisations();
  }
}
