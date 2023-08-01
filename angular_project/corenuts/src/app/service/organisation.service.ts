import { Injectable } from '@angular/core';
import { RestDataSource } from './restdataSource';
import { Organisation } from '../model/organisation';

@Injectable({
  providedIn: 'root',
})
export class OrganisationService {
  organisations!: Organisation[];

  constructor(private restData: RestDataSource) {
    restData.getOrganisations().subscribe({
      next: (data) => {
        this.organisations = data;
      },
    });
  }

  getOrganisations() {
    return this.organisations;
  }

  saveOrganisation(organisation: Organisation) {
    this.restData.saveOrganisation(organisation).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }

  deletOrganisationById(organisationId: number) {
    this.restData.deleteOrganisationById(organisationId).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
