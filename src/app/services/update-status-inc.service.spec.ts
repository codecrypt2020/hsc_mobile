import { TestBed } from '@angular/core/testing';

import { UpdateStatusIncService } from './update-status-inc.service';

describe('UpdateStatusIncService', () => {
  let service: UpdateStatusIncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateStatusIncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
