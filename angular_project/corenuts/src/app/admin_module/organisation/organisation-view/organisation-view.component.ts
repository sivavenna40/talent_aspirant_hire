import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrganisationService } from 'src/app/service/organisation.service';
import { OrganisationFormComponent } from '../organisation-form/organisation-form.component';
import { RestDataSource } from 'src/app/service/restdataSource';
import { Organisation } from 'src/app/model/organisation';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation-view.component.html',
  styleUrls: ['./organisation-view.component.css'],
})
export class OrganisationViewComponent implements OnInit, AfterViewInit {
  organisations!: Organisation[];
  displayedColumns: string[] = [
    'organisationId',
    'organisationName',
    'organisationMobileNumber',
    'organisationEmail',
    // 'organizers',
    'address',
    'action',
  ];
  dataSource!: MatTableDataSource<Organisation>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private organisationService: OrganisationService,
    private dialog: MatDialog,
    private restData: RestDataSource
  ) {
    this.dataSource = new MatTableDataSource();
    this.setDataSorce();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {}

  setDataSorce() {
    this.restData.getOrganisations().subscribe({
      next: (resp) => {
        console.log(resp);
        this.organisations = resp;
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
  getOrganisations() {
    return this.organisationService.getOrganisations();
  }

  addSkill() {
    this.dialog.open(OrganisationFormComponent);
  }

  deleteSkill(organisation: Organisation) {
    console.log('inside delete skill :' + organisation.organisationId);
    this.restData
      .deleteOrganisationById(organisation.organisationId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.setDataSorce();
        },
      });
  }

  editSkill(organisation: Organisation) {
    console.log(organisation);
    this.dialog.open(OrganisationFormComponent, {
      data: organisation,
    });
  }
}
