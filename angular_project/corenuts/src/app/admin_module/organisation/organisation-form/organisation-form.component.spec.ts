import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationFormComponent } from './organisation-form.component';

describe('OrganisationFormComponent', () => {
  let component: OrganisationFormComponent;
  let fixture: ComponentFixture<OrganisationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganisationFormComponent]
    });
    fixture = TestBed.createComponent(OrganisationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
