import { Injectable } from '@angular/core';
import { RestDataSource } from './restdataSource';
import { Organizer } from '../model/organizer';

@Injectable({
  providedIn: 'root',
})
export class OrganizerService {
  organizers!: Organizer[];

  constructor(private restData: RestDataSource) {
    restData.getOrganizers().subscribe({
      next: (data) => {
        this.organizers = data;
      },
    });
  }

  getOrganizers() {
    return this.organizers;
  }

  saveOrganizer(organizer: Organizer) {
    this.restData.saveOrganizer(organizer).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }

  deletOrganizerById(organizerId: number) {
    this.restData.deleteOrganizerById(organizerId).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
