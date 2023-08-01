import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerSkillFormComponent } from './interviewer-skill-form.component';

describe('InterviewerSkillFormComponent', () => {
  let component: InterviewerSkillFormComponent;
  let fixture: ComponentFixture<InterviewerSkillFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewerSkillFormComponent]
    });
    fixture = TestBed.createComponent(InterviewerSkillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
