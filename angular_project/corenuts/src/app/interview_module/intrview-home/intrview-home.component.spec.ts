import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrviewHomeComponent } from './intrview-home.component';

describe('IntrviewHomeComponent', () => {
  let component: IntrviewHomeComponent;
  let fixture: ComponentFixture<IntrviewHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IntrviewHomeComponent]
    });
    fixture = TestBed.createComponent(IntrviewHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
