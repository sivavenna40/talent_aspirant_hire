import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrganizerService } from 'src/app/service/organizer.service';
import { OrganizerFormComponent } from '../organizer-form/organizer-form.component';
import { RestDataSource } from 'src/app/service/restdataSource';
import { Organizer } from 'src/app/model/organizer';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer-view.component.html',
  styleUrls: ['./organizer-view.component.css'],
})
export class OrganizerViewComponent implements OnInit, AfterViewInit {
  organizers!: Organizer[];
  displayedColumns: string[] = [
    'organizerId',
    'organizerName',
    'organizerGender',
    'organizerMobileNumber',
    'organizerEmail',
    'organisation',
    'action',
  ];
  dataSource!: MatTableDataSource<Organizer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private organizerService: OrganizerService,
    private dialog: MatDialog,
    private restData: RestDataSource
  ) {
    this.dataSource = new MatTableDataSource();
    this.setDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {}

  setDataSource(){
     this.restData.getOrganizers().subscribe({
       next: (resp) => {
         console.log(resp);
         this.organizers = resp;
         this.dataSource.data = resp;
       },
     });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getOrganizers() {
    return this.organizerService.getOrganizers();
  }

  addSkill() {
    this.dialog.open(OrganizerFormComponent);
  }

  deleteSkill(organizer: Organizer) {
    console.log('inside delete skill :' + organizer.organizerId);
    this.restData.deleteOrganizerById(organizer.organizerId).subscribe({
      next:(res)=>{
        console.log(res);
        this.setDataSource();
      }
    });
  }

  editSkill(organizer: Organizer) {
    console.log(organizer);
    this.dialog.open(OrganizerFormComponent, {
      data: organizer,
    });
  }
}
