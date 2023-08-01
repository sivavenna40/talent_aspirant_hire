import { Injectable } from '@angular/core';
import { RestDataSource } from './restdataSource';
import { Admin } from '../model/admin';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  admins!: Admin[];

  constructor(private restData: RestDataSource) {
    restData.getAdmins().subscribe({
      next: (data) => {
        this.admins = data;
      },
    });
  }

  getAdmins() {
    return this.admins;
  }

  saveAdmin(interviwSkill: Admin) {
    this.restData.saveAdmin(interviwSkill).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err),
    });
  }

  deletAdminById(adminId: number) {
    this.restData.deleteAdminById(adminId).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
