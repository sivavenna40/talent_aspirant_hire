import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewSkillComponent } from './interview-skill.component';

describe('InterviewSkillComponent', () => {
  let component: InterviewSkillComponent;
  let fixture: ComponentFixture<InterviewSkillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewSkillComponent]
    });
    fixture = TestBed.createComponent(InterviewSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
