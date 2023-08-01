import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewScheduleViewComponent } from './interview-schedule-view.component';

describe('InterviewScheduleViewComponent', () => {
  let component: InterviewScheduleViewComponent;
  let fixture: ComponentFixture<InterviewScheduleViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewScheduleViewComponent]
    });
    fixture = TestBed.createComponent(InterviewScheduleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
