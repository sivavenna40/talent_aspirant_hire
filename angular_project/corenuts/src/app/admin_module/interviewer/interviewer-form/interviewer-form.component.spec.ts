import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerFormComponent } from './interviewer-form.component';

describe('InterviewerFormComponent', () => {
  let component: InterviewerFormComponent;
  let fixture: ComponentFixture<InterviewerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewerFormComponent]
    });
    fixture = TestBed.createComponent(InterviewerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
