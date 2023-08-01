import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Organisation } from 'src/app/model/organisation';
import { RestDataSource } from 'src/app/service/restdataSource';
import { StateArrayService } from 'src/app/service/state-array.service';

@Component({
  selector: 'app-organisation-form',
  templateUrl: './organisation-form.component.html',
  styleUrls: ['./organisation-form.component.css'],
})
export class OrganisationFormComponent implements OnInit {
  organisationForm!: FormGroup;
  public submitType: string = 'save';

  constructor(
    private dialogRef: MatDialogRef<OrganisationFormComponent>,
    private formBuilder: FormBuilder,
    private restData: RestDataSource,
    private stateArrayService: StateArrayService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private organisationData: Organisation
  ) {}

  ngOnInit() {
    this.organisationForm = this.formBuilder.group({
      organisationId: [''],
      organisationName: ['', Validators.required],
      organisationMobileNumber: ['', Validators.required],
      organisationEmail: ['', [Validators.required, Validators.email]],
      address: this.formBuilder.group({
        addressId: [''],
        street: ['', Validators.required],
        locality: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pincode: ['', Validators.required],
      }),
    });
    if (this.organisationData) {
      this.submitType = 'update';
      console.log(this.organisationData);
      this.organisationForm.patchValue({
        organisationId: this.organisationData.organisationId,
        organisationName: this.organisationData.organisationName,
        organisationMobileNumber:
          this.organisationData.organisationMobileNumber,
        organisationEmail: this.organisationData.organisationEmail,
        address: {
          addressId: this.organisationData.address.addressId,
          street: this.organisationData.address.street,
          city: this.organisationData.address.city,
          pincode: this.organisationData.address.pincode,
          locality: this.organisationData.address.locality,
          state: this.organisationData.address.state,
        },
      });
    }
  }

  getStates() {
    return this.stateArrayService.getStates();
  }

  submitOrganisation(): void {
    console.log(this.organisationForm.value);
    if (this.organisationForm.invalid) {
      return;
    }
    this.restData.saveOrganisation(this.organisationForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.dialogRef.close();
        this.organisationForm.reset();
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/home/organisation']);
          });
      },
    });
  }
}
