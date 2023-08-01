import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewerSkillViewComponent } from './interviewer-skill-view.component';

describe('InterviewerSkillViewComponent', () => {
  let component: InterviewerSkillViewComponent;
  let fixture: ComponentFixture<InterviewerSkillViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewerSkillViewComponent]
    });
    fixture = TestBed.createComponent(InterviewerSkillViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
