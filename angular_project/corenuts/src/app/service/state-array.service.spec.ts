import { TestBed } from '@angular/core/testing';

import { StateArrayService } from './state-array.service';

describe('StateArrayService', () => {
  let service: StateArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
