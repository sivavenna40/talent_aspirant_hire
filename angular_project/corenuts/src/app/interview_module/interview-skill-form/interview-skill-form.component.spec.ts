import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewSkillFormComponent } from './interview-skill-form.component';

describe('InterviewSkillFormComponent', () => {
  let component: InterviewSkillFormComponent;
  let fixture: ComponentFixture<InterviewSkillFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewSkillFormComponent]
    });
    fixture = TestBed.createComponent(InterviewSkillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
