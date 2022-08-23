import { TestBed } from '@angular/core/testing';

import { NERService } from './ner.service';

describe('NerService', () => {
  let service: NERService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NERService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
