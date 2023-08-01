import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerViewComponent } from './organizer-view.component';

describe('OrganizerViewComponent', () => {
  let component: OrganizerViewComponent;
  let fixture: ComponentFixture<OrganizerViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizerViewComponent]
    });
    fixture = TestBed.createComponent(OrganizerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
