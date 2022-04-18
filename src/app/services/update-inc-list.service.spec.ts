import { TestBed } from '@angular/core/testing';

import { UpdateIncListService } from './update-inc-list.service';

describe('UpdateIncListService', () => {
  let service: UpdateIncListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateIncListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
