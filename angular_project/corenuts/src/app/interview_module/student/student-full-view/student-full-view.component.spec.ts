import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFullViewComponent } from './student-full-view.component';

describe('StudentFullViewComponent', () => {
  let component: StudentFullViewComponent;
  let fixture: ComponentFixture<StudentFullViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentFullViewComponent]
    });
    fixture = TestBed.createComponent(StudentFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
