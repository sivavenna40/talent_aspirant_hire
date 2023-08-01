import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerViewComponent } from './interviewer-view.component';

describe('InterviewerViewComponent', () => {
  let component: InterviewerViewComponent;
  let fixture: ComponentFixture<InterviewerViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewerViewComponent]
    });
    fixture = TestBed.createComponent(InterviewerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
