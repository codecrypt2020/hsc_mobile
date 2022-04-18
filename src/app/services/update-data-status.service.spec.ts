import { TestBed } from '@angular/core/testing';

import { UpdateDataStatusService } from './update-data-status.service';

describe('UpdateDataStatusService', () => {
  let service: UpdateDataStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateDataStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
