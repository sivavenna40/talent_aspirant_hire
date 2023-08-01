import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewScheduleFormComponent } from './interview-schedule-form.component';

describe('InterviewScheduleFormComponent', () => {
  let component: InterviewScheduleFormComponent;
  let fixture: ComponentFixture<InterviewScheduleFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewScheduleFormComponent]
    });
    fixture = TestBed.createComponent(InterviewScheduleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
